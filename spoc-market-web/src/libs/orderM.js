import { http, httpPlanCom} from './request';

const post = (src, data) => {
	return http.post(`/wpOrder/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/wpOrder/${src}`, data);
};

const getC = (src, data) => {
	return httpPlanCom.get(`/comFormTable/${src}`, data);
};

export const orderM = {
    // /wpOrder/listPage?objectCode=&code=&status=
	listPage(params) {
		return post('listPage', params);
	},
    // GET /a/ws/market/wpOrder/form
	form(params) {
		return get('form', {params});
	},
    // POST /a/ws/market/wpOrder/outPrice
	outPrice(params) {
		return post('outPrice', params);
	},
    // /market/wpOrder/close
	delete(params) {
		return post('close', params);
	},
	listPagePost(params) {
		return post('listPage', params);
	},
	doubtStatus(data) {
		return post('doubtStatus', data);
	},
	// common/comFormTable/viewFormData
	/**
	 * 
	 * @param {/ws/common/comFormTable/viewForm/ws/common/comFormTable/viewFormData} params 
	 */
	jsonData(params) {
		return getC('viewFormData', {params});
	},
	viewJson(params) {
		return getC('viewForm', {params});
	}
};