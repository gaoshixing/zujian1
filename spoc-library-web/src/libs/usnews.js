import {http} from "./request.js";

const post = (u,data)=>{
    return http.post(`/usnews${u}`,data);
};

const get = (u,data)=>{
    return http.get(`/usnews${u}`,data);
};

/* 学校管理模块 */
export const usnews = {
	//添加和编辑学校-学术信息
//	saveSchool(obj){
//		return post('/saveSchool',obj)
//	},
//usnews学校数据接口
	school(params){
		return get('/school',{params})
	},
	gradeSchool(params){
		return get('/gradeSchool',{params})
	},
	//usnews学校接口
	info(params){
		return get('/school/info',{params})
	},
	//usnews申请信息接口
	applyRequire(params){
		return get('/school/applyRequire',{params})
	},
	//usnews学校排名
	rank(params){
		return get('/school/rank',{params})
	},
	//usnews奖助学金
	scholarships(params){
		return get('/school/info',{params})
	},
	gradeSchoolInfo(usnewsId){
		return get('/gradeSchool/info',{params:{usnewsId}})
	}
	
}