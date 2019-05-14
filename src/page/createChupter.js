import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateChupterForm from '../component/form/createChupter';
import { createChupter, createChapterError } from '../action/fiction';

class Login extends Component {
  handleSubmit = values => {
    values.chapterNumber =  Number.parseInt(values.chapterNumber);
    this.props.createChupter(_.assignIn(values, { fictionId: this.props.location.state.fiction._id }), this.props.history);
    this.props.createChapterError(null);
    // this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <CreateChupterForm history={this.props.history} createChupterError={this.props.createChupterErrors} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    createChupterErrors: store.fiction.createChupterErrors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChupter: (data, history) => dispatch(createChupter(data, history)),
    createChapterError: (data) => dispatch(createChapterError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
