const routers = [{
	path: '/spoc-market',
	name: 'market.index',
	component: (resolve) => {
		require(['./src/views/index.vue'], resolve)
	},
	meta: {
		title: '市场营销',
	},
	children: [{
			path: '/spoc-market/resource',
			name: 'market.resource',
			component: (resolve) => {
				require(['./src/views/resource/resource.vue'], resolve)
			},
			meta: {
				title: '素材库',
			},
		},
		{
			path: '/spoc-market/addImgR',
			name: 'market.addImgR',
			component: (resolve) => {
				require(['./src/views/resource/addImgR.vue'], resolve)
			},
			meta: {
				title: '新增图片素材',
			},
		},
		{
			path: '/spoc-market/addTextR',
			name: 'market.addTextR',
			component: (resolve) => {
				require(['./src/views/resource/addTextR.vue'], resolve)
			},
			meta: {
				title: '新增文本素材',
			},
		},
		{
			path: '/spoc-market/addWeChatR',
			name: 'market.addWeChatR',
			component: (resolve) => {
				require(['./src/views/resource/addWeChatR.vue'], resolve)
			},
			meta: {
				title: '新增图文素材',
			},
		},
		{
			path: '/spoc-market/addDocR',
			name: 'market.addDocR',
			component: (resolve) => {
				require(['./src/views/resource/addDocR.vue'], resolve)
			},
			meta: {
				title: '新增文档素材',
			},
		},
		{ 
			path: '/spoc-market/addFileR', 
			name: 'market.addFileR', 
			component: (resolve) => { 
			  require(['./src/views/resource/addFileR.vue'], resolve) 
			}, 
			meta: { 
			  title: '新增视频素材', 
			}, 
		}, 
		{
			path: '/groupBooking/groupM',
			name: 'groupM.index',
			component: (resolve) => {
				require(['./src/views/groupBooking/groupM.vue'], resolve)
			},
			meta: {
				title: '拼团售卖管理',
			},
		},
		{
			path: '/publicNumM/index',
			name: 'publicNumM.index',
			component: (resolve) => {
				require(['./src/views/publicNumM/index.vue'], resolve)
			},
			meta: {
				title: '公众号管理',
			},
		},
		{
			path: '/publicNumM/addPublicN',
			name: 'publicNumM.addPublicN',
			component: (resolve) => {
				require(['./src/views/publicNumM/addPublicN.vue'], resolve)
			},
			meta: {
				title: '添加订阅号',
			},
		},
		{
			path: '/publicNumM/addPublicNT',
			name: 'publicNumM.addPublicNT',
			component: (resolve) => {
				require(['./src/views/publicNumM/addPublicN.vue'], resolve)
			},
			meta: {
				title: '添加服务号',
			},
		},
		{
			path: '/groupBooking/newGroup',
			name: 'groupM.newGroup',
			component: (resolve) => {
				require(['./src/views/groupBooking/newGroup.vue'], resolve)
			},
			meta: {
				title: '新建拼团',
			},
		},
		{
			path: '/groupBooking/dataCollection',
			name: 'groupM.dataCollection',
			component: (resolve) => {
				require(['./src/views/groupBooking/dataCollection.vue'], resolve)
			},
			meta: {
				title: '数据收集',
			},
		},
		{
			path: '/overView',
			name: 'overView',
			component: (resolve) => {
				require(['./src/views/overView.vue'], resolve)
			},
			meta: {title: '概况',},
		},
		
		{
			path: '/groupBooking/groupMDetail',
			name: 'groupM.groupMDetail',
			component: (resolve) => {
				require(['./src/views/groupBooking/groupMDetail.vue'], resolve)
			},
			meta: {
				title: '查看详情',
			},
		},
		{
			path: 'crossSellAudit',
			name: 'groupM.crossSellAudit',
			component: (resolve) => {
				require(['./src/views/crossSellAudit/index.vue'], resolve);
			},
			meta: {
				title: '跨区售卖审核',
			},
		},
		{
			path: 'crossSellAudit/goods',
			name: 'groupM.goodsAudit',
			component: (resolve) => {
				require(['./src/views/crossSellAudit/goodsAudit.vue'], resolve);
			},
			meta: {
				title: '商品审核详情',
			},
		},
		{
			path: 'crossSellAudit/group',
			name: 'groupM.groupAudit',
			component: (resolve) => {
				require(['./src/views/crossSellAudit/groupAudit.vue'], resolve);
			},
			meta: {
				title: '拼团审核详情',
			},
		},
		{
			path: 'commodity',
			name: 'market.commodity',
			meta: {
				title: '商品管理'
			},
			component: (resolve) => {
				require(['./src/views/commodity/index.vue'], resolve)
			}
		},
		{
			path: 'commodityDetail',
			name: 'market.commodityDetail',
			meta: {
				title: '商品详情'
			},
			component: (resolve) => {
				require(['./src/views/commodity/detail.vue'], resolve)
			}
		},
		{
			path: 'commodityCreate',
			name: 'market.commodityCreate',
			meta: {
				title: '新建商品'
			},
			component: (resolve) => {
				require(['./src/views/commodity/create.vue'], resolve)
			}
		},
		{
			path: 'commodityEdit',
			name: 'market.commodityEdit',
			meta: {
				title: '编辑商品'
			},
			component: (resolve) => {
				require(['./src/views/commodity/edit.vue'], resolve)
			}
		},
		{
			path: 'previewForm',
			name: 'market.previewForm',
			meta: {
				title: '预览表单'
			},
			component: (resolve) => {
				require(['./src/views/commodity/form.vue'], resolve)
			}
		},
		{
			path: 'inviteManage',
			name: 'market.inviteManage',
			meta: {
				title: '邀请页面管理'
			},
			component: (resolve) => {
				require(['./src/views/inviteManage/inviteManage.vue'], resolve)
			}
		},
		{
			path: 'inviteBox',
			name: 'market.inviteBox',
			meta: {
				title: '新建邀请页面'
			},
			component: (resolve) => {
				require(['./src/views/inviteManage/inviteBox.vue'], resolve)
			}
		},
		{
			path: 'collection',
			name: 'market.collection',
			meta: {
				title: '数据收集'
			},
			component: (resolve) => {
				require(['./src/views/inviteManage/collection.vue'], resolve)
			}
		},
		{
			path: 'infopath',
			name: 'market.infopath',
			meta: {
				title: '动态表单管理'
			},
			component: (resolve) => {
				require(['./src/views/infopath/infopath.vue'], resolve)
			}
		},
		{
			path: '/spoc-market-xform',
			name: 'market.xform',
			component: (resolve) => {
				require(['./src/views/xform.vue'], resolve)
			},
			redirect: {
				name: 'market.xform.design'
			},
			children: [{
				path: 'marketDesign/:fid',
				name: 'market.xform.design',
				meta: {
					title: '表单设计'
				},
				component: (resolve) => {
					require(['./src/views/xform/main'], resolve);
				},
			}, ]
		},
		{
			path: 'spoc-market-xform/edit',
			component: (resolve) => require(['./src/views/infopath/edit.vue'], resolve),
			name:'market.formEdit',
		},
		{
			path: '/market/',
			name: 'publicIndex',
			component: (resolve) => {
				require(['./src/views/public/publicIndex.vue'], resolve)
			},
			meta: {title: '',},
			redirect: {name: 'market.publicIndexGsx'},
			children:[
				{
					path: '/public/publicIndexGsx',
					name: 'market.publicIndexGsx',
					component: (resolve) => {
						require(['./src/views/public/publicIndexGsx.vue'], resolve)
					},
					meta: {
						title: '公众号首页',
						gobackP: true,
					},
				},
				{
					path: '/publicNumM/publicM',
					name: 'market.publicM',
					component: (resolve) => {
						require(['./src/views/publicNumM/publicM.vue'], resolve)
					},
					meta: {
						title: '公众号管理',
						// gobackP: true,
					},
				},

				{
					path: 'taskManage',
					name: 'market.taskManage',
					meta: {
						title: '任务管理',
						gobackP: true,
					},
					component: (resolve) => {
						require(['./src/views/taskManage/index.vue'], resolve)
					}
				},
				{
					path: 'expandDetail',
					name: 'market.expandDetail',
					meta: {
						title: '推广详情'
					},
					component: (resolve) => {
						require(['./src/views/taskManage/expandDetail.vue'], resolve)
					}
				},
				{
					path: 'expandData',
					name: 'market.expandData',
					meta: {
						title: '推广数据'
					},
					component: (resolve) => {
						require(['./src/views/taskManage/expandData.vue'], resolve)
					}
				},
				{
					path: 'addArticleTask',
					name: 'market.addArticleTask',
					meta: {
						title: '新增文章任务'
					},
					component: (resolve) => {
						require(['./src/views/taskManage/addArticleTask.vue'], resolve)
					}
				},
				{
					path: 'setDisplay',
					name: 'market.setDisplay',
					meta: {
						title: '展示设置'
					},
					component: (resolve) => {
						require(['./src/views/taskManage/setDisplay.vue'], resolve)
					}
				},
				{
					path: 'modifyDisplay',
					name: 'market.modifyDisplay',
					meta: {
						title: '展示设置'
					},
					component: (resolve) => {
						require(['./src/views/taskManage/modifyDisplay.vue'], resolve)
					}
				},
				{
					path: '/expandMan/waitingMan',
					name: 'expandMan.waitingMan',
					component: (resolve) => {
						require(['./src/views/expandMan/waitingMan.vue'], resolve)
					},
					meta: {title: '审核推广员',},
				},
				{
					path: '/expandMan/expandManIndex',
					name: 'expandMan.expandManIndex',
					component: (resolve) => {
						require(['./src/views/expandMan/expandManIndex.vue'], resolve)
					},
					meta: {
						title: '推广员管理',
						gobackP: true,
					},
				},
				{
					path: '/expandMan/noPassMan',
					name: 'expandMan.noPassMan',
					component: (resolve) => {
						require(['./src/views/expandMan/noPassMan.vue'], resolve)
					},
					meta: {title: '审核推广员',},
				},
				{
					path: '/expandMan/expandDetail',
					name: 'expandMan.expandDetail',
					component: (resolve) => {
						require(['./src/views/expandMan/expandDetail.vue'], resolve)
					},
					meta: {title: '推广员详情',},
				},
				{
					path: '/marketManM/index',
					name: 'marketManM.index',
					component: (resolve) => {
						require(['./src/views/marketManM/index.vue'], resolve)
					},
					meta: {
						title: '市场人员管理',
						gobackP: true,
					},
				},
				{
					path: '/marketManM/marketDetail',
					name: 'marketManM.marketDetail',
					component: (resolve) => {
						require(['./src/views/marketManM/marketDetail.vue'], resolve)
					},
					meta: {
						title: '市场人员详情',
					},
				},
				{
					path: '/useM',
					name: 'useM',
					component: (resolve) => {
						require(['./src/views/useM'], resolve)
					},
					meta: {
						title: '用户管理',
						gobackP: true,
					},
				},
				{
					path: '/useM/detail',
					name: 'useM.detail',
					component: (resolve) => {
						require(['./src/views/useM/detail.vue'], resolve)
					},
					meta: {
						title: '用户管理',
					},
				},
				{
					path: '/orderM/index',
					name: 'orderM.index',
					component: (resolve) => {
						require(['./src/views/orderM/index.vue'], resolve)
					},
					meta: {title: '订单管理',gobackP: true,},
				},
				{
					path: '/orderM/orderDetail',
					name: 'orderM.orderDetail',
					component: (resolve) => {
						require(['./src/views/orderM/orderDetail.vue'], resolve)
					},
					meta: {title: '订单列表',},
				},
				{
					path: '/publicAction/index',
					name: 'publicAction.index',
					component: (resolve) => {
						require(['./src/views/publicAction/index.vue'], resolve)
					},
					meta: {title: '公众号功能',gobackP: true,},
				},
				{
					path: '/publicAction/addAction',
					name: 'publicAction.addAction',
					component: (resolve) => {
						require(['./src/views/publicAction/addAction.vue'], resolve)
					},
					meta: {title: '添加',},
				},
				{
					path: '/publicAction/addAutoReturn',
					name: 'publicAction.addAutoReturn',
					component: (resolve) => {
						require(['./src/views/publicAction/addAutoReturn.vue'], resolve)
					},
					meta: {title: '添加',},
				},
			]
		},
		{
			path: '/spoc-market/publicIndex',
			name: 'market.publicIndex',
			component: (resolve) => {
				require(['./src/views/publicNumM/index.vue'], resolve)
				// require(['./src/views/public/publicIndex.vue'], resolve)
			},
			meta: {
				title: '公众号管理',
			},
		},
	],
}, ];
module.exports = routers;