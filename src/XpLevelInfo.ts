import Level from './Level';

export default class XpLevelInfo {
  logItOut(): void {
    const level0 = new Level(0);
    console.log(
      'Level 0: \n',
      '  XP needed for next level: ',
      level0.getXpNeededForNextLevel(),
      '\n   XP Gained so far: ',
      level0.getXpGainedSoFar(),
    );

    const level1 = new Level(1);
    console.log(
      'Level 1: \n',
      '  XP needed for next level: ',
      level1.getXpNeededForNextLevel(),
      '\n   XP Gained so far: ',
      level1.getXpGainedSoFar(),
    );

    const level2 = new Level(2);
    console.log(
      'Level 2: \n',
      '  XP needed for next level: ',
      level2.getXpNeededForNextLevel(),
      '\n   XP Gained so far: ',
      level2.getXpGainedSoFar(),
    );
    console.log();
  }
}
