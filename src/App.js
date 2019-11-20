import React from 'react';
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'
import HomeScreen from './Components/HomeScreen'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" render={(routerProps) => <Login {...routerProps}/>} />
        <Route path="/signup" render={(routerProps) => <Login {...routerProps}/>} />
        <Route path="/home" render={(routerProps) => <Login {...routerProps}/>} />

      </Switch>
      {/* <Login/>
      <Signup/> */}
      <HomeScreen/>
    </div>
  );
}

export default App;
