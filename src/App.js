import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import userService from './utils/userService';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/Mainpage/MainPage';
import './App.css';

class App extends Component {
  state = {
    user: userService.getUser()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }
  handleWin =() =>{
    userService.handleWin()
  }
  getWinScore=()=>{
    return userService.getWinScore
  }
  render() {
    return (
      <div>
        <header>
         
          <h1 className="App-header">Sucide Man</h1>
          
          <p>
            { 
              this.state.user 
              ? `Welcome, ${this.state.user.name}`
              : 'Please Sign Up' 
            }
          </p>       
          
          { this.state.user
            ? <ul>
                <li><Link to="" onClick={this.handleLogout}>Logout</Link></li>
              </ul>
            : <ul>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
          }
        </header>


        <Switch>
          <Route exact path="/signup" render={({ history }) => 
            <SignUpPage 
              history={history} 
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />

          <Route exact path="/login" render={({ history }) => 
            <LoginPage 
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin} 
            />
          } />
        </Switch>
        <MainPage

        handleWin = {this.handleWin}
        getWinScore = {userService.getWinScore}
        />
        <br />
      </div>
    );
  }
}

export default App;
