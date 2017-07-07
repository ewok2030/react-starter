import React from 'react';

// redux-form Field Helper Functions
/*
  Some custom functions that are called by redux-form to render form's fields.
  If after redux-form calls the validation script, any error or warning are added
  to the metadata, these functions will wrap the form field in validation messages.

  If custom validation/error HTML is not required, redux-form
*/

// Private function that takes a redux-form <Field /> and HTML elemtn (e.g. <input /> and wraps it in validation/error HTML
const renderField = (field, element) => {
  // If the validation process added a warning or error to the field metadata
  const hasIssue = (field.meta.touched && ((field.meta.error && 'has-error') || (field.meta.warning && 'has-warning')));
  return (
    <div className={`form-group ${hasIssue}`}>
      <label htmlFor={field.label}>{field.label}</label>
      {element}
      {field.meta.touched && (
        (field.meta.error &&
          <span className="help-block"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />&nbsp;{field.meta.error}</span>
        ) || (field.meta.warning &&
          <span className="help-block"><span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />&nbsp;{field.meta.warning}</span>)
      )}
    </div>);
};

// Public render function that creates an <input /> wrapped in validation messages
/*
  The syntax {...field.input} takes any properties applied to the redux-form <Field /> class and applies
  them to the <input /> that is created in the function. See redux-form docs for more info.
*/
export const renderInput = field => (renderField(field, <input {...field.input} className="form-control" />));

// Public render function that creates an <textarea /> wrapped in validation messages
export const renderTextArea = field => (renderField(field, <textarea {...field.input} className="form-control" />));

// Public render function that creates an <select /> wrapped in validation messages
export const renderSelect = field => (renderField(field, <select {...field.input} className="form-control">{field.children}</select>));
