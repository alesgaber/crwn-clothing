import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducers from './root.reducer';

// midlewares
const midlewares = [logger];

const store = createStore(rootReducers, applyMiddleware(...midlewares));

export default store;
