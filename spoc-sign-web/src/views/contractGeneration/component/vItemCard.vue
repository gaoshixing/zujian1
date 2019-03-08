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
				margin-bottom: 17px;
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
		}
	}
</style>
<template>
	<div class="sign_contract_generation_item_card">
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
			<div>
				<Form :label-width="100" :rules="rules" :model="data.policyData" ref="f">
					<div v-if="data.id!==-100">
						<Row type="flex">
							<Col span="8">
							<FormItem label="优惠折扣：" prop="ratio" v-if="data.id==1||(info.parentType=='trainning'&&data.id==24)">
								<Input v-model="data.policyData.ratio" @on-blur="ratioChange($event)">
								<span slot="append">%</span>
								</Input>
							</FormItem>
							<FormItem label="选择优惠项目：" prop="itemId" v-else>
								<Select v-model="data.policyData.itemId" :disabled="info.parentType=='trainning'&&(data.id==18||data.id==19)">
									<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="8">	
								<FormItem label="课时：" v-if="(info.parentType=='trainning'&&data.id==18)">
									<InputNumber v-model="data.htItemList[0].giftCount" :disabled="true"></InputNumber>
								</FormItem>
							</Col>
							<!--<Col span="8">	
								<FormItem label="权限级别：" v-if="data.id==1">
								    <Input v-model="rank" disabled>
								    </Input>
								</FormItem>
								<FormItem label="权限级别：" v-else>
									<Select disabled v-model="data.policyData.itemId">
										<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.levelName}}</Option>
									</Select>
								</FormItem>
							</Col>
							<Col span="8">	
								<FormItem label="审批人：" v-if="data.id==1">
								    <Input v-model="approver" disabled>
								    </Input>
								</FormItem>
								<FormItem label="审批人：" v-else>
									<Select disabled v-model="data.policyData.itemId">
										<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.auditorName}}</Option>
									</Select>
								</FormItem>
							</Col>	-->
						</Row>
						<Row type="flex" v-if="data.id==1||(info.parentType=='trainning'&&data.id==24)">
							<Col span="8">
							<FormItem label="实际价格：">
								<Input v-model="actualPrice" @on-blur="actualChange($event)">
								</Input>
							</FormItem>
							</Col>
						</Row>
						<tpl1 v-if="data.id==1||(info.parentType=='trainning'&&data.id==24)" :data="data" :info="info" :policy="data.policyData" :tplObj="tplObj" :actualPrice="actualPrice " :totalPrice="totalPrice" ref="tp"></tpl1>
						<tpl2 v-else-if="data.id==2||(info.parentType=='trainning'&&data.id==14)" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl2>
						<tpl3 v-else-if="data.id==3||(info.parentType=='trainning'&&data.id==20)" :data="data" :info="info" :policy="data.policyData" ref="tp" @on-change="onChange"></tpl3>
						<tpl4 v-else-if="data.id==4" :data="data" :info="info" :policy="data.policyData" ref="tp" @on-change="onChange"></tpl4>
						<tpl5 v-else-if="data.id==5" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl5>
						<tpl6 v-else-if="data.id==6" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl6>
						<tpl7 v-else-if="data.id==7" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl7>
						<tpl8 v-else-if="data.id==8" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl8>
						<tpl9 v-else-if="(info.parentType=='trainning'&&data.id==19)" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl9>
						<tpl10 v-else-if="(info.parentType=='trainning'&&data.id==18)" :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl10>
					</div>
					<FormItem v-else label="" prop="protocalText" :label-width="0.1">
						<Input v-model="data.policyData.protocalText" type="textarea" placeholder="输入协议条款内容" :autosize="{ minRows: 4, maxRows: 8 }" on-change=""></Input>
					</FormItem>
				</Form>
				<slot name="content"></slot>
			</div>
		</div>
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
	import tpl10 from './tpl10.vue';
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
			totalPrice: {
				type: [Number, String],
				default: 0
			},
			contPrice: {
				type: [Number, String],
				default: 0
			},
		},
		data() {
			return {
				price: this.contPrice || this.info.price,
				actualPrice: this.contPrice || this.info.price,
				rank: '',
				approver: '',
				tplObj: {
					actualPrice:this.contPrice || this.info.price,
					ratio:10
				},
				rules: {
					itemId: [{
						required: true,
						message: "此为必选项"
					}],
					ratio: [{
						required: true,
						message: "此为必选项"
					}],
					protocalText: [{
						required: true,
						message: "此为必选项"
					}]
				}
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
			tpl10
		},
		created() {
			if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
				if(!this.data.policyData.ratio) {
					this.actualChange();
				} else {
					this.data.policyData.ratio = String(Number(this.data.policyData.ratio || 0).toFixed(2));
				}
			}
			if(this.info.parentType=='trainning'&&(this.data.id==18||this.data.id==19)){
				this.data.policyData.itemId=this.data.htItemList[0].id;
			}
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
				return {
					policyId: this.data.id,
					policyName: this.data.name,
					itemId: (this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) && this.data.policyData.ratio ? '-1' : this.data.policyData.itemId,
					name: this.data.htItemList.find(v => v.id == this.data.policyData.itemId) ? this.data.htItemList.find(v => v.id == this.data.policyData.itemId).name : '',
					type: (this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) ? "discount" : this.data.htItemList.find(v => v.id == this.data.policyData.itemId) ? this.data.htItemList.find(v => v.id == this.data.policyData.itemId).type : '',
					ratio: this.data.policyData.ratio,
					jsonData: JSON.stringify(this.data.policyData.jsonData),
					protocalText: this.data.policyData.protocalText,
					giftCount: this.data.policyData.giftCount,
				};
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
			actualChange(val) {
				if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
					//wsl 添加toFixed(0)  #3038
					this.data.policyData.ratio = (((this.actualPrice / this.price * 10000) / 100.00)||0).toFixed(2);
					this.data.policyData.protocalText = this.data.protocal;
					this.tplObj.ratio=this.data.policyData.ratio;
					//			this.$emit('on-change');
					this.sale();
				}
			},
			ratioChange(val) {
				if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
					this.data.policyData.ratio = String(Number(val.target.value || 0).toFixed(2));
					this.actualPrice = ((this.price * this.data.policyData.ratio) / 100).toFixed(2);
					this.data.policyData.protocalText = this.data.protocal;
					this.tplObj.ratio=this.data.policyData.ratio;
					this.tplObj.actualPrice=this.actualPrice;
					this.sale();
				}
			},
			sale() {
				this.$emit("sale", this.data.policyData.ratio, this.actualPrice)
			}

		},
		beforeDestroy(){
				if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
					this.data.policyData.ratio = String((100).toFixed(2));
//					this.actualPrice = ((this.price * this.data.policyData.ratio) / 100).toFixed(2);
					this.actualPrice = 0;
					this.data.policyData.protocalText = this.data.protocal;
					this.tplObj.ratio=this.data.policyData.ratio;
					this.tplObj.actualPrice=this.actualPrice;
					this.sale();
				}
		},
		watch: {
			'contPrice': {
				handler: function(val, oldVal) {
					if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
						this.price = val;
						//				this.actualPrice=val;
						this.actualPrice = ((this.price * this.data.policyData.ratio) / 100).toFixed(2);
						this.data.policyData.protocalText = this.data.protocal;
						this.sale();
					}
				},
				deep: true
			},
			'actualPrice': {
				handler: function(val, oldVal) {
					if(this.data.id==1||(this.info.parentType=='trainning'&&this.data.id==24)) {
						this.actualChange();
					}
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