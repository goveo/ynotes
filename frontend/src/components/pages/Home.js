import React from 'react';
import Search from '../Search';
import NotesList from '../NotesList';

export const Home = () => {
  return (
    <div>
      <Search />
      <NotesList />
    </div>
  );
};

export default Home;
