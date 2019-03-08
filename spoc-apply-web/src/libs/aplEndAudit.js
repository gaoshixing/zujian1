import { http } from "./request";
const k = '/aplEndAudit'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplEndAudit = {
    save(params) {
        return post('/save', params)
    },
}