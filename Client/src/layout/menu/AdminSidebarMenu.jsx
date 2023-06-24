import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import noProfile from "../../assets/img/noProfile.png";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import LoginModal from "../../modules/adminDashboard/components/LoginModal";

const AdminSidebarMenu = () => {
  const [shrink, setShrink] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let client = JSON.parse(localStorage.getItem("userInfo"));
  let admin = JSON.parse(localStorage.getItem("isAdmin"));

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/liste-engins");
      navigate(0)
    } else {
      if (client && !admin) {
        navigate("/");
      } else if (!client) {
        setOpenLogin(true);
      }
    }
  }, []);

  const handleClose = () => {
    setOpenLogin(false);
    navigate("/");
  };

  return (
    <section className="flex min-h-screen  ">
      {/**sidebar */}
      <div className="relative">
        <AdminSidebar shrink={shrink} />
      </div>

      <div className="bg-primary/5 w-full relative xl:px-6 px-3">
        {/**top navbar */}
        <div
          className=" flex justify-between items-center mx-auto py-2 rounded-lg px-3 md:px-5 sticky top-3 w-full"
          style={{ backgroundColor: "rgba(2, 194, 74, 0.13)" }}
        >
          <div className="absolute left-[-10px] top-5 hover:cursor-pointer z-50 rounded-full bg-white">
            <BsFillArrowRightCircleFill
              className={shrink ? `text-primary text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
            <BsFillArrowLeftCircleFill
              className={!shrink ? `text-primary text-xl  ` : "hidden"}
              onClick={() => setShrink(!shrink)}
            />
          </div>
          <p className="text-sm font-medium">
            ADMIN DASHBOARD {">"} liste-engins
          </p>
          <div className="flex items-center pl-4">
            <p
              className={`${
                !shrink ? "hidden md:block" : "block"
              } text-sm  text-slate-600 font-medium mr-3 `}
            >
              <span className="uppercase ">{client && client.nom}</span>{" "}
              {client && client.prenom}
            </p>
            <img
              src={noProfile}
              className="shrink-0 rounded-full h-[32px] w-[32px] md:h-[36px] md:w-[36px] border object-cover border-primary"
            />
          </div>
        </div>
        {client && (
          <div className=" w-full pt-4">
            <Outlet />
          </div>
        )}
      </div>
      <LoginModal open={openLogin} handleClose={handleClose} />
    </section>
  );
};

export default AdminSidebarMenu;
