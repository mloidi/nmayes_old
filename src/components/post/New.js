import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Page, PageTitle, Button } from '../../css/Common.Style';
import { Service } from '../../service/data.service';
import {
  AuthContext,
  AlertContext,
  LoadingContext,
  TagContext
} from '../context/';
import TextEditor from '../editor/TextEditor';
import Input from '../common/Input';
import Icon from '../common/Icon';
import FileDropzone from '../common/FileDropzone';

const page = 'new Post';

const ControlsBar = styled.div`
  border-bottom: 0.2rem solid rgb(161, 207, 90);
`;

const TagArea = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto auto;
  /* margin: 1rem; */
  padding: 0.5rem;
  background-color: rgba(243, 255, 239, 0.99);
  .noSelected {
    border: 0.1rem solid transparent;
    background-color: transparent;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    color: rgb(161, 207, 90);
    text-transform: uppercase;
    cursor: pointer;
    text-align: start;
    &:hover,
    &:focus {
      border: 0.1rem solid rgb(161, 207, 90);
    }
  }
  .selected {
    border: 0.1rem solid rgb(161, 207, 90);
    background-color: transparent;
    margin: 0.5rem 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    color: rgb(161, 207, 90);
    text-transform: uppercase;
    cursor: pointer;
    text-align: start;
  }
`;

export default class New extends Component {
  state = {
    slug: null,
    title: '',
    description: '',
    coverPhoto: '',
    coverPhotoFile: null,
    public: false,
    text: null,
    loading: false
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  save = async alertContext => {
    if (this.state.coverPhotoFile) {
      const response = await Service.uploadFile(this.state.coverPhotoFile);
      const file = await response;
      this.setState({
        coverPhoto: file
      });
    }
    const post = {
      title: this.state.title,
      coverPhoto: this.state.coverPhoto,
      description: this.state.description,
      public: this.state.public,
      text: this.state.text
    };
    const postSaved = await Service.save(post, true);
    alertContext.sendSuccess(postSaved.title + " it's save.");
    this.props.history.push('/blog');
  };

  sendText = text => {
    this.setState({ text });
  };

  uploadFile = async file => {
    this.setState({
      coverPhotoFile: file
    });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {authContext =>
          !authContext.isAuthenticated() ? (
            <Redirect to="/noAuth" />
          ) : (
            <Page>
              <div>
                <Helmet>
                  <title>Nicole Mayes | {page}</title>
                </Helmet>
                <PageTitle>{page}</PageTitle>
                <ControlsBar>
                  <Link className="link" to={'/blog'}>
                    <Icon icon="faArrowLeft" /> Go back
                  </Link>
                  <LoadingContext.Consumer>
                    {loadingContext => (
                      <AlertContext.Consumer>
                        {alertContext => (
                          <Button
                            onClick={() => {
                              loadingContext.setLoading(true);
                              this.save(alertContext);
                            }}
                            fontSize="1rem"
                          >
                            <Icon icon="faSave" /> Save
                          </Button>
                        )}
                      </AlertContext.Consumer>
                    )}
                  </LoadingContext.Consumer>
                </ControlsBar>
                <br />
                <br />
                <FileDropzone
                  type="file"
                  id="file"
                  name="file"
                  uploadFile={this.uploadFile}
                />
                <br />
                <Input
                  type="checkbox"
                  id="public"
                  name="public"
                  label="Publish"
                  checked={this.state.public}
                  onChange={this.handleInputChange}
                />
                <br />
                <br />
                <TagContext.Consumer>
                  {tagContext =>
                    tagContext.tags.map(tag => (
                      <TagArea key={tag.name}>
                        <button
                          className={
                            this.isTagSelected(tag) ? 'selected' : 'noSelected'
                          }
                          onClick={() => {
                            if (!this.isTagSelected(tag)) {
                              this.addTag(tag);
                            } else {
                              this.removeTag(tag);
                            }
                          }}
                        >
                          {tag.name}
                        </button>
                      </TagArea>
                    ))
                  }
                </TagContext.Consumer>
                <br />
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
              </div>
            </Page>
          )
        }
      </AuthContext.Consumer>
    );
  }
}
