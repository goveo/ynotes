import React from 'react';
import Container from '@material-ui/core/Container';
import TasksList from './components/TasksList';
import TasksState from './context/tasks/TasksState';


const App = () => {
  return (
    <TasksState>
      <div className="App">
        <Container>
          <TasksList />
        </Container>
      </div>
    </TasksState>
  );
};

export default App;
