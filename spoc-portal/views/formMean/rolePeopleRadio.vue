<style lang="less">
.clearfix{
    text-align: center;
    .header{
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        background-color: #fafafa;
        // border-bottom: 1px solid #e0e0e0;
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
        position: relative;
        width: 160px;
        height: 375px;
        float: left;
        box-sizing: border-box;
        border-radius: 3px 0 0 3px;
        border: 1px solid #e0e0e0;
        border-right: none;
        .cbody{
            padding: 9px;
        }
        .btncenter{
            width: 140px;
            text-align: center;
            position: absolute;
            bottom: 0;
            padding-top: 18px;
            button{
                width: 100%;
            }
        }
    }
    .waitfor-box{
        width: 344px;
        height: 375px;
        float: left;
        box-sizing: border-box;
        border-radius: 0 3px 3px 0;
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
            text-align: right;
            padding-right: 15px;
        }
    }
    .selected-box{
        width: 334px;
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
    <Modal :title="title" v-model="rolepeople.visible" class-name="vertical-center-modal" width="730px">
        <div class="body">
            <div class="clearfix">
                <!-- <div class="select-box" >
                    <p class="header">
                        <Input class="ss" icon="search" placeholder="人员搜索" @on-click="onPeopleSearch" @on-enter="onPeopleSearch" v-model="searchForm.text"></Input>
                    </p>
                    <div class="cbody">
                        <div class="btncenter">
                            <Button type="primary" @click="doSearch">查询</Button>
                        </div>
                    </div>
                </div> -->
                <div :class="{'waitfor-box':true,}">
                    <p class="header fr">
                        <span class="title">{{allPeople}}</span>
                        <Checkbox v-model="checkleft" @on-change="selectLeft" v-if="!onlyChoseOne">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <p class="header">
                                <Input class="ss" icon="search" placeholder="人员搜索" @on-click="onPeopleSearch" @on-enter="onPeopleSearch" v-model="searchForm.text"></Input>
                            </p>
                            <template v-if="waitList.length">
                            
                                <RadioGroup v-model="leftChecked" v-if="onlyChoseOne">
                                    <Radio :label="item.cnname" v-for="item in waitList" :key="item.id" :value="item.id"></Radio>
                                </RadioGroup>
                                <CheckboxGroup v-model="leftChecked" v-else>
                                    <Checkbox :label="item.cnname" v-for="item in waitList" :key="item.id" :value="item.id"></Checkbox>
                                </CheckboxGroup>

                            </template>
                            <!-- <template v-else>
                                <p>暂无数据</p>
                            </template> -->
                        </div>
                    </div>
                    <div class="footer">
                        <Button type="ghost" @click="toadd">添加 <i class="iconfont icon-youjiantou"></i> </Button>
                    </div>
                </div>
                <div :class="{'selected-box':true,}">
                    <p class="header fr">
                        <span class="title">{{selectPeople}}</span>
                        <Checkbox v-model="checkright" @on-change="selectRight" v-if="!onlyChoseOne">全选</Checkbox>
                    </p>
                    <div class="content">
                        <div class="clearfix">
                            <template v-if="assigndUser.length">
                                <RadioGroup  v-model="rightChecked" v-if="onlyChoseOne">
                                    <Radio :label="item.cnname" v-for="item in assigndUser" :key="item.id" :value="item.id"></Radio>
                                </RadioGroup>
                                <CheckboxGroup v-model="rightChecked" v-else>
                                    <Checkbox :label="item.cnname" v-for="item in assigndUser" :key="item.id" :value="item.id"></Checkbox>
                                </CheckboxGroup>
                            </template>    
                            <!-- <template v-else>
                                <p>暂无数据</p>
                            </template> -->
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
import valid,{errors,sys,docuLibrarySearch} from "../../libs/request.js";
import {mapMutations} from 'vuex';

export default {
    props:{
        title: {
            default: '分配人员'
        },
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

        searchType: {
            type: String,
            default: 'school'
        },

        allPeople: {
            type: String,
            default: '所有人员列表'   
        },

        selectPeople: {
            type: String,
            default: '已选人员列表'   
        }

    },
    data(){
        return {
            rolepeople:{
                visible:false,
                checkedVisible: false,    
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
            selectedId:''
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
        // officeList(){
        //     for(let i in this.facListData) {
        //         let item =this.facListData[i];
        //         if(item.id == this.searchForm.companyId) {
        //             return item.children||[];
        //         }
        //     }
        //     return [];
        // }
    },
    created(){
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        initPage(){
            // this.tryGetGradeList();
            // this.tryGetRoleList();
            // this.tryGetFacTree();
        },
        selectLeft(){
            if(this.checkleft){
                const t = this.userList.map(item=>item.cnname);
                if(this.onlyChoseOne){
                    this.leftChecked=t.join('');
                } else {
                    this.leftChecked=t;
                }
            } else {
                this.leftChecked = this.onlyChoseOne?'':[];
            }
        },
        selectRight(){
            if(this.checkright) {
                const t = this.assigndUser.map(item=>item.cnname);
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
            // this.initPage();
            this.$nextTick(this.listAssigndUser);
        },
        reset(){
            this.leftChecked=this.onlyChoseOne?'':[];
            this.rightChecked=this.onlyChoseOne?'':[];
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
                if(this.leftChecked.indexOf(item.cnname)>-1) {
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
            for(let i in this.assigndUser) {
                let item = this.assigndUser[i];
                if(this.rightChecked.indexOf(item.cnname)>-1) {
                    items.push(item)
                }else if(this.rightChecked.indexOf(item.cnname)==-1){
                	arr.push(item)
                }
            }
            this.assigndUser=arr;
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
            /*
            * 控制选中的人数 只有一个
            */
            this.onlyChoseOne && this.assigndUser.length >= 2 ? this.userList.unshift(this.assigndUser.shift()) : this.assigndUser;
            this.userList = this.userList.filter(item=>ids.indexOf(item.id)<0);
        },
        listAssigndUser(){//已添加人员
            this.updateLoadingStatus({isLoading: true});
            let params={
            	ids:this.selectedId
            }
            sys.findByIds(params).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.assigndUser = res.data.data;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading: false});
            });
        },
        doSearch(){
            this.searchData();
        },
        btnYes(){
            this.rolepeople.visible = false;
            this.$emit('fresh',this.assigndUser);
        },
        btnClose(){
            this.rolepeople.visible = false;
        },
        onPeopleSearch(){
            this.searchData();
        },
        searchData(){
            if(this.searchType == 'school') {
                this.searchSchool()
                return
            }

            if(this.searchType == 'major') {
                this.searchMajor()
            }
        	
        },
        searchSchool() {
            let obj = {
               schoolName: this.searchForm.text
            }
            this.updateLoadingStatus({isLoading: true});
            //  docuLibrarySearch.schoolSearch(obj).then(valid.call(this)).then(res=>{
            //     this.userList = res.data.data;
            //     console.log(this.userList)
            // }).catch(errors.call(this)).finally(()=>{
            //     this.updateLoadingStatus({isLoading:false});
            // });
        },

        searchMajor() {

        }
        // tryGetGradeList(){ //  职能等级的下拉数据
        //     if(!this.gradeListData.length){
        //         sys.loadJobTree().then(valid.call(this)).then(res => {
        //             if (res.ok) {
        //                 this.gradeListData = res.data.data.children;
        //                 console.log(this.gradeListData);
        //             }
        //         }).catch(errors.call(this));
        //     }
        // },
        // tryGetRoleList(){ //  岗位的下拉数据
        //     if(!this.roleListData.length){
        //         sys.listJobTree().then(valid.call(this)).then(res => {
        //             if (res.ok) {
        //                 this.roleListData = res.data.data;
        //             }
        //         }).catch(errors.call(this));
        //     }
        // },
        // tryGetFacTree(){
        //     if(!this.facListData.length){
        //         sys.buildSearchTree().then(valid.call(this)).then(res=>{
        //             if(res.ok) {
        //                 this.facListData = res.data.data.children;
        //             }
        //         }).catch(errors.call(this));
        //     }
        // }
    },
	watch: {
		selected:{
			handler:function(){
                    this.selectedId = this.selected;
                    this.listAssigndUser();
			},
			deep:true
		}
	}
}
</script>


