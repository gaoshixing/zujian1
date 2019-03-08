const routers = [{
	path: '/spoc-docu',
	name: 'docu.index',
	component: (resolve) => {
		require(['./src/views/index.vue'], resolve)
	},
	meta: {
		title: '文书',
	},
	children: [{
			path: '/spoc-docu/case',
			name: 'docu.case',
			component: (resolve) => {
				require(['./src/views/case/case'], resolve)
			},
			meta: {
				title: '接案管理',
			},
		},
		{
			path: '/spoc-docu/myStudent',
			name: 'docu.myStudent',
			component: (resolve) => {
				require(['./src/views/myStudent/myStudent'], resolve)
			},
			meta: {
				title: '我的学生',
			},
		},
		{
			path: '/spoc-docu/manage',
			name: 'docu.manage',
			component: (resolve) => {
				require(['./src/views/manage/docuManage'], resolve)
			},
			meta: {
				title: '文书管理',
			},
		},
		{
			path: '/spoc-docu/approval',
			name: 'docu.approval',
			component: (resolve) => {
				require(['./src/views/approval/docuApproval'], resolve)
			},
			meta: {
				title: '文书审批',
			},
		},
		{
			path: '/spoc-docu/myDocu',
			name: 'docu.myDocu',
			component: (resolve) => {
				require(['./src/views/myDocu/mydocu'], resolve)
			},
			meta: {
				title: '我的文书',
			},
		},
		{
			path: '/spoc-docu/studentInfo',
			name: 'docu.addStudent',
			component: (resolve) => {
				require(['./src/views/myStudent/addStudent'], resolve)
			},
			meta: {
				title: '学生信息',
			},
		},
		{
			path: 'grouping',
			name: 'docu.group',
			meta: {
				title: '分组管理'
			},
			redirect: {
				name: 'docu.groupInfo'
			},
			component: (resolve) => require(['./src/views/group.vue'], resolve),
			children: [{
				path: 'grouping',
				name: 'docu.groupInfo',
				component: (resolve) => require(['../spoc-portal/views/grouping/grouping.vue'], resolve)
			}, ]
		},
		{
			path: '/spoc-docu/docuAro',
			name: 'docu.docuAro',
			component: (resolve) => {
				require(['./src/views/docuLibrary/docuAro'], resolve)
			},
			meta: {
				title: '文书库管理',
			},
			redirect: {
				name: 'docu.docuLibrary'
			},
			children: [{
					path: '/spoc-docu/docuLibrary',
					name: 'docu.docuLibrary',
					component: (resolve) => {
						require(['./src/views/docuLibrary/docuLibrary'], resolve)
					},
					meta: {
						title: '文书库管理',
					},
				},
				{
					path: '/spoc-docu/docuSubManage',
					name: 'docu.docuSubManage',
					component: (resolve) => {
						require(['./src/views/docuLibrary/docuSubjectManage'], resolve)
					},
					meta: {
						title: '文书题目管理',
					},
				},
			]
		},
			{
				path: '/spoc-docu/connectList',
				name: 'docu.connectList',
				meta: {
					title: '交接列表'
				},
				component: (resolve) => {
					require(['./src/views/connectList'], resolve)
				}
			},
			{
				path: '/spoc-docu/connectCheck',
				name: 'docu.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheck'], resolve)
				}
			},
			{
				path: '/spoc-docu/connectPreview',
				name: 'docu.connectPreview',
				meta: {
					title: '交接详情'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-docu/connectedit',
				name: 'docu.connectedit',
				meta: {
					title: '编辑页'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectedit'], resolve)
				}
			},
			{
				path: '/spoc-docu/connectCheckDetail',
				name: 'docu.connectCheckDetail',
				meta: {
					title: '交接表'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheckDetail'], resolve)
				}
			},
	],
}, ];
module.exports = routers;