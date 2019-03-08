<template>
<div class="contentBox">
  <!-- <menubar>
      <span slot="menu" class="slotContent">
          <a href="#" class="active">{{$t('GroupManagement')}}</a>
      </span>
  </menubar> -->
  <div class="mainContent">
    <div class="tipBox">
      <Alert closable>
          <span class="tipTitle">{{$t('GroupTips')}}：</span>
          <Icon type="leader" size="14"></Icon>{{$t('LeaderFlagTips')}}
          <Icon  v-if="isShowCheck" type="member" size="14"></Icon>
          <span v-if="isShowCheck">
            {{$t('CheckFlagTips')}}
           </span> 
      </Alert>
    </div>
    <div class="groupInfo" v-for="(group,pIndex) in treeUserData" :key="pIndex">
      <div class="groupTitle">
        <div v-if="isShowCheck" class="icon_type" :class="{chineseTypeIcon:group.name=='美方工作组'}"></div>
        <div class="name">{{group.name}}</div>
        <div class="add_btn_Box">
          <Button type="ghost" @click="addGroup(pIndex)"><Icon type="person-stalker"></Icon> {{$t('AddGroup')}}</Button>
        </div>
      </div>
      <div class="groupBox">
        <div class="groupList" v-for="(item,index) in group.subGroups" :key="index">
            <groupinfo :menuId='menuId' ref="groupInfoDom" :groupInfo="item" :china="group.name!='美方工作组'"
                :parentId="group.id" 
                :index="index" 
                :isShowCheck='isShowCheck'
                @removeGroup="removeGroup(item,index,pIndex)"
                @silentremove="silentremoveGroup(item,index,pIndex)"
                @reLoadGroupInfo="reLoadGroupInfo"
                @updataTree="loadGroupInfo"
                @editGroup="editGroup(item,index,pIndex)"
                @orderGroupDown="orderGroupDown(item,index,pIndex)"
                @orderGroupUp="orderGroupUp(item,index,pIndex)"
                @syncGroup='showSyncModule'
                @upTree='loadGroupInfo'>
            </groupinfo>
        </div>
      </div>
    </div>
  </div>
    <Modal
    v-model="modal1"
    width=728
    title="编辑分组"
    @on-ok="ok"
    @on-cancel="cancel">
        <div class="dialogCGSX">
            <p>
                <span>　分组名称：</span>
                <Input v-model="groupValue" placeholder="请输入分组名称" style="width: 198px"></Input></p>
            <p>
                <span>　同步分组：</span> 
                <Select v-model="syncGroup" style="width:200px" multiple label-in-value >
                    <Option v-for="item in syncGroupList" :value="item.id" :label="item.name" :key="item.id" :disabled="abel(item.id,item.menuId)">
                    </Option>
                </Select>
            </p>
            <p>
                <span>所属分公司：</span> 
                <Select v-model="model1C" style="width:200px"  @on-change="selectChange">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </p>
        </div>
    </Modal>
    <Modal
    v-if="syncInfo.origin.length"
    v-model="syncModule"
    width=728
    title="同步用户"
    @on-ok="okSync"
    @on-cancel="cancelSync">
        <div class="dialogCGSX1">
            <p style="text-align:center">提示: 您正在同步用户角色, 请确认信息</p>
            <p>
                <span>当前角色：{{syncInfo.origin[0].content}}</span>
            <p>
                <span v-if="syncInfo.target.length">同步对象：<span v-for="item in syncInfo.target">{{item.content}} </span></span> 
            </p>
            <p>
                <span>同步人数：{{syncInfo.origin[0].num}}</span> 
            </p>
        </div>
    </Modal>
    <Modal
    v-model="confirmSync"
    width=728
    title="提示"
    okText="确认同步"
    @on-ok="okConfirm"
    @on-cancel="cancelConfirm">
        <div class="dialogCGSX1">
            <p style="text-align:center">同步对象中已存在<span v-for="item in syncInfo.target">{{item.content}} {{item.num}}条</span>, 同步后系统将删除这些数据</p>
            <p style="text-align:center">请确认是否继续同步?</p>
        </div>
    </Modal>
