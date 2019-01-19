import React from "react";

const toggleOn = "icon fas fa-toggle-on";
const toggleOff = "icon fas fa-toggle-off";
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: toggleOff
    };
    this.clickToggle = this.clickToggle.bind(this);
  }

  componentDidMount() {
    console.log(this.props.checked);
    if (this.props.checked) {
      this.setState({
        toggle: toggleOn
      });
    }
  }

  clickToggle = () => {
    if (this.props.checked) {
      this.setState({
        toggle: toggleOff
      });
      this.props.updateChecked(false);
    } else {
      this.setState({
        toggle: toggleOn
      });
      this.props.updateChecked(true);
    }
  };

  render() {
    return (
      <div className="group">
        <a onClick={this.clickToggle}>
          <i className={this.state.toggle} /> {this.props.label}
        </a>
      </div>
    );
  }
}

export default Toggle;
