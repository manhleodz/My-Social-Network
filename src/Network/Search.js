import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const SearchAPI = {
    async topSearch(search) {
        return axios.get(`${ApiUrl}/search/top`, {
            params: { search: search },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async search(search, page) {
        return axios.get(`${ApiUrl}/search`, {
            params: { search: search, page: page },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async updateHistory(search) {
        return axios.post(`${ApiUrl}/search`, { search: search }, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async deleteHistory(id) {
        return axios.delete(`${ApiUrl}/search`, {
            params: { id: id },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    }
}