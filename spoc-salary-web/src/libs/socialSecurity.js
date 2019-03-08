import { http, httpBlob, baseURLSys } from "./request";

const post = (src, data) => {
	return http.post(`/salPerformanceInfo/${src}`, data);
};

const get = (src, data) => {
	return http.get(`/salPerformanceInfo/${src}`, data);
};

export const socialSecurityApi = {
    /*
    * 获取考勤列表头
    */
	getDoubleHeadList(data) {
		return get('getPerformanceHeadList', {
            params: data,
        });
    },
    /*
    * findPerformanceList 列表获取
    */
    findPerformanceList(data) {
        return post('findPerformanceList', data);
    },
    /*
    * index 更新头列表
    */
    saveAttendanceHeadList(data) {
        return post('updatetPerformanceHeadList', data);
    },
    /*
    * 导出 excel
    */
    exportExcel(data) {
        return httpBlob.post(`/salPerformanceInfo/exportExcel`, data);
    },
    /*
    * 更新数据
    */
    updatePerformance(data) {
        return post('updatePerformance', data);
    },
    /*
    * 保存数据 含时间
    */
    save(data) {
        return post('save', data);
    },
}