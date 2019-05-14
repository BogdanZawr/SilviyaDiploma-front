import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../component/login/loginForm';
import { login, loginError } from '../action/auth';

class Login extends Component {
  handleSubmit = values => {
    this.props.login(values);
    this.props.loginError(null);
  };

  render() {
    return (
      <div>
        <LoginForm loginError={this.props.error} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    error: store.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (data) => dispatch(login(data)),
    loginError: (data) => dispatch(loginError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
