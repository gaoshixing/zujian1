import { http, baseURLSys } from "./request";

const post = (src, data) => {
	return http.post(`/salWorkHistory/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salWorkHistory/${src}`, data);
};

export const salCommon = {
	getUploadFileUrl() {
		return baseURLSys + '/attachment/uploadFile'
	},
}