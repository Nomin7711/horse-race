import empty from "assets/img/empty.png";
import Header from "components/Header";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import { horseQueryKeys } from "../../api/mainApis";
import { useGetTicketList } from "../../api/useGetTicketList";
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import TicketItem from "../../components/TicketItem";
import { mainSelectors } from "../../redux/slices/mainSlice";

const buttons = [
  {
    label: "Бүгд",
    id: "all",
  },
  {
    label: "Хүлээж байгаа",
    id: "waiting",
  },
  {
    label: "Хожсон",
    id: "won",
  },
];

const TicketHistory = () => {
  const [selected, setSelected] = useState("all");
  const { event } = useSelector(mainSelectors.getMain);
  const { data, isLoading, isFetching } = useGetTicketList(event.id);
  const [channels] = useState(["horsebet_list"]);
  const pubnub = usePubNub();
  const queryClient = useQueryClient();
  const handleMessage = (e) => {
    const m = JSON.parse(e.message);
    if (m?.message === "refresh") {
      queryClient.invalidateQueries([horseQueryKeys.TICKET_LIST]);
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

  const filteredData = useMemo(() => {
    let arr = [];
    if (selected === "all") {
      arr = data;
    } else if (selected === "won") {
      arr = data?.filter((d) => d?.has_won === true);
    } else if (selected === "waiting") {
      arr = data?.filter((d) => d?.has_ended === false);
    }
    return arr;
  }, [selected, data]);
  // console.log(data);
  return (
    <div className="flex flex-col flex-1 justify-between overflow-y-scroll">
      <Header border={true} />
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <div className="p-6 flex-col flex-1 justify-between overflow-y-scroll">
          <div className="flex flex-1 justify-between gap-3">
            {buttons.map((button, idx) => (
              <button
                className={`normal-case rounded-xl py-2 px-4 flex-1 border-none ${
                  selected === button?.id
                    ? "bg-dimBlue text-black0"
                    : "bg-black0 text-textGrey shadow-lg"
                }`}
                key={idx}
                onClick={() => {
                  setSelected(button?.id);
                }}
              >
                <p className="text-xs font-bold">{button?.label}</p>
              </button>
            ))}
          </div>
          <div>
            {filteredData?.length > 0 ? (
              filteredData?.map((ticket, idx) => (
                <TicketItem key={idx} ticket={ticket} />
              ))
            ) : (
              <div className="flex-1 mt-32 text-center">
                <p className="mb-12 text-[#ABB7C6] font-bold text-base">
                  Уралдаанд оролцоогүй байна
                </p>
                <img
                  alt="empty"
                  src={empty}
                  style={{ height: 200, width: 200 }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketHistory;
