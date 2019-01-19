import React from "react";
import { BlogService } from "../../Service/blog.service";
import Markdown from "markdown-to-jsx";
import moment from "moment";
import { Link } from "react-router-dom";

class BlogView extends React.Component {
  state = {
    blog: {}
  };

  componentDidMount() {
    this.props.updateActive("blog");
    this.getBlog(this.props.match.params.id);
  }

  getBlog = async blogId => {
    await BlogService.getBlog(blogId)
      .then(blog => {
        this.setState({
          blog
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <div className="post back">
              <div className="post_cover_view">
                <img
                  className="post_cover"
                  src={this.state.blog.photo}
                  alt="Post cover"
                />
              </div>
              <div className="post_title">
                <h2>{this.state.blog.title}</h2>
                <Markdown options={{ forceBlock: true }}>
                  {String(this.state.blog.subTitle)}
                </Markdown>
                <p>
                  Written by
                  <strong> Nicole Jeannette Mayes</strong>,{" "}
                  {moment(this.state.blog.created).format("MMMM Do YYYY")}
                </p>
              </div>
              <div className="post_body">
                <Markdown options={{ forceBlock: true }}>
                  {String(this.state.blog.description)}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <Link className="btn" to={"/blog"}>
              Back
            </Link>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogView;
