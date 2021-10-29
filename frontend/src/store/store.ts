import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { createLogger } from 'redux-logger';
import { models, RootModel } from './root.model';

const loggerMiddleware = createLogger();
const middlewares = [loggerMiddleware];

export const store = init({
  plugins: [],
  redux: {
    middlewares,
  },
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
