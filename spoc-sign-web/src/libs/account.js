import { http, baseURL, httpMarket, } from "./request";
const k = '/account'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const account = {
	//报账
	accounted(params){
		return post('/accounted',params)
	},
	//我的合同-获取报账计划详情
	formAccounted(params){
		return get('/formAccounted',{params})
	},
	//合同收款，待收款合同列表
	stayReceiptList(params){
		return get('/stayReceiptList',{params})
	},
	//合同收款，待完成已完成列表
	contractList(params){
		return get('/contractList',{params})
	},
	//报账详情
	accountDetail(params){
		return get('/accountDetail',{params})
	},
	//收款数据
	confirmReceiptForm(params){
		return get('/confirmReceiptForm',{params})
	},
	//收款记录
	findDetailByCtId(params){
		return get('/findDetailByCtId',{params})
	},
	//导出全部合同收款，待收款合同列表
	exportFile(){
		return `${baseURL}/${k}/exportFile`;
	},
	//导出所选合同收款，待收款合同列表
	exportSelected(ids){
		return `${baseURL}/${k}/exportSelected?ids=${ids}`;
	},
	//导出全部合同收款_待完成列表
	exportFileStayReceipts(){
		return `${baseURL}/${k}/exportFileStayReceipts`;
	},
	//导出所选合同收款_待完成列表
	exportFileFindStayReceiptsByIds(ids){
		return `${baseURL}/${k}/exportFileFindStayReceiptsByIds?ids=${ids}`;
	},
	//导出全部合同收款_已完成列表
	exportFileThenReceipts(){
		return `${baseURL}/${k}/exportFileThenReceipts`;
	},
	//导出所选合同收款_已完成列表
	exportFileFindThenReceiptsByIds(ids){
		return `${baseURL}/${k}/exportFileFindThenReceiptsByIds?ids=${ids}`;
	},
	//导出全部合同退款列表
	exportFileRefund(){
		return `${baseURL}/${k}/exportFileRefund`;
	},
	//导出所选合同退款列表
	exportFileRefundByIds(ids){
		return `${baseURL}/${k}/exportFileRefundByIds?ids=${ids}`;
	},
	//退款列表
	refundList(params){
		return get('/refundList',{params})
	},
	//确认收款
	confirmReceipt(params){
		return post('/confirmReceipt',params)
	},
	rejectReceipt(params){
		return post('/rejectReceipt',params)
	},
	//确认退款
	refund(params){
		return post('/refund',params)
	},
	//退款详情
	refundForm(params){
		return get('/refundForm',{params})
	},
	// 去市场营销
	sendMarket(params) {
		return httpMarket.post('/wpCrmCustomer/updateCustomerSignInfo', params)
	}
}