</div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    // import MenuBar from '../../modules/breadcrumb/menuBar';
    import {MENUIDS} from "@public/libs/config.js";
    import GroupInfo from './groupInfo';
    import valid, { errors, sys, common } from "../../libs/request";
    export default {
        props: {
            menuId: {
                type: String,
                default: '401'
            }
        },
      data(){
        return {
            confirmSync: false,
            syncInfo: {
                origin: [],
                target: [],
            },
            syncModule: false,
            syncGroup: [],
            syncGroupList: [],
            PlanId: MENUIDS.PLAN,
            treeUserData:[],
            modal1: false,
            groupValue: '',
            index: '',
            isAddGroup: false,
            indexEdit: '',
            companyList: [],
            model1C: '',
            companyId: '',
            id1: '',
            id2: '',
            parentIndex: 0,
        }
      },
        computed: {
            isShowCheck() {
                if(this.PlanId == this.menuId) return false
                return true
            },

        },

      methods: {
        ...mapMutations(['updateLoadingStatus']),
            abel(id,mId) {
                let flag1=false,flag2=true;
                this.syncGroup.forEach((v,k)=>{
                    if(id==v){
                        flag2=false;
                    }
                    this.syncGroupList.forEach((val,ind)=>{
                        if(val.id==v){
                            if(mId==val.menuId){
                                flag1=true;
                            }
                        }
                    })
                })
                if(flag1&&flag2){
                    return true;
                }else{
                    return false;
                }
            },
        selectChange(val) {
            this.model1C = val
        },

        // selectChangeGroup(val,eve) {
        //     console.log(val)
        //     console.log(this.syncGroup, 99)
        //     console.log(eve)
        // },

        getCompany() {
            let obj = {
                grade: '2'
            }
            sys.officeList(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.companyList = res.data.data.allCompany
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getGroupList() {
            let obj = {
                groupId: this.edId,
                menuId: this.menuId
            }
            common.getSyncGroup(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.syncGroupList = res.data.data
                    this.modal1 = true
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        removeGroup(item,index,_pIndex) {
            this.$Modal.confirm({
                title: '提示信息',
                content: '<p>您确定要删除此分组信息吗？</p>',
                onOk: () => {
                    this.removeGroupAjax({"id":item.id},index,_pIndex);
                }
            })
        },
        removeGroupAjax(_data,_index,_pIndex){//单个删除
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxGroup.deleteXxGroup,{params:_data}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.treeUserData[_pIndex].subGroups.splice(_index,1);
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        silentremoveGroup(item,index,_pIndex){
          this.treeUserData[_pIndex].subGroups.splice(index,1);
        },

        addGroup(_index){
            this.syncGroup = []
            this.parentIndex = _index
            this.isAddGroup = false
            this.index = _index
            this.getGroupList()
          // const has = this.treeUserData[_index].subGroups.some(item=>item.newGroup===true);
          // if(has){
          //   return this.$Message.warning('已存在一个空分组');
          // }
        //   this.treeUserData[_index].subGroups.push({
        //     "id":"",
        //     "groupName":"",
        //     "xxGroupUserList":[],
        //     "newGroup":true
        //   });

        },
        loadGroupInfo(cb){
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxGroup.treeUserData, {params:{menuId:this.menuId}}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.treeUserData = json.data.groups;
                    _this.model1C = ''
                    _this.groupValue = ''
                    cb&&cb();
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        reLoadGroupInfo(cb){
            this.loadGroupInfo(cb);
        },

        orderGroupDown(item,index,pIndex) {
            if(index+1 == this.treeUserData[pIndex].subGroups.length) {
                this.$Message.info('最后一个不能向下移动')
                return
            }
            this.orderGroup(item, index, 1, pIndex)
        },

        orderGroupUp(item,index,pIndex) {
            if(!index) {
                this.$Message.info('第一个不能向上移动')
                return
            }
            this.orderGroup(item, index, -1, pIndex)
        },

        orderGroup(item, index, more, pIndex) {
            var _this=this
            let id2 = _this.treeUserData[pIndex].subGroups[index+more].id
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxGroup.order,{
                id1: item.id,
                id2: id2,
            }).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.loadGroupInfo();
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },

        submitGroupInfo(val, cId, isAdd){
            var _this=this;
            let obj = {
                parent: this.treeUserData[this.parentIndex].id,
                menuId: this.menuId,
                name: val,
                officeId: cId,
                groupSyncIds: this.syncGroup.join(',')
            }
            if(isAdd) {
                obj = Object.assign(obj, {
                    id: _this.edId,
                })
            }
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxGroup.save, obj).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.loadGroupInfo()
                }).thenError().autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },

        ok() {
            if(!this.groupValue || !this.model1C) {
                this.$Message.info('请填写信息')
                return
            }

            if(!this.isAddGroup) {
                this.submitGroupInfo(this.groupValue, this.model1C, false)
                return
            }
            this.submitGroupInfo(this.groupValue, this.model1C, true)
            // this.$refs.groupInfoDom[this.indexEdit].submitGroupInfo(this.groupValue, this.companyId, true)
        },

        editGroup(item,index,pIndex) {
            this.parentIndex = pIndex
            this.groupValue = item.name
            this.edId = item.id
            this.companyId = item.id
            this.isAddGroup = true 
            this.indexEdit = index
            this.model1C = item.officeId
            this.syncGroup = item.syncList.map(item1 => {
                return item1.syncObjectId
            })
            this.getGroupList()
        },

        showSyncModule(id) {
            this.edId = id
            this.getSyncInfo()
        },

        getSyncInfo() {
            let obj = {
                groupId: this.edId
                // groupId: '2cce3d9e72524114a6af1e3b7f72bf11'
            }
            common.getGroupInfo(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.syncInfo = res.data.data
                    // this.syncGroupList = res.data.data
                    this.syncModule = true
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        SyncGroup() {
            let obj = {
                groupId: this.edId
                // groupId: '2cce3d9e72524114a6af1e3b7f72bf11'
            }
            common.SyncGroup(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    // this.syncGroupList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        cancel() {
            this.model1C = ''
            this.groupValue = ''
        },

        cancelSync() {},
        okSync() {
            this.confirmSync = true
        },
        cancelConfirm() {

        },

        okConfirm() {
            this.SyncGroup()
        }
      },
      mounted() {
        //加载数据
        this.loadGroupInfo()

        // 获取公司
        this.getCompany()

        // 获取公司
        // this.getGroupList()
      },
      components: {
        // 'menubar':MenuBar,
        'groupinfo':GroupInfo
      }
    }
</script>
<style scoped lang="less">
.contentBox{
    margin:0px 15px;
}
.mainContent{
  padding: 10px 0px;
}
.tipBox{
  .ivu-alert-info {
    padding-left:20px;
    border: 1px solid #e0e0e0;
    background-color: #f7f7f7;
    border-left:5px solid #44bcb7;
  }
  .tipTitle{
    color:#44bcb7;
  }
  .ivu-icon{
    height: 10px;
    width:10px;
    position: relative;
    top: 1px;
    margin-right:3px;
  }
  .ivu-icon-leader{
    background:#44bcb7;
  }
  .ivu-icon-member{
    margin-left: 10px;
    background:#ffa800;
  }
}
.groupInfo{
  background:#fff;
  border:1px solid #e0e0e0;
  border-radius:4px;
  overflow:hidden;
  margin-bottom: 20px;
  box-shadow:0px 2px 10px rgba(0,0,0,0.1);
  .groupTitle{
    height: 60px;
    padding: 10px 20px;
    background:#f7f7f7;
    .icon_type{
      float:left;
      width:40px;
      height: 40px;
      padding: 5px;
      overflow:hidden;
      border-radius:100%;
      background:#fff;
      background-repeat: no-repeat;
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADHElEQVRIicWXyWsUQRSHv6ruibOYSSdjRNGLjQt98BQjgkdRQcnFoxLBg3FfwO3iX6CIcQkBFxRFPQhexIPbHyDRc+NCBwRxyyTtxJlMMtPdHnomztYzk0GTB33o97p+H/XqVdVrQRNmGVoY2AlsBXoBHdAK4V/AKPAOeAk81U0700hTNAAmgDPAQaCjMi5jHm66SuI3cAO4oJv29zmDLUPrBy4DiapBKnTunQJg/E4EvJoSKeC0bto3awVlDaBqGdot4F50U64K6oM9lETh6ahNBeLADcvQHlqG1lalUQkFngB9st1j5fVJPu+Lg1tbWV3ikh+TfsozImjmAK+BHbppzxQdlTMeAvoAohtzKF0ukfX5QLX8mAQBiYEplhyuW09bgLuljtkZW4a2O9KTe5DYP4UIgWz3kBEP97fAzQjctCA5HCFrqmWKSpdL194sTkow8SCMN123XgeKay4KUA34AHS3rXJYei5NaMXf/E6/V/lxMUr+e1VJ+PC4h5OqCyxaClirm/as0kmgG2BmVMF+HC77evxuOBAKNAsFv+DOAkjL0ELA0dJobHOO/Jhk4n4Yd1IQ25yrqxZa7rJondMsfMAytKgKbKdkr8qYh5MUfLnUjpsWTL5qo3NP1l+UGlWrdHh0n0kjI/D1fAwnGZyZgi0G+oRlaIPAiVl3ACDQD0R7c+BB5m2oEbRot1Wgp8wVtBdL/EKFNt1B6XTJvAmRGWkaWLQeFVg911FeHhIHMng5wfQHBWeiYXorTVeB9rmOkmGPsaEoasJtBQoQV6l30AWYmxXMWAozltIKFPCPzMmWR7dutgQ+LgB4VAJvFwA8IoEXCwB+IfHvyh/zCE0Bz6Ru2nng6jyCh3XTzhY34TXg2zxAx4GLUOhAdNNOAUfmAXxSN+3kLLgAfwJc+Y/Q27pp3y++VJ53p4BH/wH6FDhU6igD66btAP3825nfAnbppl3WTdRr6Hfhd53LWgT+xF/Th7WCjX5h4sAx4DiwtElgErgODOqmbQd91FSXVmj0twDbgA3AGvzrVOBfMp/wf9peAc8r01rL/gCTvgKMWdBNfwAAAABJRU5ErkJggg==");
      background-position: center center;
      border:1px solid #e0e0e0;
    }
    .chineseTypeIcon{
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAFUklEQVRIib2Xe1BUVRzHv+feu+9lYVl3QVRoWVCBmVAJdVbLBrLM0SYnJq0xdMaafIz5oInMRzpapDLNmDYqk+kkNjryyBSf5TNfiFgKoobIIxZ2F5bdZdnn3T39QWuMyTP1+9c953fO73O/d3733N8l6IO0+kIJgKkAJgMYJxVzWqebD11d/e2t6abTkQAaAVwGcBrAETXg7i0n0wtQlTbzRM75gimXIzWSfQA+TE5URh/Y/pJBJGRBQBkAagCjACwAcBBAkxnINQPhPeUmPUAzk4aHra+qtkWnT4g0nrtijIiNCbGZW91SXUyIvfT3FtWqEQ3nZyrrJY9NrFR6JMuX72Fksl29uQ8ChVp94XdJaYdok9FZ+/aCc21afSFNn3XSabF6DMmv/uzX6gupVl9ID5bUVtDelU8pFfboWKsvFAgETNGGj0fp8osfaG7/aVWFh4n4NUufr8rZVjHC2OIS6mJCrPNnDzd8mlOe+ElsXbeOu8pfW1vlLSr6QA14g3Nc1wWDNZKdTSbXtJt3rPc7nLw4RCbgW9s8nNHslpgtbqFCLvA7OnjZvRq7wOsLgCk5pHKZziT14UGmAhAAeDc48bC44iYWzd68MmXse2/F1uwrrtE1mZyyw7vT6obHKhwbvrkZp1GJ3cf2vvKX3eFjd+TfiwcAwjA9FucjeqdFqVwUHBAAoJQq33z/zDWD0RlDCMH4MermS2UmjVjEEp4PIDV5UPOl6+aoELnAZ2/3shNTNcZjZw1Dv8weXZkxNaYvjoOyA4gnhJgYACg+Xp81frSat9p9nLnVzU2ZFGVLiAttM7a4BVa7T7BozkhPIEBJY7NTPCRS6pr1htbu9wf6wXsoBYBsACBafSEHoJ4QDN64IqXy1AVD2KkLTUPEIha7cvWVKzfd0NY2OKSRGol367qx1XOzLiZ0OHkCAJ9ZDlydYTg+qF9oSr20vT2VAzA5TCFU+QOULzhap2mzeUXRUTJnvaFDuv/QA4XN3jk2W9zSA0dq5R1OngTjnMUsp3a7bgDOp3MAJn2+LLnO6/WT7JzyOI5jULInrWb73nuyn07UD1MpRYHDu9M6ps75VVhQUhf94tgI08YVYzrSZp3U+hKTW7kYx7X+UlmdLoUsWVt69MRZw+sMAyzMHHH3UplZcaPSMlgiZgNL5iVU/VBQM6zZ7FKoVWLXnAzd/R177ybYHT7W7fFj08qU/hZXUKUcpYiilIL3A00mF8ewhGFZgjabl2EZwjjdvJQQ0BaLWxIeKhSYWt2sXCag8PiJ+48KhxeV9/uN5XkR0eoLHWuXJ9f6fAF8sfVWEscxKMp7+Xbuzsrw81eNkcpQoe/w7rSGjPnnhjSbXKJRieFtm1elGKfNPT0y+/aWyml9O0D+Iw4Avt9fHUtp5zvN8wFkrS97zmb3cgBgtXsFy9aVhVvaPCIAqGt0yD9aUyrweP0D4T0UKa9oLWcZEjmQzUNdBij8zv5v5HkboZT+AiB9IOD/octce2bmRf+dO4pnSWXj4n4jZuA1AMefJRhABjEDAhIaeg2Uyp8JklI3bW9/4Z9ruroPncST0lfAv5/FEOpwVIPnNU/VLcdZiVyuI4RYOAAghLSbgfkAip4qGFisBixAlw5EDRQD2PIUobvUQH5wwD0SzBLPm8ey8fETniTRX1Nz3Z2Xt7DHRZRSllL69RMspjxKKfsop9uGnno8M1zbti0JNDZKB+KSiYhwiRcv3slIpT8+Lt4tGADMgBTAUgALAQzpI9MIYAeAXDXg6G5Rj+AuN8Ci8zxPBzAOQDQ6/5lIZxgNAK4AOAvgpBrge8v5N6vqFeHwX1EMAAAAAElFTkSuQmCC");
    }
    .name{
      float:left;
      margin-left:10px;
      line-height:40px;
    }
    .add_btn_Box{
      float:right;
      position:relative;
      top: 3px;
      .ivu-icon{
        font-size:16px;
      }
    }
  }
}
.dialogCGSX {
    p {
        margin-bottom: 20px;
        span {
            display: inline-block;
            width: 80px;
        }
    }
}
.dialogCGSX1 {
    p {
        line-height: 30px;
    }
}
</style>
