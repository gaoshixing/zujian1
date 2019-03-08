import { http, baseURLSys1} from './request';

const post = (src, data) => {
	return http.post(`/wpGoods/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpGoods/${src}`, data);
};

export const wpGoods = {
	listPage(params) {
		return post('listPage', params);
	},
	form(params) {
		return get('form', {params});
	},
	save(params) {
		return post('save', params);
	},
	getUploadFileUrl() {
		return baseURLSys1 + '/attachment/uploadToPan'
	},
	isUse(params) {
		return get('isUse', {params});
	},
};