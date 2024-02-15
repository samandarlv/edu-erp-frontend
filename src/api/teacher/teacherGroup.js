import axiosClient from "../apiClient";

export const teacherGroup = {
  getTeacherGroups(id) {
    const url = `/teachers/get-groups/${id}`;
    return axiosClient.get(url);
  },

  getGroupStudents(id) {
    const url = `/groups/all-students/${id}`;
    return axiosClient.get(url);
  },
};
