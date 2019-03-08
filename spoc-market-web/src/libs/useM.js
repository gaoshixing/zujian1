import { http, baseURL } from './request';

const post = (src, data) => {
	return http.post(`/wpAppsFollow/${src}`, data);
};
const postTag = (src, data) => {
	return http.post(`/wpTag/${src}`, data);
};

const getTag = (src, data) => {
	return http.get(`/wpTag/${src}`, data);
};
const get = (src, data) => {
	return http.get(`/wpAppsFollow/${src}`, data);
};
export const useM = {
    // POST /a/ws/market/wpAppsFollow/userList 列表
    getDataList(params) {
        return post('userList', params)
    },    
    //   GET /a/ws/market/wpAppsFollow/export  导出
    exportData(params) {
        return `${baseURL}/wpAppsFollow/export?name=${params.name}&appId=${params.appId}`
    },
    //   GET /a/ws/market/wpAppsFollow/export  导出
    exportDataSelect(params) {
        return `${baseURL}/wpAppsFollow/export?name=${params.name}&openIds=${params.openIds}`
    },
    // POST /a/ws/market/wpTag/save
    saveTag(params) {
        return  postTag('save', params)
    },
    // POST /a/ws/market/wpTag/tagging
    tagging(params) {
        return  postTag('tagging', params)
    },
    // GET /a/ws/market/wpTag/list
    allTag(params) {
        return getTag('list', {params})
    },
    // 备注 2/spoc-market/a/ws/market/wpAppsFollow/update
    addRemarks(params) {
        return  post('update', params)
    },
    // /spoc-market/a/ws/market/wpAppsFollow/getUser?openId=oW0hA1VrZJF2s3PvyXP2F9sE62sI
    form(params) {
        return get('getUser', {params})
    }

}