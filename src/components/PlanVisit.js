import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

import { Page, PageTitle } from '../css/Common.Style';

const page = 'Plan your visit';

export default class Events extends Component {
  render() {
    return (
      <Page>
        <Helmet>
          <title>Nicole Mayes | {page}</title>
        </Helmet>
        <PageTitle>{page}</PageTitle>
      </Page>
    );
  }
}