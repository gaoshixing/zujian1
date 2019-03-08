<style lang="less">
@green:#44bcb7;
.spoc_sign_discount{
	border-top: 1px solid #e0e0e0;
	@text:#495060;
	.policy_title{
		margin: 0px 0 30px;
		display: flex;
		flex-wrap: wrap;
		font-size: 14px;
		.p-item{
			position: relative;
			width: 170px;
			border: solid 1px #e6e6e6;
			border-radius: 4px;
			padding: 0 20px;
			margin: 0 20px 20px 0;
			height: 46px;
			line-height: 46px;
			cursor: pointer;
			position: relative;
			&.active{
				background-color: @green;
				color: #fff;
				.iconfont{
					color: #fff;
				}
			}
			.iconfont{
				right: 9px;
				top: 0;
				position: absolute;
				color: #cccccc;
				&:hover{
					.dropdown{
						display: block;
					}
				}
				.dropdown{
					display: none;
					position: absolute;
					z-index: 22;
					top: 18px;
					left: -70px;
					padding: 10px 4px;
					width: 120px;
					box-sizing: border-box;
					box-shadow: 0 0 18px 2px rgba(4, 0, 0, 0.2);
					border-radius: 4px;
					font-size: 14px;
					background-color: #fff;
					.litem{
						height: 32px;
						line-height: 32px;
						cursor: pointer;
						text-align: center;
						color: #333;
						&:hover{
							color: @green;
							background-color:rgb(233, 247, 247);
						}
					}
				}
			}
		}
		.new_policy{
			padding-left: 10px;
			.plus{
				color: @green;
				border: dashed 1px @green;
				padding:3px 8px;
				border-radius: 5px;
			}
		}
	}
	.discount{
		.title{
			font-size: 18px;
			color: #333333;
			margin-bottom: 22px;
		}
		.subTitle{
			font-size: 14px;
			margin-bottom:21px; 
		}
		.add{
			width: 90px;
			float: right;
		}
		.discount_items{
			margin-bottom: 39px;
		}
	}
	.setting-tips-wrap{
		margin-top: 15px;
		margin-bottom: 10px;
		.setting-tips{
			color: #0d70b0;
			font-size: 14px;
			&:hover{
				color: #0b619b;
			}
		}
	}
	
	
	.save{
		margin-top: 20px;
		text-align: center;
		button{
			width: 140px;
			height: 40px;
			font-size: 16px;
		}
	}
}
</style>
<template>
	<div class="spoc_sign_discount">
		<div class="setting-tips-wrap">
			<a class="setting-tips" @click="showSetting">优惠条款叠加使用规则设置</a>
		</div>
		<div class="policy_title">
			<div v-for="(item,index) in htPolicyList" :key="index"	:class="{'p-item':1,active:item.id==activeItem.id}" @click="doSelect(index)">
				<span class="label" v-text="item.name"></span>	
				<i class="iconfont icon-xia">
					<div class="dropdown">
						<p class="litem" @click="modifyName(item)">修改</p>
					</div>
				</i>
			</div>
		</div>
		<div class="discount">
			<div class="title" v-text="activeItem.name"></div>
			<div class="subTitle">
				• 优惠/促签项目：
				<Button class="add" type="primary" @click="showAddItem">添加</Button>
			</div>
				<Table :columns="columns" :data="activeItem.htItemList" style="margin-bottom:20px;"></Table>
			<div class="subTitle">• 标准补充协议：</div>
			<Input type="textarea" v-model="activeItem.protocal"></Input>
		</div>
		<div class="save">
			<Button type="primary" @click="saveCurrent">保存</Button>
		</div>
		<!-- 添加新政策 -->
		<Modal :title="flagadd?'添加新政策':'编辑政策'" v-model="modalShow.showPolicy">
			<Form :data="policyObj">
				<FormItem label="优惠政策">
					<Row>
						<Col span="8">
							<Input v-model="policyObj.name"></Input>
						</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="modalShow.showPolicy=false">取消</Button>
                <Button type="primary" :disabled="!policyObj.name" @click="addPolicy">确定</Button>
			</div>
		</Modal>
		
		<!-- 删除优惠项目 -->
		<v-del-modal v-model="modalShow.showDelMenuItem" @on-comfirm="comfirmDelItems">
			<div slot="message"> 您确定要删除 <span class="warning">优惠项目</span> 吗？</div>
		</v-del-modal>
		<!-- 添加优惠项目 -->
		<Modal width="748" v-model="modalShow.showAddItem" title="添加优惠项目" class-name="vertical-center-modal">
			<v-add-discount-item ref="discountItem" :data="discountItemObj" :dict-data="dictData" :approver-list="approverList" :ht-policy-list="htPolicyList" :active-item="activeItem" ></v-add-discount-item>
			<div slot="footer">
                <Button @click="modalShow.showAddItem=false">取消</Button>
                <Button type="primary" @click="doAddItem">确定</Button>
            </div>
		</Modal>
		<!-- 使用规则 -->
		<Modal width="748" v-model="modalShow.showSetting" title="优惠条款叠加使用规则设置">
			<rule-setting ref="rulesetting" :rules="settingData.list"></rule-setting>
			<div slot="footer">
                <Button @click="modalShow.showSetting=false">取消</Button>
                <Button type="primary" @click="saveSetting">确定</Button>
            </div>
		</Modal>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import vDelModal from "../../modules/vDelModal";
