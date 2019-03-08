<style lang="less">
	.flow {
		border-top: 1px #e0e0e0 solid;
		.ivu-table th {
			background: #fff;
		}
		.option_box {
			margin-top: 8px;
			.rank,
			.circle {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				.tit {
					min-width: 84px;
					color: #999;
					padding: 5px 0;
					text-align: right;
					box-sizing: border-box;
					margin: 2px 10px 2px 0px;
					line-height: 14px;
					white-space: nowrap;
					overflow: hidden;
				}
				ul {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					li {
						margin: 2px 10px 2px 0px;
						line-height: 14px;
						white-space: nowrap;
						overflow: hidden;
					}
					.options {
						cursor: pointer;
						padding: 5px 12px;
						&.active {
							background-color: #44bcb6;
							color: #fff;
						}
					}
					.show_all {
						line-height: 14px;
						padding: 5px 12px;
						cursor: pointer;
						&:hover {
							color: #44bcb7;
						}
					}
				}
			}
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
	}
	.update-time-GSX {
        p {
            line-height: 40px;
        }
        p >span:first-child {
            color: #b8b8b8;
            display: inline-block;
            text-align: right;
            width: 130px;
        }
	}
</style>

<template>
	<div class="flow">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<div class="option_box">
			<div class="rank">
				<div class="tit">
					{{rank.tit}}：
				</div>
				<ul>
					<li class="options" v-for="(item,index) in rank.options" :key="index" v-show="index<showNum" :class="{active:item.id==level}" @click="rankChange(item.id)">{{item.id}}</li>
					<!-- <li class="show_all" @click="showNum=rank.options.length" v-show="showNum==15">全部&nbsp;&nbsp;
						<Icon type="ios-arrow-right" size="12"></Icon>
					</li>
					<li class="show_all" @click="showNum=15" v-show="showNum!=15">
						<Icon type="ios-arrow-left" size="12"></Icon>&nbsp;&nbsp;收起</li> -->
				</ul>
			</div>
			<div class="circle">
				<div class="tit">
					{{circle.tit}}：
				</div>
				<ul>
					<li class="options" v-for="(item,index) in circle.options" :key="index" v-show="index<showNum" :class="{active:item.value==isFall}" @click="circleChange(item.value)">{{item.label}}</li>
				</ul>
			</div>
		</div>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{count}}</span> 条资源</p>
			<btn-list title="客户列表" :btnList="tableSelected.length?btninfo:[]"></btn-list>
			<Table :loading="loading" :columns="columns" :data="data" @on-selection-change="tableChange"></Table>
		</div>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange" :page-size-opts="[10,20,50,80,100]"></Page>
			</div>
		</div>

		<Modal
            v-model="modal1"
            width=728
            title="修改掉落时间"
            @on-ok="okupTime"
			ref="duration"
			class="update-time-GSX"
            @on-cancel="cancelupTime">
            <div class="">
                <p><span>销售顾问：</span>{{tempObj.name}}</p>
				<p><span>分单掉落时长：</span> <InputNumber :max="99999" :min="1" v-model="tempObj.fdDuration" :precision='0' style="width:150px"></InputNumber>分钟</p>
                <p><span>抢单掉落时长：</span> <InputNumber :max="99999" :min="1" v-model="tempObj.qdDuration" :precision='0' style="width:150px"></InputNumber>分钟</p>
                <p>
					<span>回访掉落时长：</span>
					<!-- @on-change='durChange' -->
					<Select v-model="tempDur" style="width:150px" >
						<Option v-for="(item, index) in durList" :value="item.value" :key="index">{{ item.label }}</Option>
					</Select>
					<InputNumber v-if="tempDur=='888'" :max="99999" :min="1" v-model="tempObj.globalDuration" :precision='0' style="width:150px"></InputNumber><span v-if="tempDur=='888'">天</span>
				</p>
               	<!-- <p><span>最晚分单掉落时长：</span><Input v-model="tempObj.fdDuration" style="width:150px"></Input>分钟</p>
                <p><span>最晚抢单掉落时长：</span><Input v-model="tempObj.qdDuration" style="width:150px"></Input>分钟</p> -->
            </div>
        </Modal>
	</div>
</template>

