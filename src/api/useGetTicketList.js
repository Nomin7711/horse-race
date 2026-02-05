import { useQuery } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useGetTicketList = (eventId) => {
  return useQuery(
    [horseQueryKeys.TICKET_LIST, eventId],
    () => mainApis.getTicketHistory(eventId),
    { keepPreviousData: true, enabled: !!eventId }
  );
};
