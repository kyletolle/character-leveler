import { runSimulationInParallel } from '../runSimulationInParallel';

const runSimulationsInParallelOn5Workers = async () => {
  const numberOfWorkers = 5;
  const runtimeDuration = await runSimulationInParallel(numberOfWorkers);
  console.log("Here's the runtime information!", runtimeDuration);
};

runSimulationsInParallelOn5Workers();
