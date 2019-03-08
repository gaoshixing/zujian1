<template>
  <div class="userList" :class="{checkStatus: userInfo.checkFlag=='1',leaderStatus: userInfo.leaderFlag=='1'}" >
    <div class="name">{{userInfo.name}}</div>
    <div class="operateBox">
      <div v-if="isShowCheck" class="operatebtn addCheck" :class="{hide: userInfo.leaderFlag=='1'}" @click="changeCheckStatus"><Icon type="ios-bell-outline"></Icon></Icon></div>
      <div class="operatebtn addLeader" @click="changeUser" title="组员换组"><i class="iconfont icon-zuyuanjiaojie"></i></div>
      <div class="operatebtn addLeader" title="提升为组长" :class="{hide: userInfo.checkFlag=='1'}" @click="changeLeaderStatus"><Icon type="android-star-outline"></Icon></div>
      <div class="operatebtn delete" title="删除" @click="deleteUser"><Icon type="close-round"></Icon></div>
    </div>
    <Modal
        v-model="modal1"
        :loading="loading"
        title="组员换组"
        width=400
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="换组目标：" prop="changeGroup">
                <Select filterable v-model="formValidate.changeGroup" style="width:200px">
                    <Option v-for="item in groupList" :value="item.id" :key="item.id" v-show="item.id != userInfo.id ">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否提升为组长：" prop="interest">
                <Checkbox v-model="formValidate.isGroupLeader"></Checkbox>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import valid,{errors,common} from '../../libs/request.js';
    export default {
      props: [
          'userInfo',
          'isShowCheck',
          'menuId',
          'groupInfo',
       ],
      data(){
        return {
            formValidate: {
                changeGroup: '',
                isGroupLeader: false
            },
            ruleValidate: {
                changeGroup: [
                    { required: true, message: '请选择换组目标', trigger: 'change' }
                ],
            },
            modal1: false,
            loading: true,
            groupList: []
        }
      },
      methods: {
        ...mapMutations(['updateLoadingStatus']),
        changeLeaderStatus() {
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxGroup.setLeaderFlag,{
                id:this.userInfo.id,
                leaderFlag:(this.userInfo.leaderFlag=="1"?0:1)
            }).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.userInfo.leaderFlag=(_this.userInfo.leaderFlag=="1"?"0":"1");
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
                _this.updataTree()
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        changeCheckStatus(){
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxGroup.setCheckFlag,{
                id:this.userInfo.id,
                checkFlag:(this.userInfo.checkFlag=="1"?0:1)
            }).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.userInfo.checkFlag=(_this.userInfo.checkFlag=="1"?"0":"1");
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
            	_this.updateLoadingStatus({isLoading:false});    
                util.checkAjaxError(error);
            });
        },
        deleteUser(){
          this.$emit('removeUser',this.userInfo);
        },

        updataTree(){
          this.$emit('updataTree');
        },

        changeUser(){
            this.updateLoadingStatus({isLoading:true});   
            common.findGroupNameByMenu({
                menuId:this.menuId,
                officeId: this.groupInfo.officeId
            }).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.groupList = res.data.data
                    this.modal1 = true
                }
            }).catch(errors.call(this)).finally(()=>{
              this.updateLoadingStatus({isLoading:false});  
            });
        },
        ok(){
            this.$refs.formValidate.validate((validRes) => {
                console.log("validRes == " + validRes)
                if (validRes) {
                    this.$Modal.confirm({
                        title: '换组确认',
                        content: '您是否确认换组？',
                        onOk: () => {
                            common.replaceGroup({
                                id: this.userInfo.id, 
                                userId: this.userInfo.userId, 
                                newGroupId: this.formValidate.changeGroup, // 目标工作组编号
                                isLeader: this.formValidate.isGroupLeader ? '1': '0', // 是否提升为组长
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
      }
    }
</script>
<style scoped lang="less">
.userList{
  float:left;
  width:176px;
  line-height:32px;
  height: 32px;
  padding-left: 10px;
  border:1px solid #e0e0e0;
  border-radius:4px;
  margin-right:10px;
  margin-bottom:10px;
  position: relative;
  overflow:hidden;
  .operateBox{
    position:absolute;
    right: 0;
    top: 0;
    opacity:0;
    transition: all .2s linear;
    .operatebtn{
      float:left;
      width:25px;
      height: 30px;
      text-align:center;
      color:#2b2c2c;
      transition: all .2s linear;
      border-left:1px solid #fff;
      border-right:1px solid #fff;
      cursor: pointer;
    }
    .operatebtn:hover{
      background:#efefef;
      border-left:1px solid #e0e0e0;
    }
    .addLeader,.addCheck{
      font-size:16px;
    }
    .addLeader:hover,.addCheck:hover{
      border-right:1px solid #e0e0e0;
    }
    .delete:hover{
      border-right:1px solid #efefef;
    }
  }

}
.userList:hover{
  .operateBox{
    opacity:1;
  }
}
.checkStatus{
  border-color:#ffa800;
  .operateBox{
    .addCheck{
      color:#44bcb7;
    }
  }
}
.leaderStatus{
  border-color:#44bcb7;
  .operateBox{
    .addLeader{
      color:#44bcb7;
    }
  }
}
</style>
