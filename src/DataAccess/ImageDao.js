import { API } from "../Config/Api";

const loadImageFromApi = async (token, workerId, type, setImage) => {
  
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  };

  const url = API.worker.findImageByType + workerId + "/images/" + type;
  const res = await fetch(url, requestOptions);
  const data = await res.json();
  setImage("data:image/jpg;base64," + data.imageData.toString("base64"));
  console.log("data:image/jpg;base64," + data.imageData);

  // const reader = new FileReader();
  // reader.onload = () => {
  //   console.log("loadImageFromApi reader.onload", reader.result);
  //   setImage(reader.result);
  // };
  // reader.readAsDataURL(data);
};

export { loadImageFromApi };
