import { defineStore } from "pinia";
import adminRoom from "../../api/admin/adminRoom";

export const useAdminRoomStore = defineStore({
  id: "admin_room",
  state: () => ({
    rooms: [],
  }),
  actions: {
    async getRooms(params) {
      try {
        let res = await adminRoom.getRoom(params);
        this.rooms = res?.rooms;
        return res?.count;
      } catch (err) {
        console.log(err);
      }
    },

    async addRoom(payload) {
      try {
        await adminRoom.addRoom(payload);
      } catch (err) {
        console.log(err);
      }
    },

    async updateRoom(payload, id) {
      try {
        await adminRoom.updateRoom(payload, id);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteRoom(id) {
      try {
        await adminRoom.deleteRoom(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
