import React from "react";
import { BlogService } from "../../Service/blog.service";
import Markdown from "markdown-to-jsx";
import moment from "moment";
import Toggle from "../Html/Toggle";

class BlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlog: true,
      loadEditBlog: false,
      blog: {},
      title: "",
      subTitle: "",
      photo: "",
      description: "",
      public: false,
      errors: [],
      modalClass: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.modal) {
      this.setState({
        modalClass: "modal_ml modal_show"
      });
    }

    const blogId = this.props.blogId;
    if (blogId) {
      this.getBlog(blogId);
      this.setState({
        newBlog: false
      });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  getBlog = async blogId => {
    await BlogService.getBlogSecure(blogId)
      .then(blog => {
        this.setState({
          blog
        });
        this.setState({
          title: this.state.blog.title,
          subTitle: this.state.blog.subTitle,
          photo: this.state.blog.photo,
          description: this.state.blog.description,
          public: this.state.blog.public,
          loadEditBlog: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  saveBlog = async () => {
    const blog = { ...this.state.blog };
    blog.title = this.state.title;
    blog.subTitle = this.state.subTitle;
    blog.photo = this.state.photo;
    blog.description = this.state.description;
    blog.public = this.state.public;
    await BlogService.saveBlog(blog)
      .then(() => {
        this.props.updateBlogList();
        this.close();
      })
      .catch(error => {
        console.log(error);
      });
  };

  newBlog = async () => {
    const blog = {
      title: this.state.title,
      subTitle: this.state.subTitle,
      photo: this.state.photo,
      description: this.state.description,
      public: this.state.public
    };
    await BlogService.newBlog(blog)
      .then(() => {
        this.close();
      })
      .catch(error => {
        console.log(error);
      });
  };

  close = () => {
    this.props.toggle();
  };

  updateChecked = checked => {
    this.setState({
      public: checked
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={this.state.modalClass}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <div className="col-10">
                  {this.state.newBlog && (
                    <h4 className="title">
                      <i className="fa fa-pencil ml-1" /> New Blog
                    </h4>
                  )}
                  {!this.state.newBlog && (
                    <h4 className="title">
                      <i className="fa fa-pencil ml-1" />
                      Edit Blog
                    </h4>
                  )}
                </div>
                <div className="col-1">
                  <span className="close" onClick={this.close}>
                    &times;
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <form>
                    {(this.state.newBlog ||
                      (!this.state.newBlog && this.state.loadEditBlog)) && (
                      <Toggle
                        checked={this.state.public}
                        label="Is public"
                        updateChecked={this.updateChecked}
                      />
                    )}
                    <label htmlFor="title" className="grey-text">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <label htmlFor="photo" className="grey-text">
                      Cover photo
                    </label>
                    <input
                      type="text"
                      id="photo"
                      name="photo"
                      value={this.state.photo}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <label htmlFor="description" className="grey-text">
                      Text
                    </label>
                    <textarea
                      type="text"
                      id="subTitle"
                      name="subTitle"
                      value={this.state.subTitle}
                      className="form-control"
                      rows="5"
                      maxLength="250"
                      onChange={this.handleInputChange}
                    />
                    <br />
                    <label htmlFor="description" className="grey-text">
                      Text
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={this.state.description}
                      className="form-control"
                      rows="30"
                      onChange={this.handleInputChange}
                    />
                  </form>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="post back">
                        <div className="post_cover_view">
                          <img
                            className="post_cover"
                            src={this.state.photo}
                            alt="Post cover"
                          />
                        </div>
                        <div className="post_title">
                          <h2>{this.state.title}</h2>
                          <Markdown options={{ forceBlock: true }}>
                            {String(this.state.subTitle)}
                          </Markdown>
                          <p>
                            Written by
                            <strong> Nicole Jeannette Mayes</strong>,{" "}
                            {moment(this.state.created).format("MMMM Do YYYY")}
                          </p>
                        </div>
                        <div className="post_body">
                          <Markdown options={{ forceBlock: true }}>
                            {String(this.state.description)}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col">
                  <a className="btn" onClick={() => this.props.toggle()}>
                    <i className="fa fa-arrow-left ml-1" /> Back
                  </a>
                </div>

                <div className="col">
                  {this.state.newBlog && (
                    <a className="btn" onClick={() => this.newBlog()}>
                      <i className="fa fa-save ml-1" /> Save
                    </a>
                  )}
                  {!this.state.newBlog && (
                    <a className="btn" onClick={() => this.saveBlog()}>
                      <i className="fa fa-save ml-1" /> Save
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogForm;
