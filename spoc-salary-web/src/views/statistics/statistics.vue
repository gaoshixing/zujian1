<style lang="less">
	@import '../../../../../assets/less/config.less';
    .box{
        padding: 18px 30px 10px 15px;
        border-radius: 4px;
        .ivu-select{
            width:100px;margin-right: 20px;
        }
        .icon-data-picker{
            @h: 32px;
            float: right;height: @h;line-height: @h;width: @h;
            text-align: center;font-size: 20px;color: @primary-color;
            cursor: pointer;
        }
	}
	.index-page-table {
		.ivu-table-header {
			th {
				height: 50px !important;
				background-color: #f8f8f9;
			}
		}
	}
	.statistics {

		.progress {
			p {
				line-height: 18px;
			}
		}

		border-top: 1px #e0e0e0 solid;
		.setTimeBox {
			padding-top: 20px;
		}
		.shadowBox{
			border-radius: 6px;
			margin: 30px 0;
			.card_tit {
				line-height: 50px;
				font-size: 16px;
				text-indent: 1em;
				font-weight: bold;
			}
			.shadowMain{
				// border-top: 1px #e0e0e0 solid;
				padding: 20px;
			}
		}
		.variation_table_box {
			.tableBox {
				.table_main {
					.ivu-table-wrapper {
						.ivu-table {
							th{
								height: 58px;
								font-size: 14px;
							}
						}
					}
				}
			}
		}
	}
	.personal-detail {
		padding-left: 15px;
		box-sizing: border-box;
		.personal-detail-title {
			color: #333;
			font-size: 16px;
			line-height: 50px;
			border-bottom: solid 1px #e0e0e0;
		}
		.personal-detail-content {
			ul {
				overflow: hidden;
				clear: both;
				li {
					list-style: none;
					float: left;
					width: 20%;
					text-align: center;
					height: 100px;
					box-sizing: border-box;
					padding-top: 40px;
					> div {
						font-size: 20px;
						color: #333;
						height: 27px;
						margin-bottom: 14px;
						position: relative;
						> p {
							height: 27px;
							display: block;
							b {
								position: absolute;
								left: 50%;
								transform: translate(-100%);
								top: 2px;
								line-height: 27px;
								height: 27px;
								vertical-align: middle;
							}
						}
					}
					>span {
						font-size: 14px;
						color: #999999;
					}
				}
			}
		}
	}
	.up-or-down-span {
		min-width: 20px;
		height: 27px;
		box-sizing: border-box;
		display: inline-block;
		position: absolute;
		left: 50%;
		span {
			display: inline-block;
			height: 50%;
			width: 100%;
			font-size: 10px;
			// color: #999999;
			text-align: center;
			line-height: 12px;
		}
	}
	.up-span {
		span {
			position: absolute;
			left: 0;
			bottom: 0;
		}
		.ivu-icon-arrow-up-b {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			top: 2px;
		}
	}
	.down-span {
		span {
			position: absolute;
			left: 0;
			top: 5px;
		}
		.ivu-icon-arrow-down-b {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			bottom: 0;
		}
	}
	.render-echarts-columnar {
		box-sizing: border-box;
		margin-top: 40px;
		padding-left: 15px;
	}
	.faker-echarts {
		width: 550px;
		box-sizing: border-box;
		padding: 0 50px;
		position: relative;
		.faker-echarts-tixing {
			cursor: pointer;
			margin: 0 auto;
			border-left : solid 20px transparent;
			border-right: solid 20px transparent;
			margin-bottom: 10px;
			position: relative;
			box-sizing: content-box;
		}
		.faker-echarts-fenge {
			position: absolute;
			left: 50%;
			top: 43px;
			transform: translateX(-50%);
			width: 450px;
			height: 1px;
			opacity: 1;
			>p {
				opacity: 1 !important;
				position: absolute;
			}
			>p:nth-of-type(1) {
				left: 5%;
				top: 5px;
			}
			>p:nth-of-type(2) {
				right: 5%;
				top: -22px;
			}
		}
		.faker-echarts-list {
			width: 500px;
			min-height: 300px;
			display: inline-block;
			position: absolute;
			left: 550px;
			top: 0;
			>div {
				height: 25px;
				margin-bottom: 18px;
				>p {
					float: left;
					width: 20px;
					height: 20px;
					display: inline-block;
					margin-top: 2.5px;
					margin-right: 5px;
				}
				span {
					float: left;
					margin-top: 2.5px;
					display: inline-block;
					line-height: 20px;
					margin-right: 5px;
				}
			}
		}
	}
	#echarts-personnel-distribution {
		>div {
			min-width: 40%;
		}
	}
	.render-echarts-tixing {
		width: 1100px;
		margin: 0 auto;
	}
