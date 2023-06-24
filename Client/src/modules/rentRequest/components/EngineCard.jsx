import React from "react";
import { useNavigate } from "react-router";
import { Rating } from "@mui/material";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const EngineCard = ({ engine }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg p-2.5 shadow shadow-md bg-white hover:shadow-xl">
      <img
        src={engine.photos[0].replaceAll(
          "http://agrorender-serveur.onrender.com/public",
          "https://agrorender-serveur.onrender.com"
        )}
        alt="engin"
        className="rounded-lg h-[150px] w-full object-cover"
        onClick={() => {
          navigate(`/engin/${engine._id}`);
        }}
      />
      <div className="py-2 mt-1">
        <p className="border border-secondary rounded-full px-2 text-sm text-secondary w-fit bg-transparent">
          {engine.categorie}
        </p>
        <div className="flex justify-between items-center mt-1 ">
          <p className=" font-medium capitalize text-lg">{engine.nom}</p>
          <p className="text-md flex items-center ml-1">
            <FaRegMoneyBillAlt className="mr-1 text-lg" />
            <span>{engine.prix}</span>
          </p>
        </div>
        <p>
          <span className=" font-light">Publié par </span>{" "}
          <span className="font-medium text-md">{engine.loueur.nom}</span>
        </p>
        <div className="mt-1 flex items-center">
          <Rating name="read-only" value={engine.loueur.noteTotale} readOnly />
          <span className="translate-y-[1px] text-slate-700 text-sm">
            {"(" + engine.loueur.nombreAvis + ")"}
          </span>
        </div>
        <button
          className="w-full rounded-md py-1.5 bg-primary text-white hover:bg-primary/90 mt-4"
          onClick={() => {
            navigate(`/location/${engine._id}`);
          }}
        >
          Louer l'engin
        </button>
      </div>
    </div>
  );
};

export default EngineCard;
