import { useQuery } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useGetEntryList = (raceId) => {
  return useQuery(
    [horseQueryKeys.ENTRY_LIST, raceId],
    () => mainApis.getEntryList(raceId),
    { keepPreviousData: true }
  );
};
