import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const StoryApi = {

    async getAll() {
        return axios.get(`${ApiUrl}/story`)
    },

    async getById(id) {
        return axios.get(`${ApiUrl}/story/${id}`)
    },

    async getByUser(id) {
        return axios.get(`${ApiUrl}/story/user/${id}`)
    },

    async post(data) {
        return axios.post(`${ApiUrl}/story`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    }
}