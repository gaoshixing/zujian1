<style lang='less'>
    .groupInforGsx {
        .goods_title {
            font-size: 18px;
            margin: 35px 0 20px;
        }
        .infor_aro {
            .infor_title {
                color: #999;
                display: inline-block;
                width: 100px;
                text-align: right;
                position: absolute;
                left: 0;
                top: 0;
            }
            li {
                position: relative;
                list-style: none;
                line-height: 33px;
                padding-left: 120px;
                overflow: hidden;
                p {
                    line-height: 20px;
                    margin-top: 7px;
                }
            }
            .last-child {
                margin-top: 20px;
                padding-bottom: 40px;
                border-bottom: 1px solid #e0e0e0;
            }
        }
        .infor_reject {
            margin-left: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
            .infor_title {
                line-height: 33px;
                color: #999;
                margin-right: 20px;
                display: inline-block;
                width: 84px;
                text-align: right;
            }
            li {
                list-style: none;
                p {
                    line-height: 20px;
                }
            }
        }
        .infor_reject:last-of-type {
            border-bottom: none;
        }
        .form_infor {
            margin-top: 16px;
            .form_title {
                color: #999;
            }
            .form_name {
                margin: 0 120px 0 20px;
                line-height: 40px;
            }
        }
        .info {
            position: relative;
        }
        .img {
            width: 242px;
            height: 146px;
            right: 0;
            top: 55px;
            position: absolute;
            border-radius: 8px;
            overflow: hidden;
        }
    }
    .maket_common_modal {
        .main {
            height: 70vh;
		    overflow-y: auto;
        }
    }

</style>
<template>
    <div class="groupInforGsx">
        <slot name='title'></slot>
        <div class="goods_infor">
            <div class="info"> 
                <p class="goods_title">商品信息</p>
                <ul class="infor_aro">
                    <li><span class="infor_title">　拼团ID：</span>{{data.id}}</li>
                    <li><span class="infor_title">商品名称：</span>{{data.packName}}</li>
                    <li><span class="infor_title">　　定价：</span>{{data.packPrice}}</li>
                    <li><span class="infor_title">　　原价：</span>{{data.packOriPrice}}</li>
                    <li><span class="infor_title">剩余库存：</span>{{data.remainNum ? data.remainNum: '不限量'}}</li>
                    <li><span class="infor_title">　　已售：</span>{{data.saleNum}}</li>
                    <li class="last-child"><span class="infor_title"  >商品详情：</span><p v-html="data.goodsList[0].details"></p></li>
                </ul>
                <img class="img" :src="picture" alt="">
            </div>
            <p class="form_infor"> 
                <span class="form_title">用户购买须填写的表单：</span>
                <span class="form_name">{{data.formName}}</span>
                <Button type="primary" @click="previewForm">预览表单</Button>
            </p>
            <p class="goods_title">拼团信息</p>
            <ul class="infor_aro">
                <li><span class="infor_title">拼团活动时间：</span>{{data.startTime}} 至 {{data.endTime}}</li>
                <li><span class="infor_title">　　起拼人数：</span>{{data.memberNum}}</li>
                <!-- <li><span class="infor_title">　　拼团时限</span>{{data.id}}</li> -->
                <li><span class="infor_title">　　拼团价格：</span>{{data.packPrice}}</li>
                <li><span class="infor_title">　　模拟成团：</span>{{data.isDownPack == 0? '否': '是'}}</li>
                <li><span class="infor_title">　　超员成团：</span>{{data.isUpPack ==0 ? '否' : '是'}}</li>
            </ul>
            <div v-if="data.rejectList.length>1&&isReject">   
                <p class="goods_title" >历史驳回信息</p>
                <ul class="infor_reject" v-for="(item, index) in data.rejectList" v-if="index>0" :key="index">
                    <li v-if="index>0"><span class="infor_title">审核驳回时间：</span>{{item.optTime}}</li>
                    <li v-if="index>0"><span class="infor_title">　　驳回理由：</span>{{item.reason}}</li>
                </ul>
            </div>
        </div>
        <slot name='footer'></slot>
        <!-- 对话框 -->
        <Modal 
            title="预览表单"
            v-model="meetModel" width="730" class-name="maket_common_modal">
            <div class="main">
			    <xformview ref="meetxForm" :viewmode="true" :fid="fid" :uid="uid" />
            </div>
			<div slot="footer">
				<Button type="primary" @click="removeM">确定</Button>
			</div>
		</Modal>
    </div>
</template>

<script>
import xformview from '../../xform/xformview'
export default {
    props: {
        fid: {
            type: String,
            default: '',
        },
        uid: {
            type: String,
            default: '',
        },
        picture: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
            default: () => {}
        },
        isReject: {
            type: Boolean,
            default: false,
        }
    },

    components: {
        xformview,
    },

    data() {
        return {
            meetModel: false,
        }
    },

    methods: {
        removeM() {
            this.meetModel = false
        },

        previewForm() {
            this.meetModel = true
        }
    }
}
</script>

