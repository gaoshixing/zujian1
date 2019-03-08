<style lang='less'>
    .order-detail-gsx {
        position: relative;
        .zhang-type {
            position: absolute;
            width: 90px;
            height: 90px;
            right: 300px;
            top: 100px;
            .iconfont {
                font-size: 90px;
            }
            .text {
                position: absolute;
                left: 51%;
                top: 68%;
                color: #fff;
                transform: translate(-50%, -50%) rotate(-20deg);
            }
        }
        .go-back {
            text-align: center;
            margin-top: 20px    ;
        }
    }
    .order-detail-modal-gsx {
        .modal-item {
            overflow: hidden;
            padding-left: 80px;
            position: relative;
            margin-bottom: 17px;
            .title {
                position: absolute;
                left: 0;
                display: inline-block;
                top: 5px;
                width: 80px;
                text-align: center;
                color: #b8b8b8;
            }
        }
    }

</style>
<template>
    <div class="order-detail-gsx">
        <title-mod
           :dataList="dataList" 
           :data="data"
        ></title-mod>
        <title-mod
           :dataList="userList" 
           :data="userInfo"
        ></title-mod>
        <div class="zhang-type" >
            <i class="iconfont icon-zhang" :style="{color:orderStatusC}"></i>
            <span class="text">{{orderStatus}}</span>
        </div>
        <p class="go-back"><Button class="def_btn_err" v-if="isRefund=='pay'" @click="refundMoney">退款</Button><Button type="primary" class="primary_btn_new1" @click="$router.go(-1)">返回订单列表</Button> </p>
        <!-- 对话框 -->
        <Modal
            v-model="modal1"
            title="退款"
            width=728
            ref="md"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="order-detail-modal-gsx">
                <p class="modal-item">
                    <span class="title">退款金额</span> <Input v-model="refundM" style="width:178px;margin-bottom:5px" /><br>
                    <span style="color:red;font-size:10px;">退款金额不得大于订单支付金额</span>
                </p>
                <p class="modal-item">
                    <span class="title">退款理由</span> <Input v-model="refundReason" type="textarea" :rows="4" />
                </p>
            </div>
        </Modal>
    </div>
    
</template>

<script>
import titleMod from '../groupBooking/components/titleMod'
import valid,{errors, sys, orderM} from '../../libs/request';

export default {
    data() {
        return {
            refundM: '',
            refundReason: '',
            status: '已退款',
            modal1: false,
            jsonId: this.$route.query.jsonId,
            isRefund: this.$route.query.isRefund || false,
            userList: [
                {
                    title: '用户信息',
                    // list: [
                    //     {name: '姓名', key: 'clientName'},
                    //     {name: '手机号', key: 'clientPhone'},
                    // ]
                }
            ],
            userInfo: {},
            dataList: [
                {
                    title: '订单信息',
                    list: [
                        {name: '订单编号', key: 'code'},
                        {name: '商品名称', key: 'title'},
                        {name: '支付金额', key: 'inPrice'},
                        {name: '创建订单时间', key: 'createDate'},
                        {name: '支付时间', key: 'inPriceDate'},
                        {name: '退款时间', key: 'outPriceDate'},
                    ]
                },
                {
                    title: '退款信息',
                    list: [
                        {name: '退款金额', key: 'outPrice'},
                        {name: '退款理由', key: 'outPriceReason'},
                        {name: '退款操作人', key: 'optUser'},
                    ]
                },
            ],
            data: {
            }
        }
    },

    computed: {
        orderStatus() {
            let str = ''
            switch(this.isRefund) {
                case 'refund': str ='已退款'; break;
                case 'waitrefund': str ='等待退款'; break;
                case 'pay': str ='已支付'; break;
                case 'expired': str ='已过期'; break;
                case 'closed': str ='已关闭'; break;
                case 'cancelpay': str ='已取消'; break;
                case 'notpay': str ='未支付'; break;
                default: str='未知状态'
            }
            return str
        },
        orderStatusC() {
            let str = ''
            switch(this.isRefund) {
                case 'refund': str ='#f3afbb'; break;
                case 'waitrefund': str ='#edd8a0'; break;
                case 'pay': str ='#a1dddb'; break;
                case 'expired': str ='#ccc'; break;
                case 'closed': str ='#ccc'; break;
                case 'cancelpay': str ='#93cbff'; break;
                case 'notpay': str ='#edd8a0'; break;
                default: str='red'
            }
            return str
        }
    },

    mounted() {
        if (this.isRefund!='refund'&&this.isRefund!='waitrefund') {
            this.dataList.splice(1, 1)
        }
        this.getForm()
        this.getJsonData()
    },

    methods: {
        getForm() {
            if(!this.$route.query.formId) {
                this.$Message.info('脏数据')
                return
            }
            let obj = {
                id: this.$route.query.formId,
            }
            orderM.form(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.handleD(res.data.data)
                }
            }).catch(errors.call(this));
        },

        handleD(val) {
            this.data = val
            val.wpOrderLogList.forEach(item => {
                if (item.type == 'refund') {
                    this.data.optUser = item.optUser
                    return
                } 
            })

            
        },

        outPrice() {
            if(!this.$route.query.formId) {
                this.$Message.info('脏数据')
                return
            }
            if (this.refundM>this.data.inPrice) {
                this.$Message.error('退款金额不能大于支付金额')
                this.refundM = ''
                this.modal1 = true
                this.$refs.md.visible = true
                return
            }
            let obj = {
                id: this.$route.query.formId,
                outPrice: this.refundM,
                outPriceReason: this.refundReason,
            }

            orderM.outPrice(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$router.go(-1)
                    this.refundM = ''
                    this.refundReason = ''
                }
            }).catch(errors.call(this));

        },

        refundMoney() {
            this.modal1 = true
        },

        getJsonData() {
            let obj = {
                id: this.$route.query.formId,
            }
            orderM.jsonData(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.userInfo = res.data.data && res.data.data.data
                    this.jsonId = res.data.data.formId
                    this.getViewJson()
                }
            }).catch(errors.call(this));
        },

        getViewJson() {
            let obj = {
                id: this.jsonId,
            }
            orderM.viewJson(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    let list = res.data.data && res.data.data.layout.map(item => {
                        let obj = {
                            key: item.name,
                            name: item.title,
                        }
                        return obj
                    })
                    this.$set(this.userList[0], 'list', list)
                }
            }).catch(errors.call(this));
        },

        ok() {
            if (!this.refundM) {
                this.$Message.error('请输入退款金额')
                return  
            }
            this.outPrice()
        },

        cancel() {
            this.refundM = ''
            this.refundReason=''
        }
    },

    components: {
        titleMod,
    }
}
</script>

