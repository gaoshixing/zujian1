import { http } from "./request";
const k = '/plServiceMember'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plServiceMember = {
//	//主合同列表
//	list(params){
//		return post('/list',params)
//	},
	//组员列表
	listStateUser(params){
		return get('/listStateUser',{params})
	},
	//获取服务组人员列表
	findRoleIdAndOfficeIdByList(params){
		return get('/findRoleIdAndOfficeIdByList',{params})
	},
	//获取人员分配列表
	listUsPcUser(params){
		return get('/listUsPcUser',{params})
	},
	//获取人员分配列表
	listUser(params){
		return get('/listUser',{params})
	},
	//添加分配人员
	save(params){
		return post('/save',params)
	},
	//批量保存讨论组用户
	batchsaveDiscussionMember(params){
		return post('/batchsaveDiscussionMember',params)
	},
//	delete分配人员delete
	delete(params){
		return post('/delete',params)
	},
}