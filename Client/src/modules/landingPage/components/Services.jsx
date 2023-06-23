import React from "react";
import SectionTitle from "./SectionTitle";
import Container from "../../../components/baseComponents/Container";
import engin1 from "../../../assets/img/engin1.png";
import Farmer2 from "../../../assets/img/Farmer2.jpg";
const Services = () => {
  return (
    <Container className=" p-4">
      <SectionTitle title="Nos services" />
      <div className="flex flex-wrap justify-around items-center px-4 py-2 [&>*]:m-2 ">
        <div className="relative  h-80 w-80">
          <img
            src={engin1}
            alt="description"
            className="rounded-xl object-cover h-80 w-80"
          />
          <div
            className="uppercase w-full absolute bottom-0 py-2 px-4 rounded-xl text-center text-white font-weight-bold text-lg "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.17)" }}
          >
            <p>Location d'engin agricoles</p>
          </div>
        </div>
        <div className="relative  h-80 w-80">
          <img
            src={Farmer2}
            alt="description"
            className="rounded-xl object-cover  h-80 w-80"
          />
          <div
            className="uppercase w-full absolute bottom-0 py-2 px-4 rounded-xl text-center text-white font-weight-bold text-lg "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.17)" }}
          >
            <p>Publication d'engins</p>
          </div>
        </div>
        <div className="relative  h-80 w-80">
          <img
            src={engin1}
            alt="description"
            className="rounded-xl object-cover  h-80 w-80"
          />
          <div
            className="uppercase w-full absolute bottom-0 py-2 px-4 rounded-xl text-center text-white font-weight-bold text-lg "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.17)" }}
          >
            <p>Location d'engin agricoles</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Services;
