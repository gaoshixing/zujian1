import {
    http
} from "./request";
let url = '/spoc-contract/a/ws/contract/htContract/'

// 合同管理
export const SIGNMANAGE = {
   aa: http,
    // 合同列表
    signManageList(obj) {
        return http.get('/htContract/list', {
            params: obj
        })
    },

    // 查看审核记录
    checkSignRecord(obj) {
        return http.get('/htContract/contractOperate', {
            params: obj
        })
    },
    
    // 转让合同
    signTransfer(obj) {
        return http.post('/htContract/attornContract', 
           obj
        )
    },

    // 删除合同
    signDelete(obj) {
        return http.get('/htContract/delete', {
            params: obj
        })
    },

    // 完成合同
    finishSign(obj) {
        return http.post('/htContract/finishContract', 
           obj
        )
    },
    
    // 导出全部合同数据
	exportAllSign(obj) {
        return (`${url}export?isArchived=${obj.isArchived}&companyIds=${obj.companyIds}&name=${obj.name}&status=${obj.status}&timeType=${obj.timeType}&startTime=${obj.startTime}&endTime=${obj.endTime}&isPartner${obj.isPartner}&orderBy=${obj.orderBy}&from=2&timePrecision=${obj.timePrecision}`)
    },
    
    // 日志详情的列表
    detailTable(obj) {
        return http.get('/htContract/listOptLog', {
            params: obj
        })
    },

    // 导出所选合同数据(已签约)
    exportSelectSign(obj) {
        return (`${url}exportSelected?ids=${obj.ids}`)
    },

    // 导出所选合同数据(待签约)
    exportSelectSignWait(obj) {
        return (`${url}exportCommittedSelected?ids=${obj.ids}`)
    },

    // 下载收据  /a/ws/contract/account/download?objectId=5dd061ee34294dc092423132e252d551&templateName=收据
	downloadSignReceiptPut(params){
		return (`${url}downloadScrip?objectId=${params.objectId}&templateName=${params.templateName}`);
	}
}
