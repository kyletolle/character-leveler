export default class Level {
    level : number;
    levelModifier : number = 1.17;
    baseLevel : number = 0;
    baseXpNeededForNextLevel : number = 100;
    maxLevel : number = 50;

    constructor(level : number) {
        this.level = level;
    }

    getXpGainedSoFar() : number|string {
        if (this.level === 0) { return 0; }

        const previousLevel = new Level(this.level - 1);
        if (this.level === 1 ) {
          return Number(previousLevel.getXpNeededForNextLevel());
        }

        const previousLevelXpGainedSoFar : number = Number(previousLevel.getXpGainedSoFar());

        const xpNeededForNextLevel = Number(this.getXpNeededForNextLevel());
        return previousLevelXpGainedSoFar + xpNeededForNextLevel;
    }

    getXpNeededForNextLevel() : number {
        return Math.ceil(this.baseXpNeededForNextLevel*((1.17)**this.level));
    }
}
