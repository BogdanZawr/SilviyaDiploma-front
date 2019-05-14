import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm, } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Input from '../form/input';

const LoginForm = (props) =>  {
    const {
      handleSubmit,
      registerError,
    } = props;

    return <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{color: '#ffffff'}} htmlFor="email">Email</label>
                <Field
                  name="email"
                  component={Input}
                  type="text"/>
              </div>

              <div>
              <label style={{color: '#ffffff'}} htmlFor="firstName">First name</label>
                <Field
                  name="firstName"
                  component={Input}
                  type="text"/>
              </div>

              <div>
              <label style={{color: '#ffffff'}} htmlFor="lastName">Last name</label>
                <Field
                  name="lastName"
                  component={Input}
                  type="text"/>
              </div>

              <div>
                <label style={{color: '#ffffff'}} htmlFor="password">Password</label>
                <Field
                  name="password"
                  component={Input}
                  type="password"/>
              </div>
              <br/>
              {
                registerError &&
                <Alert variant="danger">{registerError.map((err)=><div key={err.param}>{err.message}</div>)}</Alert>
              }
              <Button type="submit" style={{ margin: '3px'}}>Sign in</Button>
              <Link to={'/login'}>
                    <Button style={{ margin: '3px'}}>Back</Button>
              </Link>
            </form>
          </Col>
        </Row>
      </Container>;
};


export default reduxForm({
  form: 'contact',
  fields: ['email', 'firstName', 'lastName', 'password']
})(LoginForm);
