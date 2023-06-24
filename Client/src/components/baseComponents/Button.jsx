import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Button = ({ title, icon, handleClick, filled, className, loading }) => {
  return (
    <button
      className={`${
        !filled
          ? " border-primary bg-transparent text-primary hover:bg-primary hover:text-white "
          : " bg-primary text-white border-primary  hover:bg-transparent hover:text-primary"
      } hover:cursor-pointer border px-4 flex items-center  py-2  ${className}
      `}
      onClick={handleClick}
      disabled={loading&& true }
    >
      {loading ? (
                <CircularProgress size="18px" color="inherit" />
              ) : (
                <p className="flex items-center text-center text-sm"> <span>{icon && icon}</span> <span>{title}</span></p>
              )}
     
    </button>
  );
};

export default Button;
