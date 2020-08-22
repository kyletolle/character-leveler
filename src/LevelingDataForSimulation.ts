export default class LevelingDataForSimulationRun {
  public creaturesKilledToGetToMaxLevel: number;

  constructor(creaturesKilledToGetToMaxLevel: number) {
    this.creaturesKilledToGetToMaxLevel = creaturesKilledToGetToMaxLevel;
  }

  toString(): string {
    return this.creaturesKilledToGetToMaxLevel.toString();
  }
}
