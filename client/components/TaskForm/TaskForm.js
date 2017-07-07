import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, warn } from './taskValidation';
import { renderInput, renderSelect, renderTextArea } from './renderForm';

/*
  Need to apply reduxForm decorator, which attaches to redux store's state.
  Properties include:
    form: must be unique across the app
    validate: the functions to call to validate field data
    warn: the function to call to warn user of errors in field data
    enableReinitialize: will reset the form when initialValues are changed
      (form only mounts once, so need this to reset form if user previously
      used the form to enter data for antoher entity)
*/
@reduxForm({ form: 'TaskForm', validate, warn, enableReinitialize: true })
export default class TaskForm extends React.Component {
  static propTypes = {
    // Properties to be supplied by parent container
    onSave: React.PropTypes.func.isRequired,
    statusOptions: React.PropTypes.array.isRequired,

    // http://redux-form.com/6.0.0-rc.3/docs/api/ReduxForm.md/
    initialValues: React.PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      description: React.PropTypes.string }),

    // Properties added by redux-form
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    invalid: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initialValues: {
      _id: null,
      title: '',
      status: '',
      description: '',
    },
  }

  render() {
    const { pristine, reset, invalid, submitting, handleSubmit, onSave } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>Task Form</strong>
          <span className="pull-right text-muted">
            <small>{this.props.initialValues._id}</small>
          </span>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit(onSave)}>

            <Field name="title" type="text" component={renderInput} label="Title" />

            <Field name="status" component={renderSelect} label="Status">
              {this.props.statusOptions.map(s => <option key={s._id} value={s.label}>{s.label}</option>)}
            </Field>

            <Field name="description" component={renderTextArea} label="Description" />

            <button action="submit" disabled={pristine || invalid} className="btn btn-primary">Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default">Undo</button>
          </form>
        </div>
        <div className="panel-footer" />
      </div>
    );
  }
}
