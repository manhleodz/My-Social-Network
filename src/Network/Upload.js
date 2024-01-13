import { ApiUrl } from '../Utils/Config/Url';
import axios from 'axios';

export const UploadApi = {

    async uploadImages(data) {
        return axios.post(`${ApiUrl}/images`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    },

    async uploadVideos(data) {
        return axios.post(`${ApiUrl}/videos`, data, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        })
    },
}