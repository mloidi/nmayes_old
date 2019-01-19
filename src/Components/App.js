import React from "react";
// import "../css/App.css";
import "../css/menu.css";
// import "font-awesome/css/font-awesome.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import BlogList from "./Blog/BlogList";
import BlogView from "./Blog/BlogView";
import BlogForm from "./Blog/BlogForm";
import NotFound from "./NotFound";
import About from "./About";
import Resume from "./Resume";
import NavMenu from "./Menu/NavMenu";
import Protect from "./Protect";
import Auth from "../common/auth.common";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [false, false, false, false]
    };
  }

  updateActive = menuSelected => {
    // let active = [];
    // switch (menuSelected) {
    //   case "about":
    //     active = [true, false, false, false];
    //     break;
    //   case "resume":
    //     active = [false, true, false, false];
    //     break;
    //   case "blog":
    //     active = [false, false, true, false];
    //     break;
    //   case "protect":
    //     active = [false, false, false, true];
    //     break;
    //   default:
    //     break;
    // }
    // this.setState({
    //   active: active
    // });
  };

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavMenu
            active={this.state.active}
            updateActive={this.updateActive}
          />
          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <About {...props} updateActive={this.updateActive} />
                )}
              />
              <Route
                exact
                path="/resume"
                render={props => (
                  <Resume {...props} updateActive={this.updateActive} />
                )}
              />
              <Route
                exact
                path="/blog"
                render={props => (
                  <BlogList {...props} updateActive={this.updateActive} />
                )}
              />
              <Route
                path="/blog/:id"
                render={props => (
                  <BlogView {...props} updateActive={this.updateActive} />
                )}
              />
              <Route
                exact
                path="/blogEdit/:id"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <BlogForm {...props} updateActive={this.updateActive} />
                  ) : (
                    <Redirect to="/noAuth" />
                  )
                }
              />
              <Route
                exact
                path="/protect"
                render={props =>
                  Auth.isUserAuthenticated() ? (
                    <Protect {...props} updateActive={this.updateActive} />
                  ) : (
                    <Redirect to="/noAuth" />
                  )
                }
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
