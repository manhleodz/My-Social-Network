import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const ChatApi = {

    async getMessage(id) {

        return axios.get(`${ApiUrl}/inbox/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    },

    async sendMessage(data) {
        return axios.post(`${ApiUrl}/inbox`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    },

    async deleteMessage(id) {
        return axios.delete(`${ApiUrl}/inbox/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    }
}