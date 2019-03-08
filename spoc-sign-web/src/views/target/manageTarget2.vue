<style lang="less">
	.mangageGsx {
		font-size: 14px;
		.yearIview {
			margin: 12px 0 18px;
			line-height: 33px;
			color: #b8b8b8;
			font-size: 12px;
		}
		.content {
			color: #44bcb7;
		}
		.page-box {
			text-align: center;
			margin-top: 10px;
		}
		.titleBar {
			font-size: 12px;
			.bar {
				margin-top: 10px;
			}
			span {
				display: inline-block;
				padding: 4px 10px;
				cursor: pointer;
			}
			.active {
				background-color: #44bcb7;
				color: white;
			}
			span:first-of-type {
				padding: 4px 0;
				color: #b8b8b8;
				cursor: auto;
			}
			b {
				font-size: 18px;
				font-weight: normal;
				color: red;
				margin: 0 3px;
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
	
	.yearIview {
		.ivu-select-selection {
			height: 26px;
			.ivu-select-selected-value {
				height: 26px;
				line-height: 26px;
			}
		}
	}
</style>
<template>
	<div class="mangageGsx">
		<div class="yearIview">年份：
			<Select v-model="currentYear" @on-change="getControlledSellList('month')" style="width:176px">
				<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</div>
		<div class="titleBar" :name="isDisable">
			<span>月份：</span>
			<span v-for="(item, index) in data" :key="index" :class="{active:index==num}" @click="addClass(index)">{{item}}</span>
			<p class="bar">{{currentYear}}年<span style="color:#000" v-if="num>0">{{currentMonth}}月</span>销售总目标：<b>{{allTargetPrice}}</b>万元</p>
		</div>
		<Btnlists title="销售目标-菜单" :btnList="btninfo"></Btnlists>
		<Modal v-model="modal2" title="分公司销售目标详情" @on-ok="ok" width="738" @on-cancel="cancel">
			<div style="font-size:14px;line-height:25px">
				<p v-if="modal2"><span style="color:#a8a8a8;margin-right:18px">当前分公司</span>{{data6[index].objectName}}</p>
				<p><span style="color:#a8a8a8;margin-right:18px">　目标范围</span>{{targetYear}}</p>
				<p><span style="color:#a8a8a8;margin-right:18px">　　　时间</span>{{currentYear}}年<span v-show="currentMonth>0">{{currentMonth}}月</span></p>
				<p style="margin-bottom:10px;"><span style="color:#a8a8a8;margin-right:18px">　销售目标</span>{{currentSaleTarget}} 万元</p>
				<Table height="300" size="large" border :columns="columns1" :data="data1"></Table>
			</div>
		</Modal>
		<Modal v-model="modal3" :title="dialogTittle" width="738" @on-ok="confirmSellTarget(allShow)" @on-cancel="cancel">
			<div style="font-size:14px;">
				<p style="line-height:45px;">
					<span style="width:150px;display:inline-block;;text-align:right;margin-right:10px;color:#a8a8a8">　目标范围</span>
					<RadioGroup @on-change="check()" v-model="targetYear">
						<Radio label="年度目标"></Radio>
						<Radio label="月度目标"></Radio>
					</RadioGroup>
				</p>
				<p style="line-height:45px;"><span style="width:150px;display:inline-block;;text-align:right;margin-right:10px;color:#a8a8a8">　时间范围</span>
					<Select v-model="currentYear" style="width:200px">
						<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<Select @on-change="getControlledSellList('month')" v-model="currentMonth" style="width:118px;height:33px;" v-if="state">
						<Option v-for="(item,index) in month" :value="(index+1)" :key="item">{{item}}</Option>
					</Select>
				</p>
				<p>
					<span style="color:#a8a8a8;display:inline-block;width:150px;margin-right:10px;vertical-align:middle;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:right">销售总目标</span>
					<Input v-model="allTargetPrice1" :min="1" style="height:33px;width:198px;"></Input> 万元
				</p>
				<p style="line-height:45px;" v-for="(item, index) in list" :key="index">
					<span style="color:#a8a8a8;display:inline-block;width:150px;margin-right:10px;vertical-align:middle;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;text-align:right">{{item.objectName}}</span>
					<Input :disabled="isDisable" v-model="item.objectMillionValue" :min="1" style="height:33px;width:198px;"></Input> 万元
				</p>
			</div>
		</Modal>
		<Modal v-model="model4" title='提示' width="738" @on-ok="confirmSellTarget1(allShow)" @on-cancel="cancel1">
			<div style="font-size:14px;line-height:25px;text-align:center">
				<p style="margin-bottom:10px;">当前销售目标总和为<b> {{newAllprice}} </b>万元,<span v-if="isSurpass">大于</span><span v-else>小于</span>您填写的销售总目标<b> {{allTargetPrice1}} </b>万元,确定保存下达结果?</p>
				<span style="color:#b8b8b8">提示: 保存后的销售目标为<b> {{newAllprice}} </b>万元</span>
			</div>
		</Modal>
		<div class="cancleBorder">
			<Table style="margin-bottom:140px" :columns="columns7" :data="data6"></Table>
		</div>
	</div>
</template>
<script>
	import Btnlists from '@public/modules/btnlist';
	import valid, {
		errors,
		SELLTARGET
	} from "../../libs/request";
	export default {
		data() {
			return {
				tempMonth: '',
				tempYear: '',
				currentYear: "",
				currentMonth: "",
				objectId: "",
				objectMillionValue: "",
				currentSaleTarget: '',
				allShow: "",
				allIndex: '',
				allTargetPrice: "",
				allTargetPrice1: '',
				newAllprice: '',
				dialogTittle: '下达销售目标',
				period: '',
				num: 1,
				index: 1,
				modal1: false,
				modal2: false,
				modal3: false,
				model4: false,
				state: true,
				targetYear: "月度目标",
				list: [],
				targetList: [],
				data1: [],
				data6: [],
				btns: [{
					class: "bt3",
					text: "下达目标",
					btnClick: this.allTarget
				}],
				btninfo: [{
					text: '下达目标',
					type: 'primary',
					event: this.allTarget,
				}, ],
				data: [
					"全部",
					"1月",
					"2月",
					"3月",
					"4月",
					"5月",
					"6月",
					"7月",
					"8月",
					"9月",
					"10月",
					"11月",
					"12月"
				],
				month: [
					"1月",
					"2月",
					"3月",
					"4月",
					"5月",
					"6月",
					"7月",
					"8月",
					"9月",
					"10月",
					"11月",
					"12月"
				],
				columns1: [{
						title: "序号",
						type: "index",
						width: 65,
						align: "center"
					},
					{
						title: "操作人",
						key: "optUesr",
						width: 140,
						align: "center"
					},
					{
						title: "操作",
						key: "optContent",
						align: "center"
					},
					{
						title: "时间",
						key: "optTime",
						width: 117,
						align: "center"
					}
				],
				yearList: [

				],
				columns7: [{
						title: "分公司",
						key: "objectName",
						align: "center",
						render: (h, params) => {
							return h('a', {
								on: {
									click:()=>{
										this.$emit('jump', params.row.objectId)
									}
								},
							}, params.row.objectName.indexOf(' ') == -1 ? params.row.objectName : params.row.objectName.substr(0, params.row.objectName.indexOf(' ')))
						}
					},
					{
						title: "目标销售额(万元)",
						key: "objectMillionValue",
						align: "center"
					},
					{
						title: "操作",
						align: "center",
						render: (h, params) => {
							return h("div", [
								h(
									"a", {
										style: {
											display: ((this.currentMonth >= this.tempMonth || this.currentMonth == 0) && (this.currentYear >= this.tempYear) || (this.currentYear > this.tempYear)) ? 'inline-block' : 'none',
											marginRight: "34px"
										},
										on: {
											click: () => {
												this.allTarget(params.index);
											}
										}
									},
									"调整目标销售额"
								),
								h(
									"a", {
										on: {
											click: () => {
												this.detail(params.index);
											}
										}
									},
									"查看详情"
								)
							]);
						}
					}
				],
			};
		},
		components: {
			Btnlists,
		},

		computed: {
			isDisable() {
				let data = null;
				data = ((this.currentMonth >= this.tempMonth || this.currentMonth == 0) && (this.currentYear >= this.tempYear) || (this.currentYear > this.tempYear)) ? false : true;
				this.$set(this.btninfo[0], 'visible', !data);
				return data;
			},

			isSurpass() {
				if(this.newAllprice > this.allTargetPrice1) return true
				return false
			}
		},

		mounted() {
			this.getYearList()
			this.getControlledSellList("first");
		},

		methods: {
			getYearList() {
				SELLTARGET.getTimeList()
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.yearList = res.data.data
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			getControlledSellList(type = {}) {
				let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth

				if(type == "month") {
					this.num = this.currentMonth
					this.period = 'month'
				}

				let obj = {
					timeScope: (this.period == 'month') ? `${this.currentYear}-${mon}` : this.currentYear,
					period: this.period
				}

				if(!this.state || this.currentMonth == 0) {
					obj = {
						timeScope: this.currentYear,
						period: 'year'
					};
				}

				if(type == "first") {
					obj = {};
				}

				SELLTARGET.controlledSellList(obj)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							let data = res.data.data
							this.data6 = data.childSellObjectList
							this.allTargetPrice1 = this.allTargetPrice = data.objectMillionValue;
							if(type == "first") {
								this.tempYear = this.currentYear = data.timeScope.match(/\d+/g)[0];
								this.num = this.tempMonth = this.currentMonth = Number(data.timeScope.match(/\d+/g)[1]);
								this.addClass(this.num)
							} else {
								this.updateList()
							}
						}

					})
					.catch(errors.call(this))
					.finally(() => {});
			},
			updateList() {
				if(this.allIndex == '') return

				if(this.allIndex + 1) {
					if(this.allIndex == "all") {
						this.list = this.data6
					} else {
						this.list = [{
							objectName: this.data6[this.allIndex].objectName,
							objectMillionValue: this.data6[this.allIndex].objectMillionValue
						}]
					}
				}
			},

			check() {
				this.state = !this.state;
				if(!this.state) {
					this.num = 0
				} else {
					this.num = this.currentMonth
					this.getControlledSellList('month');
					return
				}

				this.getControlledSellList();
			},

			confirmSellTarget() {
				if(!this.allShow) {
					this.confirmSellTarget1()
					return
				}
				this.newAllprice = this.list.reduce((prev, curr) => {
					return prev + curr.objectMillionValue / 1
				}, 0)

				if(this.newAllprice != this.allTargetPrice1) {
					this.model4 = true;
				} else {
					this.confirmSellTarget1('aa')
				}
			},

			confirmSellTarget1(temp) {
				if(temp) {
					this.getControlledSellList();
					this.getUpSellTarget()
					return;
				}
				this.getSaveSellTarget();
			},

			getSaveSellTarget() {
				let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth
				let obj = {
					objectId: this.objectId,
					period: !this.state ? 'year' : 'month',
					objectType: "office",
					timeScope: !this.state ? this.currentYear : `${this.currentYear}-${mon}`,
					objectMillionValue: this.list[0].objectMillionValue
				};

				SELLTARGET.saveControlledSellTarget(obj)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.data6[this.index].objectMillionValue
							this.getControlledSellList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			getUpSellTarget() {
				let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth
				let obj = {
					childSellObjectList: this.data6,
					objectId: "5",
					period: !this.state ? 'year' : 'month',
					objectType: "office",
					timeScope: !this.state ? this.currentYear : `${this.currentYear}-${mon}`,
					objectMillionValue: "888"
				};
				SELLTARGET.upControlledSellTarget(obj)
					.then(valid.call(this))
					.then(res => {
						if(res.ok) {
							this.$Message.info("修改完成");
							this.getControlledSellList()
						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			ok() {
				this.allIndex = ''
			},

			cancel() {
				this.allIndex = ''
				this.getControlledSellList()
			},

			cancel1() {
				this.modal3 = true;
			},

			allTarget(index = "all") {
				this.allTargetPrice1 = this.allTargetPrice
				if(index == "all") {
					this.allIndex = "all"
					this.list = this.data6;
					this.allShow = true;
					this.dialogTittle = '下达销售目标'
				} else {
					this.dialogTittle = '调整销售目标'
					this.allShow = false;
					this.allIndex = index
					this.index = index;
					this.objectId = this.data6[index].objectId;
					this.list = [{
						objectName: this.data6[index].objectName,
						objectMillionValue: this.data6[index].objectMillionValue
					}];
				}
				this.modal3 = true;
			},

			show() {
				this.modal3 = true;
			},

			detail(index) {
				this.index = index;
				this.currentSaleTarget = this.data6[index].objectMillionValue
				let formId = this.data6[index].id;
				if(!formId) {
					this.$Message.info("没有操作记录")
					return
				}
				this.modal2 = true;
				this.getControlledOfficeForm(formId);
			},

			getControlledOfficeForm(formId) {
				SELLTARGET.controlledOfficeForm({
						id: formId
					})
					.then(valid.call(this))
					.then(res => {
						this.data1 = res.data.data.htSellObjectLogList
						if(res.ok) {

						}
					})
					.catch(errors.call(this))
					.finally(() => {});
			},

			addClass(index) {
				this.num = index;
				if(index == 0) {
					this.currentMonth = 0;
					this.targetYear = "年度目标"
					this.state = false
					this.period = "year"
					//this.getControlledSellList("year");
					//return;
				} else {
					this.state = true
					this.period = "month"
					this.targetYear = "月度目标"
				}
				this.currentMonth = index
				this.getControlledSellList();
			}
		}
	};
</script>