<style lang="less">
	.pandect-boss {
		color: #333;
		padding-top: 26px;
		>p:nth-of-type(1) {
			font-size: 16px;
			font-weight: bold;
			line-height: 44px;
		}
		.pandect-nav {
			overflow: hidden;
			margin-bottom: 30px;
			>div {
				width: 50px;
				height: 26px;
				float: left;
				line-height: 26px;
				cursor: pointer;
				text-align: center;
				user-select: none;
				transition: all .2s ease;
			}
			.pandect-pandect {
				margin-right: 15px;
			}
		}
		.pandect-service-member {
			position: relative;
			padding-left: 100px;
			margin-bottom: 50px;
			.pandect-service-member-title {
				position: absolute;
				left: 0;
				top: 0;
				width: 100px;
				line-height: 26px;
				font-size: 14px;
			}
			.pandect-service-member-list {
				overflow: hidden;
				p {
					float: left;
					padding: 6px 10px;
					margin-right: 10px;
					cursor: pointer;
					user-select: none;
					transition: all .2s ease;
				}
			}
		}
		.pandect-dt-detail {
			.pandect-dt-detail-list-item {
				height: 36px;
				width: 700px;
				line-height: 36px;
				position: relative;
				padding-left: 50px;
				margin-bottom: 15px;
				img {
					left: 0;
					top: 0;
					width: 36px;
					height: 36px;
					position: absolute;
					border-radius: 50%;
				}
				p {
					float: left;
					font-size: 14px;
					display: inline-block;
				}
				p:nth-of-type(1) {
					margin-right: 5px;
				}
				p:nth-of-type(2) {
					a {
						cursor: pointer;
						color: #44BCB7;
					}
				}
				p:nth-of-type(2) {
					float: right;
				}
			}
		}
		.pandect-canvas {
			width: 1050px;
			height: 320px;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			.pandect-canvas-left {
				width: 35%;
				margin-right: 5%;
			}
			.pandect-canvas-right {
				width: 60%;
				display: flex;
				display: -webkit-flex;
				justify-content: space-around;
				>div {
					width: 33.33%;
				}
			}
		}
		.bill-paging {
			text-align: center;
			margin: 50px 0;
			margin-left: -150px;
			margin-top: 20px;
		}
	}
	
	.pandect-nav-selected {
		color: #fff;
		background-color: #44BCB7;
	}
	
	.pandect-gy-counts {
		overflow: hidden;
		margin-bottom: 50px;
		width: 900px;
		.pandect-gy-counts-container {
			float: left;
			width: 170px;
			height: 48px;
			display: inline-block;
			font-size: 18px;
			text-align: center;
			>p {
				font-weight: bold;
				line-height: 16px;
				margin-top: 1px;
				margin-bottom: 2px;
				color: #44BCB7;
			}
			span {
				color: #333;
				font-size: 12px;
				line-height: 13px;
			}
		}
	}
