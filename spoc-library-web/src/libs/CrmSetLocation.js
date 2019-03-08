import { httpCreate, } from '@public/libs/request';

export const baseURL = '/spoc-crm/a/ws/crm';

export const http = httpCreate(baseURL);

export const TEMPLATE = {
	template() {
		return http.get('/crmLocation/import/template');
	},
	uploadTemplate(data) {
		return http.post('/crmLocation/import', data);
	},
};