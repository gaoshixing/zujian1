import { http, } from './request';


export const docuLibrary = {
    // 获取列表
    treeList(params) {
        return http.get('docEssaySample/listPage', {
            params: params}
        )
    },

    addDocuModule(params) {
        return http.post('docEssaySample/save', params)
    },

    // 删除 http://localhost:8081/a/ws/docu/docEssaySample/delete
    deleteModule(params) {
        return http.post('docEssaySample/delete', params)
    },

    // 添加文书项目
    addDocuProduct(params) {
        return http.post('docEssayPrompt/save', params)
    },

    // 删除文书项目
    deleteDocuProduct(params) {
        return http.post('docEssayPrompt/delete', params)
    },

    // 题目列表 ws/docu/docEssayPrompt/listPage
    docuTitleList(params) {
        return http.get('docEssayPrompt/listPage', {
            params: params}
        )
    },

    // 编辑时候拿到信息 /ws/docu/docEssaySample/form?id=7721cf977fbb48da9654968b1266d210
    editInfo(params) {
        return http.get('docEssaySample/form', {
            params: params}
        )
    },

    // 编辑题目 拿到信息 docu/?id=e9a8f666af1641d8b1a9a3a1510175d1
    editInfoSuject(params) {
        return http.get('docEssayPrompt/form', {
            params: params}
        )
    },

    // 解析列表 ocu/docEssayPrompt/listInfoPage
    parseList(params) {
        return http.get('docEssayPrompt/listInfoPage', {
            params: params}
        )
    },

    // 添加解析 s/docu/docEssayPrompt/saveAnswer
    addDocuParse(params) {
        return http.post('docEssayPrompt/saveAnswer', params)
    },

    // 删除列表中一条
    deleteParseTitle(params) {
        return http.post('docEssayPrompt/deleteInfo', params)
    },

    // 申请季列表
    seasonList(params) {
        return http.get('docEssayPrompt/getApplyTime', {
            params: params}
        )
    },

    // 文书题目编辑接口
    editTitle(params) {
        return http.get('docEssayPrompt/formInfo', {
            params: params}
        )
    },
}
