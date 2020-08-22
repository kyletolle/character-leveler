import { join } from 'path';
import { promises as fsPromises } from 'fs';
import { SimulationRuns } from './SimulationRuns';
export class SimulationDataFile {
    private fileName = 'simulationData.csv';
    private localFilePath = join('.', this.fileName);


    public async write(simulationData: SimulationRuns) {
        const csvData = simulationData.toCsv();
        await fsPromises.writeFile(this.localFilePath, csvData);
    }
}
