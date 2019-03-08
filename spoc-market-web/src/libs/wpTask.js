import { http, baseURLSys1} from './request';

const post = (src, data) => {
	return http.post(`/wpTask/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpTask/${src}`, data);
};

export const wpTask = {
	listPage(data) {
		return post('listPage', data);
	},
	save(data) {
		return post('save', data)
	},
	form(data) {
		return get('form', {
			params: data,
		});
	},
	showReason(data) {
		return get('showReason', {
			params: data,
		});
	},
	readObjectForm(data) {
		return get('readObjectForm', {
			params: data,
		});
	},
};