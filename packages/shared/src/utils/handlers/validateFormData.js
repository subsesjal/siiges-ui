/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import Ajv from 'ajv';
import { cleanFormData } from './cleanFormData';

const validateFormData = ({ schema, dataBody, cleanData }) => {
  let valid;
  let data;
  let validErrors;
  if (schema) {
    const ajv = new Ajv({ allErrors: true });

    const validate = ajv.compile(schema);

    valid = validate(dataBody);

    if (!valid) {
      validErrors = validate.errors;
    }

    data = cleanData ? cleanFormData(dataBody, schema) : dataBody;
  } else {
    data = dataBody;
    valid = true;
  }

  return {
    data,
    valid,
    validErrors,
  };
};

export {
  validateFormData,
};
