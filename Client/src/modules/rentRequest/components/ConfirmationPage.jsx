import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {

  const navigate = useNavigate();
  const confirmation = JSON.parse(localStorage.getItem("confirmation"));
  useEffect(() => {
  
    if (!confirmation) {
      navigate("/");
    } 
  }, []);
  return (
    <section className=" bg-[#F8F8F8] min-h-[100vh] flex  items-center  w-full  p-4 md:p-8 md:grid md:grid-cols-12 gap-4 ">
      <div className="md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 flex flex-col items-center text-center ">
        <img
          className="rounded-full h-[90px] w-[90px] lg:h-[100px] lg:w-[100px] mt-3 object-cover"
          src={confirmation.engine.photos[0].replaceAll(
            "http://agrorender-serveur.onrender.com/public",
            "https://agrorender-serveur.onrender.com"
          )}
          alt="professional pic"
        />
        <p className="text-primary font-semibold text-xl my-2">Demande de location effectuée avec succès</p>
        <p className="font-light text-lg">
          Votre demande a été prise en compte et vous serez notifié si il a été
          accepté ou pas. Vous pouvez consulter votre boite mail pour voir les détails de confirmation.
        </p>
        <div className="w-full flex flex-col [&>*]:my-1 mt-4">
          
          <div>
            <p className="text-secondary text-md hover:underline hover:underline-offset-1 hover:cursor-pointer" onClick={() => {localStorage.removeItem("confirmation");navigate("/")}}>Retour à l'accueil</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPage;
