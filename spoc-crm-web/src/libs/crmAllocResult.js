import { http } from "./request";

const k = '/crmAllocResult'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmAllocResult = {
	// GET /a/ws/crm/crmCustomer/isPhoneExits 判断电话是否重复
//	isPhoneExits(data) {
//		return get('/isPhoneExits', {
//			params: data,
//		});
//	},
//保存分单结果(销售)
	saveSaler(params) {
		return post('/saveSaler', params);
	},
	statisticsAlloc(params) {
		return post('/statisticsAlloc', params);
	},
    statisticsFdList(params) {
      return post('/statisticsFdList', params);
    },
//保存分单结果(公司)
	saveCompany(params) {
		return post('/saveCompany', params);
	},
	listPage(params) {
		return post('/listPage', params);
	},
	withdraw(params) {
		return get('/withdraw', {params});
	},
	getAllocHotInfo(params){
		return get('/getAllocHotInfo', {params});
	}
};