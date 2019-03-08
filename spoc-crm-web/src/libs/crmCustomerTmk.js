import { http, httpSys } from "./request";

const k = '/crmCustomerTmk'
const k1 = '/sysConfig'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};
const postS = (u,data)=>{
    return httpSys.post(`${k1}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomerTmk = {
	listPagePub(data) {
		return post('/listPagePub', data);
	},
	listPage(data) {
		return post('/listPage', data);
	},
	batchLock(data) {
		return post('/batchLock', data);
	},
	batchLock(data) {
		return post('/batchLock', data);
	},
	lock(data) {
		return get('/lock', {
			params: data
		});
	},
	saveStatusInvite(data){
		return post('/saveStatusInvite',data)
	},
	updateStatus(data) {
		return get('/updateStatus', {
			params: data
		});
	},
	tmkerList(data) {
		return get('/tmkerList', {
			params: data
		});
	},
	tmkStatisticsData(data) {
		return get('/tmkStatisticsData', {
			params: data
		});
	},
	// GET /a/ws/crm/crmCustomerTmk/tmkStatisticsList TMK主管统计列表
	tmkStatisticsList(data) {
		return get('/tmkStatisticsList', {
			params: data
		});
	},
	// oc-crm/a/ws/sys/sysConfig/editSaleFallConfig
	// GET /a/ws/crm/crmCustomerTmk/tmkStatisticsList TMK主管统计列表
	saveTime(data) {
		return postS('/editSaleFallConfig', data);
	},

	// ws/crm/crmCustomerTmk/jssdkInit
	TQparams(params) {
		return	get('/jssdkInit', {params})
	},

	// http://localhost:8080/spoc-crm/a/ws/crm/crmCustomerTmk/tqValid    POST/JSON
	tqValid(params) {
		return post('/tqValid', params);
	},

	allocCustomer(params) {
		return post('/allocCustomer', params);
	}
};