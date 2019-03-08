import { http } from "./request";

const k = '/plServiceGroup'
const post = (u,data)=>{
    return http.post(`${k}${u}`,data);
};

const get = (u,data)=>{
    return http.get(`${k}${u}`,data);
};

export const plServiceGroup = {
    listPage(params){
        return post('/listPage',params);
    },
    list(params){
        return get('/list',{params})
    },
    save(data){
        return post('/save',data);
    },
    saveDiscussion(name,plServiceMemberList){  // [{user:'1'}]
        return post('/saveDiscussion',{name,plServiceMemberList});
    },
    getPhase(params){
        return get('/getPhase',{params})
    },
    listEvent(data) {
        return get('/listEvent', {
            params: data,
        });
    }, 
    studentData(params){
        return get('/studentData',{params})
    },

    // 服务组管理DTO列表（带分页）
    planServiceTree(params){
        return post('/listPage',params)
    },

    //获取中方顾问
    listTeacher(params) {
        return get('/listTeacher',{params})
    },

    //保存规划(预计)交接时间
    saveHandOverPlanTime(params) {
        return post('/saveHandOverPlanTime',params)
    },

    //获取规划(预计)交接时间
    showTime(params) {
        return get('/showTime',{params})
    },

    //保存创建\编辑服务组
    saveCreateGroup(params) {
        return post('/save',params)
    },

    //获取服务组信息
    getGroupInfo(params) {
        return get('/form',{params})
    },    

    //我的学生
    getMyStudent(params) {
        return post('/listStudentPage',params)
    },

    // GET /spoc-plan/a/ws/plan/plServiceGroup/getFolderName 服务组组文件夹名称
    getFolderName(params) {
        return get('/getFolderName',{params})
    }
}