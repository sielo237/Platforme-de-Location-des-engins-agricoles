import React,{useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import { locationRequest } from '../services/rentEngineService';
import Input from '../../../components/baseComponents/Input';

const RequestForm = ({engineDetail}) => {
    const navigate = useNavigate();
    const [locationInfo, setLocationInfo] = useState({
      nom: "",
      prenom: "",
      email: "",
      numeroTel: "",
      dateDebut: "2023-06-23",
      dateFin: "2023-06-24",
      dateNaissance: "2000-06-23",
      adresseLivraison: "",
    });
    const [loading, setLoading] = useState(false);
  
  
    const inputsList = [
      {
        title: "Nom",
        name: "nom",
        type: "text",
        value: locationInfo.nom,
      },
      {
        title: "Prenom",
        name: "prenom",
        type: "text",
        value: locationInfo.prenom,
      },
      {
        title: "Email",
        name: "email",
        type: "email",
        value: locationInfo.email,
      },
      {
        title: "Date de naissance",
        name: "dateNaissance",
        type: "date",
        value: locationInfo.dateNaissance,
      },
      {
        title: "Adresse de livraison",
        name: "adresseLivraison",
        type: "text",
        value: locationInfo.adresseLivraison,
      },
      {
        title: "Numero de telephone",
        name: "numeroTel",
        type: "text",
        value: locationInfo.numeroTel,
      },
      {
        title: "Date début",
        name: "dateDebut",
        type: "date",
        value: locationInfo.dateDebut,
      },
  
      {
        title: "Date fin",
        name: "dateFin",
        type: "date",
        value: locationInfo.dateFin,
      },
    ];
  
    const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setLocationInfo({ ...locationInfo, [name]: value });
    };
  
    const handleLocation = async () => {
      const {email, adresseLivraison, nom,prenom , numeroTel , dateDebut, dateFin} = locationInfo;
      if (
        !email ||
        !dateFin ||
        !adresseLivraison ||
        !nom ||
        !prenom ||
        !numeroTel ||
        !dateDebut
      ) {
        toast.error("vous devez remplir tous les champs");
      } else {
         
        const data = {...locationInfo,enginId:engineDetail._id,pays:"Cameroun",prixTotal:engineDetail.prix}
        console.log("data sent is ",data)
        setLoading(true);
             try{
               const res = await(locationRequest(data));
               console.log("res ",res)
              if(res.status === 200){
               localStorage.setItem("confirmation",JSON.stringify({engine:engineDetail}))
               navigate("/confirmation")
              } else {
                toast.error("une erreur s'est produite lors de la création ")
              } 
             } catch(error){
              toast.error("une erreur est survenue");
              console.log("error",error)
              setLoading(false)
             }
        
        
      }
    };
  
    return (
        <div className=" bg-white rounded-lg p-4 ">
         <p className='text-center uppercase text-xl font-bold'>Location d'engin</p>
         <p className='font-light text-center'>Veuillez remplir les informations çi-dessous</p>
          <div className="w-full  mx-auto mt-4">
            <div className="[&>*]:mt-2 grid md:grid-cols-2 gap-4">
              {inputsList.map((input, id) => {
                return (
                  <Input
                    key={id}
                    title={input.title}
                    name={input.name}
                    type={input.type}
                    value={input.value}
                    handleChange={handleChange}
                  />
                );
              })}
            </div>
            <div className="mt-2 w-full flex justify-center">
              <button
                className="bg-primary text-white mx-auto px-8 py-2.5 rounded-md  font-medium mt-4 text-sm hover:bg-primary/90 hover:cursor-pointer"
                onClick={handleLocation}
              >
                {loading ? (
                  <CircularProgress size="18px" color="inherit" />
                ) : (
                  <span>Louer l'engin</span>
                )}
              </button>
              
            </div>
          </div>
          
        <ToastContainer />
        </div>)
}

export default RequestForm