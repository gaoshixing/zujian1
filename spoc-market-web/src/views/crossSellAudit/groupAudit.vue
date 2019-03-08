<template>
    <div class="goods-audit-boss">

        <div class="goods-audit-new goods-audit-common">
            <p>新建信息</p>
            <ListCard title='新建人' :content="formData.createUserName"></ListCard>
            <ListCard title='新建人所属' :content="formData.goodsList && formData.createCompanyName"></ListCard>
            <ListCard title='新建时间' :content="formData.createDate"></ListCard>
        </div>

        <div class="goods-audit-goods goods-audit-common" style="margin-top: 40px;">
            <p>商品信息</p>
            <ListCard title='商品编号' :content="formData.goodsList && formData.goodsList[0].code"></ListCard>
            <ListCard title='商品名称' :content="formData.packName"></ListCard>
            <ListCard title='定价' :content="formData.packPrice"></ListCard>
            <ListCard title='原价' :content="formData.packOriPrice"></ListCard>
            <ListCard title='剩余库存' :content="formData.remainNum ? formData.remainNum: '不限量'"></ListCard>
            <ListCard title='已售' :content="formData.saleNum"></ListCard>
            <div class="goods-audit-goods-img">
                <img :src="picture" alt="">
                <span>商品图片</span>
            </div>
        </div>
        
        <div class="goods-audit-detail">
            <p>商品详情：</p>
            <div class="goods-audit-detail-container" v-html="formData.goodsList && formData.goodsList[0].details"></div>
        </div>

        <ListCard title='用户购买需填写的表单' content="线下活动报名表" :titleWidth=140 :width=650>
            <div class="goods-form-button common-button" @click="onclickPreviewForm">预览表单</div>
        </ListCard>

        <div class="goods-audit-common" style="margin-top: 40px;">
            <p>拼团信息</p>
            <ListCard title='拼团活动时间' :content="formData.startTime  + ' ~ ' + formData.endTime"></ListCard>
            <ListCard title='起拼人数' :content="formData.memberNum"></ListCard>
            <!-- <ListCard title='拼团时限' content="没有"></ListCard> -->
            <ListCard title='拼团价格' :content="formData.packPrice"></ListCard>
            <!-- <ListCard title='团长免费' content="没有"></ListCard> -->
            <ListCard title='模拟成团' :content="formData.isDownPack === '0' ? '关闭' : '开启'"></ListCard>
            <ListCard title='超员成团' :content="formData.isUpPack === '0' ? '关闭' : '开启'"></ListCard>
        </div>

        <div class="button-area">
            <div class="common-button" @click="onclickReject">不通过</div>
            <div class="common-button" @click="onclickPass">通过审核</div>
            <div class="common-button-cancel" @click="onclickCancel">取消</div>
        </div>
        <Modal
            v-model="modalReject"
            title="不通过"
            width=730
            ref="refModalReject"
            ok-text="确认不通过"
            cancel-text="取消"
            class="modal-audit-reject"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>请输入不通过理由</p>
            <Input v-model="rejectReason" type="textarea" :autosize="{minRows: 5, maxRows: 7}" placeholder="请输入不通过理由"></Input>
        </Modal>
    </div>
</template>

<script>
import ListCard from '../../modules/listCard.vue';
import valid, { errors, sys, common,  crossSellAduit, } from '../../libs/request.js';
export default {
    name: 'GroupAudit',
    components: {
        ListCard,
    },
    data() {
        return {
            auditId: null,
            id: null,
            formData: {},
            dict: [],
            modalReject: false,
            rejectReason: '',
            picture: '',
        };
    },
    created() {
        this.auditId = this.$route.query.auditId;
        this.id = this.$route.query.id;
        this.getInfos();
        this.getDict();
    },
    filters: {
        deleteExcessZero: (value) => {
            if (!value) return '';
            value = value.toString()
            return  value.split('.')[0] + '.' + value.split('.')[1].substr(0, 2);
        }
    },
    methods: {
        onclickReject() {
            this.modalReject = true;
        },
        onclickPass() {
            this.audit('pass');
        },
        onclickCancel() {
            this.$router.go(-1);
        },
        getInfos() {
            const data = {
                id: this.id,
            };
            crossSellAduit.pForm(data).then(valid.call(this)).then(res => {
                if (res.ok) this.formData = res.data.data;
                if(this.formData.goodsList[0].attachmentId) this.getPicture(this.formData.goodsList[0].attachmentId);
            }).catch(errors.call(this));
        },
        /*
        * 审批
        */
        audit(type) {
            const data = {
                id: this.auditId,
                type,
                reason: this.rejectReason,
            };
            crossSellAduit.audit(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.rejectReason = '';
                    this.$Message.success('审核成功');
                    this.$router.go(-1);
                }
            }).catch(errors.call(this));
        },
        getDict() {
            sys.dictListData({ type: 'wp_audit_type ' }).then(valid.call(this)).then(res => {
                res.data.data.forEach(item => {
                    this.dict.push({
                        label: item.label,
                        value: item.value,
                    });
                });
            }).catch(errors.call(this));
        },
        /*
        * modal
        */
        ok() {
            if (!this.rejectReason) {
                this.modalReject = true;
                this.$refs.refModalReject.visible = true;
                this.$Message.error('请输入不通过理由');
            } else {
                this.audit('reject');
            }
        },
        cancel() {
            this.rejectReason = '';
        },
        /*
        * 获取商品图片
        */
        getPicture(id) {
            const params = {
                id: id
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                }
            }).catch(errors.call(this));
        },
        /*
        * 预览表单
        */
        onclickPreviewForm() {
            const {href} = this.$router.resolve({
                name: 'market.previewForm',
                query: {
                    formId: this.formData.goodsList[0].formIds[0],
                }
            });
            window.open(href, '_blank');
        },
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .goods-audit-boss {
        padding: 25px 35px 0 35px;
        max-width: 1100px;
        .goods-audit-common {
            >p {
                color: #333;
                font-size: 14px;
                margin-bottom: 10px;
            }
        }
        .goods-audit-goods {
            position: relative;
            margin-bottom: 30px;
            .goods-audit-goods-img {
                width: 240px;
                height: 165px;
                position: absolute;
                right: 0;
                top: 40px;
                img {
                    width: 240px;
                    height: 145px;
                    border-radius: 5px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                span {
                    color: #999;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 12px;
                }
            }
        }
        .goods-audit-detail {
            overflow: hidden;
            > p {
                color: #999;
                width: 110px;
                text-align: right;
                line-height: 33px;
                display: inline-block;
                float: left;
                margin-right: 17px;
            }
            .goods-audit-detail-container {
                padding-left: 127px;
                padding-bottom: 20px;
                margin-bottom: 20px;
                min-height: 36px;
                >img {
                    width: 240px;
                    height: 145px;
                    border-radius: 5px;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 15px;
                }
                p {
                    line-height: 33px;
                }
                span {
                    display: inline-block;
                    line-height: 33px;
                }
                >img:nth-of-type(n + 1) {
                    margin-top: 26px;
                }
            }
        }
        .goods-form-button {
            transform: translateY(-11px);
        }
        .button-area {
            width: 366px;
            margin: 0 auto;
            margin-top: 90px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
        }
    }
    .modal-audit-reject {
        p {
            font-size: 14px;
            margin-bottom: 15px;
        }

        textarea {
            resize: none;
        }

    }
</style>
