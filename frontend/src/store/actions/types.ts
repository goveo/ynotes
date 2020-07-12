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

interface GetNotesAction {
  type: typeof GET_NOTES;
  payload: Note[];
}

export interface NotePayload {
  title: string;
  description: string;
  color: string;
}

interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

interface UpdateNoteAction {
  type: typeof UPDATE_NOTE;
  payload: Note;
}

interface RemoveNoteAction {
  type: typeof REMOVE_NOTE;
  payload: number;
}

interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload: {
    notes: Note[],
    text: string,
  };
}

interface ReorderNotesAction {
  type: typeof REORDER_NOTES;
  payload: Note[];
}

interface ClearNotesAction {
  type: typeof CLEAR_NOTES;
  payload: null;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: null;
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

interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: User;
}

interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: null;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    token: string,
    user: User,
  };
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload: Error;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string,
    user: User,
  };
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: Error;
}

interface LogoutAction {
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
