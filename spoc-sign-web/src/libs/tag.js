import { http } from "./request";
const k = '/htTag'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htTag = {
	//合同标签树形列表
	buildTree(params){
		return get('/buildTree',{params})
	}
}