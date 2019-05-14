import React from 'react';
import { FormControl } from 'react-bootstrap';

const Input = field => <div>
  <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" {...field.input} type={field.type} />
  {field.meta.touched &&
  field.meta.error &&
  <span className="error">{field.meta.error}</span>}
</div>

export default Input;
