import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Field, reduxForm, } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Input from '../form/input';
import TextArea from '../form/textArea';

const LoginForm = (props) =>  {
    const {
      handleSubmit,
      createChapterError,
      history,
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
            <label htmlFor="content">Content</label>
              <Field
                name="content"
                component={TextArea}
                type="text"/>
            </div>

            <div>
            <label htmlFor="chapterNumber">Chapter number</label>
              <Field
                name="chapterNumber"
                component={Input}
                type="number"/>
            </div>
            <br/>
            {
              createChapterError &&
              <Alert variant="danger">{createChapterError.map((err)=><div key={err.param}>{err.message}</div>)}</Alert>
            }
            <Button type="submit" style={{ margin: '3px'}}>Add</Button>
            <Button onClick={() => history.goBack()} style={{ margin: '3px'}}>Cancle</Button>
          </form>
        </Col>
      </Row>
    </Container>;
};


export default reduxForm({
  form: 'chapter',
  fields: ['name', 'content', 'chapterNumber']
})(LoginForm);
