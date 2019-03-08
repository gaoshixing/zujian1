

<style lang="less">
.spoc_sign_category{
	.search_item{
		margin:20px 0; 		
	}
	.menulist-table {
		max-height: ~"calc(100vh - 180px)";
		overflow: auto;
		.linkbtn {
			color: #2d83bb;
			& + .linkbtn {
				margin-left: 8px;
			}
		}
		.nodata {
			padding: 40px 0;
			text-align: center;
		}
		.thead {
			color: #000;
			font-weight: bold;
			overflow: hidden;
			border-bottom: 1px solid #e5e5e5;
			[class^="item-"] {
				line-height: 40px;
			}
		}
		[class^="item-"] {
			float: left;
			min-height: 40px;
			min-width: 1%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.menu-item-lists{
			border-bottom: 1px solid #e5e5e5;
			.menu-item{
				&:first-child{
					.menu-list-item{
						border: none;
					}
				}
			}
		}
		
		.item-foldable {
			width: 2%;
			text-align: right;
			cursor: pointer;
			&:hover {
				.iconfont {
				color: #888;
				}
			}
		}
		.item-name {
			width: 30%;
		}
		.item-contractCount {
			width: 30%;
			.item-ctrls {
				width: 40%;
			}
		}
	}	
	.menu-item-lists{
		border-bottom: 1px solid #e5e5e5;
		.menu-item{
			&:first-child{
				.menu-list-item{
					border: none;
				}
			}
		}
	}
	
}
.modal-del{
	.message{
		text-align:center; 
		padding:45px 0 ;
		font-size:18px;
		span{
			color:#e8352c;
		}
	}
	.ivu-modal-footer{
		border: none;
		padding:0 0 50px;
		.btns {
			text-align:center;
			button{
				width: 120px;
			}
		}
	}
}
.modal-policy{
	.ivu-modal-footer{
		border: none;
	}
	.title{
		height: 40px;
		background-color: #fafafa;
		border-bottom: solid 1px #e0e0e0;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
	}
	.policy-content{
		display: flex;
		justify-content: space-around;
		.right,
		.left{
			width: 328px;
			border: solid 1px #e0e0e0;
		}
		.left{
			width: 284px;
		}
		.right_contnet{
			padding: 8px 0;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			button{
				width: 140px;
				margin:22px 0; 
			}
		}
		.left_content{
			padding:20px;
		}
	}	
}
</style>
<template>
	<div class="spoc_sign_category">
		<div class="search_item">
			<v-search-options :data="country.countryList" :searchTitle="country.searchName" @on-select-item="onSelectItem"></v-search-options>
		</div>
		<div>
			<v-title title="签约-合同分类">
				<div slot="right">
					<Button type="primary" @click="showAddCategory">添加分类</Button>
				</div>
			</v-title>
		</div>
		<div class="menulist-table">
			<div class="thead">
				<div class="item-foldable"></div>  
				<div class="item-name">名称</div>
				<div class="item-contractCount">主合同数</div>
				<div class="item-ctrls">操作</div>
			</div>
			<div class="menu-item-lists" v-if="currSubMenu.length">
				<tabmenu-item class="menu-item" v-for="item in currSubMenu" :data="item" :key="item.id" @onupdate="showUpdateMenu(item)" @ondel="showDelMenu(item)" @on-add-discounts="showAddDiscounts(item)" @on-add-product-type="showAddProductType(item)"></tabmenu-item>
			</div>
			<div v-else class="nodata">
				<p>暂无数据</p>
			</div>
		</div>
		<!-- 添加分类 -->
		<Modal title="添加合同分类" v-model="modalShow.showAddCategory" ok-text="保存" @on-ok="addCategory">
			<Form :data="addCategoryObj" :label-width="80">
				<FormItem label="国别：">
					<Row>
						<Col span="9">
							<Select v-model="addCategoryObj.country">
								<Option>fff</Option>
							</Select>
						</Col>	
					</Row>	
				</FormItem>
				<FormItem label="分类名称：">
					<Row>
						<Col span="9">
							<Input v-model="addCategoryObj.name"></Input>	
						</Col>	
					</Row>	
				</FormItem>	
			</Form>
		</Modal>
		<!-- 添加产品类型 -->
		<Modal title="添加产品类型" v-model="modalShow.showAddProductType" ok-text="保存" @on-ok="AddProductType">
			<Form :data="AddProductTypeObj" >
				<FormItem label="产品体系">{{AddProductTypeObj.name}}</FormItem>
				<FormItem label="产品类型">
					<Row>
						<Col span="8">
							<Input v-model="AddProductTypeObj.type"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
		<!-- 删除 -->
		<Modal class-name="modal-del" title="删除" v-model="modalShow.showDelMenu">
			<div class="message">您确定要删除 <span>规划</span> 吗？</div>
			<div class="btns" slot="footer">
				<Button type="error"  @click="comfirmDel">确定</Button>
				<Button @click="comfirmCancel">取消</Button>
			</div>
		</Modal>
		<!-- 添加优惠政策 -->
		<Modal width="728" class-name="modal-policy" title="添加优惠政策" v-model="modalShow.showAddDiscounts" @on-ok="addDiscounts">
			<div class="policy-content">
				<div class="right">
					<div class="title">
						优惠政策
					</div>
					<div class="right_contnet">
						<Button :type="index == btnActiveIndex? 'primary':'ghost'" v-for="(item,index) in policyList" :key="index" @click="showDiscountItem(index)">{{item.label}}</Button>
					</div>
				</div>
				<div class="left">
					<div class="title">
						待添加优惠项目
					</div>
					<div class="left_content">
						<Checkbox v-model="checkAll">全选</Checkbox>
						<CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
							<Checkbox :label="item.value" v-for="(item,index) in checkGroupList" :key="index">{{item.label}}</Checkbox>
						</CheckboxGroup>
					</div>
				</div>
			</div>
		</Modal>
		<!-- 编辑	 -->
		<Modal title="编辑合同分类" v-model="modalShow.showUpdateMenu" ok-text="保存" @on-ok="updateMenu">
			<Form :data="editObj" >
				<FormItem label="上级分类：">{{editObj.pname}}</FormItem>
				<FormItem label="分类名称：">
					<Row>
						<Col span="8">
							<Input v-model="editObj.name"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
	</div>
</template>
<script>
import vSearchOptions from "../../modules/vSearchOptions";
import vTitle from "@public/modules/vTitle";
import tabmenuItem from "./component/menuItem";
import valid,{errors,CONTRACTCATEGORY } from "../../libs/request";
import { mapMutations } from "vuex";

export default {
	name:'category',
	data () {
		return {
			country:{
				searchName:'合同国别:',
				countryList:[
					{id:1,label:'美国'},
					{id:2,label:'澳大利亚'},
					{id:3,label:'英国'},
					{id:4,label:'加拿大'},
					{id:5,label:'新西兰'},
				],
			},
			currSubMenu: [
				{id:1,name:'Elite',count:42},
				{id:2,name:'中美方',count:0},
				{id:3,name:'纯中方',count:0},
			],
			policyList:[
				{id:1,label:'折扣优惠',},
				{id:2,label:'修改退款比例',},
				{id:3,label:'赠送课程',},
				{id:4,label:'分期付款',},
				{id:5,label:'赠送实习/活动',},
				{id:6,label:'15天适应体验期',},
				{id:7,label:'赠送学校/专业',},
				{id:8,label:'约分保录',},
			],
			btnActiveIndex:0,
			checkAllGroup:[],
			checkAll:false,	
			checkGroupList:[
				{id:1,value:'9.5折',label:'9.5折'},
				{id:1,value:'9折',label:'9折'},
				{id:1,value:'8.8折',label:'8.8折'},
				{id:1,value:'8.5折',label:'8.5折'},
				{id:1,value:'合同增加分期付款补充协议',label:'合同增加分期付款补充协议'},
			],
			modalShow:{
				showAddCategory:false,
				showUpdateMenu:false,
				showDelMenu:false,
				showAddDiscounts:false,
				showAddProductType:false
			},
			AddProductTypeObj:{
				name:'',
				id:11,
				type:''
			},
			addCategoryObj:{
				country:'',
				name:''
			},
			editObj:{
			}
		}
	},
	computed: {
		
	},
	components: {
		vSearchOptions,
		vTitle,
		tabmenuItem,
	},
	created () {
		// this.fetchBuildTree()
	},
	methods: {
		...mapMutations(['updateLoadingStatus']),
		onSelectItem(item){
			console.log(item);	
		},
		//开启模态框
		showUpdateMenu(item){
			this.editObj = item;
			this.modalShow.showUpdateMenu = true;
		},
		showDelMenu(item){
			this.modalShow.showDelMenu = true;
		},
		showAddDiscounts(item){
			this.modalShow.showAddDiscounts = true;
		},
		showAddProductType(item){
			this.AddProductTypeObj = item;
			this.modalShow.showAddProductType = true;
		},
		showAddCategory(){
			this.modalShow.showAddCategory = true;
		},
		//添加合同分类
		addCategory(){
			alert(111);
		},
		//添加产品类型操作
		AddProductType(){
			alert('fetch data')
		},
		//编辑
		updateMenu(){
			
		},
		//删除modal操作
		comfirmDel(){
			this.modalShow.showDelMenu = false;
			console.log('some ............');
						
		},
		comfirmCancel(){
			this.modalShow.showDelMenu = false;
		},
		/*添加优惠政策*/
		addDiscounts(){
			//接口
		},
		showDiscountItem(index){
			this.btnActiveIndex = index
		},
		checkAllGroupChange(){
			if(this.checkGroupList.length == this.checkAllGroup.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
		},
		//获取合同分类树形列表
		fetchBuildTree(){
			this.updateLoadingStatus({ isLoading: true });
			CONTRACTCATEGORY
			.fetchBuildTree()
			.then(valid.call(this))
			.then(res => {
				if (res.ok) {
					console.log(res);
				}
			})
			.catch(errors.call(this))
			.finally(() => {
				this.updateLoadingStatus({ isLoading: false });
			});
		}
	},
	watch: {
		checkAll(val){
			if(val){
				let arr = this.checkGroupList.map(v=>{
					return v.value;
				})
				this.checkAllGroup = arr;
			}else {
				if(this.checkAllGroup.length==this.checkGroupList.length){
					this.checkAllGroup =[];
				}	 
			}
		}
	}
}
</script>
