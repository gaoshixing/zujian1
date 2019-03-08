import {
	http
} from "./request";
/*销售目标*/
export const SELLTARGET = {
	// 获取年
	getTimeList(obj) {
		return http.get('htSellObject/hasDataOfYearList', {
			params: obj
		})
	},
	// 分公司销售目标列表
	controlledSellList(obj) {
		return http.get('htSellObject/office/list', {
			params: obj
		})
	},

	// 保存分公司销售目标
	saveControlledSellTarget(obj) {
		return http.post('htSellObject/office/save', obj)
	},

	// 下达和编辑分公司销售目标
	upControlledSellTarget(obj) {
		return http.post('htSellObject/office/batchSave', obj)
	},

	// 分公司销售目标详情
	controlledOfficeForm(obj) {
		return http.get('htSellObject/office/form', {
			params: obj
		})
	},

	// 销售顾问销售目标列表
	sellTargetList(obj) {
		return http.get('htSellObject/sale/list', {
			params: obj
		})
	},

	// 销售顾问销售目标详情
	sellTargetSaleForm(obj) {
		return http.get('htSellObject/sale/form', {
			params: obj
		})
	},

	// 下达编辑销售顾问销售目标
	upSellTargetList(obj) {
		return http.post('htSellObject/sale/batchSave', obj)
	},

	// 保存销售顾问销售目标
	saveSellTarget(obj) {
		return http.post('htSellObject/sale/save', obj)
	},

	// 模糊搜索销售顾问
	seleSearch(obj) {
		return http.get('htSellObject/sale/search', {
			params: obj
		})
	},

}