import { http } from "./request";

const k = '/crmChannel'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmChannel = {
	// GET /a/ws/crm/crmCustomer/isPhoneExits 判断电话是否重复
	getChannelNames(data) {
		return get('/getChannelNames', {
			params: data,
		});
	},
};