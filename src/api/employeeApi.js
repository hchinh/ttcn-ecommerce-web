import axiosClient from './axiosClient';

const employeeApi = {
  getAll(params) {
    const url = '/employees';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/employees/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/employees';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/employees/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/employees/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default employeeApi;
