import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;


export const authenticateUser = (data) => {
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink + "/loueur/login", data);
};

export const createUser = (data) => {
  localStorage.setItem("fileType", false);
  return axiosInstance.post(rootLink + "/loueur/singup", data);
};
