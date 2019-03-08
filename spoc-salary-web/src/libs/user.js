import { httpSys as http, baseURLSys as baseURL, } from "./request";

const post = (src, data) => {
	return http.post(`/user/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/user/${src}`, data);
};

export const user = {
    uploadImg() {
		return `${baseURL}/user/uploadImg`;
    },
    saveAnyUserPhoto(params) {
		return http.get(`/user/saveAnyUserPhoto`, { params });
	},
}