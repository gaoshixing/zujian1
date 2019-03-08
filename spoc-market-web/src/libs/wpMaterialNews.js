import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpMaterialNews/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpMaterialNews/${src}`, data);
};

export const wpMaterialNews = {
	//POST /a/ws/market/wpMaterialNews/delete 删除图文素材
	delete(params) {
		return post('delete', params);
	},
	//GET /a/ws/market/wpMaterialNews/form 编辑或图文素材详情
	form(params) {
		return get('form', {params});
	},
	//GET /a/ws/market/wpMaterialNews/import/template 下载图文素材数据EXCEL导入模板
	importTemplate(params) {
		return get('importTemplate', {params});
	},
	//GET /a/ws/market/wpMaterialNews/list 图文素材列表
	list(params) {
		return get('list', {params});
	},
	//GET /a/ws/market/wpMaterialNews/listData 图文素材VO列表（不分页）
	listData(params) {
		return get('listData', {params});
	},
	//GET /a/ws/market/wpMaterialNews/listPage 图文素材VO列表（带分页）
	listPage(params) {
		return get('listPage', {params});
	},
	//GET /a/ws/market/wpMaterialNews/detail 获取详情
	detail(params) {
		return get('detail', {params});
	},
	//POST /a/ws/market/wpMaterialNews/save 保存图文素材
	save(params) {
		return post('save', params);
	},
};