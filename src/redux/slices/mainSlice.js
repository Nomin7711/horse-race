import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { mainApis } from "api/mainApis";

const initialState = {
  isAuthorized: false,
  user: {},
  loading: false,
  phoneNumber: "",
  events: [],
  event: {},
};

export const fetchUser = createAsyncThunk("main/fetchUser", async () => {
  return await mainApis.getUserInfo();
});
export const fetchEvent = createAsyncThunk("main/fetchEvent", async () => {
  return await mainApis.getEvent();
});

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updatePhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.events = action.payload?.events || [];
        state.event = action.payload?.events?.[0] || {};
        state.loading = false;
      })
      .addCase(fetchEvent.rejected, (state) => {
        state.loading = false;
      });
  },
});

const getMain = createSelector([(state) => state.main], (main) => main);

export const mainSelectors = {
  getMain,
};
export default mainSlice.reducer;
