import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { Service } from '../service/data.service';
import Input from './common/Input';
import Icon from './common/Icon';

const SearchArea = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  .link {
    text-decoration-line: none;
    font-size: 1rem;
    color: rgb(161, 207, 90);
    background-color: transparent;
    cursor: pointer;
    border: 0.1rem solid transparent;
    padding: 0.3rem;
    &:hover,
    &:focus {
      outline: none;
      color: white;
      background-color: rgb(161, 207, 90);
      border: 0.1rem solid rgb(161, 207, 90);
    }
  }
`;

const SearchButton = styled.button`
  font-size: 1rem;
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

const Results = styled.div`
  display: grid;
  position: absolute;
  background-color: white;
  width: 100%;
  font-size: 0.7rem;
  left: 2rem;
  top: 3rem;
  border: 0.1rem solid rgb(161, 207, 90);
`;

const Result = styled.div`
  border: 0.1rem solid transparent;
  padding: 0.2rem;
  cursor: pointer;
  &:hover,
  &:focus {
    color: white;
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;

class SearchBox extends Component {
  state = {
    showSearch: false,
    searchBy: '',
    results: null
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.search(value);
    this.setState({
      [name]: value
    });
  };

  search = async searchBy => {
    await Service.search(searchBy)
      .then(results => {
        this.setState({
          results
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  showSearch = () => {
    const showSearch = !this.state.showSearch;
    this.setState({
      showSearch
    });
  };

  goTo = slug => {
    const to = '/museum/' + slug;
    this.setState({
      showSearch: false,
      searchBy: '',
      results: null
    });
    this.props.history.push(to);
  };

  render() {
    return (
      <SearchArea>
        <SearchButton onClick={this.showSearch}>
          <Icon icon="faSearch" />
        </SearchButton>
        <Input
          type="text"
          id="searchBy"
          name="searchBy"
          show={this.state.showSearch}
          isValid={true}
          placeholder="Search ..."
          value={this.state.searchBy}
          onChange={this.handleInputChange}
        />
        {this.state.showSearch && this.state.results && (
          <React.Fragment>
            <div />
            <Results>
              {this.state.results.length > 0 &&
                this.state.results.map(result => (
                  <Result
                    key={result.id}
                    onClick={() => this.goTo(result.slug)}
                  >
                    {result.name}
                  </Result>
                ))}
            </Results>
          </React.Fragment>
        )}
      </SearchArea>
    );
  }
}

export default withRouter(SearchBox);
