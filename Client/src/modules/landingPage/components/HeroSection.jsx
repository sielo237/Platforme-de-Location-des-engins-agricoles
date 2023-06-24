import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 1.2,
    },
  },
};

const HeroSection = () => {
  return (
    <div className="h-[90vh] bg-heroBg bg-cover bg-no-repeat flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <p
          className=" font-medium text-3xl  md:text-5xl text-primary"
          style={{ textShadow: "1px 1px 4px #000" }}
        >
          Bienvenue sur <span className="text-secondary ">Agro</span>
          <span className="text-primary">Rental</span>
        </p>
        <p
          className="mt-2  font-medium  text-lg md:text-xl text-white"
          style={{ textShadow: "1px 1px 4px #000" }}
        >
          La plateforme de réference pour la location d'engins agricoles en
          Afrique
        </p>
        <button className="mx-auto px-6 py-2 bg-primary shadow shadow-md text-white border border-primary hover:cursor-pointer hover:bg-transparent hover:text-primary  rounded-md flex justify-center items-center mt-4">
          <span>Explorer</span>
          <BsArrowRight className="ml-2" />
        </button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
