import { http } from "./request";
const k = '/aplApplyResource'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyResource = {
    //获取详情
    listLevel(params){
        return get('/listLevel',{params})
    },
    //编辑保存
    save(params){
        return post('/save',params)
    },
    delete(params){
        return post('/delete',params)
    },
    saveStatus(params){
        return post('/saveStatus',params)
    },

    //GET /a/ws/apply/aplApplyResource/listLog
    listLog(params){
        return get('/listLog',{params})
    },
}