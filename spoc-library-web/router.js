
const routers =
[
	{
		path: '/spoc-library',
		name:'library.index',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		meta: { title: '院校库' },
		children:
		[
			{
				path: '/spoc-library/importData.html',
				name: 'library.import',
				meta: { title: '数据导入',goback:1 },
				component: (resolve) => require(['./src/views/importData/importPage.vue'], resolve)
			},
			{
				path: '/spoc-library/schoolManage.html',
				name: 'library.schoolManage',
				meta: { title: '学校管理' },
				component: (resolve) => require(['./src/views/schoolManage/schoolManage.vue'], resolve)
			},
			{
				path: '/spoc-library/academe.html',
				name: 'library.academeManage',
				meta: { title: '学院管理' },
				component: (resolve) => require(['./src/views/academeManage/academeManage.vue'], resolve)
			},
			{
				path: '/spoc-library/optionalLibrary',
				meta: { title: '标准专业库' },
				redirect:{name:'library.optionalLibrary'},
				component: (resolve) => require(['./src/views/optionalLibrary/index.vue'], resolve),
				children:
				[
					{
						path:'/spoc-library/optionalLibrary/list.html',
						name: 'library.optionalLibrary',
						component: (resolve) => require(['./src/views/optionalLibrary/optionalLibrary.vue'], resolve),
					},
					{
						path:'/spoc-library/optionalLibrary/addMajor.html',
						meta:{ title:'添加'},
						name: 'library.optionalLibrary.addMajor',
						component: (resolve) => require(['./src/views/optionalLibrary/addMajor.vue'], resolve),
					},
					{
						path:'/spoc-library/optionalLibrary/majorDetail.html',
						meta:{ title:'查看详情'},
						name: 'library.optionalLibrary.majorDetail',
						component: (resolve) => require(['./src/views/optionalLibrary/majorDetail.vue'], resolve),
					},
				]
			},
			{
				path: '/spoc-library/search',
				meta: { title: '藤门搜索' },
				component: (resolve) => require(['./src/views/search/search.vue'], resolve),
				redirect: { name: 'library.search' },
				children: 
				[
					{
						path: '/spoc-library/baseSearch.html',
						name: 'library.search',
						component: (resolve) => require(['./src/views/search/baseSearch/baseSearch.vue'], resolve),
					},
					{
						path: '/spoc-library/advancedSearch.html',
						name: 'library.advancedSearch',
						component: (resolve) => require(['./src/views/search/advancedSearch/advancedSearch.vue'], resolve),
						meta: { title: '高级检索' }
					},
					{
						path: '/spoc-library/UndergraduateProgramInfo.html',
						name: 'library.UndergraduateProgramInfo',
						component: (resolve) => require(['./src/views/search/majorInfo/UndergraduateProgramInfo.vue'], resolve),
						meta: { title: '本科专业详情' }
					},
					{
						path: '/spoc-library/masterProgramInfo.html',
						name: 'library.graduateProgramInfo',
						component: (resolve) => require(['./src/views/search/majorInfo/masterProgramInfo.vue'], resolve),
						meta: { title: '研究生专业详情' }
					},
					{
						path: '/spoc-library/academeDetail.html',
						name: 'library.academeDetail',
						component: (resolve) => require(['./src/views/search/academeDetail/academeDetail.vue'], resolve),
						meta: { title: '学院详情' }
					},
				]
			},
			{
				path: '/spoc-library/academe',
				name: 'library.addAcademe',
				meta: { title: '学院管理' },
				component: (resolve) => require(['./src/views/academeManage/addAcademe/addAcademe.vue'], resolve),
				children: [
					{
						path: '/spoc-library/academeBasicInfo.html/:currentTitle/:processStep',
						name: 'library.academeBasicInfo',
						component: (resolve) => require(['./src/views/academeManage/addAcademe/basicInfo/basicInfo.vue'], resolve),
						meta: { title: ['添加学院', '编辑学院'] },
					},
					{
						path: '/spoc-library/addAcademe.html/addMajor/:currentTitle/:processStep',
						name: 'library.academeAddMajor',
						component: (resolve) => require(['./src/views/academeManage/addAcademe/addMajor/addMajor.vue'], resolve),
						meta: { title: ['添加学院', '编辑学院'] },
					},
					{
						path: '/spoc-library/addAcademe.html/majorProject/:currentTitle/:processStep',
						name: 'library.academeMajorProject',
						meta: { title: ['添加学院', '编辑学院'] },
						component: (resolve) => require(['./src/views/academeManage/addAcademe/majorProject/majorProject.vue'], resolve),
					},
					{
						path: '/spoc-library/editAcademe.html/USNews/:currentTitle/:processStep',
						name: 'library.editAcademeUSNews',
						meta: { title: '编辑学院' },
						component: (resolve) => require(['./src/views/academeManage/editAcademe/USNews.vue'], resolve),
					},
				]
			},
			{
				path: '/spoc-library/school',
				name: 'library.addSchool',
				meta: { title: '学校管理' },
				redirect: { name: 'library.basicInfo' },
				component: (resolve) => require(['./src/views/schoolManage/addSchool/addSchool.vue'], resolve),
				children: [
//					{
//						path: '',
//						meta: { title: '添加学校' },
//						component: (resolve) => require(['./src/views/schoolManage/addSchool/basicInfo/basicInfo.vue'], resolve),
//					},
					{
						path: 'basicInfo.html',
						name: 'library.basicInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/schoolManage/addSchool/basicInfo/basicInfo.vue'], resolve),
					},
					{
						path: 'SpecRankInfo.html',
						name: 'library.SpecRankInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/schoolManage/addSchool/SpecRankInfo/SpecRankInfo.vue'], resolve),
					},
					{
						path: 'academic.html',
						name: 'library.academic',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/schoolManage/addSchool/academic/academic.vue'], resolve),
					},
					{
						path: 'applyInfo.html',
						name: 'library.applyInfo',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/schoolManage/addSchool/applyInfo/applyInfo.vue'], resolve),
					},
					{
						path: 'bonus.html',
						name: 'library.bonus',
						meta: { title: '添加学校' },
						component: (resolve) => require(['./src/views/schoolManage/addSchool/bonus/bonus.vue'], resolve),
					},
					{
						path: 'replenish.html',
						name: 'library.replenish',
						meta: { title: '学校详情' },
						component: (resolve) => require(['./src/views/schoolManage/schoolDetail/replenish/replenish.vue'], resolve),
					}
				]
			},
			{
				path: '/spoc-library/detail',
				name: 'library.schoolDetail',
				meta: { title: '藤门搜索' },
				component: (resolve) => require(['./src/views/schoolManage/schoolDetail/schoolDetail.vue'], resolve),
				children: [
					{
						path: '',
						name: 'library.details',
						meta: { title: '学校详情' },
						component: (resolve) => require(['./src/views/schoolManage/schoolDetail/details/details.vue'], resolve),
					},
					{
						path: 'details.html',
						name: 'library.details',
						meta: { title: '学校详情' },
						component: (resolve) => require(['./src/views/schoolManage/schoolDetail/details/details.vue'], resolve),
					},
					{
						path: 'replenish.html',
						name: 'library.replenish',
						meta: { title: '学校详情' },
						component: (resolve) => require(['./src/views/schoolManage/schoolDetail/replenish/replenish.vue'], resolve),
					}
				]
			}
		]
	},
];
module.exports = routers;
