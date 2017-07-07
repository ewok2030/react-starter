export const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 140) {
    errors.title = 'Must be 140 characters or less';
  } else if (values.title.length < 6) {
    errors.title = 'Must be at least 6 characters';
  }

  if (!values.status) {
    errors.status = 'Required';
  }

  return errors;
};

export const warn = (values) => {
  const warnings = {};
  if (values.title.length < 12) {
    warnings.title = 'Umm, can you be more descriptive?';
  }
  return warnings;
};

export default { validate, warn };
