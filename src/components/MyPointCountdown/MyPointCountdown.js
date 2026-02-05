import React from "react";

import { useCountdown } from "../../utils";

const MyPointCountdown = ({ score }) => {
  const [days, hours, minutes, seconds] = useCountdown(score?.diff_date || 0);
  return (
    <div className="flex justify-end">
      <div className="flex bg-hipay items-center flex p-2 rounded-lg">
        <div>
          <p className="ml-2 text-sm text-black0 font-bold font-xs text-center">
            {days}
          </p>
          <p className="ml-2 text-[6px] text-black0">Өдөр</p>
        </div>
        <p className="ml-2 text-sm text-black0 font-bold font-sm text-center">
          :
        </p>
        <div>
          <p className="ml-2 text-sm text-black0 font-bold font-xs text-center">
            {hours}
          </p>
          <p className="ml-2 text-[6px] text-black0">Цаг</p>
        </div>
        <p className="ml-2 text-sm text-black0 font-bold font-sm text-center">
          :
        </p>
        <div>
          <p className="ml-2 text-sm text-black0 font-bold font-xs text-center">
            {minutes}
          </p>
          <p className="ml-2 text-[6px] text-black0">Минут</p>
        </div>
        <p className="ml-2 text-sm text-black0 font-bold font-sm text-center">
          :
        </p>
        <div>
          <p className="ml-2 text-sm text-black0 font-bold font-xs text-center">
            {seconds}
          </p>
          <p className="ml-2 text-[6px] text-black0">Секунд</p>
        </div>
      </div>
    </div>
  );
};

export default MyPointCountdown;
