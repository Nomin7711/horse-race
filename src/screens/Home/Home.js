import { AppBar, Link, Tab, Tabs } from "@mui/material";
import clipboard from "assets/icons/clipboard.svg";
import background from "assets/img/homeBackground.png";
import logo from "assets/img/logoBlue.png";
import Header from "components/Header";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { horseQueryKeys } from "../../api/mainApis";
import { useGetRaceList } from "../../api/useGetRaceList";
import EndedRaceCard from "../../components/EndedRaceCard";
import Loader from "../../components/Loader";
import RaceCard from "../../components/RaceCard";
import { mainSelectors } from "../../redux/slices/mainSlice";

const Home = () => {
  const { event, loading } = useSelector(mainSelectors.getMain);

  const { id } = event || {};

  const { data, isLoading, isFetching } = useGetRaceList(id);
  const [endedRace, setEndedRace] = useState([]);
  const [ongoingRace, setOngoingRace] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      const ended = data?.filter((race) => race?.has_ended);
      const ongoing = data?.filter((race) => !race?.has_ended);
      setEndedRace(ended);
      setOngoingRace(ongoing);
    }
  }, [data]);
  const [channels] = useState(["horsebet_list"]);
  const pubnub = usePubNub();
  const queryClient = useQueryClient();

  const handleMessage = (e) => {
    const m = JSON.parse(e.message);
    if (m?.message === "refresh") {
      queryClient.invalidateQueries([horseQueryKeys.RACE_LIST]);
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
    <div className="flex flex-col flex-1 justify-between overflow-y-scroll">
      <Header border={true} />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "auto 200px",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          objectFit: "contain",
          height: "200px",
          padding: "16px 24px",
        }}
        className="flex flex-1 overflow-y-scroll"
      >
        <div className="flex-col flex-1 relative">
          <img alt="" src={logo} height={42} />
          <p className="text-primaryBlue text-xxs mt-4">ХОЛЫН ЗАЙН МОРИН</p>
          <p className="text-primaryBlue text-xxs">ТОЙРУУЛГЫН УРАЛДААН</p>

          <div className="flex-col mt-4 space-y-4">
            {ongoingRace?.length > 0 &&
              ongoingRace?.map((race, idx) => (
                <RaceCard key={idx} race={race} />
              ))}
          </div>
          <div className="flex-col mt-4 space-y-4">
            {endedRace?.length > 0 &&
              endedRace?.map((race, idx) => (
                <div key={idx}>
                  <div
                    className="flex justify-center items-center mb-4 pt-6"
                    // style={{ borderTop: "1px dashed #646E7B" }}
                  >
                    <img src={clipboard} alt={"clipboard"} />
                    <p className="text-black55 ml-2 text-sm ">Уралдааны түүх</p>
                  </div>
                  <EndedRaceCard race={race} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Loader visible={isLoading || loading || isFetching} />
    </div>
  );
};

export default Home;
