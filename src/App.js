import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu';
import Home from './components/Home';
import About from './components/About';
import Education from './components/Education';
import Museums from './components/Museums';
import Museum from './components/Museum';
import Events from './components/Events';
import PlanVisit from './components/PlanVisit';
import Blog from './components/Blog';
import NewPost from './components/post/New';
import EditPost from './components/post/Edit';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Menu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/education" component={Education} />
            <Route exact path="/museums" component={Museums} />
            <Route exact path="/museum/:slug" component={Museum} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/post" component={NewPost} />
            <Route exact path="/post/:slug" component={EditPost} />
            <Route exact path="/visit" component={PlanVisit} />
            <Route exact path="/blog" component={Blog} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
