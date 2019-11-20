import React, { Component } from 'react';
import './App.css';
import LandingPage from './Components/LandingPage'
import HomeScreen from './Components/HomeScreen'
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

  state = {
    currentUser: null
  }

  setUser = (user) => {
    console.log('setting user ', user)
    this.setState({
      currentUser: user
    }, () => { user ? this.props.history.push('/home') : this.props.history.push('/') })
  }

  render(){
    return (
    <div>
      <Switch>
        {/* <Route path="/" render={(routerProps) => <LandingPage setUser={this.setUser}{...routerProps}/>} /> */}
        <Route exact path="/home" render={(routerProps) => <HomeScreen {...routerProps}/>} />
      </Switch>
      {/* <Login/>
      <Signup/> */}
    </div>
  );
  }
  
}


