import { http } from "./request";
const k = '/htContractTpl'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const htContractTpl = {
	//主合同列表
	list(params){
		return post('/list',params)
	},
	//删除主合同
	delete(params){
		return get('/delete',{params})
	},
	//编辑主合同
	form(params){
		return get('/form',{params})
	},
	//保存主合同
	save(params){
		return post('/save',params)
	},
	listAccount(params){
		return get('/listAccount',{params})
	}
}