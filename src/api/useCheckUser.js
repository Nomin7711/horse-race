import { setToken } from "api/apiClient";
import { mainApis } from "api/mainApis";
import { useMutation } from "react-query";
import { batch, useDispatch } from "react-redux";

import { fetchEvent, fetchUser } from "#redux/slices/mainSlice";

export const useCheckUser = () => {
  const dispatch = useDispatch();
  return useMutation((data) => mainApis.checkUser(data), {
    onSuccess: async (data) => {
      if (data?.code === 1 && data?.token) {
        setToken(data?.token);
        batch(() => {
          dispatch(fetchUser());
          dispatch(fetchEvent());
        });
      }
    },
  });
};
