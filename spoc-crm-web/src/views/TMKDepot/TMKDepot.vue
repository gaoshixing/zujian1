<style lang="less">
	.TMKDepot {
		border-top: 1px #e0e0e0 solid;
		.ivu-table th {
			background: #fff;
		}
		.TMKDepot_time {
			margin-top: 8px;
		}
		.table_box {
			padding: 10px 0px 20px;
			.strip-tit {
				font-size: 14px;
				span {
					font-size: 16px;
					color: #44bcb7;
				}
			}
			.ivu-table-wrapper {
				border: none;
				.ivu-table {
					&:before,
					&:after {
						display: none;
					}
					.ivu-table-body {
						.ivu-table-tbody {
							.ivu-table-row {
								td {
									.ivu-badge-dot {
										right: -14px;
									}
								}
							}
						}
					}
				}
			}
		}
		.page-box {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
		.search-data{
			position: relative;padding-left: 91px;zoom: 1;width: 860px;
			&:after,&::before{
				content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
			}
			.title{
				width: 84px;position: absolute;left: 0;top: 0;line-height: 30px;
				color: #b8b8b8;text-align: right;
			}
			li,.more{
				float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
				&.active{
					background: #44bcb6;color: #fff;
				}
			}
		}
	}
</style>

<template>
	<div class="TMKDepot">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<case-bar-filter :from="2" modelName="客户管理" menuId="801" title="标签：" :width="84" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
		</case-bar-filter>
		<time-optpons @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
		<div class="search-data">
            <span class="title">分公司：</span>
            <ul>
                <li :class="[!branchOfficeChecked ? 'active' : '']" @click="changeBranchOffice()">不限</li>
                <li v-for="item in branchOfficelists" :key="item.id" @click="changeBranchOffice(item)"
                    :class="{ active: branchOfficeChecked === item.id}" >{{ item.remarks }}</li>
            </ul>
        </div>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{count}}</span> 条资源</p>
			<btn-list title="客户列表" :btnList="tableSele.length?btninfo:[]"></btn-list>
			<Table :loading="loading" :columns="columns" :data="data" @on-sort-change="sort" @on-selection-change="tableSelected"></Table>
		</div>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange" :page-size-opts="[10,20,50,80,100]"></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import timeOptpons from "../../modules/timeOptpons.vue";
	import BtnList from '@public/modules/btnlist';
	import valid, {
		errors,
		sys,
		common,
		crmCustomerTmk,
	} from "../../libs/request.js";
	export default {
		data() {
			return {
				branchOfficeChecked: '',
            	branchOfficelists: [],
				loading: true,
				count: 20,
				pageSize: 10,
				pageNo: 1,
				search: '',
				tags: [],
				btninfo: [
					{
						text: '批量领取',
						type: 'primary',
						event: this.BatchToReceive
					},
				],
				pageNo: 1,
				sources:'',
				pageSize: 10,
				beforeTime: '',
				afterTime: '',
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '编号',
						align: 'center',
						key: 'cusCode',
						render: (h, params) => {
							let self = this;
							return h('div', {
							}, [
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									on:{
										click:()=>{
											self.jump(params.row)
										}
									}
								}, params.row.cusCode ? parseInt(params.row.cusCode) : '')
							])
						}
					},
					{
						title: '客户姓名',
						align: 'center',
						key: 'cusName',
						render: (h, params) => {
							let self = this;
							return h('div', {
							}, [
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									on:{
										click:()=>{
											self.jump(params.row)
										}
									}
								}, params.row.cusName)
							])
						}
					},
					{
						title: '分公司',
						align: 'center',
						key: 'firstOfficeName',
					},
					{
						title: '跟进人',
						align: 'center',
						key: 'firstUserName',
						// render: (h, params) => {
						// 	let self = this;
						// 	return h('div', {
						// 	}, params.row.hisNameList.join(','))
						// },
					},
					{
						title: '入库时间',
						align: 'center',
						key: 'createDate',
						sortable: 'custom'
					},
					{
						title: '来源',
						align: 'center',
						key: 'sourceLabel',
						filters: [],
						filterMultiple: false,
						filterRemote(value, key) {
							this.sources=value[0];
							this.getList()
						}
					},
					{
						title: '轮次',
						align: 'center',
						key: 'turn',
						sortable: 'custom'
					},
					{
						title: '操作',
						key: 'handle',
						align: 'center',
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								},
							}, [
								h("a", {
									style: {
										color: '#44bcb7',
										fontSize: '12px'
									},
									attrs: {
										href: "javascript:void(0)"
									},
									on: {
										click: (event) => {
											this.draw(params.row);
											event.stopPropagation();
										}
									}
								}, '领取'),
							])
						}
					}
				],
				data: [],
				orderByType:'',
				orderByStatus:'',
				orderByMap:{
					score:1,
					createDate:2,
					turn:3
				},
				tableSele:[]
			}
		},
		computed: {
		},
		components: {
			vSelect,
			caseBarFilter,
			timeOptpons,
			BtnList
		},
		created(){
			this.getFilialeLists();
			this.getList();
			let params={
				type:'crm_customer_tmk_source'
			}
			sys.dictListData(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.columns[6].filters=res.data.data
					}
			}).catch(errors.call(this));
			
		},
		methods: {
			getList() {
				let params = {
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"name":this.search,
					"orderByType": this.orderByType,
					"orderByStatus": this.orderByStatus,
					"searchTags": this.tags,
					"startTime": this.beforeTime,
					"endTime":this.afterTime,
					"sources":this.sources
				}
				if(this.branchOfficeChecked) params.firstOfficeId = this.branchOfficeChecked;
				crmCustomerTmk.listPagePub(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.data=res.data.data.list;
						this.count=res.data.data.count;
						this.pageNo=res.data.data.pageNo;
						this.loading = false
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.pageNo = 1;
					this.getList();
				})
			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.pageNo = 1;
				this.getList();
			},
			timeChange(start,end) {
				this.beforeTime=start;
				this.afterTime=end;
				this.pageNo = 1;
				this.getList();
			},
			onDataPickStart(start,end) {
				this.beforeTime=start;
				this.afterTime=end;
				this.pageNo = 1;
				this.getList();
			},
			onDataPickEnd(start,end) {
				this.beforeTime=start;
				this.afterTime=end;
				this.pageNo = 1;
				this.getList();
			},
			sort(data) {
				if(data.order == 'normal') {
					this.sortType = '';
				} else if(data.order == 'asc') {
					this.orderByStatus = 0;
				} else {
					this.orderByStatus = 1;
				}
				this.orderByType=this.orderByMap[data.key];
				this.getList();
			},
			pageChange(val) {
				this.pageNo = val;
				this.$el.parentElement.scrollTop = 0;
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			BatchToReceive(){
				let arr=[];
				this.tableSele.forEach((v,k)=>{
					arr.push({id:v.id,cusId:v.cusId})
				})
				crmCustomerTmk.batchLock(arr).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.instance(res.data);
						this.getList();
					}
				}).catch(errors.call(this));
			},
			draw(val){
				let params = {
					id:val.id,
					cusId:val.cusId
				}
				crmCustomerTmk.lock(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.instance(res.data);
						this.getList();
					}
				}).catch(errors.call(this));
			},
            instance (data) {
            	console.log(data)
                let title = '';
                let content = data.message;
            	if(data.statusCode==200){
            		title="领取成功";
            	}else{
            		title="领取失败";
            	}
                switch (data.statusCode) {
                    case 200:
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                    case -1:
                        this.$Modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
            tableSelected(val){
            	this.tableSele=val;
			},
			getFilialeLists() {
				// 获取分公司列表
				let data = {
					grade: 2,
					types: '1,3'
				}
				sys.officeList(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.branchOfficelists = res.data.data.allCompany;
					}
				}).catch(errors.call(this));
				// sys.officeFindCompanyList().then(valid.call(this)).then(res => {
				//     if(res.ok) {
				//         this.branchOfficelists = res.data.data;
				//     }
				// }).catch(errors.call(this));
			},
			changeBranchOffice(obj) {
				// 分公司选择
				if(obj) {
					this.branchOfficeChecked = obj.id;
				}else{
					this.branchOfficeChecked = '';
				}
				this.getList();
			},
			jump(val){
				this.$router.push({name:'crm.detail',query:{id:val.cusId,tmk:1}})
			}
		}
	}
</script>