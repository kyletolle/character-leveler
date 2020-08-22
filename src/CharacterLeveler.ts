import Character from './Character';
import Level from './Level';
import LevelingDataForSimulationRun from './LevelingDataForSimulation';
import { Messages } from './Messages';

export default class CharacterLeveler {
  startingXp: number;
  character: Character;
  totalCreaturesKilled: number;

  constructor() {
    this.startingXp = 0;
    this.character = new Character('Zaglamir', this.startingXp);
    this.totalCreaturesKilled = 0;
  }

  /**
   * TODO: Promises don't actually give us a speed up like I hoped. Things are
   * CPU-bound instead of I/O bound. So can we use Worker Threads instead?
   * https://nodejs.org/api/worker_threads.html#worker_threads_worker_threads
   * Maybe we can use https://github.com/josdejong/workerpool
   */
  async simulateXpGain(): Promise<LevelingDataForSimulationRun> {
    let previousLevel = 0;
    let creaturesKilledSinceLastLevel = 0;
    const messages = new Messages();
    const startingMessage = `${
      this.character.name
    } is starting out with ${this.character.getXp()} XP.`;
    messages.push(startingMessage);
    while (this.character.getLevel() < Level.maxLevel) {
      const xpJustGained = this.creatureSlainXpGainedWithNarrowXpRange();
      // const xpJustGained = this.creatureSlainXpGainedWithWideXpRange();
      const characterLevel = this.character.getLevel();
      const totalXp = this.character.gainXp(xpJustGained);
      this.totalCreaturesKilled++;
      creaturesKilledSinceLastLevel++;
      const slainCreatureMessage = `${this.character.name} killed a creature for ${xpJustGained} XP. Has total of ${totalXp} XP. Is Level ${characterLevel}.`;
      messages.push(slainCreatureMessage);
      if (previousLevel != characterLevel) {
        const leveledUpMessage = 'LEVELED UP!';
        messages.push(leveledUpMessage);
        const creaturesSlainSinceLastLevelMessage = `Killed ${creaturesKilledSinceLastLevel} creatures since last leveling up.`;
        messages.push(creaturesSlainSinceLastLevelMessage);
        const creaturesSlainTotalMessage = `Killed ${this.totalCreaturesKilled} creatures total.`;
        messages.push(creaturesSlainTotalMessage);

        previousLevel = characterLevel;
        creaturesKilledSinceLastLevel = 0;
      }
    }
    const endingMessage = `${this.character.name} hit max level of ${Level.maxLevel} by slaying ${this.totalCreaturesKilled} creatures!`;
    messages.push(endingMessage);
    return this.simulationData;
  }

  get simulationData(): LevelingDataForSimulationRun {
    return new LevelingDataForSimulationRun(this.totalCreaturesKilled);
  }

  // const SLAYING_LEVELING_MODIFIER = 1.05; // Results in about 20k creatures to Level 50.

  SLAYING_LEVELING_MODIFIER_FOR_NARROW_XP_RANGE = 1.09077; // Results in just about 5k creatures to Level 50, when bonus XP is added end.

  // const SLAYING_LEVELING_MODIFIER = 1.1; // Results in about 3.6k creatures to Level 50.
  // const SLAYING_LEVELING_MODIFIER = Level.levelModifier; // Results in about 550 creatures to Level 50.

  // This gives you a more predictable amount of XP per kill. There's less
  // variety in how much XP you get per kill, but sometimes the consistency is nice.
  private creatureSlainXpGainedWithNarrowXpRange(): number {
    const levelXpModifier = this.SLAYING_LEVELING_MODIFIER_FOR_NARROW_XP_RANGE;
    const baseSlainXp = 10;
    const randomBonusXp = Math.floor(Math.random() * 10) + 1;
    return Math.ceil(
      // (baseSlainXp + randomBonusXp) * (levelXpModifier ** this.character.getLevel())
      baseSlainXp * levelXpModifier ** this.character.getLevel() +
        randomBonusXp,
    );
  }

  SLAYING_LEVELING_MODIFIER_FOR_WIDE_XP_RANGE = 1.07915; // Results in just about 5k creatures to Level 50, when bonus XP is added in beginning.

  // This gives you a less certain amount of XP per kill, but it does mean
  // you can sometimes get a ton of XP per kill. That can be rewarding.
  private creatureSlainXpGainedWithWideXpRange(): number {
    const levelXpModifier = this.SLAYING_LEVELING_MODIFIER_FOR_WIDE_XP_RANGE;
    const baseSlainXp = 10;
    const randomBonusXp = Math.floor(Math.random() * 10) + 1;
    return Math.ceil(
      (baseSlainXp + randomBonusXp) *
        levelXpModifier ** this.character.getLevel(),
    );
  }
}
