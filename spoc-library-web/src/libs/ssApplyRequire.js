import {http} from "./request.js";

const post = (u,data)=>{
    return http.post(`/ssApplyRequire${u}`,data);
};

const get = (u,data)=>{
    return http.get(`/ssApplyRequire${u}`,data);
};

/* 学校管理模块 */
export const ssApplyRequire = {
	//添加和编辑学校-申请信息
	save(obj){
		return post('/save',obj)
	},
	form(params){
		return get('/form',{params})
	},
}