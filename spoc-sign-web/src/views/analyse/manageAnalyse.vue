<style lang="less">
	.manageAnalyse {
		border-top: 1px solid #e0e0e0;
		font-size: 14px;
		.marginCenter{
			margin: 20px auto;
		}
		.alignCenter{
			text-align: center;
		}
		.signCountry {
			margin-bottom: 10px;
		}
		.AnalyseTitle {
			line-height: 80px;
			text-align: center;
			font-size: 16px;
			font-weight: 600;
		}
		.goreturn{
			width: 800px;
			text-align: right;
			padding-right: 2em;
			.return{
				cursor: pointer;
			}
		}
		i,b {
			font-style: normal;
			font-size: 20px;
			font-weight: normal;
			color: red;
		}
		i {
			color: #44bcb7;
		}
		.top10-title{
			margin: 20px;
		}
		.tgreen{
			color: #43bcb0;
			font-size: 18px;
			font-weight: bold;
		}
		.tred{
			color: #f00;
			font-size: 18px;
			font-weight: bold;
		}
		.toCenter{
			text-align: center;
		}
		.addtionSign {
			overflow: hidden;
			.left,.right,.center {
				padding:20px 0; 
				width: 33%;
				float: left;
			}
			.analyseMan {
				margin-top: 30px;
				width: 50%;
				overflow: hidden;
				.aside {
					width: 78px;
					height: 50px;
				}
				span {
					display: inline-block;
					margin-bottom: 10px;
					width: 22%;
					label {
						cursor: pointer;
					}
				}
				input {
					margin-right: 10px;
				}
			}
		}
		.staffanalyse {
			padding-bottom: 40px;
			.staffanalyseTitle {
				margin-bottom: 20px;
				margin-top: 30px;
				line-height: 58px;
				span:first-of-type {
					cursor: auto;
				}
				.active {
					background-color: #43bcb0;
					color: white;
				}
				b {
					color: #43bcb0;
				}
			}
		}
		.charsBox {
			padding: 20px 0;
			overflow: hidden;
			position: relative;
			.left,.center,.right {
				width: 33%;
				float: left;
				position: relative;
				p {
					text-align: center;
					line-height: 50px;
					font-weight: 600;
				}
			}
			.diffStage {
				margin-top: 15px;
				.left,.center,.right {
					width: 33%;
				}
			}
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
</style>
<template>
	<div class="manageAnalyse">
		<statistics-time
			@upDateAnalyseSellDetail="upDateAnalyseSellDetail" 	
			:statistics-time-list="['当前月 ', '最近三个月', '最近六个月']"
			:currentTime="currentTime"
			:startTime="startTime"
			:endTime="endTime"
			>
		</statistics-time>
		
		<v-search-option
		v-if="isAdmin||isCeo||isHeaderOfficeLeader"
		@on-select-item="getControlledIds"
		:controlledData="firm.countryList"
		>
		</v-search-option>
			<Btnlists :title="getBtnlistsTitle('签约业绩统计')" :btnList="btnInfo1"></Btnlists>
		<p class="AnalyseTitle">{{titleTime}}销售目标<i> {{targetTitle.sellobjectPrice | toWan}} </i>万元 , 累计已签约<b> {{targetTitle.signPrice | toWan}} </b>万元 , 累计业绩<b> {{targetTitle.meritPrice | toWan}} </b>万元 , 签单量<b> {{targetTitle.signCount||0}} </b>单</p>
		<div class="alignCenter">
			<echart-item :data="data0" :mstyle="{width:'500px',height:'400px'}"></echart-item>
		</div>
		<div class="charsBox">
			<div class="diffProduct clearfix" style="width:100%">
				<div class="left">
					<p>不同国别的销售业绩 <span class="tred">{{data1.sum | toWan}}</span>（万元)</p>
					<echart-item :data="data1.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>
				<div class="center">
					<p>不同产品类型的销售业绩 <span class="tred">{{data2.sum | toWan}}</span>（万元)</p>
					<echart-item :data="data2.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>
				<div class="right">
					<p>不同产品类型的销售业绩 <span class="tred">{{data3.sum | toWan}}</span>（万元）分布</p>
					<echart-item :data="data3.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>
			</div>
			<div class="diffStage clearfix" style="width:100%">
				<div class="left">
					<p>不同服务类型的销售业绩 <span class="tred">{{data4.sum | toWan}}</span>（万元）</p>
					<echart-item :data="data4.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>
				<div class="center">
					<p>不同渠道的销售业绩 <span class="tred">{{data5.sum | toWan}}</span>（万元）</p>
					<echart-item :data="data5.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>
				<div class="right">
					<p>分公司退款金额 <span class="tred">{{data55.sum | toWan}}</span>（万元）</p>
					<echart-item :data="data55.option" :mstyle="{width:'100%',height:'200px'}">
					</echart-item>
				</div>

			</div>
		</div>
		<div class="addtionSign" >
			<Btnlists :title="getBtnlistsTitle('合同尾款统计')" :btnList="btnInfo2"></Btnlists>
			<div class="left">
				<p class="toCenter">尾款待收总金额 <span class="tred">{{data6.sum | toWan}}</span>（万元）</p>
				<echart-item :data="data6.option" :mstyle="{width:'330px',height:'200px'}">
				</echart-item>
			</div>
			<div class="center">
				<p class="toCenter">{{titleTime}}尾款待收总金额 <span class="tred">{{data7.sum | toWan}}</span>（万元）</p>
				<echart-item :data="data7.option" :mstyle="{width:'330px',height:'200px'}">
				</echart-item>
			</div>
			<div class="right">
				<p class="toCenter">尾款已收总金额 <span class="tred">{{data8.sum | toWan}}</span>（万元）</p>
				<echart-item :data="data8.option" :mstyle="{width:'330px',height:'200px'}">
				</echart-item>
			</div>
		</div>
		<div class="discountRate">
			<Btnlists :title="getBtnlistsTitle('附加合同审批“综合折扣率”统计-TOP10')" :btnList="btnInfo3"></Btnlists>
			<div>
				<div class="top10-title">
				</div>
				<echart-item :data="data9" :mstyle="{width:'800px',height:'400px'}">
				</echart-item>
			</div>
		</div>
		<div class="staffanalyse">
			<div class="staffanalyseTitle">
				<Btnlists :title="getBtnlistsTitle('分公司员工业绩统计')"></Btnlists>
				<p>
					<span>销售业绩 ：</span>
					<Input v-model="minFactPrice" placeholder="请输入金额" style="width: 150px"></Input>
					<span style=" display: inline-block;width: 10px; height: 2px; background-color: rgb(68, 188, 183); margin: 5px 10px;"></span>
					<Input v-model="maxFactPrice" placeholder="请输入金额" style="width: 150px"></Input> 万元
				</p>
				<p>
					<span>实际优惠 ：</span>
					<Input v-model="minDeratePrice" placeholder="请输入金额" style="width: 150px"></Input>
					<span style=" display: inline-block;width: 10px; height: 2px; background-color: rgb(68, 188, 183); margin: 5px 10px;"></span>
					<Input v-model="maxDeratePrice" placeholder="请输入金额" style="width: 150px"></Input> 万元
				</p>
				<p>
					<span>优惠成本 ：</span>
					<Input v-model="minPresentPriceCost" placeholder="请输入金额" style="width: 150px"></Input>
					<span style=" display: inline-block;width: 10px; height: 2px; background-color: rgb(68, 188, 183); margin: 5px 10px;"></span>
					<Input v-model="maxPresentPriceCost" placeholder="请输入金额" style="width: 150px"></Input> 万元
				</p>
				<p>
					<Button @click="isFilter(true)" style="margin:0px 93px 0px 140px" type="primary">筛选</Button>
					<Button @click="isFilter(false)" type="primary">重置</Button>
				</p>   
			</div>
			<div v-show="!showCompanyUserDetail">
				<echart-item :data="data10" :mstyle="{width:'800px',height:'400px'}" @on-click="onData10Click">
				</echart-item>
			</div>
			<div v-show="showCompanyUserDetail">
				<p @click="showCompanyUserDetail=false" class="goreturn" v-if="!isBranchOfficeLeader">
					<span class="return">返回</span>
				</p>
				<echart-item :data="data11" :mstyle="{width:'800px',height:'400px'}" @on-click="onData11Click">
				</echart-item>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapState} from 'vuex';
	import signCountry from "./components/signCountry"
	import statisticsTime from "../../modules/statisticsTime"
	import analyseTitle from "./components/analyseTitle"
	import Btnlists from '@public/modules/btnlist';
	import vSearchOption from "../../modules/vSearchOption"
	import analyseBar from "./components/analyseBar"

	import echartItem from './components/echartItem'
	import { toWan , waitUntil } from '../../libs/util.js';

	import valid, { errors, ANALYSE, common } from "../../libs/request";
	const color=['#5a9cd3','#85ca48','#e8722b','#adc2e6','#fdb802','#3967bc','#9a9b9c','#66a041','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
	export default {
		data() {
			return {
				minFactPrice: '',
				maxFactPrice: '',
				minDeratePrice: '',
				maxDeratePrice: '',
				minPresentPriceCost: '',
				maxPresentPriceCost: '',
				targetTitle: {
					sellobjectPrice: '',
					signPrice: '',
					signCount: '',
				},
				dataMain:{
					data0:{},
					data1:[],
					data2:[],
					data3:[],
					data4:[],
					data5:[],
					data55:[],
					data6:{},
					data9:{},
					data10:[],
					data11:[],
				},
				showCompanyUserDetail:false,

				readySellTarget: '',
				canvasStatus: false,
				controlled: '全部',
				num1: 0,
				num: 0,
				signCount: "",
				reducePrice: "20",
				analyseSignName: "",
				titleBar: "",
				id: 1,
				firm:{
					searchName:'分公司',
					countryList:[],
				},
				title: "",
				signMang: "92",
				area: "北京",
				time: [],
				labelsArr: [],
				datasetsArr: [],
				sellTarget: "1000",
				currentTime: '',
				beforeTime: '',
				afterTime: '',
				btnInfo1: [
					{
						text: '查看明细',
						type: 'primary',
						event: this.detail,
					},
				],
				btnInfo2: [
					{
						text: '尾款统计',
						type: 'primary',
						event: this.Nopayment,
					},
				],
				btnInfo3: [
					{
						text: '综折扣率',
						type: 'primary',
						event: this.discountRate,
					},
				],
				datacollection: {
					labels: ["合同原价(总额)", "签约总金额", "销售目标"],
					datasets: [
					{
						backgroundColor: ["#5a9cd3", "#91d151", "#b7c9e8"],
						data: [500, 400, 308]
					}
					]
				},
				options: {
					legend: {
					display: false
					},
					title: {
					display: true,
					position: "bottom",
					fontStyle: "nomail",
					fontSize: 16,
					},
					responsive: true,
					maintainAspectRatio: false,
					scaleBeginAtZero: false,
					scales: {
					xAxes: [
						{
						gridLines: {
							display: false
						},
						categoryPercentage: 0.5,
						barPercentage: 0.5,
						scaleStartValue: 100
						}
					]
					}
				},
				startTime: '',
				companyIds: '',
				endTime: '',
				currentTitle: '',
			};
		},
		
		computed: {
			...mapGetters('sign',['isAdmin','isCeo','isBranchOfficeLeader','isHeaderOfficeLeader']),
			...mapState(['userInfo']),
			data0(){
				let d = this.dataMain.data0;
				var obj = {
					// '签单量':d.signCount,
					'合同原价':d.contractPrice/1e4,
					'签约总金额':d.signPrice/1e4,
					'销售目标':d.sellobjectPrice/1e4,
					'销售业绩':d.meritPrice/1e4,
				}; 
				const option = {
					tooltip : {
						trigger: 'item'
					},
					xAxis: {
						type: 'category',
						data: Object.keys(obj)
					},
					yAxis: {
						type: 'value'
					},
					grid: {
						top:'2%',
						left: '1%',
						right: '1%',
						bottom: '1%',
						containLabel: true
					},
					color,
					series: [{
						barWidth: '30%',
						data: Object.values(obj),
						type: 'bar'
					}]
				};
				return option;
			},
			data1(){
				let d = this.dataMain.data1;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				let ops = this.makeOption('不同国别的销售业绩',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data2(){
				let d = this.dataMain.data2;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption('不同产品体系的销售业绩',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data3(){
				let d = this.dataMain.data3;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption('不同产品类型的销售业绩分布',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data4(){
				let d = this.dataMain.data4;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption('不同申请阶段的销售业绩',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data5(){
				let d = this.dataMain.data5;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption('不同渠道的销售业绩',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data55(){
				let d = this.dataMain.data55;
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption('分公司退款金额',titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data6(){
				const name='尾款待收总金额';
				let d = this.dataMain.data6;
				if(d.allStayTailPrice){
					d = d.allStayTailPrice;
				} else {
					return {sum:'',option:{}};
				}
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption(name,titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data7(){
				const name ='尾款待收总金额';
				const date = this.titleTime;
				let d = this.dataMain.data6;
				if(d.monthStayTailPrice){
					d = d.monthStayTailPrice;
				} else {
					return {sum:'',option:{}};
				}
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const ops = this.makeOption(name,titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data8(){
				const name ='总款已收总金额';
				const date = this.titleTime;
				let d = this.dataMain.data6;
				if(d.monthHasTailPrice){
					d = d.monthHasTailPrice;
				} else {
					return {sum:'',option:{}};
				}
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.name);
					return {value:item.price,name:item.name};
				});
				const num = data.map(item=>item.value).reduce((a,b)=>a+b,0);
				var formatter = (obj)=>{
					return toWan(obj.value);
				}
				const grid= {
					top: 0,
					left: '3%',
					right: '4%',
					bottom: '8%',
					containLabel: true
				};
				const ops = this.makeOption(name,titles,data,{formatter});
				return {
					sum:num,
					option:ops
				};
			},
			data9(){
				let d = this.dataMain.data9;
				if(d.list){
					d = d.list.reverse();
				} else {
					return {};
				}
				let titles= [];
				let data = d.map(item=>{
					titles.push(item.userName);
					return {value:item.discountRate,name:item.userName};
				});

				let option = {
					tooltip: {
						backgroundColor:'rgba(200,200,200,0.7)',
						trigger: 'axis',
						textStyle:{
							color:'#333'
						},
						formatter:(param)=>{
							param=param[0];
							const item = d.find(item=>item.userName==param.name);
							if(item){
								return `审批通过<span style="color:#43bcb0;font-size:18px">${item.agreeCount}</span>份合同，总计折扣<span style="color:#f00;font-size:18px">${toWan(item.deratePrice)}</span>万元，总计优惠成本<span style="color:#43bcb0;font-size:18px">${toWan(item.presentPriceCost)}</span>万元，总计签约<span style="color:#f00;font-size:18px">${toWan(item.factPrice)}</span>万`;
							} else{
								console.info('not found');
							}
						},
					},
					grid: {
						top:0,
						left: '3%',
						right: '10%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
					},
					yAxis: {
						type: 'category',
						data: titles
					},
					color,
					series: [
						{
							type: 'bar',
							barWidth:'30%',
							label:{
								normal: {
									show: true,
									position: 'right',
									formatter:'{c}%'
								}
							},
							data: data
						}
					]
				};
				return option;
			},
			data10NameMap(){
				let d = this.dataMain.data10;
				let map={};
				d.forEach(item=>{
					map[item.name]=item;
				});
				return map;
			},
			data11NameMap(){
				let d = this.dataMain.data11;
				let map={};
				d.forEach(item=>{
					map[item.name]=item;
				});
				return map;
			},
			data10(){
				let d = this.dataMain.data10;
				let s=[];
				let titles=[];
				let vals={};
				let types = {
					factPrice:'签约金额',
					deratePrice:'折扣金额',
					presentPriceCost:'优惠成本'
				}
				d.forEach((item,index)=>{
					titles.push(item.name);
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
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'insideRight'
							}
						},
						data: vals[i]
					};
					s.push(exam)
				}
				
				let option = {
					tooltip : {
						trigger: 'axis',
						axisPointer : {
							type : 'shadow'
						}
					},
					legend: {
						data: Object.values(types),
						top:'bottom' 
					},
					color,
					grid: {
						top: 0,
						left: '3%',
						right: '4%',
						bottom: '8%',
						containLabel: true
					},
					xAxis:  {
						type: 'value'
					},
					yAxis: {
						type: 'category',
						data: titles,
						triggerEvent:true
					},
					series: s
				};
				return option;
			},
			data11(){
				let d = this.dataMain.data11;
				let s=[];
				let titles=[];
				let vals={};
				let types = {
					factPrice:'签约金额',
					deratePrice:'折扣金额',
					presentPriceCost:'优惠成本'
				}
				d.forEach((item,index)=>{
					titles.push(item.name);
					for(let i in types){
						if(!vals[i]){
							vals[i]=[];
						}
						vals[i].push(parseInt(item[i]));
					}
				});

				for(let i in types){
					let name = types[i];
					const exam = {
						name: name,
						type: 'bar',
						stack: '总量',
						barWidth: '40%',
						label: {
							normal: {
								show: true,
								position: i=='presentPriceCost'?'right':'insideRight'
							}
						},
						data: vals[i]
					};
					s.push(exam)
				}
				
				let option = {
					tooltip : {
						trigger: 'axis',
						axisPointer : {
							type : 'shadow'
						}
					},
					legend: {
						data: Object.values(types),
						top:'bottom' 
					},
					grid: {
						top: 0,
						left: '3%',
						right: '8%',
						bottom: '8%',
						containLabel: true
					},
					color,
					xAxis:  {
						type: 'value'
					},
					yAxis: {
						type: 'category',
						data: titles,
						triggerEvent:true
					},
					series: s
				};
				return option;
			},

			titleTime() {
				if(this.startTime == this.endTime && this.startTime == this.currentTime) {
					return this.currentTitle.substr(0, 7)
				}

				return `${this.startTime.substr(0, 7)}${this.endTime ? ' -- ' : ''}${this.endTime.substr(0, 7)}`
			}

		},


		components: {
			signCountry,
			statisticsTime,
			analyseTitle,
			vSearchOption,
			Btnlists,
			analyseBar,
			echartItem
		},
		mounted() {
			this.getControlledMsg()
			waitUntil(()=>{
				return !!this.userInfo.id;
			},()=>{
				this.getAnasyleData('first')
			});
		},

		methods: {
			getBtnlistsTitle(title) {
				return this.titleTime + ' ' + title;
			},
			getAnasyleData(type){
				if(this.startTime == this.endTime && this.startTime == this.currentTime) {
					this.startTime = this.endTime = ''
				}
				let param = {
					companyIds: this.companyIds,	
					startTime: this.startTime,
					endTime: this.endTime,
					timePrecision: 'month',
				}

				ANALYSE.achieveMent(param).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data0 = res.data.data;
						this.targetTitle = res.data.data
					}
				}).catch(errors.call(this));
				ANALYSE.achieveMentTag(Object.assign({id:2001},param)).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data1 = res.data.data;
					}
				}).catch(errors.call(this));
				ANALYSE.achieveMentTag(Object.assign({id:2008},param)).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data2 = res.data.data;
					}
				}).catch(errors.call(this));
				ANALYSE.achieveMentTag(Object.assign({id:2014},param)).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data3 = res.data.data;
					}
				}).catch(errors.call(this));
				ANALYSE.achieveMentTag(Object.assign({id:2036},param)).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data4 = res.data.data;
					}
				}).catch(errors.call(this));
				ANALYSE.achieveMentSource(param).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data5 = res.data.data;
					}
				}).catch(errors.call(this));

				ANALYSE.officeOutPrice(param).then(valid.call(this)).then(res=>{ // 退款
					if(res.ok){
						this.dataMain.data55 = res.data.data;
					}
				}).catch(errors.call(this));

				ANALYSE.tail(param).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data6 = res.data.data;
						if(type == 'first') {
							this.currentTitle = res.data.message.substr(0, 7)
							this.currentTime = `${res.data.message.substr(0, 7)}-01`
							this.startTime = this.endTime = `${res.data.message.substr(0, 7)}-01`
						}
					}
				}).catch(errors.call(this));
				ANALYSE.analyseDiscountRate(Object.assign({orderBy:'discountRate desc'},param)).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data9 = res.data.data;
					}
				}).catch(errors.call(this));

				
				if(this.isBranchOfficeLeader){
					this.getCompanyUserSell(this.userInfo.officeId);
					this.showCompanyUserDetail=true;
				} else {
					ANALYSE.companySell(param).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.dataMain.data10 = res.data.data;
						}
					}).catch(errors.call(this));
				}
			},
			makeOption(title,titles,data,extra){
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'right',
						top:'bottom',
						data:titles,
						type:'scroll',
						align:'left',
					},
					color,
					series: [
						{
							name:title,
							type:'pie',
							center: ['42%','50%'],
							radius: ['40%', '75%'],
							label: {
								normal: {
									show: true,
									position: 'inner',
									formatter:extra.formatter,
								},
							},
							data:data
						}
					]
				};
				if(extra.grid){
					option.grid = extra.grid;
				}
				return option;	
			},

			detail() {
			
				this.$router.push({name: "sign.anslyseDetailPass" });
			},

			Nopayment() {
				// this.$router.push({name:'choiceschool.schoolApproval'});
				this.$router.push({name: "sign.anslyseDetailNopayment" });
			},

			discountRate() {
				this.$router.push({name: "sign.anslyseDetailDiscountRateAro" });
			},

			analyseSignCount(name) {
				this.analyseSignName = name;
			},

			addActive(index) {
				this.num = index;
			},

			upDateAnalyseSellDetail(obj) {
				this.startTime = obj[0]
				this.endTime = obj[1]
				
				this.getAnasyleData()
			},

			getControlledIds(ids) {
				this.companyIds = ids
				this.getAnasyleData()
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

			isFilter(temp) {
				if(!temp) {
					this.minFactPrice = ''
					this.maxFactPrice = ''
					this.minDeratePrice = ''
					this.maxDeratePrice = ''
					this.minPresentPriceCost = ''
					this.maxPresentPriceCost = ''
				}
				this.getCompanySell()
			},

			getCompanySell() {
				let param = {
					companyIds: this.companyIds,	
					startTime: this.startTime,
					endTime: this.endTime,
					timePrecision: 'month',
					minFactPrice: this.minFactPrice,
					maxFactPrice: this.maxFactPrice,
					minDeratePrice: this.minDeratePrice,
					maxDeratePrice: this.maxDeratePrice,
					minPresentPriceCost: this.minPresentPriceCost,
					maxPresentPriceCost: this.maxPresentPriceCost,
				}

				ANALYSE.companySell(param).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data10 = res.data.data;
					}
				}).catch(errors.call(this));
			},
			getCompanyUserSell(id){
				const params={id,startTime:this.startTime,endTime:this.endTime,timePrecision:'month'};
				ANALYSE.companyUserSell(params).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.dataMain.data11 = res.data.data;
					}
				}).catch(errors.call(this));
			},
			onData10Click(params,options){
				const item = this.data10NameMap[params.value];
				if(item){
					this.getCompanyUserSell(item.id);
					this.showCompanyUserDetail=true;
				}
			},
			onData11Click(params,options){
				const item = this.data11NameMap[params.value];
				if(item){
					console.info(params,item);
					this.$router.push({name:'sign.analyseAro',query:{userId:item.id,person:1}});
				}
			}
			
		},
		filters:{
			toWan(v){
				return toWan(v)
			}
		}
	};
	</script>
