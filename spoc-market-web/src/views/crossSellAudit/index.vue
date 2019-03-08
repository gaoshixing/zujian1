<template>
    <div class="cross-sell-audit-boss">
        <Tabs :animated=false v-model="tabValue">
            <TabPane label="商品" name="goods"></TabPane>
            <TabPane label="拼团售卖" name="pack"></TabPane>
        </Tabs>
        <Input v-model.trim="searchVal" icon="ios-search" placeholder="搜索名称" style="width: 296px;margin-top: 10px;" @on-click="onclickSearchInfos" @on-enter="onclickSearchInfos"></Input>
        <div class="cross-sell-audit-title">共 <span>{{pageTotal}}</span> 件商品待审</div>
        <Btnlist title="商品列表"></Btnlist>
        <Table :columns="tableColumnsGoods" :data="tableDataGoods" class="common-table" v-show="tabValue === 'goods'"></Table>
        <Table :columns="tableColumnsGroup" :data="tableDataGroup" class="common-table" v-show="tabValue === 'pack'"></Table>
        <Page 
			class="common-paging" 
			v-if="pageTotal > 10"
			show-sizer
			:total="pageTotal"
			:current="pageNo"
			:page-size="pageSize"
			show-total
			show-elevator
			@on-change="onclickChangePage"
			@on-page-size-change="onPageSizeChange">
		</Page>
    </div>
</template>

<script>
import Btnlist from '@public/modules/btnlist.vue';
import valid, { errors, sys, common,  crossSellAduit, } from '../../libs/request.js';
export default {
    name: 'CrossSellAudit',
    components: {
        Btnlist,
    },
    data() {
        return {
            tabValue: 'goods',
            searchVal: null,
            pageNo: 1,
            pageTotal: 0,
            pageSize: 10,
            tableColumnsGoods: [
                {
                    title: '商品编号',
                    key: 'code',
                    align: 'center',
                },
                {
                    title: '商品名称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '定价',
                    key: 'price',
                    align: 'center',
                    render: (h, params) => {
                        let text = '';
                        if (params.row.price) {
                            text = params.row.price.toString();
                            if (text.split('.')[1].length > 2) {
                                text = text.split('.')[0] + '.' + text.split('.')[1].substr(0, 2);
                            }
                        }
                        return h('span', text);
                    },
                },
                {
                    title: '剩余库存',
                    key: 'remainNum',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', {},params.row.remainNum ? params.row.remainNum : '不限量');
                    },
                },
                {
                    title: '已售',
                    key: 'saleNum',
                    align: 'center',
                },
                {
                    title: '创建人',
                    key: 'createByCompany',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'caozuo',
                    align: 'center',
                    render: (h, params) => {
                        const _this = this;
                        return h('span', {
                            style: {
                                color: '#1890ff',
                                cursor: 'pointer',
                            },
                            on: {
                                click() {
                                    _this.$router.push({
                                        name: 'groupM.goodsAudit',
                                        query: {
                                            auditId: params.row.auditId,
                                            id: params.row.id,
                                        },
                                    });
                                },
                            },
                        }, '审核详情');
                    },
                },
            ],
            tableDataGoods: [],
            tableColumnsGroup: [
                {
                    title: '拼团编号',
                    key: 'code',
                    align: 'center',
                },
                {
                    title: '售卖商品',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '原价',
                    key: 'oriPrice',
                    align: 'center',
                    render: (h, params) => {
                        let text = '';
                        if (params.row.oriPrice) {
                            text = params.row.oriPrice.toString();
                            if (text.split('.')[1].length > 2) {
                                text = text.split('.')[0] + '.' + text.split('.')[1].substr(0, 2);
                            }
                        }
                        return h('span', text);
                    },
                },
                {
                    title: '拼团价',
                    key: 'price',
                    align: 'center',
                    render: (h, params) => {
                        let text = '';
                        if (params.row.price) {
                            text = params.row.price.toString();
                            if (text.split('.')[1].length > 2) {
                                text = text.split('.')[0] + '.' + text.split('.')[1].substr(0, 2);
                            }
                        }
                        return h('span', text);
                    },
                },
                {
                    title: '剩余库存',
                    key: 'remainNum',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', {},params.row.remainNum ? params.row.remainNum : '不限量');
                    },
                },
                {
                    title: '已售',
                    key: 'saleNum',
                    align: 'center',
                },
                {
                    title: '创建人',
                    key: 'createByCompany',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'caozuo',
                    align: 'center',
                    render: (h, params) => {
                        const _this = this;
                        return h('span', {
                            style: {
                                color: '#1890ff',
                                cursor: 'pointer',
                            },
                            on: {
                                click() {
                                    _this.$router.push({
                                        name: 'groupM.groupAudit',
                                        query: {
                                            auditId: params.row.auditId,
                                            id: params.row.id,
                                        },
                                    });
                                },
                            },
                        }, '审核详情');
                    },
                },
            ],
            tableDataGroup: [],
        };
    },
    watch: {
        tabValue() {
            this.getListPage();
        },
    },
    created() {
        this.getListPage();
    },
    methods: {
        onclickSearchInfos() {
            this.getListPage();
        },
        /*
        * 列表获取
        */
         getListPage() {
            const data = {
                objectType: this.tabValue,
                name: this.searchVal,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            };
            crossSellAduit.list(data).then(valid.call(this)).then(res => {
                const rdata = res.data.data;
                this.pageTotal = rdata.count;
                this.pageNo = rdata.pageNo;
                this.pageSize = rdata.pageSize;
                if (this.tabValue === 'goods') {
                    this.tableDataGoods = rdata.list;
                } else {
                    this.tableDataGroup = rdata.list;
                }
            }).catch(errors.call(this));
         },
		/*
		* 分页
		*/
		onclickChangePage(index) {
			this.pageNo = index;
			this.getListPage();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			this.getListPage();
        },
    },
}
</script>

<style lang="less">
    @import url('../../less/common.less');
    .cross-sell-audit-boss {
        .cross-sell-audit-title {
            line-height: 42px;
            color: #333;
            font-size: 14px;
            span {
                color: @proColor;
                visibility: visible;
            }
        }
        .ivu-table th{
            background-color: #fff;
        }
    }
    .market_container .content .main_content{
        border-top: none;
    }
</style>
