import { http } from "./request";
const k = '/plFile'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plFile = {
//	//主合同列表
//	list(params){
//		return post('/list',params)
//	},
	//获取文件管理列表
	list(params){
		return get('/list',{params})
	},
//	获取文件更新日志
	listFileLog(params){
		return get('/listFileLog',{params})
	},
//	保存更新文件
	save(params){
		return post('/save',params)
	},
}