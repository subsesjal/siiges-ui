function getFormData(className) {
  const formData = document.getElementsByClassName(className);
  const formDataList = Object.values(formData).map((element) => {
    const { name, value } = element;
    if (name !== undefined && value !== undefined && value !== '') {
      const obj = {};
      obj[name] = value;
      return obj;
    }
    return 0;
  });
  const formDataObject = Object.assign({}, ...formDataList);
  return { ...formDataObject };
}

function getFormSelectData(className) {
  const formData = document.getElementsByClassName(className);
  const formDataList = Object.values(formData).map((element) => {
    const { name, value } = element;
    if (name !== undefined && value !== undefined && value !== '') {
      const obj = {};
      obj[name] = value;
      return obj;
    }
    return 0;
  });
  const formDataObject = Object.assign({}, ...formDataList);
  return { ...formDataObject };
}

export {
  getFormData,
  getFormSelectData,
};
