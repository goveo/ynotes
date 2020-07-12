import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { AppThunk } from '../index';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  User,
  UserCredentials,
} from './types';

// Load User
export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    setAuthToken(localStorage.getItem('token'));
    const { data: user }: { data: User } = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: user,
    });
  }
  catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register
export const register = (credentials: UserCredentials): AppThunk => async (dispatch) => {
  try {
    const { data: user }: { data: User } = await axios.post('/api/users', credentials);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: user,
    });
  }
  catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message
        || (error.response.data.errors[0] && error.response.data.errors[0].msg),
    });
  }
};

// Login
export const login = (credentials: UserCredentials): AppThunk => async (dispatch) => {
  try {
    const { data: { token, user } }: { data: { token: string, user: User }} = await axios.post('/api/auth', credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
    dispatch(loadUser());
  }
  catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout
export const logout = (): AppThunk => async (dispatch) => dispatch({ type: LOGOUT });