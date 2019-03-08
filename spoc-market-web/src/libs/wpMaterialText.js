import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpMaterialText/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpMaterialText/${src}`, data);
};

export const wpMaterialText = {
	//POST /a/ws/market/wpMaterialText/delete 删除文本素材
	delete(params) {
		return post('delete', params);
	},
	//GET /a/ws/market/wpMaterialText/form 编辑或文本素材详情
	form(params) {
		return get('form', {params});
	},
	//GET /a/ws/market/wpMaterialText/listPage 文本素材VO列表（带分页）
	listPage(params) {
		return get('listPage', {params});
	},
	//POST /a/ws/market/wpMaterialText/save 保存文本素材
	save(params) {
		return post('save', params);
	},
};