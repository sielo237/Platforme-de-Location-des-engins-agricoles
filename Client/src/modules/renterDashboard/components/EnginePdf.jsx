import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";

const EnginePdf = ({ pdfFile, handleChange }) => {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className="flex items-center justify-center w-full mt-4">
      {!pdfFile ? (
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
                Cliquer pour uploader votre pdf (1 maximum)
              </span>{" "}
              ou faites drag and drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="logo"
            className="hidden"
            onChange={(e) => handleChange(e)}
            accept="application/pdf"
          />
        </label>
      ) : (
        <div>
          <p
            className="text-center mb-2 flex items-center justify-center text-red-400 hover:cursor-pointer"
            onClick={() => handleChange({ target: { files: [""] } })}
          >
            {" "}
            <AiFillEdit className="mr-1 " />
            Modifier
          </p>
          <object data={URL.createObjectURL(pdfFile)} type="application/pdf" width={400} height={250}>
            <p>
              Votre navigateur n'a pas de plugin pour la lecture des fichiers
              PDF. <br />
              Vous pouvez néanmoins{" "}
              <a href={URL.createObjectURL(pdfFile)} download>
                telecharger
              </a>{" "}
              le fichier.
            </p>
          </object>
        </div>
      )}
    </div>
  );
};

export default EnginePdf;
