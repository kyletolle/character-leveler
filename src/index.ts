import XpTable from './XpTable';
import SimulationRuns from './SimulationRuns';
import SimulationDataFile from './SimulationDataFile';
import Timer from './Timer';
import LevelingDataForSimulationRun from './LevelingDataForSimulation';
import workerpool from 'workerpool';

// This was to test out XpLevelInfo worked.
// new XpLevelInfo().logItOut();

// This generates an XP table so we can see how much XP is required to reach
// each level.
console.log(new XpTable().generate());

// This was to test that getLevel worked.
// const currentXpTotal = 10_000;
// console.log(new Character(currentXpTotal).getLevel());
// console.log();

// const runSimulation = (): LevelingDataForSimulationRun => {
//   const leveler = new CharacterLeveler();
//   return leveler.simulateXpGain();
// };

const runSimulations = async () => {
  // This runs a bunch of simulations and writes out a file with how many kills it
  // took to reach max level for each run
  const timer = new Timer();
  timer.start();
  const numberOfSimulationsToRun = 10_000;
  const simulationPromises = [];

  // const pool = workerpool.pool();
  const pool = workerpool.pool(__dirname + '/Worker.js', { maxWorkers: 11 });

  for (let i = 0; i < numberOfSimulationsToRun; i++) {
    const runSimulationPromise = pool
      .exec('runSimulation', [])
      .catch((error) => {
        console.error('Ran into an error:', error.toString());
        const placeholderLevelingData = new LevelingDataForSimulationRun(0);
        return placeholderLevelingData;
      });
    simulationPromises.push(runSimulationPromise);

    // if (i != 0 && i % 50 === 0) {
    //   console.log(`Finished ${i} simulations`);
    // }
  }

  const resolvedPromises: number[] = await Promise.all(simulationPromises);
  pool.terminate();

  const simulationData = new SimulationRuns();
  for (const simulationDatum of resolvedPromises) {
    simulationData.push(simulationDatum);
  }
  timer.stop();
  console.log(`Simulation took ${timer.durationInSeconds()} seconds.`);

  new SimulationDataFile().write(simulationData);
};

runSimulations();
