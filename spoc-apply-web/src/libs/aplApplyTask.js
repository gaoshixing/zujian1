import { http } from "./request";
const k = '/aplApplyTask'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyTask = {
    //获取详情
    applyDetail(params){
        return get('/applyDetail',{params})
    },
    //结案管理/我的学生子列表
    sublist(params){
        return get('/sublist',{params})
    },
    //更新截止日期
    updateDeadline(params){
        return post('/updateDeadline',params)
    },
    //我的学生筛选列表（带分页）
    listCurrentUserPage(params){
        return post('/listCurrentUserPage',params)
    },
    //结案管理筛选列表（带分页）
    listPage(params){
        return post('/listPage',params)
    },
}