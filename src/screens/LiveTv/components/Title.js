import React, { useEffect, useRef, useState } from "react";
import pattern from "screens/LiveTv/assets/pattern.svg";
import bg from "screens/LiveTv/assets/time-shape.svg";

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

const Timer = ({ diff_date, is_finished }) => {
  const [hours, minutes, seconds] = useTimer(
    Math.floor(diff_date),
    is_finished
  );
  return (
    <p className="text-white text-[35px] font-bold absolute top-[6px] left-[44px]">
      {minutes}:{seconds}
    </p>
  );
};

const Title = ({ data }) => {
  const { title, is_finished, diff_date } = data || {};
  return (
    <div className="absolute right-[82px] bottom-[51px] box-border z-10">
      <img alt="" src={bg} />
      {/*<p className="absolute text-sm font-bold text-white top-[6px] left-[40px]">*/}
      {/*  {title}*/}
      {/*</p>*/}
      <Timer diff_date={diff_date} is_finished={is_finished} />
    </div>
  );
};

export default Title;
