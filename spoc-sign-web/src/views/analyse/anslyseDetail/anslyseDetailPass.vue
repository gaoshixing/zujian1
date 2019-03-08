<style lang="less">
	.anslyseDetailPass{
		font-size: 14px;
		.e-text-center{
			margin: 10px auto;
			text-align: center;
		}
		.detailPass {
			p {
				text-align: center;
				i,b {
					color: #44bcb6;
					font-style: normal;
					font-weight: 500;
					font-size: 20px;
				}
				b {
					color: red;
				}
			}
		}
		.page {
				margin-top: 20px;
				text-align: center;
		}
	}
</style>

<template>
    <div class="anslyseDetailPass">
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
		<v-search-option v-if="isAdmin||isCeo"
		@on-select-item="getControlledIds"
		:controlledData="firm.countryList"
		>
		</v-search-option>
		
		<case-bar-filter :from="2" menuId="201" mgt="12" @tagListChange="tagListChange">
		</case-bar-filter>
        <div v-show="status" class="detailPass">
            <p>{{titleTime}}月销售目标<i> {{dataMain.data11.sellObjectValue | toWan}} </i>万元,累计已签约<i> {{dataMain.data11.curReceipt | toWan}} </i>万元,签单量<b> {{dataMain.data11.count}} </b>单</p>
			<div class="e-text-center">
				<echart-item :data="data11" :mstyle="{width:'900px',height:'400px'}"></echart-item>
			</div>

        </div>
		<div v-show="!status" class="detailPass">
            <p>{{titleTime}}月待签约金额<i> {{dataMain.data12.curReceipt | toWan}} </i>万元,待签约合同<b> {{dataMain.data12.count}} </b>份</p>
			<div class="e-text-center">
				<echart-item :data="data12" :mstyle="{width:'900px',height:'400px'}"></echart-item>
			</div>

        </div>
        <div class="detailTable">
            <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="输入顾问姓名"
            icon="search" 
            v-model="compact"
            k='cnname' 
            :datafunc="datafunc" 
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
	        </v-select>
            <div class="exportTable">
                <v-title>
					<span  style="fontSize:12px">签约统计明细-列表</span>
					<Dropdown v-if="status" style="position:absolute;right:20px" trigger="click" @on-click="exportCurr">
					<Button style="width:94px;border: 1px solid #999;" type="ghost" class="bt2">
						导出 <Icon type="arrow-down-b"></Icon>
					</Button>
						<DropdownMenu slot="list">
							<DropdownItem :name="1">导出当前</DropdownItem>
							<DropdownItem :name="0">导出所有</DropdownItem>
						</DropdownMenu>
					</Dropdown>
		        </v-title>
            </div>
			<div class="cancleBorder">
				<Table v-if="status" :columns="columns" :data="data1.list"  @on-select-all="signSelectAll" @on-selection-change="signChange"  @on-sort-change="onSortChange"></Table>
				<Table v-else :columns="columns1" :data="data1.list"  @on-selection-change="signChange" @on-sort-change="onSortChange"></Table>
			</div>	
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="1" :total="data1.count" @on-change="onPageChange" v-if="data1.count>10"></Page>
            </div>
        </div>
		<form class="formexport" :action="exportUrl" method="post" target="_blank">
			<input type="hidden" name="ids" v-model="signId" />
			<input type="hidden" name="tags" v-model="tags" />
			<input type="hidden" name="orderBy" v-model="orderBy" />
			<input type="hidden" name="startTime" v-model="startTime" />
			<input type="hidden" name="name" v-model="compact" />
			<input type="hidden" name="status" v-model="signStatus" />
			<input type="hidden" name="endTime" v-model="endTime" />
			<input type="hidden" name="companyIds" v-model="companyIds" />
			<input type="hidden" name="flag" v-model="timeFlag" />
			<input type="hidden" name="timePrecision" v-model="timeV" />
		</form>
   </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import statisticsTime from "../../../modules/statisticsTime"
	import signCountry from "../components/signCountry"
	// import analyseAllTags from "../components/analyseAllTags"
	import vSelect from "../../../modules/vSelect.vue"
	import vTitle from "@public/modules/vTitle";
	import caseBarFilter from "@public/modules/caseBarFilter.vue";
	import vSearchOption from "../../../modules/vSearchOption";
	import echartItem from '../components/echartItem.vue';
	import valid, { errors, ANALYSE, common } from "../../../libs/request"
	import {dateUtil ,toWan } from '../../../libs/util.js';
	export default {
		data() {
			return {
				dataMain:{
					data11:{},
					data12:{},
				},
				timeV: 'month',
				exportUrl: '',
				signStatusValue: 'name1',
				compact: '',
				statisticsTimeList: ['当前月', '最近三个月', '最近六个月'],
				controlledIndex: 0,
				countryIndex: '',
				proTypeIndex: '',
				systemIndex: '',
				momentIndex: '',
				status: true,
				num1: 0,
				numComp: 0,
				currentTime: '',
				pitchItem: [],
				isFuture: true,
				signId:'',
				firm:{
					searchName: '分公司',
					countryList:[],
				},
				columns:[
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '签约人',
						key: 'userName',
						align: 'center',
						render: (h, params) => {
							return h(
								"a",{
									on: {
									click: () => {
										this.$router.push({
											name: "sign.anslyseDetailPerson",
											query: {
												'name': params.row.userName,
												'userId': params.row.userId,
											}
										});
									}
									}
								},
									params.row.userName
								);
						},
					},
					{
						title: '分公司',
						key: 'officeName',
						align: 'center',
						render: (h, params) => {
							return h(
								"div",{},
									params.row.officeName.indexOf(' ') == -1 ? params.row.officeName : params.row.officeName.substr(0, params.row.officeName.indexOf(' '))
								);
						},
					},
					{
						title: '销售目标',
						key: 'sellGoal',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.sellGoal).toLocaleString()
								);
						},
					},
					{
						title: '签单量',
						key:'signCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title: '签约金额',
						key: 'signPriceSum',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.signPriceSum).toLocaleString()								
								);
						},
					},
					{
						title: '销售业绩',
						key: 'sellFeat',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.sellFeat).toLocaleString()																
								);
						},
					},
					{
						title: '折扣金额',
						key: 'deratePriceSum',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.deratePriceSum).toLocaleString()
								);
						},
					},
					{
						title: '赠送成本',
						align: 'center',
						key: 'presentPriceCostSum',
						"sortable": 'custom',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.presentPriceCostSum).toLocaleString()
								);
						},
					},
				],
				
				columns1: [
					{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '待签约人',
						key: 'userName',
						align: 'center',
						render: (h, params) => {
								return h(
								"div",{
									style: {
									color: "#44bcb7",
									cursor: "pointer"
									},
									on: {
									click: () => {
										this.$router.push({
										name: "sign.anslyseDetailPerson",
										query: {
											'name': params.row.userName,
											'userId': params.row.userId
										}
										});
									}
									}
								},
								params.row.userName
								);
						},
					},
					{
						title: '分公司',
						key: 'officeName',
						align: 'center',
						render: (h, params) => {
							return h(
								"div",{},
									params.row.officeName.indexOf(' ') == -1 ? params.row.officeName : params.row.officeName.substr(0, params.row.officeName.indexOf(' '))
								);
						},
					},
					{
						title: '销售目标',
						key: 'sellGoal',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.sellGoal).toLocaleString()
								);
						},
					},
					{
						title: '销售业绩',
						key: 'sellFeat',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.sellFeat).toLocaleString()
								);
						},
					},
					{
						title: '待签约合同数',
						key: 'signCount',
						"sortable": 'custom',
						align:'center'
					},
					{
						title: '签约金额',
						key: 'signPriceSum',
						"sortable": 'custom',
						align:'center',
						render: (h, params) => {
							return h(
								"div",{},
									parseFloat(params.row.signPriceSum).toLocaleString()
								);
						},
					},
				],
				
				pageNo: 1,
				pageSize: 10,
				data1: {},
				signStatus: 'signed,accounted,collected,finished,refund',
				orderBy: '',
				companyIds: '',
				tags: [],
				timeFlag: 1,
				endTime: '',
				startTime: '',
			}
		},
		
	computed:{
		...mapGetters('sign',['isAdmin','isCeo','isBranchOfficeLeader']),
		data11(){ // 已签约
			return this.makeOption(this.dataMain.data11);
		},
		data12(){ // 待签约
			return this.makeOption2(this.dataMain.data12);
		},
		titleTime() {
			if(this.startTime == this.endTime) {
				return this.currentTime.substr(0, 7)
			}
			return `${this.startTime.substr(0, 7)}${this.endTime ? ' -- ' : ''}${this.endTime.substr(0, 7)}`
		},
		tagIds(){
			const tag = this.tags.map(item=>item.id);
			return tag.join(',');
		}
	},
    components: {
		vSearchOption,
        statisticsTime,
        signCountry,
        // analyseAllTags,
        vSelect,
		vTitle,
		echartItem,
		caseBarFilter
    },

	created() {
		this.getControlledMsg()
	},

	mounted() {
		this.getAnalyseSellDetail('first')
		this.statMonth();
	},

    methods: {
		makeOption(data){ // 已签约图标
			let d=data;
			if(d.list){
				d = d.list;
			} else {
				return {};
			}
			let s=[];
			let titles=[];
			let vals={};
			let types = {
				curReceipt:'签约金额',
				sellObjectValue:'销售目标',
				count:'签单量'
			}
			if(this.startTime==this.endTime){ // 按月统计不显示销售目标
				delete types.sellObjectValue;
			}
			let dataMark=[];
			d.forEach((item,index)=>{
				titles.push(item.timeScope);
				let sum=0;
				for(let i in types){
					if(!vals[i]){
						vals[i]=[];
					}
					let n = Number(item[i]);
					vals[i].push(n);
					sum+=n;
				}
				dataMark.push({
					itemStyle:{
						color: 'rgb(47, 69, 84)'
					},
					value:Number(item.count),
					xAxis:index,
					yAxis:sum
				})
			});

			let sum = 0;
			for(let i in types){
				let name = types[i];
				const exam = {
					name: name,
					// color: i==='curReceipt'?'yellow':i==='count' ? 'pink' : 'red',
					type: 'bar',
					stack: '总量',
					data: vals[i]
				};
				s.push(exam)
			}

			s[0].markPoint={data:dataMark};

			let option = {
				tooltip : {
					trigger: 'axis',
				},
				legend: {
					selectedMode:false,
					data: Object.values(types) 
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				yAxis:  {
					type: 'value'
				},
				xAxis: {
					type: 'category',
					data: titles 
				},
				series: s
			};
			return option;
		},
		makeOption2(d){
			if(d.list){
				d = d.list;
			} else {
				return {};
			}
			let s=[];
			let titles=[];
			let vals={};
			let types = {
				count:'签单量'
			}
			d.forEach((item,index)=>{
				titles.push(item.timeScope);
				for(let i in types){
					if(!vals[i]){
						vals[i]=[];
					}
					vals[i].push(item[i]);
				}
			});

			for(let i in types){
				let name = types[i];
				const exam = {
					name: name,
					type: 'bar',
					barWidth:'40%',
					data: vals[i]
				};
				s.push(exam)
			}
			let option = {
				tooltip : {
					trigger: 'axis',
				},
				legend: {
					data: Object.values(types) 
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				yAxis:  {
					type: 'value'
				},
				xAxis: {
					type: 'category',
					data: titles 
				},
				series: s
			};
			
			return option;
		},
		statMonth(){
			const startTime = this.startTime;
			const endTime = this.endTime;
			let params = {companyIds:this.companyIds,tags:this.tags,flag:this.timeFlag,period:'month',startTime,endTime,timePrecision:'month'};
			if(startTime==endTime){
				params.period='day';
			}
			this.getSellObject(params);
		},
		getSellObject(params){
			ANALYSE.sellObject(params).then(valid.call(this)).then(res=>{
				if(params.flag=='1'){  // 1：已签约 2：待签约
					this.dataMain.data11 = res.data.data;
				} else {
					this.dataMain.data12 = res.data.data;
				}
			}).then(errors.call(this));
		},

		getAnalyseSellDetail(type={}) {
			if(this.startTime == this.endTime && this.endTime == this.currentTime) {
					this.startTime = this.endTime = ''
			}
			let obj ={

				name: this.compact,
				status: this.signStatus,
				orderBy: this.orderBy,
				companyIds: this.companyIds,	
				tags: this.tags,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				timeFlag: this.timeFlag,
				startTime: this.startTime,
				endTime: this.endTime,
				timePrecision: 'month',
				flag: this.timeFlag,
			}

		ANALYSE.analyseSellDetail(obj)
		.then(valid.call(this))
		.then(res => {
			if(res.ok) {
				this.data1 = res.data.data
				if(type == 'first') {
					this.currentTime = `${res.data.message.substr(0, 7)}-01`
					this.endTime =	this.startTime = `${res.data.message.substr(0, 7)}-01`
				}
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
			this.getAnalyseSellDetail()
		},

		upDateAnalyseSellDetail(obj) {
			this.startTime = obj[0]
			this.endTime = obj[1]
			this.getAnalyseSellDetail()
			this.statMonth();
		},

		del(){
				
		},

		deriveCurrent(){

		},

		onPageChange(val){
			this.pageNo = val;
			this.getAnalyseSellDetail();
		},

		onPageSizeChange(pageSize){
			this.pageSize = pageSize;
			this.getAnalyseSellDetail();
		},
		
		toggleStatus() {
			if(this.signStatusValue == 'name1') {
				this.statisticsTimeList = ['当前月', '最近三个月', '最近六个月']
				this.signStatus = 'signed,accounted,collected,finished,refund'
				this.status = true
				this.timeFlag = 1
				this.isFuture = true
			}
			
			if(this.signStatusValue == 'name2') {
				this.statisticsTimeList = ['当前月', '未来三个月', '未来六个月']
				this.signStatus = 'committed,checked'
				this.status = false
				this.timeFlag = 2
				this.isFuture = false
			}
			this.$refs.componentStati.addAcitve(0)
		},
		
		onTableItemSelect() {

		},

		onSortChange(val) {
			console.log(val)
			if(val.order == 'normal') {
				this.orderBy = ''
			}else {
				this.orderBy = `${val.key} ${val.order}`
			}
		
			this.getAnalyseSellDetail()
		},

		tagListChange(val) {
			this.tags = val
			this.getAnalyseSellDetail()
			this.statMonth();
		},

		getControlledIds(ids) {
			this.companyIds = ids
			this.getAnalyseSellDetail()
			this.statMonth();
		},

		datafunc() {
			return new Promise((resole, reject) => {

			})
		},

		exportCurr(val){
			let form = this.$el.querySelector('.formexport');
			if(val == 1){
				if(!!!this.signId.length){
					this.$Message.error('请选择学院信息');
					return
				}
				this.exportUrl = ANALYSE.exportAnalyseDeatilSelected()
			}else {
				this.signId = ''
				this.exportUrl = ANALYSE.exportAnalyseDeatil()
			}

			this.$nextTick(()=>{
				form.submit();
			});		

		},

		signChange(obj) {
			this.getSignIds(obj)
		},

		signSelectAll(obj) {
			this.getSignIds(obj)			
		}, 

		getSignIds(obj) {
			let str = ''
			console.log(SVGForeignObjectElement)
			if(obj.length <= 1) {
				this.signId = obj[0].userId
				return
			}

			obj.forEach(item => {
				str += item.userId + ','
			})
			this.signId = str.substr(0, str.length - 1)
		},
	},

	filters:{
		toWan(v){
			return toWan(v);
		}
	}
}
</script>


 