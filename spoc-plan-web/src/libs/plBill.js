import { http, } from "./request";


const post = (src, data) => {
	return http.post(`/plBill/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/plBill/${src}`, data);
};

export const plBill = {
	list(data) {
		return get('list', {
			params: data,
		});
	},
	delete(data) {
		return post('delete', data);
	},
	save(data) {
		return post('save', data);
	},
	form(data) {
		return get('form', {
			params: data,
		});
	},
	listAuditedBill(data) {
		return get('listAuditedBill', {
			params: data,
		});
	},
	listAuditBill(data) {
		return get('listAuditBill', {
			params: data,
		});
	},
	listByCurrentUser(data) {
		return get('listByCurrentUser', {
			params: data,
		})
	},
	audit(data) {
		return post('audit', data);
	},
};