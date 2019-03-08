import {
    http
} from "./request";

// 合同标签
export const SIGNTAGMANAGE = {
  
    // 合同审批列表
    signTagBuildTree(obj) {
        return http.get('/htTag/buildTree', {
            params: obj
        })
    },

    // 保存合同标签
    saveSignGroup(obj) {
        return http.post('/htTag/save', 
           obj
        )
    },

    // 编辑和添加合同分类
    signEditor(obj) {
        return http.get('/htTag/form', {
            params: obj
        })
    },

    // 删除合同标签
    deletesignTag(obj) {
        return http.get('/htTag/delete', {
            params:obj
        })
    },

}
