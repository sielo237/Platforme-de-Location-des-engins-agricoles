import React, { useState,useEffect } from "react";
import { adminEnginesList } from "../services/adminService";
import noEngine from "../../../assets/img/noEngines.svg";
import EnginesTable from "../components/EnginesTable";

const EnginesVisualisation = () => {
 const [enginesList, setEnginesList] = useState([]);
 useEffect(()=>{
  const getListEngines = async() => {
    const res = await (adminEnginesList());
    if(res.status = 200){
      setEnginesList(res.data)
    }
  }
  getListEngines()
 },[])
  return (
    <section className="mt-4">
       <p className="text-primary font-bold text-2xl uppercase text-center">
        Liste des engins du système{" "}
      </p>
      
      {enginesList.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img src={noEngine} alt="no engine " width={400} height={400} />
          <p className="md:translate-y-[-5vh] text-lg font-medium  text-center">
            Aucun engin posté pour  le moment
          </p>
        </div>
      ) : (
        <EnginesTable engines = {enginesList}/>
      )}
    </section>
  );
};

export default EnginesVisualisation;
