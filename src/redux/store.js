import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducers from './root.reducer';

// midlewares
const midlewares = [];

if (process.env.NODE_ENV === 'development') {
  midlewares.push(logger);
  console.log(process.env.NODE_ENV);
}

export const store = createStore(rootReducers, applyMiddleware(...midlewares));

export const persistor = persistStore(store);
