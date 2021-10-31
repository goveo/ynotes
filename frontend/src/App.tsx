import './index.css';

import Container from '@material-ui/core/Container';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { API_URL } from './app.config';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import { store } from './store/store';
import setBaseUrl from './utils/setBaseUrl';

setBaseUrl(API_URL);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
