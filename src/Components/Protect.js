import React from "react";

class Protect extends React.Component {
  componentDidMount() {
    this.props.updateActive("protect");
  }

  render() {
    return (
        <h1>Secure Area</h1>
    );
  }
}

export default Protect;
