import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "../../../components/baseComponents/Container";

const EngineDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { engines } = useSelector((state) => state.engines);
  const [engineDetail, setEngineDetail] = useState("");
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    const tractorId = location.pathname.slice(7);
    if (engines.length > 0) {
      const res = engines.find((eng) => eng._id === tractorId);
      if (res) {
        setEngineDetail(res);
      } else {
        navigate("/");
      }
    }
  }, [engines]);

  return (
    <section className="bg-[#F8F8F8]">
      {!engineDetail ? (
        <div className="h-[80vh] flex justify-center items-center">
          <CircularProgress size="50px" color="inherit" />
        </div>
      ) : (
        <Container className="flex flex-col md:flex-row py-8">
          <div className="md:basis-3/5 w-full py-4 flex h-[70vh]">
            <div className="flex flex-col mr-8">
              {engineDetail.photos.map((engine, id) => {
                return (
                  <button key={id} className="my-2">
                    <img
                      src={engine.replaceAll(
                        "http://agrorender-serveur.onrender.com/public",
                        "https://agrorender-serveur.onrender.com"
                      )}
                      alt="engin"
                      className={`${
                        id === selectedImg
                          ? "border-2 border-primary"
                          : "border border-white  hover:border-secondary"
                      }   h-[55px] w-[50px] object-cover`}
                      onClick={() => setSelectedImg(id)}
                    />
                  </button>
                );
              })}
            </div>
            <div className="w-full">
              <img
                src={engineDetail.photos[selectedImg].replaceAll(
                  "http://agrorender-serveur.onrender.com/public",
                  "https://agrorender-serveur.onrender.com"
                )}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="basis-2/5 px-8 py-2">
            <p className="capitalize font-semibold text-2xl">{engineDetail.nom}</p>
            <p className="border border-secondary rounded-full mt-1 mb-2 px-2 text-sm text-secondary w-fit bg-transparent">
              {engineDetail.categorie}
            </p>
            <div className="flex items-center ">
              <p className=" text-lg text-primary font-semibold mr-4">
                $ {engineDetail.prix} fcfa/jour
              </p>
              <div className="flex items-center">
                <Rating name="read-only" value={engineDetail.loueur.noteTotale} readOnly size="small" />
                <span className="ml-1 font-light text-slate-700 text-sm">
                  {"(" + engineDetail.loueur.nombreAvis + ") personnes ont noté "}
                </span>
              </div>
            </div>

            <div>
              <p className="font-semibold text-md mt-2 ">Description</p>
              <p className="font-light">{engineDetail.description}</p>
            </div>
            <button
              className="bg-primary w-full text-white py-2 hover:bg-primary/90 hover:cursor-pointer font-medium capitalize rounded-full mt-4"
              onClick={() => navigate("/location/" + engineDetail._id)}
            >
              Louer l'engin
            </button>
          </div>
        </Container>
      )}
    </section>
  );
};

export default EngineDetailsPage;
