import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Page, PageTitle } from '../css/Common.Style';
import { Service } from '../service/data.service';
import Card from './Card';

const page = 'Museums';

const Area = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 4rem;
`;

export default class Museums extends Component {
  state = {
    museums: null
  };

  componentDidMount() {
    this.getMuseums();
  }

  getMuseums = async () => {
    await Service.getMuseums()
      .then(museums => {
        this.setState({
          museums
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Page>
        <Helmet>
          <title>Nicole Mayes | {page}</title>
        </Helmet>
        <PageTitle>{page}</PageTitle>
        <p>Description !!!!</p>
        <Area>
          {this.state.museums &&
            this.state.museums.map(museum => (
              <Card key={museum.id} museum={museum} />
            ))}
        </Area>
      </Page>
    );
  }
}
