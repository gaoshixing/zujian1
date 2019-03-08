
const routers =
[
	{
		path: '/spoc-core',
		component: (resolve) => require(['./src/views/index.vue'], resolve),
		children:
		[
			{
				path: '/spoc-core/organization.html',
				name: 'core.organization',
				meta:{ title:'组织机构' },
				component: (resolve) => require(['./src/views/organization.vue'], resolve)
			},
			{
				path: '/spoc-core/role.html',
				name: 'core.job',
				meta:{ title:'岗位管理' },
				component: (resolve) => require(['./src/views/job.vue'], resolve)
			},
			{
				path: '/spoc-core/grade.html',
				name: 'core.grade',
				meta:{ title:'职能等级' },
				component: (resolve) => require(['./src/views/grade.vue'], resolve)
			},
			{
				path: '/spoc-core/resource.html',
				name: 'core.resource',
				meta:{ title:'资源管理' },
				component: (resolve) => require(['./src/views/resource.vue'], resolve)
			},
			
		]
	},
	{
		path: '/disk.html',
		name: 'disk.index',
		meta:{ title:'网盘' },
		component: (resolve) => require(['./src/views/disk.vue'], resolve)
	},
];
module.exports = routers;
