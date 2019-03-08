import { http } from "./request";
const k = '/htPolicy'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

const k2 = '/htRule'
const hpost = (u,data)=>{
    return http.post(`${k2}${u}`,data);
};

const hget = (u,data)=>{
    return http.get(`${k2}${u}`,data);
};



export const htPolicy = {
	//优惠政策列表
	list(params){
		return get('/list',{params})
	},
	listData(params){
		return get('/listData',{params})
	},
	//优惠政策列表
	listDataSelfGroup(params){
		return get('/listDataSelfGroup',{params})
	},
	save(data){
		return post('/save',data)
	},
	delete(id){
		return post('/delete',{id})
	},
	deleteItem(id){
		return post('/deleteItem',{id})
	},
	saveItem(data){
		return post('/saveItem',data)
	},
	updateName(data){
		return post('/updateName',data);
	}

}

export const htRule = {
	list(params){
		return hget('/list',{params})
	},
	save(data){
		return hpost('/save',data)
	},
}