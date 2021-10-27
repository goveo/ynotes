import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { CommonProps } from '../../types/CommonProps';
import { AuthState } from '../../store/actions/types';

interface Props extends CommonProps {
  component: React.ElementType,
  exact?: boolean,
  path: string,
}

const mapStateToProps = (state: { auth: AuthState }) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const connector = connect(mapStateToProps);

const PrivateRoute: React.FC<Props & ConnectedProps<typeof connector>> = ({
  isAuthenticated,
  loading,
  component: Component,
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={(props) => (
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      )}
    />
  );
};

export default connector(PrivateRoute);
