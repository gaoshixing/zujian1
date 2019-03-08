import { httpCRM as http } from "./request";

const k = '/crmCustomerSale'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomerSale = {
	
    listPage(params) {
		return post('/listPage', params);
    },
    // GET /a/ws/crm/crmCustomerSale/showDict 查询页面字典字段
    showDict(params){
        return get('/showDict',{params});
    },
    
    saveSaleStatus(id,status){
        const params = {id,status};
        return get('/saveSaleStatus',{params})
    },
    // GET /a/ws/crm/crmCustomerSale/getSaleList 获取销售人员列表
    getSaleList(params){
        return get('/getSaleList',{params});
    },
    // POST /a/ws/crm/crmCustomerSale/batchSaveOwnerId 批量转让客户
    batchSaveOwnerId(params) {
		return post('/batchSaveOwnerId', params);
    },
    updateStatus(params){
        return get('/updateStatus',{params});
    },
    
    // POST /a/ws/crm/crmCustomerSale/dealFallCustomer 销售库客户掉落管理
    dealFallCustomer(params) {
		return post('/dealFallCustomer', params);
    },
    showShareInfo(params){
        return get('/showShareInfo',{params});
    },

     // POST ws/crm/crmCustomerSale/getFallSettingInfo
    getFallSettingInfo(params){
        return post('/getFallSettingInfo',params);
    },
    setCircleWhiteList(params){
        return post('/setCircleWhiteList',params);
    },

    getCrmSaleFallInfo(params){
        return get('/getCrmSaleFallInfo',{params});
    },
};