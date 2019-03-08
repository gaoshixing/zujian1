import { http, } from './request';

// const post = (src, data) => {
// 	return http.post(`/wpStatistics/${src}`, data);
// };

const get = (src, data) => {
	return http.get(`/wpStatistics/${src}`, data);
};

export const overView = {
    // http://localhost:8192/spoc-market/a/ws/market/wpStatistics/showGoodsAndPack
	getDate(params) {
		return get('showGoodsAndPack', {params});
	},
};