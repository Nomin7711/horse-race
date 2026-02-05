import React, { useEffect, useRef, useState } from "react";
import distanceSvg from "screens/LiveTv/assets/distance.svg";
import flag from "screens/LiveTv/assets/flag.svg";
import horse from "screens/LiveTv/assets/horse.svg";
import velocity from "screens/LiveTv/assets/speed.svg";
import time from "screens/LiveTv/assets/time.svg";

function toFixed(num, fixed) {
  let re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)?.[0] || 0;
}

function useTimer(startSecond, is_finished) {
  const [seconds, setSeconds] = useState(startSecond);
  const initialTimeRef = useRef(startSecond);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!is_finished) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [is_finished]);

  useEffect(() => {
    if (startSecond !== initialTimeRef.current) {
      initialTimeRef.current = startSecond;
      setSeconds(startSecond);
    }
  }, [startSecond]);

  const pad = (num) => String(num).padStart(2, "0");

  const hours = pad(Math.floor(seconds / 3600));
  const minutes = pad(Math.floor((seconds % 3600) / 60));
  const sec = pad(seconds % 60);

  return [hours, minutes, sec];
}

const Progress = ({ percent }) => {
  const currentPercent = Math.min(100, Math.max(percent, 0));
  return (
    <div className="flex flex-1 items-center box-border relative">
      <div
        className="w-full h-[2px] absolute z-[5]"
        style={{
          background:
            "linear-gradient(to right, #707070 50%, rgba(255, 255, 255, 0) 50%)",
          backgroundSize: "15px 2px",
        }}
      />

      <div className="w-[10px] aspect-square rounded-full z-30 bg-white absolute left-0" />
      <div className="w-[10px] aspect-square rounded-full z-10 bg-white absolute right-0 flex justify-center">
        {currentPercent <= 96 && (
          <img alt="" src={flag} className="absolute -top-[30px]" />
        )}
      </div>

      <div
        className="absolute z-20 h-[6px] left-0 flex items-center justify-center"
        style={{
          width: `${currentPercent}%`,
          background: "linear-gradient(to right, #FAAF41 0%, #009646 100%)",
        }}
      >
        <div className="box-border bg-[#009646] w-[15px] aspect-square rounded-full border-solid border-[2px] border-white absolute right-0 flex justify-center">
          <img alt="" src={horse} className="absolute -top-[30px]" />
        </div>
      </div>
    </div>
  );
};

const Timer = ({ diff_date, is_finished }) => {
  const [hours, minutes, seconds] = useTimer(
    Math.floor(diff_date),
    is_finished
  );
  return (
    <p className="text-white text-[32px] font-bold">
      {hours}:{minutes}:{seconds}
    </p>
  );
};

const Stats = ({ data }) => {
  const [latestTrack, setLatestTrack] = React.useState();
  const { track } = data || {};

  useEffect(() => {
    if (track) {
      setLatestTrack(track);
    }
  }, [data]);

  const { diff_date, distance: totalDistance, is_finished } = data || {};
  const { speed, percent, distance } = latestTrack || {};

  return (
    latestTrack && (
      <>
        <div className="box-border bg-[#000000BD] flex flex-1 px-6 py-3 gap-6">
          <div className="flex flex-row gap-5 items-center">
            <img alt="" src={velocity} className="w-[50px]" />
            <div>
              <p className="mb-1 text-xxs text-white">Морины дундаж хурд:</p>
              <p className="text-[32px] text-white font-bold">{speed} км/ц</p>
            </div>
          </div>

          <div className="w-[1px] h-full bg-white" />

          <div className="flex flex-row gap-5 items-center">
            <img alt="" src={time} className="w-[44px]" />
            <div>
              <p className="mb-1 text-xxs text-white">Туулсан хугацаа:</p>
              <Timer diff_date={diff_date} is_finished={is_finished} />
            </div>
          </div>

          <div className="w-[1px] h-full bg-white" />

          <div className="flex flex-row gap-5 items-center">
            <img alt="" src={distanceSvg} className="w-[45px]" />
            <div>
              <p className="mb-1 text-xxs text-white">Туулсан зам:</p>
              <p className="text-[32px] text-white font-bold">
                {toFixed(is_finished ? totalDistance : distance, 1)}/
                {toFixed(totalDistance, 1)}км
              </p>
            </div>
          </div>

          <Progress percent={is_finished ? 100 : percent} />
        </div>
        <div className="bg-[#D22832] w-[8px]" />
      </>
    )
  );
};

export default Stats;
