import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { Page, PageTitle } from '../css/Common.Style';
import { AlertContext } from './context/alert.context';
import { LoadingContext } from './context/loading.context';

const page = 'Home';

export default class Home extends Component {
  render() {
    return (
      <Page>
        <div>
          <Helmet>
            <title>Nicole Mayes</title>
          </Helmet>
          <PageTitle>{page}</PageTitle>

          <LoadingContext.Consumer>
            {loadingContext => (
              <AlertContext.Consumer>
                {alertContext => (
                  <div>
                    <button
                      onClick={() => {
                        loadingContext.setLoading(true);
                        alertContext.sendSuccess('Success');
                      }}
                      fontSize="1.5rem"
                    >
                      Success
                    </button>
                    <button
                      onClick={() => {
                        loadingContext.setLoading(true);
                        alertContext.sendWarning('Warning');
                      }}
                      fontSize="1.5rem"
                    >
                      Warning
                    </button>
                    <button
                      onClick={() => {
                        loadingContext.setLoading(true);
                        alertContext.sendError('Error');
                      }}
                      fontSize="1.5rem"
                    >
                      Error
                    </button>
                  </div>
                )}
              </AlertContext.Consumer>
            )}
          </LoadingContext.Consumer>
        </div>
      </Page>
    );
  }
}
