import React, { Component } from 'react';
import { ALERT_TYPE } from '../common/Constants';

export const AlertContext = React.createContext();

export class AlertProvider extends Component {
  state = {
    alert: { text: 'hello', type: ALERT_TYPE.SUCCESS, active: false },
    setAlert: alert => {
      this.setState({ alert });
    },
    resetAlert: () => {
      this.state.setAlert({
        text: '',
        type: ALERT_TYPE.SUCCESS,
        active: false
      });
    },
    sendSuccess: text => {
      this.state.setAlert({
        text,
        type: ALERT_TYPE.SUCCESS,
        active: true
      });
    },
    sendWarning: text => {
      this.state.setAlert({
        text,
        type: ALERT_TYPE.WARNING,
        active: true
      });
    },
    sendError: text => {
      this.state.setAlert({
        text,
        type: ALERT_TYPE.ERROR,
        active: true
      });
    }
  };
  render() {
    return (
      <AlertContext.Provider value={this.state}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
