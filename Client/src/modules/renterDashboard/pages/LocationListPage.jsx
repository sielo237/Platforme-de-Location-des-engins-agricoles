import React, { useEffect, useState } from "react";
import { listLocation , acceptedLocation, rejectedLocation} from "../services/renterService";
import DisplayLocations from "../components/DisplayLocations";
import noRequest from "../../../assets/img/noRequest.svg";

const LocationListPage = () => {
  const [requestList, setRequestList] = useState([]);
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [rejectedRequest, setRejectedRequest] = useState([]);
  useEffect(() => {
    const getListLocation = async () => {
      const res = await listLocation();
      if (res.status === 200) {
        setRequestList(res.data);
      }
    };

    const getListAcceptedLocation = async () => {
      const res = await acceptedLocation();
      if (res.status === 200) {
        console.log("accepted data ",res.data)
        setAcceptedRequest(res.data);
      }
    };


    const getListRejectedLocation = async () => {
      const res = await rejectedLocation();
      if (res.status === 200) {
        console.log("rejected data ",res.data)
        setRejectedRequest(res.data);
      }
    };


    getListLocation();
    getListAcceptedLocation();
    getListRejectedLocation();
  }, []);
  return (
    <section className="m-4">
      <p className="text-primary font-bold text-2xl uppercase text-center">
        Liste des demandes de location{" "}
      </p>
      {requestList.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img src={noRequest} alt="no engine " width={400} height={400} />
          <p className="md:translate-y-[-5vh] text-lg font-medium  text-center">
            Aucune demande pour le moment
          </p>
        </div>
      ) : (
        <DisplayLocations requestList={requestList} acceptedRequestList = {acceptedRequest} rejectedRequestList = {rejectedRequest} />
      )}
    </section>
  );
};

export default LocationListPage;
