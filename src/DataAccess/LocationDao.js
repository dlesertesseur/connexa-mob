import { API } from "../Config/Api";

const registerLocation = async (parameters) => {
  try {

    const body = JSON.stringify(parameters.coords);

    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
      body:body
    };

    const url = API.location.register + parameters.id +"/locations";
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error };
  }
};

export { registerLocation };
