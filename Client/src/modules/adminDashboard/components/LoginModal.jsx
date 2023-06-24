import React, { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { CircularProgress } from "@mui/material";
import { authenticateAdmin } from "../services/adminService";
import Input from "../../../components/baseComponents/Input";
import ModalWrapper from "../../../components/baseComponents/ModalWrapper";

const LoginModal = ({ open, data, handleClose }) => {
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
    const { email, password } = loginInfo;
    setLoading(true);
    if (!email && !password) {
      toast.error("veuillez remplir tous les champs");
      setLoading(false);
    } else {
      const res = await authenticateAdmin(loginInfo);
      if (res.status === 200) {
        
      const  {data}= res;
        toast.success("connexion réussie");
        localStorage.setItem("userToken", data.authToken);
        localStorage.setItem("userInfo", JSON.stringify(data.admin));
        localStorage.setItem("isAdmin", JSON.stringify(true));
        setLoading(false);
       navigate(0)
      } else {
        toast.error("une erreur est survenue veuillez réessayer");
        setLoading(false);
      }
      /* setTimeout(() => {
      localStorage.setItem("isAdmin", JSON.stringify(true));
      navigate(0);
    },3000) */
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Connection administrateur"}
          description="Entrez vos identifiants de connexion pour avoir accès à votre dashboard"
        />
        <div className="w-[350px] mx-auto">
          <div className="[&>*]:mt-2 ">
            <div>
              <Input
                title="Email"
                name="email"
                type="email"
                placeholder="Adresse mail"
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
                placeholder="Mot de passe"
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
            <div className="">
              <button
                className="bg-primary text-white w-full py-2.5 rounded-md mt-2 text-sm hover:bg-primary/90 hover:cursor-pointer"
                onClick={handleLogin}
              >
                {loading ? (
                  <CircularProgress size="18px" color="inherit" />
                ) : (
                  <span>Connexion</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </Modal>
  );
};

export default LoginModal;
