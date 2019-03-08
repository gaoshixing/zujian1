import {
    http
} from "./request";

// 合同审批
export const SIGNAPPROVAL = {

    // 合同审批列表
    signApprovalList(obj) {
        return http.get('htContract/approvalList', {
            params: obj
        })
    },

    // 通过或驳回审核
    signApprovalIsPass(obj) {
        return http.post('htContract/audit', obj)
    },

     // 查看审核记录
     signApprovalRecordsList(obj) {
        return http.get('/htContract/listOptLog', {
            params: obj
        })
    },
}