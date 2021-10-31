import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import useSelector from '../../hooks/useSelector';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {
  component: React.ElementType;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...restProps
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Route
      {...restProps}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
