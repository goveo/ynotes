import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { loadUser } from '../../store/actions/authActions';
import { CommonProps } from '../../types/CommonProps';
import { AuthState } from '../../store/actions/types';

const mapStateToProps = (state: { auth: AuthState }) => ({ loading: state.auth.loading });

const connector = connect(
  mapStateToProps,
  { loadUser },
);

const Page: React.FC<CommonProps & ConnectedProps<typeof connector>> = ({
  loading,
  loadUser,
  children,
  ...restProps
}) => {

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Root {...restProps}>
      {!loading && children}
    </Root>
  );
};

const Root = styled.div`
  margin-top: 20px;
`;

export default connector(Page);
