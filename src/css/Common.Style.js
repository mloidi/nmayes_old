import styled from 'styled-components';

export const Page = styled.div`
  background-color: transparent;
  margin-top: 2rem;
  margin-left: 7rem;
  margin-right: 7rem;
  display: grid;
  grid-template-columns: 80% 20%;
  .link {
    color: rgb(161, 207, 90);
    background-color: transparent;
    cursor: pointer;
    border: 0.1rem solid transparent;
    padding: 0.3rem;
    text-decoration: none;
    &:hover,
    &:focus {
      outline: none;
      color: rgba(243, 255, 239, 0.99);
      background-color: rgb(161, 207, 90);
      border: 0.1rem solid rgb(161, 207, 90);
    }
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  color: black;
`;

export const CardArea = styled.div`
  background-color: rgba(243, 255, 239, 0.99);
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
`;

export const CardPost = styled.div`
  padding: 0;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.7;
  }
`;
export const CardPostContent = styled.div`
  padding: 0 1rem 1rem 1rem;
  cursor: pointer;
`;

export const CardSeparator = styled.div`
  margin-top: 1rem;
  margin-right: 0.5rem;
  border-right: 0.1rem solid #f4f4f4;
  align-content: end;
`;

export const CardHorizontalSeparator = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #f4f4f4;
  align-content: center;
`;

export const CardPostBar = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  .link {
    color: rgb(161, 207, 90);
    background-color: transparent;
    cursor: pointer;
    border: 0.1rem solid transparent;
    padding: 0.3rem;
    text-decoration: none;
    &:hover,
    &:focus {
      outline: none;
      color: rgba(243, 255, 239, 0.99);
      background-color: rgb(161, 207, 90);
      border: 0.1rem solid rgb(161, 207, 90);
    }
  }
`;

export const PostDetails = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 1rem;
  color: gray;
`;

export const Author = styled.div`
  text-align: Start;
  padding: 0;
  font-size: 0.8rem;
  color: ${props =>
    props.loggedUserIsAuthorOrNotAuthenticated ? 'gray' : 'red'};
`;

export const PublishedAt = styled.div`
  text-align: End;
  padding: 0;
  font-size: 0.8rem;
`;

export const PostDescription = styled.div`
  display: grid;
  margin-bottom: 1rem;
  color: gray;
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
    color: rgba(243, 255, 239, 0.99);
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;
