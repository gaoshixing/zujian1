import { http } from "./request";

const k = '/crmCustomerPub'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomerPub = {
	listPage(data) {
		return post('/listPage', data);
	},
	tmkBatchLock(data) {
		return post('/tmkBatchLock', data);
	},
	lock(data) {
		return get('/lock', {
			params: data
		});
	},
};