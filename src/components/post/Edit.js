import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Page, PageTitle, Button } from '../../css/Common.Style';
import { Service } from '../../service/data.service';
import TextEditor from '../editor/TextEditor';
import Input from '../common/Input';
import Icon from '../common/Icon';

const page = 'Edit Post';

const ControlsBar = styled.div`
  border-bottom: 0.2rem solid rgb(161, 207, 90);
`;

export default class Edit extends Component {
  state = {
    post: null,
    slug: null,
    title: '',
    description: '',
    coverPhoto: '',
    text: null
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    if (slug) {
      this.getPostBySlug(slug);
    }
  }
  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (slug !== this.state.slug) {
      if (slug) {
        this.getPostBySlug(slug);
      }
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  save = () => {
    let post = { ...this.state.post };
    post.title = this.state.title;
    post.description = this.state.description;
    post.coverPhoto = this.state.coverPhoto;
    post.text = this.state.text;
    Service.save(post, false);
  };

  getPostBySlug = async slug => {
    await Service.getPostBySlug(slug)
      .then(post => {
        this.setState({
          post,
          slug,
          title: post.title,
          description: post.description,
          coverPhoto: post.coverPhoto,
          text: post.text
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  sendText = text => {
    this.setState({ text });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const response = await Service.uploadFile(files[0]);
    const file = await response;
    this.setState({
      coverPhoto: file
    });
  };

  render() {
    return (
      <Page>
        <Helmet>
          <title>Nicole Mayes | {page}</title>
        </Helmet>
        <PageTitle>{page}</PageTitle>
        <ControlsBar>
          <Button onClick={this.save} fontSize="1.5rem">
            <Icon icon="faSave" />
          </Button>
        </ControlsBar>
        <br />
        {this.state.coverPhoto && (
          <React.Fragment>
            <br />
            <img width="200" src={this.state.coverPhoto} alt="Upload Preview" />
            <br />
          </React.Fragment>
        )}
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload file"
          onChange={this.uploadFile}
        />
        <br />
        <Input
          type="text"
          id="title"
          name="title"
          show={true}
          isValid={true}
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <br />
        <Input
          type="textarea"
          id="description"
          name="description"
          show={true}
          isValid={true}
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleInputChange}
          rows="4"
          cols="100"
        />
        <br />
        <br />
        {this.state.text && (
          <TextEditor
            sendText={this.sendText}
            readOnly={false}
            editorState={JSON.parse(this.state.text)}
          />
        )}
      </Page>
    );
  }
}
