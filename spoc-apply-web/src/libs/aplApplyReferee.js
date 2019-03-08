import { http } from "./request";
const k = '/aplApplyReferee'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyReferee = {
    // POST /a/ws/apply/aplApplyReferee/delete 删除推荐人
    delete(params){
        return post('/delete',params)
    },
    // GET /a/ws/apply/aplApplyReferee/form 编辑或推荐人详情
    form(params){
        return get('/form',{params})
    },
    // GET /a/ws/apply/aplApplyReferee/list 推荐人列表
    list(params){
        return get('/list',{params})
    },
    // POST /a/ws/apply/aplApplyReferee/save 保存推荐人
    save(params){
        return post('/save',params)
    },
}