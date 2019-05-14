import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLikeList, deleteFiction, deleteChapter, getChapterList } from '../action/fiction';

var moment = require('moment');

class Chapter extends Component {
    state = {
      show: false,
  }

  
  // componentDidMount() {
  //   // this.props.getChapterList({ props: this.props.fiction._id });
  //   // this.props.getLikeList(this.state.fiction._id);
  // }
  
  // componentWillReceiveProps(props) {
  //   // if (props.like !== this.state.like) {
  //   //   this.setState({ like: props.like })
  //   // }

  //   // if (props.chapterList !== this.state.chapterList) {
  //   //   this.setState({ chapterList: props.chapterList.results })
  //   }
  // }

  deleteChapter(_id) {
    this.props.deleteChapter({ _id });
  }

  // createChapter() {
  //   // this.props.createChapter();
  // }

  render() {
    const { item } = this.props;
    console.log(item);
    
    return (
      <div>
        {this.props.user && this.props.user._id === this.props.fiction.userId?<Button style={{float: 'right', position: 'relative', top: '20px', right: '70px'}} size="sm" variant="primary" onClick={() => this.deleteChapter(item._id)}>Delete chapter</Button>:null}
        <div style={{ 'border-radius': '50px', 'background-color': '#cccccc', width: '90%', textAlign: 'center', margin: 'auto', cursor: 'pointer'}} onClick={() => this.setState({ show: !this.state.show })}>
            <br/>
          <p>
            <h5>
            {item.name}
            </h5> 
            {/* {this.props.user && this.props.user._id === this.props.fiction.userId?<Button style={{float: 'right'}} size="sm" variant="primary">Delete chapter</Button>:null} */}
            Number: {item.chapterNumber}
            <br/>
            {this.state.show && <div style={{ textAlign: 'center'}}>
              {item.content}
            </div> }
          </p>
        </div>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteChapter: (data) => dispatch(deleteChapter(data)),
    getLikeList: (_id) => dispatch(getLikeList(_id)),
    deleteFiction: (_id) => dispatch(deleteFiction(_id)),
    getChapterList: (data) => dispatch(getChapterList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
