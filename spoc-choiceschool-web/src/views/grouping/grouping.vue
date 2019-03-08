<template>
<div class="contentBox">
  <router-view :menuId='menuId'>
	</router-view>
  <!-- <menubar>
      <span slot="menu" class="slotContent">
          <a href="#" class="active">{{$t('GroupManagement')}}</a>
      </span>
  </menubar>
  <div class="mainContent">
    <div class="tipBox">
      <Alert closable>
          <span class="tipTitle">{{$t('GroupTips')}}：</span>
          <Icon type="leader" size="14"></Icon>{{$t('LeaderFlagTips')}}
          <Icon type="member" size="14"></Icon>{{$t('CheckFlagTips')}}
      </Alert>
    </div>
    <div class="groupInfo" v-for="(group,pIndex) in treeUserData" :key="pIndex">
      <div class="groupTitle">
        <div class="icon_type" :class="{chineseTypeIcon:group.name=='中方工作组'}"></div>
        <div class="name">{{group.name}}</div>
        <div class="add_btn_Box">
          <Button type="ghost" @click="addGroup(pIndex)"><Icon type="person-stalker"></Icon> {{$t('AddGroup')}}</Button>
        </div>
      </div>
      <div class="groupBox">
        <div class="groupList" v-for="(item,index) in group.subGroups" :key="index">
            <groupinfo :groupInfo="item" :china="group.name=='中方工作组'"
                     :parentId="group.id" 
                     :index="index" 
                     @gotop="doGoTop"
                     @godown="doGoDown"
                     @removeGroup="removeGroup(item,index,pIndex)"
                     @silentremove="silentremoveGroup(item,index,pIndex)"
                     @reLoadGroupInfo="reLoadGroupInfo">
            </groupinfo>
        </div>
      </div>
    </div>
  </div> -->
</div>
</template>
<script>
    import {MENUIDS} from "@public/libs/config.js";
    export default {
     data() {
      return {
        menuId: MENUIDS.CHOICESCHOOL
      }
	  },
    }
    // import {mapMutations} from 'vuex';
    // import util from '../../libs/js/util.js';
    // import nozzle from "../../libs/interface.js";
    // import MenuBar from '../../modules/breadcrumb/menuBar';
    // import GroupInfo from './groupInfo';
    // export default {
    //   data(){
    //     return {
    //       treeUserData:[]
    //     }
    //   },
    //   methods: {
    //     ...mapMutations(['updateLoadingStatus']),
    //     doGoTop(item,index,pid){
    //       if(index==0){
    //         return this.$Message.warning("已是第一个");
    //       }
    //       const group = this.treeUserData.find(item=>item.id==pid);
    //       if(group){
    //         const sub = group.subGroups;
    //         const prev = sub[index-1];
    //         this.doSort(item.id,prev.id);
    //       }
    //     },
    //     doGoDown(item,index,pid){
    //       const group = this.treeUserData.find(item=>item.id==pid);
    //       if(group){
    //         const sub = group.subGroups;
    //         if(index==sub.length-1){
    //           return this.$Message.warning("已是最后一个");
    //         }
    //         const next = sub[index+1];
    //         this.doSort(item.id,next.id);
    //       }
    //     },
    //     doSort(id1,id2){
    //       const data = {id1,id2};
    //       this.updateLoadingStatus({isLoading:true});
    //       util.ajax.post(nozzle.xxGroup.updateSort,data).then(res=>{
    //           util.checkAjaxJson(res).thenSuccess(json=>{
    //             debugger;
    //             this.reLoadGroupInfo();
    //           }).autoRun("login","error");
    //           this.updateLoadingStatus({isLoading:false});
    //       }).catch(error=>{
    //           this.updateLoadingStatus({isLoading:false});
    //           util.checkAjaxError(error);
    //       });
    //     },
    //     removeGroup(item,index,_pIndex) {
    //         this.$Modal.confirm({
    //             title: '提示信息',
    //             content: '<p>您确定要删除此分组信息吗？</p>',
    //             onOk: () => {
    //                 this.removeGroupAjax({"id":item.id},index,_pIndex);
    //             }
    //         })
    //     },
    //     removeGroupAjax(_data,_index,_pIndex){//单个删除
    //         var _this=this;
    //         this.updateLoadingStatus({isLoading:true});
    //         util.ajax.get(nozzle.xxGroup.deleteXxGroup,{params:_data}).then(function(res){
    //             util.checkAjaxJson(res).thenSuccess(function(json){
    //                 _this.treeUserData[_pIndex].subGroups.splice(_index,1);
    //             }).autoRun("login","error");
    //             _this.updateLoadingStatus({isLoading:false});
    //         }).catch(function(error) {
    //             _this.updateLoadingStatus({isLoading:false});
    //             util.checkAjaxError(error);
    //         });
    //     },
    //     silentremoveGroup(item,index,_pIndex){
    //       this.treeUserData[_pIndex].subGroups.splice(index,1);
    //     },
    //     addGroup(_index){
    //       const has = this.treeUserData[_index].subGroups.some(item=>item.newGroup===true);
    //       if(has){
    //         return this.$Message.warning('已存在一个空分组');
    //       }
    //       this.treeUserData[_index].subGroups.push({
    //         "id":"",
    //         "groupName":"",
    //         "xxGroupUserList":[],
    //         "newGroup":true
    //       });

    //     },
    //     loadGroupInfo(cb){
    //         var _this=this;
    //         this.updateLoadingStatus({isLoading:true});
    //         util.ajax.get(nozzle.xxGroup.treeUserData).then(function(res){
    //             util.checkAjaxJson(res).thenSuccess(function(json){
    //                 _this.treeUserData = json.data.groups;
    //                 cb&&cb();
    //             }).autoRun("login","error");
    //             _this.updateLoadingStatus({isLoading:false});
    //         }).catch(function(error) {
    //             _this.updateLoadingStatus({isLoading:false});
    //             util.checkAjaxError(error);
    //         });
    //     },
    //     reLoadGroupInfo(cb){
    //         this.loadGroupInfo(cb);
    //     }
    //   },
    //   mounted() {
    //     //加载数据
    //     this.loadGroupInfo();
    //   },
    //   components: {
    //     'menubar':MenuBar,
    //     'groupinfo':GroupInfo
    //   }
    // }
