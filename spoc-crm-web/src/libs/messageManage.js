import { http } from "./request";

const k = '/crmNotification';

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const messageManage = {
	listCrmNotificationPage(data) {
		return get('/listCrmNotificationPage', {
			params: data,
		});
	},
	listAuditLog(data) {
		return get('/listAuditLog', {
			params: data,
		});
	},
	form(data) {
		return get('/form', {
			params: data,
		});
	},
	audit(data) {
		return post('/audit', data);
	},
	save(data) {
		return post('/save', data);
	},
};