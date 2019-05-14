import React from 'react';
import { Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Field, reduxForm, } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';

import Input from '../form/input';

const SearchFormForm = (props) =>  {
    const {
      handleSubmit,
    } = props;

    return <form onSubmit={handleSubmit}>
            <Form inline>
              <Field name="search" type="text" placeholder="Search" component={Input} className="mr-sm-2" />
              <Button type='submit' variant="outline-primary">Search</Button>
            </Form>
          </form>;
};


export default reduxForm({
  form: 'search',
  fields: ['search']
})(SearchFormForm);