</style>
<template>
	<div class="pandect-boss">
		<p>总览</p>
		<div class="pandect-nav">
			<!-- 概要 -->
			<div class="pandect-pandect" :class="selectedNav === 'gy' ? 'pandect-nav-selected' : ''" @click="onclickChangeNav('gy')">
				概要
			</div>
			<!-- 动态 -->
			<div :class="selectedNav === 'dt' ? 'pandect-nav-selected' : ''" @click="onclickChangeNav('dt')">
				动态
			</div>
		</div>
		<div class="pandect-gy-detail" v-show="selectedNav === 'gy'">
			<div class="pandect-service-member">
				<div class="pandect-service-member-title">
					服务组人员：
				</div>
				<div class="pandect-service-member-list">
					<p :class="tagList === 'all' ? 'pandect-nav-selected': ''" @click="onclickChangeTagList('all')">全部</p>
					<p v-for="(item, index) in serviceGroupMenber" :key="index" :class="tagList === item.name ? 'pandect-nav-selected': ''" @click="onclickChangeTagList(item.name, item.roleName, item.userId)">
						{{item.name}}({{item.roleName}})
					</p>
				</div>
			</div>
			<div class="pandect-gy-counts">
				<div class="pandect-gy-counts-container">
					<p style="color: #44BCB7;">{{titleObj.taskNum}}</p>
					<span>总任务</span>
				</div>
				<div class="pandect-gy-counts-container">
					<p style="color: #44BCB7;">{{titleObj.finishNum}}</p>
					<span>已完成</span>
				</div>
				<div class="pandect-gy-counts-container">
					<p style="color: #D9CA00;">{{titleObj.doingNum}}</p>
					<span>待完成</span>
				</div>
				<div class="pandect-gy-counts-container">
					<p style="color: #BC4444;">{{titleObj.overTimeNum}}</p>
					<span>已过期</span>
				</div>
				<div class="pandect-gy-counts-container">
					<p style="color: #CCCCCC;">{{titleObj.abortNum}}</p>
					<span>已放弃</span>
				</div>
			</div>
			<div class="pandect-canvas">
				<div class="pandect-canvas-left" id="pandect_main">
					<pie-item :chart0="option0" :requestEnd="requestEnd"></pie-item>
				</div>
				<div class="pandect-canvas-right">
					<div class="pandect-canvas-right-div">
						<pie-item type="radius" :chart1="chart1" :requestEnd="requestEnd"></pie-item>
					</div>
					<div class="pandect-canvas-right-div">
						<pie-item type="radius" :chart2="chart2" :requestEnd="requestEnd"></pie-item>
					</div>
					<div class="pandect-canvas-right-div">
						<pie-item type="radius" :chart3="chart3" :requestEnd="requestEnd"></pie-item>
					</div>
				</div>
			</div>
		</div>
		<!-- 动态 -->
		<div class="pandect-dt-detail" v-show="selectedNav === 'dt'">
			<div v-for="(item, index) in dtList" :key="index" class="pandect-dt-detail-list-item">
				<img :src="item.userPhoto" alt="">
				<!-- <img src="" alt=""> -->
				<p v-html="item.content" @click="onclickItems"></p>
				<p>[{{item.optTime}}]</p>
			</div>
			<Page v-if="pageCount > 10" show-sizer class="bill-paging" :total="pageCount" show-total show-elevator :page-size="10" :current="pageNo" @on-change="onclickChangePage" @on-page-size-change="onPageSizeChange"></Page>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import { mapMutations } from "vuex";
	import PieItem from '../../components/pieItem';
	import valid, {
		errors,
		plServiceGroup,
		plTask,
		STATISTICS,
		common,
	} from '../../libs/request';
	const color = ['#5a9cd3', '#85ca48', '#e8722b', '#adc2e6', '#fdb802', '#3967bc', '#9a9b9c', '#66a041', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
	export default {
		name: "Pandect",
		components: {
			PieItem,
		},
		data() {
			return {
				selectedNav: 'gy',
				tagList: 'all',
				pageCount: null,
				pageNo: 1,
				dtList: null,
				serviceGroupMenber: null,
				requestEnd: false,
				titleObj: {
					overTimeNum: 0,
					doingNum: 0,
					finishNum: 0,
					abortNum: 0,
					taskNum: 0,
				},
				option0: {
					title: {
						text: '规划任务模块分布',
						x: '15%',
						textStyle: {
							color: '#333',
							fontSize: 18
						}
					},
					color,
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)",
						// formatter: (params) => {
						// 	return `${params.seriesName}<br/>${params.name} : ${params.value} (${params.percent}%)`;
						// },
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						top: 40,
						left: '75%',
						itemWidth: 10,
						itemHeight: 10,
						formatter: '{name}',
						textStyle: {
							color: '#333'
						},
						data: [{
								name: "GPA",
								icon: 'rect'
							},
							{
								name: "标化",
								icon: 'rect'
							},
							{
								name: "竞赛",
								icon: 'rect'
							},
							{
								name: "活动",
								icon: 'rect'
							},
							{
								name: "选校/专业",
								icon: 'rect'
							},
							{
								name: "课外阅读",
								icon: 'rect'
							},
							{
								name: "综合素质",
								icon: 'rect'
							},
							{
								name: "科研发表",
								icon: 'rect'
							},
							{
								name: "查校/套磁",
								icon: 'rect'
							},
							{
								name: "其他",
								icon: 'rect'
							},
						],
					},
					series: [{
						name: '规划任务模块分布',
						type: 'pie',
						radius: '78%', //饼图的半径大小
						center: ['40%', '58%'], //饼图的位置 
						label: { //饼图图形上的文本标签
							normal: {
								show: true,
								position: 'inside', //标签的位置
								textStyle: {
									fontWeight: 300,
									fontSize: 12, //文字的字体大小
									color: '#333',
								},
								formatter: function(params) {
									return params.data.value;
								}
							}
						},
						data: [{
								name: "GPA",
								value: "0"
							},
							{
								name: "标化",
								value: "0"
							},
							{
								name: "竞赛",
								value: "0"
							},
							{
								name: "活动",
								value: "0"
							},
							{
								name: "选校/专业",
								value: "0"
							},
							{
								name: "课外阅读",
								value: "0"
							},
							{
								name: "综合素质",
								value: "0"
							},
							{
								name: "科研发表",
								value: "0"
							},
							{
								name: "查校/套磁",
								value: "0"
							},
							{
								name: "其他",
								value: "0"
							},
						],
					}, ],
				},
				option1: {
					title: {
						text: '人均任务过期率',
						left: 'center',
						top: 'top',
						subtext: '',
						itemGap: 125,
						subtextStyle: {
							color: '#333',
							fontSize: 16,
							fontWeight: 'bold',
						},
					},
					color: ['#A6A6A6', '#ED7D31'],
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {d}%"
					},
					legend: {
						orient: 'vertical',
						show: true,
						x: 'right',
						data: ['aa', 'bb'],
						color: '#333',
						data: [],
					},
					series: [{
						name: '人均任务过期率',
						type: 'pie',
						radius: ['65%', '85%'],
						label: {
							normal: {
								show: false,
								position: 'center', //标签的位置
								textStyle: {
									fontWeight: 600,
									fontSize: 16, //文字的字体大小
									color: '#333',
								},
								slient: true,
								formatter: function() {
									return `12%`;
								},
							}
						},
						data: [],
					}]
				},
				chart1: null,
				chart2: null,
				chart3: null,
			};
		},
		methods: {
			...mapMutations(["updateLoadingStatus"]),
			onclickChangeNav(msg) {
				this.selectedNav = msg;
			},
			/*
			 * 点击选择标签显示
			 */
			onclickChangeTagList(msg, roleName, userId) {
				this.tagList = msg;
				roleName = roleName ? roleName : '系统管理员';
				if(msg === 'all') {
					this.getViewDatas({
						id: this.$route.params.gid,
					});
				} else {
					this.getViewDatas({
						id: this.$route.params.gid,
						roleName,
						userId,
					});
				}
				this.requestEnd = new Date().getTime();
			},
			onclickItems(e) {
				if(e.path[0].type === 'file') {
					e.path[0].href = e.path[0].path;
				} else if(e.path[0].type === 'task') {
					this.$router.push({
						name: 'plan.taskReview',
						params: {
							gid: this.$route.params.gid,
						},
						query: {
							taskId: e.path[0].id,
						},
					});
				}
			},
			/*
			 * 获取可视化数据
			 */
			getViewDatas(data) {
				this.updateLoadingStatus({
					isLoading: true
				});
				STATISTICS.viewServiceGroupById(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.titleObj = res.data.data.data;
						if(res.data.data.pic.length) {
							this.option0.legend.data = [];
							this.option0.series[0].data = [];
							res.data.data.pic.forEach((item, index) => {
								this.option0.legend.data[index] = {
									name: item.tagName,
									icon: 'rect'
								};
								this.option0.series[0].data[index] = {
									name: item.tagName,
									value: item.taskNum,
								};
							});
						}
						// 环形图区域数据显示
						const userSum = res.data.data.ring.userNum;
						const userRing = res.data.data.ring;

						this.chart1.title.subtext = userRing.overTimeNum ? (userRing.overTimeNum / userSum * 100).toFixed(0) + '%' : '0%';
						this.chart2.title.subtext = userRing.abortNum ? (userRing.abortNum / userSum * 100).toFixed(0) + '%' : '0%';
						this.chart3.title.subtext = userRing.finishNum ? (userRing.finishNum / userSum * 100).toFixed(0) + '%' : '0%';

						this.chart1.series[0].data = [{
									value: (userRing.overtimeNum / userSum) || 0,
									name: '已过期任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
								{
									value: ((userRing.overtimeNum / userSum) == 0) ? 0 : (1 - (userRing.overtimeNum / userSum)),
									name: '未过期任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
							],
							this.chart2.series[0].data = [{
									value: (userRing.abortNum / userSum) || 0,
									name: '已放弃任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
								{
									value: ((userRing.abortNum / userSum) === 0) ? 0 : (1 - (userRing.abortNum / userSum)),
									name: '未放弃任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
							],
							this.chart3.series[0].data = [{
									value: (userRing.finishNum / userSum) || 0,
									name: '已完成任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
								{
									value: ((userRing.finishNum / userSum)) === 0 ? 0 : (1 - (userRing.finishNum / userSum)),
									name: '未完成任务',
									itemStyle: {
										normal: {
											borderColor: "#FFFFFF",
											borderWidth: 3,
										}
									},
								},
							],
							// 数据处理完毕
							this.requestEnd = true;
					}
				}).catch(errors.call(this))
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			/*
			 * 获取动态数据列表
			 */
			getDtList(data) {
				this.updateLoadingStatus({
					isLoading: true
				});
				common.plListEvent(data).then(valid.call(this)).then(res => {
					if(res.ok) {
						this.dtList = res.data.data.list;
						const defaultAvatar = require('../../../../spoc-portal/assets/img/public/avatar.png');
						this.dtList.forEach(item => {
							item.userPhoto = item.userPhoto ? item.userPhoto : defaultAvatar;
						});
						this.pageNo = res.data.data.pageNo;
						this.pageCount = res.data.data.count;
					}
				}).catch(errors.call(this));
				this.updateLoadingStatus({
					isLoading: false
				});
			},
			/*
			 * 切换分页
			 */
			onclickChangePage(index) {
				this.getDtList({
					serviceGroupId: this.$route.params.gid,
					pageNo: index,
				});
			},
			/*
			 * 切换显示条数
			 */
			onPageSizeChange(val) {
				this.getDtList({
					pageSize: val,
					pageNo: this.pageNo,
					serviceGroupId: this.$route.params.gid,
				});
			},
		},
		created() {
			// 深拷贝
			this.chart1 = JSON.parse(JSON.stringify(this.option1));
			this.chart2 = JSON.parse(JSON.stringify(this.option1));
			this.chart3 = JSON.parse(JSON.stringify(this.option1));
			// 单独赋值
			this.chart2.color = ['#A6A6A6', '#7F6000'];
			this.chart3.color = ['#12CB66', '#A6A6A6'];
			this.chart2.title.text = this.chart2.series[0].name = "人均任务放弃比";
			this.chart3.title.text = this.chart3.series[0].name = "人均任务完成率";
			/*
			 * 获取可视化数据
			 */
			this.getViewDatas({
				id: this.$route.params.gid,
			});
			/*
			 * 服务组人员
			 */
			common.listUser({
				serviceGroupId: this.$route.params.gid,
			}).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.serviceGroupMenber = res.data.data.members;
				}
			});
			/*
			 * 动态列表
			 */
			this.getDtList({
				serviceGroupId: this.$route.params.gid,
			});
		},
	};
</script>