import React, { useState } from "react";
import { Modal } from "@mui/material";
const PdfModal = ({ open, pdf, handleClose }) => {
  console.log("pdf",pdf)
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none">
        <object
          data={`${import.meta.env.VITE_REACT_APP_PROXY_URL + pdf}`}
          type="application/pdf"
          width={600}
          height={600}
        >
          <p>
            Votre navigateur n'a pas de plugin pour la lecture des fichiers PDF.{" "}
            <br />
            Vous pouvez néanmoins{" "}
            <a
              href={`${import.meta.env.VITE_REACT_APP_PROXY_URL + pdf}`}
              download
            >
              telecharger
            </a>{" "}
            le fichier.
          </p>
        </object>
      </div>
    </Modal>
  );
};

export default PdfModal;
