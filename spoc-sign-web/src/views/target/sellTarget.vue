<style lang="less">
	.sellTarget {
		font-size: 14px;
		.yearIview {
			margin: 12px 0 18px;
			line-height: 33px;
			font-size: 12px;
			color: #b8b8b8;
		}
		.content {
			color: #44bcb7;
		}
		.page-box {
			text-align: center;
			margin-top: 20px;
		}
		.titleBar {
			font-size: 12px;
				p {
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
  	<div class="sellTarget">
	  	<div class="nav">
      		<v-select 
			style="width: 396px;margin: 15px 0;"
			placeholder="输入顾问姓名"
			:datafunc="datafunc"
			icon="search" 
			v-model="compact"
			k='cnname'
			@on-enter="textChange" 
			@on-click="textChange" 
			@selected="textChange">
		  </v-select>
    	</div>
		<div class="yearIview">年份：
			<Select v-model="currentYear" @on-change="getSellTargetList" style="width:176px">
				<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
		</div>
		<div class="titleBar">
			<span>月份：</span>
			<span v-for="(item, index) in data" :key="index" :class="{active:index==num}" @click="addClass(index)" >{{item}}</span>
			<p>{{currentYear}}年<span style="color:#000" v-if="currentMonth>0">{{currentMonth}}月</span>销售总目标：<b>{{allTargetPrice}}</b>万元</p>
		</div>
        <v-title title="销售目标-菜单">
        <v-btn-options
		v-if='!isDisable'
        slot="right"
        :btns="btns"
		>
		</v-btn-options>
        </v-title>
		<!-- <Btnlists title="销售目标-菜单" :btnList="btnInfos"></Btnlists> -->
        <Modal
            v-model="modal2"
            title="分公司销售目标详情"
            @on-ok="ok"
            width="738"
            @on-cancel="cancel">
           <div style="font-size:14px;line-height:25px">
            <p><span style="color:#a8a8a8;margin-right:18px">当前分公司</span>{{currentControlled}}</p>
            <p><span style="color:#a8a8a8;margin-right:18px">　目标范围</span>{{targetYear}}</p>
			<p><span style="color:#a8a8a8;margin-right:18px">　　　时间</span>{{currentYear}}年<span v-show="currentMonth>0">{{currentMonth}}月</span></p>
            <p style="margin-bottom:10px;"><span style="color:#a8a8a8;margin-right:18px">　销售目标</span>{{currentSaleTarget}} 万元</p>
            <Table height='300' size="large" border :columns="columns1" :data="data1"></Table>
           </div>
        </Modal>
        <Modal
        v-model="modal3"
        :title="dialogTittle"
        width="738"
        >
          	<div style="font-size:14px;">
				<p style="line-height:45px;">
					<span style="margin-right:14px;color:#a8a8a8">　目标范围</span>
					<RadioGroup @on-change="check()" v-model="targetYear">
						<Radio  label="年度目标"></Radio>
						<Radio  label="月度目标"></Radio>
					</RadioGroup>
				</p>
            	<p style="line-height:45px;">
					<span style="margin-right:14px;color:#a8a8a8">　时间范围</span>
					<Select v-model="currentYear" style="width:200px">
						<Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<Select @on-change="getSellTargetList('month')" v-model="currentMonth" style="width:118px;height:33px;" v-if="state">
						<Option v-for="(item,index) in month" :value="(index+1)" :key="item">{{item}}</Option>
					</Select>
           		 </p>
				<p>
					<span style="color:#a8a8a8;display:inline-block;width:75px;margin-right: 10px;text-align:right">销售总目标</span>
					<Input v-model="allTargetPrice1":min="1"  :disabled='!groupPrice' style="height:33px;width:198px;"></Input> 万元
					<span style="color:#a8a8a8;margin-left:30px">集团下达的销售总目标 {{groupPrice == '' ? 0 : groupPrice}} 万元</span>
				</p>
				<div class="saleman" style="max-height: 225px;overflow:auto">
					<p style="line-height:45px;display:inline-block" v-for="(item, index) in list" :key="index">
					<span style="color:#a8a8a8;display:inline-block;width:75px;margin-right: 10px;text-align:right">{{item.objectName}}</span>
					<Input :disabled="isDisable||!groupPrice" @on-keydown="keydownEvent(index)" :ref="index" v-model="item.objectMillionValue":min="1" style="height:33px;width:198px;"></Input> 万元 
					</p>
				</div>
           	</div>
			<div slot="footer">
				<span v-if='!groupPrice' style='margin-right:142px'>提示：当前时间范围，集团未下达销售总目标，暂不能设置销售顾问的个人目标</span>
                <Button @click="cancel5">取消</Button>
                <Button type="primary" :disabled='!groupPrice' @click="confirmSellTarget">确定</Button>
            </div>
        </Modal>
		<Modal
           	v-model="model4"
			title='提示'
			width="738"
			@on-ok="confirmSellTarget1(allShow)"
			@on-cancel="cancel1">
           <div style="font-size:14px;line-height:25px;text-align:center">
            <p style="margin-bottom:10px;">当前销售目标总和为<b> {{newAllprice}} </b>万元,<span v-if="isSurpass">大于</span><span v-else>小于</span>您填写的销售总目标<b> {{allTargetPrice1}} </b>万元,确定保存下达结果?</p>
			<span style="color:#b8b8b8">提示: 保存后的销售目标为<b> {{newAllprice}} </b>万元</span>
           </div>
        </Modal>
		<div class="cancleBorder">
        	<Table  size="large" :columns="columns7" :data="data6"></Table>
		</div>
		<div class="page-box" v-show="count>10">
			<div style="margin: auto;display: inline-block;">
				<Page style="margin-bottom:150px" :total="count" :current="pageNo" show-total :show-sizer="count>10" :page-size="pageSize" show-elevator @on-change="pageChange" @on-page-size-change="sizeChange"></Page>
			</div>
		</div>
 	</div>
</template>
<script>
import vTitle from "@public/modules/vTitle";
import vBtnOptions from "../../modules/vBtnOptions";
import Btnlists from '@public/modules/btnlist';
import valid, { errors, SELLTARGET } from "../../libs/request";
import vSelect from "../../modules/vSelect.vue"; 	
export default {
	props: {
		compId: {
			type: String,
			default: ''
		}
	},
  	data() {
		return {
			groupPrice: '',
			compact: "",
			currentControlled: '',
			currentYear: "",
			tempMonth: '',
			tempYear: '',
			currentMonth: "",
			objectId: "",
			objectMillionValue: "",
			currentSaleTarget: "",
			allTargetPrice: '',
			allTargetPrice1: '',
			newAllprice: '',
			allShow: false,
			count: 0,
			controlledId: "",
			allIndex: "",
			dialogTittle: '下达销售目标',
			num: 1,
			pageNo: 1,
			pageSize: 10,
			index: 1,
			modal1: false,
			modal2: false,
			modal3: false,
			model4: false,
			state: true,
			targetYear: "月度目标",
			allSaleman: [],
			list: [],
			data1: [],
			data6: [],
			btns: [{ class: "bt3", text: "下达目标", btnClick: this.allTarget }],
			// btnInfos: [
			// 	{
			// 		text: '下达目标',
			// 		event: this.allTarget,
			// 	},
			// ],
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
			columns1: [
				{
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
				{
				value: "2019",
				label: "2019"
				},
				{
				value: "2018",
				label: "2018"
				},
				{
				value: "2017",
				label: "2017"
				},
				{
				value: "2016",
				label: "2016"
				}
			],
			columns7: [
				{
				title: "销售顾问",
				key: "objectName",
				align: "center"
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
						"a",
						{
						style: {
							display: !this.isDisable ? 'inline-block' : 'none',
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
						"a",
						{
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
		vTitle,
		vBtnOptions,
		Btnlists,
		vSelect
	},

	computed: {
		isDisable() {
			return ((this.currentMonth >= this.tempMonth || this.currentMonth == 0) && (this.currentYear >= this.tempYear) || (this.currentYear > this.tempYear)) ? false : true
		},

		isSurpass() {
			if(this.newAllprice > this.allTargetPrice1) return true
			return false
		}
	},

	mounted() {
		this.getYearList()
	},

 	methods: {
		getYearList() {
			this.tempYear = this.currentYear = new Date().getFullYear()+'';
			this.num = this.tempMonth = this.currentMonth = new Date().getMonth()+1;
			this.addClass(this.num, 'a')
			SELLTARGET.getTimeList()
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
					this.yearList = res.data.data
					this.getSellTargetList("first");
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
		},
		textChange() {
			this.getSellTargetList()
		},

		getSellTargetList(type = {}) {
			let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth			
			let obj = {
				timeScope: `${this.currentYear}-${mon}`,
				period: "month",
				objectName: this.compact,
			};
			if (type == "month") {
				this.num = this.currentMonth
			}
			
			if (type == "year") {
				obj = {
				timeScope: this.currentYear,
				period: "year"
				};
			}
			
			if (!this.state || this.currentMonth == 0) {
				obj = {
					timeScope: this.currentYear,
					period: "year"
				};
			}
			
			let objectContant = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				companyId: this.compId,
			};

			let objectAll = Object.assign(obj, objectContant);
			// if (type == "first") {
			// 	objectAll = {};
			// }
			
			SELLTARGET.sellTargetList(objectAll)
			.then(valid.call(this))
			.then(res => {
			if (res.ok) {
				let data = res.data.data
				this.currentControlled = data.attach.objectName
				this.data6 = data.list;
				this.allTargetPrice1 = this.allTargetPrice = data.attach.realObjectMillionValue;
				this.groupPrice = data.attach.objectMillionValue
				this.count = data.count;
				this.controlledId = data.attach.objectId;
				if (type == "first") {
					
				} else {
					this.updateList();
				}
			}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		allSalePeople(temp) {
			let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth			
			let obj = {
				pageNo: 1,
				pageSize: 10000,
				period: !this.state ? "year" : "month",
				timeScope: !this.state? this.currentYear : `${this.currentYear}-${mon}`
			}
			SELLTARGET.sellTargetList(obj)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.allSaleman = res.data.data.list;
					if(temp) {
						this.allIndex = "all";
						this.list = this.allSaleman;
						this.allShow = true;
						this.modal3 = true
					}
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},

		updateList() {
			if (this.allIndex == "") return;
				this.allSalePeople(false)
			if (this.allIndex + 1) {
				if (this.allIndex == "all") {
					this.list = this.allSaleman;
				} else {
					// this.list = [
						// {
						// 	objectName: this.allSaleman[this.allIndex].objectName,
						// 	objectMillionValue: this.allSaleman[this.allIndex].objectMillionValue
						// }
					// ];
				}
			}
		},
		
		check() {
			this.state = !this.state;
			if (!this.state) {
				this.num = 0;
			} else {
				this.num = this.currentMonth
			}

			this.getSellTargetList();
		},

		confirmSellTarget() {
			this.modal3 = false
			if(!this.allShow) {
				this.confirmSellTarget1()
				return
			}
			this.newAllprice = this.list.reduce((prev, curr) => {
				return prev + curr.objectMillionValue/1
			}, 0)

			if(this.newAllprice != this.allTargetPrice1) {
				this.model4 = true;
			}else {
				this.confirmSellTarget1('aa')
			}
		},

		confirmSellTarget1(temp) {
			if(temp) {
				this.getUpSellTargetList();
				this.getSellTargetList()
				return;
			}
			this.getSaveSellTarget();
		},

		getSaveSellTarget() {
			let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth			
			let obj = {
				objectId: this.objectId,
				period: !this.state ? "year" : "month",
				timeScope: !this.state ? this.currentYear : `${this.currentYear}-${mon}`,
				objectType: "sales consultant",
				objectMillionValue: this.list[0].objectMillionValue
			}
			SELLTARGET.saveSellTarget(obj)
			.then(valid.call(this))
			.then(res => {
			if (res.ok) {
				this.data6[this.index].objectMillionValue = this.list[0].objectMillionValue;
				this.getSellTargetList()
			}
			})
			.catch(errors.call(this))
			.finally(() => {});
			},
		
		getUpSellTargetList() {
			let mon = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth
			let obj = {
				childSellObjectList: this.allSaleman,
				objectId: this.controlledId,
				period: !this.state ? "year" : "month",
				objectType: "sales consultant",
				timeScope: !this.state ? this.currentYear : `${this.currentYear}-${mon}`,
				objectMillionValue: "8989"
			};

			SELLTARGET.upSellTargetList(obj)
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					this.$Message.info("修改完成");
					this.getSellTargetList()
				}
			})
			.catch(errors.call(this))
			.finally(() => {});
		},
		
		ok() {
			this.allIndex = "";
		},
		
		cancel() {
			this.allIndex = "";
		},

		cancel1() {
			this.modal3 = true;
		},

		cancel5() {
			this.modal3 = false;
		},
		
		allTarget(index = "all") {
			this.allTargetPrice1 = this.allTargetPrice
			if(index == "all") {
				this.dialogTittle = '下达销售目标'
				this.allSalePeople(true)
			}else {
				this.allShow = false;				
				this.dialogTittle = '调整销售目标'				
				this.allIndex = index;
				this.index = index;
				this.objectId = this.data6[index].objectId;
				this.list = [
					{
						objectName: this.data6[index].objectName,
						objectMillionValue: this.data6[index].objectMillionValue
					}
				];
			}
			this.modal3 = true;
		},
		
		keydownEvent(index) {
			let saleman = document.querySelector('.saleman')
			let input = saleman.querySelectorAll('input')
			let e = window.event
            switch (e.keyCode) {
                case 37 :  input[index-1].focus() ; break;
                case 38 :  input[index-2].focus() ; break;
                case 39 :  input[index+1].focus() ; break;
                case 40 :  input[index+2].focus() ; break;
            }
		},

		show() {
			this.modal3 = true;
		},
		
		detail(index) {
			this.index = index;
			this.currentSaleTarget = this.data6[index].objectMillionValue;
			let formId = this.data6[index].id;
			if(!formId) {
				this.$Message.info("没有操作记录")
				return
			}
			this.modal2 = true;
			this.getControlledOfficeForm(formId);
		},
		
		getControlledOfficeForm(formId) {
		SELLTARGET.sellTargetSaleForm({
			id: formId
		})
		.then(valid.call(this))
		.then(res => {
			if (res.ok) {
			this.data1 = res.data.data.htSellObjectLogList;
		}
		})
		.catch(errors.call(this))
		.finally(() => {});
		},
		
		addClass(index, a={}) {
			this.num = index;
			this.state = true;
			if (index == 0) {
				this.currentMonth = 0;
				this.targetYear = "年度目标";
				this.state = false;
				this.getSellTargetList("year");
				return;
			}
			this.currentMonth = index
			if(a === 'a') {
				return;
			}
			this.getSellTargetList();
		},
		
		sizeChange(val) {
			this.pageSize = val;
			this.getSellTargetList();
		},
		
		pageChange(val) {
			this.pageNo = val;
			this.getSellTargetList();
		},

		datafunc() {
			return new Promise((resole, reject) => {

			})
		}
  	}
};
</script>

