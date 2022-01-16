import axiosClient from './axiosClient';

const adminApi = {
  login(data) {
    const url = '/admin/auth/signin';
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = '/admin/auth/signup';
    return axiosClient.post(url, data);
  },
};

export default adminApi;
