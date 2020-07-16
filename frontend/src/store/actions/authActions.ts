import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  User,
  Error,
  UserCredentials,
  AuthActionTypes,
} from './types';

import {
  LOAD_USER_ASYNC,
  REGISTER_ASYNC,
  LOGIN_ASYNC,
  AuthActionSagaTypes,
} from '../sagas/types.sagas';

// Load User
export const loadUser = (): AuthActionSagaTypes => ({ type: LOAD_USER_ASYNC });
export const setUser = (user: User): AuthActionTypes => ({ type: USER_LOADED, payload: user });
export const setAuthError = (error: Error): AuthActionTypes => ({ type: AUTH_ERROR, payload: error });

// Register
export const register = (credentials: UserCredentials): AuthActionSagaTypes => ({ type: REGISTER_ASYNC, payload: credentials });
export const setRegisteredUser = (token: string, user: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: {
    token,
    user,
  },
});
export const setRegisterError = (error: Error): AuthActionTypes => ({ type: REGISTER_FAIL, payload: error });

// Login
export const login = (credentials: UserCredentials): AuthActionSagaTypes => ({ type: LOGIN_ASYNC, payload: credentials });
export const setLoginUser = (token: string, user: User): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
});
export const setLoginError = (error: Error): AuthActionTypes => ({ type: LOGIN_FAIL, payload: error });

// Logout
export const logout = (): AuthActionTypes => ({ type: LOGOUT });
