import React from "react";
import SectionTitle from "./SectionTitle";
import Farmer1 from "../../../assets/img/Farmer1.jpg";

const AboutUs = () => {
  return (
    <section className="w-[90%] mx-auto py-4">
      <SectionTitle title="A propos de nous" />
      <div className="grid md:grid-cols-2 px-4 py-4">
        <img
          src={Farmer1}
          alt="farmer-img"
          height={400}
          width={500}
          className="rounded-xl"
        />
        <div className="pl-4 lg:pr-4 mt-4 lg:mt-[0px]">
          <p className="text-secondary text-md">Modernisation agricole</p>
          <p className="text-xl font-bold leading-6 mt-2">
            Nous venons en aide aux agriculteurs en les fournissant des
            <span className="text-primary">
              {" "}
              engins agricoles de qualité
            </span>{" "}
          </p>
          <p className="mt-2">
            Augmentez considérablement votre production agricoles en utilisant
            les engins agricoles dont nous mettons à votre disposition. Grâce à
            notre gamme complète d'équipements agricoles de pointe, nous
            permettons aux agriculteurs d'obtenir des résultats exceptionnels
            tout en réduisant leurs coûts et en préservant l'environnement.
          </p>
          <button className="mt-6 px-6 py-2 bg-secondary text-slate-900 font-bold rounded-md hover:cursor-pointer hover:bg-secondary/90">
            En savoir plus
          </button>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
