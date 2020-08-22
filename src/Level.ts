export default class Level {
  static baseXpNeededForNextLevel = 100;
  static levelModifier = 1.17;
  static baseLevel = 0;
  static maxLevel = 50;

  static calculateLevelFromTotalXp(xp: number): number {
    // TODO: Trying to figure out formula needed...
    // totalXp = baseXp * (levelMod ^ level)
    // totalXp / baseXp = levelMod ^ level
    // log base(levelMod) of(totalXp / baseXp) = level
    // TODO: Is this correct?! Nope, this doesnt' calculate what I want it to?
    // Nope, this doesn't calculate what I want it to... This calculates the
    // what level you're on when this level of XP is needed for the next level.
    // return Math.log(xp / this.baseXpNeededForNextLevel) / Math.log(this.levelModifier);

    // Start at the max level and see if this XP is enough to qualify for that level.
    // If not, try the next lower level. Repeat as needed.
    for (let i = this.maxLevel; i >= this.baseLevel; i--) {
      const level = new Level(i);
      if (level.getXpGainedSoFar() <= xp) {
        return i;
      }
    }

    return 0;
  }

  level: number;

  constructor(level: number) {
    this.level = level;
  }

  getXpGainedSoFar(): number | string {
    if (this.level === 0) {
      return 0;
    }

    const previousLevel = new Level(this.level - 1);
    if (this.level === 1) {
      return Number(previousLevel.getXpNeededForNextLevel());
    }

    const previousLevelXpGainedSoFar = Number(previousLevel.getXpGainedSoFar());

    const xpNeededForNextLevel = Number(this.getXpNeededForNextLevel());
    return previousLevelXpGainedSoFar + xpNeededForNextLevel;
  }

  getXpNeededForNextLevel(): number {
    return Math.ceil(
      Level.baseXpNeededForNextLevel * Level.levelModifier ** this.level,
    );
  }
}
