import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm, } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Input from '../form/input';

const LoginForm = (props) =>  {
    const {
      handleSubmit,
      loginError,
    } = props;

    return <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  component={Input}
                  type="text"/>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  component={Input}
                  type="password"/>
              </div>
              <br/>
              {
                loginError &&
                <Alert variant="danger">{loginError.map((err)=><div key={err.param}>{err.message}</div>)}</Alert>
              }
              <Button type="submit" style={{ margin: '3px'}}>login</Button>
              <Link to={'/homePage'}>
                    <Button style={{ margin: '3px'}}>Log in as a Guest</Button>
              </Link>
              <Link to={'/registration'}>
                    <Button style={{ margin: '3px'}}>Sign in</Button>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>;
};


export default reduxForm({
  form: 'contact',
  fields: ['email', 'password']
})(LoginForm);
