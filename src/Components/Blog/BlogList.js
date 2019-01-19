import React from "react";
import BlogThumbnail from "./BlogThumbnail";
import { BlogService } from "../../Service/blog.service";
import Auth from "../../common/auth.common";

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: {},
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.updateActive("blog");
    this.getBlogs();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getBlogs = async () => {
    if (Auth.isUserAuthenticated()) {
      await BlogService.getBlogs()
        .then(blogs => {
          this.setState({
            blogs
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await BlogService.getPublicBlogs()
        .then(blogs => {
          this.setState({
            blogs
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  updateBlogList = () => {
    this.getBlogs();
  };

  render() {
    return (
      <React.Fragment>
        {/* {this.state.modal && (
          <BlogEdit
            modal={this.state.modal}
            toggle={this.toggle}
            blogId=""
            updateBlogList={this.updateBlogList}
          />
        )} */}
        <div className="container">
          {/* {Auth.isUserAuthenticated() && (
            <div className="row">
              <div className="col-12">
                <br />
                <a className="btn" onClick={this.toggle}>
                  <i className="fas fa-edit" /> New
                </a>
                <br />
              </div>
            </div>
          )} */}
          <div className="row">
            <br />
            {Object.keys(this.state.blogs).map(key => (
              <div className="col-12" key={key}>
                <BlogThumbnail
                  key={key}
                  index={key}
                  blog={this.state.blogs[key]}
                  updateBlogList={this.updateBlogList}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogList;
