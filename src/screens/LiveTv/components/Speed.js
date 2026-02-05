import React from "react";
import indicator from "screens/LiveTv/assets/indicator.svg";
import indicatorBlue from "screens/LiveTv/assets/indicator-blue.svg";
import bg from "screens/LiveTv/assets/speedometer.svg";
import bgBlue from "screens/LiveTv/assets/speedometer-blue.svg";

function calculateAverageSpeed(distanceKm, startDate, finishDate) {
  // Convert dates to milliseconds since epoch
  const startMillis = new Date(startDate).getTime();
  const finishMillis = new Date(finishDate).getTime();

  // Calculate time difference in milliseconds
  const timeDiffMillis = finishMillis - startMillis;

  // Convert time difference to hours
  const timeDiffHours = timeDiffMillis / (1000 * 60 * 60); // milliseconds to hours

  // Calculate average speed in km/h
  return Math.round(distanceKm / timeDiffHours);
}

const Speed = ({ data, blueSpeedometer }) => {
  const { track, is_finished, distance, start_date, finish_date } = data || {};
  const { speed } = track || {};

  const currentSpeed = is_finished
    ? calculateAverageSpeed(distance, start_date, finish_date)
    : Math.max(Math.min(speed, 54), 35);

  const getIndicatorRotation = () => {
    const maxRotation = 180;
    return ((currentSpeed - 30) / 60) * maxRotation;
  };

  return (
    <div className="absolute right-[55px] bottom-[54px] box-border z-20 flex justify-center">
      <img alt="" src={blueSpeedometer ? bgBlue : bg} />
      <div
        className="absolute bottom-[79px]"
        style={{
          transform: `rotate(${getIndicatorRotation()}deg)`,
          transformOrigin: "bottom center",
          transition: "transform 0.2s ease-out",
        }}
      >
        <img
          src={blueSpeedometer ? indicatorBlue : indicator}
          className="h-[101px]"
          alt=""
        />
      </div>
      <p className="absolute top-[179px] right-[80px] text-[17px] text-white font-semibold">
        км/ц
      </p>
      <p className="absolute top-[171px] text-[66px] font-black text-white">
        {currentSpeed}
      </p>
    </div>
  );
};

export default Speed;
