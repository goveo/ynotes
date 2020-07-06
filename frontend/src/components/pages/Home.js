import React from 'react';
import Search from '../Search';
import NotesList from '../NotesList';
import Page from './Page';

export const Home = () => {
  return (
    <Page>
      <Search />
      <NotesList />
    </Page>
  );
};

export default Home;
