import { all } from 'redux-saga/effects';
import { watchLoaderUserAsync, watchRegisterAsync, watchLoginAsync } from './auth.sagas';

export const rootSaga = function* root() {
  yield all([
    watchLoaderUserAsync(),
    watchRegisterAsync(),
    watchLoginAsync(),
  ]);
};

export default rootSaga;
