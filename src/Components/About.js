import React from "react";
import { View, Mask, Container } from "mdbreact";

class About extends React.Component {

  componentDidMount() {
    const name = this.props.location.pathname;
    this.props.updateActive(name.substr(name.indexOf("/") + 1).toLowerCase());
  }

  render() {
    return (
      <Container>
        <View>
          <img
            className="d-block w-100"
            src="./images/nmayes.png"
            alt="First slide"
          />
          <Mask overlay="black-light" />
        </View>
      </Container>
    );
  }
}

export default About;
