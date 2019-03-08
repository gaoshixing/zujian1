import { http } from "./request";

const k = "/crmTrace";

const post = (u, data) => {
	return http.post(`${k}${u}`, data);
};

const get = (u, data) => {
	return http.get(`${k}${u}`, data);
};

export const crmTrace = {
	listMonthData(params) {
		return get("/listMonthData", {params});
	},
	listDate(data) {
		return get("/listDate", {
			params: data
		});
	},
	save(data){
		return post('/save',data);
	},
	getCallPlanConfig(){
		return get('/getCallPlanConfig')
	},
	showDictType(){
		return get('/showDictType')
	},
	listData(stamp,cusId,types){
		const params = { stamp,cusId,types };
		return get('/listData',{params});
	}
};
