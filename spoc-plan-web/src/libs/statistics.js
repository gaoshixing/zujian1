import { http } from "./request";
const url = '/spoc-plan/a/ws/plan/plStatistics/'
export const STATISTICS = {

    // / 查看规划任务统计（饼状及其环形）
    viewPicRingData(params){
        return http.post('/plStatistics/viewPicRingData',params)
    },

    //GET /a/ws/plan/plStatistics/studentCase 
    studentCase(params){
        return http.get('/plStatistics/studentCase',{params})
    },

    // GET /a/ws/plan/plStatistics/expectedLeaveStudent
    leaveStudent(params){
        return http.get('/plStatistics/expectedLeaveStudent',{params})
    },

    // /a/ws/plan/plStatistics/viewServiceGroupById 查看服务组总览
    viewServiceGroupById(data) {
        return http.get('/plStatistics/viewServiceGroupById', {
            params: data,
        });
    },

    // 获取时间 GET /a/ws/plan/plStatistics/newDate
    getTime(params){
        return http.get('/plStatistics/newDate',{params})
    },

    // 获取学生(xiaoshou) POST /a/ws/plan/plStatistics/listPageStudentDate
    listPageStudentDate(params){
        return http.post('/plStatistics/listPageStudentDate',params)
    },
    
    // 统计明细 POST /a/ws/plan/plStatistics/viewPicRingDataInfo
    viewPicRingDataInfo(params){
        return http.get('/plStatistics/viewPicRingDataInfo',{params})
    },

    // 明细 GET /a/ws/plan/plStatistics/listStudentCase
    listStudentCase(params){
        return http.get('/plStatistics/listStudentCase',{params})
    },

    // 保存老师最大学生数/a/ws/plan/plStatistics/
    updateMax(params){
        return http.post('/plStatistics/updateMax',params)
    },

    // 柱状图GET /a/ws/plan/plStatistics/viewStuServiceByYear
    viewStuServiceByYear(params){
        return http.get('/plStatistics/viewStuServiceByYear',{params})
    },

    // GET /a/ws/plan/plStatistics/viewServiceGroupByApply 统计分析学生申请类别分布
    viewServiceGroupByApply(params){
        return http.get('/plStatistics/viewServiceGroupByApply',{params})
    },

    // GET /a/ws/plan/plStatistics/viewServiceGroupByGrade 统计分析学生年级构成
    viewServiceGroupByGrade(params){
        return http.get('/plStatistics/viewServiceGroupByGrade',{params})
    },

    // POST exportFileListStudentCase 导出规划接案统计明细数据(全部)
    exportFileListStudentCase(){
        return (`${url}exportFileListStudentCase`)
    },

    // POST /a/ws/plan/plStatistics/exportSelectedListStudentCase 导出规划接案统计明细数据(所选)
    exportSelectedListStudentCase(){
        return (`${url}exportSelectedListStudentCase`)
    },

    // POST /a/ws/plan/plStatistics/exportPicRingDataInfo 导出规划任务统计明细
    exportPicRingDataInfo(){
        return (`${url}exportPicRingDataInfo`)
    },

    // POST /a/ws/plan/plStatistics/exportSelectedPicRingDataInfo 导出规划任务统计明细
    exportSelectedPicRingDataInfo(){
        return (`${url}exportSelectedPicRingDataInfo`)
    },
}