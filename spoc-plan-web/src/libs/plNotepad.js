import { http, } from "./request";

const post = (src, data) => {
	return http.post(`/plNotebook/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/plNotebook/${src}`, data);
};

export const plNotepad = {
	list(data) {
		return get('list', {
			params: data,
		})
	},
	delete(data) {
		return post('delete', data);
	},
	form(data) {
		return get('form', {
			params: data,
		});
	},
	save(data) {
		return post('save', data)
	},
};