<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem label="选择项目：" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: '托管服务不能为空', trigger: 'change'}">
					<Select v-model="items.itemId">
						<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="项目金额：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="items.publicPrice" v-if="item.id==items.itemId" style="width:262px;" @on-blur="ratioChange(items,$event)" ><span slot="append">元</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">元</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="折扣优惠：" :rules="{required: true,pattern: /^\d+$/, message: '必须为整数', trigger: 'change'}">
					<Input v-model="items.ratio" @on-blur="ratioChange(items,$event)" style="width:262px;"><span slot="append">%</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="实收金额：">
						<Input v-model="items.costPrice" disabled style="width:262px;"><span slot="append">元</span></Input>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="优惠分摊：">
					<Input v-model="items.share" disabled style="width:262px;"><span slot="append">元</span></Input>
				</FormItem>
				</Col>
			</Row>
		</div>
		<tpl13 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl13>
	</div>
</template>

<script>
	import tpl13 from './tpl13.vue';
	export default{
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
		data(){
			return {
				
			}
		},
		computed: {},
		components: {
			tpl13,
		},
		created(){
			this.data.policyData.list.forEach(v=>{
				v.itemId=this.data.htItemList?this.data.htItemList[0].id:'';
			})
		},
		mounted() {
			this.$nextTick(() => {
			})
		},
		methods: {
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
			ratioChange(o){
				console.log(o.publicPrice)
				o.ratioPrice=this.accMul(o.ratio,o.publicPrice)/100;
				let infoShare=this.infoPrice?(o.ratioPrice/this.infoPrice)*this.protocolExemptionPrice:0;
				o.share=(((o.ratioPrice/this.actualPrice*this.sharePrice)||0)+infoShare).toFixed(2);
				o.costPrice = (Number(o.ratioPrice)-Number(o.share)).toFixed(2);
			},
		},
		watch: {
			'actualPrice': {
				handler: function(val, oldVal) {
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
			'sharePrice': {
				handler: function(val, oldVal) {
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
			'protocolExemptionPrice': {
				handler: function(val, oldVal) {
					this.data.policyData.list.forEach(v=>{
						this.ratioChange(v);
					})
				},
				deep: true
			},
		}
	}
</script>