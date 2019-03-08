<style lang="less">
	.signManage {
		.descript {
			font-size: 12px;
			i,b {
				font-size: 18px;
				font-style: normal;
				font-weight: normal;
				color: #44bcb7;
			}
			
			b {
				color: red;
			}
		}
		.tableContent {
			.page {
				text-align: center;
				margin-top: 20px;
			}
		}

		.v_search_options .v_search_options_content .title {
			padding: 6px 0px 3px 0;
		}
		.ivu-dropdown-item {
			text-indent: 0;
			text-align: center;
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
	
	.iviewLoading {
		.demo-spin-icon-load {
        	animation: ani-demo-spin 1s linear infinite;
		}
		
		@keyframes ani-demo-spin {
			from { transform: rotate(0deg);}
			50%  { transform: rotate(180deg);}
			to   { transform: rotate(360deg);}	
		}

		.ivu-spin-text {
			margin-left: 456px;
			margin-bottom: 80px;
			div {
				width: 100px;
				text-align: center;
			}
		}
	}
</style>
<template>
    <div class="signManage">
        <div class="signTitle">
			<Tabs @on-click="toggleSatus()" v-model="tabValue">
				<TabPane label="全部" name="name1"></TabPane>
				<TabPane label="存档合同" name="name2"></TabPane>
			</Tabs>
		</div>
		<v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="输入合同名称/签约合同编号/学生EC号/学生姓名/顾问姓名"
        icon="search" 
		:datafunc="datafunc"
        v-model="compact"
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
        </v-select>
		<sign-tag-bar
		v-if="status"
		title="签约结果"
		:num="resNum"
		@getIndex="getResIndex"
		:controlledList="resList">
		</sign-tag-bar>
		<sign-tag-bar
		v-if="wayStatus"
		v-show="status"
		title="签约方式"
		:num="wayNum"
		@getIndex="getWayIndex"
		:controlledList="wayList">
		</sign-tag-bar>
		<statistics-time
		placeholder="统计时间"
		v-if='status'
		:statisticsTimeList="statisticsTimeList"
		@upDateAnalyseSellDetail="upDateAnalyseSellDetail"
		@allDate="allDate"
		:currentTime="currentTime"
		:startTime="startTime"
		:endTime="endTime"
		:isFuture="isFuture"
		ref='componentStati'
		>
		</statistics-time>
		<v-search-option
		v-if="isAdmin||isLawer||isCeo"
		@on-select-item="getControlledIds"
		:controlledData="firm.countryList"
		> 
		</v-search-option>
		<div v-if="status" >
			<p v-if="wayStatus" class="descript">累计收到<i> {{attach.total}} </i>份已签约合同，签约金额 <b> {{attach.signPriceSum|filterWan}} </b>万元，折扣金额<i> {{attach.deratePriceSum|filterWan}} </i>万元，赠送成本<b> {{attach.presentPriceCostSum|filterWan}} </b>万元</p>
			<p v-else class="descript">累计收到<i> {{attach.total}} </i>份待签约合同，待签约金额<b> {{attach.signPriceSum|filterWan}} </b>万元，实际赠送总金额<i> {{attach.presentPriceCostSum|filterWan}} </i>万元</p>
		</div>
		<v-title title="签约合同管理-列表">
			<div slot="right">
				<Dropdown trigger="click" @on-click="exportCurr">
					<!-- <Button v-if="isBranchOfficeLeader" @click="signComplete('deleteAll')" style="width:86px;" type="primary" >完成</Button> -->
					<Button style="width:94px; margin: 0 5px;border: 1px solid #999;" type="ghost" class="bt2">
						导出 <Icon type="arrow-down-b"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem :name="1">导出当前</DropdownItem>
						<DropdownItem :name="0">导出所有</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button  @click="deleteSign=true" v-if="signId" style="width:86px;color:#e8352c;border:1px solid #e8352c;" >删除</Button>
			</div>
		</v-title>
		<div class="tableContent cancleBorder">
            <Table @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="status&&wayStatus" @on-filter-change="filterChange" :columns="columns" :data="data.list"  @on-sort-change="onSortChange"></Table>
            <Table @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="status&&!wayStatus" :columns="columns2" :data="data.list"  @on-sort-change="onSortChange"></Table>			
            <Table @on-select-all="signSelectAll" @on-selection-change="signChange" v-if="!status" :columns="columns1" :data="data.list"   @on-sort-change="onSortChange"></Table>			
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
            </div>
        </div>
		<Modal
        v-model="modal1"
        title="转让合同"
        @on-ok="transferOk"
        width='728'
		ok-text="转让合同"
        @on-cancel="cancel">
            <p style="text-align:center;font-size:16px;line-height:100px">转让后，这份合同将进入转让人账号，由转让人完成后续操作</p>
        </Modal>
		<Modal
        v-model="deleteSign"
			title="删除合同"
			@on-ok="deleteSignOk"
			width='728'
			@on-cancel="deleteSignCancel">
            <p style="text-align:center;font-size:16px;line-height:100px">确定删除合同么?</p>
        </Modal>
		<Modal
        v-model="modal2"
        :title="dialogTittle"
        @on-ok="addBarOk"
        width='728'
		ref="modal2"
        @on-cancel="cancel">
			<div v-if="dialogTittle=='补充合同'" style="padding-left:45px;">
					<Button type="primary" @click="onUploadLocal">点击上传</Button>
					<p>（请上传'docx','pdf','doc'格式)</p>
				<div v-if="file.name">
					<span style="margin-left:11px">文件名称为：</span> 
					<a>{{file.name}}</a> <span @click="deleteFile" style="margin-left:11px;color:red;cursor:pointer">删除</span>
				</div>
				<p>
					<span style="position: relative; top: 20px">备注：</span>
					<div style="margin-left: 85px">
						<Input v-model="textareaText" type="textarea" :rows="4" placeholder="Enter something..."></Input>
					</div>
				</p>
				<div v-if="loadingStatus" class="iviewLoading">
					<Col class="demo-spin-col" span="8">
						<Spin fix>
							<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
							<div>上传中...</div>
						</Spin>
					</Col>
				</div>
			</div>
			<div v-if="dialogTittle=='确定当前合同服务完成？'">
				<p>完成月份：
					<DatePicker v-model="finishDate" format="yyyy-MM" type="month" transfer placeholder="完成时间" style="width: 130px"></DatePicker>
				</p>
				<p style="margin-top:10px;">( 请输入当前合同的完成月份，您的填写结果将作为合同剩余提成工资发放月。)</p>
			</div>
        </Modal>
		<role-people
		@fresh="offrole"
		ref="rolepeople"
		>
		</role-people>
			<up-to-pan ref="uptopan" :remarks='textareaText' :studentId="ecId" :prehook="prehook" :object-id="objId" dir="" :format="['docx','pdf','doc']" type="business" fileType="all" @uploadok="onUploadOk" menuId=201/>
			</up-to-pan>
    	</div>
    </div>
</template>
<script>
import vSelect from "../../modules/vSelect"
import vTitle from "@public/modules/vTitle";
import upToPan from '@public/modules/upToPan'
import rolePeople from '@public/modules/rolePeopleRadio';
import vSearchOptions from "../../modules/vSearchOptions";
import vSearchOption from "../../modules/vSearchOption";
import statisticsTime from "../../modules/statisticsTime1"
import signTagBar from "./signTagBar"
import valid, { errors, SIGNMANAGE, common } from "../../libs/request"
import { mapGetters } from 'vuex';
export default {
   	data(){
		return {
			deleteSign: false,
			ecId: '',
			objId: '',
			momentTemp: '',
			isFuture: true,
			dialogTittle: '',
			attach: '',
			finishDate: '',
			signId: '',
			orderBy: '',
			ids: '',
			compact: '',
			companyIds: '',
			textareaText: '',
			timeType: 2,
			startTime: '',
			endTime: '',
			beforeTime: '',
			afterTime: '',
			isPartner: '',
			currentTime: '',
			titleTime: '',
			tempStatus: '',
			uploadResole: '',
			controlledIndex: '',
			isArchived: '',
			wayNum: 0,
			resNum: 0,
			timeNum: 0,
			uploadStatus: false,
			modal2: false,
			modal1: false,
			file: {},
			loadingStatus: false,
			status: true,
			wayStatus: true,
			tabValue: 'name1',
			signStatus: 'signed,accounted,collected,refund,archived,finished',
			controlledMsg: [],
			controlledList: [],
			resList: ['已签约', '待签约'],
			wayList: ['全部', '独立签约', '合作签约'],
			statisticsTimeList: ['全部', '当前月', '前3个月', '前6个月'],
			firm:{
				searchName:'分公司',
				countryList:[],
			},
			columns: [
				{
					type: "selection",
					width: 60,
					align: "center"
				},
				{
					title: "合同编号",
					align: "center",
					render: (h, params) => {
						return h('div', {}, [
							h('a', {
								style: {
									color: '#3b9ad1',
									cursor:'pointer',
								},
								on:{
									click: () => {
										this.$router.push({
											name: "sign.pactPreview",
											query: {
												id: params.row.id
											}
										});
									}
								}
							}, params.row.no),
							h('i', {
								'class': {
									'iconfont': true,
									'icon-wenjianjia': true
								},
								style: {
									color: '#3b9ad1',
									fontSize: '14px',
									display:params.row.isProtocol==1?'':'none'
								}
							}, '')
						])
					},
				},
				{
					title: "签约人",
					key: "ur.name",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
                        return h('span',params.row.sellerName)
					}
				},
				{
					title: "签约方式",
					key: "4",
					align: "center",
					render: (h, params) => {
                        return h('span',params.row.isPartner == 0 ? '独立签约' : '合作签约')
					}
				},
				{
					title: "合作者",
					key: "partnerName",
					align: "center"
				},
				{
					title: "合作分成比例",
					key: "partnerRatio",
					align: "center"
				},
				{
					title: "合同原价",
					key: "price",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.price).toLocaleString()								
							);
					}
				},
				{
					title: "签约金额",
					key: "sign.sign_price",
					align: "center",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.signPrice).toLocaleString()								
							);
					}
				},
				{
					title: "折扣金额",
					align: "center",
					key: "sign.derate_price",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.deratePrice).toLocaleString()								
							);
					}
				},
				{
					title: "赠送成本",
					align: "center",
					key: "sign.present_price_cost",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.presentPriceCost).toLocaleString()								
							);
					}
				},
				{
					title: "合同状态",
					align: "center",
					key: "labelStatus",
					filters: [
                            {
                                label: '已签约',
                                value: 1
                            },
                            {
                                label: '已报账',
                                value: 2
							},
							{
                                label: '已收款',
                                value: 3
							},
							{   
                                label: '已退款',
                                value: 5
							},
							{
                                label: '已完成',
                                value: 6
                            }
                        ],
                        filterMultiple: false,
                      	filterRemote() {
                        }
				},
				{
					title: "操作",
					className: 'opation',
					align: "center",
					key: "13",
					width: 145,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
								on: {
									click: () => {
										this.log(params.row.id);
									}
								}
								},
								"日志"
							),
							h(
								"a",
								{
									style: {
									marginLeft: "10px",
									display: params.row.status != 'finished' ? 'inline-block': 'none',
								},
									on: {
										click: () => {
											this.transfer(params.row);
										}
									}
								},
								"转让"
							),
							h(
								"a",
								{	
									style: {
									marginLeft: "10px",
									},
									on: {
										click: () => {
											this.replenish(params.row);
										}
									}
								},
								"补充"
							),
							// h(
							// 	"a",
								
							// 	{
							// 		style: {
							// 			marginLeft: "10px",
							// 			display: params.row.status == 'collected' ? 'block': 'none',
							// 		},
							// 		on: {
							// 			click: () => {
							// 				this.signComplete(params.row.id);
							// 			}
							// 		}
							// 	},
							// 	"完成"
							// )
                    	]);
               		}
				}
			],
			columns2: [
					{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "合同编码",
						align: "center",
						render: (h, params) => {
							return h('div', {}, [
								h('a', {
									on:{
										click: () => {
											this.$router.push({
												name: "sign.pactPreview",
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, params.row.code),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#3b9ad1',
										fontSize: '14px',
										display:params.row.isProtocol==1?'':'none'
									}
								}, '')
							])
						},
				},
				{
					title: "签约人",
					key: "ur.name",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
                        return h('span',params.row.reportedUser.name|| '0')
					}
				},
				{
					title: "预约签约时间",
					key: "sign.expect_time",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
                        return h('span',params.row.htSign.expectTime|| '0')
					}
				},
				{
					title: "合同原价",
					key: "price",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.price).toLocaleString()								
							);
					}
				},
				{
					title: "待签约金额",
					key: "sign.sign_price",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.signPrice).toLocaleString()								
							);
					}
				},
				{
					title: "折扣金额",
					align: "center",
					key: "sign.derate_price",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.deratePrice).toLocaleString()								
							);
					}
				},
				{
					title: "赠送成本",
					align: "center",
					key: "key: 'sign.present_price_cost",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.presentPriceCost).toLocaleString()								
							);
					}
				},
				{
					title: "操作",
					align: "center",
					key: "13",
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
								on: {
									click: () => {
										this.log(params.row.id);
									}
								}
								},
								"日志"
							),
                    	]);
               		}
				}
			],
			listParams: {
				sort: "asc",
				pageNo: "1",
				pageSize: "10",
				cnName: ""
			},
			data: {
				pageNo: 1,
				list: []
     		},
			columns1: [
					{
						type: "selection",
						width: 60,
						align: "center"
					},
					{
						title: "签约合同编号",
						align: "center",
						render: (h, params) => {
							return h('div', {}, [
								h('a', {
									style: {
										color: '#3b9ad1',
										cursor:'pointer',
									},
									on:{
										click: () => {
											this.$router.push({
												name: "sign.pactPreview",
												query: {
													id: params.row.id
												}
											});
										}
									}
								}, params.row.no),
								h('i', {
									'class': {
										'iconfont': true,
										'icon-wenjianjia': true
									},
									style: {
										color: '#3b9ad1',
										fontSize: '14px',
										display:params.row.isProtocol==1?'':'none'
									}
								}, '')
							])
						},
				},
				{
					title: "签约人",
					key: "ur.name",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
                        return h('span',params.row.reportedUser.name|| '0')
					}
				},
				{
					title: "合同原价",
					key: "price",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.price).toLocaleString()								
							);
					}
				},
				{
					title: "签约金额",
					key: "sign.sign_price",
					align: "center",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.signPrice).toLocaleString()								
							);
					}					
				},
				{
					title: "折扣金额",
					align: "center",
					key: "sign.derate_price",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.deratePrice).toLocaleString()								
							);
					}
				},
				{
					title: "赠送成本",
					align: "center",
					key: 'sign.present_price_cost',
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.htSign.presentPriceCost).toLocaleString()								
							);
					}
				},
				{
					title: "操作",
					align: "center",
					width: 171,
					render: (h, params) => {
						return h("div", [
							h(
								"a",
								{
								on: {
									click: () => {
										this.downSign(params.row.id);
									}
								} 	
								},
								"下载扫描件"
							),
							h(
								"a",
								{
									style: {
									margin: "0 3px"
								},
								'style': {
									display: params.row.status == 'signed' ? 'none' : 'inline-block',
									marginLeft: '8px',
								},
								on: {
									click: () => {
										this.downReceipt(params.row.id);
									}
								}
								},
								"下载收据"
							)
                    	]);
               		}
				}
			],
			data2: [],
			pageSize: 10,
			pageNo: 1,
		}
	},

	components:{
		vSelect,
		vTitle,
		vSearchOptions,
		vSearchOption,
		statisticsTime,
		signTagBar,
		rolePeople,
		upToPan
	},

	computed:{
		...mapGetters('sign',['isAdmin','isLawer', 'isCeo','isBranchOfficeLeader']),
		uploadToPan:function(){
			return common.uploadToPan();
		},
	},

	beforeCreate(){
	},

	mounted() {
		this.getSignManageList('first')
		this.getControlledMsg()
	},

	methods: {
		getSignManageList(type={}) {
			// if(this.startTime == this.endTime && this.endTime == this.currentTime) {
			// 	this.startTime = this.endTime = ''
			// }
			let obj = {
				name: this.compact,
				isArchived: this.isArchived,
				status:this.signStatus,
				timeType: this.timeType,
				startTime: this.startTime,
				endTime: this.endTime,
				isPartner: this.isPartner,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				orderBy: this.orderBy,
				from: '2',
				timePrecision: 'month'
			}

			if(this.isAdmin||this.isLawer) {
				obj = Object.assign(obj, {
					companyIds: this.companyIds,
				})
			}

			SIGNMANAGE.signManageList(obj).then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.data = res.data.data
					this.attach = res.data.data.attach
					if(type === 'first') {
						this.currentTime = `${res.data.data.attach.newDate.substr(0,7)}-01`
						this.timeType = 2
					}
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},

		getSignManageListSave(type={}) {
			let obj = {
				name: this.compact,
				from: '2',
				orderBy: this.orderBy,
				pageSize: this.pageSize,
				pageNo: this.pageNo,
				isArchived: this.isArchived
			}

			if(this.isAdmin||isLawer) {
				obj = Object.assign(obj, {
					companyIds: this.companyIds,
				})
			}

			SIGNMANAGE.signManageList(obj).then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.data = res.data.data
					this.attach = res.data.data.attach
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},

		getControlledMsg() {
			let params={
				grade:'2',
				types: '1,2,3'
			}

			common.officeList(params).then(valid.call(this)).then(res => {
				if(res.ok){
					this.firm.countryList=res.data.data.allCompany;
				}
			}).catch(errors.call(this));

		},

		textChange() {
			this.getSignManageList()
		},

		upDateAnalyseSellDetail(obj) {
			this.startTime = obj[0]
			this.endTime = obj[1]
			this.getSignManageList()
		},

		allDate() {
			this.startTime = this.endTime = ''
			this.getSignManageList()
		},
		
		getResIndex(index) {
			this.resNum = index
			if(index == 0) {
				this.signStatus = 'signed,accounted,collected,refund,archived,finished'
				this.wayStatus = true
				this.statisticsTimeList = ['全部', '当前月', '前3个月', '前6个月']
				this.timeType = 2
				if(this.momentTemp == 0 || this.momentTemp == 1) {
					this.isPartner = this.momentTemp
				}
			
				this.isFuture = true			
			}

			if(index == 1) {
				this.signStatus = 'committed,checked'
				this.wayStatus = false
				this.statisticsTimeList = ['全部', '当前月', '未来3个月', '未来6个月']
				this.timeType = 1
				this.timeNum = 0
				this.momentTemp = this.isPartner
				this.isPartner = ''
				this.isFuture = false
			}
			
			this.startTime = this.endTime = ''
			this.$refs.componentStati.addAcitve(0)
		},

		getWayIndex(index) {
			this.wayNum = index
			this.isPartner = index-1 < 0 ? '' : index -1
			this.getSignManageList()	
		},

		toggleSatus() {
			this.pageSize = 10
			this.pageNo = 1
			this.isArchived = this.tabValue == 'name1' ? '' : 1
			this.status = this.tabValue == 'name1' ? true : false
			if(this.tabValue == 'name1') {
				this.signStatus = this.tempStatus
				this.getSignManageList()
				return
			}

			if(this.tabValue == 'name2') {
				this.tempStatus = this.signStatus
				this.signStatus = ''
				this.getSignManageListSave()
				return
			}

			
		},

		onPageSizeChange(val) {
			this.pageSize = val			
			if(this.tabValue == 'name1') {
				this.getSignManageList()
				return
			}
		    this.getSignManageListSave()
		},

		onPageChange(val) {
			this.pageNo = val
			if(this.tabValue == 'name1') {
				this.getSignManageList()
				return
			}
			this.getSignManageListSave()
		},

		onSortChange(obj) {
			if(obj.order == 'normal') {
				this.orderBy = ''
			}else {
				this.orderBy = `${obj.key} ${obj.order}`
			}

			if(this.tabValue == 'name1') {
				this.getSignManageList()
				return
			}

			if(this.tabValue == 'name2') {
				this.getSignManageListSave()
				return
			}
		},

		transfer(signId) {
			this.modal1 = true;
			this.signId = signId.id
		},

		replenish(obj) {
			this.ecId = obj.ecId
			this.objId = obj.id
			this.dialogTittle = '补充合同'
			this.modal2 = true;
		},

		signComplete(val) {
			this.dialogTittle = '确定当前合同服务完成？'
			this.modal2 = true;
			if(val === 'deleteAll') {
				if(!this.signId.length) {
					this.$Message.warning('没有选中合同')
					return
				}
				this.ids = this.signId
				return
			}
			this.ids = val
		},

		transferOk() {
			this.$refs.rolepeople.show();
		},

		cancel() {

		},

		log(index) {
			this.$emit('jump',{
				name:'sign.signManageDetail',
				query: {
					signNumber:index
				}
			})
		},

		offrole(val){
			this.signTransfer(val[0].id)
		},
		
		signTransfer(transferId) {
			let obj = {
				id: this.signId,
				sellerId: transferId
			}
			SIGNMANAGE.signTransfer(obj).then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.$Message.success('转让成功')
					this.getSignManageList()
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},

		addBarOk() {
			if(this.dialogTittle == "补充合同") {
				this.uploadImg()
				return
			}

			if(this.dialogTittle == '确定当前合同服务完成？') {
				this.finishSign()
			}
			
		},
		
		uploadImg() {
			if(!this.file.name) {
				this.$refs.modal2.visible = true
				this.modal2 = true
				this.$Message.info('没有选择图片')
				return
			}
	
			this.$refs.uptopan.doUploadFile(this.file)
		},

		prehook(f, val) {
			this.file = f
		},


		finishSign() {
			if(!this.finishDate) {
				this.$Message.warning('请选择日期')
				return
			}
			let [month, year] = this.finishDate.toString().match(/\d+/g)
			let obj = {
				ids: this.ids,
				finishDate:`${year}-${month}-00 00:00:00`,
			}
			SIGNMANAGE.finishSign(obj).then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.$Message.success('操作成功')
					this.getSignManageList()
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},
		
		deleteFile() {
			this.file = {};
		},

		onUploadLocal(){
            this.$refs.uptopan.doUpload()
		},
		
		onUploadOk(data){
          	if(data.status == "success") {
				this.textareaText = ''
				this.$Message.success(data.message);
				this.file = {}
			}else {
				this.$Message.error(data.message);
			}
        },

		
		signChange(obj) {
			this.getSignIds(obj)
		},

		signSelectAll(obj) {
			this.getSignIds(obj)			
		}, 

		getSignIds(obj) {
			this.signId = ''
			let str = ''
			if(obj.length == 0) {
				return
			}

			obj.forEach(item => {
				str += item.id + ','
			})
			this.signId = str.substr(0, str.length-1)
			
		},

		deleteSignCancel() {},

		deleteSignOk() {

			let obj = {
				id: this.signId
			}

			SIGNMANAGE.signDelete(obj).then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.$Message.success('删除成功')
					this.signId = ''
					this.getSignManageList()
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},

		filterChange(val) {
			let key = val._filterChecked[0]
			if(!key) {
				this.signStatus = 'signed,accounted,collected,refund,archived,finished' ; 
				
			}
			switch(key)  {
				case 1 : this.signStatus = 'signed' ; break;
				case 2 : this.signStatus = 'accounted' ; break;
				case 3 : this.signStatus = 'collected' ; break;
				case 5 : this.signStatus = 'refund' ; break;
				case 6 : this.signStatus = 'finished' ; break;	
			}
			this.isArchived = ''
			this.getSignManageList()
		},

		// 下载合同
		downSign(val) {
			let obj = {
				templateName: '合同扫描件',
				objectId: val,
				type: 'ht_contract_scan'
			}
			window.open(common.downloadSignReceipt(obj))
		},

		// 下载收据
		downReceipt(val) {
			let obj = {
				templateName: '合同收据',
				objectId: val,
			}
			window.open(SIGNMANAGE.downloadSignReceiptPut(obj))
		},

		downloadSignReceipt(id, type) {
			
		},

		exportCurr(val){
			let obj = {
					ids: this.signId,
					isArchived: this.isArchived,
				}
			if(val==1){
				if(!this.signId.length){
					this.$Message.error('请选择学院信息');
				}else{
					if(this.signStatus === 'committed,checked') {
						window.open(SIGNMANAGE.exportSelectSignWait(obj))
					}else {
						window.open(SIGNMANAGE.exportSelectSign(obj))							
					}
				}
			}else{
				let obj1 = {
					name: this.compact,
					isArchived: this.isArchived,
					status:this.signStatus,
					timeType: this.timeType,
					startTime: this.startTime,
					endTime: this.endTime,
					isPartner: this.isPartner,
					orderBy: this.orderBy,
					from: '2',
					timePrecision: 'month',
					companyIds: this.companyIds,
				}
				window.open(SIGNMANAGE.exportAllSign(obj1))
			}
		},

		datafunc(val) {
			return new Promise((resole, reject) => {

			})
		},

		getControlledIds(ids) {
			this.companyIds = ids
			if(this.tabValue == 'name1') {
				this.getSignManageList()
				return
			}
			if(this.tabValue == 'name2') {
				this.getSignManageListSave()
				return
			}
		}
	},
	filters: {
		filterWan: function(value) {
			if(!value) return '0'
			let val = value.toFixed(0)/10000
			return val
		},
	}
} 
</script>

