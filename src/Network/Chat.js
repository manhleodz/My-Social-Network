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

    async getGroupMessage(id) {

        return axios.get(`${ApiUrl}/inbox/group/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    },

    async sendGroupMessage(data) {
        return axios.post(`${ApiUrl}/inbox/group`, data, {
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
    },

    async getGroupChat() {
        return axios.get(`${ApiUrl}/inbox/group/all`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    }
}