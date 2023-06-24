import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;

export const ahpRequest = (data) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink + "/api/ahp", data);
  }