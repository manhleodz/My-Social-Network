import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const PostApi = {

    async getPost(page) {
        return axios.get(`${ApiUrl}/posts`, {
            params: { page: page },
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        )
    },

    async like(data) {

        return axios.post(
            `${ApiUrl}/likes`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        });
    },

    async getLikeByPost(id) {
        return axios.get(`${ApiUrl}/likes/${id}`);
    },

    async updateLikeNum(id) {
        return axios.post(`${ApiUrl}/posts/like/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
    },

    async getLike(id, authId) {
        return axios.get(`${ApiUrl}/likes/${id}/${authId}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        );
    },

    async delete(id) {
        return axios.delete(`${ApiUrl}/posts/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }
        )
    },

    async create(data) {
        return axios.post(`${ApiUrl}/posts`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        });
    },

    async uploadImages(data) {

    },

    async uploadVideos(data) {

    },

    async getOwnerLike(id, authId) {
        return axios.get(`${ApiUrl}/likes/${id}/${authId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        });
    },

    async like(data) {
        return axios.post(`${ApiUrl}/likes`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    }
}