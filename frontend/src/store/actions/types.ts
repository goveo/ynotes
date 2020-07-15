export const GET_NOTES = 'GET_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const SET_SEARCH = 'SET_SEARCH';
export const REORDER_NOTES = 'REORDER_NOTES';
export const SET_LOADING = 'SET_LOADING';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_NOTES = 'CLEAR_NOTES';

export interface Note {
  id: number;
  index: number,
  title: string;
  description: string;
  color: string;
}

export interface NotesState {
  notes: Note[],
  search: {
    notes: Note[],
    text: string,
  },
  loading: boolean,
}

export interface GetNotesAction {
  type: typeof GET_NOTES;
  payload: Note[];
}

export interface NotePayload {
  title: string;
  description: string;
  color: string;
}

export interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

export interface UpdateNoteAction {
  type: typeof UPDATE_NOTE;
  payload: Note;
}

export interface RemoveNoteAction {
  type: typeof REMOVE_NOTE;
  payload: number;
}

export interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload: {
    notes: Note[],
    text: string,
  };
}

export interface ReorderNotesAction {
  type: typeof REORDER_NOTES;
  payload: Note[];
}

export interface ClearNotesAction {
  type: typeof CLEAR_NOTES;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export type NotesActionTypes =
  GetNotesAction
  | AddNoteAction
  | UpdateNoteAction
  | RemoveNoteAction
  | SetSearchAction
  | ReorderNotesAction
  | ClearNotesAction
  | SetLoadingAction

export interface User {
  id: number;
  username: string;
  token: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

type Error = string | null;

export interface AuthState {
  token: string | null,
  user: User | null,
  isAuthenticated: boolean | null,
  loading: boolean,
  error: Error,
}

export interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: User;
}

export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: Error;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    token: string,
    user: User,
  };
}

export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload: Error;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string,
    user: User,
  };
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: Error;
}

export interface LogoutAction {
  type: typeof LOGOUT;
  payload: Error;
}

export type AuthActionTypes =
  UserLoadedAction
  | AuthErrorAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
