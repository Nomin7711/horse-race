import calendar from "assets/icons/calendarWhite.svg";
import trophy from "assets/icons/trophyWhite.svg";
import background from "assets/img/prize.png";
import React from "react";

import { parseImageUrl } from "../../utils";

const PrizeTab = ({ img, score }) => {
  return (
    <div className="flex-col flex-1 pb-12">
      <img
        // src={background}
        src={parseImageUrl(img)}
        style={{
          objectFit: "cover",
          objectPosition: "center bottom",
          boxShadow: "rgb(0 0 0 / 10%) 0px 6px 12px",
          width: "100%",
        }}
        alt=""
      />
      <div className="flex justify-end mx-4 ">
        <div className="flex flex-1 bg-hipay items-center p-2 rounded-lg space-x-1 justify-between">
          <div className="flex">
            <img
              src={calendar}
              alt={"calendar"}
              style={{ height: "12px", width: "12px" }}
            />
            <p className="text-xs text-black0 font-bold">2024.05.21 | 18:00</p>
          </div>
          <div className="flex p-2 justify-center">
            <img src={trophy} alt={"dataImg"} />
            <p className="text-black0 text-sm pl-2 ">
              Миний байр: {score?.user_rank}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeTab;
