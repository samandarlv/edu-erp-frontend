import axiosClient from "../apiClient";

export const teacherSingleGroup = {
  getAllStudentsAttendance(id) {
    const url = `/groups/attendance/${id}/all/q?`;
    return axiosClient.get(url);
  },

  getAllLessons(id) {
    const url = `lessons/group/${id}/q?`;
    return axiosClient.get(url);
  },

  getStudentsAttendanceOneDay(id, payload) {
    const url = `groups/attendance/${id}`;
    return axiosClient.post(url, payload);
  },

  setLessonTitle(id, payload) {
    const url = `lessons/lesson/attendance/${id}`;
    return axiosClient.put(url, payload);
  },

  updateLessonAttendance(payload) {
    const url = `groups/attendance/update/lesson`;
    return axiosClient.post(url, payload);
  },
};
