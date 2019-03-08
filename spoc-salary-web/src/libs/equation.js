import { http, baseURLSys } from "./request";

const post = (src, data) => {
	return http.post(`/salColManage/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salColManage/${src}`, data);
};

export const equation = {
    // ws/salary/salColManage/getColAll
    getColAll(params) {
        return get('getColAll', {params})
    },

    // /a/ws/salary/salColManage/checkExpress
    verifySave(params) {
        return post('checkExpress', params)
    },
    getSeniorFun(data) {
        return get('getSeniorFun', {
            params: data,
        })
    },
}