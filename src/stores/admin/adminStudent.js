import { defineStore } from "pinia";
import adminStudent from "../../api/admin/adminStudent";

export const useAdminStudentStore = defineStore({
  id: "admin_student",
  state: () => ({
    students: [],
  }),
  actions: {
    async getStudents(params) {
      try {
        let res = await adminStudent.getStudent(params);
        this.students = res?.students;
        return res?.count;
      } catch (err) {
        console.log(err);
      }
    },

    async addStudent(payload) {
      try {
        await adminStudent.addStudent(payload);
      } catch (err) {
        console.log(err);
      }
    },

    async updateStudent(payload, id) {
      try {
        await adminStudent.updateStudent(payload, id);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteStudent(id) {
      try {
        await adminStudent.deleteStudent(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
