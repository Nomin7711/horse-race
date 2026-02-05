import { useQuery } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useGetRaceList = (eventId) => {
  return useQuery(
    [horseQueryKeys.RACE_LIST, eventId],
    () => mainApis.getRaceList(eventId),
    { enabled: !!eventId }
  );
};
