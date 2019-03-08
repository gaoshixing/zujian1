import { http, } from './request';

const post = (src, data) => {
	return http.post(`/wpCrmCustomer/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpCrmCustomer/${src}`, data);
};

export const wpCrmCustomer = {
	//POST /spoc-market/a/ws/market/wpCrmCustomer/listPageRel
	listPageRel(params) {
		return post('listPageRel', params);
	},
	//GET /a/ws/market/wpMaterialText/form 编辑或文本素材详情
/* 	form(params) {
		return get('form', {params});
	}, */
};