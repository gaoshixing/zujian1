import { httpSchool as http, } from "./request";


const post = (src, data) => {
	return http.post(`/xxStudent/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/xxStudent/${src}`, data);
};

export const xxStudent = {
	getFormData(data) {
		return get('getFormData', {
			params: data,
		});
	},
};