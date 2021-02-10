import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root.saga';
import rootReducers from './root.reducer';

const sagaMidleware = createSagaMiddleware();

// midlewares
const midlewares = [sagaMidleware];

if (process.env.NODE_ENV === 'development') {
  midlewares.push(logger);
  console.log(process.env.NODE_ENV);
}

export const store = createStore(rootReducers, applyMiddleware(...midlewares));

// adding root  saga
sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);
