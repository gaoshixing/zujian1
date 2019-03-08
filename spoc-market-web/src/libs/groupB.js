import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpGoodsPack/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpGoodsPack/${src}`, data);
};

export const groupB = {
    // /spoc-market/a/ws/market/wpGoodsPack/listPage
	listPage(params) {
		return post('listPage', params);
	},
    // /spoc-market/a/ws/market/wpGoodsPack/save
	newSave(params) {
		return post('save', params);
	},
	// localhost:8192/spoc-market/a/ws/market/wpGoodsPack/getGoodsList 获取拼团商品列表
	getGoodsList(params) {
		return get('getGoodsList', {params});
	},
	// 查看form a/a/ws/market/wpGoodsPack/form?id=1e9ab4d1dff14a26b6e9e931648c7973
	getDetail(params) {
		return get('form', {params});
	},
	// 上架http://localhost:8192/spoc-market/a/ws/market/wpGoodsPack/isUse
	isUse(params) {
		return get('isUse', {params});
	},

	// spoc-market/a/ws/market/wpGoodsPack/durationPack
	timeOut(params) {
		return post('durationPack', params);
	},
};