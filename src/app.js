import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Navbar, Card, Nav, Form ,FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setToken, dropUser, dropToken, loginConfirm } from './action/auth';

import Login from './page/login';
import HomePage from './page/homePage';
import CreateFiction from './page/createFiction';
import Fiction from './page/fiction';
import CreateChapter from './page/createChupter';
import Registration from './page/registration';

class App extends Component {
  constructor(...props) {
    super(...props);

    this.checkAuth(props[0]);
  }

  componentWillReceiveProps(props) {
    this.checkAuth(props);
  }

  checkAuth = (props) => {
    if (props.token && !props.user) {
      props.loginConfirm();
      return;
    }

    if (!props.token) {
      try {
        const lSore = JSON.parse(localStorage.getItem('token'));
        if (lSore) {
          props.setToken(lSore);

          if (props.location.pathname === '/login') {
            props.history.push('/');
          }

          return;
        }

        if (props.location.pathname !== '/fiction' && props.location.pathname !== '/login' && props.location.pathname !== '/homePage' && props.location.pathname !== '/registration') {
          props.history.push('/login');
        }
      } catch (e) {
        props.dropToken();
        props.dropUser();

        if (props.location.pathname !== '/login') {
          props.history.push('/login');
        }
      }

      return;
    }

    if (props.token && props.location.pathname === '/login') {
      props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Navbar style={{ 'min-height': '100px'}} bg="dark" variant="dark">
          <Link to={{
                pathname: '/homePage',
              }}>
            <Navbar.Brand href="/homePage">Home</Navbar.Brand>
          </Link>
          <Nav style={{  textAlign: 'center', "font-family": "olddreadfulno7 bt"}} className="mr-auto">
            <Link to={'/createFiction'}>
              <Nav.Link style={{ color: '#dfeeff', 'margin-right': 'auto !important !important' }} href="#features">Create fiction</Nav.Link>
            </Link>
          </Nav>
          <h1 style={{ color: '#dfeeff', margin: 'auto', "font-family": "olddreadfulno7 bt"}}> Paper elephant </h1>
          <div style={{ 'margin-left': '5px', color: '#dfeeff' }}>
          Signed in as: <a>{this.props.user?this.props.user.firstName:'Guest'}</a>
            <Link to={'/login'}>
              <Button style={{ margin: '1px' }} onClick = {() => { this.props.dropToken(); this.props.dropUser(); } } >LogOut</Button>
            </Link>
          </div>
        </Navbar>
        <div>
          <Switch>
            {
              (this.props.user && this.props.token) &&
              (
                <Route exact path='/' component={HomePage}/>
                )
              }
            <Route exact path='/login' component={Login}/>
            <Route path='/homePage' component={HomePage}/>
            <Route path='/createFiction' component={CreateFiction}/>
            <Route path='/fiction/createChapter' component={CreateChapter}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/fiction' component={Fiction}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    user: store.auth.user,
    token: store.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: (data) => dispatch(setToken(data)),
    dropToken: () => dispatch(dropToken()),
    dropUser: () => dispatch(dropUser()),
    loginConfirm: () => dispatch(loginConfirm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
