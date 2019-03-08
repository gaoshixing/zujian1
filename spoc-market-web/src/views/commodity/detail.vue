<style lang="less">
.commodity-detail-container{
    position: relative;
    .commodity-box{
        margin-bottom: 35px;position: relative;
    }
    .title{
        font-size: 18px;margin-bottom: 20px;
    }
    .detail-item{
        @h: 33px;
        @w: 120px;
        position: relative;padding-left: @w;line-height: @h;min-height: @h;
        & > span{
            position: absolute;left: 0;top: 0;width: @w - 20px;line-height: @h;
            text-align: right;color: #999;
        }
        p{

        }
        &.last-child{
            margin-top: 20px;padding-bottom: 40px;
        }
    }
    .detail-form{
        border-top: 1px solid #e0e0e0;padding-top: 20px;
        .detail-item{
            padding-left: 0;
            & > span{
                position: relative;
            }
            & > p{
                display: inline-block;margin: 0 120px 0 20px;
            }
        }
    }
    .goods-picture{
        position: absolute;right: 180px;top: 60px;width: 200px;height: 160px;z-index: 9;
        img{
            display: block;width: 100%;height: 100%;
        }
    }
    .reject-item{
        margin-bottom: 8px;padding-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
    }
    .foot-btns{
        margin-top: 70px;text-align: center;
    }
    .def_btn, .primary_btn {
        padding: 7px 37px;
        margin-right: 20px;
        font-size: 14px;
    }
    .def_btn {
        background: #fff;
    }
}
</style>
    
<template>
<div class="commodity-detail-container">
    <div class="commodity-box" v-if="tabValue == 3 && detail.rejectDate">
    <!-- <div class="commodity-box"> -->
        <div class="title">驳回信息</div>
        <div class="detail">
            <div class="detail-item">
                <span>审核驳回时间：</span>
                <p>{{ detail.rejectDate }}</p>
            </div>
            <div class="detail-item">
                <span>驳回理由：</span>
                <p>{{ detail.rejectReasons }}</p>
            </div>
        </div>
    </div>
    <div class="commodity-box">
        <div class="title">商品信息</div>
        <div class="goods-picture"><img :src="picture" alt=""></div>
        <div class="detail">
            <div class="detail-item">
                <span>商品编号：</span>
                <p>{{ detail.code }}</p>
            </div>
            <div class="detail-item">
                <span>商品名称：</span>
                <p>{{ detail.name }}</p>
            </div>
            <div class="detail-item">
                <span>定价：</span>
                <p>{{ detail.price }}</p>
            </div>
            <div class="detail-item">
                <span>原价：</span>
                <p>{{ detail.oriPrice }}</p>
            </div>
            <div class="detail-item">
                <span>剩余库存：</span>
                <p>{{ detail.remainNum ? detail.remainNum : '不限量' }}</p>
            </div>
            <div class="detail-item">
                <span>已售：</span>
                <p>{{ detail.saleNum }}</p>
            </div>
            <div class="detail-item">
                <span>简介：</span>
                <p>{{ detail.introduction }}</p>
            </div>
            <div class="detail-item last-child">
                <span>商品详情：</span>
                <p v-html="detail.details"></p>
            </div>
        </div>
        <div class="detail-form">
            <div class="detail-item">
                <span>用户购买须填写的表单：</span>
                <p>{{ formName }}</p>
                <Button type="primary" @click="previewForm">预览表单</Button>
            </div>
        </div>
    </div>
    <div class="commodity-box" v-if="tabValue == 3 && detail.rejectList && detail.rejectList.length > 1">
        <div class="title">历次驳回信息</div>
        <div class="reject-item" v-for="(item, index) in detail.rejectList" v-if="index > 0" :key="item.id">
            <div class="detail-item">
                <span>审核驳回时间：</span>
                <p>{{ item.optTime }}</p>
            </div>
            <div class="detail-item">
                <span>驳回理由：</span>
                <p>{{ item.reason }}</p>
            </div>
        </div>
    </div>
    <div class="foot-btns">
        <Button class="def_btn" @click="back">返回</Button>
        <Button type="primary" class="primary_btn" @click="editor" v-if="canEdit">编辑</Button>
    </div>
</div>
</template>

<script>

import valid, { errors, sys, wpGoods, common } from '../../libs/request'

export default {
    data(){
        return {
            detail: {},
            picture: '',
            canEdit: false, //是否显示编辑按钮
            formName: '', //动态表单名字
        };
    },
    computed: {
        goodsId() {
            return this.$route.query.goodsId
        },
        tabValue() {
            return this.$route.query.tabValue
        },
    },
    mounted(){
        // console.log(this.goodsId)
        this.getForm(this.goodsId);
    },
    methods: {
        getForm(id) {
            let params = {
                id: id
            }
            wpGoods.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data
                    this.detail = data;
                    if(this.tabValue == '1' || this.tabValue == '3') this.canEdit = true;
                    if(data.attachmentId) {
                        this.getPicture(data.attachmentId);
                    }
                    if(data.formIds.length == 1) {
                        // 有动态表单
                        this.getFormTable(data.formIds[0]);
                    }
                }
            }).catch(errors.call(this));
        },
        getFormTable(id) {
            // 获取动态表单列表
            let params = {
                groupId: 'com_form_tpl_kind_goods',
                pageSize: -1
            }
            common.listFormMean(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data.list;
                    let arr = [];
                    if(data) {
                        arr =  data.filter(function(item){
                            return item.id == id; 
                        });
                    }
                    if(arr.length > 0) {
                        this.formName = arr[0].name;
                    }
                }
            }).catch(errors.call(this));
        },
        getPicture(id) {
            // 获取图片
            let params = {
                id: id
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                }
            }).catch(errors.call(this));
        },
        previewForm() {
            // 预览表单
            // console.log(this.detail.formIds[0])
            // this.$router.push({
            //     name: 'market.previewForm',
            //     query: {
            //         formId: this.detail.formIds[0]
            //     }
            // })

            const {href} = this.$router.resolve({
                name: 'market.previewForm',
                query: {
                    formId: this.detail.formIds[0]
                }
            });
            window.open(href, '_blank');
        },
        editor() {
            // 编辑
            this.$router.push({
                name: 'market.commodityEdit',
                query: {
                    goodsId: this.goodsId
                }
            })
        },
        back() {
            this.$router.go(-1)
        },
    },
}
</script>


