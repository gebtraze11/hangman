import React, { Component } from 'react';
import userService from '../../utils/userService';

class LoginPage extends Component {
  state = {
    email: '',
    pw: '',
    message: ''
  };

  updateMessage = (msg) => {
    this.setState({ message: msg })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/')
    } catch (err) {
      console.log(this)
      console.log(err)
      console.log('test')

      // Invalid credentials
      this.updateMessage('Invalid Credentials');
    }
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>

          <div>Email: 
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />            
          </div>
          <div>Password:
            <input
              name="pw"
              type="password"
              onChange={this.handleChange}
              value={this.state.pw}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
        { this.state.message 
          ? <p>${ this.state.message }</p>
          : ''
        }
      </div>
    );
  }
}

export default LoginPage;