</style>

<template>
	<div class="statistics">
		<div class="box">
			<Select v-model="year" @on-change="selectDateChange" style="width: 120px; margin-right: 10px;">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value + '年'}}</Option>
            </Select>
            <Select v-model="month" @on-change="selectDateChange" style="width: 120px;">
                <Option v-for="item in monthList" :value="item.value" :key="item.value">{{ item.value + '月'}}</Option>
            </Select>
		</div>
		<div class="variation_table_box shadowBox">
			<p class="card_tit">各公司人员变动情况</p>
			<div class="tableBox shadowMain">
				<div class="table_main" style="min-height: 368px;">
					<Table
						class="index-page-table"
						v-if="companyList"
						highlight-row ref="currentRowTable"
						height="368"
						:columns="columns"
						:data="companyList"
						@on-sort-change="sort"
						@on-current-change="onCurrentChange"
						></Table>
				</div>
			</div>
		</div>
		<div class="personal-detail">
			<p class="personal-detail-title">{{pageDetail && pageDetail.salaryInfo.name}}</p>
			<div class="personal-detail-content">
				<ul>
					<li>
						<div>
							<p>
								<b>{{pageDetail && pageDetail.salaryInfo.curPersonCount}}</b>
								<span style="color:#e62c28;" class="up-or-down-span up-span" v-if="pageDetail && (pageDetail.salaryInfo.curPersonCount - pageDetail.lastSalaryInfo.curPersonCount > 0)">
									<span>{{pageDetail && pageDetail.salaryInfo.curPersonCount  - pageDetail.lastSalaryInfo.curPersonCount}}</span>
									<Icon type="arrow-up-b" style="font-size: 16px;"></Icon>
								</span>
								<span style="color:#50cc52;" class="up-or-down-span down-span" v-else-if="pageDetail && (pageDetail.salaryInfo.curPersonCount - pageDetail.lastSalaryInfo.curPersonCount < 0)">
									<span>{{pageDetail && pageDetail.lastSalaryInfo.curPersonCount  - pageDetail.salaryInfo.curPersonCount}}</span>
									<Icon type="arrow-down-b" style="font-size: 16px;"></Icon>
								</span>
							</p>
						</div>
						<span>本月发放薪酬人数</span>
					</li>
					<li>
						<div>
							<p>
								<b>{{pageDetail && pageDetail.salaryInfo.curPersonCount}}</b>
								<span style="color:#e62c28;" class="up-or-down-span up-span" v-if="pageDetail && (pageDetail.salaryInfo.curPersonCount - pageDetail.lastSalaryInfo.curPersonCount > 0)">
									<span>{{pageDetail && pageDetail.salaryInfo.curPersonCount  - pageDetail.lastSalaryInfo.curPersonCount}}</span>
									<Icon type="arrow-up-b" style="font-size: 16px; "></Icon>
								</span>
								<span style="color:#50cc52;" class="up-or-down-span down-span" v-else-if="pageDetail && (pageDetail.salaryInfo.curPersonCount - pageDetail.lastSalaryInfo.curPersonCount < 0)">
									<span>{{pageDetail && pageDetail.lastSalaryInfo.curPersonCount  - pageDetail.salaryInfo.curPersonCount}}</span>
									<Icon type="arrow-down-b" style="font-size: 16px; "></Icon>
								</span>
							</p>
						</div>
						<span>截止月末在职人数</span>
					</li>
					<li @click="goRouter('incumbent', 'joinDate')">
						<div style="cursor:pointer">
							<p>
								<a>{{pageDetail && pageDetail.salaryInfo.curEntryCount}}</a>
								<span style="color:#e62c28;" class="up-or-down-span up-span" v-if="pageDetail && (pageDetail.salaryInfo.curEntryCount - pageDetail.lastSalaryInfo.curEntryCount > 0)">
									<span>{{pageDetail && pageDetail.salaryInfo.curEntryCount  - pageDetail.lastSalaryInfo.curEntryCount}}</span>
									<Icon type="arrow-up-b" style="font-size: 16px; "></Icon>
								</span>
								<span style="color:#50cc52;" class="up-or-down-span down-span" v-else-if="pageDetail && (pageDetail.salaryInfo.curEntryCount - pageDetail.lastSalaryInfo.curEntryCount < 0)">
									<span>{{pageDetail && pageDetail.lastSalaryInfo.curEntryCount  - pageDetail.salaryInfo.curEntryCount}}</span>
									<Icon type="arrow-down-b" style="font-size: 16px; "></Icon>
								</span>
							</p>
						</div>
						<span>新入职人数</span>
					</li>
					<li @click="goRouter('incumbent', 'correctDate')">
						<div style="cursor:pointer">
							<p>
								<a>{{pageDetail && pageDetail.salaryInfo.curPositiveCount}}</a>
								<span style="color:#e62c28;" class="up-or-down-span up-span" v-if="pageDetail && (pageDetail.salaryInfo.curPositiveCount - pageDetail.lastSalaryInfo.curPositiveCount > 0)">
									<span>{{pageDetail && pageDetail.salaryInfo.curPositiveCount  - pageDetail.lastSalaryInfo.curPositiveCount}}</span>
									<Icon type="arrow-up-b" style="font-size: 16px; "></Icon>
								</span>
								<span style="color:#50cc52;" class="up-or-down-span down-span" v-else-if="pageDetail && (pageDetail.salaryInfo.curPositiveCount - pageDetail.lastSalaryInfo.curPositiveCount < 0)">
									<span>{{pageDetail && pageDetail.lastSalaryInfo.curPositiveCount  - pageDetail.salaryInfo.curPositiveCount}}</span>
									<Icon type="arrow-down-b" style="font-size: 16px; "></Icon>
								</span>
							</p>
						</div>
						<span>转正人数</span>
					</li>
					<li @click="goRouter('employee', 'departureDate')">
						<div style="cursor:pointer">
							<p>
								<a>{{pageDetail && pageDetail.salaryInfo.curLeaveCount}}</a>
								<span style="color:#e62c28;" class="up-or-down-span up-span" v-if="pageDetail && (pageDetail.salaryInfo.curLeaveCount - pageDetail.lastSalaryInfo.curLeaveCount > 0)">
									<span>{{pageDetail && pageDetail.salaryInfo.curLeaveCount  - pageDetail.lastSalaryInfo.curLeaveCount}}</span>
									<Icon type="arrow-up-b" style="font-size: 16px; "></Icon>
								</span>
								<span style="color:#50cc52;" class="up-or-down-span down-span" v-else-if="pageDetail && (pageDetail.salaryInfo.curLeaveCount - pageDetail.lastSalaryInfo.curLeaveCount < 0)">
									<span>{{pageDetail && pageDetail.lastSalaryInfo.curLeaveCount  - pageDetail.salaryInfo.curLeaveCount}}</span>
									<Icon type="arrow-down-b" style="font-size: 16px; "></Icon>
								</span>
							</p>
						</div>
						<span>离职人数</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="render-echarts-columnar">
			<p style="font-size: 16px; color:#b6b6b6;margin-bottom:10px;">各部门人员分布</p>
			<div id="echarts-personnel-distribution" style="width:100%;height: 400px;"></div>
		</div>
		<p style="font-size: 16px; color:#b6b6b6;margin-bottom:30px;margin-left: 15px;">职级员工分布</p>
				<div id="echarts-personnel-distribution1"  style="width:100%;height: 400px;">
				</div>
		<div class="render-echarts-tixing">
			<div class="faker-echarts" v-if="pageDetail">
				<!-- <p>{{pageDetail.rankInfo[7].rankName}}-{{pageDetail.rankInfo[4+1].rankName}} {{bottomPercent}}</p>
				<p>{{pageDetail.rankInfo[5].rankName}}-{{pageDetail.rankInfo[0].rankName}} {{topPercent}}</p> -->
				<!-- <div
					v-for="(item, index) in pageDetail.rankInfo"
					:key="index" 
					class="faker-echarts-tixing"
					@mouseover="mouseoverTixing(index)"
					@mouseout="mouseoutTixing"
					:style="{ width: 120 + index * (20 + index) + 'px', marginBottom: Math.floor(pageDetail.rankInfo.length / 2) - 1 === index ? '25px' : '10px', borderBottom: `solid 30px ${colorArr[index]}`, }">
					<div v-if="Math.floor(pageDetail.rankInfo.length / 2) - 1 === index" class="faker-echarts-fenge" :style="{borderBottom: `dashed 1px ${colorArr[halfIndex]}`,}">
						<p>{{pageDetail.rankInfo[pageDetail.rankInfo.length-1].rankName}}-{{pageDetail.rankInfo[index+1].rankName}} {{bottomPercent}}</p>
						<p>{{pageDetail.rankInfo[index].rankName}}-{{pageDetail.rankInfo[0].rankName}} {{topPercent}}</p>
					</div>
				</div> 
				<div class="faker-echarts-list">
					<div
						v-for="(item, index) in pageDetail.rankInfo"
						:key="index"
						:class="[hoverIndex === index ? 'hoverClass' : '']"
						:style="{color: hoverIndex === index ? colorArr[index]: '#495060'}">
						<p :style="{background: colorArr[index]}"></p>
						<span style="margin-right: 20px;">{{item.rankName}}</span>
						<span>共{{item.nums}}人</span>
						<span v-if="total">占比{{(item.nums / total * 100).toFixed(2)}}%</span>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import valid, {
		errors,
		sys,
		common,
		indexPage,
		salPerpetualCalenderRest,
	} from "../../libs/request.js";
	import { mapMutations, mapState, mapGetters, } from "vuex";
	import { waitUntil, } from '@public/libs/util';
	import progre from "./progress.vue"
	import echarts from 'echarts';
	export default {
		data() {
			return {
				companyList: null,
				companyId: null,
				pageDetail: null,
				pageNo: 1,
				year: null,
				month: null,
				hoverIndex: null,
				total: null,
				halfIndex: null,
				topPercent: null,
				bottomPercent: null,
				colorArr: ["#D3ADF7", "#FFA39E", "#FF9DC9", "#FFBB96", "#FAD337", "#B7EB8F", "#87E8DE", "#91D5FF"],
				columns: [{
						title: '组织机构',
						key: 'companyName',
					},
					{
						title: '离职率',
						key: 'turnOverRate',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h(progre, {
								props: {
									percent: params.row.turnOverRate + 0,
								},
							}, '');
						}
					},
					{
						title: '转职员工比率',
						key: 'positiveRate',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h(progre, {
								props: {
									percent: params.row.positiveRate + 0,
								},
							}, '');
						}
					},
					{
						title: '员工新进率',
						key: 'newRate',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h(progre, {
								props: {
									percent: params.row.newRate + 0,
								},
							}, '');
						}
					},
					{
						title: '员工存留率',
						key: 'retentionRate',
						sortable: 'custom',
						render: (h, params) => {
							let self = this;
							return h(progre, {
								props: {
									percent: params.row.retentionRate + 0
								},
							}, '');
						}
					},
				],
				yearList: [
					{ value: new Date().getFullYear(), },
					{ value: new Date().getFullYear() - 1, },
					{ value: new Date().getFullYear() - 2, },
					{  value: new Date().getFullYear() - 3, },
				],
				monthList: [
					{ value: 1, },
					{ value: 2, },
					{ value: 3, },
					{ value: 4, },
					{ value: 5, },
					{ value: 6, },
					{ value: 7, },
					{ value: 8, },
					{ value: 9, },
					{ value: 10, },
					{ value: 11, },
					{ value: 12, },
				],
			}
		},
		computed: {

		},
		components: {
			progre,
		},
		created() {
			this.getCurYearAndMonth();
		},
		mounted() {
			// this.$nextTick(() => {
			// 	let _this = this;
			// 	let table_box = this.$el.querySelector(".ivu-table-body");
			// 	let table_tbody = this.$el.querySelector(".ivu-table-tbody");
			// 	table_box.addEventListener('scroll', function() {
			// 		if(Math.ceil(table_box.clientHeight + table_box.scrollTop) >= Math.ceil(table_tbody.offsetHeight)) {
			// 			if(_this.data.length < _this.count) {
			// 				_this.pageNo += 1;
			// 				_this.shiftData();
			// 			}
			// 		}
			// 	}, false);
			// })
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			/*
			* 时间筛选
			*/
			selectDateChange() {
				this.getCompanyList();
			},
			mouseoverTixing(index) {
				this.hoverIndex = index;
			},
			mouseoutTixing() {
				this.hoverIndex = null;
			},
			getList() {
				// this.updateLoadingStatus({ isLoading: true });
			},
			shiftData() {
				// let params1 = {
				// }
				// crmCustomer.listUnsignedPage(params1).then(valid.call(this)).then(res => {
				// 	if(res.ok) {
				// 		this.count = res.data.data.count;
				// 		this.data = this.data.concat(res.data.data.list);
				// 		this.isloading = false;
				// 	}
				// }).catch(errors.call(this));
			},
			sort(data) {
				// console.log(data, 99)
				this.orderBy = data.key
				if(data.order == 'normal') {
					this.sortType = '';
				} else {
					this.sortType = data.order;
				}
					this.getCompanyList();

				// this.getList();
			},
			/*
			* 选中某一行
			*/
			onCurrentChange(params) {
				this.companyId = params.companyId;
				this.getDetailInfos();
			},
			/*
			* 获取公司列表
			*/
			getCompanyList() {
				const data = {
					year: this.year,
					month: this.month < 10 ? '0' + this.month : this.month,
					orderType: this.sortType,
					orderBy: this.orderBy,
				};
				this.updateLoadingStatus({ isLoading: true });
				indexPage.getCompanyList(data).then(valid.call(this)).then(res => {
					if (res.ok) {
						this.companyList = res.data.data;
						this.companyId = this.companyList[0].companyId;
						this.getDetailInfos();
					}
				}).catch(errors.call(this)).finally(() => this.updateLoadingStatus({ isLoading: false }));
			},
			/*
			* 获取详细信息
			*/
			getDetailInfos() {
				const data = {
					year: this.year,
					month: this.month < 10 ? '0' + this.month : this.month,
					companyId: this.companyId,
				};
				indexPage.getIndexInfo(data).then(valid.call(this)).then(res => {
					this.pageDetail = res.data.data;
					this.pageDetail.rankInfo = this.pageDetail.rankInfo.reverse(); // 金字塔式排列
					this.renderEchartsColumnar();
					this.halfIndex = Math.floor(this.pageDetail.rankInfo.length / 2) - 1 === 0 ? 1 : Math.floor(this.pageDetail.rankInfo.length / 2) - 1;
					const tempArr = this.pageDetail.rankInfo.map(item => item.nums);
					this.total = this.getSum(tempArr);
					if (tempArr.length > 2) {
						this.topPercent = ((this.getSum(tempArr.splice(0, this.halfIndex+1)) / this.total) * 100).toFixed(2) + '%';
						this.bottomPercent = ((this.getSum(tempArr) / this.total) * 100).toFixed(2) + '%';
					} else {
						this.topPercent = ((tempArr[0] / this.total) * 100).toFixed(2) + '%'
						this.bottomPercent = ((tempArr[1] / this.total) * 100).toFixed(2) + '%'
					}
				}).catch(errors.call(this)).finally(() => this.updateLoadingStatus({ isLoading: false }));
			},
			/*
			* 渲染柱状图
			*/
			renderEchartsColumnar() {
				const dataX = this.pageDetail.deptInfo.map(item => item.departmentName);
				const dataY = this.pageDetail.deptInfo.map(item => item.nums);
				let total = 0;
				dataY.forEach(item => { total += item });
				const dom = document.getElementById("echarts-personnel-distribution");
				const dom1 = document.getElementById("echarts-personnel-distribution1");
				const myChart = echarts.init(dom);
				const myChart1 = echarts.init(dom1);
				// console.log(dataX)
				const option = {
					tooltip: {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(datas) {
							return datas[0].name + '：' + datas[0].value + '人';
						},
					},
					xAxis: {
						type: 'category',
						data: dataX,
						axisTick:{
							show:false,
							inside:false,
						},
						axisLine:{
							show:true,
							symbol:['none',],   //---是否显示轴线箭头
							lineStyle:{
								color:'#999999',
								width:0,
								type:'solid',
							},
						},
						axisLabel: {
							interval:0,
							rotate:dataX.length > 5 ? -40 : 0,
							formatter: function (value) {
								// 格式化成月/日，只在第一个刻度显示年份
								// console.log(dataX)
								// console.log(value)
								let text = value;
								if(dataX.length > 5 && value.length > 4) text = value.substring(0,4) + '...';
								return text
							}
						},
					},
					yAxis: {
						type: 'value',
						// show: false,
						axisTick: {
							show:false,
							inside:false,
							lengt:3,
							lineStyle:{
								width:1,
								type:'solid',
							},
						},
						axisLine:{
							show:true,
							symbol:['none',],   //---是否显示轴线箭头
							lineStyle:{
								color:'#999999',
								width:0,
								type:'solid',
							},
						},
					},
					series: [{
						data: dataY,
						type: 'bar',
						barWidth:'22',
						barCategoryGap:'20%',
						label:{
							show:true,
							position:'top',
							rotate:0,
							color:'#999',
							formatter: (params) => {
								if (params.value == 0) return ''
								const percent = total == 0 ? 0 : (params.value / total * 100 ).toFixed(2);
								// console.log('percent', percent)
								return percent + '%';
							},
						},
						itemStyle:{                 //---图形形状
							color:'#1ab2ff',
						}
					}]
				};
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				}
				let data1 = this.pageDetail.rankInfo.map((item, index) => {
					let obj = {value: item.nums, name: item.rankName,label: {show: false},}
					return obj
				})
				let name1 = this.pageDetail.rankInfo.map(item => {
					return item.rankName
				})
				let allNum = this.pageDetail.rankInfo.reduce((curr, pre) => {
					return curr + pre.nums
				}, 0)
				let	option1 = {
					grid: {
						// top: 120,
						right: '50%',
					},
					title : {
						// text: '漏斗图',
						// subtext: '纯属虚构'
					},
					
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 120,						// 标题距容器左侧5%
						top: 40,
						formatter:  (name) => {
							let desp = null
							data1.forEach(item => {
								console.log(item.value, allNum)
								if(item.name == name) desp =  name + '      共' +item.value + '人' +'    占比' + (item.value / allNum * 100).toFixed(2)+'%';
							})
							return desp
						},
						itemHeight: 30,
						data : name1,
					},
					// label: {
					// 	show: false
					// },
					calculable : true,
				
					series : [{
						labelLine: {
							normal: {
								show: false
							}
						},
						left: '10%',
						right: '30%',
	            		width: '60%',
						type:'funnel',
						sort : 'none',
						markLine: {

						},
						itemStyle: {
							normal: {
								label: {
									position: 'left'
								}
							}
						},
						tooltip: {
							show: false,
						},
						data: data1,
						color: ["#D3ADF7", "#FFA39E", "#FF9DC9", "#FFBB96", "#FAD337", "#B7EB8F", "#87E8DE", "#91D5FF"],
						}
					]
				};
				myChart1.setOption(option1, true);
			},
			/*
			* 获取当前月份
			*/
			getCurYearAndMonth() {
				salPerpetualCalenderRest.getCurrentYearAndMonth({}).then(valid.call(this)).then(res => {
					const rdata = res.data.data;
					this.year = rdata.year;
					this.month = Number(rdata.month);
					this.getCompanyList();
				}).catch(errors.call(this));
			},
			getSum(arr) {
				let sum = 0;
				arr.forEach(item => sum += item);
				return sum;
			},
			goRouter(str, type) {
				this.$router.push({
					name: "salary.personnel",
					query: {
						year: this.year,
						month: this.month,
						tabs: str == 'incumbent' ? '1' : '2', 
						data: type,
						company: this.companyId,
					}
				})
			},
		}
	}
</script>