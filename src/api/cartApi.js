import axiosClient from './axiosClient';

const cartApi = {
  create(data) {
    const url = '/carts';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },
};

export default cartApi;
