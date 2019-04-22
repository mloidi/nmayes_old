import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
    0% {
        visibility: hidden;
    }
    50% {
        visibility: visible;
    }
    100% {
        visibility: hidden;
    }
`;

const Area = styled.div`
  display: grid;
  position: absolute;
  background-color: white;
  width: 100%;
  font-size: 0.7rem;
  left: 0;
  top: 0;
  border: 0.1rem solid rgb(161, 207, 90);
  visibility: hidden;
  padding-left: 4rem;
  margin: 0.1rem;
  animation: ${animation} 2s;
`;

class Message extends Component {
  state = {
    title: 'Message',
    message: 'this is an example'
  };
  componentDidMount() {
    const message = this.props.message;
    this.setState({
      title: message.title,
      message: message.text
    });
  }

  render() {
    return (
      <Area>
        <h1>Message</h1>
        <p>{this.state.message}</p>
      </Area>
    );
  }
}

export default withRouter(Message);
