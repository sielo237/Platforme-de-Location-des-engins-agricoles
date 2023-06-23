import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer } from "react-toastify";
import ModalWrapper from "../../../components/baseComponents/ModalWrapper";
import Input from "../../../components/baseComponents/Input";
import Button from "../../../components/baseComponents/Button";
import EngineImages from "./EngineImages";
import EnginePdf from "./EnginePdf";

const EngineModal = ({
  open,
  step,
  data,
  isLoading,
  categories,
  handleAdd,
  handleNext,
  handlePrev,
  handleChange,
  handleClose,
  handleImageChange,
  handlePdfChange,
}) => {
  const modify = { modifyStatus: false };

  const description = [
    "Veuillez remplir les champs çi dessous",
    "Ajoutez les images relatives à votre engin",
    "Ajoutez le document spécifiant que c'est vous qui possédez l'engin",
  ];

  const verify = () => {
    if (step === 1) {
      if (!data.nom || !data.categorie || !data.description || data.prix <0) {
        toast.error("veuillez remplir tous les champs");
        return false;
      } else {
        return true;
      }
    } else if (step === 2) {
      if (data.photos.length < 1) {
        toast.error("vous devez uploader au moins une photo");
        return false;
      } else {
        return true;
      }
    } else {
      if(!data.document){
        toast.error("vous devez ajouter un document")
      }else {
        return true
      }
    }
  };

  const handleButtonClick = () => {
    if (!modify.modifyStatus) {
        if (verify()) {
          if(step <3){
            handleNext()
          }else {
            handleAdd()
          }
        }
      
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={
            !modify.modifyStatus ? "Ajouter un engin" : "Modifier un engin"
          }
        />
        <div className="[&>*]:mb-2 relative">
          <div className="text-center">
            <p className="text-center font-bold text-lg">Etape {step}/3</p>
            <p>{description[step - 1]}</p>
          </div>
          <p></p>
          {step === 1 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  title="Nom de l'engin"
                  name="nom"
                  value={data.nom}
                  handleChange={handleChange}
                />
                <Input
                  title="Prix de la location par jour"
                  name="prix"
                  type="number"
                  value={data.prix}
                  handleChange={handleChange}
                />
                <FormControl fullWidth sx={{ marginTop: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Catégorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.categorie}
                    label="Catégorie"
                    name="categorie"
                    onChange={handleChange}
                    sx={{
                      height: 50,
                      ".MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "#02C24A",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "#02C24A",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "#02C24A",
                      },
                    }}
                  >
                    {categories.map((cat, id) => {
                      return (
                        <MenuItem key={id} value={cat.nom}>
                          {cat.nom}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                
              <textarea
                placeholder="Description de l'engin"
                name="description"
                value={data.description}
                rows={4}
                className="w-full border border-[#D9D9D9] mt-2 rounded-md focus:outline-none  focus:border-primary hover:border-primary p-2"
                onChange={handleChange}
              />
              </div>
            </div>
          ) : (
            <div>
              <p
                className="flex text-center items-center absolute top-[-5px] hover:text-primary hover:cursor-pointer"
                onClick={handlePrev}
              >
                <BsArrowLeft className=" mr-1 " /> <span>retour</span>
              </p>
              <div>
                {step === 2 ? (
                  <EngineImages
                    images={data.photos}
                    handleChange={handleImageChange}
                  />
                ) : (
                  <EnginePdf
                    pdfFile={data.document}
                    handleChange={handlePdfChange}
                  />
                )}
              </div>
            </div>
          )}
          <div className="w-full mt-4">
            <Button
              title={
                !modify.modifyStatus
                  ? step < 3
                    ? "Suivant"
                    : "Ajouter engin"
                  : "Modifier"
              }
              handleClick={handleButtonClick}
              filled={true}
              loading={isLoading}
              className="mx-auto rounded-md px-6 "
            />
          </div>
        </div>

        <ToastContainer />
      </div>
    </Modal>
  );
};

export default EngineModal;
