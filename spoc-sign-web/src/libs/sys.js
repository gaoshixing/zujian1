import { httpCommon as http, baseURLCommon as baseURL } from "./request";
//const k = '/htContractTpl'
//const post = (u,data)=>{
//  return http.post(`${k}${u}`,data);
//};
//
//const get = (u,data)=>{
//  return http.get(`${k}${u}`,data);
//};
const ATTACHMENT = 'attachment';


export const common = {

	uploadImg() {
		return `${baseURL}/user/uploadImg`
	},
	listData(obj) {
		return http.get('/dict/listData', {
			params: obj
		})
	},
	buildSimpleTree(obj) {
		return http.get('/dict/buildSimpleTree', {
			params: obj
		})
	},
	//批量获取字典列表
	batchListData(obj) {
		return http.get('/dict/batchListData', {
			params: obj
		})
	},
	//获取机构列表
	officeList(obj){
		return http.get('/office/list', {
			params: obj
		})
	},

	uploadToPanNew(data) {
		const cfg = {
			timeout:600e3
		};
		return http.post(`/${ATTACHMENT}/uploadToPan`, data,cfg);
	},
	
	//上传文件
	uploadToPan() {
		return `${baseURL}/attachment/uploadToPan`;
	},
	uploadToPanDir() {
		return `${baseURL}/attachment/uploadToPanDir`;
	},
	//删除文件
	delete(obj) {
		return http.post('/attachment/deleteFileFromPan', obj)
	},
	//删除文件
	deleteFileFromPan(obj) {
		return http.post('/attachment/deleteFileFromPan', obj)
	},
	//文件url
	display(params) {
		return http.get('/attachment/display', {params})
	},
	//文件list
	fileList(params) {
		return http.get('/attachment/list', {params})
	},
	displayUrl(id){
		return `${baseURL}/attachment/display?id=${id}`
	},
	convertForm(id){
		return http.get('/convert/form',{params:{id}});
	},
	approverList(params){
		return http.get('/role/approverList', {params})
	},
	listAllUserMap(params){
		return http.get('/user/listAllUserMap',{params});
	},

	// 下载扫描件
	downloadSignReceipt(params){
		return (`${baseURL}/attachment/download?type=ht_contract_scan&objectId=${params.objectId}&templateName=${params.templateName}`);
	},

}