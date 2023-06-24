import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import Container from "../../../components/baseComponents/Container";
import ListEngines from "../components/ListEngines";

const CategoriesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const { engines } = useSelector((state) => state.engines);
  useEffect(() => {
    const tractorId = location.pathname.slice(11);
    if (categories.length > 0) {
      const verify = categories.find((elt) => elt._id === tractorId);
      if (!verify) {
        navigate("/");
      } else {
        setSelectedCat(verify);
      }
    }
  }, [categories]);

  return (
    <section className="bg-[#F8F8F8]">
      <Container className="py-4 ">
        <p className="text-center text-2xl text-primary mt-4 font-uppercase font-bold uppercase">
          {selectedCat.nom}
        </p>
        <p className="text-center text-slate-700">{selectedCat.description}</p>
       
        {
          selectedCat ? (
            <ListEngines engines={engines.filter((engin) => engin.categorie === selectedCat.nom)} />
          ):(
           <div className="min-h-[80vh] flex justify-center items-center "> 
             <CircularProgress size="50px" color="inherit" />
           </div>
          )
        }
      </Container>
    </section>
  );
};

export default CategoriesPage;
