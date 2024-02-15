import { defineStore } from "pinia";
import adminGroup from "../../api/admin/adminGroup";

export const useGroupStore = defineStore({
  id: "admin_group",
  state: () => ({
    groups: [],
    group: [],
    rooms: [],
    students: [],
  }),
  actions: {
    async getGroups(params) {
      try {
        let res = await adminGroup.getGroups(params);
        this.groups = res?.groups;
        return res?.count;
      } catch (err) {
        console.log(err);
      }
    },

    async getSingleGroup(id) {
      try {
        let res = await adminGroup.getSingleGroup(id);
        this.group = res?.group;
      } catch (err) {
        console.log(err);
      }
    },
    async getSingleGroupStudents(id) {
      try {
        let res = await adminGroup.getSingleGroupStudents(id);
        this.students = res?.students;
      } catch (err) {
        console.log(err);
      }
    },

    async addGroup(payload) {
      try {
        let res = await adminGroup.addGroup(payload);
      } catch (err) {
        console.log(err);
      }
    },

    async addStudentGroup(payload) {
      try {
        let res = await adminGroup.addStudentGroup(payload);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteGroup(id) {
      await adminGroup.deleteGroup(id);
    },

    async getAvailableRooms(payload) {
      try {
        this.rooms = await adminGroup.getAvailableRooms(payload);
      } catch (err) {
        console.log(err);
      }
    },

    async updateLessonSingleGroup(lesson_id, payload) {
      try {
        await adminGroup.updateLessonSingleGroup(lesson_id, payload);
      } catch (error) {
        console.log(error);
      }
    },
    async updateStudentSingleGroup(lesson_id, payload) {
      try {
        await adminGroup.updateStudentSingleGroup(lesson_id, payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
