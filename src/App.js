import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TasksList from './components/TasksList';

const App = () => {
  return (
    <div className="App">
      <Typography>
        <Container>
          <TasksList />
        </Container>
      </Typography>
    </div>
  );
};

export default App;
