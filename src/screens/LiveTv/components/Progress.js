import { Box, Slide } from "@mui/material";
import React, { useRef } from "react";
import bg from "screens/LiveTv/assets/distance-shape.svg";
import stripes from "screens/LiveTv/assets/finish-line.svg";
import horse from "screens/LiveTv/assets/horse.svg";

function toFixed(num, fixed) {
  let re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num?.toString().match(re)?.[0] || 0;
}

const Progress = ({ data, isVisible }) => {
  const containerRef = useRef();
  const { track, is_finished, distance: totalDistance } = data || {};
  const { percent, distance } = track || {};
  const currentPercent = Math.min(
    100,
    Math.max(is_finished ? 100 : percent, 0)
  );
  return (
    <div className="absolute w-full h-[58px] right-[100px] bottom-[54px] overflow-hidden">
      <Box
        className="absolute w-[819px] h-[58px] right-[483px] bottom-0"
        ref={containerRef}
      >
        <Slide
          in={isVisible}
          direction="left"
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <div className="relative w-full h-full box-border flex items-center pl-[30px] pr-5 gap-3">
            <img alt="" src={bg} className="absolute left-0" />

            <div className="flex flex-1 z-10 box-border relative -bottom-[9px]">
              <img alt="" src={stripes} className="h-[4px]" />

              <div className="flex flex-1 box-border relative">
                <div
                  className="bg-white absolute w-full h-[4px] box-border"
                  style={{
                    transform: "skew(-20deg)",
                  }}
                />

                <div
                  className="absolute z-20 h-[6px] left-0 flex items-center justify-center box-border"
                  style={{
                    width: `${currentPercent}%`,
                    background:
                      "linear-gradient(to right, #FAAF41 0%, #009646 100%)",
                    transform: "skew(-20deg)",
                  }}
                >
                  <div
                    className="box-border border-[1px] border-solid border-white bg-[#009646] h-[24px] aspect-square rounded-full absolute right-0 flex justify-center items-center"
                    style={{ transform: "skew(20deg)" }}
                  >
                    <img alt="" src={horse} className="h-[11px]" />
                    <p className="text-[19px] text-white font-bold absolute -top-[24px]">
                      {toFixed(is_finished ? totalDistance : distance, 1)}
                    </p>
                  </div>
                </div>
              </div>

              <img alt="" src={stripes} className="h-[4px]" />
            </div>

            <p className="text-white text-[20px] font-bold z-10 relative -bottom-[9px]">
              {toFixed(totalDistance, 1)}км
            </p>
          </div>
        </Slide>
      </Box>
    </div>
  );
};

export default Progress;
