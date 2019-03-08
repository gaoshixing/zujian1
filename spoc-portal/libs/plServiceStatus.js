import { httpPlan as http } from "./request";
const k = '/plServiceStatus'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plServiceStatus = {
    //服务组状态列表
    list(params) {
        return get('/listData',{params})
    },

    //接案分配
    saveAssign(params) {
        return post('/saveAssign',params)
    },

    //确认接案
    saveConfirm(params) {
        return post('/saveConfirm',params)
    }
}