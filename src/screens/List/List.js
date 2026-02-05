import Header from "components/Header";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";

import { horseQueryKeys } from "../../api/mainApis";
import { useGetEntryList } from "../../api/useGetEntryList";
import EndedSection from "../../components/EndedSection";
import EntryListTab from "../../components/EntryListTab";
import InfoTab from "../../components/InfoTab";
import ListSection from "../../components/ListSection";
import LiveTab from "../../components/LiveTab";
import Loader from "../../components/Loader";
import RaceTitle from "../../components/RaceTitle";

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

const List = () => {
  const [value, setValue] = React.useState(0);
  const [channels] = useState(["horsebet_list"]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const race = location.state;
  const { data, isLoading } = useGetEntryList(race?.id);
  const pubnub = usePubNub();
  const queryClient = useQueryClient();

  const handleMessage = (e) => {
    const m = JSON.parse(e.message);
    if (m?.message === "refresh") {
      queryClient.invalidateQueries([horseQueryKeys.ENTRY_LIST]);
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
  const isOngoing = race?.has_started && !race?.has_ended;
  const isEnded = race?.has_ended;

  return (
    <div className="flex flex-col flex-1 overflow-y-hidden">
      <Header border={false} />
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <div className="overflow-y-scroll flex flex-1 flex-col">
          <div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #2F2688 19.4%, #2E2486 100%)",
                display: "flex",
                flexDirection: "column",
              }}
              className="justify-center rounded-b-2xl overflow-hidden"
            >
              <RaceTitle raceName={race?.name} />
              <EntryListTab
                value={value}
                handleChange={handleChange}
                link={race?.live_url}
              />
              <TabPanel value={value} index={0}>
                <InfoTab
                  img={race?.info_img}
                  location={race?.location}
                  startDate={race?.start_date}
                  diffDate={race?.diff_date}
                  isOngoing={isOngoing}
                  isEnded={isEnded}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <LiveTab link={race?.live_url} diffDate={race?.diff_date} />
              </TabPanel>
            </div>
          </div>
          {isEnded ? (
            <EndedSection data={data} />
          ) : (
            <ListSection data={data} isOngoing={isOngoing} />
          )}
        </div>
      )}
    </div>
  );
};

export default List;
