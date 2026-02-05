import best from "assets/icons/best.svg";
import star from "assets/icons/starBlack.svg";
import background from "assets/img/carBackground.png";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { horseQueryKeys } from "../../api/mainApis";
import { useGetPrizeInfo } from "../../api/useGetPrizeInfo";
import { useGetUserScore } from "../../api/useGetUserScore";
import Header from "../../components/Header";
import MyPointTab from "../../components/MyPointTab";
import PointListItem from "../../components/PointListItem";
import PointTab from "../../components/PointTab";
import PrizeTab from "../../components/PrizeTab";
import { mainSelectors } from "../../redux/slices/mainSlice";
import { formatNumber } from "../../utils";

const TabPanel = ({ children, value, index, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`home-tabpanel-${index}`}
      aria-labelledby={`home-tab-${index}`}
      className={value === index && "flex flex-1"}
      {...props}
    >
      {value === index && children}
    </div>
  );
};

const MyTicket = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { event } = useSelector(mainSelectors.getMain);
  const { data: prizeList } = useGetPrizeInfo(event?.id);
  const { data: score } = useGetUserScore(event?.id);
  const [channels] = useState(["horsebet_list"]);
  const pubnub = usePubNub();

  const queryClient = useQueryClient();

  const handleMessage = (e) => {
    const m = JSON.parse(e.message);
    if (m?.message === "refresh") {
      queryClient.invalidateQueries([horseQueryKeys.PRIZE_INFO]);
      queryClient.invalidateQueries([horseQueryKeys.SCORE_LIST]);
    }
  };

  useEffect(() => {
    const listener = {
      message: handleMessage,
    };
    pubnub.addListener(listener);
    pubnub.subscribe({ channels });

    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);
  return (
    <div className="flex flex-col flex-1 overflow-y-hidden">
      <Header />
      <div className="overflow-y-scroll flex flex-1 flex-col">
        <div>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundRepeat: "none",
              boxShadow: "rgb(0 0 0 / 10%) 0px 6px 12px",
              display: "flex",
              flexDirection: "column",
            }}
            className="justify-center rounded-b-2xl overflow-hidden bg-dimBlue"
          >
            <MyPointTab value={value} handleChange={handleChange} />
            <TabPanel value={value} index={0}>
              <PointTab score={score} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PrizeTab img={prizeList?.img_url} score={score} />
            </TabPanel>
          </div>
        </div>

        <div className="divide-y divide-dashed divide-x-0 border-black55">
          {value === 0 ? (
            <div className="pb-6">
              <div className="flex p-6">
                <img src={star} alt={"dataImg"} />
                <p className="text-dimBlue text-base pl-2 flex items-center">
                  Авсан оноо
                </p>
              </div>
              <div className="px-6 space-y-3">
                {score?.list?.length > 0 &&
                  score?.list?.map((i, idx) => (
                    <PointListItem key={idx} score={i} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="pb-6">
              <div className="flex p-6">
                <img src={best} alt={"dataImg"} />
                <p className="text-dimBlue text-base pl-2 flex items-center">
                  Шилдгүүд
                </p>
              </div>
              <div className="px-6 space-y-3 divide-y divide-solid divide-black25 divide-x-0">
                {prizeList?.leaderboard?.length > 0 &&
                  prizeList?.leaderboard?.map((i, idx) => (
                    <div key={idx} className="flex flex-1 justify-between">
                      <p className="text-dimBlue font-bold text-sm">
                        {idx + 1}. {i?.phone}
                      </p>
                      <p
                        className={`${
                          idx + 1 === 1 ? "text-hipay" : "text-wonStatus"
                        } font-bold text-sm`}
                      >
                        {formatNumber(i?.total_winning || 0)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
