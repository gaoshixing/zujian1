<template>
  <div>
    <div class="groupTitle" :class="{unSpreadTit:!isSpreadCon}">
      <div class="titleInfo">
        <div class="editModule" :class="{hide: !isEdit}">
          <input class="ivu-input" v-model="groupInfo.name" maxLength=100 placeholder="group name" @blur="changeName">
        </div>
        <div class="showModule" :class="{hide: isEdit}">
          <span class="name">{{groupInfo.name}}</span>
          <div class="operateBox">
            <span class="operatebtn" @click="eidtGroupName"><Icon type="edit"></Icon></span>
            <span class="operatebtn" v-if="!!index" @click="deleteGroup"><Icon type="close-round"></Icon></span>
          </div>
          <div class="spreadBox" @click="spreadEvent">
              <span v-if="isSpreadCon"><Icon type="arrow-up-b"></Icon></span>
              <span v-else><Icon type="arrow-down-b"></Icon></span>
          </div>
          <div class="spreadBox s2">
              <Icon type="arrow-up-c" @click.native="goTop"></Icon>
          </div>
          <div class="spreadBox s3">
              <Icon type="arrow-down-c" @click.native="goDown"></Icon>
          </div>
          
        </div>
      </div>
    </div>
    <div class="userBox clearfix" :class="{hide:!isSpreadCon}">
      <div v-for="(item,index) in groupInfoUsers" :key="index">
        <userinfo :userInfo="item" @removeUser="removeUser(item,index)" @needreload="reLoadGroupInfo"  ></userinfo>
      </div>
      <div class="addUser">
        <Button type="primary" long @click="addUser">{{$t('AddUser')}}<Icon type="plus-round"></Icon></Button>
      </div>
    </div>
    <select-person :china="china" :group-info="groupInfo" ref="sPerson" @adduserInfo="adduserInfo"></select-person>
  </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import UserInfo from "./userInfo"
    import selectPerson from "./selectPerson"
    export default {
        props: [
          'groupInfo',
          'index',
          'parentId',
          'china'
        ],
        data(){
            return {
                isEdit:false,
                isSpreadCon:false
            }
        },
        mounted(){
            this.isNewGroup(this.groupInfo.newGroup);
            if(this.index==0){
                this.isSpreadCon=true;
            }
        },
        computed:{
            groupInfoUsers:function(){
                function compare(property){
                    return function(a,b){
                        var value1 = parseFloat(a[property]);
                        var value2 = parseFloat(b[property]);
                        return value2 - value1;
                    }
                }
                if(this.groupInfo.users && this.groupInfo.users instanceof Array){
                    return (this.groupInfo.users.sort(compare('leaderFlag')))
                }else{
                    return [];
                }
                
            }
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            isNewGroup(_new){
                if(_new){
                    this.isEdit=true; 
                }
            },
            goTop(){
                this.$emit('gotop',this.groupInfo,this.index,this.parentId);
            },
            goDown(){
                this.$emit('godown',this.groupInfo,this.index,this.parentId);
            },
            spreadEvent(){
                this.isSpreadCon=!this.isSpreadCon;
            },
            deleteGroup(){
              this.$emit('removeGroup',this.groupInfo);
            },
            eidtGroupName(){
              this.isEdit=true;
            },
            changeName(){
                if(this.groupInfo.name){
                    this.submitGroupInfo();
                } else {
                    if(this.groupInfo.id){
                        this.$emit('reLoadGroupInfo',()=>{
                            this.isEdit=false;
                        });
                        return this.$Message.warning('分组名不允许为空');
                    }
                    this.$emit('silentremove',this.groupInfo);
                }
            },
            submitGroupInfo(){
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.post(nozzle.xxGroup.save,{
                    parentId:_this.parentId,
                    id:_this.groupInfo.id,
                    groupName:_this.groupInfo.name
                }).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.isEdit=false;
                        if(!_this.groupInfo.id){
                            _this.groupInfo.id=json.data.id;
                        }
                    }).thenError(json=>{
                        _this.$emit('reLoadGroupInfo',()=>{
                            _this.isEdit=false;
                        });
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.isEdit=false;
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            removeUser(_data,_index) {
                var _this=this;
                this.updateLoadingStatus({isLoading:true});
                util.ajax.get(nozzle.xxGroup.deleteXxGroupUser,{params:{
                    groupId:_this.groupInfo.id,
                    id:_data.id,
                    userId:_data.userId
                }}).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                         _this.groupInfo.users.splice(_index,1);
                    }).autoRun("login","error");
                    _this.updateLoadingStatus({isLoading:false});
                }).catch(function(error) {
                    _this.updateLoadingStatus({isLoading:false});
                    util.checkAjaxError(error);
                });
            },
            adduserInfo(){
                this.reLoadGroupInfo();
                //this.groupInfo.users=_userInfoList;
            },
            reLoadGroupInfo(){
                this.$emit("reLoadGroupInfo");
            },
            addUser(){
                var _this=this;

                if(this.groupInfo.id){
                    this.$refs.sPerson.init();
                    this.$refs.sPerson.isShow = true;
                    /*

                    if(this.msgBox){
                        this.msgBox.$data.isShow=true;
                        this.msgBox.$data.groupInfoId=this.groupInfo.id;
                        if(this.groupInfo.users){
                            this.groupInfo.users.forEach(function(item){
                                _this.msgBox.$data.selectUserIdList.push(item.userId);
                                _this.msgBox.$data.checkedUserList.push(item);
                            });
                        }
                        this.msgBox.getOfficeList(this.groupInfo.id);
                        this.msgBox.getTreeData();
                    }

                    */
                }else{
                     this.$Message.info('请输入分组名称');
                }
            }
        },
        components: {
            'userinfo':UserInfo,
            selectPerson
        }
    }
</script>
<style scoped lang="less">
.groupTitle{
  border-top:1px solid #e0e0e0;
  text-align:center;
  .titleInfo{
    display: inline-block;
    min-width:260px;
    text-align:center;
    position:relative;
    top: -15px;
    .showModule{
      height: 32px;
      line-height:32px;
      padding: 0px 40px 0px 10px;
      background-color:#ededed;
      border:1px solid #e0e0e0;
      border-radius:4px;
      position: relative;
      text-align: left;
      .operateBox{
        position: absolute;
        right: 90px;
        top: 0;
        display: none;
        .operatebtn{
          display: inline-block;
          width: 20px;
          text-align:center;
          cursor: pointer;
          transition: all ease 200ms;
        }
        .operatebtn:hover{
          color:#44bcb7;
        }
      }
      .spreadBox{
          position: absolute;
          right: 60px;
          top: 0;
          width: 30px;
          height: 30px;
          color: #adadad;
          font-size: 14px;
          transition: all ease 200ms;
          border-left: 1px solid #e0e0e0;
          text-align: center;
          cursor: pointer;
          &:hover{
              color: #444;
          }
          &.s2{
              right: 30px;
          }
          &.s3{
              right: 0;
          }
      }
    }
  }
  .titleInfo:hover{
    .operateBox{
      display: block;
    }
  }
  &.unSpreadTit{
      margin-bottom: 20px;
  }
}
.userBox{
  padding:0px 20px 20px;
}
.addUser{
  float:left;
  width:176px;
  .ivu-btn{
    text-align:left;
  }
  .ivu-icon{
    float:right;
    position:relative;
    top: 4px;
  }
}
</style>
