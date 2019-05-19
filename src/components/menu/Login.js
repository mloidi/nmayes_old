import React, { Component } from 'react';
import styled from 'styled-components';

import { AuthService } from '../../service/auth.service';
import Input from '../common/Input';
import Icon from '../common/Icon';
import { AuthContext } from '../context/';

const LoginArea = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: end;
  align-items: center;
  grid-gap: 1rem;
  font-size: 0.8rem;
`;

const LoginButton = styled.button`
  display: ${props => (props.show ? 'block' : 'none')};
  font-size: 1rem;
  color: rgb(161, 207, 90);
  background-color: transparent;
  cursor: pointer;
  border: 0.1rem solid transparent;
  padding: 0.3rem;
  &:hover,
  &:focus {
    color: white;
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;

const Error = styled.div`
  color: red;
`;

export default class Login extends Component {
  state = {
    username: '',
    usernameIsValid: true,
    password: '',
    passwordIsValid: true,
    user: null,
    showLoginForm: false,
    error: null
  };

  componentDidMount() {
    const authContext = this.context;
    if (authContext.isAuthenticated()) this.getUser(authContext);
  }

  getUser = async authContext => {
    const user = await AuthService.getUser().catch(error => {
      authContext.logout();
      const showLoginForm = true;
      this.setState({
        username: '',
        usernameIsValid: true,
        password: '',
        passwordIsValid: true,
        error,
        showLoginForm
      });
    });
    if (user) {
      authContext.login(authContext.getToken(), user);
      this.setState({
        user
      });
    }
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  showLoginForm = () => {
    const showLoginForm = !this.state.showLoginForm;
    this.setState({
      showLoginForm
    });
  };

  login = async authContext => {
    const username = this.state.username;
    const password = this.state.password;
    await AuthService.login(username, password)
      .then(({ user, authToken }) => {
        const showLoginForm = !this.state.showLoginForm;
        authContext.login(authToken, user);
        this.setState({
          showLoginForm,
          user,
          error: null
        });
      })
      .catch(error => {
        authContext.setToken(null);
        this.setState({
          usernameIsValid: false,
          passwordIsValid: false,
          error
        });
      });
  };

  logout = async authContext => {
    const username = this.state.username;
    const password = this.state.password;
    await AuthService.logout(username, password)
      .then(logout => {
        authContext.logout();
        if (logout) {
          this.setState({
            username: '',
            usernameIsValid: true,
            password: '',
            passwordIsValid: true,
            user: null,
            showLoginForm: false
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <LoginArea>
        <AuthContext.Consumer>
          {authContext =>
            authContext.isAuthenticated() ? (
              <React.Fragment>
                {this.state.user && (
                  <div>
                    {this.state.user.firstName + ' ' + this.state.user.lastName}
                  </div>
                )}
                <LoginButton
                  onClick={() => this.logout(authContext)}
                  show={!this.state.showLoginForm}
                >
                  <Icon icon="faSignOutAlt" />
                </LoginButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Error>{this.state.error && this.state.error.message}</Error>
                <LoginButton
                  onClick={this.showLoginForm}
                  show={!this.state.showLoginForm}
                >
                  <Icon icon="faUser" />
                </LoginButton>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  show={this.state.showLoginForm}
                  isValid={this.state.usernameIsValid}
                  placeholder="User name"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  show={this.state.showLoginForm}
                  isValid={this.state.passwordIsValid}
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <LoginButton
                  onClick={() => this.login(authContext)}
                  show={this.state.showLoginForm}
                >
                  <Icon icon="faSignInAlt" />
                </LoginButton>
              </React.Fragment>
            )
          }
        </AuthContext.Consumer>
      </LoginArea>
    );
  }
}
Login.contextType = AuthContext;
