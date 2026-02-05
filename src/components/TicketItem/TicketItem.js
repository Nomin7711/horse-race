import calendar from "assets/icons/calendar.svg";
import load from "assets/icons/load.svg";
import location from "assets/icons/location.svg";
import lose from "assets/icons/lose.svg";
import trophy from "assets/icons/tropyGrey.svg";
import won from "assets/icons/won.svg";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { colors } from "../../constants/colors";
import { format_date, formatNumber } from "../../utils";
const status = {
  waiting: {
    background: colors.dimGrey,
    icon: load,
    text: " Уралдаан хүлээж байгаа",
    textColor: colors.textBlue,
  },
  won: {
    background: colors.wonStatus,
    icon: won,
    text: "Хожсон",
    textColor: colors.black0,
  },
  lose: {
    background: colors.loseStatus,
    icon: lose,
    text: "Хожоогүй",
    textColor: colors.black0,
  },
};

const TicketItem = ({ ticket }) => {
  const navigate = useNavigate();
  const { bet_amount, entry, odd, race, tax_amount, type, winning_amount } =
    ticket || {};
  const { horse } = entry || {};
  const buttonStatus = useMemo(() => {
    if (!ticket?.has_ended) return status?.waiting;
    else {
      if (ticket?.has_won) return status?.won;
      else return status?.lose;
    }
  }, [ticket]);
  return (
    <div className="flex-col mt-6">
      <div
        style={{
          backgroundImage: "linear-gradient(270deg, #FFFF65 0%, #41DBFF 100%)",
        }}
        className="rounded-t-lg px-3 py-1 mx-3 w-fit"
      >
        <span className="text-textBlue text-xs font-bold">{race?.name}</span>
      </div>
      <div className="flex-col flex-1 rounded-xl shadow-lg divide-y divide-solid divide-x-0 divide-[#292b7c1a]">
        <div>
          <div className="flex p-3">
            <img src={trophy} alt={"dataImg"} />
            <p className="pl-1 text-black55 font-bold text-xs">
              {type === "win" ? "Winner (Түрүүлэх)" : "Place (Эхний 3т орох)"}
            </p>
          </div>
          <div className="flex flex-1 justify-between px-3">
            <div>
              <div className="flex flex-row gap-2">
                <img src={location} alt={"arrow"} />
                <p className="text-black55 text-xs">{race?.location}</p>
              </div>
              <div className="flex mt-2 gap-2">
                <img src={calendar} alt={"arrow"} />
                <p className="text-black55 text-xs">
                  {format_date(race?.start_date)}
                </p>
              </div>
            </div>
            <div className="p-4 rounded bg-[#5e5e5e1a] mb-2">
              <p className="text-textBlue font-bold text-base">{odd}</p>
            </div>
          </div>
          <p className="text-textBlue font-bold text-sm flex flex-1 justify-center pb-3">
            {entry?.horse_number}. {horse?.name} ({horse?.trainer?.name})
          </p>
        </div>
        <div className="p-3">
          <div className="flex">
            <img src={trophy} alt={"arrow"} />
            <p className="text-black55 text-xs ml-1 font-bold">
              Бооцоо: {formatNumber(bet_amount || 0)}₮
            </p>
          </div>
          <div className="flex">
            <img src={trophy} alt={"arrow"} />
            <p className="text-black55 text-xs ml-1 font-bold mt-2">
              Хожил: {formatNumber(winning_amount || 0)}₮ (Татвар:{" "}
              {formatNumber(tax_amount)}₮)
            </p>
          </div>
        </div>
        <button
          className="py-2 text-sm rounded-b-xl w-full border-0 "
          style={{
            backgroundColor: buttonStatus?.background,
            color: buttonStatus?.textColor,
          }}
          disabled={true}
        >
          <div className="flex gap-2 text-center justify-center items-center">
            <img src={buttonStatus?.icon} alt={"arrow"} />
            {buttonStatus?.text}
          </div>
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
