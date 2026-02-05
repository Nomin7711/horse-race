import { useQuery } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useGetPrizeInfo = (eventId) => {
  return useQuery([horseQueryKeys.RACE_LIST, eventId], () =>
    mainApis.getPrizeInfo(eventId)
  );
};
