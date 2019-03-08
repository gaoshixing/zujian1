import { http } from "./request";
const k = '/docEssayTask'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const docEssayTask = {
    //获取是否显示的列名称
    listShowTile(params){
        return get('/listShowTile',{params})
    },
    //获取学生类别及完成文书数
    listApply(params){
        return get('/listApply',{params})
    },
    //文书接案管理列表(中学)
    listHS(params){
        return post('/listHS',params)
    },
    //文书接案管理列表(研究生)
    listPG(params){
        return post('/listPG',params)
    },
    //文书接案管理列表(本科)
    listUG(params){
        return post('/listUG',params)
    },
    //更新用户显示字段
    updateShowTile(params){
        return post('/updateShowTile',params);
    },
    //获取服务组下的文书列表
    listEssay(params){
        return get('/listEssay',{params});
    },
}