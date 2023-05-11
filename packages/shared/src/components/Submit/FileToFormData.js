const fileToFormData = (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (event) => {
    const fileContent = event.target.result;
    const fileName = file.name;
    const fileBlob = new Blob([fileContent], { type: file.type });
    const formData = new FormData();
    formData.append('archivoAdjunto', fileBlob, fileName);
    resolve(formData);
  };
  fileReader.onerror = (error) => {
    reject(error);
  };
});

export default fileToFormData;
