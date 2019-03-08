import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpInvitingPage/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpInvitingPage/${src}`, data);
};

export const wpInvitingPage = {
	//邀请页面VO列表（带分页
	listPage(params) {
		return get('listPage', {params});
	},
	//POST /a/ws/market/wpInvitingPage/save 保存邀请页面
	save(params) {
		return post('save', params);
	},
	//编辑或邀请页面详情
	form(params) {
		return get('form', {params});
	},
};