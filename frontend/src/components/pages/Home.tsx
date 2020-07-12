import * as React from 'react';
import { Grid } from '@material-ui/core';
import Search from '../Search';
import NotesList from '../NotesList';
import Page from './Page';

export const Home: React.FC = () => {
  return (
    <Page>
      <Grid justify="center" container>
        <Grid item xs={12} sm={10} md={8}>
          <Search />
          <NotesList />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
