import { http } from "./request";
const k = '/aplApplyInfo'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const aplApplyInfo = {
    //获取详情
    form(params){
        return get('/form',{params})
    },
    //编辑保存
    save(params){
        return post('/save',params)
    },
    // 申请信息 列表
    listPage(data) {
        return post('/listAllPage', data);
    },
    // 申请结果 列表 GET /a/ws/apply/aplApplyResult/listPage
    applyResultListPage(data) {
        return http.post('/aplApplyResult/listPage', data);
    },
    // 入读信息GET /a/ws/apply/aplApplyConfirm/listPage
    applyConfirmListPage(data) {
        return http.post('/aplApplyConfirm/listPage', data)
    },
    listShowTitle(data) {
        return get('/listShowTile', {
            params: data,
        });
    },
    // POST /a/ws/apply/aplApplyInfo/updateShowTile
    updateShowTile(data) {
        return post('/updateShowTile', data)
    },
    modify(data) {
        return post('/modify', data);
    },
}