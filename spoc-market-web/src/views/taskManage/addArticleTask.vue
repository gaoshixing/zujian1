<template>
    <div class="add-article-task-boss">
        <div class="mass-text">
            <ul class="mass-aro">
                <com
                    style="{margin-top: 37px;}"
                    :massTypeList="massTypeList"
                    @fodderInfo='fodderInfo'
                    ref="fodderModel"
                    :num1="num1"
                    @numChanges="numChanges"
                    @getListPage="getListPage"
                ></com>
            </ul>
            <p class="handle-mass">
                <Button type="primary" class="primary_btn_new1" @click="onclickSave"> 确认保存 </Button>
                <Button type="primary" class="primary_btn_new1" @click="onclickPreview" style="margin-right:0"> 　预览　 </Button>
            </p>
        </div>
         <!-- 对话框 -->
        <Modal
            v-model="showSharLink"
            title="分享链接"
            ok-text="关闭"
            width= 730
            class="expand-modal-share-link"
            @on-ok="onclickshareLinkClose"
            @on-cancel="onclickshareLinkClose">
            <p>链接地址：</p>
            <a :href="url" target="_Blank">{{this.url}}</a><br>
            <p>链接二维码：（请用微信扫描下方二维码）</p>
            <div id="qrcode" ref="qrcode" style="width: 150px; height: 150px;"></div>
            <div class="common-button share-link-btn" @click='onclickshareLinkClose'>关闭</div>
        </Modal>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import com from '../publicAction/com.vue'
import valid, { errors, sys, common, wpTask, wpMarketCommon, publicAction, wpExpand, } from '../../libs/request.js';
import { mapMutations, } from 'vuex';
export default {
    name: 'AddAriticleTask',
    components: {
        com,
    },
    data() {
        return {
            appid: null,
            loading: false,
            num1: '1',
            fodderInfos: null,
            showSharLink: false,
            url: 'http://ewechattest.ivygate.cn/index.html',
            expendId: null,
            massTypeList:  [
                {type: 'imgT', name: '图文素材'},
                {type: 'img', name: '图片素材'},
                {type: 'radio', name: '语音素材'},
                {type: 'video', name: '视频素材'},
            ],
            selectList: [],
            dict: [ 'news', 'image', 'audio', 'video', ],
        };
    },
    created() {
        this.appid = JSON.parse(sessionStorage.getItem('publicInfo')).id;
    },
    watch: {
        num1() {
            this.fodderInfos = null;
        },
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        numChanges(val) {
            this.num1 = val;
        },
        massType(item, index) {
            if (this.num1 == index) return;
            this.num1 = index;
            this.$refs.fodderModel.clearFodder();
        },
        getListPage() {
            this.$refs.fodderModel.getListPage()
        },
        fodderInfo(data) {
            this.fodderInfos = data;
        },
        /*
        * 点击预览
        */
        onclickPreview() {
            if(!(this.fodderInfos && this.fodderInfos.code)) {
                this.$Message.error('请选择要预览的素材');
                return;
            }
            this.url += `?taskId=${this.fodderInfos.id}&type=${this.dict[this.num1 - 1]}/#/${this.getArticleType()}`;
            this.qrcodes('qrcode', 150, 150);
            this.showSharLink = true;
        },
        // 绘制二维码
        qrcodes(dom, w, h) {
            new QRCode(dom, {
                width: w, // 设置宽度，单位像素
                height: h, // 设置高度，单位像素
                text: this.url,   // 设置二维码内容或跳转地址
            });
        },
        onclickshareLinkClose() {
            this.showSharLink = false;
            document.getElementById('qrcode').innerHTML = '';
            this.url = 'http://ewechattest.ivygate.cn/index.html';
        },
        /*
        * 点击保存 or 展示
        */
        onclickSave(cb) {
            if (!(this.fodderInfos && this.fodderInfos.code)) {
                this.$Message.error('请选择素材');
                return;
            }
            this.updateLoadingStatus({isLoading: true});
            const data = {
                // id: this.$route.query.id,
                // code: this.getedInfo.code,
                title: this.fodderInfos.list[0].title,
                objectId: this.fodderInfos.id,
                objectType: this.dict[this.num1 - 1],
                objectCode: this.fodderInfos.code,
                clickNum: 0,
                successNum: 0,
                // isUse: this.getedInfo.isUse,
                endTime: '',
                imageId: null,
                axisX: 0,
                axisY: 0,
            };
            wpTask.save(data).then(valid.call(this)).then(res => {
                if (res.ok) {
                    this.expendId = res.data.data;
                    (typeof cb !== 'object') && cb();
                    if ((typeof cb === 'object')) {
                        this.$Message.success(res.data.message);
                        this.$router.go(-1)
                    };
                }
            }).catch(errors.call(this)).finally(() => {this.updateLoadingStatus({isLoading: false});});
        },
        /*
        * 获取二维码的 pathname
        */
        getQRcodePathName() {
            let url = null;
            switch(this.from) {
                case '0': url = 'buy'; break;
                case '1': url = 'groupBuy'; break;
                case '2': url = 'invite'; break;
                case '3': url = this.getArticleType(); break;// 图文 || 图片 || 视频 || 语音
            }
            return url;
        },
        /*
        * 映射推广文章类型
        */
        getArticleType() {
            let types = null;
            switch(this.dict[this.num1 - 1]) {
                case 'news': types = 'imgText'; break;
                case 'video': types = 'imgAudioVideo'; break;
                case 'audio': types = 'imgAudioVideo'; break;
                case 'image': types = 'imgAudioVideo'; break;
            };
            return types;
        },
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .add-article-task-boss {
        .mass-text {
            padding-left: 50px;
            .mass-aro, .mass-item {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            .mass-aro {
                margin-top: 37px;
                .mass-item {
                    position: relative;
                    padding-left: 100px;
                    margin-bottom: 20px;
                    .item-title {
                        color: #b8b8b8;
                        display: inline-block; 
                        width: 80px;
                        position: absolute;
                        left: 0;
                        top: 0px;
                        i {
                            color: red;
                            font-style: normal;
                        }
                    }
                    .choose-fodder {
                        width: 242px;
                        background-color: #f8f8f8;
                        min-height: 95px;
                        border: 1px solid #f0f2fa;
                        cursor: pointer;
                        position: relative;
                        .fodder-font {
                            font-size: 26px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            z-index: 88888;
                            transform: translate(-50%, -50%);
                            opacity: .2;
                        }
                    }
                }
                .type-item {
                    padding: 7px 14px;
                    cursor: pointer;
                    margin-right: 20px;
                }
                .action {
                    background-color: #44bcbc;
                    color: #fff;
                }
            }
            .handle-mass {
                text-align: center;
                margin-top: 100px;
            }
        }
    }
    .expand-modal-share-link {
        display: flex;
        justify-content: space-around;
        position: relative;
        .ivu-modal-body {
            height: 350px;
            padding-bottom: 95px;
        }
        .ivu-modal-footer {
            display: none;
        }
        .share-link-btn {
            position: absolute;
            left: 50%;
            bottom: 16px;
            transform: translateX(-50%);
        }
        p {
            font-size: 14px;
            line-height: 35px;
            display: inline;
        }
        a {
            font-size: 14px;
        }
        #qrcode {
            margin-left: 95px;
            margin-top: 0px;
        }
    }
</style>
