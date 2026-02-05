import calendar from "assets/icons/calendar.svg";
import location from "assets/icons/location.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

import { format_date } from "../../utils";
import RaceCountdown from "../RaceCountdown";

const RaceCard = ({ race }) => {
  const navigate = useNavigate();
  const formattedDate = format_date(race?.start_date);

  return (
    <div>
      <div
        style={{
          backgroundImage: "linear-gradient(270deg, #FFFF65 0%, #41DBFF 100%)",
        }}
        className="rounded-t-lg px-3 ml-3 w-fit"
      >
        <span className="text-textBlue text-xs font-bold">{race?.name}</span>
      </div>
      <div className="bg-black0 w-full flex-col justify-between flex-1 rounded-xl shadow-lg">
        <div className="flex">
          <div className="flex-1 p-3">
            <div className="flex">
              <img src={location} alt={"arrow"} />
              <p className="text-black55 ml-2 text-xs">{race?.location}</p>
            </div>
            <div className="flex mt-1">
              <img src={calendar} alt={"arrow"} />
              <p className="text-black55 ml-2 text-xs">{formattedDate}</p>
            </div>
          </div>
          <RaceCountdown diffDate={race?.diff_date} />
        </div>
        <button
          className="bg-hipay py-2 text-center text-black0 text-sm rounded-b-xl w-full border-0"
          onClick={() => {
            navigate("list", {
              state: race,
            });
          }}
        >
          Оролцох
        </button>
      </div>
    </div>
  );
};

export default RaceCard;
