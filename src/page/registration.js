import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationForm from '../component/login/registrationForm';
import { register, registerError } from '../action/auth';

class Login extends Component {
  handleSubmit = values => {
    this.props.register(values);
    this.props.registerError(null);
    this.props.history.push('/');
  };

  render() {
    console.log(this.props.registerError);
    
    return (
      <div>
        <RegistrationForm registerError={this.props.registerErrors} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    registerErrors: store.auth.registerErrors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (data) => dispatch(register(data)),
    registerError: (data) => dispatch(registerError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
