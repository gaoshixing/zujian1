import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salPerformanceInfo/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salPerformanceInfo/${src}`, data);
};

export const salPerformanceInfo = {
	findPerformanceList(params) {
		return get('findPerformanceList', {params});
	},
	getPerformanceHeadList(params) {
		return get('getPerformanceHeadList', {params});
	},
	importTemplate(params) {
		return get('import/template', {params});
	},
	list(params) {
		return get('list', {params});
	},
	updatetPerformanceHeadList(params) {
		return get('updatetPerformanceHeadList', {params});
	},
	save(params) {
		return post('save', params);
	},
	findVersionNameList(params) {
		return get('findVersionNameList', {params});
	},
	findVersionByEffectDate(params) {
		return get('findVersionByEffectDate', {params});
	},
}