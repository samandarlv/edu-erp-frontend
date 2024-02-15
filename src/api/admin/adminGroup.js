import axiosClient from "../apiClient";

const adminGroup = {
  getGroups(params) {
    const url = `/groups/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  getSingleGroup(id) {
    const url = `/groups/${id}`;
    return axiosClient.get(url);
  },

  getSingleGroupStudents(id) {
    const url = `/groups/all-students/${id}`;
    return axiosClient.get(url);
  },

  addGroup(payload) {
    const url = "/groups/create-group";
    return axiosClient.post(url, payload);
  },

  addStudentGroup(payload) {
    const url = "/groups/add-student";
    return axiosClient.post(url, payload);
  },

  deleteGroup(id) {
    const url = `/groups/delete/${id}`;
    return axiosClient.delete(url);
  },

  getAvailableRooms(payload) {
    const url = "/groups/available-rooms";
    return axiosClient.post(url, payload);
  },

  updateLessonSingleGroup(lesson_id, payload) {
    const url = `lessons/lesson/comment/${lesson_id}`;
    return axiosClient.put(url, payload);
  },
  updateStudentSingleGroup(lesson_id, payload) {
    const url = `groups/attendance/update/lesson/${lesson_id}`;
    return axiosClient.put(url, payload);
  },
};

export default adminGroup;
