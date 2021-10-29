import { createModel } from '@rematch/core';
import axios from 'axios';

import { RootModel } from '../root.model';

export interface User {
  id: number;
  username: string;
  token: string;
}

export type Error = string | null;

export type AuthState = {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean,
    loading: boolean,
    initialLoading: boolean,
    error: Error,
};

export interface UserCredentials {
  username: string;
  password: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  loading: true,
  initialLoading: true,
  error: null,
};

const getAxiosConfig = () => {
  return {
    headers: {
      'X-Auth-Token': localStorage.getItem('token'),
    },
  };
};

export const auth = createModel<RootModel>()({
  state: initialState,
  reducers: {
    USER_LOADED(state: AuthState, payload: User) {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        initialLoading: false,
        user: payload,
      };
    },
    REGISTER_SUCCESS(state: AuthState, payload: { token: string, user: User }) {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        initialLoading: false,
      };
    },
    LOGIN_SUCCESS(state: AuthState, payload: { token: string, user: User }) {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        initialLoading: false,
      };
    },
    REGISTER_FAIL(state: AuthState, payload: Error) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        initialLoading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    },
    LOGIN_FAIL(state: AuthState, payload: Error) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        initialLoading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    },
    AUTH_ERROR(state: AuthState, payload: Error) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        initialLoading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    },
    LOGOUT(state: AuthState) {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        initialLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    },
    SET_USER_LOADING(state: AuthState) {
      return {
        ...state,
        loading: true,
      };
    },
  },
  effects: (dispatch) => ({
    async logout() {
      dispatch.auth.LOGOUT();
    },
    async setUser(user: User) {
      dispatch.auth.USER_LOADED(user);
    },
    async setAuthError(error: Error) {
      dispatch.auth.AUTH_ERROR(error);
    },
    async setLoading() {
      dispatch.auth.SET_USER_LOADING();
    },
    async loadUser() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          dispatch.auth.SET_USER_LOADING();
          const res = await axios.get<User>('/api/auth', getAxiosConfig());
          const user: User = res.data;
          dispatch.auth.setUser(user);
        }
        else {
          dispatch.auth.logout();
        }
      }
      catch (error) {
        dispatch.auth.logout();
        dispatch.auth.setAuthError(error as string);
      }
    },
    async register(credentials: UserCredentials) {
      try {
        dispatch.auth.setLoading();
        const res = await axios.post<{ token: string, user: User }>('/api/users', credentials, getAxiosConfig());
        const token: string = res.data.token;
        const user: User = res.data.user;
        if (!token || !user) throw new Error('Register error');
        dispatch.auth.REGISTER_SUCCESS({ token, user });
        dispatch.auth.loadUser();
      }
      catch (error: any) {
        console.error(error.message);
        dispatch.auth.REGISTER_FAIL(error.response.data.message
          || error.response?.data?.errors[0]?.msg
          || error.message);
      }
    },

    async login(credentials: UserCredentials) {
      try {
        dispatch.auth.setLoading();
        const res = await axios.post<{ token: string, user: User }>('/api/auth', credentials, getAxiosConfig());
        const token: string = res?.data?.token;
        const user: User = res?.data?.user;
        if (!token || !user) throw new Error('Auth error');
        dispatch.auth.LOGIN_SUCCESS({ token, user });
        dispatch.auth.loadUser();
      }
      catch (error: any) {
        console.error(error.message);
        dispatch.auth.LOGIN_FAIL(error.response?.data?.message || error.message);
      }
    },
  }),
});
