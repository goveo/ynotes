import React, { useContext, useEffect } from 'react';
import LoginForm from '../auth/LoginForm';
import Page from './Page';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

export const Login = ({ history }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      history.push('/');
    }
  }, [authContext.isAuthenticated, authContext.loading, history]);
  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LoginForm onSubmit={authContext.login} postContent={
            <Typography align="center">
              Do not have an account? <Link to='/register'>Register</Link>
            </Typography>
          } />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Login;
