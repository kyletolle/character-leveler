import Level from './Level';

export default class Character {
  name: string;
  xp: number;

  constructor(name: string, xp: number) {
    this.name = name;
    this.xp = xp;
  }

  gainXp(amountOfXpGained: number): number {
    this.xp += amountOfXpGained;
    return this.getXp();
  }

  getLevel(): number {
    return Level.calculateLevelFromTotalXp(this.xp);
  }

  getXp(): number {
    return this.xp;
  }
}
