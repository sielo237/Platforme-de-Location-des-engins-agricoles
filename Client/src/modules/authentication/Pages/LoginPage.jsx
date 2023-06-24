import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import { authenticateUser } from "../services/authService";
import Input from "../../../components/baseComponents/Input";
import logo from "../../../assets/img/logo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async () => {
   if(!loginInfo.email && !loginInfo.password){
    toast.error("vous devez remplir tous les champs")
   } else{
    setLoading(true);
    const res = await authenticateUser(loginInfo)
    if(res.status === 200){
      
      const  {data}= res;
      localStorage.setItem("userToken",data.authToken);
      localStorage.setItem("userInfo",JSON.stringify( data.loueur));
      localStorage.setItem("isAdmin",JSON.stringify(false));
      toast.success("connexion réussie");
      setTimeout(() => {
        setLoading(false);
        navigate("/")
       },1500)
    }
    else {
      toast.error("Utilisateur non trouvé")
    }
   }
  }

  return (
    <section className="bg-signBg w-screen h-screen flex justify-center items-center text-center">
      <div className=" bg-white rounded-lg  p-4 md:p-8 m-4 ">
        <img src={logo} alt="logo" className="object-fit hover:cursor-pointer mx-auto" width={160} height={160} onClick={() => navigate("/")} />
        <p className="text-lg mt-4">Connectez-vous</p>
        <p className="font-light text-sm leading-4 text-slate-500 ">Connectez vous à votre compte loueur  </p>
        <div className="w-full md:w-[350px] mx-auto mt-4">
          <div className="[&>*]:mt-2">
            <div>
              <Input
                title="Email"
                name="email"
                type="email"
                value={loginInfo.email}
                handleChange={handleChange}
                icon={<GoMail />}
                iconStart
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div>
              <Input
                title="Mot de passe"
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginInfo.password}
                handleChange={handleChange}
                icon={
                  showPassword ? (
                    <BsEyeSlashFill
                      className="text-slate-400 hover:text-slate-400/90 hover:cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <BsEyeFill
                      className="text-slate-400  hover:text-slate-400/90 hover:cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                iconEnd
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </div>
          <div className="mt-2">
            <button
              className="bg-primary text-white w-full py-2.5 rounded-md mt-4 text-sm hover:bg-primary/90 hover:cursor-pointer"
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress size="18px" color="inherit" />
              ) : (
                <span>connexion</span>
              )}
            </button>
            <p className="text-center hover:underline hover:cursor-pointer font-light text-sm my-3">
              Mot de passe oublié ?
            </p>
            <p className="text-md leading-5">Vous n'avez pas de compte loueur ? <span className="hover:underline hover:cursor-pointer text-primary " onClick={() => navigate("/inscription")} >Inscrivez-vous</span></p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default LoginPage;
