import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import useSelector from '../../hooks/useSelector';
import { store } from '../../store/store';
import LoginForm from '../auth/LoginForm';
import Page from './Page';

export const Login: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      history.push('/');
    }
  }, [isAuthenticated, loading, history]);

  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <LoginForm onSubmit={store.dispatch.auth.login} postContent={
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
