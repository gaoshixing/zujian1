import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpMaterialImage/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpMaterialImage/${src}`, data);
};

export const wpMaterialImage = {
	//POST /a/ws/market/wpMaterialImage/delete 删除图片素材
	delete(params) {
		return post('delete', params);
	},
	//GET /a/ws/market/wpMaterialImage/form 编辑或图片素材详情
	form(params) {
		return get('form', {params});
	},
	//GET /a/ws/market/wpMaterialImage/listPage 图片素材VO列表（带分页）
	listPage(params) {
		return get('listPage', {params});
	},
	//POST /a/ws/market/wpMaterialImage/save 保存图片素材
	save(params) {
		return post('save', params);
	},
};