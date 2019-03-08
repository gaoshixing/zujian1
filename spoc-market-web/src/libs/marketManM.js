import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpSaler/${src}`, data);
};
const postF = (src, data) => {
	return http.post(`/wpAppsFollow/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpSaler/${src}`, data);
};
export const marketManM = {
    //  GET /a/ws/market/wpSaler/listPage 市场人员列表
    getDataList(params) {
        return post('listPage', params)
    },    
    //  http://localhost:8192/spoc-market/a/ws/market/wpSaler/export 导出
    exportData(params) {
        return `/spoc-market/a/ws/market/wpSaler/export?status=${params.status}&appId=${params.appId}&name=${params.name}`
    },    

    // POST /a/ws/market/wpSaler/update 修改市场人员状
    changeStatus(params) {
        return post('update', params)
    },

   //  localhost:8192/spoc-market/a/ws/market/wpSaler/update
   updateStatus(params) {
        return post('update', params)
    },
   //  locals/market/wpAppsFollow/findOpenId
   findOpenId(params) {
        return postF('findOpenId', params)
    },
}