import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLikeList, deleteFiction, like, getChapterList, getCommentsList, createComment } from '../action/fiction';
import CommitForm from '../component/login/commitForm';

import Comment from './comment';
import Chapter from './chapter';

var moment = require('moment');

class Fiction extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      like: 0,
      chapterList: [],
      commentList: []
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }
  
  componentDidMount() {
    this.props.getChapterList({ fictionId: this.props.location.state.fiction._id });
    this.props.getCommentsList(this.props.location.state.fiction._id);
    this.props.getLikeList(this.props.location.state.fiction._id);
    console.log('this.props.location.state.fiction._id', this.props.location.state);
    
  }
  
  componentWillReceiveProps(props) {
    if (props.like !== this.state.like) {
      this.setState({ like: props.like })
    }

    if (props.chapterList !== this.state.chapterList) {
      this.setState({ chapterList: props.chapterList.results })
    }

    if (props.commentList !== this.state.commentList) {
      this.setState({ commentList: props.commentList })
    }
  }

  like(props) {
    props.addLike({ fictionId: this.props.location.state.fiction._id, userId: this.props.user._id });
  }

  handleSubmit = values => {
    this.props.createComment(_.assignIn(values, {
      fictionId: this.props.location.state.fiction._id,
      userId: this.props.user._id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    }))
  };

  render() {
    const { fiction } = this.props.location.state;
    console.log(this.props.commentList);
    
    return (
      <div>
        <Jumbotron style={{ margin: '3rem' }} fluid>
          <Container>
            <h1>{fiction.name}</h1>
            <p>
               Created date: {moment(fiction.createdAt).format('LLLL')}
            </p>
            <p>
              Size: {fiction.size}
            </p>
            <p>
              {this.props.user?<div><Button onClick={() => this.like(this.props)} size="sm" variant="outline-dark">Like</Button> {this.state.like}</div>: <div>Likes: {this.state.like}</div> }
            </p>
            <p>
               Genre: {fiction.genre.map(i => i+', ')}
            </p>
            <p>
              Status: {fiction.status}
            </p>
            <p>
              {fiction.description}
            </p>
            <p>
            {this.props.user && this.props.user._id === fiction.userId?<Link to={{
                  pathname: '/fiction/createChapter',
                  state: { fiction: this.props.location.state.fiction },
                }}>
                  <Button size="sm" variant="primary">Create chapter</Button>
              </Link>:null}
            </p>
            <p>
              {this.state.chapterList && this.state.chapterList.map((i) => {
              return <Chapter item={i} fiction={this.props.location.state.fiction}/>
              })}
            </p>
          </Container>
        </Jumbotron>
        <Jumbotron style={{  margin: '3rem' }} fluid>
          <Container>
            <h1>Comments</h1>{this.props.user?<CommitForm onSubmit={this.handleSubmit}/>: <div>Likes: {this.state.like}</div> }
            <p>
              {this.state.commentList && this.state.commentList.map((i) => {
              return <Comment item={i}/>
              })}
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    token: store.auth.token,
    like: store.fiction.like,
    chapterList: store.fiction.chapterList,
    fictionList: store.fiction.fictionList,
    commentList: store.fiction.commentList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (data) => dispatch(createComment(data)),
    getCommentsList: (_id) => dispatch(getCommentsList(_id)),
    addLike: (_id) => dispatch(like(_id)),
    getLikeList: (_id) => dispatch(getLikeList(_id)),
    deleteFiction: (_id) => dispatch(deleteFiction(_id)),
    getChapterList: (data) => dispatch(getChapterList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fiction);
