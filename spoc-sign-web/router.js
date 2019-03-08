const routers = 
[
	{
		path: '/pdfviewer.html',
		name: 'sign.pdfview',
		component: (resolve) => require(['./src/views/pdfviewer.vue'], resolve),
		meta: { aside: false },
	},
	{
		path: '/dashboard.html',
		name: 'sign.dashboard',
		component: (resolve) => require(['./src/views/dashboard.vue'], resolve),
		meta: { aside: false },
	},
    {
		path: '/spoc-sign',
		name: 'sign.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: { title: '合同管理' },
		children:
		[  
			{
				path: '/spoc-sign/library',
				name: 'sign.library',
				component: (resolve) => require(['./src/views/library/library.vue'], resolve),
				meta: { title: '合同库'},
				redirect: { name: 'sign.pact2' },
				children:[
					{
						path: '/spoc-sign/pact2.html',
						name: 'sign.pact2',
						component: (resolve) => require(['./src/views/library/pact/pact.vue'], resolve),
						meta: { title: ''},
					},
				]
			},
			{
				path: '/spoc-sign/category.html',
				name:'sign.category',
				component: (resolve) => require(['./src/views/signTagManage/signTagManage.vue'], resolve),
				meta: { title: '合同标签' },
			},
			{
				path: '/spoc-sign/discount.html',
				name:'sign.discount',
				component: (resolve) => require(['./src/views/discount/discountNew.vue'], resolve),
				meta: { title: '优惠政策设置' },
			},
			{
				path: '/spoc-sign/discountNew.html',
				name:'sign.discount',
				component: (resolve) => require(['./src/views/discount/discountNew.vue'], resolve),
				meta: { title: '新优惠政策设置' },
			},
			{
				path: '/spoc-sign/zzdd.html',
				name:'sign.zzdd',
				component: (resolve) => require(['./src/views/discount/zzdd.vue'], resolve),
				meta: { title: '自组大单' },
			},
			{
				path: '/spoc-sign/contractGeneration.html',
				name:'sign.contractGeneration',
				component: (resolve) => require(['./src/views/contractGeneration/contractGeneration.vue'], resolve),
				meta: { title: '合同生成' },
			},
			{
				path: '/spoc-sign/libraryManage',
				name: 'sign.libraryManage',
				component: (resolve) => require(['./src/views/library/library.vue'], resolve),
				meta: { title: '合同库管理',authority:1},
				redirect: { name: 'sign.pact' },
				children:[
					{
						path: '/spoc-sign/pact.html',
						name: 'sign.pact',
						component: (resolve) => require(['./src/views/library/pact/pact.vue'], resolve),
						meta: { title: '',authority:1},
					},
					{
						path: '/spoc-sign/preview.html',
						name: 'sign.preview',
						component: (resolve) => require(['./src/views/library/preview/preview.vue'], resolve),
						meta: { title: '主合同预览'},
					},
					
				]
			},
			{
				path: '/spoc-sign/myPact',
				name: 'sign.myPact',
				component: (resolve) => require(['./src/views/myPact/myPact.vue'], resolve),
				meta: { title: '我的合同',},
			},
			{
				path: '/spoc-sign/pactPreview',
				name: 'sign.pactPreview',
				component: (resolve) => require(['./src/views/myPact/preview/preview.vue'], resolve),
				meta: { title: '合同预览'},
			},
			{
				path: '/spoc-sign/sellTarget',
				name: 'sign.sellTarget',
				component: (resolve) => require(['./src/views/target/manageTarget.vue'], resolve),
				meta: { title: '销售目标' },
			},
		// 	{
		// 		path: '/spoc-sign/manageTarget',
		// 		name: 'sign.manageTarget',
		// 		component: (resolve) => require(['./src/views/target/sellTarget.vue'], resolve),
		// 		meta: { title: '销售目标' },
		//    },
		   {
				path: '/spoc-sign/approval',
				name: 'sign.approval',
				component: (resolve) => require(['./src/views/approval/approval.vue'], resolve),
				meta: { title: '合同审批' },
		   },
		   {
				path: '/spoc-sign/approvlList',
				name: 'sign.approvlList',
				component: (resolve) => require(['./src/views/approval/approvalList.vue'], resolve),
				meta: { title: '合同审批list' },
		   },
		   {
				path:'/spoc-sign/analyse',
				name:'sign.analyseAro',
				component: (resolve) => require(['./src/views/analyse/analyseAro.vue'], resolve),
				meta:{title:'统计分析'}
		   },
		   {	
				path: '/spoc-sign/analyseAro2',
				name: 'sign.analyseAro2',
				component: (resolve) => require(['./src/views/analyse/analyseBase.vue'], resolve),
				meta: { title: '统计分析' },
				redirect: {name:'sign.manageAnalyse'},
				children:[
					{
						path: '/spoc-sign/manageAnalyse',
						name: 'sign.manageAnalyse',
						component: (resolve) => require(['./src/views/analyse/manageAnalyse.vue'], resolve),
					},
					{
						path: '/spoc-sign/manageAnalyse/anslyseDetailPassAro',
						name: 'sign.anslyseDetailPassAro',
						component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailPassAro.vue'], resolve),
						meta: { title: '签约统计明细'},
						redirect: {name:'sign.anslyseDetailPass'},
						children:[
						 	{
								path: '/spoc-sign/manageAnalyse/anslyseDetailPass',
								name: 'sign.anslyseDetailPass',
								meta: { goback: true},
								component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailPass.vue'], resolve)
							},
							{
								path: '/spoc-sign/manageAnalyse/anslyseDetailPerson',
								name: 'sign.anslyseDetailPerson',
								component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailPerson.vue'], resolve),
								meta: { title: '员工业绩明细'},
							}
						]
					},
					{
						path: '/spoc-sign/manageAnalyse/anslyseDetailNopayment',
						name: 'sign.anslyseDetailNopayment',
						component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailNopayment.vue'], resolve),
						meta: { title: '尾款统计'},
					},
					{
						path: '/spoc-sign/manageAnalyse/anslyseDetailDiscountRateAro',
						name: 'sign.anslyseDetailDiscountRateAro',
						component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailDiscountRateAro.vue'], resolve),
						redirect: {name:'sign.anslyseDetailDiscountRate'},
						meta: { title: '综合折扣率'},
						children: [
							{
								path: '/spoc-sign/manageAnalyse/anslyseDetailDiscountRate',
								name: 'sign.anslyseDetailDiscountRate',
								component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailDiscountRate.vue'], resolve),
							},
							{
								path: '/spoc-sign/manageAnalyse/anslyseDetailDiscountRateD',
								name: 'sign.anslyseDetailDiscountRateD',
								component: (resolve) => require(['./src/views/analyse/anslyseDetail/anslyseDetailDiscountRateD.vue'], resolve),
								meta: { title: '折扣率明细'},
							},
						]
					}
				]
		   },
			{
				path: '/spoc-sign/receipt.html',
				name:'sign.receipt',
				component: (resolve) => require(['./src/views/receipt/receipt.vue'], resolve),
				meta: { title: '合同收款' },
			},
			{
				path: '/spoc-sign/refund.html',
				name:'sign.refund',
				component: (resolve) => require(['./src/views/refund/refund.vue'], resolve),
				meta: { title: '合同退款' },
			},
			{
				path: '/spoc-sign/signManageAro',
				name: 'sign.contractManage',
				component: (resolve) => require(['./src/views/signManage/signManageAro.vue'], resolve),
				redirect: {name:'sign.signManage'},
				meta: { title: '签约合同管理' },
				children: [
					{
						path: '/spoc-sign/signManage.html',
						name:'sign.signManage',
						component: (resolve) => require(['./src/views/signManage/signManage.vue'], resolve),
					},
					{
						path: '/spoc-sign/signManageDetail.html',
						name:'sign.signManageDetail',
						component: (resolve) => require(['./src/views/signManage/signManageDetail.vue'], resolve),
						meta: {title: '合同详情'}
					},
				]
			},
			{
				path: '/spoc-sign/signTagManage.html',
				name:'sign.signTagManage',
				component: (resolve) => require(['./src/views/signTagManage/signTagManage.vue'], resolve),
				meta: { title: '合同标签管理' },
			},
			{
				path: '/spoc-sign/connectList',
				name: 'sign.connectList',
				meta: {
					title: '交接列表'
				},
				component: (resolve) => {
					require(['./src/views/connectList'], resolve)
				}
			},
			{
				path: '/spoc-sign/connectCheck',
				name: 'sign.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheck'], resolve)
				}
			},
			{
				path: '/spoc-sign/connectPreview',
				name: 'sign.connectPreview',
				meta: {
					title: '交接详情'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-sign/connectedit',
				name: 'sign.connectedit',
				meta: {
					title: '编辑页'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectedit'], resolve)
				}
			},
			{
				path: '/spoc-sign/connectCheckDetail',
				name: 'sign.connectCheckDetail',
				meta: {
					title: '交接表'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheckDetail'], resolve)
				}
			},
			{
				path: '/spoc-sign/grouping.html',
				name: 'sign.grouping',
				meta:{ title:'分组管理'},
				redirect: {name: 'sign.groupInfo'},
				component: (resolve) => require(['./src/views/group.vue'], resolve),
				children: [
					{
						path: 'grouping',
						name: 'sign.groupInfo',	
						component: (resolve) => require(['@public/views/grouping/grouping.vue'], resolve)
					},
				]
			},
            {
                path: '/spoc-sign/addStudent.html',
                name: 'sign.addStudent',
                meta:{ title:'添加学生' },
                component: (resolve) => require(['./src/views/addStudent/addStudent.vue'], resolve)
            },
        ]
    }
];

module.exports = routers;
