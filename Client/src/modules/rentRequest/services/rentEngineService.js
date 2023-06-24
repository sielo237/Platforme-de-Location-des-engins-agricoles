import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;


export const listValidEngines = (data) => {
  localStorage.setItem("fileType", false);
  return axiosInstance.get(rootLink + "/user/engins/valide", data);
};


export const locationRequest = (data) =>{
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink + "/user/location", data);
}
