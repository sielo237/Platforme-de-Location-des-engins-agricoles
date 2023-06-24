import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="pt-4 pb-6 text-2xl text-center font-bold">
      <p>{title}</p>
      <hr className="border-2 border-secondary mt-1 w-20 mx-auto"/>
    </div>
  );
};

export default SectionTitle;
