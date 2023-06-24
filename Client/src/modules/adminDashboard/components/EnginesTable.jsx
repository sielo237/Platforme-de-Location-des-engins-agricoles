import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";
import { BsX, BsImages, BsFilePdf } from "react-icons/bs";
import { approveEngine } from "../services/adminService";
import ImagesModal from "./ImagesModal";
import PdfModal from "./PdfModal";
import ConfirmModal from "./ConfirmModal";
import engin from "../../../assets/img/engin2.jpg";

const EnginesTable = ({ engines }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading ] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [openValidate, setOpenValidate] = useState(false);
  const [selectedImages,setSelectedImages] = useState([]);
  const [selectedPdf,setSelectedPdf] = useState("");
  const [validate, setValidate] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const getStatutName = (name) => {
    
    var statut = { name: "Rejeté", color: "#f87171" };
    if (name.includes("en attente")) {
      statut = { name: "En attente", color: "#6366f1" };
    } else if (name === "validé") {
      statut = { name: "Validé", color: "#02C24A" };
    }
    return statut;
  };

  const handleClose = () => {
    setOpenImages(false)
    setOpenValidate(false)
    setSelectedImages([]);
    setSelectedPdf("");
  };

  const handleClosePdf = () => {
    setOpenPdf(false);
  };
  const handleCloseValidate = () => {
    setOpenValidate(false);
    setSelectedData("");
    setReason("");
    setValidate(false)
  };



  const validateEngine = async () => {
    const val = {statut:validate ? "validé":"rejeté", commentaire:validate ? "Engin conforme selon les règles":reason}
    try{
      setIsLoading(true)
      const res = await approveEngine(val, selectedData._id);
      if(res.status === 200){
        toast.success("choix effectué avec succès");
        handleClose();
        navigate(0);
        setIsLoading(false)
      }
    }catch(error){
      console.log("error ", error)
      toast.error("une erreur est survenue , veuillez réessayer");
      setIsLoading(false)
    }
   /*  if(res.status === 200){

    } */
  }

  const getNewImagesUrl =(images) => {
    var res = [];
    for(let img of images){
      res.push(img.replaceAll("http://agrorender-serveur.onrender.com/public",""))
    }
    return res;
  }

  return (
    <section className="mt-4">
      <div className="bg-white rounded-md p-6">
        <p className="text-lg font-light">
          Nombre d'engins : {engines.length}{" "}
        </p>
        <table className=" w-full mt-4">
          <tr className="[&>*]:text-start [&>*]:text-sm [&>*]:font-medium  [&>*]:border-b [&>*]:border-slate-300 [&>*]:py-3 [&>*]:text-slate-600">
            <th>Engin</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix location</th>
            <th>Disponibilité</th>
            <th>Statut</th>
            <th>Photos</th>
            <th>Fichier</th>
            <th>Actions</th>
          </tr>
          {engines.map((elt, id) => {
            const statut = getStatutName(elt.statut);
            return (
              <tr
                key={id}
                className="text-start [&>*]:py-3 [&>*]:text-sm  hover:bg-slate-50"
              >
                <td className="flex justify-start items-center">
                  <img
                    src={elt.photos[0].replaceAll("/public","")}
                    alt="profile 1 "
                    className="rounded-full h-10 w-10 object-cover "
                  />
                </td>
                <td>{elt.nom}</td>
                <td>{elt.categorie} </td>

                <td>{elt.prix} </td>
                <td>
                  <span
                    className={`py-1 px-2 rounded-md  ${
                      elt.disponibilite
                        ? "bg-secondary"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {elt.disponibilite ? "Disponible" : "Non disponible"}
                  </span>
                </td>
                <td>
                  <span
                    className="py-1 px-2 rounded-md text-white"
                    style={{ backgroundColor: statut.color }}
                  >
                    {statut.name}
                  </span>
                </td>
                <td className="">
                  <div
                    className="flex items-center hover:underline hover:cursor-pointer"
                    onClick={() => {setOpenImages(true); setSelectedImages(elt.photos)}}
                  >
                    <BsImages className="mr-1" />
                    Voir photos
                  </div>
                </td>
                <td className="">
                  <div
                    className="flex items-center hover:underline hover:cursor-pointer"
                    onClick={() => {setOpenPdf(true); setSelectedPdf(elt.document)}}
                  >
                    <BsFilePdf className="mr-1" />
                    Voir fichier
                  </div>
                </td>
                <td className={`${statut.name!=="En attente"&&"hidden"}  text-primary`}>
                  <p className="flex items-center justify-around [&>*]:hover:cursor-pointer hover:underline ">
                    <AiOutlineCheck
                      className="scale-[1.2] "
                      onClick={() => {
                        setOpenValidate(true);
                        setValidate(true);
                        setSelectedData(elt)
                      }}
                    />
                    <BsX
                      className="scale-[1.8] text-red-500 "
                      onClick={() => {
                        setOpenValidate(true);
                        setValidate(false);
                        setSelectedData(elt)
                      }}
                    />
                  </p>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <ImagesModal images={getNewImagesUrl(selectedImages)}  open={openImages} handleClose={handleClose} />
      <PdfModal  pdf={selectedPdf.replaceAll("http://agrorender-serveur.onrender.com/public","")}  open={openPdf} handleClose={handleClosePdf} />
      <ConfirmModal
      loading={isLoading}
        open={openValidate}
        validate={validate}
        data={selectedData}
        reason={reason}
        handleChange={(e) => setReason(e.target.value)}
        handleClose={handleCloseValidate}
        handleValidate = {validateEngine}
      />
    </section>
  );
};

export default EnginesTable;
