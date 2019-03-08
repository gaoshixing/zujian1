import { http , baseURL } from "./request";
const k = '/htContract'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const contract = {
	//添加或修改合同
	form(params){
		return get('/form',{params})
	},
	//合同列表
	list(params){
		return get('/list',{params})
	},
	//我的合同-获取预约/签约信息
	formSign(params){
		return get('/formSign',{params})
	},
	//关闭合同
	closeContract(params){
		return post('/closeContract',params)
	},
	//预约签约
	expect(params){
		return post('/expect',params)
	},
	//我的合同-立即签约
	sign(params){
		return post('/sign',params)
	},
	save(data){
		return post('/save',data)
	},
	preview(data){
		return post('/preview',data)
	},
	formPreview(params){
		return get('/formPreview',{params})
	},
	downloadUrl(id){
		return `${baseURL}${k}/download?id=${id}`;
	},
	//催办
	urgeAudit(params){
		return post('/urgeAudit',params)
	},
	//合作合同
	listPartnerShip(params){
		return get('/listPartnerShip',{params})
	},
	//取消关闭
	cancelCloseContract(params){
		return post('/cancelCloseContract',params)
	},
	//我的合同-获取存档
	formArchive(params){
		return get('/formArchive',{params})
	},
	//立即存档
	archive(params){
		return post('/archive',params)
	},
	//日志
	listOptLog(params){
		return get('/listOptLog',{params})
	},
	//发送家长
	sendEmailAudit(params){
		return post('/sendEmailAudit',params)
	},
	//电子改造
	seal(params){
		return post('/seal',params)
	},
	//发送家长-时效检查
	urlCheck(params){
		return get('/urlCheck',{params})
	},
	//发送家长-获取文件
	pdfview(params){
		return `${baseURL}${k}/pdfview?${params}`;
	},
	//PDF
	displayUrl(params){
		return `${baseURL}${k}/display?id=${params}`;
	},
	calculteContract(params){
		return post('/calculteContract',params);
	},
	handover(params){
		return post('/handover',params);
	},
	checkPhone(phone,apply){
		return get('/checkPhone',{params:{phone,apply}});
	},
	getHtContractByEcIdAndPhone(params){
		return get('/getHtContractByEcIdAndPhone',{params})
	},
	
}