import { http } from "./request";
const k = '/htItem'
const kR = '/htAuditRule'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const getR = (u,data)=>{
    return http.get(`${kR}${u}`,data);
};

const postR = (u,data)=>{
    return http.post(`${kR}${u}`,data);
};

export const discountTabOther = {
    // /spoc-contract/a/ws/contract/htItem/listPage
	listPage(params){
		return get('/listPage',{params})
	},
	customProductList(params){
		return get('/customProductList',{params})
	},
	updateStatus(data){
		return post('/updateStatus',data)
    },
    // /spoc-contract/a/ws/contract/htItem/uploadIsUse
	uploadIsUse(data){
		return post('/uploadIsUse',data)
    },
    // /spoc-contract/a/ws/contract/htItem/save
	saveForm(data){
		return post('/save',data)
	},
	// spoc-contract/a/ws/contract/htAuditRule/list g规则列表
	ruleList(params) {
		return getR('/list', {params})
	},
	// /spoc-contract/a/ws/contract/htAuditRule/delete  删除规则
	deleteRule(params) {
		return postR('/delete', params)
	},
	// 未设置分公司的列表 /spoc-contract/a/ws/contract/htAuditRule/unSettingCompanyList
	unSettingCompanyList(params) {
		return getR('/unSettingCompanyList', {params})
	},

	saveAuditRule(params) {
		return postR('/save', params)
	},
	formAuditRule(params) {
		return getR('/form', {params})
	},

}
