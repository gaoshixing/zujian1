<style lang="less">
.menu-list-item-wrap{
    .menu-list-item{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e5e5e5;
        overflow: hidden;
        .iconfont{
            color: #d9d9d9;
            transition: all 0.3s ease;
        }
    }
}
</style>
<template>
    <div class="menu-list-item-wrap">
        <div class="menu-list-item">
            <div class="item-foldable" @click="toggleFold">
                <i class="iconfont" :class="foldcls"></i>
            </div>
            <div class="item-name" v-text="data.name"></div>
            <div class="item-contractCount" v-text="data.count"></div>
            <div class="item-ctrls">
                <a href="javascript:void(0)" class="linkbtn" @click="addDiscounts">添加优惠政策</a>
                <a href="javascript:void(0)" class="linkbtn" @click="addProductType">添加产品类型</a>

                <a href="javascript:void(0)" class="linkbtn" @click="updateMenu">编辑</a>
                <a href="javascript:void(0)" class="linkbtn" @click="delMenu">删除</a>
            </div>
        </div>
        <div class="subfold" v-if="state.visible">
            <sub-menu-item  v-for="item in subMenuList" :data="item" :key="item.id" @on-add-discounts="showAddDiscounts" @on-add-apply-state="showAddApplyState" @on-update-menu="showUpdateMenu" @on-del-menu="showDelMenu"></sub-menu-item>
        </div>

        <!-- 添加申请阶段 -->
        <Modal title="添加申请阶段" v-model="modalShow.showAddApplyState" ok-text="保存"  @on-ok="addApplyState">
			<Form :data="addApplyStateObj">
				<FormItem label="产品体系">{{addApplyStateObj.fname}}</FormItem>
				<FormItem label="产品类型">{{addApplyStateObj.name}}</FormItem>
				<FormItem label="申请阶段">
					<Row>
						<Col span="8">
							<Input v-model="addApplyStateObj.type"></Input>	
						</Col>
					</Row>
				</FormItem>	
			</Form>
		</Modal>
        <!-- 添加优惠政策 -->
        <Modal width="728" class-name="modal-policy" title="添加优惠政策" v-model="modalShow.showAddDiscounts" @on-ok="addDiscountsPolicy">
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

        <!-- 删除 -->
		<Modal class-name="modal-del" title="删除" v-model="modalShow.showDelMenu">
			<div class="message">您确定要删除 <span>规划</span> 吗？</div>
			<div class="btns" slot="footer">
				<Button type="error"  @click="comfirmDel">确定</Button>
				<Button @click="comfirmCancel">取消</Button>
			</div>
		</Modal>
        
    </div>
</template>
<script>

import subMenuItem from './subMenuItem';

export default {
    props:{
        data:{
            type:Object,
            default:function(){
                return {};
            }
        },
        edit:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {
            state:{
                visible:false
            },
            subMenuList:[
				{id:1,fname:'Elite',name:'当季',count:12},
				{id:2,fname:'Elite',name:'规划',count:15},
			],
            modalShow:{
				showAddDiscounts:false,
				showAddApplyState:false,
				showUpdateMenu:false,
				showDelMenu:false,
			},
            addApplyStateObj:{},
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
        };
    },
    computed:{
        foldcls(){
            return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
        }
    },
    components:{
        subMenuItem
    },
    // filters:{
    //     showText(isShow){
    //         if(isShow){
    //             return '显示';
    //         }
    //         return '隐藏';
    //     }
    // },
    methods:{
        toggleFold(){
            this.state.visible = !this.state.visible;
        },
        updateMenu(){
            this.$emit('onupdate',this.data);
        },
        delMenu(){
            this.$emit('ondel',this.data);
        },
        addDiscounts(){
            this.$emit('on-add-discounts',this.data);
        },
        addProductType(){
            this.$emit('on-add-product-type',this.data);
        },
        //开启模态框
       
        showAddDiscounts(data){
           this.addApplyStateObj = data;
            this.modalShow.showAddDiscounts = true;            
        },
        showAddApplyState(data){
           this.addApplyStateObj = data;
           this.modalShow.showAddApplyState = true;
            
        },
        showUpdateMenu(data){
            console.log(data);
            
        },
        showDelMenu(data){
            this.addApplyStateObj = data;
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
        addDiscountsPolicy(){

        },
        //添加申请类型
        addApplyState(){
            console.log('some operate');
            
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


