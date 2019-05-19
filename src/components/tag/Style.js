import styled from 'styled-components';

export const Button = styled.button`
  font-size: ${props => props.fontSize};
  color: rgb(161, 207, 90);
  background-color: transparent;
  cursor: pointer;
  border: 0.1rem solid transparent;
  padding: 0.3rem;
  transition: border 0.5s, color 0.5s, background-color 0.5s;
  &:hover,
  &:focus {
    color: rgba(243, 255, 239, 0.99);
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;

export const TagArea = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  background-color: rgba(243, 255, 239, 0.99);
  .noSelected {
    border: 0.1rem solid transparent;
    background-color: transparent;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    color: rgb(161, 207, 90);
    text-transform: uppercase;
    cursor: pointer;
    text-align: start;
    &:hover,
    &:focus {
      font-weight: 900;
    }
  }
  .selected {
    border: 0.1rem solid rgb(161, 207, 90);
    background-color: transparent;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    color: rgb(161, 207, 90);
    text-transform: uppercase;
    cursor: pointer;
    text-align: start;
    font-weight: 900;
  }
`;

export const TagLine = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  border-bottom: 0.1rem solid #f4f4f4;
`;

export const TagNewLine = styled.div`
  padding-left: 0.5rem;
  border-bottom: 0.1rem solid #f4f4f4;
`;

export const TagButtonsArea = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-end;
`;

export const TagButton = styled.button`
  margin: 0.5rem 0;
  font-size: 0.8rem;
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

export const InputText = styled.input`
  border: none;
  border-bottom: 0.1rem solid #ccc;
  text-align: start;
  width: 90%;
  padding: 0 0 0 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  background-color: transparent;
  transition: border-color 0.5s;
  :focus {
    outline: none;
    border-color: rgb(161, 207, 90);
  }
`;
