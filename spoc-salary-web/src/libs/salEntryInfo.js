import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salEntryInfo/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salEntryInfo/${src}`, data);
};

const postSocialSecurity = (src, data) => {
	return http.post(`/salSocialSecurity/${src}`, data);
};

const getSocialSecurity= (src, data) => {
	return http.get(`/salSocialSecurity/${src}`, data);
};

export const salEntryInfo = {
	form(params) {
		return get('form', {params});
	},
	save(params) {
		return post('save', params);
	},
	getSalSocialSecurity(params) {
		return getSocialSecurity('getSalSocialSecurity', {params});
	},
	findVersionList(params) {
		return get('findVersionList', {params});
	},
}