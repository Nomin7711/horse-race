import "./index.css";

import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import { store } from "#redux/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const pubnub = new PubNub({
  subscribeKey: "sub-c-87ac2d5f-caf8-44db-9160-2f291deec2ea",
  uuid: "hps-a-A9FA429D6FEA42F6E0532A64A8C0D506",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PubNubProvider client={pubnub}>
          <App />
        </PubNubProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
