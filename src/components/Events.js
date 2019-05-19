import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { Page, PageTitle } from '../css/Common.Style';

const page = 'Calendar of Events';

export default class Events extends Component {
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
