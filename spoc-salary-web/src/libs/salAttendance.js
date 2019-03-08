import { http } from "./request";

const post = (src, data) => {
	return http.post(`/salAttendance/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salAttendance/${src}`, data);
};

export const salAttendance = {

    // GET /a/ws/salary/salAttendance/getAttendanceHeadList 获取考勤列表头
    // GET /a/ws/salary/salAttendance/getAttendanceListByDateAndLocate 获取考勤列表
    // POST /a/ws/salary/salAttendance/import 导入考勤表数据EXCEL
    // GET /a/ws/salary/salAttendance/import/template 下载考勤表数据EXCEL导入模板
    // GET /a/ws/salary/salAttendance/listAttendance 员工档案-考勤表
    // GET /a/ws/salary/salAttendance/saveAttendanceHeadList 保存考勤列表头

	getAttendanceHeadList(params) {
		return get('getAttendanceHeadList', {params});
    },
    getAttendanceListByDateAndLocate(params) {
		return get('getAttendanceListByDateAndLocate', {params});
    },
    template(params) {
		return get('template', {params});
    },
    listAttendance(params) {
		return get('listAttendance', {params});
    },
    saveAttendanceHeadList(params) {
		return get('saveAttendanceHeadList', {params});
	},
	import(params) {
		return post('import', params);
	},
}