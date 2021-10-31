import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import useSelector from '../../hooks/useSelector';
import { store } from '../../store/store';
import RegisterForm from '../auth/RegisterForm';
import Page from './Page';

export const Register: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RegisterForm onSubmit={store.dispatch.auth.register} postContent={
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
