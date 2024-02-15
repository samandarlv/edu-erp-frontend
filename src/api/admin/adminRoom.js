import axiosClient from "../apiClient";

const adminRoom = {
  getRoom(params) {
    const url = `/rooms/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  addRoom(payload) {
    const url = "/rooms/create-room";
    return axiosClient.post(url, payload);
  },

  updateRoom(payload, id) {
    const url = `/rooms/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteRoom(id) {
    const url = `/rooms/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminRoom;
