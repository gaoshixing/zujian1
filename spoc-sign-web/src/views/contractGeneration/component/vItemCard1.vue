<style lang="less">
	.sign_contract_generation_item_card {
		.content {
			position: relative;
			border: solid 1px #e0e0e0;
			border-radius: 5px;
			box-shadow: 0 0 14.3px 0.8px rgba(4, 0, 0, 0.2);
			padding: 30px 20px;
			margin-bottom: 27px;
			.title {
				font-size: 18px;
				padding-bottom: 17px;
				/*box-shadow: 0 2px 0px 0px #dddee1;*/
				border-bottom: 1px #dddee1 solid;
				.btnCol {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				.tooltip {
					display: inline-block;
					.tooltip_content {
						div:nth-of-type(1) {
							color: #f7ab01;
						}
					}
				}
				.ivu-tooltip-inner {
					white-space: normal;
				}
				.icon-info {
					color: #f7ab01;
				}
				.close {
					position: absolute;
					right: 14px;
					top: 2px;
					font-size: 26px;
					color: #888;
					cursor: pointer;
					&:hover {
						color: #111;
					}
				}
			}
			.bagBox {
				max-height: 600px;
				min-height: 266px;
				padding: 0 20px;
				overflow-y: auto;
			}
			.sale {
				.tags_box {
					width: 262px;
					min-height: 32px;
					padding: 0px 7px;
					font-size: 12px;
					border: 1px solid #dddee1;
					border-radius: 4px;
					cursor: pointer;
					.Row {
						.ivu-dropdown .ivu-select-dropdown {
							width: 259px;
							left: -242px !important;
							max-height: 157px;
							overflow-y: auto;
						}
						.arrow {}
					}
				}
				.tags_box2{
					width: 262px;
					min-height: 32px;
					padding: 0px 7px;
					font-size: 12px;
					border: 1px solid #dddee1;
					border-radius: 4px;
					cursor: pointer;
					background: #f3f3f3;
				}
				.ivu-tag {
					background: #44bcb7;
					.ivu-tag-text,
					.ivu-icon-ios-close-empty {
						color: #FFFFFF;
					}
				}
			}
			.packsBox {
				border: 1px #dddee1 solid;
				margin: 14px 0;
				padding: 24px 14px 0 0;
				.btnCol {
					text-align: right;
					display: flex;
					justify-content: flex-end;
					align-items: flex-start;
					span {
						cursor: pointer;
					}
				}
			}
			.preferentialBox {
				border-top: 1px #dddee1 solid;
				padding-top: 24px;
				z-index: 10;
			}
		}
	}
</style>
<template>
	<div class="sign_contract_generation_item_card" :class="{other:data.id==12}">
		<div class="content" v-if="data.policyData">
			<div class="title">
				<Row type="flex">
					<Col span="20" class="btnCol">
					<span>{{data.name}}</span>
					<Tooltip class="tooltip" placement="top" style="margin:0 16px;">
						<Icon class="icon-info" type="information-circled"></Icon>
						<div class="tooltip_content" slot="content">
							<div>温馨提示：</div>
							<div v-for="(item,index) in data.htItemList" :key="index">{{item.name?`${item.name}：`:''}} {{item.productDesc}}；</div>
						</div>
					</Tooltip>
					<Button type="ghost" @click="addBag" v-if="data.id==9">添加课程包</Button>
					<Button type="ghost" @click="groupBag" v-if="data.id==9" style="margin-left: 16px;">添加组合课程包</Button>
					</Col>
					<Col span="4" class="btnCol">
					<!--<Button type="ghost" @click="addBag">添加课程包</Button>
					<Button type="ghost" @click="groupBag" style="margin-left: 16px;">添加组合课程包</Button>-->
					</Col>
				</Row>
				<!--<span class="close" @click="close">
					<Icon type="android-close"></Icon>
				</span>-->
			</div>
			<div class="bagBox">
				<Form :label-width="100" :rules="rules" :model="data.policyData" ref="f">
					<div v-if="data.id==9">
						<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
							<Row type="flex">
								<Col span="8">
								<FormItem label="选择课程包：" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: '课程包不能为空', trigger: 'change'}">
									<Select v-model="items.itemId" :disabled="!!items.parentItemId" @on-change="itemIdChange(items)">
										<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
									</Select>
								</FormItem>
								</Col>
								<Col span="4" offset="12" class="btnCol">
								<!--<Button type="primary" @click="groupBag" v-if="data.policyData.list.length==index+1">组合课程包</Button>
								<Button type="primary" @click="addBag" style="margin-left: 16px;" v-if="data.policyData.list.length==index+1">添加课程包</Button>-->
								<Button type="ghost" @click="remGroupBag(items.parentItemId)" v-show="data.policyData.list.length>1" v-if="items.parentItemId">删除组合课程包</Button>
								<Button type="ghost" @click="remBag(index)" v-show="data.policyData.list.length>1" v-else>删除课程包</Button>
								<!--<span style="margin-left: 16px;"><Icon type="ios-trash-outline" size="24"></Icon></span>-->
								</Col>
							</Row>
							<Row type="flex">
								<Col span="8">
								<FormItem label="课时数：">
									<div v-if="items.itemId">
										<Input :disabled="!!items.parentItemId" v-model="items.giftCount" @on-change="numChange(items,$event)" style="width:262px;"></Input>
									</div>
									<div v-else>
										<Input style="width:262px;"></Input>
									</div>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem label="单价：">
									<!--<Select disabled v-model="items.itemId" style="width:262px;">
										<Option v-for="item in data.htItemList" :value="item.id" :key="item.id" v-if="item.htItemSubList.length">{{item.htItemSubList[0].costPrice}}</Option>
									</Select>&emsp;元-->
									<div v-if="items.itemId">
										<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSubList[0].costPrice" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">元</span></Input>
									</div>
									<div v-else>
										<Input disabled style="width:262px;"><span slot="append">元</span></Input>
									</div>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem label="定价：">
									<Input v-model="items.publicPrice" disabled style="width:262px;"><span slot="append">元</span></Input>
								</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="8">
								<FormItem label="实收金额：" :prop="'list.'+index+'.discountsPaidUp'" :rules="[{required: true, message: '实际价格不能为空', trigger: 'blur'},{required: true,pattern: /(^-?[1-9](\d+)?(\.\d+)?$)|(^-?0$)|(^-?\d\.\d+$)/,message: '请填写数字',trigger: 'change'}]">
									<Input :value="String(Number(items.costPrice).toFixed(2))" disabled style="width:262px;" @on-change="costPriceChange(items,$event)"><span slot="append">元</span></Input>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem label="请假次数：">
									<Input v-model="items.leaveNum" style="width:262px;"><span slot="append">次</span></Input>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem label="优惠分摊：">
									<Input :value="String(Number(items.publicPrice-items.costPrice).toFixed(2))" disabled style="width:262px;"><span slot="append">元</span></Input>
								</FormItem>
								</Col>
							</Row>
							<Row type="flex">
								<Col span="8">
								<FormItem label="折扣优惠：" class="sale">
									<div class="tags_box" @click="tags_boxShow(items,index)"  v-if="!items.parentItemId">
										<Row type="flex" class="Row" align="middle">
											<Col span="23">
											<Tag v-for="(item,index) in items.typeList" :key="index" closable @on-close="closeTag(items.policyIds,item.id,index,items)">{{item.name}}</Tag>
											</Col>
											<Col span="1">
											<Dropdown class="pulldown" trigger="custom" :visible="items.visible" placement="bottom-end" @on-click="policyChange(items.policyIds,items,$event)">
												<a href="javascript:void(0)" @click.stop="tags_boxShow(items,index)" class="arrow">
													<Icon type="arrow-down-b" v-show="!items.visible" color="#80848f" size="14"></Icon>
													<Icon type="arrow-up-b" v-show="items.visible" color="#80848f" size="14"></Icon>
												</a>
												<DropdownMenu slot="list">
													<DropdownItem v-for="(item,index) in policyItemList(items.itemId)" :name="item.id" :key="item.id" :selected="items.policyIds.indexOf(item.id)!=-1&&item.type!='discount'" :disabled="(items.policyIds.indexOf(item.id)!=-1&&item.type!='discount')?false:(items.typeList.find(oitem=>oitem.type==item.type)&&item.type!='discount'&&items.policyIds.indexOf(item.id)==-1)||items.policyIds.length>=3">{{item.name}}</DropdownItem>
												</DropdownMenu>
											</Dropdown>
											</Col>
										</Row>
									</div>
									<div class="tags_box2" v-else>
										<Row type="flex" class="Row" align="middle">
											<Col span="23">
											<Tag>组合课程包优惠{{(items.publicPrice-items.discountsPaidUp).toFixed(2)}}</Tag>
											</Col>
											<Col span="1">
													<Icon type="arrow-down-b" color="#80848f" size="14"></Icon>
											</Col>
										</Row>
									</div>
								</FormItem>
								</Col>
								<Col span="8">
								<FormItem label="任意减免：" v-show="items.typeList.find(oitem=>oitem.type=='relief')">
									<Input v-model="items.exemptionPrice" style="width:130px;" @on-blur="concessions(items)"><span slot="append">元</span></Input>
								</FormItem>
								</Col>
							</Row>
						</div>
						<tpl9 v-if="data.id==9" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl9>
					</div>
					<!--<FormItem v-else label="" prop="protocalText" :label-width="0.1">
						<Input v-model="data.policyData.protocalText" type="textarea" placeholder="输入协议条款内容" :autosize="{ minRows: 4, maxRows: 8 }" on-change=""></Input>
					</FormItem>-->
					<div class="preferentialBox" v-else>
						<FormItem label="选择优惠项目：" prop="preferential " class="sale">
							<Select v-model="data.policyData.preferential" multiple @on-change="preferential">
								<!--<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.htItemSubList[0].costPrice}}</Option>-->
								<Option :value="item.id" v-for="(item,index) in data.htItemList" :key="item.id">{{item.name}}</Option>
							</Select>
						</FormItem>
					</div>
				</Form>
				<slot name="content"></slot>
			</div>
		</div>
		<modelbag ref="modelBag" @BagOk="BagOk" :bagList="bagList"></modelbag>
	</div>
