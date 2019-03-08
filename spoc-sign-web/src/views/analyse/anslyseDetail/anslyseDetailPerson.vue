<style lang="less">
	.anslyseDetailPerson {
		font-size: 14px;
		.personTitle {
			font-size: 14px;
			margin-top: 20px;
			overflow: hidden;
			div {
				float: left;
			}
			.img {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				overflow: hidden;
				background-color: pink;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.personArea { 
				line-height: 33px;
				margin-left: 20px;
				p:first-of-type {
					font-weight: 600;
					font-size: 18px;
				}
			}
		}
		.personCanvas {
			overflow: hidden;
			.canvasLeft,.canvasRight {
				height: 340px;
				text-align: center;
				span {
					display: block;
					width: 100%;
					font-weight: 600;
					font-size: 16px;
					text-align: center;
					margin-bottom: 10px;
				}
			}
			.canvasRight {
				p {
					background-color: red;
					height: 50px;
					text-align: center;
					&::after {
						content: "";
						display: block;
						width: 30px;
						height: 100%;
						transform-origin: left top;
						background-color: #fff;
					}
				}
			}
		}
		.personTable {
			.ivu-table-cell {
				text-overflow: clip;
			}
			.tableTitle {
				font-size: 12px;
				p {
					i,b {
						font-style: normal;
						font-size: 18px;
						color: #44bcb6;
					}
					b {
						color: red;
					}
				}
			}
			.tableContent {
				.page {
					margin-top: 20px;
					text-align: center;
				}
			}
		}
	}
</style>

<template>
	<div class="anslyseDetailPerson">
		<div class="personTitle">
			<div class="img">
				<img src="" alt="">
			</div>
			<div class="personArea">
				<p>{{userSellData.user.name}}</p>
				<p>{{userSellData.user.companyName}} - {{userSellData.user.officeName}}</p>
				<p>{{userSellData.user.roleName}}</p>
			</div>
		</div>
		<div class="personStatus">
			<Tabs @on-click="toggleStatus()" v-model="signStatusValue">
				<TabPane label="已签约" name="name1">
				</TabPane>
					<TabPane label="待签约" name="name2">
				</TabPane>
			</Tabs>
			<statistics-time
			@upDateAnalyseSellDetail="upDateAnalyseSellDetail"
			:statisticsTimeList="statisticsTimeList"
			:currentTime="currentTime"
			:startTime="startTime"
			:endTime="endTime"
			:isFuture="isFuture"
			ref='componentStati'
			>
			</statistics-time>
		</div>
		<div class="personCanvas" v-if="status">
			<div class="canvasLeft">
				<span>销售目标与销售业绩</span>
				<echart-item :data="data0" :mstyle="{width:'400px',height:'300px'}"></echart-item>
			</div>
		</div>
		<div class="personTable">
			<div class="tableTitle">
				<p>
					累计合同<i> {{listParams.count}} </i>份，<span v-if="signStatusValue == 'name1'">已签约</span><span v-else>待签约</span>总金额<b> {{allPrice|filterWan}} </b>万元
				</p>
				<v-title>
					<span style="fontSize:12px">员工业绩明细-列表</span>
					<Dropdown v-if="status" style="position:absolute;right:20px" trigger="click" @on-click="exportCurr">
						<Button style="width:94px; margin: 0 5px;border: 1px solid #999;" type="ghost" class="bt2">
							导出 <Icon type="arrow-down-b"></Icon>
						</Button>
						<DropdownMenu slot="list">
							<DropdownItem :name="1">导出当前</DropdownItem>
							<DropdownItem :name="0">导出所有</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</v-title>
			</div>
			<div class="tableContent cancleBorder">
				<Table v-if="status"  @on-filter-change="filterChange" :columns="columns" :data="dataTable.list"  @on-select-all="signSelectAll" @on-select="signChange"  @on-selection-change="onTableItemSelect" @on-sort-change="onSortChange"></Table>
				<Table v-else="status" :columns="columns1" :data="dataTable.list"  @on-select-all="signSelectAll" @on-select="signChange"  @on-selection-change="onTableItemSelect" @on-sort-change="onSortChange"></Table>
				<div class="page">
					<Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :page-size="listParams.pageSize" :current="1" :total="listParams.count" @on-change="onPageChange" v-if="listParams.count>10"></Page>
				</div>
			</div>
		</div>
	</div>
</template>
	<script>
	import analyseBar from "../components/analyseBar"
	import statisticsTime from "../../../modules/statisticsTime"
	import signCountry from "../components/signCountry"
	import vTitle from "@public/modules/vTitle";
	import echartItem from '../components/echartItem'
	import { mapState } from 'vuex';
	import valid, { errors, ANALYSE } from "../../../libs/request"
	import { toWan } from '../../../libs/util.js';

	export default {
	data() {
		return {
			dataMain:{
				data0:[]
			},
			signId: '',
			userSellData:{
				user:{}
			},
			signStatusValue: 'name1',
			status: true,
			name: this.$route.query.name,
			id: this.$route.query.userId,
			area: "",
			level: '',
			post: "咨询顾问",
			num: 0,
			num1: 0,
			isFuture: true,
			afterTime: '',
			beforeTime: '',
			currentTime: '',
			statisticsTimeList: ['当前月', '最近三个月', '最近六个月'],
			datacollection1: {
				labels: ["销售目标","销售业绩"], 
				datasets: [
				{
					backgroundColor: ["#ccc", "#5a9cd3"],
					data: [ 400, 308]
				}
				]
			},

			columns: [
				{
					type: "selection",
					width: 33,
					align: "center"
				},
				{
					title: "合同编号",
					key: "identifier",
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
												id: params.row.ctId
											}
										});
									}
								}
							}, params.row.ctNo),
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
					}
				},
				{
					title: "签约时间",
					key: "signTime",
					sortable: "custom",
					align: "center"
				},
				{
					title: "签约方式",
					key: "isPartner",
					align: "center",
					render: (h, params) => {
						return h(
							"span",
							{},
							params.row.isPartner == 1 ? '合作签约' : '独立签约'
						);
					},
					filters: [
						{
						label: "独立签约",
						value: 1
						},
						{
						label: "合作签约",
						value: 2
						}
					],
					filterMultiple: false,
					filterRemote() {}
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
					key: "ctPrice",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.ctPrice).toLocaleString()
							);
					},
				},
				{
					title: "签约金额",
					align: "center",
					key: "signPrice",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.signPrice).toLocaleString()
								// params.row.signPrice.substr(0, params.row.signPrice.indexOf('.'))
							);
					},
				},
				{
					title: "赠送金额",
					align: "center",
					key: "deratePrice",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.deratePrice).toLocaleString()
								// params.row.deratePrice.substr(0, params.row.deratePrice.indexOf('.'))
							);
					},
				},
				{
					title: "收款金额",
					align: "center",
					key: "tailPrice",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.inPrice).toLocaleString()								
								// params.row.inPrice.substr(0, params.row.inPrice.indexOf('.'))
							);
					},
				},
				{
					title: "尾款金额",
					align: "center",
					key: "tailPrice",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								params.row.tailPrice ? parseFloat(params.row.tailPrice).toLocaleString() : 0								
							);
					},
				},
				{
					title: "尾款应付时间",
					align: "center",
					key: "tailTime",
					sortable: "custom",
					render: (h, params) => {
						return h(
							"div",{},
								params.row.tailTime == '' ? 'N/A' : params.row.tailTime
							);
					},
				}
			],

			columns1: [
				{
					type: "selection",
					width: 32,
					align: "center"
				},
				{
					title: "合同编号",
					key: "",
					align: "center",
					render: (h, params) => {
						return h('a', {}, [
							h('a', {
								on:{
									click: () => {
										this.$router.push({
											name: "sign.pactPreview",
											query: {
												id: params.row.ctId
											}
										});
									}
								}
							}, params.row.ctCode),
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
					title: "预约签约时间",
					key: "expectTime",
					sortable: "custom",
					align: "center"
				},
				{
					title: "合同原价",
					key: "ctPrice",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.ctPrice).toLocaleString()								
							);
					},
				},
				{
					title: "待签约金额",
					key: "signPrice",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.signPrice).toLocaleString()								
							);
					},
				},
				{
					title: "折扣金额",
					key: "deratePrice",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.deratePrice).toLocaleString()								
							);
					},
				},
				{
					title: "赠送金额",
					key: "deratePrice",
					sortable: "custom",
					align: "center",
					render: (h, params) => {
						return h(
							"div",{},
								parseFloat(params.row.presentPrice).toLocaleString()								
							);
					}
				}
			],

			listParams: {
				count: '',
				pageNo: 1,
				pageSize: 10,
			},
			allPrice: '',
			getAllPrice: '',
			noPayPrice: '',
			dataTable: {},
			signStatus: 'signed,accounted,collected,finished,refund',
			endTime: '',
			startTime: '',
			isPartner: '',
			orderBy: '',
			timeType: 2,
		}
	},
	computed:{
		...mapState(['userInfo']),
		uId(){
			if(this.$route.query.userId){
				return this.$route.query.userId;
			}
			return this.userInfo.id;
		},
		data0(){
			const d = this.userSellData;
			let title='销售目标与销售业绩';
			let titles= ['销售目标','销售业绩'];
			let data = [{value:d.objectValue,name:'销售目标'},{value:d.price,name:'销售业绩'}];
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'right',
					top:'bottom',
					data:titles
				},
				series: [
					{
						name:title,
						type:'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								position: 'center',
								formatter:(obj)=>{
									return obj.name+':'+toWan(obj.value)+'万';
								}
							},
						},
						data:data
					}
				]
			};
			return option;	
		},
		data1(){
			return {};
		}
	},

	components: {
		analyseBar,
		statisticsTime,
		signCountry,
		vTitle,
		echartItem
	},

	mounted() {
		this.getPersonSellLevelDetail('first')
		this.getPersonSellLevelDetailList()
			
	},
	methods: {
		userStat(){
			let params={};
			ANALYSE.companyUserSell(params).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.dataMain.data0 = res.data.data;
				}
			}).catch(errors.call(this));
		},

		getPersonSellLevelDetail(type={}) {
			if(this.startTime == this.endTime && this.endTime == this.currentTime) {
				this.startTime = this.endTime = ''
			}
			let obj = {
				id: this.uId,
				status: this.signStatus,
				endTime: this.endTime,
				startTime: this.startTime,
				isPartner: this.isPartner,
				orderBy: this.orderBy,
				pageNo: this.pageNo,
				timePrecision: 'month',
				pageSize: this.pageSize,
			}
			
			ANALYSE.personSellLevel(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					// debugger;
					this.userSellData = res.data.data;
					if(type == 'first') {
						this.currentTime = `${res.data.message.substr(0, 7)}-01`
					}
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
			
		},

		getPersonSellLevelDetailList() {
			if(this.startTime == this.endTime && this.endTime == this.currentTime) {
				this.startTime = this.endTime = ''
			}
			let obj = {
				id: this.uId,
				status: this.signStatus,
				endTime: this.endTime,
				startTime: this.startTime,
				isPartner: this.isPartner,
				orderBy: this.orderBy,
				pageNo: this.listParams.pageNo,
				pageSize: this.listParams.pageSize,
				timePrecision: 'month',
				timeType: this.timeType,
			}
			
			ANALYSE.personSellLevelList(obj)
			.then(valid.call(this))
			.then(res => {
				if(res.ok) {
					this.dataTable = res.data.data
					let data = res.data.data.attach
					this.listParams.count = data.total
					this.allPrice = data.signPrcieSum
					this.getAllPrice = data.tailPriceSum
					this.noPayPrice = data.curReceiptSum
					this.currentTime = `${res.data.message.substr(0, 7)}-01`
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		addActive(obj) {
			this.num = obj[0];
		},

		addAcitveTime(obj) {
			this.num1 = obj[0];
		},

		upDateAnalyseSellDetail(obj) {
			this.startTime = obj[0]
			this.endTime = obj[1]
			this.getPersonSellLevelDetailList()
			this.getPersonSellLevelDetail();
		},

		onPageChange(val) {
			this.listParams.pageNo = val;
			this.getPersonSellLevelDetailList();
		},

		onPageSizeChange(pageSize) {
			this.listParams.pageSize = pageSize;
			this.getPersonSellLevelDetailList();
		},

		toggleStatus() {
			if(this.signStatusValue == 'name1') {
				this.statisticsTimeList = ['当前月', '最近三个月', '最近六个月']
				this.status = true
				this.isFuture = true
				this.timeType = 2
				this.signStatus = 'signed,accounted,collected,finished,refund'
			}
			
			if(this.signStatusValue == 'name2') {
				this.statisticsTimeList = ['当前月', '未来三个月', '未来六个月']
				this.status = false
				this.isFuture = false
				this.timeType = 1
				this.signStatus = 'committed,checked'
			}
			this.$refs.componentStati.addAcitve(0)
		},

		onSortChange(val) {
			// console.log(val)
			if(val.order == 'normal') {
				this.orderBy = ''
			}else {
				this.orderBy = `${val.key} ${val.order}`
			}
			this.getPersonSellLevelDetailList()
		},
		
		onTableItemSelect() {

		},

		filterChange(val) {
			if(val._filterChecked.length) {
				let key = val._filterChecked[0]
				switch(key)  {
					case 1 : this.isPartner = 0 ; break;
					case 2 : this.isPartner = 1 ; break;
				}
			}else {
				this.isPartner = ''
			}
			this.getPersonSellLevelDetailList()
		},

		exportCurr(val){
			let params = {
					id: this.uId,
					ids: this.signId,
					status: this.signStatus,
					endTime: this.endTime,
					startTime: this.startTime,
					isPartner: this.isPartner,
					orderBy: this.orderBy,
					timeType: this.timeType,
					timePrecision: 'month',
				}
			if(val==1){
				if(!!!this.signId){
					this.$Message.error('请选择学院信息');
				}else{
					window.open(ANALYSE.exportUserSellobjectListSelect(params))
				}
			}else {
				this.signId = ''
				let params1 = {
					id: this.uId,
					status: this.signStatus,
					endTime: this.endTime,
					startTime: this.startTime,
					isPartner: this.isPartner,
					orderBy: this.orderBy,
					pageNo: this.listParams.pageNo,
					pageSize: this.listParams.pageSize,
					timePrecision: 'month',
					timeType: this.timeType
				}
				window.open(ANALYSE.exportUserSellobjectList(params1))
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
			if(obj.length <= 1) {
				this.signId = obj[0].ctId
				return
			}

			obj.forEach(item => {
				str += item.ctId + ','
			})
			this.signId = str.substr(0, str.length-1)
		},
	
	},

	filters: {
		filterWan: function(value) {
			if(!value) return '0'
			let val = value.toFixed(0)/10000
			return val
		},
	}
};
</script>

