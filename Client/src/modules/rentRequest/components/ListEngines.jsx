import React from "react";
import EngineCard from "./EngineCard";
import noEngines from "../../../assets/img/noEngines.svg"

const ListEngines = ({ engines }) => {
  return (
    <div>
      {engines.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col items-center">
          <img src={noEngines} alt="aucun engin" width={400} height={400}/>
          <p className="font-bold text-lg translate-y-[-20px]">Aucun engin trouvé pour cette catégorie</p>
          </div>
      ) : (
        <div>
          <p className="my-4 text-center font-semibold">
            {engines.length} engins trouvés
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {engines.map((engine, id) => {
              return <EngineCard engine={engine} key={id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEngines;
