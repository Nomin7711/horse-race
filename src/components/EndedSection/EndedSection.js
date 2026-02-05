import trophy from "assets/icons/tropyGrey.svg";
import React from "react";

const EndedSection = ({ data }) => {
  const sortedData = data?.sort((a, b) => a?.position - b?.position);
  return (
    <div className="divide-y divide-dashed divide-x-0 border-black55">
      <div className="pb-6">
        <div className="flex px-6 pt-6">
          <img src={trophy} alt={"dataImg"} />
          <p className="text-dimBlue text-base pl-2">Winner</p>
        </div>
        <div className="px-6 space-y-4 divide-y divide-solid divide-black25 divide-x-0">
          {sortedData?.length > 0 &&
            sortedData?.map((i, idx) => (
              <div key={idx} className="flex flex-1 justify-between pt-4">
                <p
                  className={`${
                    idx + 1 === 1 ? "text-wonStatus" : "text-black55"
                  } font-bold text-sm`}
                >
                  {idx + 1}. №{i?.horse_number} {i?.horse?.name} (
                  {i?.horse?.trainer?.name})
                </p>
                <p
                  className={`${
                    idx + 1 === 1 ? "text-wonStatus" : "text-black55"
                  } font-bold text-sm`}
                >
                  {i?.win_odd ? i?.win_odd : "X"}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="flex px-6 pt-6">
          <p className="text-dimBlue text-base pl-2">Place</p>
        </div>
        <div className="px-6 space-y-4 divide-y divide-solid divide-black25 divide-x-0">
          {sortedData?.length > 0 &&
            sortedData?.map((i, idx) => (
              <div key={idx} className="flex flex-1 justify-between pt-4">
                <p
                  className={`${
                    idx + 1 === 1 || idx + 1 === 2 || idx + 1 === 3
                      ? "text-wonStatus"
                      : "text-black55"
                  } font-bold text-sm`}
                >
                  {idx + 1}. №{i?.horse_number} {i?.horse?.name} (
                  {i?.horse?.trainer?.name})
                </p>
                <p
                  className={`${
                    idx + 1 === 1 || idx + 1 === 2 || idx + 1 === 3
                      ? "text-wonStatus"
                      : "text-black55"
                  } font-bold text-sm`}
                >
                  {i?.win_odd ? i?.win_odd : "X"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EndedSection;
