import XpTable from './XpTable';
import CharacterLevel from './CharacterLeveler';
import { SimulationRuns } from './SimulationRuns';
import { SimulationDataFile } from './SimulationDataFile';
import { Timer } from './Timer';

// This was to test out XpLevelInfo worked.
// new XpLevelInfo().logItOut();

// This generates an XP table so we can see how much XP is required to reach
// each level.
console.log(new XpTable().generate());

// This was to test that getLevel worked.
// const currentXpTotal = 10_000;
// console.log(new Character(currentXpTotal).getLevel());
// console.log();

// This runs a bunch of simulations and writes out a file with how many kills it
// took to reach max level for each run
const timer = new Timer();
timer.start();
const numberOfSimulationsToRun = 50;
const simulationData = new SimulationRuns();
for (let i = 0; i < numberOfSimulationsToRun; i++) {
  const leveler = new CharacterLevel();
  leveler.simulateXpGain();
  if (i != 0 && i % 50 === 0) {
    console.log(`Finished ${i} simulations`);
  }

  simulationData.push(leveler.simulationData);
}
timer.stop();
console.log(`Simulation took ${timer.durationInSeconds()} seconds.`);

new SimulationDataFile().write(simulationData);
