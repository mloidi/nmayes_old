import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { Page, PageTitle } from '../css/Common.Style';

const page = 'Not found';

export default class NotFound extends Component {
  render() {
    return (
      <Page>
        <div>
          <Helmet>
            <title>Nicole Mayes | {page}</title>
          </Helmet>
          <PageTitle>{page}</PageTitle>
        </div>
      </Page>
    );
  }
}
