import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salUserBasicInfo/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salUserBasicInfo/${src}`, data);
};

export const salUserBasicInfo = {

	listPage(params) {
		return post('listPage', params);
	},
	formInfo(params) {
		return get('formInfo', {params});
	},
	form(params) {
		return get('form', {params});
	},
	save(params) {
		return post('save', params);
	},
	delete(params) {
		return get('delete', {params});
	},
	export(ids) {
		// return get('export', {params});
		return `/spoc-salary/a/ws/salary/salUserBasicInfo/export?ids=${ids}`;
	},
	exportAllAttachment(data) {
		// return get('exportAllAttachment', {params});
		return `/spoc-salary/a/ws/salary/salUserBasicInfo/exportAllAttachment?userIds=${data.userIds}&exportTerm=${data.exportTerm}`;
	},
	importTemplatet(params) {
		return get('import/template', {params});
	},
	getUserBasicInfoVersion(params) {
		return get('getUserBasicInfoVersion', {params});
	},
	importUser(params) {
		return post('import/importUser', params);
	},
	saveSocialInfo(params) {
		return post('saveSocialInfo', params);
	},
}