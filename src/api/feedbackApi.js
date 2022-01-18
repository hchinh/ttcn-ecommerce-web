import axiosClient from './axiosClient';

const feedbackApi = {
  getAll(params) {
    const url = '/feedbacks';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/feedbacks/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/feedbacks';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/feedbacks/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/feedbacks/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default feedbackApi;
