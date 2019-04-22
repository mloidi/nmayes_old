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
import Message from './messages/Message';

const page = 'Blog';

const Area = styled.div`
  display: grid;
  grid-template-columns: 20rem 20rem 20rem;
  grid-gap: 2rem;
  margin-right: 20%;
`;

export default class Blog extends Component {
  state = {
    posts: null,
    showMessage: false,
    message: null
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    await Service.getPosts()
      .then(posts => {
        this.setState({
          posts
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  goTo = slug => {
    const to = '/post/' + slug;
    this.props.history.push(to);
  };

  delete = async (id, postTitle) => {
    await Service.deletePostById(id)
      .then(() => {
        const message = {
          title: 'Item deleted',
          text: postTitle + ' post is deleted!!!'
        };
        this.setState({
          message,
          showMessage: true,
        });
        this.getPosts()
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    let row = 1;
    return (
      <Page>
        <Helmet>
          <title>Nicole Mayes | {page}</title>
        </Helmet>
        <PageTitle>{page}</PageTitle>

        <Button onClick={() => this.goTo('')} fontSize="1.5rem">
          <Icon icon="faPlus" />
        </Button>
        <br />
        {this.state.showMessage && <Message message={this.state.message} />}
        {this.state.posts &&
          this.state.posts.map(postRow => (
            <React.Fragment key={row++}>
              <Area>
                {postRow.map(post => (
                  <React.Fragment key={post._id}>
                    <CardBlog key={post._id} post={post} delete={this.delete} />
                  </React.Fragment>
                ))}
              </Area>
              <CardHorizontalSeparator />
            </React.Fragment>
          ))}
      </Page>
    );
  }
}
