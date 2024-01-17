import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const Auth = {

    async login(data, success, failure) {
        return await axios.post(`${ApiUrl}/auth/login`, data).then((response) => {
            if (response) {
                localStorage.setItem("accessToken", response.data.token);
                const user = response.data;
                success(user);
            }
        }).catch((err) => failure(err.response.data));
    },

    signOut() {
        localStorage.clear();
    },

    async completeConfirm(data, success, failure) {
        return await axios.put(`${ApiUrl}/auth`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((e) => success(e))
            .catch((err) => failure(err));
    },

    setOnline(id) {
        axios.put(`${ApiUrl}/info/offline`, {
            isActive: "false",
            id: id
        })
    },

    setOffline(id) {
        axios.put(`${ApiUrl}/info/online`, {
            isActive: "true",
            id: id,
        })
    },

    async signUp({ password, email }, success, failure) {
        return await axios.post(`${ApiUrl}/auth`, { password, email })
            .then((response) => {
                sessionStorage.setItem("accessToken", response.data);
                const myTimeout = setTimeout(() => window.location.assign("/"), 1000);
                myTimeout();
            }).catch((err) => {
                failure(err.response);
            });
    },

    async vefify(data, success, failure) {
        return await axios.post(`${ApiUrl}/auth/verify`, data)
            .then((response) => {
                success();
            }).catch(err => {
                failure(err.response.data);
            });
    },

    async getAllUsers() {
        return await axios.get(`${ApiUrl}/auth/all/users`);
    },

    async changeInfo(data, userId) {

        return await axios.put(`${ApiUrl}/auth/changeinfo/${userId}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    },

    async refreshStateUser(success, failure) {

        const accessToken = localStorage.getItem("accessToken");

        if (accessToken !== null) {
            return await axios.get(`${ApiUrl}/auth/user/profile`, {
                headers: {
                    accessToken: accessToken,
                }
            }).then(e => success(e.data)
            ).catch(e => failure());
        } else {
            failure();
        }
    },

    async refreshToken() {

    },

    async getProfile(info) {
        return await axios.get(`${ApiUrl}/auth/${info}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        })
    },

    async getAccessToken() {
        return window.localStorage.getItem("accessToken");
    },

    async getRoom(id) {
        return await axios.get(`${ApiUrl}/rela/room/${id}`);
    },
}