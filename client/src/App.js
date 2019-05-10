import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Header from './components/Header'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Jokes from './components/Jokes'

function App() {
  return (
    <div className="App">
    <Route path='/' component={Header}/>
    <Route path='/login' component={SignIn}/>
    <Route path='/signup' component={SignUp}/>
    <Route path='/jokes' component={Jokes}/>
    </div>
  );
}

export default App;