</template>
<script>
	import tpl1 from './tpl1.vue';
	import tpl2 from './tpl2.vue';
	import tpl3 from './tpl3.vue';
	import tpl4 from './tpl4.vue';
	import tpl5 from './tpl5.vue';
	import tpl6 from './tpl6.vue';
	import tpl7 from './tpl7.vue';
	import tpl8 from './tpl8.vue';
	import tpl9 from './tpl9.vue';
	import modelbag from './modelBag.vue';
	const othersId = -100;
	export default {
		name: 'vItemCard',
		props: {
			data: {
				type: Object,
				required: true,
			},
			info: { // 主合同信息
				type: Object,
				required: true,
			},
			bagList: {
				type: Array,
				default: [],
			},
			discountsList: {
				type: Object,
				default: {},
			},
			apportion: {
				type: [String, Number],
				default: 0,
			},
		},
		data() {
			return {
				rules: {
					itemId: [{
						required: true,
						message: "此为必选项"
					}],
					//					protocalText: [{
					//						required: true,
					//						message: "此为必选项"
					//					}]，
					preferential: [{
						required: true,
						message: "此为必选项"
					}]
				},
				discountsPaidSum: '',
			};
		},
		computed: {},
		components: {
			tpl1,
			tpl2,
			tpl3,
			tpl4,
			tpl5,
			tpl6,
			tpl7,
			tpl8,
			tpl9,
			modelbag,
		},
		created() {
			console.log(this.data)
			if(this.data.htItemList) {
				this.data.htItemList.forEach(item => {
					item.htItemSubList.forEach(items => {
						items.costPrice = String(Number(items.costPrice).toFixed(2));
						items.publicPrice = String(Number(items.publicPrice).toFixed(2));
					})
				})
			}
			if(this.data.id == 12) {
				this.data.policyData.preferential = [];
			}
			this.data.policyData.list.forEach(items => {
				if(this.data.id == 12) {
					this.data.policyData.preferential.push(items.itemId);
				}
				items.visible = false;
				items.share = 0;
				items.realityPrice = items.publicPrice || 0;
				items.typeList = [];
				items.policyIds = items.policyIds ? items.policyIds : [];
				items.policyIds.forEach(v => {
					let discount = this.policyItemList(items.itemId).find(item => item.id == v);
					items.typeList.push(discount);
				})
			})
			if(this.data.id == 9) {
				this.data.policyData.list.forEach(items => {
					if(items.parentItemId){
						let parentItem=this.bagList.find(item=>item.id==10).htItemList.find(val=>val.id==items.parentItemId);
						let childrenItem=parentItem.htItemList.find(val=>val.id==items.itemId);
						let rate = parentItem.htItemSubList[0].publicPrice / parentItem.htItemSubList[0].groupPrice;
							items.discountsPaidUp=String(childrenItem.htItemSubList[0].costPrice * rate * childrenItem.htItemSubList[0].num);
							items.costPrice=String(childrenItem.htItemSubList[0].costPrice * rate * childrenItem.htItemSubList[0].num);
					}else{
						this.concessions(items);
					}
				})
				this.upDatePrice()
			}
		},
		mounted() {
			this.$nextTick(() => {
			})
		},
		methods: {
			policyItemList(id){
				if(id){
					return this.data.htItemList.find(v=>v.htItemSubList[0].itemId==id).policyItemList;
				}else{
					return [];
				}
			},
			numChange(o, e) {
				o.giftCount = e.target.value;
				o.publicPrice = this.accMul(o.giftCount, o.unitPrice);
				this.setLeaveNum(o);
			},
			setLeaveNum(o) {
				//				this.data.policyData.list.forEach(item => {
				o.leaveNum = parseInt(o.giftCount / 40);
				o.discountsPaidUp = String(o.publicPrice);
				//				})
				this.costPriceChange(o);
				this.upDatePrice()
			},
			accMul(arg1, arg2) {
				let m = 0,
					s1 = String(arg1),
					s2 = String(arg2);
				try {
					m += s1.split(".")[1].length
				} catch(e) {}
				try {
					m += s2.split(".")[1].length
				} catch(e) {}
				return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
			},
			itemIdChange(o) {
				this.data.htItemList.forEach(v => {
					if(v.id == o.itemId) {
						o.giftCount = v.htItemSubList[0].num;
						o.publicPrice = v.htItemSubList[0].publicPrice;
						o.unitPrice = v.htItemSubList[0].costPrice;
					}
				})
				this.$emit('on-change');
				this.setLeaveNum(o);
			},
			addBag() {
				let obj = {
					policyType:'kcb',
					policyName:'课程包',
					itemId: '',
					jsonData: {},
					costPrice: '',
					discountsPaidUp: '',
					publicPrice: '',
					policyIds: [],
					exemptionPrice: '',
					visible: false,
					giftCount: '',
					typeList: [],
					realityPrice: '',
					leaveNum: '',
					protocalText: '',
					parentItemId: '',
					parentItemSubId: '',
					unitPrice: ''
				}
				this.data.policyData.list.push(obj);
				this.$nextTick(()=>{
					this.$el.querySelector('.bagBox').scrollTop=this.$refs.f.$el.scrollHeight;
				})
			},
			groupBag() {
				this.$refs.modelBag.modelShow();
			},
			remBag(ind) {
				this.data.policyData.list.splice(ind, 1);
			},
			remGroupBag(id) {
				this.data.policyData.list = this.data.policyData.list.filter(item => {
					return item.parentItemId != id;
				})
			},
			onChange() {
				this.$emit('on-change');
			},
			close() {
				this.$emit('on-close', this.data)
			},
			chooseData() {
				if(this.data.id === othersId) {
					return {
						itemId: othersId,
						protocalText: this.data.policyData.protocalText,
					}
				}
				let arr = [];
				this.data.policyData.list.forEach(item => {
					this.data.htItemList.forEach(items => {
						if(item.itemId == items.id) {
							arr.push({
								policyType:item.policyType||items.policyType,
								policyId: this.data.id || '',
								itemId: item.itemId || '',
								name: items.name || '',
								policyName:items.policyName,
								jsonData: JSON.stringify(item.jsonData) || '',
								protocalText: String(JSON.stringify(item.protocalText)) || '',
								giftCount: item.giftCount || '',
								costPrice: item.costPrice || '',
								discountsPaidUp: item.discountsPaidUp || '',
								leaveNum: item.leaveNum || 0,
								policyIds: item.policyIds ? item.policyIds.join(',') : '',
								exemptionPrice: item.exemptionPrice || '',
								publicPrice: item.publicPrice || '',
								parentItemId: item.parentItemId || '',
								parentItemSubId: item.parentItemSubId || '',
								itemSubId: items.htItemSubList.length ? items.htItemSubList[0].id : '',
								itemSubName: items.htItemSubList.length ? items.htItemSubList[0].name : '',
								unitPrice: items.unitPrice || ''
								//								giftCount: items.htItemSubList[0].num
							});
						}
					})
				})
				return arr;
			},
			setData() {
				try {
					if(this.data.policyData && this.data.id == 9) {
						this.$refs.tp.setData();
					}
				} catch(e) {
					console.warn(e);
				};
			},
			validForm() {
				return new Promise((res, rej) => {
					this.$refs.f.validate().then(ok => {
						if(ok) {
							if(!this.$refs.tp) {
								res(ok);
								return
							}
							this.$refs.tp.validForm().then(ok2 => {
								res(ok2);
							});
						} else {
							res(ok);
						}
					})
				});
			},
			BagOk(arr, protocal) {
				let subList = arr.htItemSubList,
					rate = subList[0].publicPrice / subList[0].groupPrice;
				arr.htItemList.forEach(v => {
					let obj = {
						policyType:arr.policyType,
						policyName:arr.policyName,
						itemId: v.htItemSubList[0].itemId,
						name: v.htItemSubList[0].name,
						jsonData: {},
						costPrice: String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						discountsPaidUp:String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						publicPrice: v.htItemSubList[0].publicPrice,
						policyIds: [],
						exemptionPrice: '',
						visible: false,
						giftCount: v.htItemSubList[0].num,
						realityPrice: String(v.htItemSubList[0].costPrice * rate * v.htItemSubList[0].num),
						typeList: [],
						parentItemId: arr.id,
						parentItemSubId: arr.htItemSubList[0].id,
						leaveNum: parseInt(v.htItemSubList[0].num / 40),
						protocalText: protocal,
						unitPrice: v.htItemSubList[0].costPrice * rate
					}
					this.data.policyData.list.push(obj);
				})
				this.data.policyData.list = this.data.policyData.list.filter(v => v.itemId);
			},
			policyChange(obj, o, id) {
				
				let discount = this.policyItemList(o.itemId).find(item => item.id == id);
				let index = obj.indexOf(id);
				//				let type={
				//					fullReductionDiscount: discount.fullReductionDiscount,
				//					fullReductionLimit: discount.fullReductionLimit,
				//					fullReductionPrice: discount.fullReductionPrice,
				//					levelSort: discount.levelSort,
				//					type: discount.type,
				//					name:discount.name
				//				}
				let flag = o.typeList.find(item => item.type == discount.type);
				if(discount.type == 'discount') {
					if(obj.length < 3) {
						obj.push(id);
						o.typeList.push(discount)
					}
				} else {
					if(index == -1) {
						if(!flag) {
							if(obj.length < 3) {
								obj.push(id);
								o.typeList.push(discount)
							}
						}
					} else {
						obj.splice(index, 1);
						let ind = o.typeList.findIndex(v => v.id == id);
						o.typeList.splice(ind, 1);
					}
				}
				this.concessions(o);
			},
			concessions(o) {
				let privilege = o.typeList.sort((a, b) => {
					return a.levelSort - b.levelSort;
				})
				o.discountsPaidUp = o.realityPrice;
				privilege.forEach(v => {
					if(v.type == "fullreduction") {
						let num = parseInt(o.discountsPaidUp / v.fullReductionPrice);
						if(num > v.fullReductionLimit && v.fullReductionLimit > 0) {
							num = v.fullReductionLimit;
						}
						o.discountsPaidUp -= num * v.fullReductionDiscount;
					}
					if(v.type == "discount") {
						o.discountsPaidUp = o.discountsPaidUp * v.ratio;
					}
					if(v.type == "relief") {
						o.discountsPaidUp -= o.exemptionPrice;
					}
				})
				o.discountsPaidUp = String(o.discountsPaidUp);
				o.costPrice = o.discountsPaidUp - o.share||0;
				if(this.data.id == 9) {
					this.balance();
				}
			},
			closeTag(obj, id, ind, o) {
				let index = obj.indexOf(id)
				obj.splice(index, 1);
				o.typeList.splice(ind, 1);
				if(!o.typeList.find(oitem => oitem.type == 'relief')) {
					o.exemptionPrice = '';
				}
				this.concessions(o);
			},
			costPriceChange(obj, val) {
				obj.realityPrice = obj.discountsPaidUp;
				obj.exemptionPrice = '';
				obj.policyIds = [];
				obj.typeList = [];
			},
			balance() {
				let arr = [],
					contPrice = 0,
					discountsPaidUp = 0,
					totalPrice = 0;
				this.data.policyData.list.forEach(item => {
					item.typeList.forEach(v => {
						if(!arr.find(val => val == v.name)) {
							arr.push(v.name);
						}
					})
					contPrice += Number(item.costPrice);
					discountsPaidUp += Number(item.discountsPaidUp);
					totalPrice += Number(item.publicPrice);
				})
				this.$emit("balance", arr.join('、'), discountsPaidUp, totalPrice, contPrice);
			},
			preferential(val) {
				let arr = [];
				this.data.policyData.preferential.forEach(v => {
					arr.push({
						itemId: v,
						policyId: this.data.id,
						policyType: this.data.type
					})
				})
				this.data.policyData.list = arr;
			},
			tags_boxShow(items, ind) {
				let obj = items;
				obj.visible = !items.visible;
				this.$set(this.data.policyData.list, ind, obj)
			},
			upDatePrice(){
				if(this.data.id == 9) {
					this.discountsPaidSum = this.data.policyData.list.reduce((a, b) => Number(a) + Number(b.discountsPaidUp), 0)
					this.data.policyData.list.forEach(items => {
						items.share = Math.floor(items.discountsPaidUp / this.discountsPaidSum * this.apportion);
					})
					let shareSum = this.data.policyData.list.reduce((a, b) => Number(a) + Number(b.share), 0)
					let maxValue = this.data.policyData.list.map(el => el.share).reduce((max, cur) => Math.max(max, cur), -Infinity);
					this.data.policyData.list.forEach(v => {
						if(v.share == maxValue) {
							v.share += this.apportion - shareSum;
						}
						v.costPrice = v.discountsPaidUp - v.share||0;
					})
				}
			}
		},
		watch: {
			'data.policyData.itemId' () {},
			'data.policyData.list': {
				handler: function(val, oldVal) {
					if(this.data.id == 9) {
						this.balance();
					}
				},
				deep: true
			},
			'data.policyData.protocalText' () {
				this.$emit('on-change');
			},
			'apportion': {
				handler: function(val, oldVal) {
					this.upDatePrice();
				},
				deep: true
			},
		}
	}
</script>