</script>
<style scoped lang="less">
// .mainContent{
//   padding: 10px 0px;
// }
// .tipBox{
//   .ivu-alert-info {
//     padding-left:20px;
//     border: 1px solid #e0e0e0;
//     background-color: #f7f7f7;
//     border-left:5px solid #44bcb7;
//   }
//   .tipTitle{
//     color:#44bcb7;
//   }
//   .ivu-icon{
//     height: 10px;
//     width:10px;
//     position: relative;
//     top: 1px;
//     margin-right:3px;
//   }
//   .ivu-icon-leader{
//     background:#44bcb7;
//   }
//   .ivu-icon-member{
//     margin-left: 10px;
//     background:#ffa800;
//   }
// }
// .groupInfo{
//   background:#fff;
//   border:1px solid #e0e0e0;
//   border-radius:4px;
//   overflow:hidden;
//   margin-bottom: 20px;
//   box-shadow:0px 2px 10px rgba(0,0,0,0.1);
//   .groupTitle{
//     height: 60px;
//     padding: 10px 20px;
//     background:#f7f7f7;
//     .icon_type{
//       float:left;
//       width:40px;
//       height: 40px;
//       padding: 5px;
//       overflow:hidden;
//       border-radius:100%;
//       background:#fff;
//       background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAFUklEQVRIib2Xe1BUVRzHv+feu+9lYVl3QVRoWVCBmVAJdVbLBrLM0SYnJq0xdMaafIz5oInMRzpapDLNmDYqk+kkNjryyBSf5TNfiFgKoobIIxZ2F5bdZdnn3T39QWuMyTP1+9c953fO73O/d3733N8l6IO0+kIJgKkAJgMYJxVzWqebD11d/e2t6abTkQAaAVwGcBrAETXg7i0n0wtQlTbzRM75gimXIzWSfQA+TE5URh/Y/pJBJGRBQBkAagCjACwAcBBAkxnINQPhPeUmPUAzk4aHra+qtkWnT4g0nrtijIiNCbGZW91SXUyIvfT3FtWqEQ3nZyrrJY9NrFR6JMuX72Fksl29uQ8ChVp94XdJaYdok9FZ+/aCc21afSFNn3XSabF6DMmv/uzX6gupVl9ID5bUVtDelU8pFfboWKsvFAgETNGGj0fp8osfaG7/aVWFh4n4NUufr8rZVjHC2OIS6mJCrPNnDzd8mlOe+ElsXbeOu8pfW1vlLSr6QA14g3Nc1wWDNZKdTSbXtJt3rPc7nLw4RCbgW9s8nNHslpgtbqFCLvA7OnjZvRq7wOsLgCk5pHKZziT14UGmAhAAeDc48bC44iYWzd68MmXse2/F1uwrrtE1mZyyw7vT6obHKhwbvrkZp1GJ3cf2vvKX3eFjd+TfiwcAwjA9FucjeqdFqVwUHBAAoJQq33z/zDWD0RlDCMH4MermS2UmjVjEEp4PIDV5UPOl6+aoELnAZ2/3shNTNcZjZw1Dv8weXZkxNaYvjoOyA4gnhJgYACg+Xp81frSat9p9nLnVzU2ZFGVLiAttM7a4BVa7T7BozkhPIEBJY7NTPCRS6pr1htbu9wf6wXsoBYBsACBafSEHoJ4QDN64IqXy1AVD2KkLTUPEIha7cvWVKzfd0NY2OKSRGol367qx1XOzLiZ0OHkCAJ9ZDlydYTg+qF9oSr20vT2VAzA5TCFU+QOULzhap2mzeUXRUTJnvaFDuv/QA4XN3jk2W9zSA0dq5R1OngTjnMUsp3a7bgDOp3MAJn2+LLnO6/WT7JzyOI5jULInrWb73nuyn07UD1MpRYHDu9M6ps75VVhQUhf94tgI08YVYzrSZp3U+hKTW7kYx7X+UlmdLoUsWVt69MRZw+sMAyzMHHH3UplZcaPSMlgiZgNL5iVU/VBQM6zZ7FKoVWLXnAzd/R177ybYHT7W7fFj08qU/hZXUKUcpYiilIL3A00mF8ewhGFZgjabl2EZwjjdvJQQ0BaLWxIeKhSYWt2sXCag8PiJ+48KhxeV9/uN5XkR0eoLHWuXJ9f6fAF8sfVWEscxKMp7+Xbuzsrw81eNkcpQoe/w7rSGjPnnhjSbXKJRieFtm1elGKfNPT0y+/aWyml9O0D+Iw4Avt9fHUtp5zvN8wFkrS97zmb3cgBgtXsFy9aVhVvaPCIAqGt0yD9aUyrweP0D4T0UKa9oLWcZEjmQzUNdBij8zv5v5HkboZT+AiB9IOD/octce2bmRf+dO4pnSWXj4n4jZuA1AMefJRhABjEDAhIaeg2Uyp8JklI3bW9/4Z9ruroPncST0lfAv5/FEOpwVIPnNU/VLcdZiVyuI4RYOAAghLSbgfkAip4qGFisBixAlw5EDRQD2PIUobvUQH5wwD0SzBLPm8ey8fETniTRX1Nz3Z2Xt7DHRZRSllL69RMspjxKKfsop9uGnno8M1zbti0JNDZKB+KSiYhwiRcv3slIpT8+Lt4tGADMgBTAUgALAQzpI9MIYAeAXDXg6G5Rj+AuN8Ci8zxPBzAOQDQ6/5lIZxgNAK4AOAvgpBrge8v5N6vqFeHwX1EMAAAAAElFTkSuQmCC");
//       background-repeat: no-repeat;
//       background-position: center center;
//       border:1px solid #e0e0e0;
//     }
//     .chineseTypeIcon{
//         background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADHElEQVRIicWXyWsUQRSHv6ruibOYSSdjRNGLjQt98BQjgkdRQcnFoxLBg3FfwO3iX6CIcQkBFxRFPQhexIPbHyDRc+NCBwRxyyTtxJlMMtPdHnomztYzk0GTB33o97p+H/XqVdVrQRNmGVoY2AlsBXoBHdAK4V/AKPAOeAk81U0700hTNAAmgDPAQaCjMi5jHm66SuI3cAO4oJv29zmDLUPrBy4DiapBKnTunQJg/E4EvJoSKeC0bto3awVlDaBqGdot4F50U64K6oM9lETh6ahNBeLADcvQHlqG1lalUQkFngB9st1j5fVJPu+Lg1tbWV3ikh+TfsozImjmAK+BHbppzxQdlTMeAvoAohtzKF0ukfX5QLX8mAQBiYEplhyuW09bgLuljtkZW4a2O9KTe5DYP4UIgWz3kBEP97fAzQjctCA5HCFrqmWKSpdL194sTkow8SCMN123XgeKay4KUA34AHS3rXJYei5NaMXf/E6/V/lxMUr+e1VJ+PC4h5OqCyxaClirm/as0kmgG2BmVMF+HC77evxuOBAKNAsFv+DOAkjL0ELA0dJobHOO/Jhk4n4Yd1IQ25yrqxZa7rJondMsfMAytKgKbKdkr8qYh5MUfLnUjpsWTL5qo3NP1l+UGlWrdHh0n0kjI/D1fAwnGZyZgi0G+oRlaIPAiVl3ACDQD0R7c+BB5m2oEbRot1Wgp8wVtBdL/EKFNt1B6XTJvAmRGWkaWLQeFVg911FeHhIHMng5wfQHBWeiYXorTVeB9rmOkmGPsaEoasJtBQoQV6l30AWYmxXMWAozltIKFPCPzMmWR7dutgQ+LgB4VAJvFwA8IoEXCwB+IfHvyh/zCE0Bz6Ru2nng6jyCh3XTzhY34TXg2zxAx4GLUOhAdNNOAUfmAXxSN+3kLLgAfwJc+Y/Q27pp3y++VJ53p4BH/wH6FDhU6igD66btAP3825nfAnbppl3WTdRr6Hfhd53LWgT+xF/Th7WCjX5h4sAx4DiwtElgErgODOqmbQd91FSXVmj0twDbgA3AGvzrVOBfMp/wf9peAc8r01rL/gCTvgKMWdBNfwAAAABJRU5ErkJggg==");
//     }
//     .name{
//       float:left;
//       margin-left:10px;
//       line-height:40px;
//     }
//     .add_btn_Box{
//       float:right;
//       position:relative;
//       top: 3px;
//       .ivu-icon{
//         font-size:16px;
//       }
//     }
//   }
// }
</style>
