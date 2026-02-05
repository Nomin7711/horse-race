import trophy from "assets/icons/tropyGrey.svg";
import React from "react";

import ListItem from "../ListItem";

const ListSection = ({ data, isOngoing }) => {
  return (
    <div className="divide-y divide-dashed divide-x-0 border-black55">
      <div className="pb-6">
        <div className="flex p-6">
          <img src={trophy} alt={"dataImg"} />
          <p className="text-dimBlue text-base pl-2">Winner (Түрүүлэх)</p>
        </div>
        <div className="px-6">
          {data?.length > 0 &&
            data?.map((i, idx) => (
              <ListItem key={idx} entry={i} type="win" isOngoing={isOngoing} />
            ))}
        </div>
      </div>
      <div>
        <div className="flex p-6">
          <p className="text-dimBlue text-base pl-2">Place (Эхний 3т орох)</p>
        </div>
        <div className="px-6">
          {data?.length > 0 &&
            data?.map((i, idx) => (
              <ListItem
                key={idx}
                entry={i}
                type="place"
                isOngoing={isOngoing}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListSection;
