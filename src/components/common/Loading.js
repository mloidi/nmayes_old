import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`;

const Area = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const Spinner = styled.div`
  opacity: 1 !important;
  position: absolute;
  left: 1rem;
  top: 1rem;
  border: 16px solid #f3f3f3;
  border-top: 16px solid rgb(161, 207, 90);
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: ${spin} 2s linear infinite;
`;

const Loading = props => {
  return (
    <React.Fragment>
      <Area>
        <Spinner />
      </Area>
    </React.Fragment>
  );
};

export default Loading;
