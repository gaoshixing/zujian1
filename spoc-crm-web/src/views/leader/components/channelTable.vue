<style lang="less">
.customer-table-container{
    position: relative;
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
        &.new-flag{
            padding: 7px 12px 3px;
            &:after{
                content:'';
                position: absolute;right: 0;top: 4px;
                width: 8px;height: 8px;border-radius: 8px;background: #f00;
            }
        }
    }
    .text-left{
        text-align: left;
    }
    .no-edit{
        color: #acacac !important;cursor: default;
    }
}
</style>
    
<template>
<div class="customer-table-container">
    <Table class="checkbox-table"
        :loading="loading"
        :columns="columns"
        :data="list"
        @on-selection-change="selectChange"
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
</div>
</template>

<script>

import { mapState } from 'vuex';
import valid, {errors, crmCustomer, sys, common} from '../../../libs/request.js';

export default {
    props: {
        mId: {
            type: String,
            required: false
        },
        importId: {
            type: String,
            required: false
        },
    },
    data(){
        return {
            loading: true,
            columns: [
                {
                    type: 'selection',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '编号',
                    align: 'center',
                    key: 'cusCode',
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.routerGoDetail(params.row.id,params);
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
                            },
                        },params.row.name)
                    }
                },
                // {
                //     title: '分值',
                //     align: 'center',
                //     key: 'score',
                //     sortable: 'custom'
                // },
                {
                    title: '星级',
                    align: 'center',
                    key: 'star',
                    filters: [],
                    filterMultiple: false,
                    filterRemote (value, row) {
                        this.filterStar(value, row);
                    }
                },
                {
                    title: '来源渠道',
                    align: 'center',
                    key: 'sourceName',
                },
                {
                    title: '最新动态',
                    align: 'center',
                    key: 'updateDate',
                    width: 200,
                    sortable: 'custom',
                    render: (h, params) => {
                        let text = params.row.traceDescription;
                        let textLeft = false;
                        if(text && text.length > 30) {
                            text = text.substring(0, 30) + '...';
                        }
                        if(text && text.length > 14) {
                            textLeft = true;
                        }
                        return h('div',{
                            style: {
                                'padding': '10px 0'
                            }
                        } ,[
                            h('p', params.row.updateDate),
                            h('p', {
                                class: {
                                    'text-left': textLeft
                                }
                            }, text)
                        ]);
                    }
                },
                {
                    title: '跟进人',
                    align: 'center',
                    key: 'followUpPerson',
                },
                {
                    title: '分配状态',
                    align: 'center',
                    render: (h, params) => {
                        return h('div' ,params.row.phase == 'alloc' ? '未分配' : '已分配')
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('a', {
                            // class: {
                            //     'no-edit': params.row.phase == 'alloc' ? false : true
                            // },
                            on: {
                                click: () => {
                                    // if(params.row.phase == 'alloc') {
                                        this.$router.push({
                                            name: "crm.entry",
                                            query: {
                                                cusid: params.row.id
                                            }
                                        });
                                    // }
                                }
                            }
                        } ,'编辑')
                    }
                },
            ],
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            count: 0,
            list: [],
            params: {},
        };
    },
    computed:{
        ...mapState(['userInfo','appMenuList']),
    },
    mounted(){
        this.getLists();
        this.getStarLists();
    },
    methods: {
        getLists(obj) {
            this.loading = true
            // 获取数据
            if(obj) {
                this.params = obj;
            }
            if(this.mId) {
                this.params.sourceId = this.mId;
            }
            if(this.importId) {
                this.params.importId = this.importId;
            }
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            crmCustomer.importListPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.list = listData.list;
                    this.pageNo = listData.pageNo;
                    this.pageSize = listData.pageSize;
                    this.count = listData.count;
                    this.pageCount = listData.pageCount;
                    this.$emit('onSetCount', listData.count);
                    this.loading = false
                }
            }).catch(errors.call(this));
        },
        routerGo(cusId) {
            this.$router.push({
                name: "crm.detail",
                query: {
                    id: cusId
                }
            });
        },
        routerGoDetail(cusId,params) {
        	let name=this.userInfo.name;
        	let flag=false;
        	if(name==params.row.createByName||name==params.row.followUpPerson){
        		flag=true;
        	}
            const {href} = this.$router.resolve({
                name: 'crm.detail',
                query: {
                    id: cusId,
                    from: 'usermanage',
                    recordFlag:flag
                }
            })
            window.open(href, '_blank');
        },
        sortTable(column) {
            // 排序
            let temp = 'false';
            if(column.order == 'normal'){ 
                delete this.params.orderType; 
            }else{ 
                if(column.key == 'score') {
                    if(column.order === 'desc'){
                        this.params.orderType = 10; 
                    }else if(column.order === 'asc'){
                        this.params.orderType = 0;
                    }
                }else if(column.key == 'updateDate') {
                    if(column.order === 'desc'){
                        this.params.orderType = 11;
                    }else if(column.order === 'asc'){
                        this.params.orderType = 1;
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
        filterStar(value, row) {
            // 星级筛选
            if(value[0] === '') {
                delete this.params.star;
            }else{
                this.params.star = value[0];
            }
            this.getLists();
        },
        getStarLists() {
            // 星级筛选
            let params = {
                parent: '8001'
            }
            common.listData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let temp = [];
                    res.data.data.forEach(item => {
                        temp.push({
                            label: item.name, 
                            value: item.id
                        })
                    });
                    let col = this.columns.filter(function(item){
                        return item.key == "star"; 
                    })[0];
                    this.$set(col,'filters',temp)
                }
            }).catch(errors.call(this));
        },
        selectChange(selection) {
            // 勾选多选框
            if(selection && selection.length > 0) {
                this.$emit('onSelectChange', selection, 'channel', true);
            }else{
                this.$emit('onSelectChange', selection, 'channel', false);
            }
        },
    },
}
</script>


