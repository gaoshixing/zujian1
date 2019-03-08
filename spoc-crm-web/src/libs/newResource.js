import { http } from "./request";

const k = '/crmCustomerSale'
const k1 = '/crmStatistics'

const post = (u,data)=>{
    return http.post(`${k1}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const get1 = (u,data)=>{
    return http.get(`${k1}${u}`,data);
};

export const newResource = {
	// 跟进人：a/ws/crm/crmCustomerSale/getSaleList?companyId=174
	saleList(data) {
		return get('/getSaleList', {
			params: data,
		});
	},
	// a/ws/crm/crmStatistics/resourceList
	getList(data) {
		return post('/resourceList', data);
	},
	// http://localhost:8080/a/ws/crm/crmStatistics/exportRresource
	exportRresource(data) {
		return `spoc-crm/a/ws/crm/crmStatistics/exportRresource?name=${data.name}&ids=${data.ids||''}&userId=${data.userId}&tags=${data.tags}&officeId=${data.officeId}&startTime=${data.startTime}&endTime=${data.endTime}&createType=${data.createType}&orderType=${data.orderType}&sort=${data.sort}&star=${data.star}&phase=${data.phase}&pageNo=${data.pageNo}&pageSize=${data.pageSize}&`
	},
};