import vAddDiscountItem from "./componet/vAddDiscountItem";
import ruleSetting from "./componet/ruleSetting";
import valid, { errors, htPolicy, htRule, common } from '../../libs/request.js';
import { getHtPolicyList } from '../../store/index.js';
import { extendKey } from '../../libs/util.js';

const policyObj = ()=>{
	return {
		metuxPolicies:[],
		isMetux:'0',
		isLimitCount:'0',
		itemDesc:'',
		costPrice:0,
		lowestPrice:0,
		type:'',
		auditor:'',
		level:'',
		itemDesc:'',
		protocal:'',
		protocalType:-1,
	}
}

export default {
	data () {
		return {
			htPolicyList:getHtPolicyList(),
			dictData:{
				ht_item_level:[],
				ht_item_type:[],
			},
			approverList:[],
			settingData:{
				list:[]
			},
			policyObj:{
				id:'',
				name:''
			},
			activeItem:{},
			activeIndex:0,
			operateShow:{},
			columns:[
				{
					title:'权限级别',
					key:'levelName',
					align:'center'
				},
				{
					title:'项目名称',
					key:'name',
					align:'center'
				},
				{
					title:'描述',
					key:'itemDesc',
					align:'center'
				},
				{
					title:'适用产品',
					key:'productDesc',
					align:'center'
				},
				{
					title:'审批人',
					key:'auditorName',
					align:'center'
				},
				{
					title:'操作',
					align:'center',
					render:(h,params)=>{
						return h('div',{
							style:{
								display:'flex',
								justifyContent: 'center',
								color: '#44bcb7'
							}
						},[
							h('div',{
								style:{
									cursor:'pointer',
									paddingLeft:'10px',
									paddingRight:'10px',
								},
								on:{
								click:()=>{
									this.showEditItem(params)
								}
								}
							},'编辑'),
							h('div',{
								style:{
								cursor:'pointer',
								paddingLeft:'10px',
								paddingRight:'10px',
								color:'#ff0000',
								},
								on:{
								click:()=>{
									this.showDelItem(params)
								}
								}  
							},'删除')
						])
					}
				},
			],
			modalShow:{
				delItem:{},
				showPolicy:false,
				showDelMenu:false,
				showAddItem:false,
				showDelMenuItem:false,
				showSetting:false,
			},
			discountItemObj:{
				metuxPolicies:[]
			},
			flagadd:true,
		}
	},
	computed:{
	},
	components: {
		vDelModal,
		vAddDiscountItem,
		ruleSetting
	},
	created(){
		this.initPage();
	},
	mounted(){
		
	},
	methods: {
		initPage(){
			common.batchListData({types:'ht_item_type,ht_item_level'}).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.dictData = res.data.data;
				}
			}).catch(errors.call(this));
			common.approverList().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.approverList = res.data.data.roleList.filter(item=>{
						return item;
					});
				}
			}).catch(errors.call(this));
			htRule.list().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.settingData = res.data.data;
				}
			}).catch(errors.call(this));
			this.getListData();
		},
		getListData(cb){
			htPolicy.list().then(valid.call(this)).then(res=>{
				if(res.ok){
					this.htPolicyList = res.data.data.list;
					cb&&cb(this.htPolicyList);
					this.doSelect(this.activeIndex);
				}
			}).catch(errors.call(this));
		},
		showSetting(){
			this.modalShow.showSetting = true;
		},
		saveSetting(){
			const data = this.$refs.rulesetting.rules;
			htRule.save(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.$Message.success(res.data.message);
				}
			}).catch(errors.call(this)).finally(()=>{
				this.modalShow.showSetting = false;
			});
		},
		// 切换选中状态
		doSelect(index){
			this.activeIndex = index;
			this.activeItem = this.htPolicyList[index];
		},
		//添加优惠/促签项目条款弹窗
		showAddItem(){
			const form = this.$refs.discountItem;
			form.$refs.disform.resetFields();
			form.reset();
			this.modalShow.additem = true;
			this.modalShow.showAddItem = true;
			this.discountItemObj = policyObj() ;
		},
		//删除弹窗
		showDelItem(item){
			this.modalShow.delItem = item.row;
			this.modalShow.showDelMenuItem = true;
		},
		showEditItem(item){
			this.modalShow.additem = false;
			this.modalShow.showAddItem = true;
			const po = Object.assign({},item.row);
			po.metuxPolicies=po.metuxPolicies.split(',');
			this.discountItemObj =po;
			const form = this.$refs.discountItem;
			form.$refs.disform.resetFields();
		},
		// 添加/编辑政策
		addPolicy(){
			let	data = extendKey(['id','name'],this.policyObj,{});
			htPolicy.updateName(data).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.modalShow.showPolicy=false;
					this.getListData();
				}
			}).catch(errors.call(this));
		},
		comfirmDelItems(){
			htPolicy.deleteItem(this.modalShow.delItem.id).then(valid.call(this)).then(res=>{
				if(res.ok){
					this.getListData();
				}
			}).catch(errors.call(this));
		},
		
		// 确认添加优惠/促签项目条款
		doAddItem(){
			// 调接口
			const form = this.$refs.discountItem;
			form.$refs.disform.validate(ok=>{
				if(ok){
					const data = JSON.parse(JSON.stringify(form.formData));
					data.policyId = this.activeItem.id;
					data.metuxPolicies = data.metuxPolicies.join(',');
					htPolicy.saveItem(data).then(valid.call(this)).then(res=>{
						if(res.ok){
							this.modalShow.showAddItem=false;
							this.getListData();
						}
					}).catch(errors.call(this));
				}
			})
		},
		//保存
		saveCurrent(){
			if(this.activeItem){
				let data = {
					id:this.activeItem.id,
					name:this.activeItem.name,
					protocal:this.activeItem.protocal
				}
				htPolicy.save(data).then(valid.call(this)).then(res=>{
					if(res.ok){
						this.$Message.success(res.data.message);
						this.getListData();
					}
				}).catch(errors.call(this));
			}
		},
		modifyName(item){
			this.flagadd = false;
			this.modalShow.showPolicy=true;
			this.policyObj = extendKey(['id','name'],item,{});
		}
	}
}
</script>
