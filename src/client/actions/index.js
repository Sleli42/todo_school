import requestJson from '../utils';

export const HEROS_LOADED = 'heros/herosLoaded';
export const DATA_HERO_LOADED = 'dataHero/dataHeroLoaded';
export const HERO_CLOSED = 'close/hereClosed';

export const herosLoaded = heros => ({
  type: HEROS_LOADED,
  payload: heros,
});

export const loadHeros = () => (dispatch) => {
  const uri = '/v1/public/characters';
  requestJson(uri)
    .then(data => dispatch(herosLoaded(data.data.results)))
    .catch(err => console.log(err));
};

export const dataHeroLoaded = dataHero => ({
  type: DATA_HERO_LOADED,
  payload: dataHero,
});

export const loadDataHero = id => (dispatch) => {
  const uri = `/v1/public/characters/${id}`;
  requestJson(uri)
    .then(dataHero => dispatch(dataHeroLoaded(dataHero.data.results)))
    .catch(console.log);
};

export const heroClosed = _dataHero => ({
  type: HERO_CLOSED,
  payload: _dataHero,
});

export const closeHero = id => (dispatch) => {
  const uri = `/v1/public/characters/${id}`;
  requestJson(uri)
    .then(dataHero => dispatch(heroClosed(dataHero.data.results)))
    .catch(console.log);
};

export default {
  loadHeros,
  loadDataHero,
  closeHero,
};
