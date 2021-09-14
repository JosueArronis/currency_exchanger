import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

import AlertState from './context/alert/AlertState';

import './assets/css/App.css';

function App() {
  return (
    <>
      <AlertState>
          <Router>
            <div className='App'>
                <Navbar title='Currency Exchanger' icon='fab fa-github'></Navbar>
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
      </AlertState>
    </>
  );
}

export default App;
