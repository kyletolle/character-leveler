export default class SimulationRuns {
  data = new Array<number>();

  push(item: number): number {
    return this.data.push(item);
  }

  toCsv(): string {
    return this.data.map((runData) => runData.toString()).join('\n');
  }
}
