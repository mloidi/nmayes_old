import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  Page,
  PageTitle,
  Author,
  PostDetails,
  PublishedAt
} from '../../css/Common.Style';
import { Service } from '../../service/data.service';
import { AuthContext } from '../context/';
import TextEditor from '../editor/TextEditor';
import { cardDate, composeName } from '../common/Util';
import Icon from '../common/Icon';

const page = 'Edit Post';

export default class View extends Component {
  state = {
    post: null,
    slug: null,
    title: '',
    description: '',
    created: '',
    updated: '',
    coverPhoto: '',
    author: null,
    text: null
  };

  componentDidMount() {
    const authContext = this.context;
    const slug = this.props.match.params.slug;
    if (slug) {
      this.getPostBySlug(slug,authContext);
    }
  }
  componentDidUpdate() {
    const authContext = this.context;
    const slug = this.props.match.params.slug;
    if (slug !== this.state.slug) {
      if (slug) {
        this.getPostBySlug(slug,authContext);
      }
    }
  }

  getPostBySlug = async (slug,authContext) => {
    await Service.getPostBySlug(slug, authContext.isAuthenticated())
      .then(post => {
        this.setState({
          post,
          slug,
          title: post.title,
          description: post.description,
          created: post.created,
          updated: post.updated,
          coverPhoto: post.coverPhoto,
          author: post.author,
          text: post.text
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
          <PageTitle>{this.state.title}</PageTitle>

          <Link className="link" to={'/blog'}>
            <Icon icon="faArrowLeft" />
          </Link>
          <br />
          {this.state.coverPhoto && (
            <React.Fragment>
              <br />
              <img src={this.state.coverPhoto} alt={this.state.title} />
              <br />
            </React.Fragment>
          )}
          <br />
          <h2>{this.state.description}</h2>
          <PostDetails>
            <Author loggedUserIsAuthorOrNotAuthenticated={true}>
              By{' '}
              {this.state.author &&
                composeName(
                  this.state.author.firstName,
                  this.state.author.lastName
                )}
            </Author>
            <PublishedAt>
              {cardDate(this.state.created, this.state.updated)}
            </PublishedAt>
          </PostDetails>
          {this.state.text && (
            <TextEditor
              sendText={this.sendText}
              readOnly={true}
              editorState={JSON.parse(this.state.text)}
            />
          )}
        </div>
      </Page>
    );
  }
}
View.contextType = AuthContext;
