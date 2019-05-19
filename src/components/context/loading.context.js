import React, { Component } from 'react';

export const LoadingContext = React.createContext();

export class LoadingProvider extends Component {
  state = {
    loading: false,
    setLoading: loading => {
      this.setState({ loading });
    }
  };
  render() {
    return (
      <LoadingContext.Provider value={this.state}>
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}
