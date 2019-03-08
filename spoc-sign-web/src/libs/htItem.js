import { http } from "./request";
const k = '/htItem'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};




export const htItem = {
	listPage(params){
		return get('/listPage',{params})
	},
	list(params){
		return get('/list',{params})
	},
	/* save(data){
		return post('/save',data)
	}, */
	customProductList(data){
		return post('/customProductList',data)
	},
	updateStatus(data){
		return post('/updateStatus',data)
	},
	uploadIsUse(data){
		return post('/uploadIsUse',data)
	},
	updateIsJoinUseStatus(data){
		return post('/updateIsJoinUseStatus',data)
	},
	saveZzddConfig(data){
		return post('/saveZzddConfig',data)
	},
	getZzddConfig(params){
		return get('/getZzddConfig',{params})
	},
}
