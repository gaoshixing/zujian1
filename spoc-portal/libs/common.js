
import {baseURLCommon, httpCommon as http, httpCRMCommon as httpCrmC, httpChooseSchoolC as httpSchoolC, httpApplyCommon as httpApplyC } from './request';

const COMGROP= '/comGroup';
const COMGROPUUSER = '/comGroupUser';
const COMTAG = '/comTag';
const COMTASK = '/comTask';
const XFORM = '/comFormTable';
const NOTIFICATION = '/comNotification';
const COMSERVICEGROUP = '/comServiceGroup';
const COMHANDOVER = '/comHandover';
const COMSERVICESTATUS = '/comServiceStatus';
const COMSERVICEMEMBER = '/comServiceMember';
const COMFORMTABLE = '/comFormTable';
export const common = {
	
	showDictNew(data) {
		return http.get(`${COMFORMTABLE}/showDict`, {
			params: data,
		});
	},
	listUser(data) {
		return http.get(`${COMSERVICEMEMBER}/listUser`, {
			params: data,
		});
	},
	listUsPcUser(data) {
		return http.get(`${COMSERVICEMEMBER}/listUser`, {
			params: data,
		});
	},
	save(data) {
		return http.post(`${COMSERVICEMEMBER}/save`, data);
	},
	deleteMember(data) {
		return http.post(`${COMSERVICEMEMBER}/delete`, data);
	},
	findRoleIdAndOfficeIdByList(data) {
		return http.get(`${COMSERVICEMEMBER}/findRoleIdAndOfficeIdByList`, {
			params: data,
		});
	},
	listStateUser(data) {
		return http.get(`${COMSERVICEMEMBER}/listStateUser`, {
			params: data,
		});
	},
	getRoleListByWork(data) {
		return http.get(`${COMSERVICEMEMBER}/getRoleListByWork`, {
			params: data,
		});
	},
	//导出
	taskExport(params){
		if(params.ids){
			return `${baseURLCommon}/${COMTASK}/export?groupId=${params.groupId}&ids=${params.ids}`;
		}else{
			return `${baseURLCommon}/${COMTASK}/export?groupId=${params.groupId}`;
		}
	},
	listTitle(data) {
		return http.get(`${COMTASK}/listTitle`, {
			params: data,
		});
	},
    
	listSection(data) {
		return http.get(`${COMTASK}/listSection`, {
			params: data,
		});
	},
	
//  任务列表
	plListData(data) {
		return http.get(`${COMTASK}/listData`, {
			params: data,
		});
	},
	
    
	taskSave(data) {
		return http.post(`${COMTASK}/save`, data)
	},
	
//  保存任务顺序
   
	sortTask(data) {
		return http.post(`${COMTASK}/sortTask`, data)
	},
    
	plForm(data) {
		return http.get(`${COMTASK}/form`, {
			params: data,
		});
	},
	
//	修改任务时间
	updateTime(data) {
		return http.post(`${COMTASK}/updateTime`, data)
	},
	
//  保存任务进度
	updateProgress(data) {
		return http.post(`${COMTASK}/updateProgress`, data)
	},
	
//  保存任务优先级
    
	updatePriority(data) {
		return http.post(`${COMTASK}/updatePriority`, data)
	},
	
//  保存任务标签
    
	updateTags(data) {
		return http.post(`${COMTASK}/updateTags`, data)
	},
	
//  保存任务执行人
	updateExecutorId(data) {
		return http.post(`${COMTASK}/updateExecutorId`, data)
	},
	
//  保存任务隐私性
	updateVisibility(data) {
		return http.post(`${COMTASK}/updateVisibility`, data)
	},
	
	plRemindList(data) {
		return http.get(`${COMTASK}/remind/list`, {
			params: data,
		});
	},
	
//	保存任务提醒
	remindSave(data) {
		return http.post(`${COMTASK}/remind/save`, data)
	},
	
//	删除任务提醒
	remindDel(data) {
		return http.post(`${COMTASK}/remind/delete`, data)
	},
	
	//修改状态
	updateStatus(data) {
		return http.post(`${COMTASK}/updateStatus`, data)
	},
	
    
	taskDelete(data) {
		return http.post(`${COMTASK}/delete`, data)
	},
	
	
	taskListPage(data) {
		return http.get(`${COMTASK}/listPage`, {
			params: data,
		});
	},
	
	updateIsRed(data) {
		return http.get(`${COMTASK}/updateIsRed`, {
			params: data,
		});
	},
	
//	任务详情列表
	
	detailList(data) {
		return http.get(`${COMTASK}/detail/list`, {
			params: data,
		});
	},
	
	//删除评论
	detailDelete(data) {
		return http.post(`${COMTASK}/detail/delete`, data)
	},
	
	//删除评论
	
	detailSave(data) {
		return http.post(`${COMTASK}/detail/save`, data)
	},
	showDict(data) {
		return http.get(`${COMTASK}/showDict`, {
			params: data,
		});
	},
	// listUserData
	listUserData(params) {
		return http.get(`${COMTASK}/listUserData`, {
			params,
		});
	},
	countData(data) {
		return http.get(`${COMTASK}/countData`, {
			params: data,
		});
	},
	aduitList(data) {
		return http.get(`${COMHANDOVER}/aduitList`, {
			params: data,
		});
	},
	getHandoverResult(data) {
		return http.get(`${COMHANDOVER}/getHandoverResult`, {
			params: data,
		});
	},
	updateHandOver(data) {
		return http.get(`${COMHANDOVER}/updateHandOver`, {
			params: data,
		});
	},
	handoverSave(data) {
		return http.post(`${COMHANDOVER}/save`, data)
	},
	// 获取交接表对应的交接角色 GET /a/ws/plan/plHandover/listRole
	listRole(params) {
		return http.get(`${COMHANDOVER}/listRole`, {
			params
		});
	},
	getDataId(params) {
		return http.get(`${COMHANDOVER}/getDataId`, {
			params
		});
	},
	handoverForm(data) {
		return http.get(`${COMHANDOVER}/form`, {
			params: data,
		});
	},
	// 获取交接表服务阶段（不分页） a/ws/common/comHandover/listPhaseData?groupId=057e948fcc814a86b596460a598cdc03
	listPhaseData(data) {
		return http.get(`${COMHANDOVER}/listPhaseData`, {
			params: data,
		});
	},
	findAuditLog(data) {
		return http.get(`${COMHANDOVER}/findAuditLog`, {
			params: data,
		});
	},
	handoverList(data) {
		return http.post(`${COMHANDOVER}/list`, data);
	},

	listHandOverLeader(data) {
		return http.get(`${COMHANDOVER}/listHandOverLeader`, {
			params: data,
		});
	},
	handOverByGroupId(data) {
		return http.get(`${COMHANDOVER}/handOverByGroupId`,  {
			params: data,
		});
	},
	getContractAttachment(data) {
		return http.get(`${COMHANDOVER}/getContractAttachment`,  {
			params: data,
		});
	},

	allGroupHandOver(data) {
		return http.get(`${COMHANDOVER}/allGroupHandOver`,  {
			params: data,
		});
	},

    // GET /spoc-plan/a/ws/plan/plServiceGroup/getFolderName 服务组组文件夹名称
    getFolderName(params) {
        return http.get(`${COMSERVICEGROUP}/getFolderName`,{params})
    },
    //获取中方顾问
    listTeacher(params) {
        return http.get(`${COMSERVICEGROUP}/listTeacher`,{params})
    },
    // 服务组管理DTO列表（带分页）
    planServiceTree(params){
        return http.post(`${COMSERVICEGROUP}/listPage`,params)
    },
    // 创建编辑服务组
    comServiceGroupSave(params){
        return http.post(`${COMSERVICEGROUP}/save`,params)
	},
	saveDiscussion(params){
        return http.post(`${COMSERVICEGROUP}/saveDiscussion`,params)
	},
	plListPage(data) {
		return http.get(`${COMSERVICEGROUP}/listPage`, {
			params: data,
		});
	},
	plList(data) {
		return http.get(`${COMSERVICEGROUP}/list`, {
			params: data,
		});
	},
	updateHide(data) {
		return http.post(`${COMSERVICEGROUP}/updateHide`, data);
	},
	listMap(data) {
		return http.get(`${COMSERVICEGROUP}/listMap`, {
			params: data,
		});
	},
	plGetPhase(data) {
		return http.get(`${COMSERVICEGROUP}/getPhase`, {
			params: data,
		});
	},
	plListEvent(data) {
		return http.get(`${COMSERVICEGROUP}/listEvent`, {
			params: data,
		});
	},
	plStudentData(data) {
		return http.get(`${COMSERVICEGROUP}/studentData`, {
			params: data,
		});
	},
	plListTeacher(data) {
		return http.get(`${COMSERVICEGROUP}/listTeacher`, {
			params: data,
		});
	},
	plShowTime(data) {
		return http.get(`${COMSERVICEGROUP}/showTime`, {
			params: data,
		});
	},
	plGetGroupInfo(data) {
		return http.get(`${COMSERVICEGROUP}/form`, {
			params: data,
		});
	},
	plGetFolderName(data) {
		return http.get(`${COMSERVICEGROUP}/getFolderName`, {
			params: data,
		});
	},
	plSave(data) {
		return http.post(`${COMSERVICEGROUP}/save`, data);
	},
	plSaveDiscussion(data) {
		return http.post(`${COMSERVICEGROUP}/saveDiscussion`, data);
	},
	plPlanServiceTree(data) {
		return http.post(`${COMSERVICEGROUP}/planServiceTree`, data);
	},
	plSaveHandOverPlanTime(data) {
		return http.post(`${COMSERVICEGROUP}/saveHandOverPlanTime`, data);
	},
	plSaveCreateGroup(data) {
		return http.post(`${COMSERVICEGROUP}/save`, data);
	},
	plGetMyStudent(data) {
		return http.post(`${COMSERVICEGROUP}/getMyStudent`, data);
	},
	//获取服务器时间
	newDate(params){
		return http.get('/comDate/newDate',{params});
	},
	// 获取规划组
	findGroupName(params) {
		return http.get(`${COMGROP}/findGroupName`,{params});
	},
	// 根据模块查询所属分组列表
	findGroupNameByMenu(params) {
		return http.get(`${COMGROP}/findGroupNameByMenu`,{params});
	},
	
	// 获取用户信息
	getGroupUserId(params){
		return http.get(`${COMGROPUUSER}/getGroupUserId`,{params});
	},

	// 获取规划组的所有老师
	findListByUserId(params) {
		return http.get(`${COMGROPUUSER}/findListByUserId`,{params});
	},

	// 获取分组用户列表(根据分公司ID、分组ID、模块ID)
	listByAll(params) {
		return http.get(`${COMGROPUUSER}/listByAll`,{params});
	},

	// 获取组用户及学生个数
	getComUserNum(params) {
		return http.post(`${COMGROPUUSER}/getComUserNum`,params);
	},

	// replaceGroup
	replaceGroup(params) {
		return http.get(`${COMGROPUUSER}/replaceGroup`,{params});
	},
	
	// 合同标签树形列表
	buildTree(params) {
		return http.get(`${COMTAG}/buildTree`, {params});
	},

	// 获取标签管理列表（不分页
	listData(params) {
		return http.get(`${COMTAG}/listData`, {params});
	},

	// 删除标签
	deleteTag(obj) {
		return http.post(`${COMTAG}/delete`, obj);
	},

	// 添加或修改标签管理
	editTag(params) {
		return http.get(`${COMTAG}/form`, {params});
	},

	// 标签排序
	sortTag(obj) {
		return http.post(`${COMTAG}/sortTag`, obj);
	},

	// 保存标签管理
	saveTag(obj) {
		return http.post(`${COMTAG}/save`, obj);
	},
	
	// 修改标签名字
	updateTagName(obj) {
		return http.post(`${COMTAG}/updateName`, obj);
	},
	
	// 是否多选
	isManyCheck(obj) {
		return http.post(`${COMTAG}/updateMultiselect`, obj);
	},

	// 获取分组
	getUserTagList(params) {
		return http.get(`${COMTAG}/getUserTagList`, {params});
	},

	// 添加分组
	saveUserComTag(obj) {
		return http.post(`${COMTAG}/saveUserComTag`, obj);
	},

	// 删除分组
	deleteUserComTag(params) {
		return http.get(`${COMTAG}/deleteUserComTag`, {params});
	},

	// 移动分组
	saveUserComTagRel(obj) {
		return http.post(`${COMTAG}/saveUserComTagRel`, obj);
	},

	// 动态表单
	saveForm(data){
		return http.post(`${XFORM}/saveForm`,data);
	},

	saveFormData(data){
		return http.post(`${XFORM}/saveFormData`,data);
	},

	viewForm(id){
		const params = {id};
		return http.get(`${XFORM}/viewForm`,{params});
	},
	showDict(params){
		return http.get(`${XFORM}/showDict`,{params});
	},

	viewFormData(id){
		const params = {id};
		return http.get(`${XFORM}/viewFormData`,{params});
	},

	saveFormDataToken(data){
		return httpApplyC.post(`${XFORM}/saveFormDataToken`,data);
	},
	viewFormToken(params){ 
		return httpApplyC.get(`${XFORM}/viewFormToken`,{params}); 
	}, 
	viewFormDataToken(params){ 
		return httpApplyC.get(`${XFORM}/viewFormDataToken`,{params}); 
	},

	listFormDataSource(id){
		const params = {id};
		return http.get(`${XFORM}/listFormDataSource`,{params});
	},

	listFormDataSourceField(id){
		const params = {id};
		return http.get(`${XFORM}/listFormDataSourceField`,{params});
	},

	deleteFormMean(obj) {
		return http.post(`${XFORM}/delete`, obj);
	},

	// 添加或修改标签管理 GET /a/ws/common/c 添加或修改动态表单
	editTagFormMean(obj) {
		return http.get(`${XFORM}/form`, {
			params: obj
		});
	},

	// 操作表单
	handleFormMean(obj) {
		return http.get(`${XFORM}/handle`, {
			params: obj
		});
	},

	// 动态表单列表
	listFormMean(obj) {
		return http.get(`${XFORM}/list`, {
			params: obj
		});
	},

	// 动态表单DTO列表（带分页）
	listPageFormMean(obj) {
		return http.get(`${XFORM}/listPage`, {
			params: obj
		});
	},

	// POST /a/ws/common${XFORM}/ 保存动态表单
	saveFormMean(obj) {
		return http.post(`${XFORM}/save`, obj);
	},

	// 查看数据 ${XFORM}/form?id=5d746070e1804525bdd7008aaa3941d8
	getInfoFormMean(obj) {
		return http.get(`${XFORM}/form`, {
			params: obj
		});
	},

	getHandoverForm(obj) {
		return http.get(`${XFORM}/getHandoverForm`, {
			params: obj
		});
	},
	updateFormDataStatus(data) {
		return http.post(`${XFORM}/updateFormDataStatus`, data);
	},
	
	notificationPreview(notificationId){
		return http.get(`${NOTIFICATION}/preview`,{params:{notificationId}});
	},
	phoneSender(obj){
		return http.post(`${NOTIFICATION}/phoneSender`, obj);
	},
	listComPhoneSender(notificationId){
		return http.get(`${NOTIFICATION}/listComPhoneSender`,{params:{notificationId}});
	},

	//服务组状态VO列表（不分页）
	comServiceStatusListData(params){
		return http.get(`${COMSERVICESTATUS}/listData`,{params})
	},
	//接案分配
	saveAssign(params){
		return http.post(`${COMSERVICESTATUS}/saveAssign`,params)
	},
	//接案驳回  我的学生列表
	saveReject(params){
		return http.post(`${COMSERVICESTATUS}/saveReject`,params)
	},
	//确认接案
	saveConfirm(params){
		return http.post(`${COMSERVICESTATUS}/saveConfirm`,params)
	},
	//更新服务组状态
	saveStatus(params){
		return http.post(`${COMSERVICESTATUS}/saveStatus`,params)
	},
	//更新预计完成时间
	saveHandoverTime(params){
		return http.post(`${COMSERVICESTATUS}/saveHandoverTime`,params)
	},
	// 服务组人员
	listGroupByUserId(params) {
		return http.get(`${COMSERVICEMEMBER}/listGroupByUserId`, {
			params,
		})
	},
	//批量保存讨论组人员
	batchsaveDiscussionMember(params){
		return http.post(`${COMSERVICEMEMBER}/batchsaveDiscussionMember`,params)
	},
	
	// 数据管理 列表
	dataManageList(params) {
		return httpCrmC.get(`${COMFORMTABLE}/viewFormFieldAndData`, {
			params
		})
	},
	// 导出 
	exportData(params) {
		return `/spoc-crm/a/ws/common/comFormTable/exportFormData?id=${params.id}&group=${params.group}&ids=${params.ids}`
	},

	// 同步下拉框 comGroup/listTreeData
	getSyncGroup(params) {
		return httpSchoolC.get('comGroup/listTreeData', {
			params
		})
	},
	// 同步分组 comGroup/sync
	SyncGroup(params) {
		return httpSchoolC.get('comGroup/sync', {
			params
		})
	},
	// 同步信息comGroup/listTreeData
	getGroupInfo(params) {
		return httpSchoolC.get('comGroup/formSync', {
			params
		})
	}
	
};
