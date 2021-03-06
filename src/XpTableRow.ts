import Level from './Level';
import numeral = require('numeral');

export default class XpTableRow {
  levelNumber: number;
  level: Level;
  constructor(levelNumber: number) {
    this.levelNumber = levelNumber;
    this.level = new Level(levelNumber);
  }

  generate(): string {
    return `| ${this.formattedLevel()} | ${this.formattedXpGainedSoFar()} | ${this.formattedXpNeededForNextLevel()} |\n`;
  }

  private formattedLevel(): string {
    return this.levelNumber.toString().padStart(5, ' ');
  }

  private formattedXpGainedSoFar(): string {
    const xpGainedSoFar = this.level.getXpGainedSoFar();
    const paddedXpGainedSoFar = numeral(xpGainedSoFar).format('0,0');
    const valueToPad =
      typeof xpGainedSoFar === 'number' ? paddedXpGainedSoFar : xpGainedSoFar;
    return valueToPad.padStart(16, ' ');
  }

  private formattedXpNeededForNextLevel(): string {
    const xpNeededForNextLevel = this.level.getXpNeededForNextLevel();
    const paddedXpNeeded = numeral(xpNeededForNextLevel).format('0,0');
    let valueToPad = '';
    if (this.level.level === Level.maxLevel) {
      // Since this is max level, there's no more XP to gain
      valueToPad = '---';
    } else {
      valueToPad =
        typeof xpNeededForNextLevel === 'number'
          ? paddedXpNeeded
          : xpNeededForNextLevel;
    }

    return valueToPad.padStart(24, ' ');
  }
}
