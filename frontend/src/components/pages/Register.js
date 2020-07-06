import React from 'react';
import RegisterForm from '../auth/RegisterForm';
import { Grid } from '@material-ui/core';

export const Register = () => {
  return (
    <div>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
