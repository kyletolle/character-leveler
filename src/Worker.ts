import workerpool from 'workerpool';
import CharacterLeveler from './CharacterLeveler';

const runSimulation = (): number => {
  const leveler = new CharacterLeveler();
  leveler.simulateXpGain();
  return leveler.getTotalCreaturesKilled();
};

workerpool.worker({
  runSimulation,
});
