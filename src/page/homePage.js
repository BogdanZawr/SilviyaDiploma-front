import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { Button, Navbar, Card, Nav, Dropdown ,ButtonToolbar, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dropToken, dropUser } from '../action/auth';
import { getFictionList, deleteFiction } from '../action/fiction';

import SearchForm from '../component/login/searchForm'

var moment = require('moment');

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      fictionList: [],
      ganreList: [],
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

  componentDidMount(props) {
    this.props.getFictionList();
  }

  deleteFiction(data) {
    this.props.deleteFiction(data);
  }

  componentWillReceiveProps(props) {
    if (props.fictionList.results) {
      this.setState({ fictionList: props.fictionList.results })
    }
  }

  handleSubmit = values => {
    if (this.state.ganreList.length > 0) {
      _.assignIn(values, { ganre: this.state.ganreList })
    }
    this.props.getFictionList(values);
  };

  render() {
    // this.props.history.push('/')
    // console.log(this.props.user.roles);

    return (
      <div>
          <Navbar style={{ opacity: '.8' }} bg="light" variant="light">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.handleSubmit({ sort: {"like":"desc"} })} href="#mostLike">Most likes</Nav.Link>
              <Nav.Link onClick={() => this.handleSubmit({ sort: {"like":"asc"} })} href="#leastLike">Least likes</Nav.Link>
              <Nav.Link onClick={() => this.handleSubmit({ sort: {"size":"desc"} })} href="#mostSize">The biggest size</Nav.Link>
              <Nav.Link onClick={() => this.handleSubmit({ sort: {"size":"asc"} })} href="#leastSize">The smallest size</Nav.Link>
            </Nav>
              <SearchForm onSubmit={this.handleSubmit}/>
          </Navbar>
        <div style={{ width: '85%', margin: 'auto'}} >
          {this.state.fictionList.map((response) => {
            return <Card key={response._id} style={{ height: '20rem', width: '17rem', margin: '1rem', display: 'inline-flex' }}>
              <Card.Body>
                <Card.Title>{response.name}</Card.Title>
                <Card.Text>
                  Genre: 
                {response.genre.map(i => {
                  return i + ', '
                })}
                </Card.Text>
                <Card.Text>
                {response.description.split('', 50)}
                </Card.Text>
                <Link to={{
                  pathname: '/fiction',
                  state: { fiction: response },
                }}>
                <Button style={{ position: 'absolute', bottom: '30px' }} size="sm" variant="primary">Read</Button>
                </Link>
                {this.props.user && (this.props.user.roles.includes('admin') || this.props.user._id === response.userId)?<Button style={{ position: 'absolute', right: '1rem', bottom: '30px' }} size="sm" variant="primary" onClick={() => this.deleteFiction(response)}>Delete</Button>:null}
                <Card.Text style={{ position: 'absolute', bottom: '0px' }}>
                {moment(response.createdAt).format('LLLL')}
                </Card.Text>
              </Card.Body>
            </Card>;
        })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.auth.user,
    token: store.auth.token,
    fictionList: store.fiction.fictionList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFiction: (_id) => dispatch(deleteFiction(_id)),
    getFictionList: (data) => dispatch(getFictionList(data)),
    dropToken: () => dispatch(dropToken()),
    dropUser: () => dispatch(dropUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
