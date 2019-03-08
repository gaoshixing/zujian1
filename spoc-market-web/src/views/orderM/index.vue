<style lang='less'>
    .order-m-gsx {
        .order-search {
            overflow: hidden;
        }
        .all-money {
            i,b {
                font-size: 18px;
            }
            i {
                font-style: normal;
                color: #8fd7d4;
            }
            b {
                color: red;
                font-weight: 400;
            }
        }
        .cancleBorder {
        }
        .page {
            margin-top: 20px;
            margin-bottom: 140px;
            text-align: center;
        }
    }
</style>

<template>
    <div class="order-m-gsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
            <TabPane label="普通订单" name="goods"></TabPane>
            <TabPane label="拼团订单" name="pack"></TabPane>
        </Tabs>
        <p class="order-search">
            <v-select 
                style="width: 294px;margin: 15px 0;float:left"
                placeholder="搜索订单号"
                :datafunc="datafunc"
                icon="search" 
                v-model="compact"
                k='cnname'
                @on-enter="textChange" 
                @on-click="textChange" 
                @selected="textChange">
            </v-select>
            <v-select 
                style="width: 294px;margin: 15px 0;float:left;margin-left:20px"
                placeholder="搜索购买内容"
                :datafunc="pTdatafunc"
                icon="search" 
                v-model="pTcompact"
                k='cnname'
                @on-enter="pTtextChange" 
                @on-click="pTtextChange" 
                @selected="pTtextChange">
            </v-select>
            <Select v-model="status" style="width:178px;float:left;margin:15px 0 0 20px" @on-change="selectChange">
                <Option v-for="item in OrderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </p>
        <p class="all-money" v-if="tabValue == 'goods'">共 <i>{{data.listCount.allNum}}</i> 个订单， 其中已支付 <i>{{data.listCount.payNum}}</i> 单， 未支付 <b>{{data.listCount.notpayNum}}</b> 单， 共收入 <i>{{data.listCount.allInPrice}}</i> </p>
        <p class="all-money" v-else>共 <i>{{data.listCount.allNum}}</i> 个订单， 其中已支付 <i>{{data.listCount.payNum}}</i> 单， 未支付 <b>{{data.listCount.notpayNum}}</b> 单， 已退款 <b>{{data.listCount.refundNum}}</b> 单, 共收入 <i>{{data.listCount.allInPrice}}</i> </p>
        <btnlist
            title="订单列表">
        </btnlist>
        <div class="cancleBorder">
            <Table :columns="columns" :data="data.page.list" class="common-table" :loading="loading"></Table>
        </div>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="data.page.pageNo" :total="data.page.count" @on-change="onPageChange" v-if="data.page.count>10"></Page>
        </div>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import valid,{errors, sys, orderM} from '../../libs/request';

export default {
    data() {
        return {
            loading: false,
            status: 9999,
            OrderList: [],
            publicInfo: {},
            compact: '',
            pTcompact: '',
            tabValue: 'goods',
            tempV: 'goods',
            data: {
                listCount: {},
                page: {
                   count: '',
                    list: [
                    ] 
                }
            },
            pageNo: 1,
            pageSize: 10,
            columns: [
                {
                    title: "编号",
                    key: "code",
                    align: "center",
                    fixed: 'left',
                    width: 141,
                },
                {
                    title: "购买内容",
                    key: "title",
                    align: "center",
                    fixed: 'left',
                    width: 200,
                },
                {
                    title: "支付费用",
                    key: "inPrice",
                    align: "center",
                    fixed: 'left',
                    width: 84,
                },
                {
                    title: "openID",
                    key: "openId",
                    align: "center",
                    fixed: 'left',
                    width: 233,
                },
                {
                    title: "订单状态",
                    key: "statusLabel",
                    align: "center",
                    fixed: 'left',
                    width: 87,
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    align: "center",
                    minWidth: 105,
                },
                {
                    title: "支付时间",
                    key: "inPriceDate",
                    align: "center",
                    minWidth: 105,
                },
                {
                    title: "退款时间",
                    key: "outPriceDate",
                    align: "center",
                    minWidth: 110,
                },
                {
                    title: "操作",
                    align: "left",
                    fixed: 'right',
                    width: 140,
                    render: (h, params) => {
                        return h("div",{
                            style: {
                                textAlign: 'left'
                            }
                        }, [
                             h(
                                "a",
                                {
                                    style: {
                                        marginRight: "10px",
                                },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'orderM.orderDetail',
                                                query: {
                                                    formId: params.row.id,
                                                    isRefund: params.row.status,
                                                    jsonId: params.row.formId,
                                                }
                                            })
                                        }
                                    }
                                },
                                "详情"
                            ),
                            h(
                                "a",
                                {
                                    
                                    style: {
                                        marginRight: "10px",
                                        display: params.row.status=='pay'?'inline-block':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'orderM.orderDetail',
                                                query: {
                                                    isRefund: params.row.status,
                                                    formId: params.row.id,
                                                    jsonId: params.row.formId,
                                                }
                                            })
                                        }
                                    }
                                },
                                params.row.status=='pay'?"退款":''
                            ),
                            h(
                                "span",
                                {
                                       style: {
                                            color: 'red',
                                            cursor: 'pointer',
                                        },
                                    on: {
                                        click: () => {
                                            this.deleteOrder(params.row.id)
                                        }
                                    }
                                },
                                params.row.status=='notpay'?"关闭":''
                            ),
                           
                        ])
                    }
                },
            ]
        }
    },
     
    components: {
        vSelect,
        btnlist
    },

    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.getBatchList()
        this.getListPage()
    },

    methods: {
        getBatchList() {
            let obj = {
                types: 'wp_order_status'
            }
            sys.batchListData(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    res.data.data.wp_order_status.unshift(
                        {value: 9999, label: '全部订单'})
                    this.OrderList = res.data.data.wp_order_status
                }
            }).catch(errors.call(this));
        },

        getListPage() {
            let obj = {
                status: this.status==9999?'':this.status,
                objectCode: this.pTcompact,
                code: this.compact,
                objectType: this.tabValue,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                appId: this.publicInfo.id,
            }
            this.loading = true
            orderM.listPage(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.data = res.data.data
                }
            }).catch(errors.call(this)).finally(() =>{
                this.loading = false
            });;
        },

        deleteOrder(id) {
            let obj = {
                id: id
            }
            orderM.delete(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getListPage()
                }
            }).catch(errors.call(this));
        },

        toggleSatus(val) {
            if (this.tempV == val) return
            this.tempV = val
            if (val == 'pack') {
                this.columns.splice(7, 0, {
                    title: "拼团成功时间",
                    key: "packDealTime",
                    align: "center",
                    minWidth: 155,
                },)
            } else {
                this.columns.splice(7, 1)
            }
            this.getListPage()
        },

        selectChange() {
            this.getListPage()
        },

        textChange() {
            this.getListPage()
        },

        pTtextChange() {
            this.getListPage()
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.getListPage()
        },

        onPageChange(val) {
            this.pageNo = val
            this.getListPage()
        },

        datafunc() {
            return new Promise((resolve, reject) => {})
        },

        pTdatafunc() {
            return new Promise((resolve, reject) => {})
        }
    }
}
</script>

