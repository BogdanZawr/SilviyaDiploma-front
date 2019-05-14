import React from 'react';
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <Button variant="outline-secondary" type="submit">Add comment</Button>
            </InputGroup.Prepend>
            <Field
              name="content"
              component={Input}
              type="content"/>
          </InputGroup>
              <br/>
              {
                loginError &&
                <Alert variant="danger">{loginError.map((err)=><div key={err.param}>{err.message}</div>)}</Alert>
              }
            </form>
          </Col>
        </Row>
      </Container>;
};


export default reduxForm({
  form: 'content',
  fields: ['content']
})(LoginForm);
