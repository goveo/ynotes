import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import LoginForm from '../auth/LoginForm';
import Page from './Page';
import { login } from '../../store/actions/authActions';
import { AuthState } from '../../store/actions/types';

const mapStateToProps = (state: { auth: AuthState }) => ({ authState: state.auth });

const connector = connect(mapStateToProps, { login });

export const Login: React.FC<RouteComponentProps & ConnectedProps<typeof connector>> = ({
  history,
  authState,
  login,
}) => {
  const { loading, isAuthenticated } = authState;
  useEffect(() => {
    if (isAuthenticated && !loading) {
      history.push('/');
    }
  }, [isAuthenticated, loading, history]);
  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <LoginForm onSubmit={login} postContent={
            <Typography align="center">
              Do not have an account? <Link to='/register'>Register</Link>
            </Typography>
          } />
        </Grid>
      </Grid>
    </Page>
  );
};

export default connector(Login);
