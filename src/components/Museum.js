import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Page, PageTitle } from '../css/Common.Style';

import { Service } from '../service/data.service';

const page = 'Museum';

export default class Museum extends Component {
  state = {
    museum: null,
    slug: null
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.getMuseumBySlug(slug);
  }
  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (slug !== this.state.slug) {
      this.getMuseumBySlug(slug);
    }
  }

  getMuseumBySlug = async slug => {
    await Service.getMuseumBySlug(slug)
      .then(museum => {
        this.setState({
          museum,
          slug
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Page>
        <div>
          <Helmet>
            <title>Nicole Mayes | {page}</title>
          </Helmet>
          {this.state.museum && (
            <React.Fragment>
              <PageTitle>{this.state.museum.name}</PageTitle>
              <p>{this.state.museum.university}</p>
            </React.Fragment>
          )}
        </div>
      </Page>
    );
  }
}
