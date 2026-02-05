import MainLayout from "components/MainLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "screens/Home";
import LiveTv from "screens/LiveTv";

import List from "../screens/List";
import MyTicket from "../screens/MyTicket";
import TicketHistory from "../screens/TicketHistory";

export const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
        exact: true,
      },
      {
        path: "list",
        element: <List />,
        exact: true,
      },
      {
        path: "ticketHistory",
        element: <TicketHistory />,
        exact: true,
      },
      {
        path: "myTicket",
        element: <MyTicket />,
        exact: true,
      },
    ],
  },
]);

export const LiveTvRoutes = createBrowserRouter([
  {
    path: "/live-tv",
    element: <LiveTv />,
    exact: true,
  },
  {
    path: "/live-tv-suld",
    element: <LiveTv blueSpeedometer={true} />,
    exact: true,
  },
  {
    path: "/live-tv-time",
    element: <LiveTv timeOnly={true} />,
    exact: true,
  },
]);
