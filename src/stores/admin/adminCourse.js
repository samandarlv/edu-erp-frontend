import { defineStore } from "pinia";
import adminCourse from "../../api/admin/adminCourse";

export const useCourseStore = defineStore({
  id: "admin_course",
  state: () => ({
    courses: [],
    teachers: [],
    count: null,
  }),
  actions: {
    async getCourses(params) {
      try {
        let res = await adminCourse.getCourses(params);
        this.courses = res?.courses;
        this.count = res?.count;
        return res?.count;
      } catch (err) {
        console.log(err);
      }
    },

    async getCourseTeacher(id) {
      try {
        let res = await adminCourse.getCourseTeacher(id);
        this.teachers = res?.teachers;
      } catch (error) {
        console.log(error);
      }
    },

    async addCourse(payload) {
      try {
        await adminCourse.addCourse(payload);
      } catch (err) {
        console.log(err);
      }
    },

    async updateCourse(payload, id) {
      try {
        await adminCourse.updateCourse(payload, id);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCourse(id) {
      try {
        await adminCourse.deleteCourse(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
