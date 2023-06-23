import React from 'react';



const RequestEngineInfo = ({engineDetail}) => {
  return (
    <div className="md:col-span-2 lg:col-span-1 shadow shadow-md h-fit bg-white rounded-md p-2">
   
    <div className="p-2">
      <div className="flex flex-col items-center text-center">
        <img
          className=" min-h-[100px] w-full rounded-md object-cover"
          src={engineDetail.photos[0].replaceAll(
            "http://agrorender-serveur.onrender.com/public",
            "https://agrorender-serveur.onrender.com"
          )}
          alt="professional pic"
        />
        <p className="font-bold text-[#002428] text-lg  uppercase px-2 leading-5 md:pt-2 ">
         {engineDetail.nom}
        </p>
        <p className="font-light text-[#7D7979] capitalize">
          {engineDetail.categorie}
        </p>
      </div>
      <div className="[&>*]:flex [&>*]:justify-between [&>*]:items-center [&>*]:my-2 mt-2">
        <div>
          <p className="font-medium  ">Prix</p>
          <p className=" text-end pl-1">{engineDetail.prix}</p>
        </div>
        <div>
          <p className="font-medium ">Propriétaire</p>
          <p className=" text-end pl-1">{engineDetail.loueur.nom}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default RequestEngineInfo