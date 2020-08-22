export default class LevelingDataForSimulationRun {
  public creaturesKilledToGetToMaxLevel: number;

  constructor(creaturesKilledToGetToMaxLevel: number) {
    this.creaturesKilledToGetToMaxLevel = creaturesKilledToGetToMaxLevel;
  }

  toString() {
    return this.creaturesKilledToGetToMaxLevel.toString();
  }
}
