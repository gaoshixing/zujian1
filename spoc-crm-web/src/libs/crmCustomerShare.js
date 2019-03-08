import { http } from "./request";

const k = '/crmCustomerShare'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomerShare = {
	form(data) {
		return get('/form', data);
	},
	list(data) {
		return get('/list', {
			params: data
		});
	},
	// POST /a/ws/crm/crmCustomerShare/batchsave 批量保存共享客户
	batchsave(data) {
		return post('/batchsave', data);
	},
	userList(params){
		return get('/userList',{params})
	},
	batchShare(data) {
		return post('/batchShare', data);
	},
};