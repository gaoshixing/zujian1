import { http, } from "./request";

const postUser = (src, data) => {
	return http.post(`/plBillUserSetting/${src}`, data);
};

const getUser = (src, data) => {
	return http.get(`/plBillUserSetting/${src}`, data);
};
const postLevel = (src, data) => {
	return http.post(`/plBillLevelSetting/${src}`, data);
};

const getLevel = (src, data) => {
	return http.get(`/plBillLevelSetting/${src}`, data);
};

export const plRateUser = {
	list(data) {
		return getUser('list', {
			params: data,
		});
	},
	saveBatch(data) {
		return postUser('saveBatch', data);
	},
	save(data) {
		return postUser('save', data);
	},
};
export const plRateLevel = {
	// 获取账单级别费率设置列表
	list(data) {
		return getLevel('list', {
			params: data,
		})
	},
	saveBatch(data) {
		return postLevel('saveBatch', data);
	},
};