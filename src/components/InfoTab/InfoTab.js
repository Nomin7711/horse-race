import calendar from "assets/icons/calendarWhite.svg";
import locationWhite from "assets/icons/locationWhite.svg";
import background from "assets/img/locationBackground.png";
import React from "react";

import { format_date, parseImageUrl } from "../../utils";
import LocationCountdown from "../LocationCountdown";

const InfoTab = ({
  img,
  location,
  startDate,
  diffDate,
  isEnded,
  isOngoing,
}) => {
  const showCountdown = !!diffDate && diffDate > 0;
  return (
    <div>
      <img
        src={parseImageUrl(img)}
        alt={"arrow"}
        style={{
          width: "100%",
          background: "transparent",
          paddingBottom: "8px",
        }}
      />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          borderTop: "1px dashed #C7C7C7",
        }}
        className="flex flex-1 p-4"
      >
        <div className="flex flex-1 pb-7 ">
          <div className="w-[60%] p-3">
            <div className="flex">
              <img src={locationWhite} alt={"arrow"} />
              <p className="text-black0 ml-2 text-xs">{location}</p>
            </div>
            <div className="flex mt-1">
              <img src={calendar} alt={"arrow"} />
              <p className="text-black0 ml-2 text-xs">
                {format_date(startDate)}
              </p>
            </div>
          </div>
          {isEnded ? (
            <p className="font-bold text-black0 text-sm mt-6">
              Уралдаан дууссан
            </p>
          ) : isOngoing ? (
            <p className="font-bold text-black0 text-sm mt-6">
              Уралдаан эхэлсэн
            </p>
          ) : (
            showCountdown && <LocationCountdown diffDate={diffDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
