import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classInput: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let classInput = "";
    if (value) {
      classInput = "input-active";
    }

    this.setState({
      classInput
    });

    this.props.handleInputChange(event);
  };

  render() {
    return (
      <div className="group">
        <input
          type={this.props.type}
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleInputChange}
          required
        />
        <span className="highlight" />
        <span className="bar" />
        {/* className={this.state.classInput} */}
        <label>
          <i className={this.props.icon} /> {this.props.label}
        </label>
      </div>
    );
  }
}

export default Input;
