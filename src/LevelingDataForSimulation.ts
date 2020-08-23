// Had to stop using this because it was returned from the simulation run and
// since we started doing that with workerpool, we had to use something that
// would serialize and deserialize better than a class instance like this.
export default class LevelingDataForSimulationRun {
  public creaturesKilledToGetToMaxLevel: number;

  constructor(creaturesKilledToGetToMaxLevel: number) {
    this.creaturesKilledToGetToMaxLevel = creaturesKilledToGetToMaxLevel;
  }

  toString(): string {
    return this.creaturesKilledToGetToMaxLevel.toString();
  }
}
