import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpMaterialDoc/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpMaterialDoc/${src}`, data);
};

export const wpMaterialDoc = {
	//POST /a/ws/market/wpMaterialDoc/delete 删除文档素材
	delete(params) {
		return post('delete', params);
	},
	//GET /a/ws/market/wpMaterialDoc/form 编辑或文档素材详情
	form(params) {
		return get('form', {params});
	},
	//GET /a/ws/market/wpMaterialDoc/listPage 文档素材VO列表（带分页）
	listPage(params) {
		return get('listPage', {params});
	},
	//POST /a/ws/market/wpMaterialDoc/save 保存文档素材
	save(params) {
		return post('save', params);
	},
};