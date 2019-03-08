import { http, } from './request';

const DOCUSRC = `/aplEndAudit/`;

const post = (src, data) => {
	return http.post(`${DOCUSRC}${src}`, data);
};

const get = (src, data) => {
	return http.get(`${DOCUSRC}${src}`, data);
};

export const closeApproval = {
	listPage(data) {
		return get('listPage', {
			params: data,
		});
	},
	log(data) {
		return get('/log', {
			params: data,
		});
	},
	audit(data) {
		return post('/audit', data);
	},
};