import React, { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Modal } from "@mui/material";

const ImagesModal = ({ open, images, handleClose }) => {
  const [imageId, setImageId] = useState(0);

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none">
          <img
            src={`${
              import.meta.env.VITE_REACT_APP_PROXY_URL + images[imageId]
            }`}
            className="max-h-[90vh] max-w-[70vw] md:max-w-[60vw]"
            alt="zoomed pic"
          />
        </div>
        <div>
          <BsFillArrowLeftCircleFill
            className="hover:cursor-pointer hover:text-secondary/70 scale-[2.0] text-secondary absolute top-[50%] left-[10%] translate-x-[-50%] translate-y-[-10%]"
            onClick={() => setImageId((prev) => prev - 1)}
            style={imageId === 0 && { display: "none" }}
          />
          <BsFillArrowRightCircleFill
            className="hover:cursor-pointer  hover:text-secondary/70 scale-[2.0] text-secondary absolute top-[50%] right-[10%] translate-x-[-50%] translate-y-[10%]"
            onClick={() => setImageId((prev) => prev + 1)}
            style={imageId === images.length - 1 && { display: "none" }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImagesModal;
