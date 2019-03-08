<template>
<div class="contentBox">
    <menubar>
        <span slot="menu" class="slotContent">
            <a href="javascript:void(0)" class="active">{{$t('SchoolManagement')}}</a>
        </span>
        <span slot="operate">
            <Button type="ghost" icon="ios-plus-outline" @click="editSchool('')">
                <span>{{$t('AddSchool')}}</span>
            </Button>
        </span>
    </menubar>
    <div class="infoBox">
        <div class="perateBox">
            <Checkbox :value="checkAll" :indeterminate="indeterminate" @click.prevent.native="handleCheckAll">{{$t('CheckAll')}}</Checkbox>
            <Button type="ghost" class="fr" @click="batchRemove">{{$t('DeleteSchool')}}</Button>
        </div>
        <div class="schoolInfo">
            <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <div class="schoolList clearfix" v-for="(item,index) in schoolList" :key="item.id">
                    <div class="fl checkBox"><Checkbox v-bind:label="item.id"> {{index+1}}</Checkbox></div>
                    <div class="fl basicinfo">
                        <div class="clearfix">
                            <div class="fl"><img :src="item.logoUrl"></div>
                            <div class="fl info schoolName">
                                <p>{{item.schoolName}}</p>
                                <span>No.{{item.schoolRank}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="fl info courseInfo">
                        <p>{{item.kvideoDesc}}</p>
                        <span>No.{{item.majorRank}}</span>
                    </div>
                    <div class="fl info areaInfo">
                        <p>{{item.stateName}}</p>
                        <span>{{$t('Area')}}</span>
                    </div>
                    <div class="fr editBox" @click="editSchool(item.id)">
                        <Icon type="compose"></Icon>
                    </div>
                </div>
            </Checkbox-group>
        </div>
        <div class="webPage">
            <Page show-total show-sizer
                  show-elevator
                  :current="1"
                  :placement ="pageConfig.placement"
                  :page-size='pageConfig.pageSize'
                  :page-size-opts="pageConfig.sizeList"
                  @on-page-size-change="changeSize"
                  @on-change="changePage">
              </Page>
        </div>
    </div>
</div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import MenuBar from '../../modules/breadcrumb/menuBar';
    export default {
        data(){
            return {
                checkAllGroup:[],
                indeterminate:false,
                checkAll:false,
                schoolList:[],
                pageConfig:{
                    pageNo: 1,
                    pageSize:20,
                    placement: 'bottom',
                    sizeList: [20,50,100]
                }
            }
        },
        components: {
          'menubar':MenuBar
      },
      mounted() {
        //加载学校列表
        this.loadSchoolData();
      },
      methods:{
        ...mapMutations(['updateLoadingStatus']),
        loadSchoolData(_data){
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxSchool.list,{params:{
              pageNo: this.pageConfig.pageNo,
              pageSize: this.pageConfig.pageSize
            }}).then(function(res){
              util.checkAjaxJson(res).thenSuccess(function(json){
                  _this.schoolList=json.data.list;
                  _this.pageConfig.pageNo = json.data.pageNo;
              }).autoRun("login","error");
              _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        editSchool(val){
            this.$router.push({name: 'choiceschool.creatSchool', query: {"schoolId":val}});
        },
        changeSize(size){//改变pageSize
            this.pageConfig.pageSize = size;
            this.loadSchoolData();
        },
        changePage(page){//分页
            this.pageConfig.pageNo = page;
            this.loadSchoolData();
        },
        checkAllGroupChange(data){
            if (data.length ===  this.schoolList.length) {
               this.indeterminate = false;
               this.checkAll = true;
            } else if (data.length > 0) {
               this.indeterminate = true;
               this.checkAll = false;
            } else {
               this.indeterminate = false;
               this.checkAll = false;
            }
        },
        handleCheckAll(){
            var _this=this;
            if (this.indeterminate) {
              this.checkAll = false;
            } else {
              this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
              this.schoolList.forEach(function(item){
                 _this.checkAllGroup.push(item.id);
              })
            } else {
              this.checkAllGroup = [];
            }
        },
        batchRemove(){
            if (this.checkAllGroup.length === 0) {
              this.$Message.info('请至少勾选一项');
              return false;
            }
            this.$Modal.confirm({
                title: '提示信息',
                content: '<p>您确定要删除这些学校吗？</p>',
                onOk: () => {
                    var _this=this;
                    var ids=this.checkAllGroup.join(",");
                    this.updateLoadingStatus({isLoading:true});
                    util.ajax.get(nozzle.xxSchool.batchdelete,{params:{"ids":ids}}).then(function(res){
                        util.checkAjaxJson(res).thenSuccess(function(json){
                            _this.checkAllGroup.forEach( item => {
                                for(var i=0;i<_this.schoolList.length;i++){
                                    if(item=_this.schoolList[i].id){
                                        _this.schoolList.splice(i, 1);
                                        return false;
                                    }
                                }
                            });
                        }).autoRun("login","error");
                        _this.updateLoadingStatus({isLoading:false});
                    }).catch(function(error) {
                        _this.updateLoadingStatus({isLoading:false});
                        util.checkAjaxError(error);
                    });
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
.infoBox{
    .perateBox{
        padding: 10px 0px 10px 15px;
        height: 50px;
        line-height:30px;
        .ivu-btn{
            height: 30px;
        }
    }
    .webPage{
        margin-top: 20px;
        text-align:center;
    }
}
.schoolList{
    padding: 10px 15px;
    height: 75px;
    border-bottom:1px solid #e0e0e0;
    .checkBox{
        line-height:55px;
    }
    .basicinfo{
        width:40%;
        min-width:400px;
        margin-left:10px;
        height:55px;
        img{
            width:55px;
            height:55px;
        }
        .schoolName{
            width:80%;
            height:55px;
            overflow:hidden;
        }
    }
    .courseInfo{
        width:20%;
        height:55px;
        overflow:hidden;
    }
    .areaInfo{
        width:20%;
        height:55px;
        overflow:hidden;
    }
    .info{
        margin-left:10px;
        p{
            height: 30px;
            line-height:30px;
            width:100%;
            text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            font-size:16px;
            color:#0b0b0b;

        }
        span{
            line-height:25px;
            font-size:12px;
            color:#787878;
        }
    }
    .editBox{
        width:30px;
        text-align:center;
        line-height:55px;
        font-size:20px;
        color:#b7b7b7;
        cursor:pointer;
    }
}
</style>
