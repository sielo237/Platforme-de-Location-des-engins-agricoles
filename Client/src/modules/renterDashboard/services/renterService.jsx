import axiosInstance from "../../../config/axios";

const rootLink = import.meta.env.VITE_REACT_APP_PROXY_URL;



export const createEngine = (data) => {  
    localStorage.setItem("fileType", true);
    return axiosInstance.post(rootLink+ "/loueur/engin", data);
}

export const listEngins =() => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink+ "/loueur/engins");
}

export const listCategories =() => {
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink+ "/user/Getcategorie");
}


export const listLocation = (data) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/loueur/location", data);
  }

  export const acceptedLocation = (data) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/loueur/locationsAcceptees", data);
  }

  export const rejectedLocation = (data) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.get(rootLink + "/loueur/locationsRefusees", data);
  }

  export const validateLocation = (id) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.put(rootLink + `/loueur/ValideLocation/${id}`);
  }

  export const rejectLocation = (id) =>{
    localStorage.setItem("fileType", false);
    return axiosInstance.put(rootLink + `/loueur/RefuseLocation/${id}`);
  }
