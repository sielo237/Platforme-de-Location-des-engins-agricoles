import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { validateLocation, rejectLocation } from "../services/renterService";
import LocationActionModal from "./LocationActionModal";

const DisplayLocations = ({
  requestList,
  acceptedRequestList,
  rejectedRequestList,
}) => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValidate(false);
    setSelectedData("");
  };

  const handleValidate = async () => {
    setLoading(true);
    try {
      const res = await validateLocation(selectedData._id);
      if (res.status === 200) {
        toast.success("Action effectuée avec succès");
        setTimeout(() => {
          setLoading(false);
          navigate(0);
        }, 3000);
      }
    } catch (error) {
      toast.error("une erreur est survenue");
      console.log("error ", error);
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await rejectLocation(selectedData._id);
      if (res.status === 200) {
        toast.success("Action effectuée avec succès");
        setTimeout(() => {
          setLoading(false);
          navigate(0);
        }, 3000);
      }
    } catch (error) {
      toast.error("une erreur est survenue");
      setLoading(false);
    }
  };

  const verifyAccepted = (request) => {
    const res = acceptedRequestList.find((elt) => elt._id === request._id);
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  const verifyRejected = (elt) => {
    const res = rejectedRequestList.find((elt) => elt._id === request._id);
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-white rounded-md p-6">
        <p className="text-lg font-light">
          Nombre de demandes : {requestList.length}{" "}
        </p>
        <table className=" w-full mt-4">
          <tr className="[&>*]:text-start [&>*]:text-sm [&>*]:font-medium  [&>*]:border-b [&>*]:border-slate-300 [&>*]:py-3 [&>*]:text-slate-600">
            <th>Nom</th>
            <th>Prenom</th>
            <th>Numéro de télephone</th>
            <th>Adresse de livraison</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Engin</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
          {requestList.map((elt, id) => {
            return (
              <tr
                key={id}
                className="text-start [&>*]:py-3 [&>*]:text-sm  hover:bg-slate-50"
              >
                <td>{elt.nom}</td>
                <td>{elt.prenom} </td>

                <td>{elt.numeroTel} </td>

                <td>{elt.adresseLivraison}</td>
                <td>{elt.dateDebut}</td>
                <td>{elt.dateFin}</td>
                <td>{elt.engin.nom}</td>
                <td>{elt.prixTotal}</td>
                <td className="text-primary">
                  {verifyAccepted(elt) ? (
                    <p>Accepté</p>
                  ) : verifyRejected(elt) ? (
                    <p className="text-red-400">Refusé</p>
                  ) : (
                    <p className="flex items-center justify-around [&>*]:hover:cursor-pointer hover:underline">
                      <AiOutlineCheck
                        className="scale-[1.2] "
                        onClick={() => {
                          setOpen(true);
                          setValidate(true);
                          setSelectedData(elt);
                        }}
                      />
                      <BsX
                        className="scale-[1.8] text-red-500 "
                        onClick={() => {
                          setOpen(true);
                          setValidate(false);
                          setSelectedData(elt);
                        }}
                      />
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <LocationActionModal
        open={open}
        loading={loading}
        data={selectedData}
        validate={validate}
        handleClose={handleClose}
        handleValidate={handleValidate}
        handleReject={handleReject}
      />
      <ToastContainer />
    </div>
  );
};

export default DisplayLocations;
