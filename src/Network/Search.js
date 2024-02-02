import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const SearchAPI = {
    async search(search, page) {
        return axios.get(`${ApiUrl}/search`, {
            params: { search: search, page: page },
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    },

    async updateHistory(search) {
        return axios.post(`${ApiUrl}/search`, {
            params: { search: search },
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    },

    async deleteHistory(id) {
        return axios.delete(`${ApiUrl}/search`, {
            params: { id: id },
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    }
}