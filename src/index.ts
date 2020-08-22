import XpTable from './XpTable';
import Character from './Character';
import CharacterLevel from './CharacterLeveler';
import LevelingDataForSimulationRun from './LevelingDataForSimulation';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

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

const numberOfSimulationsToRun = 10_000;
let simulationData = new Array<LevelingDataForSimulationRun>();
for(let i = 0; i < numberOfSimulationsToRun; i++) {
    const leveler = new CharacterLevel()
    leveler.simulateXpGain();
    if ((i % 100) === 0) { console.log(`Finished ${i} simulations`); }

    simulationData.push(leveler.simulationData);
}

class SimulationDataFile {
    private fileName = 'simulationData.csv';
    private localFilePath = join('.', this.fileName);

    public async write(simulationData: Array<LevelingDataForSimulationRun>) {
        const csvData: string[] = simulationData.map((runData) => {
            return `${runData.creaturesKilledToGetToMaxLevel}`;
        }).join("\n");
        await fsPromises.writeFile(this.localFilePath, csvData);
    }
}

new SimulationDataFile().write(simulationData);
