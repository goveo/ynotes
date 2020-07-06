import React, { useContext, useEffect } from 'react';
import RegisterForm from '../auth/RegisterForm';
import Page from './Page';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

export const Register = ({ history }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      history.push('/');
    }
  }, [authContext.isAuthenticated, history]);
  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RegisterForm onSubmit={authContext.register} postContent={
            <Typography align="center">
              Already have an account? <Link to='/login'>Login</Link>
            </Typography>
          }/>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Register;
