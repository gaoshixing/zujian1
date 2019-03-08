import { http } from "./request";
const k = '/plReport';
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plReport = {
	//保存规划报告
	save(params){
		return post('/save',params)
	},
	//获取规划报告DTO列表（带分页）
	listPage(params){
		return get('/listPage',{params})
	},
	//获取学生列表
	listStudent(params){
		return get('/listStudent',{params})
	},
//	删除规划报告
	delete(params){
		return post('/delete',params)
	},
	//提交规划报告
	audit(params){
		return post('/audit',params)
	},
//	规划报告日志DTO列表
	listLog(params){
		return get('/listLog',{params})
	},
	form(params){
		return get('/form',{params})
	},
	updateIsParentRead(params){
		return post('/updateIsParentRead',params)
	},
	sendmail(params){
		return post('/sendmail',params)
	},
	audit(params){
		return post('/audit',params)
	},
	updateRecord(params){
		return post('/updateRecord',params)
	},
}