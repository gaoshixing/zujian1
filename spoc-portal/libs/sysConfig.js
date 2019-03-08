import { httpSys as http, httpCRMSys, } from './request';
const k = '/sysConfig';
const LOCATION = '/Area';
const post = (u,data)=>{
	return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
	return http.get(`${k}${u}`,data);
};

const crmPost = (u,data)=>{
	return httpCRMSys.post(`${k}${u}`,data);
};

const crmGet = (u,data)=>{
	return httpCRMSys.get(`${k}${u}`,data);
};

export const sysConfig = {
	// 系统通知方式列表
	listNotifySetting(params){
		return get('/listNotifySetting',{params});
	},
	// 系统通知方式设置-批量设置
	batchNotifySetting(params){
		return post('/batchNotifySetting',params);
	},
	// 系统通知方式设置
	notifySetting(params){
		return post('/notifySetting',params);
	},
	// 接收者设置信息
	receiptConfig(params){
		return get('/receiptConfig',{params});
	},
	// 接收者设置
	saveReceiptConfig(params){
		return post('/saveReceiptConfig',params);
	},
	// 分值设置列表
	listScoreConfig(data) {
		return crmGet('/listScoreConfig', {
			params: data,
		});
	},
	batchEditScoreConfig(data) {
		return crmPost('/batchEditScoreConfig', data);
	},

	// GET /a/ws/sys 掉落规则列表
	dropList(params) {
		return httpCRMSys.get('/sysConfig/listFallConfig', {
			params
		})
	},
	// new 
	dropListNew(params) {
		return httpCRMSys.get('/sysConfig/listFallLevel', {
			params
		})
	},
	// GET /a/ws/sys/sysConfig/ 全局掉落规则列表
	globalSetting(params) {
		return httpCRMSys.get('/sysConfig/listGlobalFallConfig', {
			params
		})
	},
	// POST /a/ws/sys/sysConfig/ 全局掉落规则列表
	editGobalSetting(params) {
		return httpCRMSys.post('/sysConfig/editGlobalFallConfig', params)
	},
	// POST /a/ws/sys/sysConfig/editFallConfig
	editSingleSetting(params) {
		return httpCRMSys.post('/sysConfig/editFallConfig', params)
	},
	// 地区表按名称搜索(搜索国家level传2,pId不传；搜索市、区pId传父级编号，level不传；)
	findByName(data) {
		return http.get(`${LOCATION}/findByName`, {
			params: data,
		});
	},
	// 国/区/州（三级联动）
	listLocation(data) {
		return http.get(`${LOCATION}/listLocation`, {
			params: data,
		});
	},
};