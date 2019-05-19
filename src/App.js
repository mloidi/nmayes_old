import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './components/menu/Menu';
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
import ViewPost from './components/post/View';
import NotFound from './components/NotFound';
import { ContextProvider } from './components/context/state';
import { LoadingContext } from './components/context/';
import Message from './components/messages/Message';
import Loading from './components/common/Loading';

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <LoadingContext.Consumer>
          {loadingContext => (
            <React.Fragment>
              {loadingContext.loading && <Loading />}
              <Router>
                <React.Fragment>
                  <Message />
                  <Menu />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/education" component={Education} />
                    <Route exact path="/museums" component={Museums} />
                    <Route exact path="/museum/:slug" component={Museum} />
                    <Route exact path="/events" component={Events} />
                    <Route exact path="/visit" component={PlanVisit} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/post/new" component={NewPost} />
                    <Route
                      exact
                      path="/post/edit/:slug/"
                      component={EditPost}
                    />
                    <Route
                      exact
                      path="/post/view/:slug/"
                      component={ViewPost}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </React.Fragment>
              </Router>
            </React.Fragment>
          )}
        </LoadingContext.Consumer>
      </ContextProvider>
    );
  }
}

export default App;
