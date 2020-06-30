import React from 'react';
import Container from '@material-ui/core/Container';
import TasksList from './components/TasksList';
import Search from './components/Search';
import TasksState from './context/tasks/TasksState';


const App = () => {
  return (
    <TasksState>
      <div className="App">
        <Container>
          <Search />
          <TasksList />
        </Container>
      </div>
    </TasksState>
  );
};

export default App;
