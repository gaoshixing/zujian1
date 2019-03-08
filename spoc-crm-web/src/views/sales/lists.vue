<style lang="less">
.lists-container{
    margin-bottom: 88px;
    .ivu-tabs-nav-container{
        &:focus{
            outline: none;
        }
    }
    .filter{
        margin-bottom: 4px;
        .titleBar{
            span{
                margin: 4px;
                &:first-child{
                    float: left;text-align: right !important;width: 80px !important;color: #999 !important;
                    margin: 0;line-height: 30px;
                }
            }
        }
    }
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;min-height: 32px;margin-top: 8px;
        // width: 860px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 80px;position: absolute;left: 0;top: 0;line-height: 30px;
            color: #999;text-align: right;
        }
        li,.more{
            float: left;padding: 5px 12px;cursor: pointer;margin:3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .ivu-input{
        padding-top: 0;padding-bottom: 0;height: 28px;
    }
    .ivu-date-picker.error{
        .ivu-input{
            border-color: #f00;
        }
    }
    .count{
        position: relative;top: 6px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
    .btn-lists-div{
        @h:40px;
        @radius: 1px;
        position: relative;
        height: @h;line-height: @h;padding-left: 21px;margin-top: 22px;
        border: 1px solid #e0e0e0;border-radius: @radius;
        font-size: 14px;color: #666;
        background: #fafafa;
        &:before{
            @border-width: -1px;
            content: "";
            position: absolute;left: @border-width;top: @border-width;bottom: @border-width;
            width: 5px;
            border-top-left-radius: @radius;
            border-bottom-left-radius: @radius;
            background: #44bcb7;
        }
    }
    .btn-lists{
        float: right;
        .ivu-btn{
            float: left;padding-top: 3px;padding-bottom: 3px;
            margin-right: 19px;margin-top: 4px;font-size: 14px;
        }
    }
    .page-box{
        padding-top: 20px;padding: 18px;text-align: center;
    }
    
}
</style>

<template>
<div class="lists-container">
    <Tabs @on-click="addActive" v-model="tabValue">
        <TabPane label="新资源" name="0"></TabPane>
        <TabPane label="我的客户" name="1"></TabPane>
        <TabPane label="待回访" name="2"></TabPane>
        <TabPane label="共享客户" name="3"></TabPane>
    </Tabs>
    <v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="请输入客户姓名/编号/手机号"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>
    <case-bar-filter menuId="801" modelName="客户管理" ref="casebar" @tagListChange="tagListChange" title="标签" :from="2" class="filter">></case-bar-filter>
    <time-optpons ref="entryOptpons" :width="88" :timeList='entryTime' v-if="tabValue == 1" @onDataPickStart="entryStart" @onDataPickEnd="entryEnd" @timeChange="entryChange"></time-optpons>
    <time-optpons ref="dataOptpons" :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
    <time-optpons ref="dataOptponsLast" :width="88" v-if="tabValue == 1" :timeList='signTimeLast' @onDataPickStart="onDataPickStartLast" @onDataPickEnd="onDataPickEndLast" @timeChange="timeChangeLast"></time-optpons>
    <div class="search-data" v-if="tabValue == 1">
        <span class="title">跟进阶段</span>
        <ul>
            <li :class="[!stageChecked ? 'active' : '']" @click="changeStage()">不限</li>
            <li v-for="item in stagelists" :key="item.id" @click="changeStage(item)"
                :class="{ active:stageChecked === item.id}" >{{ item.label }}</li>
        </ul>
    </div>
    <div class="search-data" v-if="tabValue == 1">
        <span class="title">客户分组</span>
        <ul>
            <li :class="[!fzChecked ? 'active' : '']" @click="changeFz()">不限</li>
            <li v-for="item in fzlists" :key="item.id" @click="changeFz(item)"
                :class="{ active:fzChecked === item.id}" >{{ item.name }}</li>
        </ul>
        <Button style="margin-top:2px;margin-left: 8px;" type="primary" @click="showFzModal" size="small">编辑分组</Button>
    </div>
    <div class="count">共找到  <span>{{ count }}</span> 条数据</div>
    <div class="btn-lists-div">
        <span>客户列表</span>
        <div class="btn-lists" v-if="tabValue == 1" v-show="showBtns">
            <Button type="primary" @click="showMoveGroup">移动分组</Button>
            <Button type="primary" @click="showAssignmentModal">转让客户</Button>
            <Button type="primary" @click="showMessageModal" v-if="false">发短信</Button>
            <Button type="primary" @click="showEmailModal">发邮件</Button>
        </div>
    </div>
    <!-- 我的客户 -->
    <tablecrm :tableType="tabValue" v-if="tabValue == 1" :lists="list0"
        :globalFallDuration="globalFallDuration" 
        :pageNo="pageNo" :pageCount="pageCount" :pageSize="pageSize" @delResource="delResource"
        :count="count" @pageChange="pageChange" @sizeChange="sizeChange"
        @sortTable="sortTable"
        @onFilterListsSource="filterListsSource"
        @onFilterStar="filterStar"
        @onChoosePeople="choosePeople"
        @on-select-change="selectChange">
    </tablecrm>
    <!-- 新资源 -->
    <tablecrm :tableType="tabValue" v-if="tabValue == 0" :lists="list1"
        :fdDuration="fdDuration"
        :qdDuration="qdDuration"
        :pageNo="pageNo" :pageCount="pageCount" :pageSize="pageSize" @delResource="delResource"
        :count="count" @pageChange="pageChange" @sizeChange="sizeChange"
        @sortTable="sortTable"
        @onFilterListsSource="filterListsSource"
        @onFilterStar="filterStar">
    </tablecrm>
    <tablecrm :tableType="tabValue" v-if="tabValue == 2" :lists="list2"
        :pageNo="pageNo" :pageCount="pageCount" :pageSize="pageSize" :count="count"
         @pageChange="pageChange" @sizeChange="sizeChange"
         @sortTable="sortTable"
         @onFilterStar="filterStar">
    </tablecrm>
    <tablecrm :tableType="tabValue" v-if="tabValue == 3" :lists="list3"
        :pageNo="pageNo" :pageCount="pageCount" :pageSize="pageSize" :count="count"
         @pageChange="pageChange" @sizeChange="sizeChange"
         @sortTable="sortTable"
         @onFilterShareType="filterShareType"
         @onFilterStar="filterStar">
    </tablecrm>
    <!-- 发短信弹窗 -->
    <send-message v-if="false" ref="sendMessageModal" @onRefresh="getLists"></send-message>
    <!-- 转让 -->
    <assignment-modal ref="assignmentModal" @onRefresh="getLists"></assignment-modal>
    <!-- 发邮件 -->
    <email-modal ref="emailModal" @onRefresh="getLists"></email-modal>
    <!-- 共享 -->
    <share-modal ref="shareModal" @onRefresh="getLists"></share-modal>
    <!-- 分组 -->
    <edit-group ref="editGroupRef" @getFzLists="getFzLists()"></edit-group>
</div>
</template>

<script>

import valid, {errors, crmCustomerSale, crmNotification, crmCustomerShare, sys, common} from '../../libs/request.js';
import vSelect from '@public/modules/vSelect';
import CaseBarFilter from '@public/modules/caseBarFilter';
import tablecrm from './tablecrm';
import timeOptpons from "../../modules/timeOptpons.vue";
import {mapMutations} from 'vuex';

import sendMessage from "../../modules/modal/sendMessage.vue";
import assignmentModal from "../../modules/modal/assignmentModal.vue";
import emailModal from "../../modules/modal/emailModal.vue";
import shareModal from "../../modules/modal/shareModal.vue";
import editGroup from "../../modules/modal/editGroup.vue";

export default {
    data(){
        return {
            qdDuration:'',
            fdDuration:'',
            globalFallDuration:'',
            fzChecked: '',
            fzlists: [],
            showBtns: false,
            tabValue: 0,
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            count: 0,
            compact: '',
            stageChecked: '',
            stagelists:[],
            list0: [],
            list1: [],
            list2: [],
            list3: [],
            checkedLists: [],
            params: {
                showType: 1
            },
            typeOld: 0,
            shareId: '',
            signTime: {
                title: '更新时间',
                list: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ]
            },
            signTimeLast: {
                title: '最后联系时间',
                list: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ]
            },
            entryTime: {
                title: '录入时间',
                list: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ]
            },
            getListsFlag: true,
        };
    },
    computed: {

    },
    components: {
        vSelect, CaseBarFilter, tablecrm, timeOptpons,
        sendMessage, assignmentModal, emailModal, shareModal, editGroup
    },
    created(){
        this.getCrmSaleFallInfo()
    },
    mounted(){
        this.getLists();
        this.getFzLists();
        this.getStagelists();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getCrmSaleFallInfo(){
            crmCustomerSale.getCrmSaleFallInfo({}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.fdDuration = res.data.data.fdDuration
                    this.qdDuration = res.data.data.qdDuration
                    this.globalFallDuration = res.data.data.globalFallDuration
                }
            }).catch(errors.call(this));
        },
        getFzLists() {
            // 获取分组列表
            let params = {
                parentId: 5001
            }
            common.getUserTagList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.fzlists = res.data.data;
                    this.$refs.editGroupRef.uploadLitst(this.fzlists);
                }
            }).catch(errors.call(this));
        },
        getStagelists() {
            // 获取跟进阶段字典
            let params = {
                types: 'crm_customer_sale_status'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.stagelists = res.data.data.crm_customer_sale_status;
                }
            }).catch(errors.call(this));
        },
        getLists(boo) {
            this.updateLoadingStatus({isLoading:true});
            // 获取列表
            this.resetTable();
            if(!boo) this.pageNo = 1;
            
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            
            crmCustomerSale.listPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    if(this.params.showType == 0) {
                        this.list0 = listData.list;
                    }else if(this.params.showType == 1) {
                        let tempLists = [];
                        listData.list.forEach(e => {
                            let temp = e;
                            if(e.countDown && e.countDown > 0) {
                                let countDownMinute = parseInt(e.countDown / 60);
                                let countDownSecond = parseInt(e.countDown % 60);
                                
                                if(countDownMinute < 10) {
                                    countDownMinute = '0' + countDownMinute;
                                }
                                if(countDownSecond < 10) {
                                    countDownSecond = '0' + countDownSecond;
                                }
                                temp.countDown = countDownMinute + ':' + countDownSecond;
                                
                            }else{
                                temp.countDown = '';
                            }

                            tempLists.push(temp);
                        });
                        this.list1 = tempLists;
                    }else if(this.params.showType == 2) {
                        this.list2 = listData.list;
                    }else if(this.params.showType == 4) {
                        this.list3 = listData.list;
                    }
                    this.pageNo = listData.pageNo;
                    this.pageSize = listData.pageSize;
                    this.count = listData.count;
                    this.pageCount = listData.pageCount;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
            // this.pageNo = 1;
        },
        addActive(val) {
            // 顶部切换 tabs
            if(this.typeOld == val) return;
            this.typeOld = val;
            this.getListsFlag = false;
            this.params = {};
            if(val == 1) { // 全部
                this.params.showType = 0;
                this.signTime.title = '更新动态时间';
            } else if(val == 0) { // 新客户
                this.params.showType = 1;
                this.signTime.title = '更新时间';
            } else if(val == 2) { // 待回访
                this.params.showType = 2;
                this.signTime.title = '回访时间';
            } else if(val == 3) { // 共享客户
                this.params.showType = 4;
                this.signTime.title = '共享时间';
            }

            // 跟进阶段
            this.stageChecked = '';
            delete this.params.status;

            // this.resetTable();

            this.compact = '';
            delete this.params.nameOrNo;
            delete this.params.endLastTime;
            delete this.params.startLastTime;
            delete this.params.startTime;
            delete this.params.endTime;
            if(val != 2) {
                let data = [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ];
                this.signTime.list = data;
                this.$refs['dataOptpons'].timeChange('');
            }
            if(val == 2) {
                // 待回访默认今天
                this.signTime.list = [
                    {
                        label: '今天',
                        value: 0
                    },
                    {
                        label: '最近7天',
                        value: -7
                    },
                    {
                        label: '最近30天',
                        value: -30
                    },
                ]
                this.$refs['dataOptpons'].timeChange(0);
            }
            // this.$refs['entryOptpons'].timeChange('');
            // this.$refs['dataOptponsLast'].timeChange('');
            // 客户分组
            this.fzChecked = '';
            delete this.params.group;
            // 标签初始化
            this.$refs['casebar'].clearLimit();
            this.$refs['casebar'].ok();
        },
        textChange() {
            // 搜索
            if(this.compact != '') {
                this.params.nameOrNo = this.compact;
            } else {
                delete this.params.nameOrNo;
            }
            this.getLists();
        },
        tagListChange(ids) {
            // 选择标签
            this.params.searchTags = ids;
            this.getLists();
        },
        /*
		* 日期选择 
		*/
        onDataPickStart(start, end) {
            this.params.startTime = start;
            this.params.endTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        onDataPickEnd(start, end) {
            this.params.startTime = start;
            this.params.endTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        timeChange(start, end) {
            if(!start) end = ''
            if(start == end && start) {
                let time = new Date(new Date().setDate(new Date(start).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startTime = start ? `${start}` : '';
            this.params.endTime = end ? `${end}` : '';
            if(this.getListsFlag) {
                this.pageNo = 1;
                this.getLists();
            }else{
                this.getListsFlag = true;
            }
        },
        // 最后联系时间
        onDataPickStartLast(start, end) {
            this.params.startLastTime = start;
            this.params.endLastTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        onDataPickEndLast(start, end) {
            this.params.startLastTime = start;
            this.params.endLastTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        timeChangeLast(start, end) {
            if(!start) end = ''
            if(start == end && start) {
                let time = new Date(new Date().setDate(new Date(start).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startLastTime = start ? `${start}` : '';
            this.params.endLastTime = end ? `${end}` : '';
            this.pageNo = 1;
            this.getLists();
        },
        // end
        changeStage(obj) {
            // 选择跟进阶段
            if(obj) {
                this.stageChecked = obj.id;
                this.params.status = obj.value;
            }else{
                this.stageChecked = '';
                delete this.params.status;
            }
            this.getLists();
        },
        changeFz(obj) {
            // 选择客户分组
            if(obj) {
                this.fzChecked = obj.id;
                this.params.group = obj.id;
            }else{
                this.fzChecked = '';
                delete this.params.group;
            }
            this.getLists();
        },
        
        selectChange(selection) {
            // 勾选多选框
            if(selection && selection.length > 0) {
                this.showBtns = true;
            }else{
                this.showBtns = false;
            }
            this.checkedLists = selection;
            // console.log(selection)
        },
        choosePeople(item){
            // 打开共享客户弹窗
            this.shareId = item.cusId;
            this.$refs.shareModal.showShare(this.shareId, true);
        },
        showAssignmentModal() {
            // 打开转让客户弹窗
            this.$refs.assignmentModal.showAssignment(this.checkedLists);
        },
        showMessageModal() {
            // 打开发送短信弹窗
            this.$refs.sendMessageModal.showMessage(this.checkedLists);
        },
        showEmailModal() {
            // 打开发送email弹窗
            this.$refs.emailModal.showEmail(this.checkedLists);
        },
        delResource(list) {
            // 倒计时结束，掉入TMK公共库
            let data = {
                id: list.id
            }
            crmCustomerSale.dealFallCustomer(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.getLists();
                }
            }).catch(errors.call(this));
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists(true);
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists(true);
        },
        sortTable(num) {
            // 排序
            if(num === '') {
                delete this.params.orderType;
            }else{
                this.params.orderType = num;
            }
            this.getLists();
        },
        filterListsSource(num) {
            // 新客户-筛选来源
            if(num === '') {
                delete this.params.flag;
            }else{
                this.params.flag = num;
            }
            this.getLists();
        },
        filterShareType(num) {
            // 共享客户-筛选共享类型
            if(num === '') {
                delete this.params.shareType;
            }else{
                this.params.shareType = num;
            }
            this.getLists();
        },
        filterStar(num) {
            // 星级筛选
            if(num === '') {
                delete this.params.star;
            }else{
                this.params.star = num;
            }
            this.getLists();
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        },
        showFzModal() {
            // 编辑分组
            this.$refs.editGroupRef.showEditGroup(this.fzlists);
        },
        showMoveGroup() {
            // 移动分组
            this.$refs.editGroupRef.showMoveGroup(this.fzlists, this.checkedLists);
        },
        entryStart(start, end) {
            this.params.startInsertTime = start;
            this.params.endInsertTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        entryEnd(start, end) {
            this.params.startInsertTime = start;
            this.params.endInsertTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        entryChange(start, end) {
            if(!start) end = ''
            if(start == end && start) {
                let time = new Date(new Date().setDate(new Date(start).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startInsertTime = start ? `${start}` : '';
            this.params.endInsertTime = end ? `${end}` : '';
            this.pageNo = 1;
            this.getLists();
        },
        resetTable() {
            // 切换的时候，重置table数据
            this.showBtns = false;
            this.checkedLists = [];
        },
    }
}
</script>


