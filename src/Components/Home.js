import React from "react";
import { View, Mask, Container } from "mdbreact";

class Home extends React.Component {

  componentDidMount() {
    /*
    const name = this.props.location.pathname;
    console.log(name.substr(name.indexOf("/")+1).toLowerCase());
    */
    this.props.updateActive('home');
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

export default Home;
