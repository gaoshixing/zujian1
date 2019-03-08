import { http } from "./request";

const POST = (u,data)=>{
    return http.post(`/htClass${u}`,data);
};

const GET = (u,data)=>{
    return http.get(`/htClass${u}`,data);
};
/*合同分类模块*/
export const CONTRACTCATEGORY = {
	//获取合同分类树形列表
	fetchBuildTree(){
		return GET('/buildTree')
	}
}