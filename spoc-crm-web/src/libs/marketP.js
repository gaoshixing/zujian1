import { http } from "./request";
 
export const MARKETP = {
	listManagePage(params) {
		return http.get('crmChannel/listPage', {
			params
		});
	},

	tableForm(params) {
		return http.get('crmChannel/form', {
			params
		});
	},

	tableSaveForm(params) {
		return http.post('crmChannel/save', 
			params
		);
	},
	
};