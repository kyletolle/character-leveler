import SimulationRuns from './SimulationRuns';
import SimulationDataFile from './SimulationDataFile';
import Timer from './Timer';
import workerpool from 'workerpool';

export const runSimulationInParallel = async (
  numberOfWorkers: number,
): Promise<{ numberOfWorkers: number; durationInSeconds: number }> => {
  const timer = new Timer();
  timer.start();
  const numberOfSimulationsToRun = 10;
  const simulationPromises = [];

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
