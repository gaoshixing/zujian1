import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salDeparture/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salDeparture/${src}`, data);
};

// 离职信息表 : Sal Departure Rest Show/Hide List Operations Expand Operations
// POST /a/ws/salary/salDeparture/activation 激活
// POST /a/ws/salary/salDeparture/changeIsSettle 更改结清状态
// GET /a/ws/salary/salDeparture/form 离职信息表详情
// POST /a/ws/salary/salDeparture/listPage 离职员工列表
// POST /a/ws/salary/salDeparture/save 保存离职信息表

export const salDeparture = {
	form(params) {
		return get('form', {params});
	},
	activation(params) {
		return get('activation', {params});
    },
    changeIsSettle(params) {
		return get('changeIsSettle', {params});
    },
    listPage(params) {
		return post('listPage', params);
    },
    save(params) {
		return post('save', params);
	},
}