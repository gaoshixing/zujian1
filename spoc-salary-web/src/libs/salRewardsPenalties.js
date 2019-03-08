import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salRewardsPenalties/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salRewardsPenalties/${src}`, data);
};

export const salRewardsPenalties = {
	list(params) {
		return get('list', {params});
	},
	save(params) {
		return post('save', params);
    },
    delete(params) {
		return post('delete', params);
	},
}