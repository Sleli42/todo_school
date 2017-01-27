import {
  HEROS_LOADED,
} from '../actions/';

const herosReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case HEROS_LOADED: {
      return payload;
    }
    default: return state;
  }
};

export default herosReducer;
