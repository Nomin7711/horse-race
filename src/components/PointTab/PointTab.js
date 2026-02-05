import trophy from "assets/icons/trophyWhite.svg";
import React from "react";
import { formatNumber } from "utils";

import Icon from "../Icon";
import MyPointCountdown from "../MyPointCountdown";

const PointTab = ({ score }) => {
  return (
    <div className="flex flex-col flex-1 text-center">
      <div className="px-8">
        <div>
          <p className="text-xs text-black0">Миний оноо</p>
          <div className="flex justify-center mt-1">
            <Icon icon="ic24-star" color={"yellow"} size={24} />
            <p className="text-yellow text-[40px] font-bold">
              {formatNumber(score?.user_score)}
            </p>
          </div>
        </div>
        {/*<div>*/}
        {/*  <div className="flex p-2 justify-center">*/}
        {/*    <img src={trophy} alt={"dataImg"} />*/}
        {/*    <p className="text-black0 text-base pl-2 ">*/}
        {/*      Миний байр: {score?.user_rank}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="flex-col pb-5 justify-center flex-1 p-2">
          {/*<p className="text-black0 text-xs pl-2 pb-8">*/}
          {/*  Хожлын дүн = оноо гэсэн текст*/}
          {/*</p>*/}
          <MyPointCountdown score={score} />
        </div>
      </div>
    </div>
  );
};

export default PointTab;
