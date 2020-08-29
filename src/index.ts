import XpTable from './XpTable';
import SimulationRuns from './SimulationRuns';
import SimulationDataFile from './SimulationDataFile';
import Timer from './Timer';
import workerpool from 'workerpool';
import Character from './Character';
import CharacterLeveler from './CharacterLeveler';

// This generates an XP table so we can see how much XP is required to reach
// each level.
const logXpTable = () => {
  console.log('XP Table:');
  console.log(new XpTable().generate());
};
logXpTable();

// This was to test that getLevel worked.
const getLevelFor10kXp = () => {
  const currentXpTotal = 10_000;
  const currentLevel = new Character('kernelRiot', currentXpTotal).getLevel();
  console.log(
    `When you have ${currentXpTotal} you will be level ${currentLevel}`,
  );
};
getLevelFor10kXp();
console.log('\n');

const runOneSimulation = (): number => {
  const leveler = new CharacterLeveler();
  leveler.simulateXpGain();
  return leveler.getTotalCreaturesKilled();
};
const totalCreaturesKilled = runOneSimulation();
console.log(
  'For a single simulation, we had killed this many creatures:',
  totalCreaturesKilled,
);
console.log('\n');

const runSimulationInParallel = async (
  numberOfWorkers: number,
): Promise<{ numberOfWorkers: number; durationInSeconds: number }> => {
  const timer = new Timer();
  timer.start();
  const numberOfSimulationsToRun = 10;
  const simulationPromises = [];

  // const pool = workerpool.pool();
  console.log(`Creating a pool with ${numberOfWorkers} workers!`);
  const pool = workerpool.pool(__dirname + '/Worker.js', {
    maxWorkers: numberOfWorkers,
  });

  for (let i = 0; i < numberOfSimulationsToRun; i++) {
    const runSimulationPromise = pool
      .exec('runSimulation', [])
      .catch((error) => {
        console.error('Ran into an error:', error.toString());
        return 0;
      });
    simulationPromises.push(runSimulationPromise);
  }

  const resolvedPromises: number[] = await Promise.all(simulationPromises);
  pool.terminate();

  const simulationData = new SimulationRuns();
  for (const simulationDatum of resolvedPromises) {
    simulationData.push(simulationDatum);
  }
  timer.stop();
  console.log(`Simulation took ${timer.durationInSeconds()} seconds.\n`);

  new SimulationDataFile(numberOfWorkers).write(simulationData);

  return {
    numberOfWorkers: numberOfWorkers,
    durationInSeconds: timer.durationInSeconds(),
  };
};

const runSimulationsAndTryDifferentNumbersOfParallelWorkers = async () => {
  // This runs a bunch of simulations and writes out a file with how many kills it
  // took to reach max level for each run
  const runtimeDurations = [];
  const maxWorkersToTry = 15;
  for (
    let numberOfWorkersToTry = 1;
    numberOfWorkersToTry <= maxWorkersToTry;
    numberOfWorkersToTry++
  ) {
    const runtimeDuration = await runSimulationInParallel(numberOfWorkersToTry);
    runtimeDurations.push(runtimeDuration);
  }

  console.log("Here's the runtime information!", runtimeDurations);
};

runSimulationsAndTryDifferentNumbersOfParallelWorkers();
