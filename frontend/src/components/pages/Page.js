import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';

const Page = ({ children, ...restProps }) => {
  const authContext = useContext(AuthContext);
  const { loadUser, loading } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment {...restProps}>
      {!loading && children}
    </Fragment>
  );
};

export default Page;
