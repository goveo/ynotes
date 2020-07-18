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
  setLoading,
} from '../actions/authActions';
import { User } from '../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOAD_USER_ASYNC,
  REGISTER_ASYNC,
  LOGIN_ASYNC,
  RegisterAsyncAction,
  LoginAsyncAction,
} from './types.sagas';

// Workers

// Load User
export function* loadUserAsync() {
  try {
    const token = yield localStorage.getItem('token');
    if (token) {
      yield put(setLoading());
      yield setAuthToken(token);
      const res = yield call(axios.get, '/api/auth');
      const user: User = res?.data;
      yield put(setUser(user));
    }
    else {
      yield put(logout());
    }
  }
  catch (error) {
    yield put(logout());
    yield put(setAuthError(error));
  }
}

// Register
export function* registerAsync(action: RegisterAsyncAction) {
  try {
    yield put(setLoading());
    const res = yield call(axios.post, '/api/users', action.payload);
    const token: string = res?.data?.token;
    const user: User = res?.data?.user;
    if (!token || !user) throw new Error('Register error');
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
    yield put(setLoading());
    const res = yield call(axios.post, '/api/auth', action.payload);
    const token: string = res?.data?.token;
    const user: User = res?.data?.user;
    if (!token || !user) throw new Error('Auth error');
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
