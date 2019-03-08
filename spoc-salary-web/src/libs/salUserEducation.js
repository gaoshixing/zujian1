import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salUserEducation/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salUserEducation/${src}`, data);
};

export const salUserEducation = {
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