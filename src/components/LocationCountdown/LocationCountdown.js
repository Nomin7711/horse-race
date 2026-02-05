import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

import { horseQueryKeys } from "../../api/mainApis";
import { useCountdown } from "../../utils";

const LocationCountdown = ({ diffDate }) => {
  const queryClient = useQueryClient();
  const [days, hours, minutes, seconds] = useCountdown(diffDate);
  useEffect(() => {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      queryClient.invalidateQueries([
        horseQueryKeys.ENTRY_LIST,
        horseQueryKeys.RACE_LIST,
      ]);
    }
  }, [days, hours, minutes, seconds]);
  return (
    <div className="flex bg-[#FF3B630D] items-center justify-center flex px-1">
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
  );
};

export default LocationCountdown;
