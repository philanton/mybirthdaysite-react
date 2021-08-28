import React, { ChangeEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";


interface LogInProps {
  setLoggedIn: (value: boolean) => void;
}

interface LogInState {
  email: string;
  password: string;
}

class LogInForm extends React.Component<LogInProps & RouteComponentProps, LogInState> {
  state: LogInState = {
    email: localStorage.getItem('email') || "",
    password: localStorage.getItem('password') || "",
  };

  handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  handleSubmit() {
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("password", this.state.password);
    this.props.setLoggedIn(true);
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="desert desert-up">
        <div className="content">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="chunk">
              <label
                className="lbl"
                htmlFor="email"
                id="email-label"
              >
                Your email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="myname@example.com"
                onChange={this.handleEmailChange.bind(this)}
                required
              />
            </div>
            <div className="chunk">
              <label
                className="lbl"
                htmlFor="password"
                id="password-label"
              >
                Your password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={this.handlePasswordChange.bind(this)}
                required
              />
            </div>
            <div className="chunk">
              <button type="submit" className="btn btn-pr float-right">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LogInForm);