import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          {/* <MainContainer>
              <Menu />
              <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/work" component={WorkExperience} />
                <Route exact path="/education" component={Education} />
                <Route exact path="/skills" component={Skills} />
                <Route exact path="/courses" component={Courses} />
                <Route exact path="/projects" component={Projects} />
                <Route component={NotFound} />
              </Switch>
            </MainContainer> */}
          New design
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
