import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const FriendApi = {

    async getListFriend() {
        return axios.get(`${ApiUrl}/rela`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        });
    },
}