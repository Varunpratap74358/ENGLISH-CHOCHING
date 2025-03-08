import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENT_API_POINT } from "../API/api";

const Event = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const getSingleEvent = async () => {
    // alert(id)
    try {
      const { data } = await axios.get(`${EVENT_API_POINT}/event/${id}`, {
        withCredentials: true,
      });
      console.log(data);
      setEvent(data.event);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went wrong");
    }
  };

  useEffect(() => {
    getSingleEvent();
  }, [id]);
  return (
    <div className="max-w-5xl mx-auto p-4 py-20 h-screen flex md:justify-between md:flex-row flex-col">
      <div className=" md:w-[50%] py-2 px-4">
        <h3 className="text-3xl font-bold">Event</h3>
        <p className="px-2">{event?.discription}</p>
        <p className="text-gray-600 text-sm font-semibold py-4">Uploaded Event Date : <span className="font-bold">{event?.createdAt?.substr(0,10)}</span></p>
      </div>
      <div className=" py-2 flex justify-end">
        <img src={event?.eventImage?.url} className="w-[100%] rounded " alt="" />
      </div>
    </div>
  );
};

export default Event;
