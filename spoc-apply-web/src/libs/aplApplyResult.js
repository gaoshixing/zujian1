import { http } from "./request";
const k = '/aplApplyResult'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyResult = {
    //获取详情
    listAllPage(params){
        return post('/listAllPage',params)
    },
    list(params){
        return get('/list',{params})
    },
    //编辑保存
    save(params){
        return post('/save',params)
    },

    form(params){
        return get('/form',{params})
    },

    delete(params){
        return post('/delete',params)
    },
    modify(data) {
        return post('/modify', data);
    },
}