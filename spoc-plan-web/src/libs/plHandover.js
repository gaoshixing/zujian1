import { http} from "./request";

const post = (src, data) => {
	return http.post(`/plHandover/${src}`, data);
};


const get = (src, data) => {
	return http.get(`/plHandover/${src}`, data);
};


export const plHandover = {
	aduitList(data) {
		return get('aduitList', {
			params: data,
		});
	},
	form(data) {
		return get('form', {
			params: data,
		});
	},
	save(data) {
		return post('save', data)
	},
	list(data) {
		return post('list', data);
	},
	getHandoverResult(data) {
		return get('getHandoverResult', {
			params: data,
		});
	},
	updateHandOver(data) {
		return get('updateHandOver', {
			params: data,
		});
	},

	// 获取交接表对应的交接角色 GET /a/ws/plan/plHandover/listRole
	listRole(params) {
		return get('listRole', {
			params
		});
	},

};