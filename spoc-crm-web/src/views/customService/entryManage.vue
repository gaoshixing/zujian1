<style lang="less">
.entry-manage-container{
    border-top: 1px solid #e0e0e0;margin-bottom: 88px;
    .filter{
        .titleBar span:first-child{
            width: 80px !important;text-align: right !important;color: #999 !important;
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
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table th {
        background: #fff;
    }
    .ivu-table:after {
        display: none;
    }
    .search-data{
        position: relative;padding-left: 95px;zoom: 1;width: 860px;min-height: 34px;margin-top: 4px;
        &:after,&::before{
            content: '';display: table;clear: both;visibility: hidden;font-size: 0;height: 0;
        }
        .title{
            width: 80px;position: absolute;left: 0;top: 0;line-height: 25px;
            color: #999;text-align: right;
        }
        li,.more{
            float: left;padding: 5px 12px;cursor: pointer;margin:0 10px 8px 3px;line-height: 1;
            &.active{
                background: #44bcb6;color: #fff;
            }
        }
    }
    .ivu-table-row{
        .changes,.disabled{
            margin-left: 15px;
        }
        .changes{
            color: #f00 !important;
           
        }
        .disabled{
             color: #999 !important;cursor: default;
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
    .table-name{
        position: relative;display: inline-block;padding: 7px 0 3px;min-height: 28px;
        overflow: hidden;text-overflow: ellipsis;white-space: normal;word-break: break-all;
        &.urgent-flag{
            padding: 7px 16px 3px;
            &:after{
                content:'急';
                position: absolute;right: 0;top: 4px;line-height: 1;
                color: #f00;font-size: 12px;
            }
        }
    }
}
</style>

<template>
<div class="entry-manage-container">
    <v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="请输入客户姓名/编号/微信号"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>
    <case-bar-filter menuId="801" @tagListChange="tagListChange" title="标签" :from="2" class="filter">></case-bar-filter>
    <time-optpons ref="timeTem" :width="88" :timeList='signTime' @onDataPickStart="onDataPickStart" @onDataPickEnd="onDataPickEnd" @timeChange="timeChange"></time-optpons>
    <div class="search-data" v-if="isLeader">
        <span class="title">分公司</span>
        <ul>
            <li :class="[!branchOfficeChecked ? 'active' : '']" @click="changeBranchOffice()">不限</li>
            <li v-for="item in branchOfficelists" :key="item.id" @click="changeBranchOffice(item)"
                :class="{ active: branchOfficeChecked === item.id}" >{{ item.remarks }}</li>
        </ul>
    </div>
    <div class="search-data" v-if="isLeader">
        <span class="title">客  服</span>
        <ul>
            <li :class="[!serverChecked ? 'active' : '']" @click="changeServers()">全部</li>
            <li v-for="(item, index) in serverlists" :key="item.id" 
                @click="changeServers(item)" v-show="index < showMaxLength"
                :class="{active:serverChecked === item.id}" >{{ item.name }}</li>
        </ul>
        <a href="javascript:;" class="more" v-if="serverlists.length > 8" @click="showMore">{{ showMoreText }}</a>
    </div>
    <div class="count">共找到  <span>{{ count }}</span> 条数据</div>
    <div class="btn-lists-div">客户列表</div>
    <div class="listsTable">
        <Table :loading="loading" 
            class="table" 
            :columns="columns"
            :data="list"
            @on-sort-change="sortTable">
		</Table>
    </div>
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
</div>
</template>

<script>

import { mapState } from 'vuex';
import valid, {errors, crmCustomer, sys} from '../../libs/request.js';
import vSelect from '@public/modules/vSelect';
import CaseBarFilter from '@public/modules/caseBarFilter';
import timeOptpons from "../../modules/timeOptpons.vue";

export default {
    data(){
        return {
            compact: '',
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            count: 0,
            branchOfficeChecked: '',
            branchOfficelists: [],
            loading: true,
            columns: [
                {
                    title: '编号',
                    align: 'center',
                    key: 'cusCode',
                    render: (h, params) => {
                        return h('a', {
                            // attrs: {
                            //     'href': this.routerGoDetail(params.row.id),
                            //     // 'target': '_blank'
                            // },
                            on: {
                                click: () => {
                                    this.routerGoDetail(params.row.id);
                                }
                            }
                        },params.row.cusCode ? parseInt(params.row.cusCode) : '')
                    }
                },
                {
                    title: '客户姓名',
                    align: 'center',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', {
                            class: {
                                'table-name': true,
                                'urgent-flag': params.row.isHot == 1,
                            }
                        },params.row.name,)
                    }
                },
                {
                    title: '来源',
                    align: 'center',
                    key: 'typeName',
                    filters: [],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    }
                },
                {
                    title: '录入人',
                    align: 'center',
                    key: 'createByName',
                },
                {
                    title: '录入时间',
                    align: 'center',
                    key: 'createDate',
                    width: 180,
                    sortable: 'custom'
                },
                {
                    title: '联系方式',
                    align: 'center',
                    key: 'lxfs',
                    filters: [
                        {
                            label: '仅电话',
                            value: 1
                        },
                        {
                            label: '仅微信',
                            value: 2
                        },
                        {
                            label: '电话和微信',
                            value: 3
                        }
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    },
                    render: (h, params) => {
                        if(params.row.lxfs == '1') return h('span', '仅电话 ')
                        else if(params.row.lxfs == '2') return h('span', '仅微信 ')
                        else if(params.row.lxfs == '3') return h('span', '电话和微信 ')
                    }
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'isAlloc',
                    filters: [
                        {
                            label: '未分单',
                            value: 0
                        },
                        {
                            label: '已分单',
                            value: 1
                        },
                        {
                            label: '已签约',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filter(value, row);
                    }
                },
                {
                    title: '分公司',
                    align: 'center',
                    key: 'fdCompanyName',
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 140,
                    render: (h, params) => {
                        if(params.row.isAlloc != '已签约') {
                            return h("div", [
                                h("a", {
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: "crm.entry",
                                                query: {
                                                    cusid: params.row.id
                                                }
                                            });
                                        }
                                    }
                                }, '编辑'),
                                h("a", {
                                    class: {
                                        disabled: params.row.isHot == 1,
                                        changes: params.row.isHot == 0
                                    },
                                    on: {
                                        click: () => {
                                            this.urgent(params);
                                        }
                                    }
                                }, '加急')
                            ])
                        }
                        
                    }
                },
            ],
            list: [],
            serverlists: [],
            serverChecked: '',
            showMaxLength: '8',
            showMoreText: '更多',
            getForm: {
                data: '', //时间
                servers: '', //客服
            },
            params: {},
            isLeader: false,
            signTime: {
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
        };
    },
    computed:{
        ...mapState(['userInfo']),
	},
    components: {
        vSelect, CaseBarFilter, timeOptpons
    },
    created() {
        if(this.userInfo.roleId) {
            let roleLists = this.userInfo.roleId.split(',');
            if(roleLists.indexOf('906') != -1 || roleLists.indexOf('1') != -1 || roleLists.indexOf('912') != -1  || roleLists.indexOf('911') != -1) {
                this.isLeader = true;
            }
        }
    },
    mounted(){
        if(this.isLeader) {
            this.getKfList();
            this.getFilialeLists();
        }
        this.setTimes();
        this.getLists();
        this.getTypeName();
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
        getTypeName() {
            // 获取来源类型
            let params = {
                types: 'crm_customer_type'
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let temp = [];
                    let lists = res.data.data.crm_customer_type;
                    lists.forEach(item => {
                        if(item.value == 'kflr' || item.value == 'swtdr' || item.value == 'tmklr') {
                            temp.push(item);
                        }
                    });
                    this.$set(this.columns[2],'filters',temp);
                }
            }).catch(errors.call(this));
        },
        getKfList() {
            // 获取客服人员列表
            crmCustomer.getKfList().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.serverlists = res.data.data;
                }
            }).catch(errors.call(this));
        },
        getLists() {
            // 获取表单
            this.list = []; // 清空当前表单
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            crmCustomer.listPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.list = listData.list;
                    this.pageNo = listData.pageNo;
                    this.pageCount = listData.pageCount;
                    this.pageSize = listData.pageSize;
                    this.count = listData.count;
                    this.loading = false
                }
            }).catch(errors.call(this));
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
        changeServers(obj) {
            // 选择客服
            if(obj) {
                this.serverChecked = obj.id;
                this.params.kfIds = obj.id;
            }else{
                this.serverChecked = '';
                delete this.params.kfIds;
            }
            this.getLists();
        },
        showMore() {
            // 查看更多客服人员
            if(this.showMaxLength == '8') {
                this.showMaxLength = this.serverlists.length;
                this.showMoreText = '收起';
            }else{
                this.showMaxLength = '8';
                this.showMoreText = '更多';
            }
            
        },
        pageChange(page) {
            this.pageNo = page;
            this.getLists();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getLists();
        },
        sortTable(column) {
            // 排序
            if(column.order == 'desc') {
                this.params.orderType = '0';
            }else if(column.order == 'asc') {
                this.params.orderType = '10';
            }
            this.getLists();
        },
        urgent(data) {
            // 加急
            let params = {
                id: data.row.id
            }
            if(data.row.isHot == 0){ 
                crmCustomer.updateHot(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        data.row.isHot = 1;
                        this.$Message.success('加急成功'); 
                    }
                }).catch(errors.call(this));
            } 
        },
        filter(value, row) {
            if(row == 'typeName') {
                // 来源
                if(value != '') {
                    this.params.type = value[0];
                }else{
                    delete this.params.type;
                }
            }else if(row == 'lxfs') {
                // 联系方式
                if(value != '') {
                    this.params.lxfs = value[0];
                }else{
                    delete this.params.lxfs;
                }
            }else if(row == 'isAlloc') {
                // 状态
                if(value != '') {
                    this.params.isAlloc = value[0];
                }else{
                    delete this.params.isAlloc;
                }
            }
            this.getLists();
        },
        routerGoDetail(cusId) {
            // 详情
            const {href} = this.$router.resolve({
                name: 'crm.detail',
                query: {
                    id: cusId,
                    from: 'assets',
                }
            });
            // return href;
            window.open(href, '_blank');
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
        changeBranchOffice(obj) {
            // 分公司选择
            if(obj) {
                this.branchOfficeChecked = obj.id;
                this.params.fdCompanyId = obj.id;
            }else{
                this.branchOfficeChecked = '';
                delete this.params.fdCompanyId;
            }
            this.getLists();
        },
        datafunc() {
            return new Promise((resolve, reject) => {});
        }
    }
}
</script>


