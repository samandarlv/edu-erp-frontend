import { defineStore } from "pinia";
import { teacherGroup } from "../../api/teacher/teacherGroup";

export const useTeacherGroupStore = defineStore({
  id: "teacher_group",
  state: () => ({
    groups: [],
    students: [],
  }),
  actions: {
    async getTeacherGroups(id) {
      try {
        let res = await teacherGroup.getTeacherGroups(id);
        this.groups = res?.groups;
      } catch (error) {
        console.log(error);
      }
    },

    async getGroupStudents(id) {
      try {
        let res = await teacherGroup.getGroupStudents(id);
        this.students = res?.students;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
