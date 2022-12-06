import { API } from "../Config/Api";

const uploadWorkerImage = async (parameters) => {
  const formData = new FormData();

  formData.append('file', { name: parameters.type + ".jpg", uri: parameters.file, type: "image/jpeg" });

  try {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        token: parameters.token,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };

    const url = API.document.uploadImage + "/" + parameters.id + "/images/" + parameters.type;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error };
  }
};

const findDocumentsTemplateByCountry = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };

    const url = API.document.imagefindTemplates + "/" + parameters.country;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

const findAllImagesByWorkerId = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };
    const url = API.document.findAllImagesByWorkerId + "/" + parameters.id + "/images";
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export { findDocumentsTemplateByCountry, findAllImagesByWorkerId, uploadWorkerImage };
