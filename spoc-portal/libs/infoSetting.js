import { httpSys as http } from './request';
const k = '/sysNotificationUserSetting';
const post = (u,data)=>{
	return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
	return http.get(`${k}${u}`,data);
};

export const infoSet = {
	//主合同列表
//	list(params){
//		return post('/list',params)
//	},
	//系统通知方式列表接收设置
	listNotifySetting(params){
		return get('/listNotifySetting',{params});
	},
	//	保存用户接收设置
	saveUserSetting(params){
		return post('/saveUserSetting',params);
	},
	//	批量操作-某个通知方式的接收设置
	batchSaveUserSetting(params){
		return post('/batchSaveUserSetting',params);
	},
};