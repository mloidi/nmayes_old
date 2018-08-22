import React from "react";
import logo from "../logo.svg";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from "mdbreact";

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  menuSelect = event => {
    this.props.updateActive(event.target.name);
  };
  render() {
    return (
      <Navbar light color="default-color" dark expand="md" sticky="top">
        <NavbarBrand href="/">
          <strong>Nicole Jeannette Mayes </strong>
          <img src={logo} className="App-logo" alt="logo" />
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem active={this.props.active[0]}>
              <NavLink to="/" onClick={this.menuSelect} name="home">
                Home
              </NavLink>
            </NavItem>
            <NavItem active={this.props.active[1]}>
              <NavLink to="/about" onClick={this.menuSelect} name="about">
                About me
              </NavLink>
            </NavItem>
            <NavItem active={this.props.active[2]}>
              <NavLink to="/Blog" onClick={this.menuSelect} name="blog">
                Blog
              </NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavMenu;
