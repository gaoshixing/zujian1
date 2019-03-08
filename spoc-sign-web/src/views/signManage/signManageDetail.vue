<style lang="less">
    .signManageDetail {
        padding: 40px 35px;
        .baseInfo,.appendList,.checkRecord,.other{
            p:first-of-type {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 10px;
            }
        }

        .baseInfo,.appendList{
            overflow: hidden;
            .left,.right {
                margin: 0;
                margin-bottom:30px;
                float: left;
                width: 50%;

                p {
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 31px;
                    margin: 0;
                }

                span {
                    color: #b8b8b8;
                    display: inline-block;
                    text-align: right;
                }
            }

            .left {
                span {
                    width: 130px;
                }
            }

            .right {
                span {
                    width: 145px;
                }
            }
        }

        .appendList {
            font-size: 14px;
            .bar {
                line-height: 24px;
                text-indent: 2em;
                p {
                    font-size: 14px;
                    font-weight: normal;
                    margin-bottom: 0;
                }
            }

            .checkman {
                margin-top: 10px;
            }
        }

        .checkRecord {
            margin-top: 18px;
        }
    }

</style>
<template>
    <div class="signManageDetail">
        <div class="baseInfo">
            <p>基本信息</p>
            <div class="left">
                <p><span>合同编号</span>：<i style="color:#36a29e;font-style:normal">{{data.code}}</i></p>
                <p><span>合同名称</span>：{{data.name}}</p>
                <p><span>签约金额</span>：{{data.signPrice}}</p>
                <p><span>实际优惠金额</span>：{{data.presentPriceCost}}</p>
                <p><span>合作者</span>：{{data.partnerName}}</p>
            </div>
            <div class="right">
                <p><span>签约合同编码</span>：{{data.no}}</p>
                <p><span>合同原价</span>：{{data.price}}</p>
                <p><span>合同优惠金额</span>：{{data.presentPrice}}</p>
                <p><span>签约顾问</span>：{{data.sellerUserRoleName}} -- {{data.sellerUser.name}}</p>
                <p><span>分成比例</span>：{{data.partnerRatio}}</p>
            </div>
        </div>
        <div v-if="data.protocolContent" class="appendList">
                <p>附加条款</p>
                <div class="bar">
                    <p v-for="item in list">{{item}}</p>
                </div>
                
            <div class="checkman">
                <div class="left">
                    <p><span>附加内容授权审核人</span>：{{data.factAuditorName}}</i></p>
                    <p><span>审核时间</span>：{{data.auditorTime}}</p>
                    <p><span>签约时间</span>：{{data.signTime}}</p>
                </div>
                <div class="right">
                    <p ><span>附加内容实际审核人</span>：{{data.auditorName}}</p>
                    <p v-if="data.auditorStatus !== '已通过'"><span>驳回理由</span>: {{data.reason}}</p>
                    <p v-if="data.auditorStatus == '已通过'"><span>审核结果</span>：{{data.auditorStatus}}</p>
                    <p><span>合同状态</span>：{{data.contractStatus}}</p>
                </div>
            </div>
            
        </div>
        <div class="checkRecord">
            <p>审核记录</p>
            <Table border style="margin-bottom:30px" :columns="columns1" :data="data1"></Table>
        </div>
        <div class="other">
            <p>其他操作</p>
            <Table border :columns="columns2" :data="data2"></Table>            
        </div>
    </div>
</template>
<script>
import valid, { errors, SIGNMANAGE } from "../../libs/request"
export default {
    data() {
		return{
            signNumber: this.$route.query.signNumber,
            data: {
                sellerUser: {},
                protocolCustom: '',
            },
            data1:[],
            data2: [],
            columns1: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '审核内容',
                    key: 'content',
                    align: 'center'
                },
                {
                    title: '审核结果',
                    key: 'typeLabel',
                    align: 'center',
                    // render: (h, params) => {
                    //     return h('span', params.row.typeLabel)
					// }  
                },
                {
                    title: '不通过原因',
                    key: 'reason',
                    align: 'center',
                     render: (h, params) => {
                        return h('span', params.row.reason == '' ? 'N/A' : params.row.reason)
					}
                },
                {
                    title: '审核人',
                    key: 'optUserName',
                    align: 'center'
                },
                {
                    title: '审核时间',
                    key: 'optTime',
                    align: 'center'
                },
            ],
            columns2: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                },
                {
                    title: '操作人',
                    key: 'optUserName',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'typeLabel',
                    align: 'center',
                },
                {
                    title: '时间',
                    key: 'optTime',
                    align: 'center',
                }
            ],
		}
    },

    computed: {
        list() {
            return this.data.protocolContent.split('\n')
        }
    },
    
    mounted() {
        this.getCheckSignRecord()
        this.getDetailTable()
        this.getDetailTableOther()
    },

	methods:{
		getCheckSignRecord() {
            SIGNMANAGE.checkSignRecord({
                id:this.signNumber
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
					this.data = res.data.data
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        getDetailTable() {
            SIGNMANAGE.detailTable({
                ctId:this.signNumber,
                inCludeTypes:'reject,check,agree',
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
                    this.data1= res.data.data
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        getDetailTableOther() {
            SIGNMANAGE.detailTable({
                ctId:this.signNumber,
                exCludeTypes: 'reject,check'
            })
            .then(valid.call(this))
            .then(res => {
				if(res.ok) {
                    this.data2 = res.data.data
					
				}
            })
            .catch(errors.call(this))
            .finally(() => {});
        }
    },
    
};
</script>