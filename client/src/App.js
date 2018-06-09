import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Games from './components/Games';
import GameDetails from './components/GameDetails';

import './App.css';

@inject('app', 'routing')
@withRouter
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SLEEVEDB</h1>
        </header>

        <div className="container">
          <Switch>
            <Route exact path="/" component={Games} />
            <Route path="/:gameId" component={GameDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
