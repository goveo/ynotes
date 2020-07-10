import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import NotesState from './context/notes/NotesState';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/Navbar';

import setAuthToken from './utils/setAuthToken';
import setBaseUrl from './utils/setBaseUrl';
import { API_URL } from './app.config';

import './index.css';

setAuthToken(localStorage.getItem('token'));
setBaseUrl(API_URL);

export const App: React.FC = () => {
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
                <PrivateRoute path="" component={NotFound} />
              </Switch>
            </Container>
          </div>
        </Router>
      </NotesState>
    </AuthState>
  );
};

export default App;
