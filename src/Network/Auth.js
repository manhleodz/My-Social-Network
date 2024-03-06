import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const Auth = {

    async login(data, success, unAuthorized, failure) {
        return await axios.post(`${ApiUrl}/auth/login`, data).then((response) => {
            if (response.data.message === "Successfull") {
                localStorage.setItem("accessToken", response.data.token);
                const user = response.data;
                success(user);
            } else if (response.data.message === "authentication has not been completed") {
                sessionStorage.setItem("accessToken", response.data.token);
                unAuthorized(response.data);
            }
        }).catch((err) => failure(err.response.data));
    },

    signOut() {
        localStorage.clear();
    },

    async completeConfirm(data, success, failure) {
        return await axios.put(`${ApiUrl}/auth`, data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
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

    async changeInfo(data) {

        return await axios.put(`${ApiUrl}/auth/changeinfo`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    },

    async changeUserInterface(data) {
        return await axios.put(`${ApiUrl}/auth/upload`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    },

    async getFriendRequests() {
        return await axios.get(`${ApiUrl}/relationship/request`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    },

    async getUnconfirmedRequest() {
        return await axios.get(`${ApiUrl}/relationship/unconfirmed`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    },

    async refreshStateUser(success, unAuthorized, failure) {

        const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

        if (accessToken !== null) {
            return await axios.get(`${ApiUrl}/auth/user/refresh`, {
                headers: {
                    accessToken: accessToken,
                }
            }).then(e => {
                if (e.data.confirm === 1) {
                    success(e.data)
                } else {
                    unAuthorized(e.data);
                }
            }).catch(() => failure());
        } else {
            failure();
        }
    },

    async refreshToken() {

    },

    async getProfile(info) {
        return await axios.get(`${ApiUrl}/auth/${info}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            },
        })
    },

    async getAccessToken() {
        return window.localStorage.getItem("accessToken");
    },

    async getRoom(id) {
        return await axios.get(`${ApiUrl}/rela/room/${id}`);
    },
}