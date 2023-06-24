import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import ModalWrapper from "../../../components/baseComponents/ModalWrapper";

const DeleteEngineModal = ({ open, data, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={"Supprimer un engin"}
          description="Voulez vous vraiment supprimer cet engin ? Cette action est irreversible"
        />
        <div>
          <p className="text-center my-2 font-bold uppercase text-lg">{data && data.nom}</p>
          <div className=" flex justify-center">
            <button
              className="border border-slate-800 py-2 px-6 rounded-md bg-white text-slate-800 mr-4 hover:bg-slate-100 "
              onClick={handleClose}
            >
              Annuler
            </button>
            <button className="border border-red-500 py-2 px-6 rounded-md bg-red-500 text-white  ml-4 hover:bg-red-400 hover:border-red-400">
              Supprimer
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </Modal>
  );
};

export default DeleteEngineModal;
