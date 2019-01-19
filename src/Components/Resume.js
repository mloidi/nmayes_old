import React from "react";

class Resume extends React.Component {

  componentDidMount() {
    const name = this.props.location.pathname;
    this.props.updateActive(name.substr(name.indexOf("/") + 1).toLowerCase());
  }

  render() {
    return (
      <h1>Resume</h1>
    );
  }
}

export default Resume;
