import React from "react";
import logo from "../../logo.svg";
// import { Modal, ModalBody, Fa } from "mdbreact";
import LoginForm from "../LoginForm";
import Auth from "../../common/auth.common";
import BlogForm from "../Blog/BlogForm";

const Link = require("react-router-dom").NavLink;

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      modal: false,
      modalPost: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglePost = this.togglePost.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  togglePost = () => {
    this.setState({
      modalPost: !this.state.modalPost
    });
  };

  menuSelect = event => {
    // this.props.updateActive(event.target.name);
  };
  render() {
    return (
      <React.Fragment>
        {this.state.modalPost && (
          <BlogForm
            modal={this.state.modalPost}
            toggle={this.togglePost}
            blogId=""
            updateBlogList={this.updateBlogList}
          />
        )}

        {this.state.modal && (
          <LoginForm toggle={this.toggle} modal={this.state.modal} />
        )}
        <div className="menu_shadow">
          <div className="row">
            <div className="col-1">
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                onClick={this.toggle}
              />
            </div>
            <div className="col-11">
              <ul className="nav_ul">
                <li className="hide-small float_right nav_li">
                  <a className="nav_link" onClick={this.togglemenu}>
                    <i className="fas fa-bars" />
                  </a>
                </li>
                <li className="hide-medium nav_li">
                  <Link className="nav_link" to={"/"}>
                    About me
                  </Link>
                </li>
                <li className="hide-medium nav_li">
                  <Link className="nav_link" to={"/resume"}>
                    Resume
                  </Link>
                </li>
                <li className="hide-medium nav_li">
                  <Link className="nav_link" to={"/blog"}>
                    Blog
                  </Link>
                </li>
                <div className="float_right">
                  {Auth.isUserAuthenticated() && (
                    <li className="hide-medium nav_li">
                      {/* <Link className="nav_link" to={"/protect"}>
                  Protect
                </Link> */}
                      <a className="nav_link" onClick={this.togglePost}>
                        <i className="fas fa-edit" /> New post
                      </a>
                    </li>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div id="navDemo" className="hide menu_shadow">
          <div className="row">
            <Link className="nav_link" to={"/"}>
              About me
            </Link>
          </div>
          <div className="row">
            <Link className="nav_link" to={"/resume"}>
              Resume
            </Link>
          </div>
          <div className="row">
            <Link className="nav_link" to={"/blog"}>
              Blog
            </Link>
          </div>
          {Auth.isUserAuthenticated() && (
            <div className="row">
              <Link className="nav_link" to={"/protect"}>
                Protect
              </Link>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NavMenu;
