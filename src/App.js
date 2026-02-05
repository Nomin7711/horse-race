import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { setInterceptor } from "api/apiClient";
import { useCheckUser } from "api/useCheckUser";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";
import { LiveTvRoutes, MainRoutes } from "router";

import { mainSelectors } from "./redux/slices/mainSlice";

function App() {
  const query = queryString.parse(window.location.search, {
    parseBooleans: true,
  });

  const { mutate } = useCheckUser();

  const handleToken = () => {
    let data = {
      authorization_code: localStorage.getItem("auth_code"),
    };
    if (query?.code && query?.code !== "undefined" && query?.code?.length > 1) {
      data.authorization_code = query?.code;
      localStorage.setItem("auth_code", data.authorization_code);
    }
    mutate(data);
  };

  useEffect(() => {
    handleToken();
  }, []);

  useEffect(() => {
    setInterceptor(
      function (response) {
        if (response?.data?.code === 0) {
          toast.error(response?.data?.msg);
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);

  const { isAuthorized } = useSelector(mainSelectors.getMain);
  return <RouterProvider router={isAuthorized ? MainRoutes : LiveTvRoutes} />;
  // return <RouterProvider router={MainRoutes} />;
}

export default App;
