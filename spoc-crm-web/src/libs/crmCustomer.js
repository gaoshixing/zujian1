import { http } from "./request";

const k = '/crmCustomer'

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crmCustomer = {
	// POST /a/ws/crm/crmCustomer/save 保存客户管理
	save(data) {
		return post('/save', data);
	},
	saveTag(tagIds,itemId,flag){
		const data = {tagIds,itemId,flag};
		return get('/saveTag', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/isPhoneExits 判断电话是否重复
	isPhoneExits(data) {
		return get('/isPhoneExits', {
			params: data,
		});
	},
	dealFallCustomer(data) {
		return get('/dealFallCustomer', {
			params: data,
		});
	},
	listUnsigned(params) {
		return post('/listUnsigned', params);
	},
	listUnsignedPage(data) {
		return post('/listUnsignedPage', data);
	},
	
	// GET /a/ws/crm/crmCustomer/findPhonePlace 查询电话号码归属地
	findPhonePlace(data) {
		return get('/findPhonePlace', {
			params: data,
		});
	},
	// POST /a/ws/crm/crmCustomer/listPage 客户管理VO列表（带分页）
	listPage(data) {
		return post('/listPage', data);
	},
	// POST /a/ws/crm/crmCustomer/updateHot 客户加急处理
	updateHot(data) {
		return post('/updateHot', data);
	},
	// GET /a/ws/crm/crmCustomer/form 编辑或客户管理详情
	form(data) {
		return get('/form', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/showMessage 查看客户聊天记录
	showMessage(data) {
		return get('/showMessage', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/showDict 查询页面字典字段
	showDict(data) {
		return get('/showDict', {
			params: data,
		});
	},
	showDictStatus(params){
        return get('/showDictStatus',{params});
    },
	// GET /a/ws/crm/crmCustomer/getTodayCusNum 查询当天已录入客户数
	getTodayCusNum(data) {
		return get('/getTodayCusNum', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/getCountryCode 查询电话的国家区号
	getCountryCode(data) {
		return get('/getCountryCode', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/listPhoneData 客户电话列表
	listPhoneData(data) {
		return get('/listPhoneData', {
			params: data,
		});
	},
	// GET /a/ws/crm/crmCustomer/getKfList 获取客服人员列表
	getKfList(data) {
		return get('/getKfList', {
			params: data,
		});
	},
	details(params){
		return get('/details',{params});
	},
	abandon(params){
        return get('/abandon',{params});
	},
	saveOwnerId(ownerId,id,flag) {
        const params = {ownerId,id,flag};
		return get('/saveOwnerId', {params});
	},
	saveCustomer(data){
		return post('/saveCustomer',data);
    },
	showDictStatus(data) {
		return get('/showDictStatus', {
			params: data
		});
	},
	batchSaveOwnerId(data){
		return post('/batchSaveOwnerId',data);
	},
	// POST /a/ws/crm/crmCustomer/importListPage 获取客户根据importId或sourceId（带分页）
	importListPage(data){
		return post('/importListPage',data);
	},
	ownerUserList(params){
		return get('/ownerUserList',{params});
	},
	// GET /a/ws/crm/crmCustomer/isWechatExits 判断微信号是否重复
	isWechatExits(params){
		return get('/isWechatExits',{params});
	},
	// POST /a/ws/crm/crmCustomer/statisticsKfList 获取客服人员的统计情况
	statisticsKfList(params){
		return post('/statisticsKfList',params);
	},
	// POST /a/ws/crm/crmCustomer/statisticsCustomer 客户统计管理
	statisticsCustomer(params){
		return post('/statisticsCustomer',params);
	},
	importDelete(params){
		return post('/importDelete',params);
	},
	// oc-crm/a/ws/sys/sysConfig/editSaleFallConfig
	// POST /a/ws/crm/crmCustomer/statisticsCustomer 客户统计管理
	statisticsCustomer(params){
		return post('/statisticsCustomer',params);
	},

	// POST /a/ws/crm/crmCustomer/batchSaveFormData 上报crm
	batchSaveFormData(params){
		return post('/batchSaveFormData',params);
	},
};