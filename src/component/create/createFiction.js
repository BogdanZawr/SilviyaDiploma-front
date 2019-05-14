import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Input from '../form/input';
import Select from '../form/select';

const LoginForm = (props) =>  {
    const {
      handleSubmit,
      loginError
    } = props;

    return <Container>
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Field
            name="name"
            component={Input}
            type="text"/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Field
            name="description"
            component={Input}
            type="text"/>
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <Field
            name="genre"
            component={Select}
            type="select"/>
        </div>
        <br/>
        <Button type="submit">Create</Button>
        <Link to={'/homePage'}>
              <Button>Cancle</Button>
        </Link>
      </form>
      <br/>
      {
        loginError &&
        <Alert variant="danger">{loginError.map((err)=><div key={err.param}>{err.message}</div>)}</Alert>
      }
      </Col>
    </Row>
  </Container>;
};

export default reduxForm({
  form: 'fiction',
  fields: ['name', 'description', 'genre']
})(LoginForm);
