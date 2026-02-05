import { useMutation, useQueryClient } from "react-query";

import { horseQueryKeys, mainApis } from "./mainApis";

export const useMutateCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => mainApis.setCheckout(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(horseQueryKeys.ENTRY_LIST);
    },
  });
};
