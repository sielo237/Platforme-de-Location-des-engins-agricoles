import React from "react";
import { BsApple } from "react-icons/bs";
import Container from "../../../components/baseComponents/Container";
import SectionTitle from "./SectionTitle";
import phone from "../../../assets/img/phone.png";
import googlePlay from "../../../assets/img/googlePlay.png";

const Mobile = () => {
  return (
    <Container>
      <SectionTitle title="Version mobile" />
      <div className="flex flex-col md:flex-row md:h-[60vh] py-4 md:py-8 overflow-hidden  w-[90%] mx-auto">
        <div className=" md:w-[50%]  shrink-0 flex flex-col items-center md:items-start justify-start px-6 ">
          <p className="mt-2 font-medium text-md md:text-lg text-center md:text-start">
            Vous pouvez désormais louer des engins étant sur votre smartphone
            grace à l’application AgroRental.
          </p>
          <div className="mt-2 md:flex md:[&>*]:mr-6 [&>*]:w-[170px]">
            <div className="mt-2 bg-[#191919] hover:cursor-pointer hover:bg-[#212020] py-2 px-4 flex items-center text-white rounded-md">
              <BsApple className="mr-2 text-3xl" />
              <div>
                <p className="text-sm font-thin">Disponible sur</p>
                <p className="font-bold">App Store</p>
              </div>
            </div>
            <div className=" mt-2 bg-[#191919] hover:cursor-pointer hover:bg-[#212020] py-2 px-4 flex items-center text-white rounded-md">
              <img
                src={googlePlay}
                alt="google play button"
                className="w-[30px] h-[30px] mr-2"
              />
              <div>
                <p className="text-sm font-thin">Disponible sur</p>
                <p className="font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" md:w-[50%]  shrink-0 flex justify-end items-center md:translate-x-[8vw]">
          <img src={phone} alt="logo " className="shrink-0 scale-[0.8]" />
        </div>
      </div>
    </Container>
  );
};

export default Mobile;
