import React from 'react';
import { FormControl } from 'react-bootstrap';

const Input = field => <div>
  <FormControl Style='min-height: 300px' as="textarea" aria-label="With textarea" {...field.input} type={field.type} />
  {field.meta.touched &&
  field.meta.error &&
  <span className="error">{field.meta.error}</span>}
</div>

export default Input;
