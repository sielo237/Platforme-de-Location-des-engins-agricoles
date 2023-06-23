import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "../../../components/baseComponents/Container";
import RequestForm from "../components/RequestForm";
import RequestEngineInfo from "../components/RequestEngineInfo";

const LocationRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { engines } = useSelector((state) => state.engines);
  const [engineDetail, setEngineDetail] = useState("");
  useEffect(() => {
    const tractorId = location.pathname.slice(10);
    if (engines.length > 0) {
      const res = engines.find((eng) => eng._id === tractorId);
      if (res) {
        setEngineDetail(res);
      } 
    }
  }, [engines]);

  return (
    <section className="bg-[#F8F8F8]">
      {!engineDetail ? (
        <div className="h-[80vh] flex justify-center items-center">
          <CircularProgress size="50px" color="inherit" />
        </div>
      ) : (
        <Container className="py-4 min-h-[86vh] md:grid md:grid-cols-3 gap-8">
          <div className="bg-white col-span-2 rounded-md shadow shadow-sm">
            <RequestForm engineDetail={engineDetail}/>
          </div>

          <RequestEngineInfo engineDetail={engineDetail} />
        </Container>
      )}
    </section>
  );
};

export default LocationRequestPage;