<script>
	import vSelect from '@public/modules/vSelect';
	//	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import BtnList from '@public/modules/btnlist';
	import valid, {
		errors,
		sys,
		sysConfig,
		common,
		crmCustomerTmk,
		crmCustomer,
		crmCustomerSale
	} from "../../libs/request.js";
	import {mapMutations} from 'vuex';
	export default {
		data() {
			let _this = this
			return {
				durList: [
                    {
                        value:  -1,
                        label: '默认'
                    },
                    {
                        value:  888,
                        label: '自定义'
                    },
                    {
                        value: 99999,
                        label: '不参与掉落'
                    },
                ],
				tempObj: {
				},
				tempDur: '',
				modal1: false,
				level: this.$route.query.level,
				loading: false,
				count: 20,
				pageSize: 10,
				pageNo: 1,
				search: '',
				rank: {
					options: [],
					tit: '职级'
				},
				isFall: '',
				circle: {
					options: [{
							label: '全部',
							value: ''
						},
						{
							label: '是',
							value: '1'
						},
						{
							label: '否',
							value: '0'
						},
					],
					tit: '参与流转'
				},
				showNum: 15,
				btninfo: [{
					text: '参与流转',
					type: 'primary',
					event: this.setCircleTrue
				},{
					text: '不参与流转',
					type: 'primary',
					event: this.setCircleFalse
				}, ],
				pageNo: 1,
				pageSize: 10,
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '销售顾问',
						align: 'center',
						key: 'name',
						width: 85
					},
					{
						title: '所属分公司',
						align: 'center',
						key: 'companyName',
						minWidth: 120
					},
					{
						title: '部门名称',
						align: 'center',
						key: 'officeName',
						minWidth: 85
					},
					// {
					// 	title: '岗位',
					// 	align: 'center',
					// 	key: 'workName',
					// 	width: 110
					// },
					{
						title: '分单掉落时长(min)',
						align: 'center',
						key: 'fdDuration',
						// width: 110
					},
					{
						title: '抢单掉落时长(min)',
						align: 'center',
						key: 'qdDuration',
						// width: 110
					},
					{
						title: '回收时长(天)',
						align: 'center',
						key: 'globalDuration',
						render: (h, params) => {
							return h('span', {}, 
								params.row.globalDuration == '-1' ? '默认' : params.row.globalDuration == '99999' ? '不参与掉落' : params.row.globalDuration
							)
						}
						// width: 110
					},
					{
						title: '职级',
						align: 'center',
						key: 'levelName',
						width: 70
					},
					{
						title: '首电回访效率',
						align: 'center',
						key: 'firstCallRatio',
						width: 120
					},
//					{
//						title: '有效时间',
//						align: 'center',
//						render: (h, params) => {
//							return h('div', {},
//								params.row.circleStartTime + '--' + params.row.circleEndTime)
//						},
//						width: 180
//					},
					{
						title: '操作人',
						align: 'center',
						key: 'updateFallBy',
						width: 100
					},
					{
						title: '参与流转',
						key: 'handle',
						align: 'center',
						width: 180,
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								},
							}, [
								h("i-switch", {
									props: {
										value: params.row.isFall,
										"true-value":'1',
										"false-value":'0'
									},
									on: {
										'on-change' (val) {
											_this.changeStatus(params.row.id, val)
										}
									}
								}, [
									h("span", {
										slot: 'open'
									}, '是'),
									h("span", {
										slot: 'close'
									}, '否'),
								]),
								h('a', {
									style: {
										marginLeft: '5px'
									},
									on: {
										click: () => {
											this.tempObj = params.row
											this.tempObj.fdDuration = this.tempObj.fdDuration/1
											this.tempObj.qdDuration = this.tempObj.qdDuration/1
											this.tempDur = this.tempObj.globalDuration == '-1' ? -1 : this.tempObj.globalDuration == '99999' ? 99999 : 888
											this.tempObj.globalDuration = this.tempObj.globalDuration == '-1' ? 0 : this.tempObj.globalDuration == '99999' ? 0 : this.tempObj.globalDuration/1
											this.modal1 = true
										}
									}
								},
								'修改时间'
								)
							])
						}
					}
				],
				data: [{
					updateDate: 666
				}],
				tableSelected: [],
			}
		},
		computed: {},
		components: {
			vSelect,
			BtnList,
			//			vSearchOptions
		},
		created() {
			this.getList();
			//			rank
                sysConfig.dropList({}).then(valid.call(this))
                .then(res => {
                    if(res.ok) {
						this.rank.options = res.data.data;
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
//			let params = {
//				type: 'sys_user_competence_level',
//			}
//			sys.getTypeList(params).then(valid.call(this)).then(res => {
//				if(res.ok) {
//					this.rank.options = res.data.data;
//				}
//			}).catch(errors.call(this));
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			durChange(val) {
				this.tempDur = val
			},

			saveTime() {
				this.updateLoadingStatus({isLoading:true});
				let params = {
					id: this.tempObj.id,
					"fdDuration": this.tempObj.fdDuration,
					"qdDuration": this.tempObj.qdDuration,
					globalDuration: this.tempDur == 888 ? this.tempObj.globalDuration : this.tempDur,
				}
				crmCustomerTmk.saveTime(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.info(res.data.message)
						this.getList()
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({isLoading:false});
                });
			},
			getList() {
				this.updateLoadingStatus({isLoading:true});
				this.loading = true;
				let params = {
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"isFall": this.isFall,
					"level": this.level,
					"name": this.search
				}
				crmCustomerSale.getFallSettingInfo(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.data = res.data.data.list;
						this.count = res.data.data.count;
						this.pageNo = res.data.data.pageNo;
						this.loading = false
					}
				}).catch(errors.call(this)).finally(() => {
					this.updateLoadingStatus({isLoading:false});
                });
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			pageChange(val) {
				this.pageNo = val;
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			tableChange(val) {
				this.tableSelected = val.map(item=>item.id);
			},
			changeStatus(id, status) {
				this.setCircleWhiteList([id],status);
			},
			rankChange(val) {
				this.level = val;
				this.getList();
			},
			circleChange(val) {
				this.isFall = val;
				this.getList();
			},
			setCircleTrue(){
				this.setCircleWhiteList(this.tableSelected,1);
			},
			setCircleFalse(){
				this.setCircleWhiteList(this.tableSelected,0);
			},
			setCircleWhiteList(ids,status){
				let params = {
					ids:ids,
					isFall:status
				}
				crmCustomerSale.setCircleWhiteList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
                        this.$Message.info(res.data.message)
						this.getList();
					}
				}).catch(errors.call(this));
				
			},
			
			okupTime() {
				if (this.tempObj.qdDuration < 1 || this.tempObj.fdDuration < 1) {
                    this.$refs.duration.visible = true
					this.modal1 = true
                    this.$Message.error('请输入大于0的时间')
                    return
                }
				if (this.tempDur == 888 && !this.tempObj.globalDuration) {
                    this.$refs.duration.visible = true
					this.modal1 = true
                    this.$Message.error('请输入回访时长')
                    return
                }
				this.saveTime()
			},
			cancelupTime() {

			},
		}
	}
</script>