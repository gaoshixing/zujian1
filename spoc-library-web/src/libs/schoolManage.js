import {http,baseURL} from "./request.js";

const k = '/ssSchool'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

/* 学校管理模块 */
export const school = {
	import(data){
		return post('/import',data);
	},
	downReport(){
		return `${baseURL}${k}/downReport`;
	},
	downloadTemplate(name){
		return `${baseURL}${k}/downloadTemplate?templateName=${name}`;
	},
	//学校列表
	schoolList(obj){
		return get('/list',{params:obj})
	},
	//批删学校列表
	delList(obj){
		return get('/batchdelete',{params:obj})
	},
	//添加和编辑学校-基本信息
	saveBasic(obj){
		return post('/saveBasic',obj)
	},
	//添加和编辑学校-排名信息
	saveSsRank(obj){
		return post('/saveSsRank',obj)
	},
	//添加奖学金
	saveSsScholarships(obj){
		return post('/saveSsScholarships',obj)
	},
	//查看学校-学校详情
	formdetails(params){
		return get('/formdetails',{params})
	},
	//查看学校-基本信息
	formBasic(params){
		return get('/formBasic',{params})
	},
	//查看学校-排名信息
	formSsRank(params){
		return get('/formSsRank',{params})
	},
	//查看学校-奖学金信息
	formSsScholarships(params){
		return get('/formSsScholarships',{params})
	},
	//学校联想
	listThink(params){
		return get('/listThink',{params})
	},
  //隶属学校联想
	  fetchListThink(schoolName){
	    return get('/listThink',{params:{schoolName}})
	  },
	//下载列表所选EXCEL
	exportSelected(params){
		return `${baseURL}${k}/exportSelected`;
	},
	//下载列表EXCEL
	exportEXCEL(params){
		return `${baseURL}${k}/export?searchType=${params.searchType}&keyword=${params.keyword}`;
	},
 }
