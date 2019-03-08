const routers = [
	{
		path: '/spoc-crm',
		name: 'crm.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: {
			title: 'CRM'
		},
		children: [
			{
				path: 'entry',
				component: (resolve) => require(['./src/views/customService/entry.vue'], resolve),
				name:'crm.entry',
				meta: {
					title: '客服录入',
				},
			},
			{
				path: 'pond',
				component: (resolve) => require(['./src/views/pond/pond.vue'], resolve),
				name:'crm.pond',
				meta: {
					title: '分单池',
				},
			},
			{
				path: 'lafingManage',
				component: (resolve) => require(['./src/views/lafingManage/lafingManage.vue'], resolve),
				name:'crm.lafingManage',
				meta: {
					title: '分单管理',
				},
			},
			{
				path: 'infoManager',
				component: (resolve) => require(['./src/views/infoManager/infoManager.vue'], resolve),
				name:'crm.infoManager',
				meta: {
					title: '短信/邮件管理',
				},
			},
			{
				path: 'leader/approveManager',
				component: (resolve) => require(['./src/views/leader/approveManager.vue'], resolve),
				name:'crm.approveManager',
				meta: {
					title: '审批管理',
				},
			},
			{
				path: 'TMKDepot',
				component: (resolve) => require(['./src/views/TMKDepot/TMKDepot.vue'], resolve),
				name:'crm.TMKDepot',
				meta: {
					title: 'TMK库',
				},
			},
			{
				path: 'resourceManager',
				component: (resolve) => require(['./src/views/resourceManager/resourceManagerTMK.vue'], resolve),
				name:'crm.resourceManager',
				meta: {
					title: '资源管理',
				},
			},
			
			{
				path: 'myResource',
				component: (resolve) => require(['./src/views/myResource/myResource.vue'], resolve),
				name:'crm.myResource',
				meta: {
					title: '我的资源',
				},
			},
			{
				path: 'statistics',
				component: (resolve) => require(['./src/views/statistics/statistics.vue'], resolve),
				name:'crm.statistics',
				meta: {
					title: '统计分析',
					goback:true
				},
			},
			{
				path: 'customerServiceLeader',
				component: (resolve) => require(['./src/views/statistics/leader/customerServiceLeader.vue'], resolve),
				name:'crm.customerServiceLeader',
				meta: {
					title: '客服主管统计分析',
					goback:true
				},
			},
			{
				path: 'submenuLeader',
				component: (resolve) => require(['./src/views/statistics/leader/submenuLeader.vue'], resolve),
				name:'crm.submenuLeader',
				meta: {
					title: '分单主管统计分析',
					goback:true
				},
			},
			{
				path: 'TMKLeader',
				component: (resolve) => require(['./src/views/statistics/leader/TMKLeader.vue'], resolve),
				name:'crm.TMKLeader',
				meta: {
					title: 'TMK主管统计分析',
					goback:true
				},
			},
			{
				path: 'salesLeader',
				component: (resolve) => require(['./src/views/statistics/leader/salesLeader.vue'], resolve),
				name:'crm.salesLeader',
				meta: {
					title: '统计分析',
					goback:true
				},
			},
			{
				path: 'salesStatistics',
				component: (resolve) => require(['./src/views/statistics/sales/statistics.vue'], resolve),
				name:'crm.salesStatistics',
				meta: {
					title: '销售顾问个人统计明细',
					goback:true
				},
			},
			{
				path: 'entry-manage',
				component: (resolve) => require(['./src/views/customService/entryManage.vue'], resolve),
				name:'crm.entryManage',
				meta: {
					title: '录入管理',
				},
			},
			{
				path: 'detail',
				component: (resolve) => require(['./src/views/detail/detail.vue'], resolve),
				name:'crm.detail',
				meta: {
					title: '客户详情',
				},
			},
			{
				path: 'lists',
				component: (resolve) => require(['./src/views/sales/lists.vue'], resolve),
				name:'crm.lists',
				meta: {
					title: '我的客户',
				},
			},
			{
				path: 'public',
				component: (resolve) => require(['./src/views/sales/public.vue'], resolve),
				name:'crm.public',
				meta: {
					title: '公共库',
				},
			},
			{
				path: 'admin/formWrap',
				component: (resolve) => require(['./src/views/admin/formWrap.vue'], resolve),
				name:'crm.fromM',
				meta: {
					title: '分单表设置',
				},
			},
			{
				path: 'admin/fromDetail',
				component: (resolve) => require(['./src/views/admin/formDetail.vue'], resolve),
				name:'crm.fromDetail',
				meta: {
					title: '分单表管理',
				},
			},
			{
				path: 'admin/ruleSetting',
				component: (resolve) => require(['./src/views/admin/ruleSetting.vue'], resolve),
				name:'crm.ruleSetting',
				meta: {
					title: '掉落规则设置',
				}
			},
			{
				path: 'admin/flow',
				component: (resolve) => require(['./src/views/flow/flow.vue'], resolve),
				name:'crm.flow',
				meta: {
					title: '参与流转设置',
				}
			},
			{
				path: 'admin/setScore',
				component: (resolve) => require(['./src/views/admin/setScore.vue'], resolve),
				name:'crm.setScore',
				meta: {
					title: '分值设置',
				},
			},
			{
				path: 'admin/setLocation',
				component: (resolve) => require(['./src/views/admin/setLocation.vue'], resolve),
				name:'crm.setLocation',
				meta: {
					title: '归属地设置',
				},
			},
			{
				path: 'marketP/channelM',
				component: (resolve) => require(['./src/views/marketP/channelM.vue'], resolve),
				name:'crm.channelM',
				meta: {
					title: '渠道管理',
				}
			},
			{
				path: 'marketP/resourceManage',
				component: (resolve) => require(['./src/views/marketP/resourceManage.vue'], resolve),
				name:'crm.resourceManage',
				meta: {
					title: '市场渠道',
				},
			},
			{
				path: 'marketP/entryImport',
				component: (resolve) => require(['./src/views/customService/entry.vue'], resolve),
				name:'crm.entryImport',
				meta: {
					title: '市场录入',
					parentName:'crm.resourceManage'
				},
			},
			{
				path: 'marketP/resourceNew',
				component: (resolve) => require(['./src/views/marketP/resourceNew.vue'], resolve),
				name:'crm.resourceNew',
				meta: {
					title: '资源管理',
				},
			},
			{
				path: 'marketP/resourceMarket',
				component: (resolve) => require(['./src/views/marketP/resourceMarket.vue'], resolve),
				name:'crm.resourceMarket',
				meta: {
					title: '市场资源',
				},
			},
			{
				path: 'marketP/importPage',
				component: (resolve) => require(['./src/views/marketP/importPage.vue'], resolve),
				name:'crm.importPage',
				meta: {
					title: '批量导入客户',
				}
			},
			{
				path:'marketP/import',
				name:'crm.resourceImport',
				component:(resolve) => require(['./src/views/marketP/resourceImport.vue'], resolve),
				meta: { title: '资源录入' }
			},
			{
				path:'marketP/edit',
				name:'crm.resourceEdit',
				component:(resolve) => require(['./src/views/marketP/resourceEdit.vue'], resolve),
				meta: { title: '编辑资源' }
			},
			{
				path: 'leader/recordManage',
				component: (resolve) => require(['./src/views/leader/recordManage.vue'], resolve),
				name:'crm.recordManage',
				meta: {
					title: '录音管理',
				},
			},
			{
				path: 'leader/recordDetail',
				component: (resolve) => require(['./src/views/leader/recordDetail.vue'], resolve),
				name:'crm.recordDetail',
				meta: {
					title: '录音详情',
				},
			},
			{
				path: 'leader/saleRanking',
				component: (resolve) => require(['./src/views/leader/saleRanking.vue'], resolve),
				name:'crm.saleRanking',
				meta: {
					title: '排名明细',
				},
			},
			{
				path: 'leader/resourceDetail',
				component: (resolve) => require(['./src/views/leader/resourceDetail.vue'], resolve),
				name:'crm.resourceDetail',
				meta: {
					title: '资源详情',
				},
			},
			{
				path: 'leader/saleResourceDetail',
				component: (resolve) => require(['./src/views/leader/saleResourceDetail.vue'], resolve),
				name:'crm.saleResourceDetail',
				meta: {
					title: '分公司签约统计明细',
				},
			},
			{
				path: 'leader/statisticsComment',
				component: (resolve) => require(['./src/views/leader/statisticsComment.vue'], resolve),
				name:'crm.statisticsComment',
				meta: {
					title: '点评统计',
				},
			},
			{
				path: 'leader/customerManage',
				component: (resolve) => require(['./src/views/leader/customerManage.vue'], resolve),
				name:'crm.customerManage',
				meta: {
					title: '客户管理',
				},
			},
			{
				path: 'admin/importData',
				component: (resolve) => require(['../spoc-library-web/src/views/importData/importPage.vue'], resolve),
				name:'crm.importPage',
				meta: {
					title: '数据导入',
				},
			},
			{
				path: 'crmpact',
				component: (resolve) => require(['./src/views/pact/crmpact.vue'], resolve),
				name:'crm.pact',
				meta: {
					title: '合同库',
				},
			},
			{
				path: 'leader/seo',
				component: (resolve) => require(['./src/views/leader/seo.vue'], resolve),
				name:'crm.seo',
				meta: {
					title: 'SEO综合数据时报',
				},
			},
			{
				path: 'statistics/newspaper',
				component: (resolve) => require(['./src/views/statistics/newspaper/newspaper.vue'], resolve),
				name:'crm.newspaper',
				meta: {
					title: '今日时报',
					goback:true
				},
			},
			{
				path: 'statistics/callStatistics',
				component: (resolve) => require(['./src/views/statistics/callStatistics/callStatistics.vue'], resolve),
				name:'crm.callStatistics',
				meta: {
					title: '通话统计明细',
					goback:true
				},
			},
			{
				path: 'statistics/newResource',
				component: (resolve) => require(['./src/views/statistics/newResource/newResource.vue'], resolve),
				name:'crm.newResource',
				meta: {
					title: '资源来源分布明细',
					goback:true
				},
			},
			{
				path: 'statistics/saturation',
				component: (resolve) => require(['./src/views/statistics/saturation/saturation.vue'], resolve),
				name:'crm.saturation',
				meta: {
					title: '分单饱和度统计明细',
					goback:true
				},
			},
			{
				path: 'statistics/funnelDetail',
				component: (resolve) => require(['./src/views/statistics/funnelDetail/funnelDetail.vue'], resolve),
				name:'crm.funnelDetail',
				meta: {
					title: '销售跟进资源星级分布明细',
					goback:true
				},
			},
			{
				path: 'statistics/abandonDetail',
				component: (resolve) => require(['./src/views/statistics/abandonDetail/abandonDetail.vue'], resolve),
				name:'crm.abandonDetail',
				meta: {
					title: '放弃资源星级分布明细',
					goback:true
				},
			},
			{
				path: 'statistics/mapDetail',
				component: (resolve) => require(['./src/views/statistics/mapDetail/mapDetail.vue'], resolve),
				name:'crm.mapDetail',
				meta: {
					title: '资源地区分布明细',
					goback:true
				},
			},
			{
				path: 'statistics/contractDetail',
				component: (resolve) => require(['./src/views/statistics/contractDetail/contractDetail.vue'], resolve),
				name:'crm.contractDetail',
				meta: {
					title: '签约统计明细',
					goback:true
				},
			},
		]
	},
];

// eslint-disable-next-line
module.exports = routers;