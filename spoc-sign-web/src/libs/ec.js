import { http } from "./request";
import { httpCRM , common } from "@public/libs/request"
const k = '/ec'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};


export const ec = {
    channels(){
        return get('/channels');
    },
    find(ecId){
        return get('/find',{params:{ecId}});
    },
    // a/ws/crm/crmCustomer/getHtContractByCode?cusCode=00000457
    getHtContractByCode(cusCode){
        return httpCRM.get('/crmCustomer/getHtContractByCode',{params:{cusCode}})
    },
    // http://project.ivygate.cn:10081/zentao/bug-view-436.html
    newChannels(){
        return common.listData({parent:8007});
    }

};
