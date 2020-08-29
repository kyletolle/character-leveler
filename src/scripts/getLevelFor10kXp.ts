import Character from '../Character';
import numeral = require('numeral');

// To test that getLevel works.
const currentXpTotal = 10_000;
const currentLevel = new Character('kernelRiot', currentXpTotal).getLevel();
const formattedXpTotal = numeral(currentXpTotal).format('0,0');
console.log(
  `When you have ${formattedXpTotal} XP you will be level ${currentLevel}.`,
);
