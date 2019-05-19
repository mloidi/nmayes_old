import React, { Component } from 'react';

export const cookieName = 'AUTH_TOKEN';

export const AuthContext = React.createContext();

export const getAuthToken = () => {
  const authToken = localStorage.getItem(cookieName);
  if (typeof authToken === 'string' && authToken === 'null') return null;
  return authToken;
};

export class AuthProvider extends Component {
  state = {
    token: null,
    user: null,
    login: (token, user) => {
      localStorage.setItem(cookieName, token);
      this.setState({ token, user });
    },
    logout: () => {
      localStorage.removeItem(cookieName);
      this.setState({ token: null, user: null });
    },
    getUser: () => {
      if (this.state.user && getAuthToken()) return this.state.user;
      return null;
    },
    getToken: () => {
      return getAuthToken();
    },
    isAuthenticated: () => {
      if (getAuthToken()) return true;
      return false;
    }
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
