
import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpAppsFollow/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpAppsFollow/${src}`, data);
};
const getO = (src, data) => {
	return http.get(`/wpOrder/${src}`, data);
};
const postO = (src, data) => {
	return http.post(`/wpOrder/${src}`, data);
};
const getTa = (src, data) => {
	return http.get(`/wpRebate/${src}`, data);
};
const postTa = (src, data) => {
	return http.post(`/wpRebate/${src}`, data);
};

const getR = (src, data) => {
	return http.get(`/wpAuditLog/${src}`, data);
};
const postC = (src, data) => {
	return http.post(`/wpSpreadDetail/${src}`, data);
};

const getCrm = (src, data) => {
	return http.get(`/wpCrmCustomer/${src}`, data)
}

export const expandMan = {
    // spoc-market/a/ws/market/wpAppsFollow/listPage
	listPage(params) {
		return post('listPage', params);
	},
    //a/ws/market/wpAppsFollow/update
	update(params) {
		return post('update', params);
	},

	// /spoc-market/a/ws/market/wpAppsFollow/form?openid=oW0hA1Ygl0jKwBSig118jJibZ04E
	form(params) {
		return get('form', {params});
	},
	// http://localhost:8192/spoc-market/a/ws/market/wpAuditLog/list?objectId=oW0hA1Ygl0jKwBSig118jJibZ04E
	rejectList(params) {
		return getR('list', {params});
	},
	// ost:8192/spoc-market/a/ws/market/wpAppsFollow/exportPromoter
	exportData(params) {
		return `spoc-market/a/ws/market/wpAppsFollow/exportPromoter?pageNo=${params.pageNo}&pageSize=${params.pageSize}&name=${params.name}&status=${params.status}&salerFlag=1&appId=${params.appId}&isUse=${params.isUse}`
	},

	//  /a/ws/market/wpSpreadDetail/listPage
	expandCaseList(params) {
		return postC('listPage', params)
	},

	// /spoc-market/a/ws/market/wpAppsFollow/getNum
	getNum(params) {
		return get('getNum', {params})
	},

	// http://localhost:8192/spoc-market/a/ws/market/wpAppsFollow/getSaleInfo
	marketMform(params) {
		return get('getSaleInfo', {params});
	},
	// http://localhost:8192/spoc-market/a/ws/market/wpRebate/listPage?openId=123 返利table
	tableList(params) {
		return getTa('listPage', {params})
	},

	// http://localhost:8192/spoc-market/a/ws/market/wpRebate/save 保存返利
	saveTable(params) {
		return postTa('save', params)
	},

	// et/a/ws/market/wpOrder/listSuccessPage?spreadId=cc5df3ac0c13450bbfb2860588b8c493 成功推广列表
	succList(params) {
		return getO('listSuccessPage', {params})
	},

	// http://localhost/spoc-market/a/ws/market/wpOrder/updateContractNo
	editSignNun(params) {
		return postO('updateContractNo', params)
	},

	// /spoc-market/a/ws/market/wpCrmCustomer/getNoRebateHtList?openId=oiq2z0pSqPZ3AilulSlBWoUzaKn8
	NoRebateList(params) {
		return getCrm('getNoRebateHtList', {params})
	}
};