import { http, baseURLSys } from "./request";

const post = (src, data) => {
	return http.post(`/salIndexRest/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salIndexRest/${src}`, data);
};

export const indexPage = {
    /*
    * 获取公司列表
    */
    getCompanyList(data) {
        return get('getCompanyList', {
            params: data,
        });
    },
    /*
    * 获取首页的信息
    */
    getIndexInfo(data) {
        return get('getIndexInfo', {
            params: data,
        });
    },
};