<style lang="less">
	.myResource {
		border-top: 1px #e0e0e0 solid;
		.ivu-table th {
			background: #fff;
		}
		.myResource_time {
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
			position: relative;padding-left: 91px;zoom: 1;min-height: 32px;
			// width: 860px;
			&:after,&::before{
				content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
			}
			.title{
				width: 85px;position: absolute;left: 0;top: 0;line-height: 30px;
				color: #999;text-align: right;
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
	<div class="myResource">
		<v-select style="width: 396px;margin: 15px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="search" k='cnname' :datafunc="searchDropList" @on-enter="textChange" @on-click="textChange" @selected="textChange">
		</v-select>
		<case-bar-filter :from="2" modelName="客户管理" menuId="801" title="标签：" :width="84" :mgt="7" @tagListChange="tagListChange" align="right" class="caseBar" tit-color="#999">
		</case-bar-filter>
		<time-optpons @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange">
		</time-optpons>
		<div class="search-data">
			<span class="title">客户分组：</span>
			<ul>
				<li :class="[!fzChecked ? 'active' : '']" @click="changeFz()">不限</li>
				<li v-for="item in fzlists" :key="item.id" @click="changeFz(item)"
					:class="{ active:fzChecked === item.id}" >{{ item.name }}</li>
			</ul>
			<Button style="margin-top:2px;margin-left: 8px;" type="primary" @click="showFzModal" size="small">编辑分组</Button>
		</div>
		<div class="table_box">
			<p class="strip-tit">共找到 <span>{{count}}</span> 条资源</p>
			<btn-list title="客户列表" :btnList="tableSelected.length?btninfo:[]"></btn-list>
			<Table :loading="loading" :columns="columns" :data="data" @on-sort-change="sort" @on-selection-change="tableChange"></Table>
		</div>
		<div class="page-box" v-if="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page :total="count" :page-size="10" :current="pageNo" show-total :show-sizer="count>10" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange" :page-size-opts="[10,20,50,80,100]"></Page>
			</div>
		</div>
		<Modal v-model="transfer" width="730" class-name="vertical-center-modal">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				选择转让人
			</p>
			<div class="transferBody">
				<v-select style="width: 396px;margin:0 0 10px 0;" placeholder="请输入客户姓名/编号" icon="search" v-model="searchRole" k='cnname' :datafunc="searchDropList" @on-enter="roleChange" @on-click="roleChange" @selected="roleChange">
				</v-select>
				<v-search-options :data="company.options" byKey="label" :searchTitle="company.tit" @on-select-item="fenpeiCompanyChange" labelWidth="98" v-if="company.options.length" multiple style="margin-top: 10px;">
				</v-search-options>
				<div>
					<Form ref="affirmForm1" :label-width="100">
						<FormItem label="转让人：">
							<RadioGroup v-model="roleId">
								<Radio :label="item.id" v-for="item in roleList" :key="item.id">{{item.name}}</Radio>
							</RadioGroup>
						</FormItem>
					</Form>
				</div>
			</div>
			<div slot="footer">
				<Button @click="offTransfer">取消</Button>
				<Button type="primary" @click="okTransfer">确定</Button>
			</div>
		</Modal>
		<Modal 
			v-model="callWarn" 
            title="提示"
            @on-ok="ok3"
            @on-cancel="cancel3"
			width="730">
				<p style="text-align:center;line-height:100px">
					有未挂断的电话，请挂断后再给其他客户打电话。
				</p>
		</Modal>
		<!-- 分组 -->
    	<edit-group ref="editGroupRef" type="crm_customer_tmk_group" parentId="5006" @onRefresh="getList()" @getFzLists="getFzLists()"></edit-group>
	</div>
</template>

<script>
	import editGroup from "../../modules/modal/editGroup.vue";
	import vSelect from '@public/modules/vSelect';
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import timeOptpons from "../../modules/timeOptpons.vue";
	import vSearchOptions from "@public/modules/vSearchOptions.vue";
	import BtnList from '@public/modules/btnlist';
	import {TQ} from '../../libs/TQ.js'
	import {mapMutations} from 'vuex';
	import valid, {
		errors,
		sys,
		common,
		crmCustomerTmk,
		crmCustomer,
	} from "../../libs/request.js";
	let TQObj = null
	export default {
		data() {
			return {
				callWarn: false,
				loading: true,
				count: 20,
				pageSize: 10,
				pageNo: 1,
				search: '',
				tags: [],
				onOf: true,
				company: {
					options: [],
					tit: '分公司'
				},
				companyId: '',
				btninfo: [
					{
						text: '移动分组',
						type: 'primary',
						event: this.showMoveGroup
					},
					{
					text: '转让客户',
					type: 'primary',
					event: this.assign
				}, ],
				pageNo: 1,
				pageSize: 10,
				signTime: {
					searchName: '分单时间',
					list: [{
							label: '不限',
							id: ''
						}, {
							label: '今天',
							id: 1
						},
						{
							label: '最近7天',
							id: 2
						},
						{
							label: '最近30天',
							id: 3
						},
					]
				},
				months: '',
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
							return h('div', {}, [
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									on: {
										click: () => {
											self.jump(params.row.cusId)
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
							return h('div', {}, [
								h('a', {
									attrs: {
										href: "javascript:void(0)"
									},
									on: {
										click: () => {
											self.jump(params.row.cusId)
										}
									}
								}, params.row.cusName)
							])
						}
					},
					{
						title: '分值',
						align: 'center',
						key: 'score',
						sortable: 'custom'
					},
					{
						title: '分单状态',
						align: 'center',
						key: 'allocStatusLabel',
						render: (h, params) => {
							return h('span', {}, 
								params.row.allocStatusLabel ? params.row.allocStatusLabel : params.row.saleOwnerName ? '已分配' : '待分配'
							)
						}
					},
					{
						title: '所属销售',
						align: 'center',
						key: 'saleOwnerName',
					},
					{
						title: '最近跟单时间',
						align: 'center',
						key: 'receiveTime',
					},
					{
						title: '更新时间',
						align: 'center',
						key: 'updateDate',
						sortable: 'custom'
					},
					{
						title: '跟进阶段',
						align: 'center',
						key: 'statusLabel',
						filters: [],
						filterMultiple: false,
						filterRemote(value, key) {
							this.status = value[0];
							this.getList();
						}
					},
					{
						title: '状态',
						align: 'center',
						key: 'activeStatus',
						filters: [{
								label: '未激活',
								value: 0
							},
							{
								label: '已激活',
								value: 1
							}
						],
						filterMultiple: false,
						filterRemote(value, key) {
							this.activeStatus = value[0];
							this.getList();
						}
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
										fontSize: '12px',
										marginRight: '15px'
									},
									attrs: {
										href: "javascript:void(0)"
									},
									on: {
										click: () => {
											this.$router.push({
												name: "crm.detail",
												query: {
													id: params.row.cusId,
													from: 'myclient',
													noEdit: true,
													tmk: 1
												}
											});
										}
									}
								}, '跟进'),
								h("span", {}, [
									h('i', {
										attrs: {	
											class: params.row.cusId == this.clientObj.cusId ? 'icon-guaduan_ iconfont' : 'icon-dadianhua iconfont'
										},
										style: {
											color: params.row.cusId == this.clientObj.cusId ? '#FFA39E': '#44bcbc',
											cursor: 'pointer',
											fontSize: '12px',
											display: this.call ? 'block': 'none'
										},
										on: {
											click: () => {
												this.getlistPhoneData(params.row, params.row.cusId != this.clientObj.cusId)
											}
										}
									}), 
									// h('span', {
									// 		style: {
									// 		color: params.row.cusId == this.clientObj.cusId ? 'red' : '#44bcb7',
										
									// 	},
									// 	attrs: {
									// 		href: "javascript:void(0)"
									// 	},
										
									// },
									// )
									
								]),
								
								//								h("Icon", {
								//									style: {
								//										color: '#44bcb7 !important',
								//										fontSize: '22px',
								//										marginLeft: '14px',
								//										cursor: 'pointer'
								//									},
								//									attrs: {
								//										type: "ios-telephone"
								//									},
								//									on: {
								//										click: () => {}
								//									}
								//								}, ''),
							])
						}
					}
				],
				data: [],
				cusId: '',
				isLoading: false,
				orderByType: '',
				orderByStatus: '',
				activeStatus: '',
				status: '',
				clientObj: {},
				orderByMap: {
					score: 1,
					updateDate: 2,
				},
				call: false,
				transfer: false,
				searchRole: '',
				roleId: '',
				validObj: {
					duration: '',
					callTime: '',
				},
				roleList: [],
				tableSelected: [],
				fzlists:[],
				fzChecked:''
			}
		},
		computed: {},
		components: {
			vSelect,
			caseBarFilter,
			timeOptpons,
			BtnList,
			vSearchOptions,
			editGroup
		},
		created() {
			this.getFzLists();
			this.getList();
			this.showTrans();
			let params = {
				flag: 1
			}
			crmCustomer.showDictStatus(params).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.columns[8].filters = res.data.data;
				}
			}).catch(errors.call(this));
			this.getTqParams()
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			changeFz(obj) {
				// 选择客户分组
				if(obj) {
					this.fzChecked = obj.id;
				}else{
					this.fzChecked = '';
				}
				this.getList();
			},
			showFzModal() {
            // 编辑分组
				this.$refs.editGroupRef.showEditGroup(this.fzlists);
			},
			showMoveGroup() {
				// 移动分组
				this.$refs.editGroupRef.showMoveGroup(this.fzlists, this.tableSelected);
			},
			getFzLists() {
				let params = {
					parentId: 5006
				}
				common.getUserTagList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.fzlists = res.data.data;
						this.$refs.editGroupRef.uploadLitst(this.fzlists);
					}
				}).catch(errors.call(this));
			},
			cancel3() {},
			ok3() {},
			getlistPhoneData(val, isNewCall) {
				if (isNewCall && this.clientObj.phone) {
					this.callWarn = true
					return
				}
				if (this.clientObj.phone && !isNewCall) {
					this.clientObj = {}
					this.hangup()
					return
				}
				this.cusId = val.cusId
				let obj = {
					cusId: val.cusId
				}
				crmCustomer.listPhoneData(obj).then(valid.call(this)).then(res=>{
				if (res.ok) {
					if (res.data.data.length) {
						this.clientObj = res.data.data[0]
						this.validObj.callTime = new Date().getTime()
					} else {
						this.clientObj = {}
						this.$Message.error('客户暂无电话号码')
						return
					}
					// this.clientObj.phone = '15210604095'
					// this.clientObj.phone = '18810642083'
					// this.clientObj.phone = '18649115258'
					this.clickcall()
				}
				}).catch(errors.call(this));
			},

			getTqParams() {
            	this.updateLoadingStatus({isLoading: true});
				crmCustomerTmk.TQparams().then(valid.call(this)).then(res=>{
				if (res.ok) {
					const demo  = new TQ(res.data.data)
					TQObj = demo.init()
					TQObj.success(
						() => {
							this.call = true
						}
					)
				}
				}).catch(errors.call(this)).finally(() => {
            		this.updateLoadingStatus({isLoading: false});
				});
			},

			clickcall() {
				if (!this.call) {
					this.$Message.error('TQ配置不成功')
					return
				}
				if (!this.clientObj.phone) {
					this.$Message.error('电话不能为空')
					return
				}
				const _this = this
				console.log(_this.clientObj.phone, 777)
				// this.statusTQ().then(() => {
				let makeCallOption = {
					phone: _this.clientObj.phone, //外呼电话号码		
					error: function(ret) { //操作失败回调函数
						_this.$set(_this.clientObj, 'cusId', '')
						_this.$set(_this.clientObj, 'phone', '')
						_this.$Message.error(ret.errmsg)
					//参数ret ：{"errcode":"1001","errmsg":"初始化配置不成功，操作失败! "}
					//错误见《错误码说明》
					},	
					success: (ret) => { //操作成功回调函数
						console.log(ret, 'succ')
						_this.callEvent()
					//参数ret ：{"errcode":"0","errmsg":" 操作成功! "}
							}
					};
					var makeCallCallBack = function(ret, jsonObject) {
						// _this.hangup()
						//返回值ret示例：
					//{"call_id":"7f9d0fac-28c0-11e7-9b0b-a7bde87e7c89","errcode":0,"errmsg":"OK"}};
					//jsonObject对象示例：
					//{"strid":"seat01","uin":8000001,"admin_uin":8000000,"phone":"13711110000"}
					}
					/**
					* 点击外呼触发函数
					* @param {makecall}外呼标识,固定值
					* @param {Object} makeCallOption 电话外呼参数
					* @param {Function} makeCallCallBack 呼叫成功回调，输出json格式消息内容
					*/

					TQObj.invokeEvent("makecall", makeCallOption, makeCallCallBack);
				// }).catch(res => {
				// 	this.$Message.error(res)
				// })
			},
			callEvent() {
				const _this = this
				TQObj.monitorEvent("callEvent", function(message, jsonObject) {
					if (message.call_event.call_state.includes('hangup')) {
						_this.$set(_this.clientObj, 'cusId', '')
						_this.$set(_this.clientObj, 'phone', '')
						console.log(message.call_event)
						_this.validObj.duration = (message.call_event.real_hangup_time - message.call_event.real_answer_time)/1000000
						if (!message.call_event.real_answer_time) return
						if (_this.onOf) 	_this.tqValid()
					}
					//以下是接收电话事件的回调操作，用户自定义
					//参数message：消息体，json格式；参数见下面解释；
				// jsonObject对象示例： {"strid":"seat01","uin":8000001,"admin_uin":8000000}
				});
			},
			// statusTQ() {
			// 	//其他业务处理，如hangup、makecall等
			// 	return new Promise((resole, reject) => {
			// 		const _this = this
			// 		TQObj.monitorEvent("seatState", function(message, jsonObject) {
			// 			//以下是接收电话状态的回调操作，用户自定义
			// 			// 参数message：消息体，json格式字符串；参数见下面解释；
			// 			//jsonObject对象示例： {"strid":"seat01","uin":8000001,"admin_uin":8000000}
			// 			let msg = message.phoneseat.status
			// 			if ( msg !== 'Available') {
			// 				let msgInfo
			// 				switch (msg) {
			// 					case 'Logged-Out':  msgInfo = '离线' ; break;
			// 					case 'On-Break':  msgInfo = '忙碌' ; break;
			// 					case 'Break':  msgInfo = '拒接' ; break;
			// 					default: msgInfo = '未知错误'
			// 				}
			// 				reject(msgInfo)
			// 			}
			// 			resole()
			// 		})
			// 	})
				
			// },

			hangup(call_id) {
				//call_id：事件标识
				//传call_id参数，指定挂断该事件标识对应的通话
				//不传call_id参数：页面监听电话事件时，可不传call_id参数
				var hangupOption = {
					error: function(ret) {//操作失败回调函数
						//参数ret ：{"errcode":"1001","errmsg":"初始化配置不成功，操作失败! "}
						//其他错误见《错误码说明》
					},
					success: (ret) => {//操作成功回调函数
						
						//参数ret ：{"errcode":"0","errmsg":" 操作成功! "}
					}
				};
				var hangupCallBack = function(ret, jsonObject) {
					// console.log(ret, jsonObject, 88)
						// TQObj.destroy()
				//返回值ret示例：
				//{"call_id":"7f9d0fac-28c0-11e7-9b0b-a7bde87e7c89","errcode":0,"errmsg":"OK"}};
				//jsonObject对象示例：
				//{"strid":"seat01","uin":8000001,"admin_uin":8000000,"phone":"13711110000"}
				};
				/**
				* 执行挂机操作	
				* @param {String} "hangup" 挂机标识,固定值
				* @param {Object} hangupOption 电话挂机参数
				* @param {Function} hangupOption 电话挂机操作回调函数，输出json格式消息内容
				*/
				TQObj.invokeEvent("hangup", hangupOption, hangupCallBack);
			},

			tqValid() {
				this.onOf = false
				if (this.validObj.duration < 30) return
				let params ={
						"cusId": this.cusId,
						"duration": this.validObj.duration,
						"callTime": this.validObj.callTime
					}
				crmCustomerTmk.tqValid(params).then(valid.call(this)).then(res => {
					if(res.ok) {	
					}
				}).catch(errors.call(this)).finally(() => {
					this.onOf = true
				});
			},

			showTrans() {
				let params = {
					types: '1,2',
					grades: '2'
				}
				sys.officeList(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						let arr = res.data.data.allCompany.map((item) => {
							return {
								label: item.name.match(/[\u4e00-\u9fa5]+/g).join(''),
								id: item.id
							};
						})
						arr.unshift({
							label: '不限',
							id: ''
						});
						this.company.options = arr;
					}
				}).catch(errors.call(this));
			},
			getList() {
				this.loading = true;
				let params = {
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"name": this.search,
					"orderByType": this.orderByType,
					"orderByStatus": this.orderByStatus,
					"activeStatus": this.activeStatus,
					"searchTags": this.tags,
					"startTime": this.beforeTime,
					"endTime": this.afterTime,
					"inFlag": '0',
					"status": this.status,
					'group': this.fzChecked
				}
				crmCustomerTmk.listPage(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.tableSelected = [];
						this.data = res.data.data.list;
						this.count = res.data.data.count;
						this.pageNo = res.data.data.pageNo;
						this.loading = false
					}
				}).catch(errors.call(this));
			},
			searchDropList(word) {
				return new Promise((resolve, reject) => {});
			},
			textChange(val) {
				this.$nextTick(() => {
					this.getList();
				})
			},
			//筛选标签变化
			tagListChange(tags) {
				this.tags = tags;
				this.pageNo = 1;
				this.getList();
			},
			timeChange(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				this.getList();
			},
			onDataPickStart(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
				this.getList();
			},
			onDataPickEnd(start, end) {
				this.beforeTime = start;
				this.afterTime = end;
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
				this.orderByType = this.orderByMap[data.key];
				this.getList();
			},
			pageChange(val) {
				this.pageNo = val;
				this.$el.parentElement.scrollTop = 0
				this.getList();
			},
			sizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			assign() {
				this.transfer = true;
				this.roleChange();
			},
			jump(val) {
				this.$router.push({
					name: 'crm.detail',
					query: {
						id: val,
						tmk: 1,
						noEdit: true
					}
				})
			},
			roleChange() {
				let params = {
					isSeft: 0,
					roleIds: '908,904',
					name: this.searchRole,
					companyIds: this.companyId,
					pageSize: -1
				}
				sys.rolesMember(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.roleList = res.data.data.list;
					}
				}).catch(errors.call(this));
			},
			offTransfer() {
				this.transfer = false;
				this.roleId = '';
				this.searchRole = '';
			},
			okTransfer() {
				let params = {
					cusIds: this.tableSelected.map(item => item.cusId).join(','),
					ownerId: this.roleId,
					flag: "1"
				}
				crmCustomer.batchSaveOwnerId(params).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.$Message.success(res.data.message);
						this.getList();
						this.offTransfer();
					}
				}).catch(errors.call(this));
			},
			tableChange(val) {
				this.tableSelected = val;
			},
			fenpeiCompanyChange(val) {
				let arr = [];
				val.childTags.forEach((v, k) => {
					arr.push(v.id);
				})
				this.companyId = arr.join(',');
				this.roleChange();
			},
		},

		destroyed() {
			if (this.call) {
				TQObj.destroy()
				TQObj = null
			}
		}
	}
</script>