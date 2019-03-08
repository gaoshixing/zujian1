<style lang="less">
.role-office{
    .header{
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        background-color: #fafafa;
        border-bottom: 1px solid #e0e0e0;
        &.fr{
            text-align: right;
            padding-right: 6px;
        }
        .ss{
            line-height: normal;
            width: 90%;
            margin-top: -2px;
        }
        .title{
            float: left;
            margin-left: 15px;
        }
    }
    .select-box{
        width: 160px;
        height: 375px;
        float: left;
        box-sizing: border-box;
        border-radius: 3px 0 0 3px;
        border: 1px solid #e0e0e0;
        .cbody{
            padding: 9px;
            .s-item{
                margin-top: 3px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
            }
        }
        .btncenter{
            text-align: center;
            padding-top: 18px;
            button{
                width: 100%;
            }
        }
    }
    .waitfor-box{
        width: 264px;
        height: 375px;
        float: left;
        box-sizing: border-box;
        border-radius: 0 3px 3px 0;
        border: 1px solid #e0e0e0;
        border-left: none;
        position: relative;
        .content{
            padding: 8px;
            height: 280px;
            overflow: auto;
        }
        .footer{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #e0e0e0;
            text-align: right;
            padding-right: 15px;
        }
    }
    .selected-box{
        width: 254px;
        height: 375px;
        float: right;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #e0e0e0;
        position: relative;
        .content{
            padding: 8px;
            height: 280px;
            overflow: auto;
        }
        .footer{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #e0e0e0;
            padding-left: 15px;
        }
    }
    .footer{
        .iconfont{
            width: 10px;
            font-size: 12px;
        }
    }
}

</style>
<template>
    <Modal title="选择部门" v-model="rolepeople.visible" class-name="vertical-center-modal role-office" width="730px">
        <div class="body">
            <div class="clearfix">
                <div class="select-box">
                    <p class="header">
                    </p>
                    <div class="cbody">
                        <div>
                            <p class="s-item">归属公司</p>
                            <Select v-model="searchForm.companyId" filterable clearable>
                                <Option v-for="item in facListData" :value="item.id" :key="item.id">{{ item.title }}</Option>
                            </Select>
                        </div>
                        <div>
                            
                        </div>
                        <div class="btncenter">
                            <Button type="primary" @click="doSearch">查询</Button>
                        </div>
                    </div>
                </div>
                <div class="waitfor-box">
                    <p class="header fr">
                        <span class="title">待选择部门</span>
                        <Checkbox v-model="checkleft" @on-change="selectLeft" v-if="!onlyChoseOne">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <template v-if="waitList.length">
                            
                                <RadioGroup v-model="leftChecked" v-if="onlyChoseOne">
                                    <Radio :label="item.title" v-for="item in waitList" :key="item.id" :value="item.id"></Radio>
                                </RadioGroup>
                                <CheckboxGroup v-model="leftChecked" v-else>
                                    <Checkbox :label="item.title" v-for="item in waitList" :key="item.id" :value="item.id"></Checkbox>
                                </CheckboxGroup>

                            </template>
                            <template v-else>
                                <p>暂无数据</p>
                            </template>
                        </div>
                    </div>
                    <div class="footer">
                        <Button type="ghost" @click="toadd">添加 <i class="iconfont icon-youjiantou"></i> </Button>
                    </div>
                </div>
                <div class="selected-box">
                    <p class="header fr">
                        <span class="title">已选择部门</span>
                        <Checkbox v-model="checkright" @on-change="selectRight" v-if="!onlyChoseOne">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <template v-if="assigndLists.length">
                                <RadioGroup  v-model="rightChecked" v-if="onlyChoseOne">
                                    <Radio :label="item.title" v-for="item in assigndLists" :key="item.id" :value="item.id"></Radio>
                                </RadioGroup>
                                <CheckboxGroup v-model="rightChecked" v-else>
                                    <Checkbox :label="item.title" v-for="item in assigndLists" :key="item.id" :value="item.id"></Checkbox>
                                </CheckboxGroup>
                            </template>    
                            <template v-else>
                                <p>暂无数据</p>
                            </template>
                        </div>
                    </div>
                    <div class="footer">
                        <Button type="ghost" @click="toremove"> <i class="iconfont icon-zuojiantou"></i> 移除</Button>
                    </div>
                </div> 
            </div>
        </div>
        <div slot="footer">
            <Button @click="btnClose">取消</Button>
            <Button type="primary" @click="btnYes">确定</Button>
        </div>
    </Modal>
