<style lang="less">
.customer-manage-container{
    position: relative;border-top: 1px solid #e0e0e0;
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
    .ivu-input{
        padding-top: 0;padding-bottom: 0;height: 28px;
    }
    .search-box{
        position: relative;width: 860px;min-height: 26px;
    }
    .search-btn{
        @h:26px;
        position: absolute;bottom: 0;right: 0;height: @h;line-height: @h;padding: 0;width: 60px;
    }
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;margin-top: 8px;
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
        .more{
            color: #44bcb6;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .case-manage-timePicker {
        float: left;
        .case-manage-line-div {
            display: inline-block;
            width: 10px;
            height: 2px;
            background-color: #44bcb7
        }
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
}
</style>
    
<template>
<div class="customer-manage-container">
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
    <div v-if="showCustomerTable" class="search-box">
        <div v-show="showSearchBox">
            <case-bar-filter menuId="801" modelName="客户管理" @tagListChange="tagListChange" title="标签" :from="2" class="filter">></case-bar-filter>
            <time-optpons :width="88" :timeList='signTimeLast' @onDataPickStart="onDataPickStartLast" @onDataPickEnd="onDataPickEndLast" @timeChange="timeChangeLast"></time-optpons>
            <time-optpons ref="timeTem" :width="88" :timeList='allocTime' @onDataPickStart="allocStart" @onDataPickEnd="allocEnd" @timeChange="allocChange"></time-optpons>
            <time-optpons :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
            <div class="search-data">
                <span class="title">共享关系</span>
                <ul>
                    <li :class="[!stageChecked ? 'active' : '']" @click="changeStage()">不限</li>
                    <li v-for="item in stagelists" :key="item.id" @click="changeStage(item)"
                        :class="{ active:stageChecked === item.id}" >{{ item.name }}</li>
                </ul>
            </div>
            <div class="search-data" v-if="isLeader">
                <span class="title">分公司</span>
                <ul>
                    <li :class="[!filialeChecked ? 'active' : '']" @click="changeFiliale()">不限</li>
                    <li v-for="item in filialelists" :key="item.id" @click="changeFiliale(item)"
                        :class="{ active:filialeChecked === item.id}" >{{ item.remarks }}</li>
                </ul>
            </div>
            <div class="search-data" style="width:750px;">
                <span class="title">销售顾问</span>
                <ul>
                    <li :class="[!saleChecked ? 'active' : '']" @click="changeSale()">不限</li>
                    <li v-for="(item, index) in salelists" :key="item.id + index" @click="changeSale(item)"
                        v-show="index < saleMax"
                        :class="{ active:saleChecked === item.id}" >{{ item.name }}</li>
                    <li class="more" v-text="saleMore" @click="openOrClose()" v-if="salelists.length > 9"></li>
                </ul>
            </div>
        </div>
        <Button type="primary" class="search-btn" @click="showOrHide">{{ searchText }}</Button>
    </div>
    <div class="count">共找到  <span>{{ count }}</span> 条数据</div>
    <div class="btn-lists-div">
        <span>客户列表</span>
        <div class="btn-lists" v-if="canEdit">
            <Button type="primary" @click="choosePeople" v-if="showCustomerTable" v-show="showBtns">共享客户</Button>
            <Button type="primary" @click="showAssignmentModal" v-if="showCustomerTable" v-show="showBtns">转让客户</Button>
            <Button type="primary" @click="showFenpei" v-if="!showCustomerTable && status=='1' && !isTMKLeader && !isTMK">分配客户</Button><!---->
            <Button type="primary" @click="showMessageModal" v-show="showBtns">发短信</Button>
            <Button type="primary" @click="showEmailModal" v-show="showBtns">发邮件</Button>
        </div>
    </div>
    <customer-table v-if="showCustomerTable" ref="customer" @onSelectChange="selectChange" @onSetCount="setCunt"></customer-table>
    <channel-table v-else ref="channel" @onSelectChange="selectChange" @onSetCount="setCunt" :mId="mId" :importId="importId"></channel-table>

    <!-- 发短信弹窗 -->
    <send-message ref="sendMessageModal" @onRefresh="onGetLists"></send-message>
    <!-- 转让 -->
    <assignment-modal ref="assignmentModal" @onRefresh="onGetLists"></assignment-modal>
    <!-- 发邮件 -->
    <email-modal ref="emailModal" @onRefresh="onGetLists"></email-modal>
    <!-- 共享 -->
    <share-modal ref="shareModal" @onRefresh="onGetLists"></share-modal>
    <!-- 分配 -->
    <fenpei-group ref="fenpeiModal" @getLists="onGetLists" :datas="checkedLists"></fenpei-group>
</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import valid, {errors, crmCustomerSale, crmCustomerShare, crmNotification, sys, common} from '../../libs/request.js';
import vSelect from '@public/modules/vSelect';
import CaseBarFilter from '@public/modules/caseBarFilter';
import customerTable from './components/customerTable';
import channelTable from './components/channelTable';
import timeOptpons from "../../modules/timeOptpons.vue";

import sendMessage from "../../modules/modal/sendMessage.vue";
import assignmentModal from "../../modules/modal/assignmentModal.vue";
import emailModal from "../../modules/modal/emailModal.vue";
import shareModal from "../../modules/modal/shareModal.vue";
import fenpeiGroup from "../../modules/modal/fenpeiGroup.vue";

export default {
    data(){
        return {
//          canEdit: true, //是否拥有操作权限
            shareId: '',
            searchText: '收起',
            showSearchBox: true,
//          isLeader: false, //集团leader
            showBtns: false,
            count: 0,
            compact: '',
            stageChecked: '',
            stagelists:[
                {
                    id: '1',
                    name: '有共享'
                },
                {
                    id: "0",
                    name: '无共享'
                }
            ],
            filialeChecked: '',
            filialelists: [],
            saleChecked: '',
            salelists: [],
            saleMore: '更多',
            saleMax: 9,
            checkedLists: [],
            params: {},
            showCustomerTable: true,
            mId: '',
            importId: '',
            selectFrom: '',
            signTime: {
                title: '更新动态时间',
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
            allocTime: {
                title: '分单时间',
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
            // direct: '',
            status: '',
        };
    },
    computed: {
        ...mapGetters('crm', ['isCeo', 'isWorker', 'isTMK', 'isTMKLeader', 'isMarket', 'isMarketLeader', 'isSaler', 'isSalerLeader', 'isSupervisor', 'isBranchOfficeLeader', 'isHeaderOfficeLeader']),
        ...mapState(['userInfo']),
        isLeader:function(){
        	if(this.userInfo.roleId) {
                let roleLists = this.userInfo.roleId.split(',');
                if(roleLists.indexOf('911') != -1 || 
                    roleLists.indexOf('912') != -1 || 
                    roleLists.indexOf('913') != -1 || 
                    roleLists.indexOf('917') != -1 || //开博子品牌
                    roleLists.indexOf('916') != -1 ||
                    roleLists.indexOf('918') != -1 || //财务
                    roleLists.indexOf('919') != -1 || //广州市场经理
                    roleLists.indexOf('923') != -1 || //分担经理
                    roleLists.indexOf('1') != -1) {
                    //console.log(roleLists.indexOf('923'))
                    // 集团总监
                	return true;
                }else{
                	return false
                }
            }
        },
        canEdit:function(){
            // bug：1785； 不允许共享、转让、发短信、发邮件等操作
            let roleLists = this.userInfo.roleId.split(',');
            if(roleLists.indexOf('916') != -1 || 
                roleLists.indexOf('907') != -1 ||
                roleLists.indexOf('918') != -1 ||
                roleLists.indexOf('919') != -1 ||
                roleLists.indexOf('917') != -1) {
                return false;
            }else{
                return true;
            }
        }
    },
    components: {
        vSelect, CaseBarFilter, customerTable, channelTable, timeOptpons,
        sendMessage, assignmentModal, emailModal, shareModal, fenpeiGroup
    },
    created() {
        if(this.$route.query.mId) {
            this.mId = this.$route.query.mId;
            this.showCustomerTable = false;
        }
        if(this.$route.query.importId) {
            this.importId = this.$route.query.importId;
            // this.direct = this.$route.query.direct;
            this.status = this.$route.query.status;
            this.showCustomerTable = false;
        }
        // 判断权限
        // this.$nextTick(() => {
            // console.log(this.userInfo.roleId)
        // });
        
    },
    mounted(){
        if(this.showCustomerTable) {
            this.getFilialeLists();
            this.$nextTick(()=>{
                if(this.isLeader) {
                }
                // importId: 市场资源管理的获客人数
                // mId: 渠道管理
                this.setTimes();
                if(!(this.$route.query.mId || this.$route.query.importId)) {
                    this.getSaleLists(false, true);
                }
            })
        }else{
            this.$nextTick(()=>{
                this.setTimes();
            })
        }
    },
    methods: {
    	setTimes(){
            if(this.showCustomerTable){
                let obj=this.$refs.timeTem.setTime(0);
                if(!obj.beforeTime) obj.afterTime = ''
                if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
                    let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
                    time.setHours(0);
                    time.setMinutes(0);
                    time.setSeconds(0);
                    obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
                }
                this.params.startAllocTime = obj.beforeTime ? `${obj.beforeTime}` : '';
                this.params.endAllocTime = obj.afterTime ? `${obj.afterTime}` : '';
                this.$refs.customer.getLists(this.params)
            }
    	},
        onGetLists() {
            this.showBtns = false;
            this.getLists();
        },
        getLists() {
            // 获取数据
            if(this.showCustomerTable) {
                this.$refs['customer'].getLists(this.params);
            }else{
                this.$refs['channel'].getLists(this.params);
            }
        },
        setCunt(num) {
            // 数据总数
            this.count = num;
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
            this.pageNo = 1;
            this.getLists();
        },
        onDataPickStartLast(start, end) {
            this.params.startInsertTime = start;
            this.params.endInsertTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        onDataPickEndLast(start, end) {
            this.params.startInsertTime = start;
            this.params.endInsertTime = end;
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
            this.params.startInsertTime = start ? `${start}` : '';
            this.params.endInsertTime = end ? `${end}` : '';
            this.pageNo = 1;
            this.getLists();
        },
        // 
        allocStart(start, end) {
            this.params.startAllocTime = start;
            this.params.endAllocTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        allocEnd(start, end) {
            this.params.startAllocTime = start;
            this.params.endAllocTime = end;
            this.pageNo = 1;
            this.getLists();
        },
        allocChange(start, end) {
            if(!start) end = ''
            if(start == end && start) {
                let time = new Date(new Date().setDate(new Date(start).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				end = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startAllocTime = start ? `${start}` : '';
            this.params.endAllocTime = end ? `${end}` : '';
            this.pageNo = 1;
            this.getLists();
        },
        /*
		* 日期选择 end
		*/
        changeStage(obj) {
            // 共享关系
            if(obj) {
                this.stageChecked = obj.id;
                this.params.flag = obj.id;
            }else{
                this.stageChecked = '';
                delete this.params.flag;
            }
            this.getLists();
        },
        getFilialeLists() {
            // 获取分公司列表
            let data = {
                grade: 2,
                types: '1,3'
            }
            sys.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.filialelists = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
        },
        changeFiliale(obj) {
            // 选择分公司
            if(obj) {
                this.filialeChecked = obj.id;
                this.params.companyId = obj.id;
                // this.getLists();
                this.getSaleLists(obj.id);
            }else{
                this.filialeChecked = '';
                delete this.params.companyId;
                // this.getLists();
                this.getSaleLists();
            }
        },
        getSaleLists(id, b) {
            // 获取销售顾问
            let data = {}
            if(id) {
                data = {
                    companyId: id
                }
            }
            crmCustomerSale.getSaleList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.salelists = res.data.data;
                    this.saleChecked = '';
                    delete this.params.ownerId;
                    if(!b) this.getLists();
                }
            }).catch(errors.call(this));
        },
        openOrClose() {
            // 展开或者收起销售顾问列表
            if(this.saleMax == 9) {
                this.saleMore = '收起';
                this.saleMax = this.salelists.length;
            }else{
                this.saleMore = '更多';
                this.saleMax = 9;
            }
        },
        changeSale(obj) {
            // 选择销售顾问
            if(obj) {
                this.saleChecked = obj.id;
                this.params.ownerId = obj.id;
            }else{
                this.saleChecked = '';
                delete this.params.ownerId;
            }
            this.getLists();
        },
        selectChange(selection, str, boo) {
            // 勾选多选框
            this.selectFrom = str;
            this.showBtns = boo;
            this.checkedLists = selection;
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
        choosePeople() {
            // 打开共享客户弹窗
            let arr = [];
            this.checkedLists.forEach(e => {
                arr.push(e.cusId)
            });
            this.shareId = arr.join();
            this.$refs.shareModal.showShare(this.shareId);
        },
        showFenpei() {
            // 打开分配客户弹窗
            let flag = true;
            this.checkedLists.forEach(item => {
                if(item.phase != 'alloc') {
                    flag = false;
                }
            });
            if(flag) this.$refs.fenpeiModal.showFenpei(this.checkedLists);
            else this.$Message.error('请选择未分配的客户');
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        },
        showOrHide() {
            if(this.showSearchBox) {
                this.showSearchBox = false;
                this.searchText = '展开';
            }else{
                this.showSearchBox = true;
                this.searchText = '收起';
            }
        },
        
    },
}
</script>


