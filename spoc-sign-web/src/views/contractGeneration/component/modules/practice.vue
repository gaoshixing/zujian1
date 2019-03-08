<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem label="选择项目：" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: '托管服务不能为空', trigger: 'change'}">
					<Select v-model="items.itemId" @on-change="itemIdChange(items)" filterable @on-query-change="remoteMethod">
						<Option v-for="item in options" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="4" offset="12" class="btnCol">
				<Button type="ghost" @click="addBag" v-show="data.policyData.list.length==index+1">添加课程</Button>
				<Button type="ghost" @click="remBag(index)" v-show="data.policyData.list.length>1" style="margin-left: 20px;">删除课程</Button>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="项目金额：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.publicPrice" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">元</span></Input>
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
		<tpl12 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl12>
	</div>
</template>

<script>
	import tpl12 from './tpl12.vue';
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
				options:this.data.htItemList
			}
		},
		computed: {},
		components: {
			tpl12,
		},
		created(){
			
		},
		mounted() {
			this.$nextTick(() => {
			})
		},
		methods: {
			itemIdChange(o) {
				this.data.htItemList.forEach(v => {
					if(v.id == o.itemId) {
						o.publicPrice = Number(v.publicPrice).toFixed(2);
						this.ratioChange(o);
					}
				})
				this.$emit('on-change');
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
			ratioChange(o){
				o.ratioPrice=this.accMul(o.ratio,o.publicPrice)/100;
				let infoShare=this.infoPrice?(o.ratioPrice/this.infoPrice)*this.protocolExemptionPrice:0;
				o.share=(((o.ratioPrice/this.actualPrice*this.sharePrice)||0)+infoShare).toFixed(2);
				o.costPrice = (Number(o.ratioPrice)-Number(o.share)).toFixed(2);
			},
			addBag() {
				let obj = {
					itemId: '',
					jsonData: {},
					costPrice: '',
					publicPrice: '',
					giftCount: '',
					protocalText: '',
					unitPrice:'',
					ratio:'100',
					ratioPrice:'',
					share:'',
				}
				this.data.policyData.list.push(obj);
                this.options = this.data.htItemList;
				this.$nextTick(()=>{
					this.$parent.$parent.$el.querySelector('.bagBox').scrollTop=this.$parent.$parent.$refs.f.$el.scrollHeight;
				})
			},
			remBag(ind) {
				this.data.policyData.list.splice(ind, 1);
			},
            remoteMethod (query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.options = this.data.htItemList.filter(item => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options = this.data.htItemList;
                }
            },
            remoteMethod1(){
            	
            }
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