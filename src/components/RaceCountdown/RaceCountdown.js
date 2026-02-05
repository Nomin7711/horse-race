import React from "react";

import { useCountdown } from "../../utils";

const RaceCountdown = ({ diffDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(diffDate);
  return (
    <div className="w-[40%] flex bg-[#FF3B630D] items-center justify-center flex px-1 rounded-tr-xl">
      <div>
        <p className="ml-2 text-xs text-textBlue font-bold font-xs text-center">
          {days > 0 ? days : "00"}
        </p>
        <p className="ml-2 text-[6px] text-textBlue">Өдөр</p>
      </div>
      <p className="ml-2 text-xs text-textBlue font-bold font-sm text-center">
        :
      </p>
      <div>
        <p className="ml-2 text-xs text-textBlue font-bold font-xs text-center">
          {hours > 0 ? hours : "00"}
        </p>
        <p className="ml-2 text-[6px] text-textBlue">Цаг</p>
      </div>
      <p className="ml-2 text-xs text-textBlue font-bold font-sm text-center">
        :
      </p>
      <div>
        <p className="ml-2 text-xs text-textBlue font-bold font-xs text-center">
          {minutes > 0 ? minutes : "00"}
        </p>
        <p className="ml-2 text-[6px] text-textBlue">Минут</p>
      </div>
      <p className="ml-2 text-xs text-textBlue font-bold font-sm text-center">
        :
      </p>
      <div>
        <p className="ml-2 text-xs text-textBlue font-bold font-xs text-center">
          {seconds > 0 ? seconds : "00"}
        </p>
        <p className="ml-2 text-[6px] text-textBlue">Секунд</p>
      </div>
    </div>
  );
};

export default RaceCountdown;
