/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
const cleanFormData = (data, schema) => {
  const cleanedData = {};

  for (const property in schema.properties) {
    if (data.hasOwnProperty(property)) {
      const value = data[property];
      const propertySchema = schema.properties[property];

      if (propertySchema.type === 'object' && typeof value === 'object') {
        cleanedData[property] = cleanFormData(value, propertySchema);
      } else {
        cleanedData[property] = value;
      }
    }
  }

  return cleanedData;
};

export {
  cleanFormData,
};
