import { type } from "os";

var numeral = require('numeral');
/*
 * Let's think about what's required to make this work again.
 * - Character
 *   - xp : int
 * - CharacterLevel
 *   - level : int
 *   - xpGainedSoFar
 *   - xpNeededForNextLevel
 *   - levelModifier
*/

class CharacterLeveler {
    level : number;

    constructor(level: number) {
        this.level = level;
    }
}

class Character {
    xp : number;

    constructor(xp : number) {
        this.xp = xp;
    }
}

class Level {
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
        if (this.level === 1 ) { return Number(previousLevel.getXpNeededForNextLevel()); }

        const previousLevelXpGainedSoFar : number = Number(previousLevel.getXpGainedSoFar());

        const xpNeededForNextLevel = Number(this.getXpNeededForNextLevel());
        return previousLevelXpGainedSoFar + xpNeededForNextLevel;
    }

    getXpNeededForNextLevel() : number {

        return Math.ceil(this.baseXpNeededForNextLevel*((1.17)**this.level));
    }
}

// const characterLeveler = new CharacterLeveler(1);

// const level0 = new Level(0)
// console.log(
//     "Level 0: \n",
//      "  XP needed for next level: ",
//      level0.getXpNeededForNextLevel(),
//      "\n   XP Gained so far: ",
//      level0.getXpGainedSoFar(),
//      );

// const level1 = new Level(1)
// console.log(
//     "Level 1: \n",
//      "  XP needed for next level: ",
//      level1.getXpNeededForNextLevel(),
//      "\n   XP Gained so far: ",
//      level1.getXpGainedSoFar(),
//      );

// const level2 = new Level(2)
// console.log(
//     "Level 2: \n",
//      "  XP needed for next level: ",
//      level2.getXpNeededForNextLevel(),
//      "\n   XP Gained so far: ",
//      level2.getXpGainedSoFar(),
//      );


class XpTable {
    generate() : string {
        let tableString = "";
        tableString += "| Level | XP Gained So Far | XP Needed For Next Level |\n";
        for (let i : number = 0; i <=50; i++) {
            const level = new Level(i)
            const paddedI = i.toString().padStart(5, ' ')

            const xpGainedSoFar = level.getXpGainedSoFar()
            const paddedXpGainedSoFar = numeral(xpGainedSoFar).format('0,0')
            const formattedXpGainedSoFar = (typeof xpGainedSoFar === 'number' ? paddedXpGainedSoFar : xpGainedSoFar).padStart(16, ' ')

            const xpNeededForNextLevel = level.getXpNeededForNextLevel()
            const paddedXpNeeded = numeral(xpNeededForNextLevel).format('0,0')
            let formattedXpNeeded = '';
            if (level.level === level.maxLevel) {
                formattedXpNeeded = '---'.padStart(24, ' ');
            } else {
                formattedXpNeeded = (typeof xpNeededForNextLevel === 'number' ? paddedXpNeeded : xpNeededForNextLevel).padStart(24, ' ')
            }

            tableString += `| ${paddedI} | ${formattedXpGainedSoFar} | ${formattedXpNeeded} |\n`
            
        }
        return tableString;
    }
}

console.log(new XpTable().generate());