<style lang="less">
.v_sign_discount_add_item{
	padding-right: 40px;
	.ivu-form-item.last{
		margin-bottom: 0;
	}
}
</style>
<template>
	<div class="v_sign_discount_add_item">
		<Form ref="disform" :label-width="135" :model="formData" :rules="rule">
			<FormItem label="项目名称" prop="name">
				<Input v-model="formData.name"></Input>
			</FormItem>

			
			<Row type="flex">
				<Col span="12">
					<FormItem label="选择优惠项目类型" prop="type">
						<Select v-model="formData.type">
							<Option v-for="item in dictData.ht_item_type" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="6" v-if="formData.type=='discount'">
					<FormItem :label-width="20" prop="ratio">
						<Input placeholder="折扣比" v-model="ratio">
							<span style="lin-height:normal" slot="append">%</span>
						</Input>
					</FormItem>
				</Col>
				<Col span="6" v-if="formData.type=='gift'">
					<FormItem :label-width="20" prop="giftCount">
						<Input placeholder="赠送数量" v-model="formData.giftCount"></Input>
					</FormItem>
				</Col>
			</Row>
			

			<Row type="flex" v-if="['gift','increase'].indexOf(formData.type)>=0">
				<Col span="12">
					<FormItem label="赠送金额" prop="publicPrice">
						<Input style="width:198px" v-model="formData.publicPrice"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<!--<FormItem label="赠送成本" prop="costPrice">
						<Input style="width:198px" v-model="formData.costPrice"></Input>
					</FormItem>-->
				</Col>
			</Row>
			<FormItem label="项目描述">
				<Input v-model="formData.itemDesc" type="textarea"></Input>
			</FormItem>
			<Row type="flex">
				<Col span="12">
					<FormItem label="权限级别">
						<Select v-model="formData.level">
							<Option v-for="item in dictData.ht_item_level" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="审批人">
						<Select v-model="formData.auditor">
							<Option v-for="item in approverList" :key="item.id" :value="item.id">{{item.name}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row type="flex">
				<Col span="12">
					<FormItem label="适用产品最低价" prop="lowestPrice">
						<Input style="width:198px" v-model="formData.lowestPrice"></Input>
					</FormItem>
				</Col>
				<Col span="12">
					<Row type="flex">
						<Col span="16">
							<FormItem label="是否限制名额(人/月)?">
								<RadioGroup v-model="formData.isLimitCount">
									<Radio label="1">是</Radio>
									<Radio label="0">否</Radio>
								</RadioGroup>
							</FormItem>	
						</Col>
						<Col span="8" v-if="formData.isLimitCount=='1'">
							<Input  placeholder="每人每月名额数" v-model="formData.count">
							</Input>
						</Col>
					</Row>
				</Col>
			</Row>
			<FormItem label="适用产品描述">
				<Input v-model="formData.productDesc"></Input>
			</FormItem>
			<FormItem label="有无互斥政策">
				<RadioGroup v-model="formData.isMetux">
					<Radio label="1">是</Radio>
					<Radio label="0">否</Radio>
				</RadioGroup>
				<CheckboxGroup v-if="formData.isMetux=='1'" v-model="formData.metuxPolicies" class="margin-left:140px">
					<Checkbox v-for="item in htPolicyList" :label="item.id" :key="item.name+item.id">{{item.name}}</Checkbox>
				</CheckboxGroup>
			</FormItem>
				
			<Row type="flex">
				<Col span="12">
					<FormItem label="选择协议模板" prop="protocalType">
						<Select v-model="formData.protocalType" @on-change="onTplChange">
							<Option v-for="(item,i) in currTpls" :key="item.name+item.id" :value="i">{{item.name}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<FormItem label="标准补充协议" class="last">
				<Input v-model="formData.protocal" type="textarea"></Input>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { tpls } from './tpls.js';

export default {
	props:{
		activeItem:{
			type:Object,
			required:true,
		},
		htPolicyList:{
			type:Array,
			required:true,
		},
		dictData:{
			type:Object,
			required:true,
		},
		approverList:{
			type:Array,
			required:true,
		},
		data:{
			type:Object,
			required:true
		},
	},

	data () {
		const $this = this;
		const req = [
            {pattern:/^[1-9]\d{0,9}?$/,message:'请输入数字'}
		];
		const req2 = [
			{validator(rule, value, callback, source, options) {
				$this.$nextTick(()=>{
					const val = $this.ratio;
					if(/^[1-9]\d{0,2}$/.test(val)){
						const v = parseInt(val);
						if(v>0 && v<=100){
							callback([]);
						} else {
							callback([new Error('请输入1-100的数字')]);
						}
					} else {
						callback([new Error("请输入数字")]);
					}
				})
			}}
        ];
		return {
			tpls:tpls(),
			formData:this.data,
			ratio:this.data.ratio*100,
			rule:{
				name:[
					{required: true, message: '项目名称必填', trigger: 'blur'}
				],
				type:[
					{required: true, message: '优惠类型必选', trigger: 'change'}
				],
				protocalType:[
					// {required: true, message: '模板类型必选', trigger: 'change'}
				],
				ratio:req2,
				giftCount:req,
				publicPrice:req,
				costPrice:req,
				lowestPrice:req,	
			},
		}
	},
	computed:{
		hasMany(){
			const c = this.tpls[this.activeItem.id];
			if(c){
				return c.length>1; 
			}
		},
		currTpls(){
			const c = this.tpls[this.activeItem.id];
			if(c){
				return c;
			}
			return [];
		},
	},
	created(){
	},
	methods:{
		onTplChange(index){
			if(this.currTpls[index]){
				this.formData.protocal = this.currTpls[index].tpl;
			}
		},
		reset(){
			this.formData=this.data;
			this.ratio=this.data.ratio*100;
		}
	},
	watch: {
		data(val){
			this.formData =val;
			this.ratio = val.ratio * 100;
		},
		ratio(val){
			this.$nextTick(()=>{
				this.formData.ratio = parseFloat(val/100);
			});
		}
	}
}
</script>

