import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import NotesState from './context/notes/NotesState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/Navbar';
import './index.css';

setAuthToken(localStorage.getItem('token'));

export const App = () => {
  return (
    <AuthState>
      <NotesState>
        <Navbar />
        <Router>
          <div className="App">
            <Container>
              <Switch>
                <PrivateRoute exact path="/" component={Home}></PrivateRoute>
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
