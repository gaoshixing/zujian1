import {
    http
} from "./request";

const url = '/spoc-contract/a/ws/contract/htStatistics/'
// 统计分析
export const ANALYSE = {

    // 签约业绩统计-销售目标（时间、分类、各分公司）
    anasyleList(obj) {
        return http.get('htStatistics/achieveMent', {
            params: obj
        })
    },
    // 签约业绩统计-销售目标
    achieveMent(params){
        return http.get('/htStatistics/achieveMent',{params});
    },

    // 不同标签的销售业绩
    achieveMentTag(params){ 
        return http.get('/htStatistics/achieveMentTag',{params});
    },
    // 不同渠道的销售业绩
    achieveMentSource(params){
        return http.get('/htStatistics/achieveMentSource',{params});
    },
    
    tail(params){
        return http.get('/htStatistics/tail',{params});
    },

    // 分公司业绩统计
    companySell(params){
        return http.get('/htStatistics/companySell',{params});
    },
    companyUserSell(params){
        return http.get('/htStatistics/companyUserSell',{params});
    },
    sellObject(params){
        return http.post('/htStatistics/sellObject',params);
    },

    // 尾款统计明细列表
    analyseTailList(obj) {
        return http.post('htStatistics/tailList', 
            obj
        )
    },

    // 签约业绩统计明细-销售明细列表
    analyseSellDetail(obj) {
        return http.post('htStatistics/sellObjectList', 
            obj
        )
    },

    // 员工销售业绩统计表
    personSellLevel(obj) {
        return http.get('htStatistics/userSellobject', {
            params: obj
        })
    },

    // 员工销售业绩统计明细
    personSellLevelList(obj) {
        return http.get('htStatistics/userSellobjectList', {
            params: obj
        })
    },
    
    // 附加合同审批“综合折扣率”审批人统计和明细
    analyseDiscountRate(obj) {
        return http.post('htStatistics/discountRate', 
            obj
        )
    },
    // 附加合同审批“综合折扣率”审批人统计和明细(列表)
    analyseDiscountRateList(obj) {
        return http.post('htStatistics/discountRateList', 
            obj
        )
    },

    // 签约业绩统计-销售目标（已签约）明细导出（导出全部）
    exportAnalyseDeatil() {
        return (`${url}exportSellObjectList`)
    },

    // 签约业绩统计-销售目标明细导出（导出所选)(已签约)
    exportAnalyseDeatilSelected() {
        return (`${url}exportSelectedSellObjectList`)
    },

    // 合同尾款明细导出（导出全部）
    exportNoPayAll() {
        return (`${url}exportTailList`)
    },

    // 合同尾款明细导出（导出所选)
    exportNoPaySelected() {
        return (`${url}exportSelectedTailList`)
    },
    // 附加合同审批“综合折扣率”审批人明细导出全部（时间、分类、各分公司）
    exportDiscountAll() {
        return (`${url}exportDiscountRate`)
    },

    // 附加合同审批“综合折扣率”审批人明细导出所选（时间、分类、各分公司）
    exportDiscountSelected() {
        return (`${url}exportSelectedDiscountRate`)
    },

    // 合同审批列表导出：(综合折扣率进来)(导出全部)
    exportApprovalList() {
        return (`${url}exportApprovalList`)
    },

    // 导出选中的：(综合折扣率进来)(导出所选)
    exportSelectedApprovalList() {
        return (`${url}exportSelectedApprovalList`)
    },

    // 附加合同审批“综合折扣率”合同明细列表导出全部（时间、分类、各分公司
    exportContractDiscountRate() {
        return (`${url}exportContractDiscountRate`)
    },

    // 附加合同审批“综合折扣率”合同明细列表导出所选（合同编号）
    exportContractDiscountRateSelected() {
        return (`${url}exportContractDiscountRateSelected`)
    },
    
    // 员工签约明细列表导出所选（时间、签约状态）
    exportUserSellobjectListSelect(params) {
        return (`${url}exportUserSellobjectListSelect?id=${params.id}&status=${params.status}&timeType=${params.timeType}&ids=${params.ids}&endTime=${params.endTime}&isPartner=${params.isPartner}&orderBy=${params.orderBy}&startTime=${params.startTime}&timePrecision=${params.timePrecision}`)
    },
	
    // 员工签约明细列表导出全部（时间、签约状态）
    exportUserSellobjectList(params) {
        return (`${url}exportUserSellobjectList?id=${params.id}&timePrecision=${params.timePrecision}&status=${params.status}&timeType=${params.timeType}&endTime=${params.endTime}&isPartner=${params.isPartner}&orderBy=${params.orderBy}&startTime=${params.startTime}`)
    },

    saleHeroRank(params){
        return http.get('/htStatistics/saleHeroRank',{params});
    },
    countSign(params){
        return http.get('/htStatistics/countSign',{params});
    },
    countSignDetail(params){
        return http.get('/htStatistics/countSignDetail',{params});
    },
    countSignCompanyDetail(params){
        return http.get('/htStatistics/countSignCompanyDetail',{params});
    },
    findLatestSign(params){
        return http.get('/htStatistics/findLatestSign',{params});
    },
    officeOutPrice(params){
        return http.get('/htStatistics/officeOutPrice',{params});
    }
}
// // http://localhost:8080/a/ws/contract/htStatistics/exportContractDiscountRateSelected?timePrecision=month&ids=a2dfaa45a9944f27904abafc712da388
