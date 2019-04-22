import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { Page, PageTitle } from '../css/Common.Style';

const page = 'Home';

export default class Home extends Component {
  render() {
    return (
      <Page>
        <Helmet>
          <title>Nicole Mayes</title>
        </Helmet>
        <PageTitle>{page}</PageTitle>
      </Page>
    );
  }
}
