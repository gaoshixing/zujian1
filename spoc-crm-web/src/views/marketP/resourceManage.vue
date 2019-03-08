<style lang="less">
.customer-manage-container{
    position: relative;border-top: 1px solid #e0e0e0;
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;min-height: 32px;
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
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
    // 表格
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table {
        th{
            background: #fff;
        }
    }
    .ivu-table:after {
        display: none;
    }
    .checkbox-table{
        th,td{
            &:first-child{
                .ivu-table-cell{
                    display: inline;
                }
            }
        }
    }
    .table-name{
        position: relative;display: inline-block;padding: 7px 0 3px;
        overflow: hidden;text-overflow: ellipsis;white-space: normal;word-break: break-all;
        &.urgent-flag{
            padding: 7px 16px 3px;
            &:after{
                content:'急';
                position: absolute;right: 0;top: 4px;line-height: 1;
                color: #f00;font-size: 12px;
            }
        }
        &.new-flag{
            padding: 7px 12px 3px;
            &:after{
                content:'';
                position: absolute;right: 0;top: 4px;
                width: 8px;height: 8px;border-radius: 8px;background: #f00;
            }
        }
    }
    .resource-btns{
        padding-top: 5px;
        a{
            display: inline-block;width: 25px;margin: 0 4px;line-height: 1;
        }
    }
}
</style>
    
<template>
<div class="customer-manage-container">
    <v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="请输入资源来源名称/创建人/客户编号/姓名/手机号"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>
    <div class="search-data">
        <span class="title">来源渠道</span>
        <ul>
            <li :class="[!sourceChecked ? 'active' : '']" @click="changeSource()">不限</li>
            <li v-for="item in sourcelists" :key="item.value" @click="changeSource(item)"
                :class="{ active: sourceChecked === item.value}" >{{ item.label }}</li>
        </ul>
    </div>
    <time-optpons ref="timeTem" :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
    <div class="search-data" v-if="isLeader" style="margin-top:10px;">
        <span class="title">分公司</span>
        <ul>
            <li :class="[!branchOfficeChecked ? 'active' : '']" @click="changeBranchOffice()">不限</li>
            <li v-for="item in branchOfficelists" :key="item.id" @click="changeBranchOffice(item)"
                :class="{ active: branchOfficeChecked === item.id}" >{{ item.remarks }}</li>
        </ul>
    </div>
    <div class="count">共找到  <span v-text="count"></span> 条数据，总获客人数 <span v-text="countRes"></span></div>
    <div class="btn-lists-div">
        <span>客户列表</span>
        <div class="btn-lists">
            <Button type="primary" @click="resourceInput">资源导入</Button>
        </div>
    </div>
    <Table class="checkbox-table"
        :columns="columns"
        :data="list"
        @on-sort-change="sortTable">
    </Table>
    <div class="page-box" v-show="pageCount > 1">
        <div style="margin: auto;display: inline-block;">
            <Page :current="pageNo"
                :total="count"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </div>
    <resource-modal ref="modal"></resource-modal>
    <Modal
        v-model="deleteModal"
        title="提示"
        @on-ok="deleteItem"
        @on-cancel="cancel">
        <p>是否确定删除？</p>
    </Modal>
</div>
</template>

<script>

import { mapState } from 'vuex';
import valid, {errors, crmCustomerImport, sys} from '../../libs/request.js';
import vSelect from '@public/modules/vSelect';
import resourceModal from './components/resourceModal.vue';
import timeOptpons from "../../modules/timeOptpons.vue";

