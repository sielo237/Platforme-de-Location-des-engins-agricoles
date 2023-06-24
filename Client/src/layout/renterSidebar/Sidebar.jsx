import React from "react";
import { AiOutlineFolderOpen, AiOutlinePieChart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaTractor } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import logoShrink from "../../assets/img/logoShrink.png";

const sidebarItems = [
  { title: "Liste engins", link: "liste-engins", icon: <FaTractor /> },
  {
    title: "Liste demandes",
    link: "liste-demandes",
    icon: <AiOutlineFolderOpen />,
  },
  { title: "Profil", link: "profile", icon: <BsPerson /> },
];

const Sidebar = ({ shrink }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    navigate("/")
  }

  return (
    <div
      className={`${
        !shrink ? "w-[230px]" : "w-[58px]"
      } h-screen overflow-y-auto shrink-0 sticky top-0 p-3 `}
    >
      <div
        className="flex justify-center items-center my-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={shrink ? logoShrink : logo}
          alt="dossier medical"
          className="object-cover"
          width={130}
          height={130}
        />
      </div>
      <div className="mt-[6vh]">
        {sidebarItems.map((item, id) => {
          return (
            <Link to={item.link} key={id} className="relative">
              <p
                key={id}
                className={`${
                  location.pathname === "/dashboard/" + item.link
                    ? " text-secondary "
                    : " text-slate-600 bg-white hover:text-secondary hover:bg-secondary/10 "
                } flex items-center my-1 p-3 rounded-md  `}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`${
                    shrink ? "hidden" : "text-[15px] font-medium ml-4"
                  }`}
                >
                  {item.title}
                </span>
              </p>
              <div
                className={`${
                  location.pathname === "/dashboard/" + item.link &&
                  "absolute top-0 left-[-10px] h-full w-1 bg-secondary"
                }`}
              ></div>
            </Link>
          );
        })}
        <p className=" hover:cursor-pointer text-slate-600 bg-white hover:text-secondary hover:bg-secondary/10 flex items-center my-1 p-3 rounded-md  " onClick={handleLogout}>
          <span className="text-lg">
            <BiLogOut />
          </span>
          <span className={`${shrink ? "hidden" : "text-sm font-medium ml-4"}`}>
            Se déconnecter
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
