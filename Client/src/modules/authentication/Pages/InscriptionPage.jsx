import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import { createUser } from "../services/authService";
import Input from "../../../components/baseComponents/Input";
import logo from "../../../assets/img/logo.png";

const InscriptionPage = () => {
  const navigate = useNavigate();
  const [inscriptionInfo, setInscriptionInfo] = useState({
    nom: "",
    prenom: "",
    email: "",
    numeroTel: "",
    password: "",
    confirmPassword: "",
    dateNaissance: "1999-01-01",
    adresse: "",
  });
  const [loading, setLoading] = useState(false);


  const inputsList = [
    {
      title: "Nom",
      name: "nom",
      type: "text",
      value: inscriptionInfo.nom,
    },
    {
      title: "Prenom",
      name: "prenom",
      type: "text",
      value: inscriptionInfo.prenom,
    },
    {
      title: "Email",
      name: "email",
      type: "email",
      value: inscriptionInfo.email,
    },
    {
      title: "Date de naissance",
      name: "dateNaissance",
      type: "date",
      value: inscriptionInfo.dateNaissance,
    },
    {
      title: "Adresse",
      name: "adresse",
      type: "text",
      value: inscriptionInfo.adresse,
    },
    {
      title: "Numero de telephone",
      name: "numeroTel",
      type: "text",
      value: inscriptionInfo.numeroTel,
    },
    {
      title: "Mot de passe",
      name: "password",
      type: "password",
      value: inscriptionInfo.password,
    },

    {
      title: "Confirmer Mot de passe",
      name: "confirmPassword",
      type: "text",
      value: inscriptionInfo.confirmPassword,
    },
  ];

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInscriptionInfo({ ...inscriptionInfo, [name]: value });
  };

  const handleInscription = async () => {
    const {email, password, adresse, nom,prenom , numeroTel , confirmPassword} = inscriptionInfo;
    if (
      !email ||
      !password ||
      !adresse ||
      !nom ||
      !prenom ||
      !numeroTel ||
      !confirmPassword
    ) {
      toast.error("vous devez remplir tous les champs");
    } else {
        if(password !== confirmPassword){
            toast.error("Mot de passe non identique à celui de la confirmation")
        }
        else {
          
      setLoading(true);
            const res = await(createUser(inscriptionInfo));
            if(res.status === 201){
              console.log("create account res is", res)
              toast.success("creation de compte effectuée avec succès")
              setTimeout(() => {
                setLoading(false);
                navigate("/connexion")
              },2000)
            } else {
              toast.error("une erreur s'est produite lors de la création ")
            }
        }
      /*  setTimeout(() => {
        if(loginInfo.email ==="kuntzstephane@gmail.com" && loginInfo.password==="password"){
          localStorage.setItem("login", true)
          navigate("/")
        } else {
          toast.error("utilisateur non reconnu")
        }
       },1500) */
    }
  };

  return (
    <section className="bg-signBg  w-screen min-h-screen md:h-screen flex justify-center items-center text-center">
      <div className=" bg-white rounded-lg p-4 md:p-8 m-4 ">
        <img
          src={logo}
          alt="logo"
          className="object-fit hover:cursor-pointer mx-auto"
          width={160}
          height={160}
          onClick={() => navigate("/")}
        />
        <p className="text-lg mt-4">Inscrivez-vous</p>
        <p className="font-light text-sm leading-4 text-slate-500 ">
          Créez un compte loueur en remplissant les champs suivants
        </p>
        <div className="w-full md:w-[600px] mx-auto mt-4">
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
          <div className="mt-2">
            <button
              className="bg-primary text-white w-full py-2.5 rounded-md mt-4 text-sm hover:bg-primary/90 hover:cursor-pointer"
              onClick={handleInscription}
            >
              {loading ? (
                <CircularProgress size="18px" color="inherit" />
              ) : (
                <span>Inscription</span>
              )}
            </button>
            <p className="text-center hover:underline hover:cursor-pointer font-light text-sm my-3">
              Mot de passe oublié ?
            </p>
            <p className="text-md leading-5">
              Vous avez déjà un compte loueur ?{" "}
              <span
                className="hover:underline hover:cursor-pointer text-primary "
                onClick={() => navigate("/connexion")}
              >
                Connectez-vous
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default InscriptionPage;
