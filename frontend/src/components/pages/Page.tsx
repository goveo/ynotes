import React, { useEffect } from 'react';
import styled from 'styled-components';

import useSelector from '../../hooks/useSelector';
import { store } from '../../store/store';
import { CommonProps } from '../../types/CommonProps';

const Page: React.FC<CommonProps> = ({
  children,
  ...restProps
}) => {
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    store.dispatch.auth.loadUser();
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

export default Page;
