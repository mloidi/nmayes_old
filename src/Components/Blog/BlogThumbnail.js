import React from "react";
import BlogForm from "./BlogForm";
import Auth from "../../common/auth.common";
import Markdown from "markdown-to-jsx";
import moment from "moment";
import { Link } from "react-router-dom";

class BlogThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogViewUrl: "",
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      blogViewUrl: "/blog/" + this.props.blog.slug
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.modal && (
          <BlogForm
            modal={this.state.modal}
            toggle={this.toggle}
            blogId={this.props.blog._id}
            updateBlogList={this.props.updateBlogList}
          />
        )}

        <div className="row post_thumbnail">
          <div className="col">
            <div className="row">
              <div className="col-4">
                <div className="row">
                  <div className="col">
                    <div className="post_cover_view">
                      <img
                        src={this.props.blog.photo}
                        className="post_cover post_thumbnail_photo"
                        alt="First sample "
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link className="btn" to={this.state.blogViewUrl}>
                      Read more <i className="fa fa-arrow-right ml-1" />
                    </Link>
                  </div>
                  <div className="col">
                    {Auth.isUserAuthenticated() && (
                      <a className="btn" onClick={this.toggle}>
                        Edit <i className="fa fa-edit ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="row">
                  <h3 className="mb-3 font-weight-bold dark-grey-text">
                    <strong>{this.props.blog.title}</strong>
                  </h3>
                </div>
                <div className="row">
                  <Markdown options={{ forceBlock: true }}>
                    {String(this.props.blog.subTitle)}
                  </Markdown>
                </div>
                <div className="row">
                  <p>
                    by
                    <strong> Nicole Jeannete Mayes</strong>,{" "}
                    {moment(this.props.blog.created).format("MMMM Do YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogThumbnail;
