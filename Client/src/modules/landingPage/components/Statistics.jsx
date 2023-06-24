import React from "react";
import Container from "../../../components/baseComponents/Container";

const Statistics = () => {
  const statList = [
    {
      name: "+100",
      topDescription: "Agriculteurs",
      bottomDescription: "Satisfaits",
    },
    {
      name: "+350",
      topDescription: "Engins",
      bottomDescription: "disponibles",
    },
    {
      name: "4.7",
      topDescription: "Notation",
      bottomDescription: "moyenne",
    },
  ];
  return (
    <section className="bg-statBg bg-left-bottom  bg-cover bg-fixed  bg-no-repeat my-8 h-[40vh] flex justify-around items-center bg-primary text-white [&>*]:mx-4 flex-wrap ">
        {statList.map((elt,id) => {
          return (
            <div className="text-center" key={id}>
              <p className="text-5xl  font-bold text-primary">{elt.name}</p>
              <p className="uppercase font-bold text-xl mt-2 leading-5">
                {elt.topDescription} <br /> {elt.bottomDescription}
              </p>
            </div>
          );
        })}
    </section>
  );
};

export default Statistics;
