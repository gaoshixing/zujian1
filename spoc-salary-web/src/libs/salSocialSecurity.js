import { http,baseURL } from "./request";

const post = (src, data) => {
	return http.post(`/salSocialSecurity/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salSocialSecurity/${src}`, data);
};


export const salSocialSecurity = {
	getSalSocialSecurity(params) {
		return get('getSalSocialSecurity', {params});
	},
	exportExcel(params) {
		return get('exportExcel', {params});
	},
	exportExcelGet(params){
		return `${baseURL}/salSocialSecurity/exportExcel?userId=${params.userId}&year=${params.year}`;
	},
	updateBaseNum(params) {
		return post('updateBaseNum', params);
	},
}