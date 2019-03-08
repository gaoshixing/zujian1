import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salWorkHistory/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salWorkHistory/${src}`, data);
};

export const salWorkHistory = {
	save(params) {
		return post('save', params);
	},
	list(params) {
		return get('list', {params});
	},
	delete(params) {
		return post('delete', params);
	},
}