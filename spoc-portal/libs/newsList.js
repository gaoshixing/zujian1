import { httpSys as http } from './request';
const k = '/sysNotification';
const post = (u,data)=>{
	return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
	return http.get(`${k}${u}`,data);
};

export const news = {
	//主合同列表
//	list(params){
//		return post('/list',params)
//	},
	//获取通知列表
	listUserNotify(params){
		return get('/listUserNotify',{params});
	},
	//站内消息标记
	markRead(params){
		return post('/markRead',params);
	},
};