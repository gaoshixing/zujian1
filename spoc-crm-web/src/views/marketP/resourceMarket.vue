
<style lang='less'>
	.resource-new-gsx {
		.count {
			font-size: 14px;color: #222;
			margin-top: 6px;
			span{
				font-size: 18px;color: #44bcb7;
			}
		}
		.cancleBorder {
            .ivu-table-wrapper {
                border: none;
            }
            .ivu-table:after {
                content: '';
                width: 0px;
                
            }
            .ivu-table-column-center {
                background-color: #fff;
            }
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }	
	}
</style>
<template >
	<div class="resource-new-gsx">
		<v-select 
			style="width: 396px;margin: 15px 0;"
			placeholder="请输入资源来源名称/创建人/客户名称/手机号"
			:datafunc="datafunc"
			icon="search" 
			v-model="compact"
			k='cnname'
			@on-enter="textChange" 
			@on-click="textChange" 
			@selected="textChange">
		</v-select>
		<case-bar-filter :from="2" modelName="客户管理"  menuId="801" title="标签：" :width="74" :mgt="23" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
		</case-bar-filter>
		<BtnAndTime
			ref="BtnAndTime"
			:styleTitle="styleTitle"
			:styleAro="styleAro"
			types="date"
			title="统计时间"
			:btnList="datalistss"
			@onclickChoseTags="onclickChoseTags"
			@getTargetDate="getTargetDate">
		</BtnAndTime>
		<case-bar1 v-if="!isSale" title="分公司" :isShow='false' :tagList='branchOfficelists' @addAcitveCon='addAcitveGroup'  :num='num1' ></case-bar1>
		<case-bar1  title="跟进人"  :tagList='saleList' @addAcitveCon='addAcitveMan'  :num='num2' key1='name' ></case-bar1>
    	<div class="count">共找到  <span v-text="data.count"></span> 条数据</div>
		<btnlist
            title="资源列表"
			v-if="this.isNew"
            >
        </btnlist>
		<btnlist
			v-else
            title="资源列表"
            :btnList='btnList'
            >
        </btnlist>
		<div class="cancleBorder">
			<Table class="checkbox-table"
				:loading="loading"
				:columns="columns"
				@on-selection-change='selectChange'
				:data="data.list"
				@on-sort-change="sortTable">
			</Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
	</div>
</template>

