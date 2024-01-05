import { getApiUrl } from '../Utils/Config/getApiUrl';
import axios from 'axios';

export const ChatApi = {

    async getMessage(id) {

        return axios.get(`${getApiUrl}/inbox/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },

    async sendMessage(id, data) {
        return axios.post(`${getApiUrl}/inbox/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    }
}