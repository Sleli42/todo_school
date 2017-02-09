import {
  TODO_ADDED,
  TODO_DELETED,
  TODOS_LOADED,
} from '../actions/todos';

const todosReducer = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case TODO_ADDED:
      return [...state, payload];
    case TODO_DELETED:
      return state.filter(todo => todo.id !== payload.id);
    case TODOS_LOADED: {
      return [...payload];
    }
    default: return state;
  }
};

export default todosReducer;
