import { defineStore } from "pinia";
import { teacherSingleGroup } from "../../api/teacher/teacherSingleGroup";

export const useTeacherSingleGroupStore = defineStore({
  id: "teacher_single_group",
  state: () => ({
    attendance: [],
    lessons: [],
    one_day: [],
  }),
  actions: {
    async getAllStudentsAttendance(id) {
      try {
        this.attendance = await teacherSingleGroup.getAllStudentsAttendance(id);
      } catch (error) {
        console.log(error);
      }
    },

    async getAllLessons(id) {
      try {
        let res = await teacherSingleGroup.getAllLessons(id);
        this.lessons = res?.lessons;
      } catch (error) {
        console.log(error);
      }
    },

    async getStudentsAttendanceOneDay(id, payload) {
      try {
        this.one_day = await teacherSingleGroup.getStudentsAttendanceOneDay(
          id,
          payload
        );
      } catch (error) {
        console.log(error);
      }
    },

    async setLessonTitle(id, payload) {
      try {
        await teacherSingleGroup.setLessonTitle(id, payload);
      } catch (error) {
        console.log(error);
      }
    },

    async updateLessonAttendance(payload) {
      try {
        await teacherSingleGroup.updateLessonAttendance(payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
