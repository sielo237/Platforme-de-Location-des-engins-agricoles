import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Container from "../../components/baseComponents/Container";
import Logo from "../../assets/img/logo.png";
import Button from "../../components/baseComponents/Button";

const LandingPageNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [isLogin, setIsLogin] = useState(false);
  const [displayCat, setDisplayCat] = useState(false);
  const userInfo = localStorage.getItem("userInfo");

  const navLinks = [
    {
      name: "Accueil",
      path: "/",
    },
    
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Recommendation",
      path: "/recommendation",
    },
    {
      name: "Contacts",
      path: "/contact",
    },
  ];

  const handleNavigate = (path, name) => {
    if (name === "Categories") {
      setDisplayCat((prev) => !prev);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
    }
  }, []);

  return (
    <section
      className="bg-white sticky top-0 shadow shadow-lg"
      style={{ zIndex: 1000 }}
    >
      <Container className="flex justify-between items-center py-3.5">
        <img src={Logo} alt="logo" className="object-fit w-40 h-30 " />
        <div className="hidden md:flex items-center w-full  relative">
          <ul className="flex [&>*]:mx-4 text-[16px] basis-4/5 justify-end ">
            {navLinks.map((link, id) => {
              return (
                <li
                  key={id}
                  className={`${
                    link.path === location.pathname
                      ? "text-secondary"
                      : "text-slate-900 "
                  } hover:text-primary  hover:cursor-pointer `}
                  onClick={() => handleNavigate(link.path, link.name)}
                >
                  {link.name}
                </li>
              );
            })}

            {displayCat && (
              <div className="absolute top-10 shadow shadow-md right-[250px] bg-white py-2 border border-[#D9D9D9]">
                {categories.map((cat, id) => {
                  return (
                    <p
                      key={id}
                      className="p-2 hover:bg-[#D9D9D9] hover:cursor-pointer"
                      onClick={() => {
                        setDisplayCat(false);
                        navigate(`/categorie/${cat._id}`);
                        navigate(0);
                      }}
                    >
                      {cat.nom}
                    </p>
                  );
                })}
              </div>
            )}
          </ul>
          <div className="basis-1/5 flex justify-end ">
            <Button
              title={isLogin ? "Mon Dashboard" : "Devenir loueur"}
              handleClick={() => {
                isLogin
                  ? navigate("/dashboard/liste-engins")
                  : navigate("/connexion");
              }}
              filled="true"
              className="rounded-md "
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LandingPageNavbar;
