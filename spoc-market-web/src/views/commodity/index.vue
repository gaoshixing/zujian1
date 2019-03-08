<style lang="less">
.commodity-lists-container{
    position: relative;border-top: none !important;
    .ivu-table-wrapper {
        border: none;
    }
    .ivu-table th {
        background: #fff;
    }
    .ivu-table:after {
        display: none;
    }
    .page-box{
        margin-top: 20px;
		text-align: center;
    }
}
.model-is-use{
    @w: 130px;
    @h: 33px;
    @red: #ed3f14;
    .model-box{
        position: relative;
    }
    .modal-title{
        position: absolute;left: 0;top: 0;line-height: @h;width: @w;
        text-align: right;color: #ccc;
    }
    .modal-right{
        padding-left: @w + 10px;
    }
    .tips{
        // color: @red;
        margin-top: 8px;
    }
    .error .ivu-input{
        border-color: @red;
    }
}
</style>

<template>
<div class="commodity-lists-container">
    <Tabs @on-click="addActive" v-model="tabValue">
        <TabPane label="上架中" name="0"></TabPane>
        <TabPane label="未上架" name="1"></TabPane>
        <TabPane label="待审核" name="2"></TabPane>
        <TabPane label="未通过审核" name="3"></TabPane>
    </Tabs>

    <v-select 
        style="width: 396px;margin: 15px 0;"
        placeholder="搜索名称"
        :datafunc="datafunc"
        icon="search" 
        v-model="compact"
        k='cnname'
        @on-enter="textChange" 
        @on-click="textChange" 
        @selected="textChange">
    </v-select>

    <btnlist title="商品列表" :btnList="btninfo"></btnlist>

    <div class="table-box">
        <Table :loading="loading"
            :columns="columns" :data="list">
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
    <Modal v-model="isUseModal" title="上架设置" @on-ok="isUseOk" width='600' ok-text="确定上架"
        :loading="loadingModal"
        @on-cancel="isUseCancel" class="model-is-use">
        <div class="model-box">
            <span class="modal-title">设置下架日期及时间：</span>
            <div class="modal-right">
                <DatePicker :class="{ error: dataError }" @on-change="changeDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="useDate" placeholder="请选择" style="width: 200px"></DatePicker>
                <p class="tips">如需手动下架，可不填写</p>
            </div>
        </div>
    </Modal>
    <Modal v-model="xiajiaModal" title="提示" @on-ok="xiajiaOk" width='600' ok-text="确定下架" class="model-is-use">
        <div class="model-box">
            <h3>关联本商品的拼团正在进行中，如果下架本商品，该拼团也会同时下架。是否确认下架商品？</h3>
            <p style="color: #ccc;">注意: 拼团下架只是不展示拼团，并非结束此次拼团。如需继续活动，时间截止前上架即可继续拼团，如需上架，请到拼团售卖管理中手动操作上架</p>
        </div>
    </Modal>
</div>    
</template>

<script>

import valid, { errors, sys, wpGoods } from '../../libs/request';
import vSelect from '@public/modules/vSelect';
import btnlist from '@public/modules/btnlist';

