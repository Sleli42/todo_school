import { combineReducers } from 'redux';
import heros from './heros';
import dataHero from './dataHero';

export default combineReducers({
  heros,
  dataHero,
});
