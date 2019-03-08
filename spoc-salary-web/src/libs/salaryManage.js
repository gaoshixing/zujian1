import { http, httpBlob, baseURLSys } from "./request";

const indexPost = (src, data) => {
	return http.post(`/salSalaryInfo/${src}`, data);
};

const indexGet = (src, data) => {
	return http.get(`/salSalaryInfo/${src}`, data);
};

const rulePost = (src, data) => {
	return http.post(`/salRule/${src}`, data);
};

const ruleGet = (src, data) => {
	return http.get(`/salRule/${src}`, data);
};

const managePost = (src, data) => {
	return http.post(`/salColManage/${src}`, data);
};

const manageGet = (src, data) => {
	return http.get(`/salColManage/${src}`, data);
};


export const salaryManageApi = {
    /*
    * index 获取列表头
    */
    getPerformanceHeadList(data) {
        return indexGet('getPerformanceHeadList', {
            params: data,
        });
    },
    /*
    * index 查询列表
    */
    findPerformanceList(data) {
        return indexPost('findPerformanceList', data);
    },
    /*
    * index 更新头列表
    */
    saveAttendanceHeadList(data) {
        return indexPost('updatetPerformanceHeadList', data);
    },
    /*
    * 更新数据
    */
    updatePerformance(data) {
        return indexPost('updatePerformance', data);
    },
    /*
    * 保存数据 含时间
    */
    save(data) {
        return indexPost('save', data);
    },
    /*
    * 导出 excel
    */
    exportExcel(data) {
        return httpBlob.post(`/salSalaryInfo/exportExcel`, data);
    },
    /*
    * rule 规则表列表（带分页）
    */
    salaryRuleListPage(data) {
        return rulePost('listPage', data);
    },
    /*
    * rule 获取规则详细信息
    */
    salaryRuleForm(data) {
        return ruleGet('form', {
            params: data,
        });
    },
    /*
    * rule 保存规则表
    */
    salaryRuleSave(data) {
        return rulePost('save', data);
    },
    /*
    * manage listPage
    */
    salaryManageListPage(data) {
        return managePost('listPage', data);
    },
    /*
    * manage form
    */
    salaryManageForm(data) {
        return manageGet('form', {
            params: data,
        });
    },
    /*
    * manage save
    */
    salaryManageSave(data) {
        return managePost('save', data);
    },
    /*
    * manage updateSort
    */
    salaryManageUpdateSort(data) {
        return managePost('updateSort', data);
    },
    /*
    * manage isUse
    */
    salaryManageIsUse(data) {
        return managePost('isUse', data);
    },
    /*
    * saveStep
    */
   saveStep(data) {
       return managePost('saveStep', data);
   },
}