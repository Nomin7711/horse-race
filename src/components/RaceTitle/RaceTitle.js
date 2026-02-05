import React from "react";

const RaceTitle = ({ raceName }) => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(270deg, #FFFF65 0%, #41DBFF 100%)",
      }}
      className="rounded-lg px-3 w-fit self-center mt-4"
    >
      <span className="text-textBlue text-xs font-bold">{raceName}</span>
    </div>
  );
};

export default RaceTitle;
