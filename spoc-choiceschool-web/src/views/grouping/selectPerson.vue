<template v-if="isShow">
<Modal
	width = "800"
	class-name="addUserBox"
    v-model="isShow"
    :title="$t('AddUser')"
    @on-ok="ensureAdd"
    @on-cancel="cancelAdd">
    <div class="selectBox clearfix">
        <div class="module">
            <div class="title">{{$t('SelectDepartmentStaff')}}</div>
            <div class="contentBox">
                <div class="departMentBox">
                    <div class="searchBox">
                        <Input v-model="searchUserNames"></Input>
                    </div>
                    <div class="barBox">
                        <span class="name">藤门国际</span>
                        <span class="arrow">></span>
                        <Dropdown @on-click="changeCompany">
                           <a href="javascript:void(0)">
                               {{curCompany}}
                               <Icon type="arrow-down-b"></Icon>
                           </a>
						   <Dropdown-menu slot="list">
                               <Dropdown-item v-for="item in companyList" :key="item.id" :name="item.id">{{item.name}}</Dropdown-item>
                           </Dropdown-menu>
                       </Dropdown>
                        <Checkbox :value="checkAll" class="checkAllBox" @click.prevent.native="handleCheckAll">{{$t('CheckAll')}}</Checkbox>
                        <Checkbox-group v-model="selectUserIdList" @on-change="checkAllGroupChange">
                            <ul class="alluserBox">
                                <li v-for="item in filterUserList" :key="item.userId">
                                    <Checkbox :label="item.userId">{{item.name}}</Checkbox>
                                </li>
                            </ul>
                        </Checkbox-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="module">
            <div class="title">{{$t('SelectedPersonnel')}}</div>
            <div class="contentBox">
                <ul class="userBox">
                    <li class="checkedUserList" v-for="(item,index) in distUserDataList" :key="index">
                        <img class="pic" :src="item.photo">
                        <span class="name">{{item.name}}</span>
                        <!-- <span class="delete" @click="deleteUser(index,item)"><Icon type="close-round"></Icon></span> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</Modal>
</template>

<script>
import {mapMutations} from 'vuex';
import util from '../../libs/js/util.js';
import nozzle from "../../libs/interface.js";
let userMap={};
function updateUserMap(data)
{
    data.forEach(item=>{
        userMap[item.userId]=item;
    });
}

export default {
    props: [
        'china',
        'groupInfo'
    ],
    data() {
        return {
			searchUserNames:"",
            isShow:false,
            officeId:"",
            curCompany: "",
            companyList: [],
            departMentUserList: [],
            selectUserIdList:[],

            checkAll:false,
        }
    },
	computed:{
		filterUserList() {
		   var search = this.searchUserNames;
		   if (search) {
			   return this.departMentUserList.filter(function(product) {
				   return Object.keys(product).some(function(key) {
					   return String(product[key]).toLowerCase().indexOf(search) > -1
				   })
			   })
		   }
		   return this.departMentUserList;
       },
       selectUserDataList(){
           return this.selectUserIdList.map(id=>{
               return userMap[id];
           });
       },
       distUserDataList(){
           return (this.groupInfo.users||[]).concat(this.selectUserDataList);
       },
       distUserIdList(){
           return this.distUserDataList.map(item=>item.userId);
       }
	},
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        init(){
            this.selectUserIdList=[];
            this.searchUserNames="";
            this.checkAll = false;
            this.getOfficeList();
        },
        changeCompany(name){//改变部门
            var _this=this;
            this.officeId=name;
            this.companyList.forEach(function(item){
                if(item.id==name){
                    _this.curCompany=item.name;
                    return false;
                }
            })
            this.getTreeData();
        },
        ensureAdd(){//确定添加
            var _this=this;
            var userData={};
            userData.groupId=_this.groupInfo.id;
            userData.userIds=_this.distUserIdList.join(",");
			this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxGroup.batchsaveXxGroupUser,userData).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.$emit("adduserInfo");
                    _this.isShow=false;
                }).autoRun("login","error");
				_this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
				_this.updateLoadingStatus({isLoading:false});
				util.checkAjaxError(error);
            });
        },
        cancelAdd(){
            this.isShow=false;
        },
        getOfficeList(){//获取机构树
            var _this=this;
			this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxGroup.treeAddUserOffice,{params:{
                groupId:this.groupInfo.id
            }}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    let base = _this.china?[{id:0,name:'全部'}]:[];
                    _this.companyList = base.concat(json.data.allCompany);
                    if(_this.companyList[0]){
                        _this.curCompany=_this.companyList[0].name;
                        _this.officeId=_this.companyList[0].id;
                        _this.getTreeData();
                    }
                }).autoRun("login","error");
            }).catch(function(error) {
				_this.updateLoadingStatus({isLoading:false});
				util.checkAjaxError(error);
            });
        },
        getTreeData(){
            var _this=this;
			this.updateLoadingStatus({isLoading:true});
            const params = {
                groupId:this.groupInfo.id
            };
            if (this.officeId!=0){
                params.officeId=this.officeId
            }
            util.ajax.get(nozzle.xxGroup.treeAddUserData,{params}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.departMentUserList=json.data.allOffice;
                    updateUserMap(_this.departMentUserList);
                    _this.checkAll = false;
                }).autoRun("login","error");
				_this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
				_this.updateLoadingStatus({isLoading:false});
				util.checkAjaxError(error);
            });
        },
       
        handleCheckAll(){
            this.checkAll =!this.checkAll;
            if(this.checkAll){
                this.filterUserList.forEach(item=>{
                    if(this.selectUserIdList.indexOf(item.userId)<0){
                        this.selectUserIdList.push(item.userId);
                    }
                });
            } else {
                this.filterUserList.forEach(item=>{
                    let index = this.selectUserIdList.indexOf(item.userId);
                    if(index>-1){
                        this.selectUserIdList.splice(index,1);
                    }
                });
            }
			this.checkAllGroupChange();
        },
        checkAllGroupChange(){
        },
    },
}
</script>
<style scoped lang="less">
.selectBox {
    .module {
        width: 48%;
        float: left;
        margin-right: 2%;
        .title {
            font-size: 14px;
        }
        .contentBox {
            margin-top: 10px;
            min-height: 300px;
            width: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 3px;
            .departMentBox {
                padding: 10px;
                .barBox {
                    margin-top: 10px;
                    .name {
                        line-height: 24px;
                        color: #222;
                    }
                    .arrow {
                        margin: 0 2px;
                    }
                    .checkAllBox{
                        float:right;
                        position: relative;
                        top: 3px;
                    }
                }
            }
            .alluserBox{
                margin-top: 10px;
                height: 260px;
                overflow: auto;
                li{
                    display: inline-block;
                    width: 110px;
                    margin-bottom: 10px;
                }
            }
            .userBox{
                overflow: auto;
                height: 357px;
                .checkedUserList{
                    padding: 5px 10px;
                    height: 40px;
                    .pic{
                        width:30px;
                        height: 30px;
                        float:left;
                    }
                    .name{
                        float:left;
                        margin-left:5px;
                        line-height:30px;
                    }
                    .delete{
                        text-align:right;
                        width:30px;
                        display: none;
                        float:right;
                        line-height:30px;
                        cursor:pointer;
                    }
                }
                .checkedUserList:hover{
                    background:#f5f5f5;
                    .delete{
                        display: block;
                    }
                }
            }
        }
    }
    .module:last-child {
        margin-right: 0;
    }
}
</style>
