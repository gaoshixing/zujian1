import { http } from "./request";

const k = '/crmRecord'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const recordManage = {
	listManagePage(data) {
		return get('/listManagePage', {
			params: data,
		});
	},
	listTraceLogData(data) {
		return get('/listTraceLogData', {
			params: data,
		});
	},
	saveRecordTrace(data) {
		return post('/saveRecordTrace', data);
	},
	/*
	* 录音详情
	*/
	listPage(data) {
		return post('/listPage', data);
	},
	delete(data) {
		return post('/delete', data);
	},
	listRecordLogData(data) {
		return get('/listRecordLogData', {
			params: data,
		});
	},
	// /a/ws/crm/crmRecord/saveRecordLog 保存录音操作日志
	saveRecordLog(data) {
		return post('/saveRecordLog', data);
	},
};