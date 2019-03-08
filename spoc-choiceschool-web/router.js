const routers = [
    {
        path: '/spoc-choiceschool',
        name:'choiceschool.index',
        component: (resolve) => require(['./src/views/index.vue'], resolve),
        children: [
            {
                path: '/spoc-choiceschool/schoolManage.html',
                name: 'choiceschool.schoolManage',
                meta:{ title:'学校管理' },
                component: (resolve) => require(['./src/views/school/schoolManage.vue'], resolve)
            },
            {
                path: '/spoc-choiceschool/creatSchool.html',
                name: 'choiceschool.creatSchool',
                meta:{ title:'新建学校' },
                component: (resolve) => require(['./src/views/school/creatSchool.vue'], resolve)
            },
            // {
            //     path: '/spoc-choiceschool/grouping.html',
            //     name: 'choiceschool.grouping',
            //     meta:{ title:'分组管理' },
            //     component: (resolve) => require(['./src/views/grouping/grouping.vue'], resolve)
			// },
			{
				path: '/spoc-choiceschool',
				name: 'choiceschool.grouping',
				meta:{ title:'分组管理'},
				redirect: {name: 'choiceschool.groupInfo'},
				component: (resolve) => require(['./src/views/group.vue'], resolve),
				children: [
					{
						path: 'grouping.html',
						name: 'choiceschool.groupInfo',	
						component: (resolve) => require(['@public/views/grouping/grouping.vue'], resolve)
					},
				]
			},
//			{
//				path: '/spoc-choiceschool/grouping.html',
//				name: 'choiceschool.grouping',
//				meta:{ title:'分组管理'},
//				redirect: {name: 'choiceschool.groupInfo'},
//				component: (resolve) => require(['./src/views/group.vue'], resolve),
//				children: [
//					{
//						path: 'grouping',
//						name: 'choiceschool.groupInfo',	
//						component: (resolve) => require(['@public/views/grouping/grouping.vue'], resolve)
//					},
//				]
//			},
            {
                path: '/spoc-choiceschool/addStudent.html',
                name: 'choiceschool.addStudent',
                meta:{ title:'添加学生' },
                component: (resolve) => require(['./src/views/student/addStudent.vue'], resolve)
            },
			{
				path: '/spoc-choiceschool/caseManage',
				name: 'choiceschool.caseManage',
				meta:{ title:'接案管理' },
				component: (resolve) => {
					require(['./src/views/caseManage/caseManageTable'], resolve)
				},
			}, 
            {
                path: '/spoc-choiceschool/studentList.html',
                name: 'choiceschool.studentList',
                meta:{ title:'我的学生' },
                component: (resolve) => require(['./src/views/student/studentList.vue'], resolve)
            },
            {
                path: '/spoc-choiceschool/schoolApproval.html',
                name: 'choiceschool.schoolApproval',
                meta:{ title:'选校审批' },
                component: (resolve) => require(['./src/views/schoolChoice/approval.vue'], resolve)
            },
            {
                path: '/spoc-choiceschool/choiceDetail.html',
                name: 'choiceschool.choiceDetail',
                meta:{ title:'选校详情' },
                component: (resolve) => require(['./src/views/schoolChoice/detail.vue'], resolve)
            },
            {
                path: '/spoc-choiceschool/statistics.html',
                name: 'choiceschool.statistics',
                meta:{ title:'选校统计' },
                component: (resolve) => require(['./src/views/statistics/statistics.vue'], resolve)
            },
			{
				path: '/spoc-choiceschool/connectList',
				name: 'choiceschool.connectList',
				meta: {
					title: '交接列表'
				},
				component: (resolve) => {
					require(['./src/views/connectList'], resolve)
				}
			},
			{
				path: '/spoc-choiceschool/connectCheck',
				name: 'choiceschool.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheck'], resolve)
				}
			},
			{
				path: '/spoc-choiceschool/connectPreview',
				name: 'choiceschool.connectPreview',
				meta: {
					title: '交接详情'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-choiceschool/connectedit',
				name: 'choiceschool.connectedit',
				meta: {
					title: '编辑页'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectedit'], resolve)
				}
			},
			{
				path: '/spoc-choiceschool/connectCheckDetail',
				name: 'choiceschool.connectCheckDetail',
				meta: {
					title: '交接表'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheckDetail'], resolve)
				}
			},
        ]
    }
];
module.exports = routers;
