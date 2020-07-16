import { createStore, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas/rootSaga';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store;
