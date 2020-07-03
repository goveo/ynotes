import React from 'react';
import Container from '@material-ui/core/Container';
import NotesList from './components/NotesList';
import Search from './components/Search';
import NotesState from './context/notes/NotesState';


const App = () => {
  return (
    <NotesState>
      <div className="App">
        <Container>
          <Search />
          <NotesList />
        </Container>
      </div>
    </NotesState>
  );
};

export default App;