export default {
    props: {
        // pId: {
        //     type: String,
        // },
    },
    data() {
        return {
            loadingModal: true,
            dataError: false,
            xiajiaModal: false,
            tabValue: '0',
            compact: '',
            loading: false,
            columns: [
                {
                    title: '商品编号',
                    align: 'center',
                    key: 'code'
                },
                {
                    title: '商品名称',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '定价',
                    align: 'center',
                    key: 'price'
                },
                {
                    title: '剩余库存',
                    align: 'center',
                    key: 'remainNum',
                    render: (h, params) => {
                        return h('span', params.row.remainNum ? params.row.remainNum : '不限量')
                    }
                },
                {
                    title: '已售',
                    align: 'center',
                    key: 'saleNum'
                },
                {
                    title: '跨区售卖',
                    align: 'center',
                    key: 'isGlobal',
                    render: (h, params) => {
                        return h('span', params.row.isGlobal === '1' ? '是' : '否')
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        let dom = [];
                        if(this.tabValue == '0' || this.tabValue == '1') {
                            dom.push(h('a', {
                                style: {
                                    color: this.tabValue == '0' ? 'red !important' : ''
                                },
                                on: {
                                    click: () => {
                                        this.currentId = params.row.id;
                                        if(this.tabValue == '0') {
                                            this.setIsUse('0')
                                        }else{
                                            this.openModal();
                                        }
                                    }
                                }
                            },this.tabValue == '0' ? '下架' : '上架'),);
                        }
                        dom.push(h('a', {
                            style: {
                                'margin-left': '8px'
                            },
                            on: {
                                click: () => {
                                    this.$router.push({
                                        name: "market.collection",
                                        query: {
                                            packCode: params.row.code,
                                            packName: params.row.name,
                                            id: params.row.id,
                                            isGoods: true,
                                        }
                                    })
                                }
                            }
                        },'数据收集'));
                        dom.push(h('a', {
                            style: {
                                'margin-left': '8px'
                            },
                            on: {
                                click: () => {
                                    // console.log(params.row.id)
                                    this.$router.push({
                                        name: 'market.commodityDetail',
                                        query: {
                                            goodsId: params.row.id,
                                            tabValue: this.tabValue
                                        }
                                    })
                                }
                            }
                        },'详细信息'));
                        return h('div', dom)
                    }
                },
            ],
            list: [],
            params: {},
            pageNo: 1, //当前页码
            pageCount: 1,//数据总数
            pageSize: 10,//每页条数
            count: 0,
            btninfo: [
                {
                    text: '新建商品',
                    cls: 'btn',
                    event: this.cerateGoods,
                },
            ],
            isUseModal: false,
            useDate: '',
            currentId: '',
        }
    },
    computed: {

    },
    components: {
        vSelect, btnlist
    },
    mounted(){
        this.getLists();
    },
    methods: {
        getLists() {
            this.loading = true;
            this.params.showType = this.tabValue;
            this.params.pageNo = this.pageNo;
            this.params.pageSize = this.pageSize;
            wpGoods.listPage(this.params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let listData = res.data.data;
                    this.list = listData.list;
                    this.pageNo = listData.pageNo;
                    this.pageCount = listData.pageCount;
                    this.pageSize = listData.pageSize;
                    this.count = listData.count;
                    this.loading = false;
                }
            }).catch(errors.call(this));
        },
        addActive() {
            // 切换tab
            // console.log(this.tabValue)
            if(this.tabValue === '3') {
                this.columns.splice(6, 0, {
                    title: '审核驳回时间',
                    key: 'rejectDate',
                    align: 'center',
                })
            }else if(this.columns[6].key === 'rejectDate'){
                this.columns.splice(6, 1)
            }
            this.getLists();
        },
        textChange() {
            // 修改搜索框
            // console.log(this.compact)
            if(this.compact && this.compact.length > 0) this.params.codeOrName = this.compact.replace(/(^\s*)|(\s*$)/g, '').toString()
            else delete this.params.codeOrName
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
        datafunc(word) {
            return new Promise((resolve, reject) => {});
        },
        cerateGoods() {
            // 新建商品
            this.$router.push({
                name: 'market.commodityCreate',
            })
        },
        openModal() {
            // 打开上架弹窗
            this.isUseModal = true;
        },
        changeDate() {
            if(this.useDate) {
                if(this.useDate < new Date()) {
                    this.$Message.error('下架时间不可小于当前时间！');
                    this.dataError = true;
                }else{
                    this.dataError = false;
                }
            }else{
                this.dataError = false;
            }
        },
        isUseOk() {
            // 确定上架
            if(this.dataError) {
                this.loadingModal = false;
                setTimeout(() => {
                    this.loadingModal = true;
                }, 0);
            }else{
                this.isUseModal = false;
                if(this.useDate) this.setIsUse('1', this.useDate.format('yyyy-MM-dd hh:mm:ss')); else this.setIsUse('1');
            }
        },
        isUseCancel() {
            // 取消上架
            this.useDate = '';
        },
        setIsUse(type, useDate, str) {
            // 设置上、下架
            let params = {
                id: this.currentId,
                type: type,
                isForce: '0'
            }
            if(useDate) params.useDate = useDate;
            if(str == 'isForce') params.isForce = '1';
            wpGoods.isUse(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    if(res.data.message == 'packing') {
                        // 需要强制性下架
                        this.xiajiaModal = true;
                    }else{
                        this.$Message.info(res.data.message);
                        this.getLists();
                    }
                }
            }).catch(errors.call(this));
        },
        xiajiaOk() {
            // 强制性下架
            this.setIsUse('0', false, 'isForce');
        },
    },
}
</script>


