import axiosClient from "./apiClient";

const search = {
  searchByPhone(payload) {
    const url = `/students/search`;
    return axiosClient.post(url, payload);
  },
};

export default search;
