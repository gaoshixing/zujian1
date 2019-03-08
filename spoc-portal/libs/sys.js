import axios from 'axios';
import {
	httpSys as http,
	baseURLSys as baseURL,
	httpCRMSys as baseCRMURLSys,
	httpMarketys as baseMarketURLSys,
	httpSearch as baseURLSearch,
	httpCRM as baseURLCRM,
	httpSalary as baseURLSalary,
	httpSysDocu as httpSysDocu,
	httpCRMTimeoutOneHour as baseURLCRMTimeoutOneHour
} from './request';

const ATTACHMENT = 'attachment';
const DICT = 'dict';
const OFFICE = 'office';
const USER = 'user';
const ROLE = 'role';
const MENU = 'menu';
const SYSWORKORFER ='sysWorkorder';
const baseURLCRME = '/spoc-crm/a/ws/crm/crmCustomer'
const baseURLSALARY = '/spoc-salary/a/ws/salary/salAttendance'
const baseURLSALARYTemplate = '/spoc-salary/a/ws/salary'

export const sys = {
	logout() {
		return http.get('/logout');
	},
	autoLogin(params={}) {
		return axios.get('/index.php/autologin',{params});
	},
	roleMember(params) {
		return http.get(`/${USER}/roleMember`, {
			params
		});
	},
	rolesMember(params){
		return http.get(`/${USER}/rolesMember`, {
			params
		});
	},
	userInfoData(params) {
		return http.get(`/${USER}/userInfoData`, {
			params
		});
	},
	listAllUserMap(params) {
		return http.get(`/${USER}/listAllUserMap`, {
			params
		});
	},
	findByIds(params) {
		return http.get(`/${USER}/findByIds`, {
			params
		});
	},
	listAssigndUserMap(params) {
		return http.get(`/${USER}/listAssigndUserMap`, {
			params
		});
	},
	getUserList(params) {
		return http.get(`/${USER}/listData`, {
			params
		});
	},
	listUnAssignUserMap(params) {
		return http.get(`/${USER}/listUnAssignUserMap`, {
			params
		});
	},
	uploadImg() {
		return `${baseURL}/${USER}/uploadImg`;
	},
	// /spoc-choiceschool/a/ws/sys/user/savePhoto
	// 绑定头像地址到用户， get
	savePhoto(params) {
		return http.get(`/${USER}/savePhoto`, {
			params
		});
	},

	//POST /a/ws/sys/user/buildTmpPwd 生成临时密码
	buildTmpPwd(data) {
		return http.post(`/${USER}/buildTmpPwd`, data);
	},
	userBriefInfo(params) {
		return http.get(`/${USER}/userBriefInfo`, {
			params
		});
	},
	/*
	后端中转上传到云盘
	fileName：文件名
	files：文件流
	type, value = "附件类型（关联字典表)"
	fileType, value = "文件类型：images、flashs、medias、files",
	*/
	uploadToPan(data){
		const cfg = {
			timeout:600e3
		};
		return http.post(`/${ATTACHMENT}/uploadToPan`, data,cfg);
	},
	// GET /a/ws/sys/attachment/download download
	download(data) {
		return `/spoc-crm/a/ws/sys/${ATTACHMENT}/download?objectId=${data.objectId}&type=${data.type}&templateName=${data.templateName}`
	},
	downloadPan(filePath,fileName){
		return `${baseURL}/${ATTACHMENT}/downloadPan?filePath=${filePath}&fileName=${fileName}`;
	},
	downloadPanNew(filePath,dirName,realName){
		return `${baseURL}/${ATTACHMENT}/downloadPan?filePath=${filePath}&realName=${realName}&dirName=${dirName}`;
	},
	downloadPanCrm(obj){
		return `${baseURL}/${ATTACHMENT}/downloadPan?filePath=${obj.filePath}&realName=${obj.realName}&dirName=${obj.dirName}`;
	},
	getPanFileHistorys(data) {
		return http.post(`/${ATTACHMENT}/getPanFileHistorys`, data);
	},
	uploadPanFileToPan(data) {
		return http.post(`/${ATTACHMENT}/uploadPanFileToPan`, data);
	},
	getFilesByMenuIdAndServiceGroupId(params) {
		return http.post(`/${ATTACHMENT}/getFilesByMenuIdAndServiceGroupId`, 
			params
		);
	},
	list(params) {
		return http.get(`/${ATTACHMENT}/list`, {
			params
		});
	},
	
	getPath(params) {
		return http.get(`/${ATTACHMENT}/getPath`, {
			params
		});
	},
	// crm
	getPathCRM(params) {
		return baseCRMURLSys.get(`/${ATTACHMENT}/getPath`, {
			params
		});
	},
	// market
	getPathMarket(params) {
		return baseMarketURLSys.get(`/${ATTACHMENT}/getPath`, {
			params
		});
	},
	uploadFile(data) {
		return http.post(`/${ATTACHMENT}/uploadFile`, data);
	},
	updateRemarks(data) {
		return http.post(`/${ATTACHMENT}/updateRemarks`, data);
	},
	//	删除附件
	delete(params) {
		return http.post(`/${ATTACHMENT}/deleteFileFromPan`, params);
	},
	//文件url
	displayUrl(id) {
		return `${baseURL}/${ATTACHMENT}/display?id=${id}`;
	},
	dictListData(data) {
		return http.get(`/${DICT}/listData`, {
			params: data,
		});
	},
	//TODO 将要废除 ， 请使用上面的dictListData
	listData(params) {
		return http.get(`/${DICT}/listData`, {
			params
		});
	},
	batchListData(params) {
		return http.get(`/${DICT}/batchListData`, {
			params
		});
	},
	// 获取下拉列表
	getByType(obj) {
		return http.get(`/${DICT}/getByType`, {
			params: obj
		});
	},

	// 获取子任务下拉列表 spoc-plan/a/ws/sys/dict/listData?type=pl_task_tpl_type&parentId=8001
	getTypeList(obj) {
		return http.get(`/${DICT}/listData`, {
			params: obj
		});
	},
	loadJobTree() {
		return http.get(`/${DICT}/buildTree`);
	},
	listJobTree() {
		return http.get(`/${DICT}/listJobTree`);
	},
	// 获取字典树 /spoc-plan/a/ws/sys/dict/buildTreeNew
	// ----start
	DictBuildTreeNew(obj) {
		return http.get(`/${DICT}/buildTreeNew`, {
			params: obj
		});
	},
	// 获取字典列表  /spoc-plan/a/ws/sys/dict/listDataNew
	DictListDataNew(obj) {
		return http.get(`/${DICT}/listDataNew`, {
			params: obj
		});
	},
	// 编辑一级字典名称和分类名称 /spoc-plan/a/ws/sys/dict/categoryEdit 
	DictCategoryEdit(params){
		return http.post(`/${DICT}/categoryEdit`,params);
	},
	// 字典分类下拉列表  GET /spoc-plan/a/ws/sys/dict/categoryList
	DictCategoryList(obj) {
		return http.get(`/${DICT}/categoryList`, {
			params: obj
		});
	},
	// 批量更新排序  POST /spoc-plan/a/ws/sys/dict/dictSort 
	DictDictSort(params){
		return http.post(`/${DICT}/dictSort`,params);
	},
	// 添加字典 POST /spoc-plan/a/ws/sys/dict/save 
	DictSave(params){
		return http.post(`/${DICT}/save`,params);
	},
	// 删除字典 POST /spoc-plan/a/ws/sys/dict/delete 
	DictDelect(params){
		return http.post(`/${DICT}/delete`,params);
	},
	// -----end
	controlledList(params) {
		return http.get(`/${OFFICE}/findCompanyList`, {
			params
		});
	},
	officeForm(params) {
		return http.get(`/${OFFICE}/form`, {
			params
		});
	},
	officeListName(params) {
		return http.get(`/${OFFICE}/listName`, {
			params
		});
	},
	buildSearchTree() {
		return http.get(`/${OFFICE}/buildSearchTree`);
	},
	//获取机构列表
	officeList(obj) {
		return http.get(`/${OFFICE}/list`, {
			params: obj
		});
	},
	//获取机构列表
	getOfficeTree(obj) {
		return http.get(`/${OFFICE}/buildTree`, {
			params: obj
		});
	},
	// 获取弹窗中的模块
	dialogTag(obj) {
		return http.get('menu/listMenu', {
			params: obj
		});
	},
	listGrantMenu(params) {
		return http.get('/menu/listGrantMenu', {
			params
		});
	},
	listQuickMenu() {
		return http.get(`/${MENU}/listQuickMenu`);
	},
	listMenu() {
		return http.get(`/${MENU}/listMenu`);
	},
	// ----start
	// 获取根节点级菜单列表 GET /spoc-plan/a/ws/sys/menu/listMenu
	menuListMenu(obj) {
		return http.get(`/${MENU}/listMenu`, {
			params: obj
		});
	},
	// ----end
	listMenuRole(params) {
		return http.get(`/${ROLE}/listMenuRole`, {
			params
		});
	},
	listRole(params) {
		return http.get(`/${ROLE}/listRole`, {
			params
		});
	},
	RolelistData(params) {
		return http.get(`/${ROLE}/listData`, {
			params
		});
	},
	RolelistDataNew(params) {
		return http.get(`/${ROLE}/listMenuRole`, {
			params
		});
	},
	formRoleSync(params) {
		return http.get(`/${ROLE}/formRoleSync`, {
			params
		});
	},
	roleSync(params) {
		return http.get(`/${ROLE}/roleSync`, {
			params
		});
	},
	areaFindByName(params) {
		return baseCRMURLSys.get('/Area/findByName', {
			params
		});
	},
	// spoc-crm/a/ws/sys/Area/listLocation?id=7
	areaListLocation(params) {
		return baseCRMURLSys.get('/Area/listLocation', {
			params
		});
	},
	// spoc-crm/a/ws/sys/office/findCompanyList  获取分公司
	officeFindCompanyList(params) {
		return baseCRMURLSys.get('/office/findCompanyList', {
			params
		});
	},
	// 新消息 获取
	listUserNotify(data) {
		return http.get('/sysNotification/listUserNotify', {
			params: data,
		});
	},
	// 数据导入 start
	ssSchoolImport(data){
		return baseURLSearch.post('/ssSchool/import',data);
	},
	ssMajorImportFile(data){
        return baseURLSearch.post('/ssMajor/importFile',data);
	},
	ssSchoolMajorImportFile(data){
		return baseURLSearch.post('/ssSchoolMajor/importFile',data);
	},
	ssSchoolMajorImportGrade(data){
		return baseURLSearch.post('/ssSchoolMajor/importGrade',data);
	},
	academeManageImport(data) {
        return baseURLSearch.post('/importFile', data);
	},
	crmUploadTemplate(data) {
		// return baseCRMURLSys.post('/crmLocation/import', data);
		return baseURLCRMTimeoutOneHour.post('/crmCustomer/import', data);
	},
	crmDownLoadTemplate(data) {
		return `${baseURLCRME}/import/template`;
	},
	salaryDownLoadTemplate() { // 考勤
		return `${baseURLSALARY}/import/template`;
	},
	salaryDownLoadTemplatesSalUserBasicInfo() { //下载员工基础信息表数据EXCEL导入模板
		return `${baseURLSALARYTemplate}/salUserBasicInfo/import/template`;
	},
	downLoadImportUserErrorLog() { // 导入员工错误报告下载
		return `${baseURLSALARYTemplate}/salUserBasicInfo/import/importUserErrorLog`;
	},
	salWorkHistoryTemplate() { //下载工作经历批量导入模板
		return `${baseURLSALARYTemplate}/salWorkHistory/import/template`;
	},
	salEducationTemplate() { //下载教育经历批量导入模板
		return `${baseURLSALARYTemplate}/salUserEducation/import/template`;
	},
	salBonusPenaltyTemplate() { //下载奖励/升迁批量导入模板
		return `${baseURLSALARYTemplate}/salRewardsPenalties/import/template`;
	},
	salUserBasicInfoTemplate() { //下载础信息导入模板
		return `${baseURLSALARYTemplate}/salUserBasicInfo/import/basicDataTemplate`;
	},
	salaryDownLoadStaffTemplate() { // 社保
		return `/spoc-salary/a/ws/salary/salPerformanceInfo/import/template`;
	},
	salaryDownLoadManageTemplate() { // 薪酬
		return `/spoc-salary/a/ws/salary/salSalaryInfo/import/template`;
	},

	// 查上传参数
	crmFormData(params) {
		return baseURLCRM.get('/crmCustomerImport/form', {
			params
		});
	},

	downLoadError() {
		return `${baseURLCRME}/downReport`;
	},
	ssSchoolDownloadTemplate(name){
		return `${baseURLSearch}/ssSchool/downloadTemplate?templateName=${name}`;
	},
	ssSchoolDownReport(){
		return `${baseURLSearch}/ssSchool/downReport`;
	},
	// 数据导入 end

	// 数据管理 列表
	dataManageList(params) {
		return http.get(`${COMFORMTABLE}/viewFormFieldAndData`, {
			params
		})
	},

	// 工单管理 POST /a/ws/sys//listPage
	wordorderMList(params) {
		return http.post(`${SYSWORKORFER}/listPage`, 
			params
		)
	}, 

	// 批量关闭 POST /a/ws/sys/sysWorkorder/editStatusAll
	editStatusAll(params) {
		return http.post(`${SYSWORKORFER}/editStatusAll`, 
			params
		)
	},
	// 保存 POST /a/ws/sys/sysWorkorder/save
	workorferSave(params) {
		return http.post(`${SYSWORKORFER}/save`, 
			params
		)
	},
	// 工单管理操作（确认：不予解决(willnotfix)、确认已解决(fixed) POST /a/ws/sys/sysWorkorder/editStatusConfirm
	handleWordorder(params) {
		return http.post(`${SYSWORKORFER}/editStatusConfirm`, 
			params
		)
	},

	//  编辑或工单管理详情 GET /a/ws/sys/sysWorkorder/form
	sysWorkorderForm(params) {
		return http.get(`${SYSWORKORFER}/form`, 
			{params}
		)
	},
	editStatusView(params) {
		return http.post(`${SYSWORKORFER}/editStatusView`, 
			params
		)
	},
	editStatusMe(params) {
		return http.post(`${SYSWORKORFER}/editStatusMe`, 
			params
		)
	},
	// /a/ws/sys/user/sendVerifyCode 获取验证码
	sendVerifyCode(data) {
		return http.get(`/${USER}/sendVerifyCode`, {
			params: data,
		});
	},
	// /a/ws/sys/user/modifyPassword
	modifyPassword(data) {
		return http.post(`/${USER}/modifyPassword`, data);
	},
};

