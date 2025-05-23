const validateField = (fieldName, value, validationRules) => {
  const rule = validationRules[fieldName];
  if (!rule) return '';

  if (rule.required && (!value && value !== 0)) {
    return rule.message;
  }

  if (rule.validate && !rule.validate(value)) {
    return rule.message;
  }

  return '';
};

export default validateField;
