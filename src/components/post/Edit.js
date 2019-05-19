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

const page = 'Edit Post';

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

// const Image = styled.img`
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   width: 100%;
// `;

export default class Edit extends Component {
  state = {
    post: null,
    slug: null,
    title: '',
    description: '',
    coverPhoto: '',
    coverPhotoFile: null,
    public: false,
    text: null,
    tags: []
  };

  componentDidMount() {
    const authContext = this.context;
    const slug = this.props.match.params.slug;
    if (slug) {
      this.getPostBySlug(slug, authContext);
    }
  }
  componentDidUpdate() {
    const authContext = this.context;
    const slug = this.props.match.params.slug;
    if (slug !== this.state.slug) {
      if (slug) {
        this.getPostBySlug(slug, authContext);
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

  save = async alertContext => {
    if (this.state.coverPhotoFile) {
      const response = await Service.uploadFile(this.state.coverPhotoFile);
      const file = await response;
      this.setState({
        coverPhoto: file
      });
    }
    let post = { ...this.state.post };
    post.title = this.state.title;
    post.description = this.state.description;
    post.coverPhoto = this.state.coverPhoto;
    post.public = this.state.public;
    post.text = this.state.text;
    const postSaved = await Service.save(post, false);
    alertContext.sendSuccess(postSaved.title + " it's save.");
    this.props.history.push('/blog');
  };

  getPostBySlug = async (slug, authContext) => {
    await Service.getPostBySlug(slug, authContext.isAuthenticated())
      .then(post => {
        this.setState({
          post,
          slug,
          title: post.title,
          description: post.description,
          coverPhoto: post.coverPhoto,
          public: post.public,
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

  uploadFile = async file => {
    this.setState({
      coverPhotoFile: file
    });
  };

  isTagSelected = tag => {
    const tags = [...this.state.tags];
    const isSelected = tags.find(item => {
      return item.id === tag.id;
    });
    return isSelected;
  };

  addTag = tag => {
    const tags = [...this.state.tags];
    tags.push(tag);
    this.setState({ tags });
  };

  removeTag = tag => {
    const tags = [...this.state.tags];
    const updateTags = tags.filter(item => {
      return item.id !== tag.id;
    });
    this.setState({ tags: updateTags });
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
                {/* {this.state.coverPhoto && (
                  <React.Fragment>
                    <br />
                    <Image src={this.state.coverPhoto} alt={this.state.title} />
                    <br />
                  </React.Fragment>
                )} */}
                <br />
                <br />
                <FileDropzone
                  type="file"
                  id="file"
                  name="file"
                  fileURL={this.state.coverPhoto}
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
                {this.state.text && (
                  <TextEditor
                    sendText={this.sendText}
                    readOnly={false}
                    editorState={JSON.parse(this.state.text)}
                  />
                )}
              </div>
            </Page>
          )
        }
      </AuthContext.Consumer>
    );
  }
}
Edit.contextType = AuthContext;
