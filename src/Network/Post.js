import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const PostApi = {

    async getPost(page) {
        return await axios.get(`${ApiUrl}/posts`, {
            params: { page: page },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async getPostById(id) {
        return await axios.get(`${ApiUrl}/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async getPostByProfile(id, page) {
        return await axios.get(`${ApiUrl}/posts/profile/user`, {
            params: { id: id, page: page },
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async like(data) {

        return await axios.post(
            `${ApiUrl}/likes`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        });
    },

    async getLikeByPost(id) {
        return await axios.get(`${ApiUrl}/likes/${id}`);
    },

    async updateLikeNum(id) {
        return await axios.post(`${ApiUrl}/posts/like/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async updateCommentNum(id) {
        return await axios.post(`${ApiUrl}/posts/comment/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async getLike(id, authId) {
        return await axios.get(`${ApiUrl}/likes/${id}/${authId}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
                },
            }
        );
    },

    async delete(id) {
        return await axios.delete(`${ApiUrl}/posts/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
                },
            }
        )
    },

    async create(data) {
        return await axios.post(`${ApiUrl}/posts`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    },

    async getOwnerLike(id, authId) {
        return await axios.get(`${ApiUrl}/likes/${id}/${authId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        });
    },

    async like(data) {
        return await axios.post(`${ApiUrl}/likes`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    }
}