import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps} from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import RegisterForm from '../auth/RegisterForm';
import Page from './Page';
import { register } from '../../store/actions/authActions';
import { AuthState } from '../../store/actions/types';

const mapStateToProps = (state: { auth: AuthState }) => ({ isAuthenticated: state.auth.isAuthenticated });

const connector = connect(mapStateToProps, { register });

export const Register: React.FC<RouteComponentProps & ConnectedProps<typeof connector>> = ({
  history,
  isAuthenticated,
  register,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RegisterForm onSubmit={register} postContent={
            <Typography align="center">
              Already have an account? <Link to='/login'>Login</Link>
            </Typography>
          }/>
        </Grid>
      </Grid>
    </Page>
  );
};

export default connector(Register);
