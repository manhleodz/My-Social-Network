import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const FriendApi = {

    async getListFriend() {
        return axios.get(`${ApiUrl}/relationship`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        });
    },

    async addFriend(data) {
        return await axios.post(`${ApiUrl}/relationship/addFriend`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },

    async deleteFriend(id) {
        return await axios.delete(`${ApiUrl}/relationship/unfriend`, {
            params: {id: id},
            headers: {
                accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
            }
        })
    },
}