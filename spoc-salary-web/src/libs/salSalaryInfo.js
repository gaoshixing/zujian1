import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salSalaryInfo/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salSalaryInfo/${src}`, data);
};

export const salSalaryInfo = {

	// GET /a/ws/salary/salSalaryInfo/clearErrorList 清空错误列表
	// GET /a/ws/salary/salSalaryInfo/exportErrorList 导出错误列表
	// POST /a/ws/salary/salSalaryInfo/exportExcel 导出excle
	// POST /a/ws/salary/salSalaryInfo/exportSalaryBill 员工档案--工资单
	// GET /a/ws/salary/salSalaryInfo/findPerformanceList 查询列表
	// GET /a/ws/salary/salSalaryInfo/findVersionList 薪资信息版本获取
	// GET /a/ws/salary/salSalaryInfo/form 薪资信息表详情
	// GET /a/ws/salary/salSalaryInfo/getPayBill 员工档案-工资单
	// GET /a/ws/salary/salSalaryInfo/getPerformanceHeadList 获取头列表
	// POST /a/ws/salary/salSalaryInfo/import 导入绩效考核数据EXCEL
	// GET /a/ws/salary/salSalaryInfo/import/template 下载绩效考核数据EXCEL导入模板
	// POST /a/ws/salary/salSalaryInfo/save 保存薪资信息表
	// POST /a/ws/salary/salSalaryInfo/updatePerformance 更新薪资信息
	// POST /a/ws/salary/salSalaryInfo/updatetPerformanceHeadList 更新头列表

	clearErrorList(params) {
		return get('clearErrorList', {params});
	},
	exportErrorList(params) {
		return get('exportErrorList', {params});
	},
	findPerformanceList(params) {
		return get('findPerformanceList', {params});
	},
	findVersionList(params) {
		return get('findVersionList', {params});
	},
	form(params) {
		return get('form', {params});
	},
	getPayBill(params) {
		return get('getPayBill', {params});
	},
	getPerformanceHeadList(params) {
		return get('getPerformanceHeadList', {params});
	},
	importTemplate(params) {
		return get('import/template', {params});
	},
	exportExcel(params) {
		return post('exportExcel', params);
	},
	exportSalaryBill(params) {
		return post('exportSalaryBill', params);
	},
	import(params) {
		return post('import', params);
	},
	save(params) {
		return post('save', params);
	},
	updatePerformance(params) {
		return post('updatePerformance', params);
	},
	updatetPerformanceHeadList(params) {
		return post('updatetPerformanceHeadList', params);
	},
}