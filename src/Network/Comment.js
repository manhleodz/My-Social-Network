import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const CommentApi = {

    async getCommentsByPostId(id) {
        return axios.get(`${ApiUrl}/comments/post/${id}`)
    },

    async newComment(data) {
        return axios.post(`${ApiUrl}/comments`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async deleteComment(id) {
        return axios.delete(`${ApiUrl}/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async updateComment(data) {
        return axios.put(`${ApiUrl}/comments/${data.id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        });
    },

    async likeComment(id, data) {
        return axios.post(`${ApiUrl}/comments/like/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },
}