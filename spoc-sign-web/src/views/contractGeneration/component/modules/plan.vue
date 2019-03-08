<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem label="选择计划：" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: '课程包不能为空', trigger: 'change'}">
					<Select v-model="items.itemId" @on-change="itemIdChange(items)">
						<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="教学课程：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.TechCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="服务期限：">
					<div v-if="items.itemId">
						<Input style="width:80px;" v-for="item in data.htItemList" v-if="item.id==items.itemId" disabled  :key="item.id" v-model="item.htItemSettingMap.ServeLimit"></Input> — <Input style="width:122px;display: inline-table;" disabled v-for="item in data.htItemList" :key="'endMonth'+item.id" v-if="item.id==items.itemId"  v-model="item.htItemSettingMap.ServeLimitEnd"><span slot="append">个月</span></Input>
					</div>
					<div v-else>
						<Input style="width:80px;" disabled></Input> — <Input style="width:122px;display: inline-table;" disabled><span slot="append">个月</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="学管课程：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.MangageCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="模考讲解：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SimulateExplan" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">次</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">次</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="寒/暑假班课：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SummerCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">次</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="标准化考试报名：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.SignUp" v-if="item.id==items.itemId" disabled style="width:262px;"></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="计划包价格：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" :value="Number(item.htItemSettingMap.BagPrice).toFixed(2)" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">元</span></Input><!--BagPrice-->
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
		<tpl10 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl10>
	</div>
</template>

<script>
	import tpl10 from './tpl10.vue';
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
			tpl10,
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
						o.publicPrice = Number(v.htItemSettingMap.BagPrice).toFixed(2);
						o.ratio='100';
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