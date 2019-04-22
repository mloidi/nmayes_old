import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Page, PageTitle, Button } from '../../css/Common.Style';
import { Service } from '../../service/data.service';
import TextEditor from '../editor/TextEditor';
import Input from '../common/Input';
import Icon from '../common/Icon';

const page = 'new Post';

const ControlsBar = styled.div`
  border-bottom: 0.2rem solid rgb(161, 207, 90);
`;

export default class New extends Component {
  state = {
    slug: null,
    title: '',
    description: '',
    coverPhoto: '',
    text: null
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  save = () => {
    const post = {
      title: this.state.title,
      coverPhoto: this.state.coverPhoto,
      description: this.state.description,
      public: true,
      text: this.state.text
    };
    Service.save(post, true);
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
        <TextEditor sendText={this.sendText} readOnly={false} />
      </Page>
    );
  }
}
