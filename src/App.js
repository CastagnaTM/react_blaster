import React, { Component } from 'react';
import './App.css';
import TitleScreen from './Components/TitleScreen'
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

  render(){
    return (
    <div>
      <Switch>
        {/* <Route path="/" render={(routerProps) => <LandingPage setUser={this.setUser}{...routerProps}/>} /> */}
        <Route exact path="/" render={(routerProps) => <TitleScreen {...routerProps}/>} />
      </Switch>
    </div>
  );
  }
  
}


