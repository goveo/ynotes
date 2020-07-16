export const LOAD_USER_ASYNC = 'LOAD_USER_ASYNC';
export const REGISTER_ASYNC = 'REGISTER_ASYNC';
export const LOGIN_ASYNC = 'LOGIN_ASYNC';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface LoadUserAsyncAction {
  type: typeof LOAD_USER_ASYNC;
}

export interface RegisterAsyncAction {
  type: typeof REGISTER_ASYNC;
  payload: UserCredentials,
}

export interface LoginAsyncAction {
  type: typeof LOGIN_ASYNC;
  payload: UserCredentials,
}

export type AuthActionSagaTypes =
  LoadUserAsyncAction
  | RegisterAsyncAction
  | LoginAsyncAction
