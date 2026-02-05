import {configureStore} from "@reduxjs/toolkit";

import mainReducer from "#redux/slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
