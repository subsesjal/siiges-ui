const validNumber = /^-?\d*\.?\d+$/;

export default function validateField(form, fieldName, setError, validationRules) {
  const error = {};
  let value = form[fieldName];

  if (fieldName.includes('.')) {
    const keys = fieldName.split('.');
    value = keys.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : ''), form);
  }

  const { message, isNumber, isDate } = validationRules[fieldName];

  if (value === undefined || value === '') {
    error[fieldName] = message;
  } else if (isNumber && !validNumber.test(value)) {
    error[fieldName] = message;
  } else if (isDate && Number.isNaN(Date.parse(value))) {
    error[fieldName] = message;
  } else {
    error[fieldName] = '';
  }

  setError((prevErrors) => {
    const updatedErrors = { ...prevErrors };
    if (error[fieldName]) {
      updatedErrors[fieldName] = error[fieldName];
    } else {
      delete updatedErrors[fieldName];
    }

    return updatedErrors;
  });

  return error;
}
