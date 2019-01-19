import React from "react";

class About extends React.Component {
  componentDidMount() {
    this.props.updateActive("about");
  }

  render() {
    return (
      <React.Fragment>
        <h1>About Area</h1>
        <img
          className="d-block w-100"
          src="./images/nmayes.png"
          alt="First slide"
        />
      </React.Fragment>
    );
  }
}

export default About;
