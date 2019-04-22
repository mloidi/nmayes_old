import styled from 'styled-components';

export const Page = styled.div`
  background-color: transparent;
  margin-top: 2rem;
  margin-left: 7rem;
  margin-right: 7rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  color: black;
`;

export const CardArea = styled.div`
  background-color: white;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2),
    0 0.5rem 1rem 0 rgba(0, 0, 0, 0.19);
  padding: 0.5rem;
  cursor: pointer;
  &:hover,
  &:focus {
    box-shadow: 0 1rem 2rem 0 rgb(161, 207, 90), 0 1rem 2rem 0 rgb(161, 207, 90);
  }
`;

export const Card = styled.div`
  display: inline-grid;
  grid-template-columns: auto 1%;
  /* width: 100%; */
`;

export const CardPost = styled.div`
  padding: 0;
  cursor: pointer;
`;
export const CardPostContent = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

export const CardSeparator = styled.div`
  margin-right: 0.5rem;
  border-right: 0.1rem solid #ddd;
  align-content: end;
`;
export const CardHorizontalSeparator = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #ddd;
  align-content: center;
`;

export const CardPostBar = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  padding: 0.5rem;
  .link {
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
  }
`;

export const Button = styled.button`
  font-size: ${props => props.fontSize};
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
