<style lang="less">
	.sign_contract_subjion_item_card {
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
				border-bottom: 1px #dddee1 solid;
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
					right: 24px;
					top: 15px;
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
			}
		}
	}
</style>
<template>
	<div class="sign_contract_subjion_item_card">
		<div class="content">
			<div class="title">
				<span style="margin-right: 10px;">{{data.name}}</span>
				<Tooltip class="tooltip" placement="top">
					<Icon class="icon-info" type="information-circled"></Icon>
					<div class="tooltip_content" slot="content">
						<div>温馨提示：</div>
						<div v-for="(item,index) in data.htItemList" :key="index">{{item.name?`${item.name}：`:''}} {{item.productDesc}}；</div>
					</div>
				</Tooltip>
				<span class="close" @click="close">
					<Icon type="android-close"></Icon>
				</span>
			</div>
			<div class="bagBox">
				<Form :label-width="100" :rules="rules" :model="data.policyData" ref="f">
					<div>
						<oto :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==11"></oto>
						<plan :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==12"></plan>
						<lesson :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==13"></lesson>
						<deposit :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==14"></deposit>
						<fund :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==17"></fund>
						<practice :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==22"></practice>
						<background :data="data" :info="info" :actualPrice="actualPrice" :sharePrice="sharePrice" :infoPrice="infoPrice" :protocolExemptionPrice="protocolExemptionPrice" v-if="data.id==23"></background>
						
					</div>
				</Form>
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	import oto from './modules/oto.vue';
	import plan from './modules/plan.vue';
	import lesson from './modules/lesson.vue';
	import deposit from './modules/deposit.vue';
	import fund from './modules/fund.vue';
	import practice from './modules/practice.vue';
	import background from './modules/background.vue';
	
	const othersId = -100;
	import valid, {
		errors,
		htItem,
		common
	} from '../../../libs/request.js';
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
			actualPrice: {
				type: [String,Number],
				required: true,
			},
			sharePrice: {
				type: [String,Number],
				required: true,
			},
			protocolExemptionPrice: {
				type: [String,Number],
				required: true,
			},
			infoPrice: {
				type: [String,Number],
				required: true,
			},
		},
		data() {
			return {
				rules: {

				}
			};
		},
		computed: {},
		components: {
			oto,
			plan,
			lesson,
			deposit,
			fund,
			practice,
			background
		},
		created() {
//			htItem.listPage({
//				policyId: this.data.policyId,
//				pageSize:-1
//				
//			}).then(valid.call(this)).then(res=>{
//				if(res.ok){
//					this.data.htItemList=res.data.data.list;
//				}
//			}).catch(errors.call(this));
		},
		methods: {
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
							item.policyId=this.data.id;
//							item.jsonData=Object.keys(item.jsonData).length?JSON.stringify(item.jsonData):JSON.stringify({});
							item.jsonData='{}';
							item.protocalText=String(item.protocalText) || '';
							arr.push(item);
						}
					})
				})
				return arr;
			},
			setData() {
				try {
					this.$refs.tp.setData();
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
			balance(){
				console.log(98456)
				let contPrice = 0,
//					discountsPaidUp = 0,
					totalPrice = 0;
				this.data.policyData.list.forEach(item => {
					contPrice += Number(item.costPrice);
//					discountsPaidUp += Number(item.discountsPaidUp);
					totalPrice += Number(item.publicPrice);
				})
				this.$emit("balance", totalPrice, contPrice);
			}
		},
		beforeDestroy(){
				this.$emit("balance", 0, 0);
		},
		watch: {
			'data.policyData.list': {
				handler: function(val, oldVal) {
					this.balance();
				},
				deep: true
			},
			'data.policyData.itemId' () {
				this.$emit('on-change');
			},
			'data.policyData.protocalText' () {
				this.$emit('on-change');
			},
		}
	}
</script>