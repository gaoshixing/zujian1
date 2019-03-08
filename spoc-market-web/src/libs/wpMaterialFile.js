import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpMaterialFile/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpMaterialFile/${src}`, data);
};

export const wpMaterialFile = {
	//POST /a/ws/market/wpMaterialFile/delete 删除语音和视频素材
	delete(params) {
		return post('delete', params);
	},
	//GET /a/ws/market/wpMaterialFile/form 编辑或语音和视频素材详情
	form(params) {
		return get('form', {params});
	},
	//GET /a/ws/market/wpMaterialFile/listPage 语音和视频素材VO列表（带分页）
	listPage(params) {
		return get('listPage', {params});
	},
	//POST /a/ws/market/wpMaterialFile/save 保存语音和视频素材
	save(params) {
		return post('save', params);
	},
};