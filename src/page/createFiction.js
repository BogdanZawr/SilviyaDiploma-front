import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../component/create/createFiction';
import { createFiction } from '../action/fiction';

class Login extends Component {
  handleSubmit = values => {
    this.props.createFiction(values, this.props.history);
  };

  render() {
    return (
      <div>
        <LoginForm  loginError={this.props.error} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    error: store.fiction.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createFiction: (data, history) => dispatch(createFiction(data, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
