import axiosClient from './axiosClient';

const processOrderApi = {
    getAll(params) {
        const url = '/cartItems';
        var processOrderData = axiosClient.get(url, { params });
        return processOrderData
       
    },


    update(data) {
        const url = `/cartItems/${data.id}`;
        const token = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
        };
        return axiosClient.put(url, data, token);
    },
}

export default processOrderApi;