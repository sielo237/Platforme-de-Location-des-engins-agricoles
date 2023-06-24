import React from "react";
import { AiFillStar } from "react-icons/ai";
import Container from "../../../components/baseComponents/Container";
import SectionTitle from "./SectionTitle";
import profile1 from "../../../assets/img/profile1.png";
import profile2 from "../../../assets/img/profile2.png";
import profile3 from "../../../assets/img/profile3.png";

const Testimonials = () => {
  const testimonialsList = [
    {
      img:profile3,
      name:"Micaëlle Tchuente",
      job:"Agricultrice",
      description:"Grace à AgroRental j'ai pu accroitre ma production en louant des engins qui ont réalisé en peu de temps ce que je devais faire en un an au moins. Je vous le recommande vivement."
    },
    {
      img:profile2,
      name:"Kenfack Simon",
      job:"Agriculteur",
      description:"En louant les engins agricoles d'AgroRental, j'ai pu optimiser mes opérations et améliorer ma productivité de manière significative. Je suis très satisfait de l'efficacité des équipements d'AgroRental et je les recommande chaudement à tous les autres agriculteurs "
    },
    {
      img:profile1,
      name:"Deborah lukaku",
      job:"Agricultrice",
      description:"Grâce à l'utilisation des outils innovants d'AgroRental, j'ai pu augmenter considérablement mes rendements agricoles. Je suis vraiment impressionné par les résultats et je recommande vivement AgroRental à tous les agriculteurs en quête de solutions efficaces"
    }
  ]
  return (
    <Container className="mb-4">
      <SectionTitle title="Ce que disent nos clients" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 my-4">
        {
          testimonialsList.map((testimonial, id) => {
            return(
              <div className="m-2" key={id}>
          <img
            src={testimonial.img}
            alt="farmer"
            height={90}
            width={90}
            className="rounded-full mx-auto mb-2"
          />
          <div className="text-center">
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-[#939393] font-light leading-4">{testimonial.job}</p>
            <p className="mt-2">
              {testimonial.description}
            </p>
            <p className="flex justify-center items-center [&>*]:mx-1 text-secondary mt-2 text-lg">
              <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /><AiFillStar />
            </p>
          </div>
        </div>
            )
          })
        }
        
      </div>
    </Container>
  );
};

export default Testimonials;
