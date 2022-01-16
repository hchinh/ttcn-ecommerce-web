import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/auth/signin';
    return axiosClient.post(url, data);
  },

  register(data) {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  },
};

export default userApi;
