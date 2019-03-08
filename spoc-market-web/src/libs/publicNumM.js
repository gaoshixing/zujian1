import { http,httpForm } from './request';

const post = (src, data) => {
	return http.post(`/wpApps/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpApps/${src}`, data);
};
export const publicNumM = {
    // /a/ws/market/wpApps/listData 列表
    getDataList(params) {
        return get('listData', {params})
    },    
    //     /a/ws/market/wpApps/saveStep1 保存公总号管理step1
    saveStep1(params) {
        return post('saveStep1', params)
    },
    // POST /a/ws/market/wpApps/saveStep3
    saveStep3(params) {
        return post('saveStep3', params)
    },
    saveStep4(params) {
		return httpForm.post(`/wpApps/saveStep4`, params);
    },
    // GET /a/ws/market/wpApps/form
    getDetail(params) {
        return get('form', {params})
    },
    // POST /a/ws/market/wpApps/revoke
    revoke(params) {
        return post('revoke', params)
    },

    // spoc-market/a/ws/market/wpApps/updateCreateUserFollow?appId=371d52a716dc4085a66273ea49dccd67
    sendM(params) {
        return get('updateCreateUserFollow', {params})
    },

    // 设置主公众号 http://localhost:8192/spoc-market/a/ws/market/wpApps/updateAppsIsMaster?appId=b9dd2fad6b8649e88a694118d32c2e6c&isMaster=1
    setMain(params) {
        return get('updateAppsIsMaster', {params})
    },
    // 显示 http://localhost:8192/spoc-market/a/ws/market/wpApps/updateAppsIsShow?appId=b9dd2fad6b8649e88a694118d32c2e6c&isShow=1
    isShowP(params) {
        return get('updateAppsIsShow', {params})
    },
}