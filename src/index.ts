import XpTable from './XpTable';
import CharacterLevel from './CharacterLeveler';
import { SimulationRuns } from './SimulationRuns';
import { SimulationDataFile } from './SimulationDataFile';

/*
 * Let's think about what's required to make this work again.
 * - Character
 *   - xp : int
 * - CharacterLevel
 *   - level : int
 *   - xpGainedSoFar
 *   - xpNeededForNextLevel
 *   - levelModifier
*/

// new XpLevelInfo().logItOut();

console.log(
    new XpTable().generate()
);

const currentXpTotal = 10_000;
console.log(
    // new Character(currentXpTotal).getLevel()
);
console.log();

const numberOfSimulationsToRun = 50;
const simulationData = new SimulationRuns();
for(let i = 0; i < numberOfSimulationsToRun; i++) {
    const leveler = new CharacterLevel()
    leveler.simulateXpGain();
    if ((i % 100) === 0) { console.log(`Finished ${i} simulations`); }

    simulationData.push(leveler.simulationData);
}


new SimulationDataFile().write(simulationData);
