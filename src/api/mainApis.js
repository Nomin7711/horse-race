import { apiClient } from "api/apiClient";

export const mainApis = {
  async checkUser(data) {
    return (await apiClient.post("user/check-user-hps/", data))?.data;
  },
  async getUserInfo() {
    return (await apiClient.get("user/user-info/"))?.data;
  },
  async getEvent() {
    return (await apiClient.get("race/event-list/"))?.data;
  },
  async getRaceList(eventId) {
    return (await apiClient.get(`race/race-list/?event_id=${eventId}`))?.data
      ?.races;
  },
  async getEntryList(raceId) {
    return (await apiClient.get(`race/entry-list/?race_id=${raceId}`))?.data
      ?.entries;
  },
  async getTicketHistory(eventId) {
    return (await apiClient.get(`bet/get_history/?event_id=${eventId}`))?.data
      ?.list;
  },
  async getPrizeInfo(eventId) {
    return (await apiClient.get(`prize/prize_info/?event_id=${eventId}`))?.data;
  },
  async getUserScore(eventId) {
    return (await apiClient.get(`prize/user_score/?event_id=${eventId}`))?.data;
  },
  async setCheckout(data) {
    return (await apiClient.post("payment/checkout/", data))?.data;
  },
  async getLiveTracks() {
    return (await apiClient.get("livetv/track_gps"))?.data;
  },
};
export const horseQueryKeys = {
  RACE_LIST: "@horseQueryKeys.RACE_LIST",
  ENTRY_LIST: "@horseQueryKeys.ENTRY_LIST",
  TICKET_LIST: "@horseQueryKeys.TICKET_LIST",
  PRIZE_INFO: "@horseQueryKeys.PRIZE_INFO",
  SCORE_LIST: "@horseQueryKeys.SCORE_LIST",
  LIVETV_TRACKS: "@horseQueryKeys.LIVETV_TRACKS",
};
