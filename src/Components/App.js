import React from "react";
import "../css/App.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "mdbreact/dist/css/mdb.css";
import Blog from "./Blog";
import NotFound from "./NotFound";
import Home from "./Home";
import About from "./About";
import NavMenu from "./NavMenu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: [true, false, false]
    };
  }

  updateActive = menuSelected => {
    let active = [];
    switch (menuSelected) {
      case "home":
        active = [true, false, false];
        break;
      case "about":
        active = [false, true, false];
        break;
      case "blog":
        active = [false, false, true];
        break;
      default:
        break;
    }
    this.setState({
      active: active
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <NavMenu active={this.state.active} updateActive={this.updateActive}/>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} updateActive={this.updateActive}/>}/>
              <Route exact path="/about" render={(props) => <About {...props} updateActive={this.updateActive}/>} />
              <Route exact path="/blog" render={(props) => <Blog {...props} updateActive={this.updateActive}/>}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
