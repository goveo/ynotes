import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import NotesState from './context/notes/NotesState';
import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <NotesState>
        <Router>
          <div className="App">
            <Container>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </NotesState>
    </AuthState>
  );
};

export default App;
