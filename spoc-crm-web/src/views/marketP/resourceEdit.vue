<style lang="less">
.resource-edit-container{
    position: relative;
    .btn-lists{
        position: absolute;top: 0;right: 0;padding: 20px 0;height: 73px;z-index: 9;
        button{
            width: 85px;height: 30px;line-height: inherit;padding: 0;margin-left: 15px;font-size: 14px;
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
    .count{
        position: relative;top: 6px;
        font-size: 14px;color: #222;
        span{
            font-size: 18px;color: #44bcb7;
        }
    }
}
</style>
    
<template>
<div class="resource-edit-container">
    <div class="btn-lists">
        <Button type="primary" @click="save()">保存</Button>
        <Button type="primary" @click="submit()">提交</Button>
    </div>
    <resource-import ref="import" :formId="formId" :count="count"></resource-import>
    <div class="count">获客人数：<span>{{ count }}</span> 人</div>
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
    <Modal v-model="resourceEditModal" title="提示" @on-ok="importDelete" width='600' class="model-resource-edit">
        <p>是否删除当前数据？</p>
    </Modal>
</div>
</template>

<script>

import {mapMutations,mapState} from 'vuex';
import valid, {errors, crmCustomer, crmCustomerImport, sys} from '../../libs/request.js';
import resourceImport from './resourceImport'

export default {
    data(){
        return {
            count: 0, //获客人数
            columns: [
                {
                    title: '编号',
                    align: 'center',
                    key: 'cusCode',
                    render: (h, params) => {
                        return h('a', {
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
                            },
                        },params.row.name)
                    }
                },
                {
                    title: '分值',
                    align: 'center',
                    key: 'score',
                    sortable: 'custom'
                },
                {
                    title: '客户状态',
                    align: 'center',
                    key: 'status',
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 140,
                    render: (h, params) => {
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
                                style: {
                                    'margin-left': '6px'
                                },
                                on: {
                                    click: () => {
                                        this.deleteId = params.row.id
                                        this.openModal();
                                    }
                                }
                            }, '删除')
                        ])
                    }
                },
            ],
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            list: [],
            params: {},
            deleteId: '',
            resourceEditModal: false,
        };
    },
    computed: {
        formId() {
            return this.$route.query.formId;
        }
    },
    components: {
        resourceImport
    },
    mounted(){
        this.getLists();
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getLists(obj) {
            // 获取数据
            this.updateLoadingStatus({isLoading: true});
            if(obj) {
                this.params = obj;
            }
            this.params.importId = this.formId;
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            crmCustomer.importListPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.list = listData.list;
                    this.pageNo = listData.pageNo;
                    this.pageSize = listData.pageSize;
                    this.count = Number(listData.count);
                    this.pageCount = listData.pageCount;
                    this.$emit('onSetCount', listData.count);
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        routerGoDetail(cusId) {
            this.$router.push({
                name: "crm.detail",
                query: {
                    id: cusId,
                    from: 'usermanage'
                }
            });
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
                }
            }
            this.getLists(); 
        },
        save() {
            // 保存
            this.$refs['import'].save(0);
        },
        submit() {
            // 提交
            this.$refs['import'].openSubmitModal();
        },
        importDelete() {
            let params = {
                id: this.deleteId
            }
            crmCustomer.importDelete(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.success('删除成功');
                    this.getLists();
                }
            }).catch(errors.call(this));
        },
        openModal() {
            this.resourceEditModal = true;
        },
    }
}
</script>


