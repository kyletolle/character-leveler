import LevelingDataForSimulationRun from './LevelingDataForSimulation';

export class SimulationRuns {
  data = new Array<LevelingDataForSimulationRun>();

  push(item: LevelingDataForSimulationRun) {
    return this.data.push(item);
  }

  toCsv() {
    return this.data.map((runData) => runData.toString()).join('\n');
  }
}
