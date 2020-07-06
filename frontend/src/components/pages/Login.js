import React from 'react';
import LoginForm from '../auth/LoginForm';
import { Grid } from '@material-ui/core';

export const Login = () => {
  return (
    <div>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