<script>
import caseBar1 from '@public/modules/caseBar1';
import BtnAndTime from '../../modules/btnAndTime';
import { mapGetters } from 'vuex';
import caseBarFilter from "@public/modules/caseBarFilter.vue";
import valid, {errors, crmCustomerImport, sys, newResource} from '../../libs/request.js';
import { waitUntil, getTimeInterval, } from '@public/libs/util';
import vSelect from '@public/modules/vSelect';
import btnlist from '@public/modules/btnlist';
import { mapMutations } from 'vuex'
export default {	
	data() {
		return {
			
			btnList: [
                {
                    text: '导出',
					type: 'primary',
					children: [
						{text: '导出所选',event:this.exportSelect},
						{text: '导出全部',event:this.exportAll},
					]
                },
            ],
			loading: true,
			saleList: [],
			styleTitle: {
				width: '72px'
			},
			styleAro: {
				paddingLeft: '100px',
				marginTop: '5px'
			},
			ids: '',
			startTime: '',
			endTime: '',
			tags: [],
			data: {
				list: [],
				count: 222,
			},
			companyId: '',
			orderType: '',
			sort: '',
			datalistss: [
				{
					title: '不限',
					type: 'date',
					ms: 0,
				},
				{
					title: '今天',
					type: 'date',
					ms: 0,
				},
				{
					title: '最近7天',
					type: 'date',
					ms: -6,
				},
				{
					title: '最近30天',
					type: 'date',
					ms: -29,
				},
			],
			compact: '',
			userId: '',
			num: 0,
			branchOfficelists: [],
			num1: 0,
			num2: 0,
			pageNo: 1,
			pageSize: 10,
			star: '',
			phase: '',
			createType: '',
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
                {
                    title: '客户编号',
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
									const { href } = this.$router.resolve({
										name: 'crm.detail'
									})
									window.open(`${href}?id=${params.row.id}&from=usermanage`, '_blank')
								}
                            }
                        },params.row.cusCode ? parseInt(params.row.cusCode) : '')
                    }
                },
                {
                    title: '客户姓名',
                    align: 'center',
                    key: 'name',
                },
                {
                    title: '创建方式',
					align: 'center',
					key: 'source',
					// filters: [
                    //     {
                    //         label: '客服录入',
                    //         value: 'A'
                    //     },
                    //     {
                    //         label: '市场导入',
                    //         value: 'B'
                    //     }
					// ],
					// render: (h, params) => {
                    //     return h('span', {
                    //     },params.row.source=='kflr'?'客服录入':params.row.source=='swtdr'?'客服录入':'市场导入')
                    // },
                    // filterMultiple: false,
                    // filterRemote (value, row) {
                    //     this.filterLists(value, row);
                    // },
                },
                {
                    title: '创建人',
                    align: 'center',
                    key: 'createBy',
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createDate',
                    sortable: 'custom',
                },
                {
                    title: '回访次数',
                    align: 'center',
					key: 'failCallTimes',
					render: (h, params) => {
                        return h('span', {
                        },params.row.callTimes+params.row.failCallTimes)
                    },
                },
                {
                    title: '拨通次数',
                    align: 'center',
                    key: 'callTimes',
                },
                {
                    title: '星级',
                    align: 'center',
                    key: 'star',
					filters: [
                        {
                            label: '0星',
                            value: 8002
                        },
                        {
                            label: '0.5星',
                            value: 8006
                        },
                        {
                            label: '1星',
                            value: 8003
                        },
                        {
                            label: '2星',
                            value: 8004
                        },
                        {
                            label: '3星',
                            value: 8005
                        }
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filterLists(value, row);
                    },
                },
                {
                    title: '客户状态',
                    align: 'center',
                    key: 'phase',
					filters: [
                        {
                            label: 'TMK库',
                            value: 'tmk'
                        },
                        {
                            label: '跟进中',
                            value: 'sale'
                        },
                        {
                            label: '未分单',
                            value: 'alloc'
                        },
                        {
                            label: '已签约',
                            value: 'assigned'
                        },
                        {
                            label: '公共库',
                            value: 'pub'
                        }
					],
					render: (h, params) => {
                        return h('span', {
                        },params.row.phase)
                    },
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filterLists(value, row);
                    },
                },
                {
                    title: '跟进人',
                    align: 'center',
                    key: 'owner',
                    
				},
                {
                    title: '最新动态',
                    align: 'center',
					key: 'owner',
					minWidth: 60,
					render: (h, params) =>  {
						return h('div', {
							style: {
								textAlign: 'left',
								overflow:'hidden',
								textOverflow:'ellipsis',
								display:'-webkit-box',
								'-webkit-box-orient':'vertical',
								'-webkit-line-clamp':2,
							}
						}, 
							params.row.traceDescription
						)
					}
                    
				},
				{
                    title: '分公司',
                    align: 'center',
                    key: 'office',
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 110,
                    render: (h, params) => {
                        return h("a",  {
							on: {
								click: () => {
									const { href } = this.$router.resolve({
										name: 'crm.detail'
									})
									window.open(`${href}?id=${params.row.id}&from=usermanage&isCheck=isCheck`, '_blank')
								}
							}
						}, '查看')
                    }
                },
            ],
		}
		
	},

	computed: {
		...mapGetters('crm', ['isNew', 'isMarketLeader', 'isMarket', ]),
		isSale() {
			if (this.isMarketLeader || this.isMarket) {
				return true
			} 
			return false
		}
	},

	components: {
		caseBar1,
		vSelect,
		caseBarFilter,
		BtnAndTime,
		btnlist
	},

	mounted() {
		this.getFilialeLists()
		this.newResource(false)
		this.$refs.BtnAndTime.onclickChoseTags(1,this.datalistss[1])
	},

	methods: {
        ...mapMutations(["updateLoadingStatus"]),

		newResource(isPost=true) {
			let data = {
				companyId: this.companyId
            }
            newResource.saleList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
					res.data.data.unshift({
						id: '',
						name: '不限'
					})
					this.saleList = res.data.data
					this.userId = ''
					if(isPost){
						this.getList();
					}
                }
            }).catch(errors.call(this));
		},

		getList() {
			//this.updateLoadingStatus({isLoading:true})
			this.data.list = []
			this.loading = true
			let data = {
				name: this.compact,
				userId: this.userId,
				tags: this.tags,
				officeId: this.companyId,
				startTime: this.startTime,
				endTime: this.endTime,
				createType: 'B',
				orderType: this.orderType,
				sort: this.sort,
				star: this.star,
				phase: this.phase,
				pageNo: this.pageNo,
				pageSize: this.pageSize
            }
            newResource.getList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
					//this.updateLoadingStatus({isLoading:false})
					this.data = res.data.data
					this.loading = false
                }
            }).catch(errors.call(this));
		},

		getFilialeLists() {
            // 获取分公司列表
            let data = {
                grade: 2,
                types: '1,3'
            }
            sys.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
					res.data.data.allCompany.unshift({
						id: '',
						remarks: '全部'
					})
                    this.branchOfficelists = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
            // sys.officeFindCompanyList().then(valid.call(this)).then(res => {
            //     if(res.ok) {
            //         this.branchOfficelists = res.data.data;
            //     }
            // }).catch(errors.call(this));
		},
		
		tagListChange(tags) {
			this.tags = tags.map((item) => {
				let arr = []
				item.childTags.forEach((item1) => {
					arr.push(item1.id)
				})
				return arr
			});
			this.getList();
		},

		addAcitveGroup(id, index) {
			this.num1 = index
			this.companyId = id
			this.newResource()
		},

		addAcitveMan(id, index) {
			this.num2 = index
			this.userId = id
			this.getList()
		},

		textChange() {
			this.getList()
		},

		onclickChoseTags(type, ms, index) {
			if (!index) {
				this.startTime = this.endTime = ''
			} else	{
				const data = getTimeInterval(type, ms);
				this.startTime = data.startTime.substr(0, 10);
				this.endTime = data.endTime.substr(0, 10);
			}
			this.getList()
		},

		getTargetDate(d1, d2) {
			this.startTime = new Date(d1).format('yyyy-MM-dd');
			this.endTime = new Date(d2).format('yyyy-MM-dd');
			this.getList()
		},

		onPageSizeChange(val) {
			this.pageSize = val
			this.getList()
		},

		onPageChange(val) {
			this.pageNo = val
			this.getList()
		},

		sortTable(val) {
			if (val.order == 'normal') {
				this.sort = ''
			}
			this.orderType = val.key
			this.getList()
		},

		filterLists(val, row) {
			if (row == 'source') {
				this.createType = val.length ? val[0] : ''
			} else if (row == 'star') {
				this.star = val.length ? val[0] : ''
			} else if (row == 'phase') {
				this.phase = val.length ? val[0] : ''
			}
			this.getList()
		},

		selectChange(val) {
			this.ids = ''
			val.forEach(item => {
				this.ids += item.id + ','
			})
		},

		datafunc() {
			return new Promise((resole, reject) => {})
		},

		exportAll() {
			// let form = this.$el.querySelector('.formexport');
			let data = {
				name: this.compact,
				userId: this.userId,
				tags: this.tags,
				officeId: this.companyId,
				startTime: this.startTime,
				endTime: this.endTime,
				createType: 'B',
				orderType: this.orderType,
				sort: this.sort,
				star: this.star,
				phase: this.phase,
				pageNo: this.pageNo,
				pageSize: this.pageSize
            }
			window.open(newResource.exportRresource(data)) 
		},

		exportSelect() {
			if (!this.ids) {
				this.$Message.info('请选择数据')
				return
			}
			let data = {
				name: this.compact,
				userId: this.userId,
				tags: this.tags,
				officeId: this.companyId,
				startTime: this.startTime,
				endTime: this.endTime,
				createType: 'B',
				orderType: this.orderType,
				sort: this.sort,
				star: this.star,
				phase: this.phase,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				ids: this.ids,
            }
			window.open(newResource.exportRresource(data)) 
		}
	}
}
</script>
