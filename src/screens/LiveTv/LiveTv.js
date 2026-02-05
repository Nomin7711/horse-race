import { Box, Slide } from "@mui/material";
import { useGetLiveTvTracks } from "api/useGetLiveTvTracks";
import React, { useEffect, useRef, useState } from "react";
import logo from "screens/LiveTv/assets/hipay-logo.svg";
import time from "screens/LiveTv/assets/time.svg";
import Progress from "screens/LiveTv/components/Progress";
import Speed from "screens/LiveTv/components/Speed";
import Title from "screens/LiveTv/components/Title";

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
    <>
      <div className="box-border bg-[#000000BD] flex px-6 py-4 gap-5 absolute left-[40px] bottom-[48px]">
        <img alt="" src={time} className="w-[44px]" />
        <p className="text-white text-[32px] font-bold">
          {hours}:{minutes}:{seconds}
        </p>
      </div>
      <div className="bg-[#D22832] w-[8px]" />
    </>
  );
};

const Logo = ({ isVisible }) => {
  const containerRef = useRef();

  return (
    <div className="absolute bottom-[108px] right-[100px]">
      <Box className="absolute bottom-0 right-[215px]" ref={containerRef}>
        <Slide
          in={isVisible}
          direction="left"
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <img alt="" src={logo} />
        </Slide>
      </Box>
    </div>
  );
};

const LiveTv = ({ timeOnly, blueSpeedometer }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { data } = useGetLiveTvTracks();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const showDuration = 30000;
    const hideDuration = 60000;

    const toggleVisibility = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, showDuration);
    };

    toggleVisibility();

    const intervalId = setInterval(
      toggleVisibility,
      showDuration + hideDuration
    );

    return () => clearInterval(intervalId);
  }, []);

  const { status, diff_date, is_finished } = data || {};
  return (
    <div className="w-[1920px] h-[1080px] bg-[#CCCCCC] relative flex items-end box-border">
      {!!status && (
        <div className="w-full flex flex-row">
          {timeOnly ? (
            <Timer diff_date={diff_date} is_finished={is_finished} />
          ) : (
            <>
              <Logo isVisible={isVisible} />
              <Title data={data} />
              <Progress data={data} isVisible={isVisible} />
              <Speed data={data} blueSpeedometer={blueSpeedometer} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveTv;