export default {
    data(){
        return {
            deleteModal: false,
            deleteId: '',
            isLeader: false,
            mName: '',
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            count: 0,
            compact: '',
            params: {},
            sourceChecked: '',
            sourcelists:[],
            branchOfficeChecked: '',
            branchOfficelists: [],
            list: [],
            checkedLists: [],
            columns: [
                {
                    title: '渠道名称',
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.showModal(params.row.id);
                                }
                            }
                        },params.row.name)
                    }
                },
                {
                    title: '创建人',
                    align: 'center',
                    width: 90,
                    key: 'createByName',
                },
                {
                    title: '所属分公司',
                    align: 'center',
                    width: 100,
                    key: 'createByCompanyName',
                    render: (h, params) => {
                        let self = this;
                        return h('div', {}, params.row.createByCompanyName ? params.row.createByCompanyName.split(' ')[0] : '')
                    },
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createDate',
                    width: 160,
                    sortable: 'custom'
                },
                {
                    title: '获客人数',
                    align: 'center',
                    key: 'num',
                    width: 110,
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.$router.push({
                                        name: "crm.customerManage",
                                        query: {
                                            importId: params.row.id,
                                            // direct: params.row.direct,
                                            status: params.row.status
                                        }
                                    });
                                }
                            }
                        },params.row.num)
                    }
                },
                {
                    title: '资源有效率',
                    align: 'center',
                    key: 'effectiveRate',
                    sortable: 'custom',
                },
                {
                    title: '资源优质率',
                    align: 'center',
                    key: 'highQualityRate',
                    sortable: 'custom',
                },
                {
                    title: '客户转化率',
                    align: 'center',
                    key: 'conversionRate',
                    sortable: 'custom',
                },
                {
                    title: '提交状态',
                    align: 'center',
                    key: 'status',
                    filters: [
                        {
                            label: '未提交',
                            value: 0
                        },
                        {
                            label: '已提交',
                            value: 1
                        }
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filterLists(value, row);
                    },
                    render: (h, params) => {
                        if(params.row.status === '0') {
                            return h("span", '未提交')
                        }else{
                            return h("span", '已提交')
                        }
                        
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 110,
                    render: (h, params) => {
                        let dom = [];
                        if(params.row.status === '0') {
                            dom.push(h("a",  {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: "crm.resourceEdit",
                                            query: {
                                                formId: params.row.id
                                            }
                                        });
                                    }
                                }
                            }, '编辑'));
                            if(params.row.num == '0') {
                                dom.push(h("a",  {
                                    style: {
                                        'margin-left': '6px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteId = params.row.id;
                                            this.openDeleteModal();
                                        }
                                    }
                                }, '删除'));
                            }
                        }
                        return h("div",  dom)
                    }
                },
            ],
            signTime: {
                title: '创建时间',
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
            countRes: 0
        };
    },
    computed: {
        ...mapState(['userInfo']),
    },
    components: {
        vSelect, resourceModal, timeOptpons
    },
    created() {
        this.mName = this.$route.query.mName;
        // 判断权限
        if(this.userInfo.roleId) {
            let roleLists = this.userInfo.roleId.split(',');
            if(roleLists.indexOf('911') != -1 || roleLists.indexOf('912') != -1 || roleLists.indexOf('1') != -1) {
                // 集团总监
                this.isLeader = true;
            }
        }
    },
    mounted(){
    	this.setTimes();
        if(this.isLeader) {
            this.getFilialeLists();
        }
        if(this.mName) {
            this.compact = this.mName;
        }
        this.getLists();
        this.getStagelists();
    },
    methods: {
    	setTimes(){
    		let obj=this.$refs.timeTem.setTime(0);
            if(!obj.beforeTime) obj.afterTime = ''
            if(obj.beforeTime == obj.afterTime && obj.beforeTime) {
                let time = new Date(new Date().setDate(new Date(obj.beforeTime).getDate() + 1));
				time.setHours(0);
				time.setMinutes(0);
				time.setSeconds(0);
				obj.afterTime = time.format('yyyy-MM-dd hh:mm:ss')
            }
            this.params.startTime = obj.beforeTime ? `${obj.beforeTime}` : '';
            this.params.endTime = obj.afterTime ? `${obj.afterTime}` : '';
    	},
        openDeleteModal() {
            // 打开弹窗
            this.deleteModal = true;
        },
        deleteItem() {
            // 删除资源导入
            let params = {
                id: this.deleteId
            }
            crmCustomerImport.delete(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('删除成功');
                    this.getLists();
                }
            }).catch(errors.call(this));
        },
        getStagelists() {
            // 获取来源渠道字典
            let params = {
                types: 'crm_source_type'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.sourcelists = res.data.data.crm_source_type;
                    if(this.mName) {
                        this.sourceChecked = 'qddl';
                    }
                }
            }).catch(errors.call(this));
        },
        getFilialeLists() {
            // 获取分公司列表
            let data = {
                grade: 2,
                types: '1,3'
            }
            sys.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.branchOfficelists = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
            // sys.officeFindCompanyList().then(valid.call(this)).then(res => {
            //     if(res.ok) {
            //         this.branchOfficelists = res.data.data;
            //     }
            // }).catch(errors.call(this));
        },
        getLists() {
            if(this.mName) {
                this.params.nameOrCreateBy = this.mName;
            }
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            crmCustomerImport.listPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    this.list = data.list;
                    this.pageCount = data.pageCount;
                    this.count = data.count;
                }
            }).catch(errors.call(this));
            // let data = {
            //     pageNo: this.pageNo,
            //     pageSize: this.pageSize,
            //     sourceType: 'sjzj',
            // }
            // if(this.params.startTime) {
            //     data.startTime = this.params.startTime;
            //     data.endTime = this.params.endTime;
            // }
            crmCustomerImport.getTotalCustomerNumber(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.countRes = res.data.data ? res.data.data : '0';
                }
            }).catch(errors.call(this));
        },
        textChange() {
            // 搜索
            if(this.compact != '') {
                this.params.nameOrCreateBy = this.compact;
                // this.params.customerNameOrNo = this.compact;
            } else {
                delete this.params.nameOrCreateBy;
                // delete this.params.customerNameOrNo;
            }
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
        changeSource(obj) {
            // 来源渠道
            if(obj) {
                this.sourceChecked = obj.value;
                this.params.sourceType = obj.value;
            }else{
                this.sourceChecked = '';
                delete this.params.sourceType;
            }
            this.getLists();
        },
        changeBranchOffice(obj) {
            // 分公司选择
            if(obj) {
                this.branchOfficeChecked = obj.id;
                this.params.companyIds = obj.id;
            }else{
                this.branchOfficeChecked = '';
                delete this.params.companyIds;
            }
            this.getLists();
        },
        sortTable(column) {
            // 排序时有效，当点击排序时触发
            if(column.order == 'normal'){ 
                delete this.params.orderType; 
            }else{ 
                if(column.key == 'createDate') {
                    if(column.order === 'desc'){
                        this.params.orderType = 10; 
                    }else if(column.order === 'asc'){
                        this.params.orderType = 0;
                    }
                }else if(column.key == 'num') {
                    if(column.order === 'desc'){
                        this.params.orderType = 11;
                    }else if(column.order === 'asc'){
                        this.params.orderType = 1;
                    }
                }else if(column.key == 'effectiveRate') {
                    if(column.order === 'desc'){
                        this.params.orderType = 12;
                    }else if(column.order === 'asc'){
                        this.params.orderType = 2;
                    }
                }else if(column.key == 'highQualityRate') {
                    if(column.order === 'desc'){
                        this.params.orderType = 13;
                    }else if(column.order === 'asc'){
                        this.params.orderType = 3;
                    }
                }else if(column.key == 'conversionRate') {
                    if(column.order === 'desc'){
                        this.params.orderType = 14;
                    }else if(column.order === 'asc'){
                        this.params.orderType = 4;
                    }
                }
            }
            this.getLists();
        },
         pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },

        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
        filterLists(value, row) {
            // 过滤提交状态
            if(value != '') {
                this.params.status = value[0];
            }else{
                delete this.params.status;
            }
            this.getLists();
        },
        resourceInput() {
            // 资源导入
            this.$router.push({
                name: "crm.resourceImport",
            });
        },
        showModal(id) {
            this.$refs['modal'].showModal(id);
        },
        datafunc(word) {
            return new Promise((resolve, reject) => {});
        },
        cancel() {

        },
    },
}
</script>


