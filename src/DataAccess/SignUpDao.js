import { API } from "../Config/Api";

const signUp = async (parameters) => {
  try {
    const body = JSON.stringify({
      email: parameters.email,
      firstname: parameters.firstName,
      lastname: parameters.lastName,
      password: parameters.password,
      phone: parameters.phoneNumber,
      birthDate: "2022-12-01",
      country: "ARGENTINA",
      city: "BUENOS AIRES",
      address: "ESPINA 1840",
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };

    const url = API.auth.signUp;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return({error:error});
  }
}

const findAllImagesByWorkerById = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };
    const url = API.auth.uploadImage + "/" + parameters.userId + "/images";
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

const uploadWorkerImage = async (parameters) => {
  const formData = new FormData();
  formData.append("file", parameters.file);
  formData.append("type", "multipart/form-data");

  try {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        token: parameters.token,
      },
      body: formData,
    };

    const url = API.auth.uploadImage + "/" + parameters.userId + "/images";

    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export { signUp, findAllImagesByWorkerById, uploadWorkerImage };
