import calendar from "assets/icons/calendar.svg";
import load from "assets/icons/load.svg";
import location from "assets/icons/location.svg";
import trophy from "assets/icons/tropyGrey.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

import { format_date, formatNumber } from "../../utils";

const PointListItem = ({ score }) => {
  const { bet_amount, entry, race, tax_amount, type, winning_amount } =
    score || {};
  const { horse } = entry || {};
  const navigate = useNavigate();
  return (
    <div className="flex-col">
      <div
        style={{
          backgroundImage: "linear-gradient(270deg, #FFFF65 0%, #41DBFF 100%)",
        }}
        className="rounded-t-lg px-3 py-1 mx-3 w-fit"
      >
        <span className="text-textBlue text-xs font-bold">{race?.name}</span>
      </div>
      <div className="bg-black0 w-full flex-col justify-between flex-1 rounded-xl shadow-2xl divide-y divide-solid divide-x-0 divide-[#292b7c1a]">
        <div>
          <p className="text-dimBlue text-sm flex flex-1 justify-center py-3">
            <span className="text-textBlue text-sm mr-1 font-bold">
              {entry?.horse_number}. {horse?.name}
            </span>
            ({horse?.trainer?.name})
          </p>
        </div>
        <div className="p-3">
          <div className="flex">
            <img src={trophy} alt={"arrow"} />
            <p className="text-black55 text-xs ml-1 font-bold">
              Бооцоо: {formatNumber(bet_amount)}₮
            </p>
          </div>
          <div className="flex">
            <img src={trophy} alt={"arrow"} />
            <p className="text-black55 text-xs ml-1 font-bold mt-2">
              Хожил: {formatNumber(winning_amount)}₮ (Татвар:{" "}
              {formatNumber(tax_amount)}₮)
            </p>
          </div>
        </div>
        <button
          className="bg-wonStatus py-2  text-textBlue text-sm rounded-b-xl w-full border-0"
          onClick={() => {
            navigate("/myTicket");
          }}
        >
          <div className="flex gap-2 text-center justify-between">
            <p className="text-xs text-black0 font-middle">
              {format_date(race?.start_date)}
            </p>
            <p className="text-xs text-black0 font-middle">
              {formatNumber(winning_amount)} +
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PointListItem;
