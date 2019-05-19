import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import {
  Page,
  PageTitle,
  Button,
  CardHorizontalSeparator
} from '../css/Common.Style';
import { Service } from '../service/data.service';
import { CardBlog } from './Card';
import Icon from './common/Icon';
import { AuthContext } from './context/';
import Tag from './tag/Tag';

const page = 'Blog';

const Area = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

const ControlsBar = styled.div`
  border-bottom: 0.2rem solid rgb(161, 207, 90);
`;

export default class Blog extends Component {
  state = {
    posts: null
  };

  componentDidMount() {
    const authContext = this.context;
    this.getPosts(authContext.isAuthenticated());
  }

  getPosts = async isAuthenticated => {
    await Service.getPosts(isAuthenticated)
      .then(posts => {
        this.setState({
          posts
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  goTo = (option, slug) => {
    const to = '/post/' + option + '/' + slug;
    this.props.history.push(to);
  };

  delete = async (id, postTitle, alertContext) => {
    await Service.deletePostById(id)
      .then(() => {
        alertContext.sendSuccess(postTitle + " it's deleted.");
        this.getPosts(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    let row = 1;
    return (
      <AuthContext.Consumer>
        {authContext => (
          <Page>
            <div>
              <Helmet>
                <title>Nicole Mayes | {page}</title>
              </Helmet>
              <PageTitle>{page}</PageTitle>
              {authContext.isAuthenticated() && (
                <ControlsBar>
                  <Button
                    onClick={() => this.goTo('new', '')}
                    fontSize="1.5rem"
                  >
                    <Icon icon="faPlus" /> New post
                  </Button>
                </ControlsBar>
              )}
              {this.state.posts &&
                this.state.posts.map(postRow => (
                  <React.Fragment key={row++}>
                    <Area>
                      {postRow.map(post => (
                        <React.Fragment key={post._id}>
                          <CardBlog
                            key={post._id}
                            post={post}
                            delete={this.delete}
                            {...this.props}
                          />
                        </React.Fragment>
                      ))}
                    </Area>
                    <CardHorizontalSeparator />
                  </React.Fragment>
                ))}
            </div>
            <Tag tags={this.state.tags} />
          </Page>
        )}
      </AuthContext.Consumer>
    );
  }
}
Blog.contextType = AuthContext;
