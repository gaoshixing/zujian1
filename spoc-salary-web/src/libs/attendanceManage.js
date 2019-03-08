import { http, httpBlob, baseURLSys } from "./request";

const post = (src, data) => {
	return http.post(`/salAttendance/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salAttendance/${src}`, data);
};

export const attendanceManageApi = {
    /*
    * 获取考勤列表头
    */
	getAttendanceHeadList(data) {
		return get('getAttendanceHeadList', {
            params: data,
        });
    },
    /*
    * 获取考勤列表
    */
    getAttendanceListByDateAndLocate(data) {
        return get('getAttendanceListByDateAndLocate', {
            params: data,
        })
    },
   /*
   * 保存列表头
   */
    saveAttendanceHeadList(data) {
        return post('saveAttendanceHeadList', data);
    },
    /*
    * 更新考勤
    */
    listAttendance(data) {
        return post('listAttendance', data);
    },
    /*
    * 导出 excel
    */
    exportExcel(data) {
        return httpBlob.post(`/salAttendance/exportExcel`, data);
    },
}