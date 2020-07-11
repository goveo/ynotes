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
  UserCredentials,
} from './types';

// Load User
export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    setAuthToken(localStorage.getItem('token'));
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  }
  catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register
export const register = (user: UserCredentials): AppThunk => async (dispatch) => {
  try {
    const res = await axios.post('/api/users', user);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
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
export const login = (user: UserCredentials): AppThunk => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth', user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser();
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
