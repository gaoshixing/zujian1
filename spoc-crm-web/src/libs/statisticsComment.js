import { http } from "./request";
 
export const STATISTICSC = {
    // 图 GET /a/ws/crm/crmStatistics/reviewBar
	reviewBar(params) {
		return http.get('crmStatistics/reviewBar', {
			params
		});
    },
    
    // 列表 GET /a/ws/crm/crmStatistics/reviewList
	reviewList(params) {
		return http.get('crmStatistics/reviewList', {
			params
		});
	},

};
