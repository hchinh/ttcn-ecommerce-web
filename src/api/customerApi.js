import axiosClient from "./axiosClient"

const customerApi = {
  getAll(params) {
    const url = '/customers'
    return axiosClient.get(url, { params })
  },

  remove(id) {
    const url = `/customers/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },

  update(data) {
    const url = `/customers/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  add(data) {
    const url = '/customers';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },
}

export default customerApi;