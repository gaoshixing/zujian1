import { http } from "./request";
export const ADMIN = {
    listPage(params) {
       return http.get('crmAllocPlan/listPage', {
           params
       });
    },

    // 管理员列表 
    adminListPage(params) {
        return http.get('crmAllocPlan/listCompanyPage', {
            params
        });
     },

    // save
    adminDetailSave(params) {
        return http.post('crmAllocPlan/save', params);
    },

    // 获取年列表
    getYearList(params) {
        return http.get('crmAllocPlan/hasDataOfYearList', {
            params
        });
    },

    getTotal(params) {
        return http.get('crmAllocPlan/getTotal', {
            params
        });
    },

    getTotalIndex(params) {
        return http.get('crmAllocPlan/getIndexTotalInfo', {
            params
        });
    }

};