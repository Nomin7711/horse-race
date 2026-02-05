import { horseQueryKeys, mainApis } from "api/mainApis";
import { useQuery } from "react-query";

export const useGetLiveTvTracks = () => {
  return useQuery([horseQueryKeys.LIVETV_TRACKS], mainApis.getLiveTracks, {
    refetchInterval: 10000,
    keepPreviousData: true,
  });
};
