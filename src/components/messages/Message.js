import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { AlertContext } from '../context/alert.context';
import { LoadingContext } from '../context/loading.context';
import { ALERT_TYPE } from '../common/Constants';
import Icon from '../common/Icon';

const Area = styled.div`
  display: grid;
  position: absolute;
  background-color: white;
  width: 50%;
  left: 25%;
  top: 25%;
  color: ${props => props.color};
  border: 0.1rem solid ${props => props.color};
  z-index: 10;
`;

const MessageRow = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  margin: 1rem;
  justify-content: start;
  grid-gap: 2rem;
`;

const ButtonRow = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
  margin: 1rem;
  justify-content: end;
  grid-gap: 1rem;
`;

const IconStyle = styled.div`
  font-size: 4rem;
`;

const Text = styled.div`
  color: black;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 1rem;
  font-size: 1rem;
  color: ${props => props.color};
  border: 0.1rem solid ${props => props.color};
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: ${props => props.color};
    border: 0.1rem solid ${props => props.color};
  }
`;

class Message extends Component {
  state = {
    title: 'Message',
    message: 'this is an example'
  };

  getColor = type => {
    return type === ALERT_TYPE.SUCCESS
      ? 'rgb(161, 207, 90)'
      : type === ALERT_TYPE.WARNING
      ? '#ecd018'
      : 'red';
  };

  render() {
    return (
      <AlertContext.Consumer>
        {alertContext =>
          alertContext.alert.active ? (
            <Area color={this.getColor(alertContext.alert.type)}>
              <MessageRow>
                <IconStyle>
                  {alertContext.alert.type === ALERT_TYPE.SUCCESS ? (
                    <Icon icon="faCheckCircle" />
                  ) : alertContext.alert.type === ALERT_TYPE.WARNING ? (
                    <Icon icon="faExclamationCircle" />
                  ) : (
                    <Icon icon="faTimes" />
                  )}
                </IconStyle>
                <Text>{alertContext.alert.text}</Text>
              </MessageRow>
              <LoadingContext.Consumer>
                {loadingContext => (
                  <ButtonRow>
                    <Button
                      color={this.getColor(alertContext.alert.type)}
                      onClick={() => {
                        loadingContext.setLoading(false);
                        alertContext.resetAlert();
                      }}
                    >
                      OK
                    </Button>
                  </ButtonRow>
                )}
              </LoadingContext.Consumer>
            </Area>
          ) : (
            <div />
          )
        }
      </AlertContext.Consumer>
    );
  }
}

export default withRouter(Message);
