<template>
  <div class="userList" :class="{checkStatus: userInfo.checkFlag=='1',leaderStatus: userInfo.leaderFlag=='1'}" >
    <div class="name">{{userInfo.name}}</div>
    <div class="operateBox">
      <div class="operatebtn addCheck" :class="{hide: userInfo.leaderFlag=='1'}" @click="changeCheckStatus"><Icon type="ios-bell-outline"></Icon></Icon></div>
      <div class="operatebtn addLeader" :class="{hide: userInfo.checkFlag=='1'}" @click="changeLeaderStatus"><Icon type="android-star-outline"></Icon></div>
      <div class="operatebtn delete" @click="deleteUser"><Icon type="close-round"></Icon></div>
    </div>
  </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    export default {
      props: [
          'userInfo'
       ],
      data(){
        return {

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
                    _this.$emit('needreload');
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
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
                    _this.$emit('needreload');
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
            	_this.updateLoadingStatus({isLoading:false});    
                util.checkAjaxError(error);
            });
        },
        deleteUser(){
          this.$emit('removeUser',this.userInfo);
        }
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
