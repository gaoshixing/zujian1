import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salHistoryLog/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salHistoryLog/${src}`, data);
};

export const salHistoryLog = {
    // GET /a/ws/salary/salHistoryLog/list 历史记录列表
    // POST /a/ws/salary/salHistoryLog/save 保存历史记录
	list(params) {
		return get('list', {params});
	},
	save(params) {
		return post('save', params);
	},
}