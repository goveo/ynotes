import React from 'react';
import Page from './Page';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
        >Back to notes</Typography>
      </Link>

    </Page>
  );
};

export default NotFound;
