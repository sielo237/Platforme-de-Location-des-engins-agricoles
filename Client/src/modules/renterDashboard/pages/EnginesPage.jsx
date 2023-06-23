import React, { useState, useEffect } from "react";
import EngineModal from "../components/EngineModal";
import { toast, ToastContainer } from "react-toastify";
import {
  createEngine,
  listCategories,
  listEngins,
} from "../services/renterService";
import noEngine from "../../../assets/img/noEngines.svg";
import DisplayEngines from "../components/DisplayEngines";

const EnginesPage = () => {
  const [enginesList, setEnginesList] = useState([]);
  const [engineInfo, setEngineInfo] = useState({
    nom: "",
    categorie: "",
    description: "",
    photos: [],
    document: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setEngineInfo({
      nom: "",
      categorie: "",
      prix: 0,
      loueur: 0,
      description: "",
      photos: [],
      document: "",
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await listCategories();
      if (res.status === 200) {
        setCategoriesList(res.data);
      }
    };

    const getEngines = async () => {
      const res = await listEngins();
      if (res.status === 200) {
        console.log("engines list", res.data);
        setEnginesList(res.data);
      }
    };
    getCategories();
    getEngines();
  }, []);

  const handleAdd = async () => {
    setIsLoading(true);
    var formData = new FormData();
    formData.append("nom", engineInfo.nom);
    formData.append("prix", parseInt(engineInfo.prix));
    formData.append("description", engineInfo.description);
    formData.append("categorie", engineInfo.categorie);
    for (let photo of engineInfo.photos) {
      formData.append("photos", photo);
    }
    formData.append("document", engineInfo.document);
    try {
      const res = await createEngine(formData);
      if (res.status === 201) {
        toast.success("engin ajouté avec succès");
        const getEngins = await listEngins();
        if (getEngins.status === 200) {
          setEnginesList(getEngins.data);
        }
        handleClose();
        setIsLoading(false);
      } else {
        toast.error("une erreur est survenue lors de l'ajout de l'engin");
        setIsLoading(false);
      }
      console.log("res is", res);
    } catch (error) {
      toast.error("une erreur est survenue lors de l'ajout de l'engin");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEngineInfo({ ...engineInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    var imageArray = [];
    const images = e.target.files;
    const numImages = images.length > 6 ? 6 : images.length;
    for (let i = 0; i < numImages; i++) {
      imageArray.push(images[i]);
    }
    setEngineInfo({ ...engineInfo, photos: imageArray });
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setEngineInfo({
      ...engineInfo,
      document: file ? file : "",
    });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <section className="m-4">
      <p className="text-primary font-bold text-2xl uppercase text-center">
        Liste des engins{" "}
      </p>
      <div className="w-full flex justify-end">
        <button
          className="text-slate-900 py-2 px-6 bg-secondary rounded-md hover:cursor-pointer hover:bg-secondary/80"
          onClick={handleOpen}
        >
          + Nouvel engin
        </button>
      </div>
      {enginesList.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img src={noEngine} alt="no engine " width={400} height={400} />
          <p className="md:translate-y-[-5vh] text-lg font-medium  text-center">
            Aucun engin pour le moment
          </p>
        </div>
      ) : (
        <DisplayEngines engines={enginesList} />
      )}
      <EngineModal
        open={open}
        step={step}
        categories={categoriesList}
        handleClose={handleClose}
        data={engineInfo}
        handleChange={handleChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleImageChange={handleImageChange}
        handlePdfChange={handlePdfChange}
        handleAdd={handleAdd}
        isLoading={isLoading}
      />
      <ToastContainer />
    </section>
  );
};

export default EnginesPage;
