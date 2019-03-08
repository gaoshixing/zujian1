const routers = [
	{
		path: '/spoc-apply',
		name: 'apply.index',
		component: (resolve) => { require(['./src/views/index.vue'], resolve) },
		meta: {
			title: '申请',
		},
		children: [
			{
				path: '/spoc-apply/case',
				name:'apply.case',
				component: (resolve) => { require(['./src/views/case/case'], resolve) },
				meta: {
					title: '接案管理',
				},
			},
			{
				path: '/spoc-apply/myStudent',
				name:'apply.myStudent',
				component: (resolve) => { require(['./src/views/myStudent/myStudent'], resolve) },
				meta: {
					title: '我的学生',
				},
			},
			{
				path: '/spoc-apply/formMean',
				name: 'apply.formMean',
				component: (resolve) => { require(['@public/views/formMean/index'], resolve) },
				meta: {
					title: '表单管理',
				},
			},
			// {
			// 	path: '/spoc-apply/formMeanEdit',
			// 	name: 'apply.formMeanEdit',
			// 	component: (resolve) => { require(['./src/views/formMean/edit'], resolve) },
			// 	meta: {
			// 		title: '表单编辑',
			// 	}
			// },
			// {
			// 	path: '/spoc-apply/importDate',
			// 	name: 'apply.importDate',
			// 	component: (resolve) => { require(['./src/views/formMean/importDate'], resolve) },
			// 	meta: {
			// 		title: '导入',
			// 	}
			// },
			{
				path: '/spoc-apply/applyDetail',
				name:'apply.applyDetail',
				component: (resolve) => { require(['./src/views/myStudent/applyDetail'], resolve) },
				meta: {
					title: '申请详情',
				},
			},
			{
				path: '/spoc-apply/myClose',
				name:'apply.myClose',
				component: (resolve) => { require(['./src/views/close/myClose'], resolve) },
				meta: {
					title: '我的结案',
				},
			},
			{
				path: '/spoc-apply/statistics/studentDteail',
				name:'apply.studentDteail',
				component: (resolve) => { require(['./src/views/statistics/studentDteail'], resolve) },
				meta: {
					title: '学生详情',
				},
			},
			{
				path: '/spoc-apply/closeApproval',
				name:'apply.closeApproval',
				component: (resolve) => { require(['./src/views/close/closeApproval'], resolve) },
				meta: {
					title: '结案审批',
				},
			},
			{
				path: '/spoc-apply/applyInfo',
				name:'apply.applyInfo',
				component: (resolve) => { require(['./src/views/apply/applyInfo'], resolve) },
				meta: {
					title: '申请信息',
				},
			},
			{
				path: '/spoc-apply/applyResult',
				name:'apply.applyResult',
				component: (resolve) => { require(['./src/views/apply/applyResult'], resolve) },
				meta: {
					title: '申请结果',
				},
			},
			{
				path: '/spoc-apply/enrolmentInfo',
				name:'apply.enrolmentInfo',
				component: (resolve) => { require(['./src/views/apply/enrolmentInfo'], resolve) },
				meta: {
					title: '入读信息',
				},
			},
			{
				path: '/spoc-apply/statistics',
				name:'apply.statistic',
				component: (resolve) => { require(['./src/views/statistics/index'], resolve) },
				meta: {
					title: '统计分析',
				},
			},
			{
				path: '/spoc-apply/connectList',
				name: 'apply.connectList',
				meta: {
					title: '交接列表'
				},
				component: (resolve) => {
					require(['./src/views/connectList'], resolve)
				}
			},
			{
				path: '/spoc-apply/connectCheck',
				name: 'apply.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheck'], resolve)
				}
			},
			{
				path: '/spoc-apply/connectPreview',
				name: 'apply.connectPreview',
				meta: {
					title: '交接详情'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-apply/connectedit',
				name: 'apply.connectedit',
				meta: {
					title: '编辑页'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectedit'], resolve)
				}
			},
			{
				path: '/spoc-apply/connectCheckDetail',
				name: 'apply.connectCheckDetail',
				meta: {
					title: '交接表'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheckDetail'], resolve)
				}
			},
			{
				path: '/spoc-apply/grouping.html',
				name: 'apply.grouping',
				meta:{ title:'分组管理'},
				redirect: {name: 'apply.groupInfo'},
				component: (resolve) => require(['./src/views/group.vue'], resolve),
				children: [
					{
						path: 'grouping',
						name: 'apply.groupInfo',	
						component: (resolve) => require(['@public/views/grouping/grouping.vue'], resolve)
					},
				]
			},
			{
				path: '/spoc-apply/studentInfo',
				name: 'apply.addStudent',
				component: (resolve) => {
					require(['./src/views/myStudent/addStudent.vue'], resolve)
				},
				meta: {
					title: '学生信息',
				},
			},
			{
				path: '/spoc-apply/school',
				name: 'apply.addSchool',
				meta: { title: '学校管理' },
				redirect: { name: 'apply.basicInfo' },
				component: (resolve) => require(['./src/views/addSchool/addSchool.vue'], resolve),
				children: [
//					{
//						path: '',
//						meta: { title: '添加学校' },
//						component: (resolve) => require(['./src/views/addSchool/basicInfo/basicInfo.vue'], resolve),
//					},
					{
						path: 'basicInfo.html',
						name: 'apply.basicInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/addSchool/basicInfo/basicInfo.vue'], resolve),
					},
					{
						path: 'SpecRankInfo.html',
						name: 'apply.SpecRankInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/addSchool/SpecRankInfo/SpecRankInfo.vue'], resolve),
					},
					{
						path: 'academic.html',
						name: 'apply.academic',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/addSchool/academic/academic.vue'], resolve),
					},
					{
						path: 'applyInfo.html',
						name: 'apply.applyInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/addSchool/applyInfo/applyInfo.vue'], resolve),
					},
					{
						path: 'bonus.html',
						name: 'apply.bonus',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/addSchool/bonus/bonus.vue'], resolve),
					},
					{
						path: 'replenish.html',
						name: 'apply.replenish',
						meta: { title: '学校详情' },
						component: (resolve) => require(['./src/views/addSchool/replenish.vue'], resolve),
					}
				]
			},
		],
	},
];
module.exports = routers;
