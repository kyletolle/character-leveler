import { runSimulationInParallel } from './runSimulationInParallel';

export const runSimulationsAndTryDifferentNumbersOfParallelWorkers = async (): Promise<
  void
> => {
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
