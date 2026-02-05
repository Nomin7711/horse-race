import calendar from "assets/icons/calendar.svg";
import location from "assets/icons/location.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

import { format_date } from "../../utils";

const EndedRaceCard = ({ race }) => {
  const navigate = useNavigate();
  const formattedDate = format_date(race?.start_date);

  return (
    <div>
      <div className="bg-black0 w-full flex-col justify-between flex-1 rounded-xl shadow-2xl">
        <div className="flex-1 p-3">
          <div className="flex">
            <p className="text-black55 ml-2 text-xs font-bold mb-1">
              {race?.name}
            </p>
          </div>
          <div className="flex">
            <img src={location} alt={"arrow"} />
            <p className="text-black55 ml-2 text-xs">{race?.location}</p>
          </div>
          <div className="flex mt-1">
            <img src={calendar} alt={"arrow"} />
            <p className="text-black55 ml-2 text-xs">{formattedDate}</p>
          </div>
        </div>
        <button
          className="bg-[#EAEAF2] py-2 text-center text-dimBlue text-sm rounded-b-xl w-full border-0"
          onClick={() => {
            navigate("list", {
              state: race,
            });
          }}
        >
          Мэдээлэл харах
        </button>
      </div>
    </div>
  );
};

export default EndedRaceCard;
