import { API } from "../Config/Api";

const findProuctByEan = async (parameters) => {
  try {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = API.product.findByEan + parameters.ean;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error };
  }
};

export { findProuctByEan };
