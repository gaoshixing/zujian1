<style lang="less">
.clearfix{
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
    <Modal title="分配人员" v-model="rolepeople.visible" class-name="vertical-center-modal" width="730px">
        <div class="body">
            <div class="clearfix">
                <div class="select-box">
                    <p class="header">
                        <Input class="ss" icon="search" placeholder="人员搜索" @on-click="onPeopleSearch" @on-enter="onPeopleSearch" v-model="searchForm.text"></Input>
                    </p>
                    <div class="cbody">
                        <div>
                            <p class="s-item">归属公司</p>
                            <Select ref="company" v-model="searchForm.companyId" filterable clearable @on-change="clearSingleSelect('department')">
                                <Option v-for="item in facListData" :value="item.id" :key="item.id">{{ item.title }}</Option>
                            </Select>
                        </div>
                        <div>
                            <p class="s-item">归属部门</p>
                            <Select ref="department" v-model="searchForm.officeId" filterable clearable>
                                <Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.title }}</Option>
                            </Select>
                        </div>
                        <div>
                            <p class="s-item">岗位</p>
                            <Select ref="station" v-model="searchForm.jobId" filterable clearable>
                                <Option v-for="item in roleListData" :value="item.id" :key="item.id">{{item.label}}</Option>
                            </Select>
                        </div>
                        <div>
                            <p class="s-item">职能等级</p>
                            <Select v-model="searchForm.levelId" filterable clearable>
                                <OptionGroup :label="item.title" v-for="item in gradeListData" :key="item.id">
                                    <Option v-for="i in item.children" :value="i.id" :key="i.id">{{i.title}}</Option>
                                </OptionGroup>
                            </Select>
                        </div>
                        <div class="btncenter">
                            <Button type="primary" @click="doSearch">查询</Button>
                        </div>
                    </div>
                </div>
                <div class="waitfor-box">
                    <p class="header fr">
                        <span class="title">待分配</span>
                        <Checkbox v-model="checkleft" @on-change="selectLeft">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <template v-if="waitList.length">
                                <CheckboxGroup v-model="leftChecked">
                                    <Checkbox :label="item.name" v-for="item in waitList" :key="item.id" :value="item.id"></Checkbox>
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
                        <span class="title">已分配</span>
                        <Checkbox v-model="checkright" @on-change="selectRight">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <template v-if="assigndUser.length">
                                <CheckboxGroup v-model="rightChecked">
                                    <Checkbox :label="item.name" v-for="item in assigndUser" :key="item.id" :value="item.id"></Checkbox>
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
import valid,{errors,loadJobTree,listJobTree,getUserList,listUnAssignUserMap,listAssigndUserMap,buildSearchTree,updateUserRole} from "../libs/request.js";
import {mapMutations} from 'vuex';

