import axiosClient from "../apiClient";

const adminCourse = {
  getCourses(params) {
    const url = `/courses/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  getCourseTeacher(id) {
    const url = `/courses/all-teachers/${id}`;
    return axiosClient.get(url);
  },

  addCourse(payload) {
    const url = "/courses/create-course";
    console.log(payload, "payload");
    return axiosClient.post(url, payload);
  },

  updateCourse(payload, id) {
    const url = `/courses/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteCourse(id) {
    const url = `/courses/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminCourse;
