const routers = [{
		path: '/spoc-plan',
		name: 'plan.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: {
			title: '规划'
		},
		children: [{
				path: 'serviceInfo/:gid',
				name: 'plan.serviceInfo',
				meta: {
					title: '详情'
				},
				component: (resolve) => {
					require(['./src/views/serviceInfo/serviceInfo'], resolve)
				},
				children: [{
						path: '/spoc-plan/serviceInfo/pandect/:gid',
						name: 'plan.pandect',
						meta: {
							title: '总览'
						},
						component: (resolve) => {
							require(['./src/views/pandect/pandect'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/crew/:gid',
						name: 'plan.crew',
						meta: {
							title: '人员'
						},
						component: (resolve) => {
							require(['./src/views/crew/crew'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/file/:gid',
						name: 'plan.file',
						meta: {
							title: '文件'
						},
						component: (resolve) => {
							require(['./src/views/file/file'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/task/:gid',
						name: 'plan.task',
						meta: {
							title: '任务'
						},
						component: (resolve) => {
							require(['./src/views/task/task'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/myTask/:gid',
						name: 'plan.myTask',
						meta: {
							title: '我的任务',
							hasBtn: false,
						},
						component: (resolve) => {
							require(['./src/views/task/my_task'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/taskList/:gid',
						name: 'plan.taskList',
						meta: {
							title: '任务清单'
						},
						component: (resolve) => {
							require(['./src/views/task/taskList'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/taskReview/:gid',
						name: 'plan.taskReview',
						meta: {
							title: '任务详情'
						},
						component: (resolve) => {
							require(['./src/views/task/taskReview'], resolve)
						}
					}, {
						path: '/spoc-plan/serviceInfo/gantt/:gid',
						name: 'plan.gantt',
						meta: {
							title: '甘特图'
						},
						component: (resolve) => {
							require(['./src/views/gantt/gantt'], resolve)
						}
					},
					{
						path: '/spoc-plan/serviceInfo/todolList/:gid',
						name: 'plan.todolList',
						meta: {
							title: '日历'
						},
						component: (resolve) => {
							require(['./src/views/todoList'], resolve)
						},
					},
					{
						path: '/spoc-plan/serviceInfo/bill/:gid',
						name: 'plan.bill',
						meta: {
							title: '账单',
						},
						component: (resolve) => {
							require(['./src/views/bills/bill', ], resolve);
						},
					},
					{
						path: '/spoc-plan/serviceInfo/notepad/:gid',
						name: 'plan.notepad',
						meta: {
							title: '记事本',
						},
						component: (resolve) => {
							require(['./src/views/notepad/notepad', ], resolve);
						},
					},
				]
			},
			{
				path: 'formmanage',
				name: 'plan.formmanage',
				meta: {
					title: '表单管理'
				},
				component: (resolve) => {
					require(['./src/views/formmanage/formmanage'], resolve)
				}
			},
			{
				path: 'programmes',
				name: 'plan.programmes',
				meta: {
					title: '规划报告'
				},
				component: (resolve) => {
					require(['./src/views/programmes/programmes'], resolve)
				}
			},
			{
				path: 'vettingReport',
				name: 'plan.vettingReport',
				meta: {
					title: '报告审批'
				},
				component: (resolve) => {
					require(['./src/views/vettingReport/vettingReport'], resolve)
				}
			},
			{
				path: '/spoc-plan/case',
				name: 'plan.case',
				meta: {
					title: '接案管理'
				},
				component: (resolve) => {
					require(['./src/views/case/caseManage'], resolve)
				}
			},
			{
				path: '/spoc-plan/myStudents',
				name: 'plan.myStudents',
				meta: {
					title: '我的学生'
				},
				component: (resolve) => {
					require(['./src/views/myStudents'], resolve)
				},
			}, {
				path: '/spoc-plan/myStudents/addStudent',
				name: 'plan.addStudent',
				meta: {
					title: '添加学生'
				},
				component: (resolve) => {
					require(['./src/views/case/addStudent'], resolve)
				}
			} ,{
				path: 'myBill',
				name: 'plan.myBill',
				meta: {
					title: '我的账单'
				},
				component: (resolve) => {
					require(['./src/views/bills/myBill'], resolve)
				}
			},
			{
				path: 'billManage',
				name: 'plan.billManage',
				meta: {
					title: '账单管理'
				},
				component: (resolve) => {
					require(['./src/views/bills/billManage'], resolve)
				},
				children: [],
			},
			{
				path: 'billManage/rate',
				name: 'plan.rate',
				meta: {
					title: '设置费率',
				},
				component: (resolve) => require(['./src/views/bills/rate.vue'], resolve),
			},
			{
				path: 'billManage/rate',
				name: 'plan.rate',
				meta: {
					title: '设置费率',
				},
				component: (resolve) => require(['./src/views/bills/rate.vue'], resolve),
			},
			{
				path: 'billApproval',
				name: 'plan.billApproval',
				meta: {
					title: '账单审批'
				},
				component: (resolve) => {
					require(['./src/views/bills/billApproval'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectList',
				name: 'plan.connectList',
				meta: {
					title: '交接列表'
				},
				component: (resolve) => {
					require(['./src/views/connectList'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectCheck',
				name: 'plan.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectPreview',
				name: 'plan.connectPreview',
				meta: {
					title: '交接详情'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectPreview1',
				name: 'plan.connectPreview1',
				meta: {
					title: '交接预览'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectPreview'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectedit',
				name: 'plan.connectedit',
				meta: {
					title: '编辑页'
				},
				component: (resolve) => {
					require(['./src/views/connectList/connectedit'], resolve)
				}
			},
			{
				path: '/spoc-plan/connectCheck',
				name: 'plan.connectCheck',
				meta: {
					title: '交接审批'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck'], resolve)
				},
			},
			{
				path: '/spoc-plan/connectCheckDetail',
				name: 'plan.connectCheckDetail',
				meta: {
					title: '交接表'
				},
				component: (resolve) => {
					require(['./src/views/connectCheck/connectCheckDetail'], resolve)
				}
			},
			{
				path: '/spoc-plan/statistics',
				name: 'plan.statistics',
				meta: {
					title: '规划统计'
				},
				component: (resolve) => {
					require(['./src/views/statistics/statisticsBase'], resolve)
				},
				redirect: {
					name: 'plan.statisticsIndex'
				},
				children: [{
						path: '/spoc-plan/statistics',
						name: 'plan.statisticsIndex',
						component: (resolve) => {
							require(['./src/views/statistics/statWrap'], resolve) // statisticsIndex to statWrap
						},
					},
					{
						path: '/spoc-plan/statistics/statisticsAllD',
						name: 'plan.statisticsAllD',
						meta: {
							title: '规划统计明细'
						},
						component: (resolve) => {
							require(['./src/views/statistics/statisticsAllD'], resolve)
						}
					},
					{
						path: '/spoc-plan/statistics/statisticsAverageD',
						name: 'plan.statisticsAverageD',
						meta: {
							title: '规划统计'
						},
						component: (resolve) => {
							require(['./src/views/statistics/statisticsAverageD'], resolve)
						}
					},
					{
						path: '/spoc-plan/statistics/personStatistics',
						name: 'plan.personStatistics',
						meta: {
							title: '个人统计分析'
						},
						component: (resolve) => {
							require(['./src/views/statistics/personStatistics'], resolve)
						}
					},
				]
			},
			{
				path: 'grouping',
				name: 'plan.group',
				meta:{ title:'分组管理'},
				redirect: {name: 'plan.groupInfo'},
				component: (resolve) => require(['./src/views/group.vue'], resolve),
				children: [
					{
						path: 'grouping',
						name: 'plan.groupInfo',	
						component: (resolve) => require(['@public/views/grouping/grouping.vue'], resolve)
					},
				]
			},
		]
	},
	{
		path: '/spoc-plan-portal',
		name: 'plan.portal',
		component: (resolve) => require(['./src/views/portal.vue'], resolve),
		redirect: {name: 'plan.portal.msg'},
		children: [{
				path: 'message/:gid',
				name: 'plan.portal.msg',
				component: (resolve) => require(['./src/views/portal/message/msg.vue'], resolve),
			},
			{
				path: 'file/:gid',
				name: 'plan.portal.file',
				component: (resolve) => {
					require(['./src/views/file/file'], resolve)
				}
			},
			{
				path: 'gantt/:gid',
				name: 'plan.portal.gantt',
				component: (resolve) => {
					require(['./src/views/gantt/gantt'], resolve)
				}
			},
			{
				path: 'task/:gid',
				name: 'plan.portal.task',
				component: (resolve) => {
					require(['./src/views/task/task'], resolve)
				}
			},
			{
				path: 'crew/:gid',
				name: 'plan.portal.crew',
				component: (resolve) => {
					require(['./src/views/crew/crew'], resolve)
				}
			},
			{
				path: 'myTaskMsg/:gid',
				name: 'plan.myTask.msg',
				component: (resolve) => {
					require(['./src/views/task/my_task'], resolve)
				}
			},
			{
				path: 'taskList/:gid',
				name: 'plan.taskList.msg',
				component: (resolve) => {
					require(['./src/views/task/taskList'], resolve)
				}
			},
			{
				path: 'taskReview/:gid',
				name: 'plan.taskReview.msg',
				component: (resolve) => {
					require(['./src/views/task/taskReview'], resolve)
				}
			},
			{
				path: 'todolList/:gid',
				name: 'plan.portal.todolList',
				component: (resolve) => {
					require(['./src/views/todoList'], resolve)
				},
			},
			{
				path: 'notepad/:gid',
				name: 'plan.portal.notepad',
				component: (resolve) => {
					require(['./src/views/notepad/notepad'], resolve);
				},
			},
			{
				path: 'pandect/:gid',
				name: 'plan.portal.pandect',
				component: (resolve) => {
					require(['./src/views/pandect/pandect'], resolve);
				},
			},
		]

	},
	{
		path: '/spoc-plan-xform',
		name: 'plan.xform',
		component: (resolve) => require(['./src/views/xform.vue'], resolve),
		redirect: {
			name: 'plan.xform.design'
		},
		meta: {
			title: '规划'
		},
		children: [{
			path: 'design/:fid',
			name: 'plan.xform.design',
			meta: {
				title: '表单设计'
			},
			component: (resolve) => {
				require(['./src/views/xform/main', ], resolve);
			},
		}, ]
	},
	{
		path: 'selfcentred',
		component: (resolve) => require(['@public/views/selfCentred/index.vue'], resolve),
		name:'plan.portal.selfcentred',
		redirect: {name: 'plan.portal.selfdata'},
		meta: { title: '用户中心' },
		children: [
			{
				path: 'selfCentred/feedback',
				name: 'plan.portal.feedback',
				meta:{ title:'个人中心' },
				component: (resolve) => require(['@public/views/selfCentred/feedback.vue'], resolve)
			},
			{
				path: 'selfdata',
				component: (resolve) => require(['@public/views/selfCentred/selfData.vue'], resolve),
				name:'plan.portal.selfdata',
				meta: { title: '个人中心' },
			},
			{
				path: 'myFeedback',
				component: (resolve) => require(['@public/views/selfCentred/myFeedback.vue'], resolve),
				name:'plan.portal.myFeedback',
				meta: { title: '我的反馈'},
			},
			{
				path: 'viewFeedbackDetail',
				component: (resolve) => require(['@public/views/selfCentred/viewFeedbackDetail.vue'], resolve),
				name:'plan.portal.viewFeedbackDetail',
				meta: { title: '反馈详情',goback:true },
			},
			{
				path:'msgNewSet',
				name:'plan.portal.newSet',
				meta: { title: '消息接收设置' },
				component:(resolve) => require(['@public/views/news/newSet.vue'], resolve),
			},
		]
	},
];

module.exports = routers;