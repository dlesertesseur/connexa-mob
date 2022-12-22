import { API } from "../Config/Api";

const findParameterById = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = API.parameter.findById + parameters.id;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error };
  }
};

export { findParameterById };