export default {
    props:{
        appmenu:{
            type:Object,
            default:function(){
                return {

                };
            }
        },
        role:{
            type:Object,
            default:function(){
                return {

                };
            }
        }
    },
    data(){
        return {
            rolepeople:{
                visible:false,      
            },
            searchForm:{
                text:'',
                companyId:'',
                officeId:'',
                jobId:'',
                levelId:''
            },
            userList:[],
            assigndUser:[],
            leftChecked:[],
            rightChecked:[],
            checkleft:false,
            checkright:false,
            gradeListData:[],
            roleListData:[],
            facListData:[],
        };
    },
    computed:{
        waitList(){
            return this.userList.filter(item=>this.targetIds.indexOf(item.id)<0);
        },
        sourceIds(){
            return this.userList.map(item=>item.id);
        },
        targetIds(){
            return this.assigndUser.map(item=>item.id);
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
            this.tryGetGradeList();
            this.tryGetRoleList();
            this.tryGetFacTree();
        },
        selectLeft(){
            if(this.checkleft){
                this.leftChecked=this.userList.map(item=>item.name);
            } else {
                this.leftChecked = [];
            }
        },
        selectRight(){
            if(this.checkright) {
                this.rightChecked=this.assigndUser.map(item=>item.name);
            } else {
                this.rightChecked = [];
            }
        },
        show(){
            this.initPage();
            this.rolepeople.visible = true;
        	this.$refs.company.clearSingleSelect();
            this.reset();
            this.$nextTick(this.listAssigndUser);
        },
        reset(){
            this.leftChecked=[];
            this.rightChecked=[];
            this.userList=[];
            this.checkleft=false;
            this.checkright=false;
            this.searchForm={
                companyId:'',
                officeId:'',
                jobId:'',
                levelId:''
            };
        },
        toadd(){
            let items=[];
            for(let i in this.userList) {
                let item = this.userList[i];
                if(this.leftChecked.indexOf(item.name)>-1) {
                    items.push(item);
                }
            }
            if(items.length){
                this.moveToRight(items);
            }
            this.leftChecked=[];
            this.checkleft = false;
        },
        toremove(){
            let items=[];
            for(let i in this.assigndUser) {
                let item = this.assigndUser[i];
                if(this.rightChecked.indexOf(item.name)>-1) {
                    items.push(item)
                }
            }
            if(items.length){
                this.moveToLeft(items);
            }
            this.rightChecked=[];
            this.checkright = false;
        },
        moveToLeft(items){
            let ids = items.map(item=>item.id);
            items.forEach(item=>{
                if(this.sourceIds.indexOf(item)<0){
                    this.userList.push(item);
                }
            });
            this.assigndUser = this.assigndUser.filter(item=>ids.indexOf(item.id)<0);
        },
        moveToRight(items){
            let ids = items.map(item=>item.id);
            items.forEach(item=>{
                if(this.targetIds.indexOf(item)<0){
                    this.assigndUser.push(item);
                }
            });
            this.userList = this.userList.filter(item=>ids.indexOf(item.id)<0);
        },
        listAssigndUser(){
            this.updateLoadingStatus({isLoading: true});
            listAssigndUserMap({'role.id':this.role.id}).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.assigndUser = res.data.data;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading: false});
            });
        },
        doSearch(){
            let param = {
                'role.id':this.role.id
            };
            if(this.searchForm.levelId) {
                param['level'] = this.searchForm.levelId;
            }
            if(this.searchForm.jobId) {
                param['job.id'] = this.searchForm.jobId;
            } 
            if(this.searchForm.officeId) {
                param['office.id'] = this.searchForm.officeId;
            }
            if(this.searchForm.companyId) {
                param['company.id'] = this.searchForm.companyId;
            }
            this.searchData(param);
        },
        btnYes(){
            let userList=[];
            this.assigndUser.forEach(item=>{
                userList.push({id:item.id});
            });
            let param = {
                userList:JSON.stringify(userList),
                roleId:this.role.id
            };
            updateUserRole(param).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.btnClose();
                    this.$emit('fresh',this.role);
                }
            }).catch(errors.call(this));
        },
        btnClose(){
            this.rolepeople.visible = false;
            this.$emit('fresh',this.role);
        },
        onPeopleSearch(){
            let param={
                name:this.searchForm.text,
                'role.id':this.role.id
            };
            this.searchData(param);
        },
        searchData(param){
            this.updateLoadingStatus({isLoading: true});
            listUnAssignUserMap(param).then(valid.call(this)).then(res=>{
                this.userList = res.data.data;
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        tryGetGradeList(){ //  职能等级的下拉数据
            if(!this.gradeListData.length){
                loadJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.gradeListData = res.data.data.children;
                        console.log(this.gradeListData);
                    }
                }).catch(errors.call(this));
            }
        },
        tryGetRoleList(){ //  岗位的下拉数据
            if(!this.roleListData.length){
                listJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.roleListData = res.data.data;
                    }
                }).catch(errors.call(this));
            }
        },
        tryGetFacTree(){
            if(!this.facListData.length){
                buildSearchTree().then(valid.call(this)).then(res=>{
                    if(res.ok) {
                        this.facListData = res.data.data.children;
                    }
                }).catch(errors.call(this));
            }
        },
        clearSingleSelect(name){
        	this.$refs[name].clearSingleSelect();
        	this.$refs.station.clearSingleSelect();
        	
        }
    }
}
</script>


