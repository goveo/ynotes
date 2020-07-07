import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.getItem('token'));

    try {
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
  const register = async (user) => {
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
  const login = async (user) => {
    try {
      const res = await axios.post('/api/auth', user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      await loadUser();
    }
    catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
