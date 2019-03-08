import { http } from "./request";

const k = '/wpAuditLog';
const g = '/wpGoods';
const p = '/wpGoodsPack';

const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const crossSellAduit = {
    list(data) {
        return http.get(`${k}/listPage`,{
            params: data,
        });
    },
    gForm(data) {
        return http.get(`${g}/form`,{
            params: data,
        });
    },
    pForm(data) {
        return http.get(`${p}/form`,{
            params: data,
        });
    },
    audit(data) {
        return post('/audit', data);
    },
};