<style lang="less">

</style>

<template>
	<div>
		<div class="packsBox" v-for="(items,index) in data.policyData.list" :key="index">
			<Row type="flex">
				<Col span="8">
				<FormItem label="选择托管：" :prop="'list.'+index+'.itemId'" :rules="{required: true, message: '托管服务不能为空', trigger: 'change'}">
					<Select v-model="items.itemId" @on-change="itemIdChange(items)">
						<Option v-for="item in data.htItemList" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="服务费：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.costPrice" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="教学课程：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.TechCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="练习课程：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.lxkc" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="8">
				<FormItem label="学管课程：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.MangageCourse" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="作业时间：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.zysj" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
				<Col span="8">
				<FormItem label="总计：">
					<div v-if="items.itemId">
						<Input v-for="item in data.htItemList" :key="item.id" v-model="item.htItemSettingMap.zj" v-if="item.id==items.itemId" disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
					<div v-else>
						<Input disabled style="width:262px;"><span slot="append">小时/天</span></Input>
					</div>
				</FormItem>
				</Col>
			</Row>
		</div>
		<!--<tpl9 :data="data" :info="info" :policy="data.policyData" ref="tp"></tpl9>-->
	</div>
</template>

<script>
	import tpl9 from './tpl9.vue';
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
		},
		data(){
			return {
				
			}
		},
		computed: {},
		components: {
			tpl9,
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
						o.publicPrice = this.accMul(v.htItemSettingMap.zj,v.costPrice);
						o.costPrice = o.publicPrice;
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
		}
	}
</script>