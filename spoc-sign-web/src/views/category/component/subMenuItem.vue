<style lang="less">
	.res-sub-menu-row {
		.sub-menu-item {
			overflow: hidden;
			line-height: 40px;
			.item-foldable{
				cursor: initial;
			}
		}
		.iconfont{
            color: #d9d9d9;
			transition: all 0.3s ease;
			cursor: pointer;
        }
	}
</style>
<template>
	<div class="res-sub-menu-row">
		<div class="sub-menu-item">
			<div class="item-foldable"></div>
            <div class="item-name">
				<span @click="toggleFold">
					<i class="iconfont" :class="foldcls"></i>
				</span>
				<span v-text="data.name"></span>
			</div>
            <div class="item-contractCount" v-text="data.count"></div>
            <div class="item-ctrls">
                <a href="javascript:void(0)" class="linkbtn" @click="showAddDiscounts">添加优惠政策</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showAddApplyState">添加申请阶段</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showUpdateMenu">编辑</a>
                <a href="javascript:void(0)" class="linkbtn" @click="showDelMenu">删除</a>
            </div>
		</div>
		
		<div class="subfold" v-if="state.visible">
			<expand-row v-for="(item,index) in subMenuList" :key="index" :data="item" :subTree="item.children&&item.children.length>0?true:false" :eventList="eventList">
				<!-- <expand-row slot="subTree" v-for="(value,ind) in item.children" :key="ind" :data="value" :marginLeft="40"></expand-row> -->
			</expand-row>
        </div>
		
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
	</div>
</template>
<script>
import expandRow from "./expandRow";
export default {
	name:'subMenuItem',
	props:{
		data:{
			type:Object,
			default:function(){
				return {};
			}
		},
	},
	data () {
		return {
			state:{
                visible:false
			},
			subMenuList:[
				{id:1,name:'高中',count:'6',children:[]},
				{id:1,name:'本科',count:'6'},
				{id:1,name:'研究生',count:'6',children:[]},	
			],
			eventList:[
				{id:1,eventName:'添加优惠政策',event:this.showSubAddDiscounts},
				{id:2,eventName:'编辑',event:this.showSubModify},
				{id:3,eventName:'删除',event:this.showSubDelMenu},
			],
			currOperateData:{},
			modalShow:{
				showUpdateMenu:false,
				showDelMenu:false,
				showAddDiscounts:false,
			},
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
		}
	},
	computed: {
		foldcls(){
			return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
		}
	},
	components: {
		expandRow
	},
	methods: {
		toggleFold(){
			this.state.visible = !this.state.visible;
		},
		showAddDiscounts(){
			this.$emit('on-add-discounts',this.data);
		},
		showAddApplyState(){
			this.$emit('on-add-apply-state',this.data);
		},
		showUpdateMenu(){
			this.$emit('on-update-menu',this.data);
		},
		showDelMenu(){
			this.$emit('on-del-menu',this.data);
		},

		//显示modal框
		showSubAddDiscounts(data){
			this.currOperateData =data;
			this.modalShow.showAddDiscounts = true;
		},
		showSubModify(data){
			this.currOperateData =data;
		},
		showSubDelMenu(data){
			this.currOperateData =data;
			this.modalShow.showDelMenu = true;
		},


		//删除modal操作
		comfirmDel(){
			this.modalShow.showDelMenu = false;
			console.log('some ............');				
		},
		comfirmCancel(){
			this.modalShow.showDelMenu = false;
		},

		//添加优惠政策
		showDiscountItem(index){
			this.btnActiveIndex = index
		},
		checkAllGroupChange(){
			if(this.checkGroupList.length ==this.checkAllGroup.length){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}
		},
		addDiscounts(){

		}
	},
	watch: {
		checkAll(val){
			if(val){
				let arr = this.checkGroupList.map(v=>{
					return v.value;
				})
				this.checkAllGroup = arr;
			}else if(this.checkAllGroup.length>0&&this.checkAllGroup.length<this.checkGroupList.length){
				this.checkAll =false;
			}else {
				this.checkAllGroup =[];
			}
		}
	}
}
</script>


