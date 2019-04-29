import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderSelect = field => (
  <div>
    <select {...field.input}/>
  </div>
);

export default renderSelect