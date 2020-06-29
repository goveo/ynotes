import React from 'react';
import Container from '@material-ui/core/Container';
import TasksList from './components/TasksList';

const App = () => {
  return (
    <div className="App">
      <Container>
        <TasksList />
      </Container>
    </div>
  );
};

export default App;
