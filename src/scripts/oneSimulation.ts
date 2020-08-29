import CharacterLeveler from '../CharacterLeveler';
import numeral = require('numeral');

const runOneSimulation = (): number => {
  const leveler = new CharacterLeveler();
  leveler.simulateXpGain();
  return leveler.getTotalCreaturesKilled();
};
const totalCreaturesKilled = runOneSimulation();
const formattedTotalCreaturesKilled = numeral(totalCreaturesKilled).format(
  '0,0',
);
console.log(
  'For a single simulation, we killed this many creatures:',
  formattedTotalCreaturesKilled,
);
console.log('\n');
