<template>
  <div>
    <div class="groupTitle" :class="{unSpreadTit:!isSpreadCon}">
      <div class="titleInfo">
        <div class="editModule" :class="{hide: !isEdit}">
          <input class="ivu-input" v-model="groupInfo.name" maxLength=10 placeholder="group name" @blur="changeName">
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
          <div class="spreadBox1" @click="orderGroup('down')">
              <span><Icon type="arrow-down-c"></Icon></span>
          </div>
          <div class="spreadBox2" @click="orderGroup('up')">
              <span><Icon type="arrow-up-c"></Icon></span>
          </div>
          <div class="spreadBox3" @click="syncGroup" title="同步分组">
               <span><Icon class="iconfont icon-tongbu"></Icon></span>
          </div>
          <div class="spreadBox4" @click="allgroupChange" title="全组交接">
               <span><i class="iconfont icon-quanzujiaojie"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="userBox clearfix" :class="{hide:!isSpreadCon}">
      <div v-for="(item,index) in groupInfoUsers" :key="index">
        <userinfo :menuId='menuId' :isShowCheck='isShowCheck' :userInfo="item" :groupInfo="groupInfo" @removeUser="removeUser(item,index)" @updataTree="updataTree" @reLoadGroupInfo="reLoadGroupInfo"></userinfo>
      </div>
      <div class="addUser">
        <Button type="primary" long @click="addUser">{{$t('AddUser')}}<Icon type="plus-round"></Icon></Button>
      </div>
      <!-- <Button type="primary" style="float:left; margin-left:25px" @click="syncGroup">同步分组</Icon></Button> -->
    </div>
    <select-person :menuId='menuId' :china="china" :group-info="groupInfo" ref="sPerson" @adduserInfo="adduserInfo"></select-person>
    <Modal
        v-model="modal1"
        :loading="loading"
        title="全组交接"
        width=400
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="全组交接目标：" prop="changeGroup">
                <Select filterable v-model="formValidate.changeGroup" style="width:200px">
                    <Option v-for="item in groupList" :value="item.id" :key="item.id" v-show="item.id != groupInfo.id ">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import UserInfo from "./userInfo";
    import selectPerson from "./selectPerson";
    import valid,{errors,common} from '../../libs/request.js';
    export default {
        props: [
          'groupInfo',
          'index',
          'isShowCheck',
          'parentId',
          'china',
          'menuId'
        ],
        data(){
            return {
                formValidate: {
                    changeGroup: '',
                },
                ruleValidate: {
                    changeGroup: [
                        { required: true, message: '请选择交接目标组', trigger: 'change' }
                    ],
                },
                modal1: false,
                loading: true,
                groupList: [],
                isEdit:false,
                isSpreadCon:false,
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
            allgroupChange(){
                common.findGroupNameByMenu({
                    menuId:this.menuId,
                    officeId: this.groupInfo.officeId
                }).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        this.groupList = res.data.data
                        this.modal1 = true
                    }
                }).catch(errors.call(this));
            },
            reLoadGroupInfo(){
                this.$emit('reLoadGroupInfo')
            },
            ok(){
                this.$refs.formValidate.validate((validRes) => {
                    console.log("validRes == " + validRes)
                    if (validRes) {
                        this.$Modal.confirm({
                            title: '确认全组交接',
                            content: '您是否确认确认全组交接？',
                            onOk: () => {
                                common.allGroupHandOver({
                                    oldGroupId: this.groupInfo.id, // 原工作组编号
                                    newGroupId: this.formValidate.changeGroup, // 目标工作组编号
                                    menuId: this.menuId // 模块ID
                                }).then(valid.call(this)).then(res=>{
                                    if(res.ok){
                                        this.modal1 = false
                                        this.$emit('reLoadGroupInfo')
                                    }
                                }).catch(errors.call(this));
                            },
                            onCancel: () => {
                                this.modal1 = true
                                this.loading = false
                                setTimeout(()=>{
                                    this.loading = true
                                },0)
                            }
                        });
                    } else {
                        this.modal1 = true
                        this.loading = false
                        setTimeout(()=>{
                             this.loading = true
                        },0)
                    }
                })
            },
            cancel(){
                this.$refs.formValidate.resetFields();
            },
            isNewGroup(_new){
                if(_new){
                    this.isEdit=true; 
                }
            },
            spreadEvent(){
                this.isSpreadCon=!this.isSpreadCon;
            },
            deleteGroup(){
              this.$emit('removeGroup',this.groupInfo);
            },
            eidtGroupName(){
                this.$emit('editGroup',this.groupInfo);
            //   this.isEdit=true;
            },
            changeName(){
                // if(this.groupInfo.name){
                //     this.submitGroupInfo();
                // } else {
                //     if(this.groupInfo.id){
                //         this.$emit('reLoadGroupInfo',()=>{
                //             this.isEdit=false;
                //         });
                //         return this.$Message.warning('分组名不允许为空');
                //     }
                //     this.$emit('silentremove',this.groupInfo);
                // }
            },
            submitGroupInfo(val, cId, isAdd){
                var _this=this;
                let obj = {
                    parent:_this.parentId,
                    menuId: this.menuId,
                    // name:_this.groupInfo.name
                    name: val,
                    officeId: cId,
                }
                if(isAdd) {
                    obj = Object.assign(obj, {
                        id:_this.groupInfo.id,
                    })
                }
                this.updateLoadingStatus({isLoading:true});
                util.ajax.post(nozzle.xxGroup.save, obj).then(function(res){
                    util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.isEdit=false;
                        if(!_this.groupInfo.id){
                            _this.groupInfo.id=json.data.id;
                        }
                        _this.$emit('upTree')
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
                this.$emit("reLoadGroupInfo");
                //this.groupInfo.users=_userInfoList;
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
            },

            orderGroup(val) {
                if(val == 'down')  this.$emit('orderGroupDown')
                if(val == 'up') this.$emit('orderGroupUp')
            },

            updataTree() {
                this.$emit('updataTree')
            },
            syncGroup() {
                this.$emit('syncGroup', this.groupInfo.id)
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
    min-width:340px;
    text-align:center;
    position:relative;
    top: -15px;
    .showModule{
      height: 32px;
      line-height:32px;
      padding: 0px 150px 0px 10px;
      background-color:#ededed;
      border:1px solid #e0e0e0;
      border-radius:4px;
      position: relative;
      .operateBox{
        position: absolute;
        right: 150px;
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
      .spreadBox, .spreadBox1, .spreadBox2, .spreadBox3, .spreadBox4 {
          position: absolute;
          right: 120px;
          top: 0;
          width: 30px;
          height: 30px;
          color: #adadad;
          font-size: 14px;
          transition: all ease 200ms;
          border-left: 1px solid #e0e0e0;
          cursor: pointer;
          &:hover{
              color: #444;
          }
      }
      .spreadBox1{
          right: 90px;
      }
      .spreadBox2{
          right: 60px;
      }
      .spreadBox3{
          right: 30px;
      }
      .spreadBox4{
          right: 00px;
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
