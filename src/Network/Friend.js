import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const FriendApi = {

    async getListFriend(id) {
        return axios.get(`${ApiUrl}/rela/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },
}