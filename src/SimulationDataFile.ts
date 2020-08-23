import { join } from 'path';
import { promises as fsPromises } from 'fs';
import SimulationRuns from './SimulationRuns';

export default class SimulationDataFile {
  private fileNamePrefix = 'simulationData.';
  private fileNameExtension = '.csv';
  private fileNumber: number;
  private localFilePath: string;

  constructor(fileNumber: number) {
    this.fileNumber = fileNumber;
    this.localFilePath = join(
      '.',
      `${this.fileNamePrefix}${this.fileNumber}${this.fileNameExtension}`,
    );
  }

  public async write(simulationData: SimulationRuns): Promise<void> {
    const csvData = simulationData.toCsv();
    await fsPromises.writeFile(this.localFilePath, csvData);
  }
}
