import React from "react";
import {AiFillEdit} from "react-icons/ai"

const EngineImages = ({ images, handleChange }) => {
 
  return (
    <div className="flex items-center justify-center w-full mt-4">
      {images.length === 0 ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-semibold">
                Cliquer pour uploader vos images (6 maximum)
              </span>{" "}
              ou faites drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="logo"
            className="hidden"
            onChange={(e) => handleChange(e)}
            multiple="multiple"
            accept="image/png , image/jpg , image/jpeg, image/webp"
          />
        </label>
      ) : (
       <div>
        <p className="text-center mb-2 flex items-center justify-center text-red-400 hover:cursor-pointer" onClick={() => handleChange({target:{files:[]}})}> <AiFillEdit className="mr-1 "/>Modifier</p>
         <div className="relative grid grid-cols-3 gap-4">
          {/* <BsX className="absolute top-1 right-0 origin-right scale-[1.8] hover:text-white hover:cursor-pointer" onClick={() => handleChange({target:{name:"logo", value:""}})}/>
                  <img src={data.logo} alt="university logo" className="mx-auto w-[170px] h-[170px] object-cover rounded-md"/> */}
          {
            images.map((image,id) => {
                return(
                    <img src={URL.createObjectURL(image)} key={id}  className="object-cover w-full rounded-md border border-secondary max-h-[120px]"/>
                )
            })
          }
        </div>
       </div>
      )}
    </div>
  );
};

export default EngineImages;
