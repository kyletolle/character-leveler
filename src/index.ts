import XpTable from './XpTable';
import Character from './Character';
import CharacterLevel from './CharacterLeveler';

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

// new XpLevelInfo().logItOut();

console.log(
    new XpTable().generate()
);

const currentXpTotal = 10_000;
console.log(
    new Character(currentXpTotal).getLevel()
);
console.log();

new CharacterLevel().simulateXpGain();
