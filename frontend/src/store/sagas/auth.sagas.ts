import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  setUser,
  setAuthError,
  setRegisterError,
  setRegisteredUser,
  logout,
  setLoginUser,
  loadUser,
  setLoginError,
} from '../actions/authActions';
import { User } from '../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOAD_USER_ASYNC,
  REGISTER_ASYNC,
  RegisterAsyncAction,
  LoginAsyncAction,
  LOGIN_ASYNC,
} from './types.sagas';

// Workers

// Load User
export function* loadUserAsync() {
  try {
    const token = yield localStorage.getItem('token');
    if (token) {
      yield setAuthToken(token);
      const { data: user }: { data: User } = yield call(axios.get, '/api/auth');
      yield put(setUser(user));
    }
    else {
      yield put(logout());
    }
  }
  catch (error) {
    console.error(error.message);
    yield put(setAuthError(error));
  }
}

// Register
export function* registerAsync(action: RegisterAsyncAction) {
  try {
    const { data: { user, token } }: { data: { user: User, token: string } } = yield call(axios.post, '/api/users', action.payload);
    yield put(setRegisteredUser(token, user));
    yield put(loadUser());
  }
  catch (error) {
    console.error(error.message);
    yield put(setRegisterError(error.response.data.message
      || error.response?.data?.errors[0]?.msg
      || error.message));
  }
}

// Login
export function* loginAsync(action: LoginAsyncAction) {
  try {
    const { data: { token, user } }: { data: { token: string, user: User }} = yield call(axios.post, '/api/auth', action.payload);
    yield put(setLoginUser(token, user));
    yield put(loadUser());
  }
  catch (error) {
    console.error(error.message);
    yield put(setLoginError(error.response?.data?.message || error.message));
  }
}


// Watchers
export function* watchLoaderUserAsync() {
  yield takeEvery(LOAD_USER_ASYNC, loadUserAsync);
}

export function* watchRegisterAsync() {
  yield takeEvery(REGISTER_ASYNC, registerAsync);
}

export function* watchLoginAsync() {
  yield takeEvery(LOGIN_ASYNC, loginAsync);
}
