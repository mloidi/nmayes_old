import React from "react";
import { LoginService } from "../Service/login.service";
import Auth from "../common/auth.common";
import Input from "./Html/Input";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
      modalClass: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.modal) {
      this.setState({
        modalClass: "modal_login modal_show"
      });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    const email = this.state.email;
    const password = this.state.password;

    await LoginService.login(email, password)
      .then(response => {
        const { accessToken, refreshToken } = response;
        Auth.authenticateUser(accessToken, refreshToken);
        this.close();
      })
      .catch(error => {
        this.setState({
          errors: error.data.errors
        });
      });
  };

  close = () => {
    this.props.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <div className={this.state.modalClass}>
          <div className="modal-content-login">
            <div className="modal-header">
              <div className="row">
                <div className="col-10">
                  {Auth.isUserAuthenticated() ? (
                    <h4 className="title">
                      <i className="fa fa-pencil" /> User logged
                    </h4>
                  ) : (
                    <h4 className="title">
                      <i className="fa fa-pencil" /> Sign in
                    </h4>
                  )}
                </div>
                <div className="col-1">
                  <span className="close" onClick={this.close}>
                    &times;
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  {!Auth.isUserAuthenticated() && (
                    <div>
                      <div className="row">
                        {Object.keys(this.state.errors).map(key => (
                          <div className="col-12 loginError" key={key}>
                            <p>
                              {this.state.errors[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input
                            name="email"
                            handleInputChange={this.handleInputChange}
                            label="Type your email"
                            type="text"
                            icon="fas fa-user"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input
                            name="password"
                            handleInputChange={this.handleInputChange}
                            label="Type your password"
                            type="password"
                            icon="fas fa-key"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col">
                  <a className="btn" onClick={() => this.props.toggle()}>
                    <i className="fa fa-arrow-left ml-1" /> Back
                  </a>
                </div>
                <div className="col">
                  {!Auth.isUserAuthenticated() && (
                    <a className="btn" onClick={() => this.onSubmit()}>
                      <i className="fa fa-save ml-1" /> Login
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Container> */}
        {/* <Row> */}
        {/* <Col> */}
        {/* {!Auth.isUserAuthenticated() && (
              <form>
                <div>
                  {Object.keys(this.state.errors).map(key => (
                    <div className="col-12" key={key}>
                      <p className="loginError">{this.state.errors[key]}</p>
                    </div>
                  ))}
                </div>
                <div className="grey-text">
                  <Input
                    name="email"
                    onChange={this.handleInputChange}
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <Input
                    name="password"
                    onChange={this.handleInputChange}
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <Button onClick={() => this.onSubmit()}>Login</Button>
                </div>
              </form>
            )} */}
        {/* </Col> */}
        {/* </Row> */}
        {/* </Container> */}
      </React.Fragment>
    );
  }
}

export default LoginForm;
