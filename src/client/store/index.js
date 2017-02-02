import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { socketIoMiddleWare } from '../middlewares';
import rootReducer from '../reducers';

const configureStore = (initialState, io) => createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(socketIoMiddleWare(io), thunk, createLogger())),
);

export default configureStore;
