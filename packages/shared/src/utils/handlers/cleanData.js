/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export default function cleanData(data, schema) {
  const cleanedData = {};

  for (const property in schema.properties) {
    if (data.hasOwnProperty(property)) {
      const value = data[property];
      const propertySchema = schema.properties[property];

      if (propertySchema.type === 'object' && typeof value === 'object') {
        cleanedData[property] = cleanData(value, propertySchema);
      } else {
        cleanedData[property] = value;
      }
    }
  }

  return cleanedData;
}
