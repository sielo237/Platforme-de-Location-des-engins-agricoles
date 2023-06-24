import React, { useState } from "react";
import { BsTrash, BsEye } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import {  BsImages, BsFilePdf } from "react-icons/bs";
import ImagesModal from "../../adminDashboard/components/ImagesModal";
import PdfModal from "../../adminDashboard/components/PdfModal";
import DeleteEngineModal from "./DeleteEngineModal";
import engin from "../../../assets/img/engin2.jpg";

/* const newEngine = [
  {
    _id: "648c138b00b903bc057d78fe",
    nom: "Tractor gr 23",
    description: "engin multifonctionnel",
    categorie: {
      _id: "648bcfc08419d5818b244823",
      nom: "Tracteur ",
      description:
        " Les tracteurs sont des véhicules motorisés utilisés pour fournir la puissance nécessaire à diverses opérations agricoles. Ils sont polyvalents et peuvent être équipés d'accessoires et d'outils spécifiques tels que des charrues, des herses, des pulvérisateurs, des remorques, etc.",
      __v: 0,
    },
    photos: ["http://localhost:3000/public/photos/1686901643614-530091833.jpg"],
    document: ["public\\documents\\1686901643709-126862455.pdf"],
    statut: "en attente de confirmation",
    disponibilite: true,
    prix: 12500,
    commentaire: "",
    loueur: "648adde0709075cbfb6f80cb",
    date: "2023-06-16T07:47:23.739Z",
    __v: 0,
  }
];
 */
const DisplayEngines = ({ engines }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [selectedImages,setSelectedImages] = useState([]);
  const [selectedPdf,setSelectedPdf] = useState("");
  const [deleteEngineInfo, setDeleteEngineInfo] = useState(null);
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
    setOpenDelete(false);
    setDeleteEngineInfo(null);
    setSelectedImages([]);
    setSelectedPdf("");
  };

  const getNewUrl = (imagesList) => {
    var res = [];
    for(let img of imagesList){
      res.push(img.slice(6));
    }
    console.log("res is ", res);
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
                    src={`${import.meta.env.VITE_REACT_APP_PROXY_URL}${elt.photos[0].replaceAll("public","")}`}
                    alt="profile 1 "
                    className="rounded-full h-10 w-10 object-cover "
                  />
                </td>
                <td>{elt.nom}</td>
                <td>{elt.categorie.nom} </td>

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
                <td className="text-primary">
                  <p className="flex items-center justify-around [&>*]:hover:cursor-pointer hover:underline">
              
                    <FiEdit3 className="scale-[1.2] " />
                    <BsTrash
                      className="scale-[1.2] text-red-500 "
                      onClick={() => {setOpenDelete(true); setDeleteEngineInfo(elt)}}
                    />
                  </p>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <ImagesModal images={getNewUrl(selectedImages)}  open={openImages} handleClose={() => setOpenImages(false)} />
      <PdfModal pdf={selectedPdf &&selectedPdf[0].slice(6)}  open={openPdf} handleClose={() => setOpenPdf(false)} />
      <DeleteEngineModal open={openDelete} data={deleteEngineInfo} handleClose={handleClose} />
    </section>
  );
};

export default DisplayEngines;
