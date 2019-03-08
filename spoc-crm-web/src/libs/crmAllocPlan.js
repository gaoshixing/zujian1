import { http } from "./request";

const k = '/crmAllocPlan'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmAllocPlan = {
	// GET /a/ws/crm/crmCustomer/isPhoneExits 判断电话是否重复
//	isPhoneExits(data) {
//		return get('/isPhoneExits', {
//			params: data,
//		});
//	},
	listUnsignedBySaler(params) {
		return post('/listUnsignedBySaler', params);
	},
	listUnsignedByCompany(params) {
		return post('/listUnsignedByCompany', params);
	},
	customerStatistic(params) {
		return post('/customerStatistic', params);
	},
	formFd(data) {
		return get('/formFd', {
			params: data,
		});
	},
	
};