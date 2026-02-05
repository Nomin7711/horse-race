import { useQuery } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useGetUserScore = (eventId) => {
  return useQuery([horseQueryKeys.SCORE_LIST, eventId], () =>
    mainApis.getUserScore(eventId)
  );
};
