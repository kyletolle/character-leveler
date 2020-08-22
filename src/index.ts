import XpTable from './XpTable';
import CharacterLevel from './CharacterLeveler';
import { SimulationRuns } from './SimulationRuns';
import { SimulationDataFile } from './SimulationDataFile';
import { Timer } from './Timer';
import LevelingDataForSimulationRun from './LevelingDataForSimulation';

// This was to test out XpLevelInfo worked.
// new XpLevelInfo().logItOut();

// This generates an XP table so we can see how much XP is required to reach
// each level.
console.log(new XpTable().generate());

// This was to test that getLevel worked.
// const currentXpTotal = 10_000;
// console.log(new Character(currentXpTotal).getLevel());
// console.log();

const runSimulations = async () => {
  // This runs a bunch of simulations and writes out a file with how many kills it
  // took to reach max level for each run
  const timer = new Timer();
  timer.start();
  const numberOfSimulationsToRun = 10_000;
  const simulationPromises = new Array<Promise<LevelingDataForSimulationRun>>();
  for (let i = 0; i < numberOfSimulationsToRun; i++) {
    const leveler = new CharacterLevel();
    simulationPromises.push(leveler.simulateXpGain());
    if (i != 0 && i % 50 === 0) {
      console.log(`Finished ${i} simulations`);
    }
  }

  const resolvedPromises = await Promise.all(simulationPromises);

  const simulationData = new SimulationRuns();
  for (const simulationDatum of resolvedPromises) {
    simulationData.push(simulationDatum);
  }
  timer.stop();
  console.log(`Simulation took ${timer.durationInSeconds()} seconds.`);

  new SimulationDataFile().write(simulationData);
};

runSimulations();
