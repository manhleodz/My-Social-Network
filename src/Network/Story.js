import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const StoryApi = {

    async getAll(page) {
        return axios.get(`${ApiUrl}/story`, {
            params: { page: page },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async getById(id) {
        return axios.get(`${ApiUrl}/story/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async getByUser(id) {
        return axios.get(`${ApiUrl}/story/user/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async post(data) {
        return axios.post(`${ApiUrl}/story`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    }
}