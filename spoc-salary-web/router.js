const routers = [{
	path: '/spoc-salary',
	name: 'salary.index',
	component: (resolve) => {
		require(['./src/views/index.vue'], resolve)
	},
	meta: {
		title: '工资薪酬',
	},
	children: [
		{
			path: '/spoc-salary/statistics',
			name: 'salary.statistics',
			component: (resolve) => require(['./src/views/statistics/statistics.vue'], resolve),
			meta: { title: '首页'},
//			redirect: { name: 'salary.pact2' },
//			children:[
//				{
//					path: '/spoc-salary/pact2.html',
//					name: 'salary.pact2',
//					component: (resolve) => require(['./src/views/statistics/pact/pact.vue'], resolve),
//					meta: { title: ''},
//				},
//			]
		},
		{
			path: 'personnel',
			component: (resolve) => require(['./src/views/personnel/index.vue'], resolve),
			name:'salary.personnel',
			meta: {
				title: '员工管理',
			},
			children: [
				
			]
		},
		{
			path: 'staffRecords',
			component: (resolve) => require(['./src/views/staffRecords/staffRecords.vue'], resolve),
			name:'salary.staffRecords',
			meta: {
				title: '员工档案',
			},
		},
		{
			path: 'attendanceManage',
			component: (resolve) => require(['./src/views/attendanceManage/index.vue'], resolve),
			name:'salary.attendanceManage',
			meta: {
				title: '考勤管理',
			},
		},
		{
			path: 'equation/editEquation',
			component: (resolve) => require(['./src/views/equation/editEquation.vue'], resolve),
			name:'salary.editEquation',
			meta: {
				title: '计算公式',
			},
		},
		{
			path: 'socialSecurity',
			component: (resolve) => require(['./src/views/socialSecurity/index.vue'], resolve),
			name:'salary.socialSecurity',
			meta: {
				title: '社保管理',
			},
		},
		{
			path: 'socialSecurityRule',
			component: (resolve) => require(['./src/views/socialSecurity/rule.vue'], resolve),
			name:'salary.socialSecurityRule',
			meta: {
				title: '社保规则设置',
			},
		},
		{
			path: 'importData',
			name: 'salary.import',
			meta: { title: '数据导入',goback:1 },
			component: (resolve) => require(['./src/views/importData/importPage.vue'], resolve)
		},
		{
			path: 'salaryManage',
			name: 'salary.salaryManage',
			meta: { title: '薪酬管理',},
			component: (resolve) => require(['./src/views/salaryManage/index.vue'], resolve)
		},
		{
			path: 'ruleSetting',
			name: 'salary.ruleSetting',
			meta: { title: '薪酬规则设置',},
			component: (resolve) => require(['./src/views/salaryManage/ruleSetting.vue'], resolve)
		},
		{
			path: 'salaryRule',
			name: 'salary.salaryRule',
			meta: { title: '薪酬规则',},
			component: (resolve) => require(['./src/views/salaryManage/salaryRule.vue'], resolve)
		},
		{
			path: 'editSalaryProject',
			name: 'salary.editSalaryProject',
			meta: { title: '新增薪酬项目',},
			component: (resolve) => require(['./src/views/salaryManage/editSalaryProject.vue'], resolve)
		},
	],
}, ];
module.exports = routers;