</template>
<script>
import valid,{errors,sys} from "../libs/request.js";
import {mapMutations} from 'vuex';

export default {
    props:{
        role:{
            default:function(){
                return {

                };
            }
        },
        selected:{
            default:function(){
                return '';
            }
        },
        onlyChoseOne: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            rolepeople:{
                visible:false,
            },
            searchForm:{
                companyId:'',
            },
            officeLists:[], // 当前部门列表

            assigndLists:[], // 已选择的
            leftChecked:this.onlyChoseOne?'':[],
            rightChecked:this.onlyChoseOne?'':[],
            checkleft:false,
            checkright:false,
            facListData:[],
            selectedId:''
        };
    },
    computed:{
        waitList(){
            return this.officeLists.filter(item=>this.targetIds.indexOf(item.id)<0);
        },
        sourceIds(){
            return this.officeLists.map(item=>item.id);
        },
        targetIds(){
            return this.assigndLists.map(item=>item.id);
        },
        officeList(){
            for(let i in this.facListData) {
                let item =this.facListData[i];
                if(item.id == this.searchForm.companyId) {
                    return item.children||[];
                }
            }
            return [];
        }
    },
    created(){
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        initPage(){
            this.tryGetFacTree();
        },
        selectLeft(){
            if(this.checkleft){
                const t = this.officeLists.map(item=>item.title);
                if(this.onlyChoseOne){
                    this.leftChecked=t.join('');
                } else {
                    this.leftChecked= t;
                }
            } else {
                this.leftChecked = this.onlyChoseOne?'':[];
            }
        },
        selectRight(){
            if(this.checkright) {
                const t = this.assigndLists.map(item=>item.title);
                if(this.onlyChoseOne){
                    this.rightChecked=t.join('');
                } else {
                    this.rightChecked=t;
                }
            } else {
                this.rightChecked = this.onlyChoseOne?'':[];
            }
        },
        show(){
            this.rolepeople.visible = true;
            this.reset();
            this.initPage();
        },
        reset(){
            this.leftChecked=this.onlyChoseOne?'':[];
            this.rightChecked=this.onlyChoseOne?'':[];
            this.officeLists=[];
            this.checkleft=false;
            this.checkright=false;
            this.searchForm={
                companyId:'',
            };
        },
        toadd(){
            let items=[];
            for(let i in this.officeLists) {
                let item = this.officeLists[i];
                if(this.leftChecked.indexOf(item.title)>-1) {
                    items.push(item);
                }
            }
            if(items.length){
                this.moveToRight(items);
            }
            this.leftChecked=this.onlyChoseOne?'':[];
            this.checkleft = false;
        },
        toremove(){
            let items=[];
            let arr=[];
            for(let i in this.assigndLists) {
                let item = this.assigndLists[i];
                if(this.rightChecked.indexOf(item.title)>-1) {
                    items.push(item)
                }else if(this.rightChecked.indexOf(item.title)==-1){
                	arr.push(item)
                }
            }
            this.assigndLists=arr;
            if(items.length){
                this.moveToLeft(items);
            }
            this.rightChecked=this.onlyChoseOne?'':[];
            this.checkright = false;
        },
        moveToLeft(items){
            let ids = items.map(item=>item.id);
            items.forEach(item=>{
                if(this.sourceIds.indexOf(item)<0){
                    this.officeLists.push(item);
                }
            });
            this.assigndLists = this.assigndLists.filter(item=>ids.indexOf(item.id)<0);
        },
        moveToRight(items){
            let ids = items.map(item=>item.id);
            items.forEach(item=>{
                if(this.targetIds.indexOf(item)<0){
                    this.assigndLists.push(item);
                }
            });
            /*
            * 控制选中的人数 只有一个
            */
            this.onlyChoseOne && this.assigndLists.length >= 2 ? this.officeLists.unshift(this.assigndLists.shift()) : this.assigndLists;
            this.officeLists = this.officeLists.filter(item=>ids.indexOf(item.id)<0);
        },
        doSearch(){
            this.officeLists = this.officeList;
        },
        btnYes(){
            this.rolepeople.visible = false;
            this.$emit('fresh',this.assigndLists);
        },
        btnClose(){
            this.rolepeople.visible = false;
        },
        tryGetFacTree(){
            if(!this.facListData.length){
                sys.buildSearchTree().then(valid.call(this)).then(res=>{
                    if(res.ok) {
                        this.facListData = res.data.data.children;
                    }
                }).catch(errors.call(this));
            }
        }
    },
	
}
</script>


