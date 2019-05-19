import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBox from './SearchBox';
import Login from './Login';

const MenuHeader = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: 1rem;
  margin-top: 0.5rem;
  margin-left: 5rem;
  margin-right: 5rem;
`;

const HeaderAux = styled.div`
  text-transform: uppercase;
  display: grid;
  justify-content: end;
`;

const HeaderTitle = styled.div`
  font-size: 4rem;
  text-transform: uppercase;
  display: grid;
  justify-content: center;
  .link {
    color: rgb(161, 207, 90);
    text-decoration-line: none;
    transform: skewX(-20deg);
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
    }
  }
`;

const MenuBar = styled.ul`
  font-size: 1.2rem;
  text-transform: uppercase;
  list-style-type: none;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: center;
  grid-gap: 1rem;
  .link {
    font-family: 'Raleway', sans-serif;
    background-color: white;
    padding: 1rem;
    color: black;
    text-decoration: none;
    border: 0.1rem solid rgb(161, 207, 90);
    transition: border 0.5s, color 0.5s;
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
      color: white;
      background-color: rgb(161, 207, 90);
      border: 0.1rem solid rgb(161, 207, 90);
    }
  }
  .selected {
    outline: none;
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
    &:hover,
    &:focus {
      outline: none;
      color: black;
    }
  }
`;

export default class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <MenuHeader>
          <HeaderAux>
            <SearchBox />
            <Login />
          </HeaderAux>
          <HeaderTitle>
            <Link className="link" exact to={'/'}>
              Nicole Mayes
            </Link>
          </HeaderTitle>
          <MenuBar>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/about'}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/education'}
              >
                Education
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/museums'}
              >
                Museums
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/events'}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/visit'}
              >
                Plan your visit
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                exact
                to={'/blog'}
              >
                Blog
              </Link>
            </li>
          </MenuBar>
        </MenuHeader>
      </React.Fragment>
    );
  }
}
