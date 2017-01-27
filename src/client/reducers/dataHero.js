import {
  DATA_HERO_LOADED,
  HERO_CLOSED,
} from '../actions/';

const dataHeroReducer = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case DATA_HERO_LOADED: {
      payload.moreData = 1;
      return { ...payload };
    }
    case HERO_CLOSED: {
      payload.moreData = 0;
      return { ...payload };
    }
    default: return state;
  }
};

export default dataHeroReducer;
