import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;

export const authenticateAdmin = (data) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.post(rootLink + "/admin/login", data);
  };

  export const adminEnginesList = (data) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/admin/engins/All", data);
  };

  export const approveEngine = (data,id) => {
    localStorage.setItem("fileType", false);
    return axiosInstance.put(rootLink + `/admin/validation/${id}`, data);
  }