import { http } from "./request";
const k = '/aplApplyConfirm'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyConfirm = {
    //获取详情
    formData(params){
        return get('/formData',{params})
    },
    //编辑保存
    save(params){
        return post('/save',params)
    },
}