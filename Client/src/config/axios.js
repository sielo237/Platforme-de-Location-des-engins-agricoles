import axios from "axios";
const axiosInstance = axios;

const getType = () => {
const fichier = localStorage.getItem("fileType");
  if (!fichier || fichier === "false") {
    return "application/json";
  } else {
    return "multipart/form-data";
  }
  
};

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("userToken");
  req.headers.authorization = token ? "Bearer " + token : "";
  req.headers["Content-Type"] = getType(req);
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      window.location.href = "/connexion";
    }
    throw err;
  }
);

export default axiosInstance;
