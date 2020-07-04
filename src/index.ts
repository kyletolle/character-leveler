import XpTable from './XpTable';
import XpLevelInfo from './XpLevelInfo';

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

// const characterLeveler = new CharacterLeveler(1);

// new XpLevelInfo().logItOut();

console.log(
    new XpTable().generate()
);