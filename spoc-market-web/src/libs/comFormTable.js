import { httpMarketCom as http } from "./request";

const k = '/comFormTable';

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const comFormTable = {
    list(params) {
        return http.get(`${k}/list`,{params});
    },
    formDataListPage(params) {
        return http.get(`${k}/formDataListPage`,{params});
    },
    listPageRel(params) {
        return http.get(`${k}/listPageRel`,{params});
    },
    exportFormData(params) {
        return `/spoc-market/a/ws/common/comFormTable/exportFormData?itemId=${params.itemId}&formId=${params.formId}`;
    },
//  audit(data) {
//      return post('/audit', data);
//  },
};