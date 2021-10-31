import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Page from './Page';

const NotFound: React.FC = () => {
  return (
    <Page>
      <Typography
        align="center"
        variant="h3"
        component="h1"
        style={{
          marginTop: '30px',
        }}
      >
        Page Not Found
      </Typography>

      <Link to='/'>
        <Typography
          align="center"
          variant="subtitle1"
          style={{
            marginTop: '10px',
          }}
        >
          Back to notes
        </Typography>
      </Link>

    </Page>
  );
};

export default NotFound;
