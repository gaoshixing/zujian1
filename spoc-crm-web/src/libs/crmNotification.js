import { http } from "./request";

const k = '/crmNotification'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmNotification = {
    // POST /a/ws/crm/crmNotification/save 保存发送短信/邮件通知
	save(data) {
		return post('/save', data);
	},
};