import React, { useContext, useEffect } from 'react';
import RegisterForm from '../auth/RegisterForm';
import Page from './Page';
import { Grid } from '@material-ui/core';

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
          <RegisterForm onSubmit={authContext.register}/>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Register;
