<template>
    <div class="set-display-boss">
        <ListCard title="编号" :content="getedInfo && getedInfo.code" style="margin-bottom: 5px;"></ListCard>
        <ListCard title="邀请购买" :content="getedInfo && getedInfo.title" style="margin-bottom: 5px;"></ListCard>
        <ListCard title="展示有效期" style="margin-bottom: 5px;">
            <DatePicker id="idDateTimePicker" v-model="endTime" @on-open-change="onchangeDateTime" type="datetime" placeholder="请设置展示有效期" :options='dataOptions' style="width: 200px" class="set-dis-date" ref="dateTimePiker"></DatePicker>
        </ListCard>
        <div class="input-post-container">
            <p><i class="red-class">*</i> 设置海报及二维码</p>
            <div class="add-img-button" @click="addImg = !addImg" v-if="!lastImage">
                <div class="add-img-icon"></div>
            </div>
            <div class="add-img-button" @click="addImg = !addImg" v-if="lastImage">
                <img :src="lastImage" alt="">
            </div>
        </div>
        <div class="set-display-button-container">
            <div class="common-button common-button-cancel common-button-large" @click="onClickBack">返回</div>
            <div class="common-button" @click="onclickSave(1)">保存信息并展示</div>
            <div class="common-button common-button-large" @click="onclickSave(0)">保存</div>
        </div>
        <Modal
            v-model="addImg"
            width="730px"
            title="设置海报及二维码"
            class="add-img-modal"
            okText="保存设置"
            cancelText="取消"
            @on-ok="addImgOk"
            @on-cancel="addImgCancel">

                <div class="modal-img-container" id="imgContent" style="position: relative;">
                    <img :src="lastImage" alt="">
                    <div id="qrcode" ref="qrcode" :style=" {'left': lefts + 'px', 'top': tops + 'px'}"></div>
                </div>

                <div class="modal-right-container">
                    <div class="modal-right-post">
                        <p>自定义海报</p>
                        <div>
                            <div class="common-button" style="margin-bottom: 5px; position: relative; ">
                                点击上传
                                <input type="file" v-on:change="uploadImgChange" ref="uploadImgButton">
                            </div> <br>
                            <span>上传图片分辨率比例为9:16（推荐尺寸750x1344），<br/> jpg,png格式，图片不大于1M</span>
                        </div>
                    </div>
                    <div class="modal-right-qr">
                        <p>自定义二维码位置</p>
                        <div>
                            <p>鼠标拖动方块，可自定义二维码位置</p>
                            <div class="common-button" style="margin-top: 5px;" @click="onclickToResetQrPosi">默认位置</div>
                        </div>
                    </div>
                </div>
        </Modal>
        <Upload
            ref="upload"
            :data="uploadData"
            name="files"
            :show-upload-list="false"
            :on-success="handleSuccess"
            type="drag"
            :action="uploadFileUrl"
            style="visibility: hidden;">
        </Upload>
    </div>    
</template>

<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
import { waitUntil, } from '@public/libs/util';
import ListCard from '../../modules/listCard.vue';
import valid, { errors, sys, common, wpTask, wpMarketCommon, } from '../../libs/request.js';
import { mapMutations, } from 'vuex';

export default {
    name: 'SetDisplay',
    components: {
        ListCard,
    },
    data() {
        return {
            isUploaded: false,
            getedInfo: null,
            lefts: this.getedInfo && this.getedInfo.axisX || 60,
            tops: this.getedInfo && this.getedInfo.axisY || 260,
            imageId: null,
            endTime: null,
            addImg: false,
            uploadImg: null,
            isUploadingImg: false,
            lastImage: null,
            file: null, // 读取到的图片数据
            dataOptions: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            uploadData: {
                type: 'wp_task_poster_image',
                dirName: 'all',
                meunId: '1001'
            },
        };
    },
    computed: {
        uploadFileUrl() {
            return wpMarketCommon.getUploadFileUrl();
        },
    },
    created() {
        this.getInfo();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        onchangeDateTime(val) {
            if (!val) {
                if (new Date(this.endTime).valueOf() < Date.now() && this.endTime) {
                    this.$Message.error('展示截止时间应大于当前时间');
                    this.endTime = null;
                    document.getElementById('idDateTimePicker').getElementsByTagName('input')[0].click();
                }
            } 
        },
        onClickBack() {
            this.$router.go(-1);
        },
        /*
        * 添加海报 modal
        */
        addImgOk() {
            this.updateLoadingStatus({isLoading: true});
            this.hmltToCanvas();
            this.isUploadingImg = true;
            this.file && this.$refs.upload.post(this.file); // 上传 获取到的 最新的图片
        },
        handleSuccess(data) {
            if(data.status === "success") {
                this.imageId = data.data.id;
            } else {
                this.$Message.error(data.message);
            }
            this.isUploadingImg = false;
            this.updateLoadingStatus({isLoading: false});
        },
        addImgCancel() {
            if (!this.lastImage) {
                qrcode.innerHTML = '';
                imgContent.getElementsByTagName('img')[0].setAttribute('src', '');
            }
        },
        /*
        * 默认位置
        */
        onclickToResetQrPosi() {
            this.lefts = this.getedInfo && this.getedInfo.axisX || 60;
            this.tops = this.getedInfo && this.getedInfo.axisY || 260;
        },
        /*
        * 选择图片 
        */
        uploadImgChange(data) {
            const imgContent = document.getElementById('imgContent'); // img container
            const qrcode = document.getElementById('qrcode'); // qrcode
            const file = data.target.files[0];
            if (!file.type.includes('png') && !file.type.includes('jpg')  && !file.type.includes('jpeg')) {
                this.$Message.error('请上传jpg,png格式图片');
                return;
            }
            if (file) {
                qrcode.innerHTML = '';
                imgContent.getElementsByTagName('img')[0].setAttribute('src', '');
            }
            const size =file.size / 1024 / 1024;
            if (size > 1) {
                this.$Message.error('图片大小不得超过1M');
                data.target.value = "";
                return;
            };
            this.getPoster(file);
        },
        /*
        * 渲染图片
        */
        getPoster(file) {
            const _this = this;
            var reader = new FileReader(); //新建FileReader对象
            reader.readAsDataURL(file); //读取为base64
            reader.onloadend = function (e) {
                var dataURL = reader.result;
                _this.file = file;
                const Img = new Image();
                Img.src = dataURL;
                Img.onload = () => {
                    const imgContent = document.getElementById('imgContent');
                    const img = imgContent.getElementsByTagName('img')[0];
                    imgContent.replaceChild(Img, img);
                    _this.qrcodes();
                    _this.dragDrop();
                };
            };
        },
        // 绘制二维码
        qrcodes() {
            const qrcode = new QRCode('qrcode',{
                width: 60, // 设置宽度，单位像素
                height: 60, // 设置高度，单位像素
                text: '占位二维码'   // 设置二维码内容或跳转地址
            });
        },
        // 二维码拖放
        dragDrop() {
            let ex = 0;
            let ey = 0;
            let dx = 0; // debounce x
            let dy = 0;
            let isDown = false;
            const qrcode = document.getElementById('qrcode');
            const imgContent = document.getElementById('imgContent');
            const bodys = document.getElementsByTagName('body')[0];
            qrcode.setAttribute('draggable', true);
            qrcode.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDown = true;
                ex = e.clientX;
                ey = e.clientY;
                dx = ex - qrcode.getBoundingClientRect().left; // 点击时 鼠标距离 qrcode 左上角的距离
                dy = ey - qrcode.getBoundingClientRect().top;

                qrcode.style.left = ex - dx - imgContent.getBoundingClientRect().left + 'px';
                qrcode.style.top = ey - dy - imgContent.getBoundingClientRect().top + 'px';

                bodys.addEventListener('mousemove', (e) => {
                    if (!isDown) return; 
                    e.preventDefault();
                    this.lefts =  e.clientX - dx - imgContent.getBoundingClientRect().left;
                    this.tops = e.clientY - dy - imgContent.getBoundingClientRect().top;
                    this.lefts = this.lefts <= 0 ? 0 : this.lefts;
                    this.lefts = this.lefts >= (imgContent.offsetWidth - qrcode.offsetWidth) ? (imgContent.offsetWidth - qrcode.offsetWidth) : this.lefts;
                    this.tops = this.tops <= 0 ? 0 : this.tops;
                    this.tops = this.tops >= (imgContent.offsetHeight - qrcode.offsetHeight) ? (imgContent.offsetHeight - qrcode.offsetHeight) : this.tops;
                    qrcode.style.left = this.lefts + 'px';
                    qrcode.style.top = this.tops + 'px';
                });
            });
            qrcode.addEventListener('mouseup', function(e) {
                isDown = false;
            });
        },
        hmltToCanvas() {
            const _this = this;
            const imgContent = document.getElementById('imgContent');
            html2canvas(imgContent).then(function(canvas) {
                _this.lastImage = canvas.toDataURL("image/jpeg")
            });
        },
        /*
        * 数据获取
        */
        getInfo() {
            const data =  {
                id: this.$route.query.id,
            };
            wpTask.form(data).then(valid.call(this)).then(res => {
                this.getedInfo = res.data.data;
            }).catch(errors.call(this));
        },
        onclickSave(type) {
            if (!this.imageId && !this.isUploadingImg) {
                this.$Message.error('请设置宣传海报');
                return;
            }
            waitUntil (()=>{
                this.updateLoadingStatus({isLoading: true});
                return !!this.imageId;
            },()=>{
                const data = {
                    id: this.$route.query.id,
                    code: this.getedInfo.code,
                    title: this.getedInfo.title,
                    objectId: this.getedInfo.objectId,
                    objectType: this.getedInfo.objectType,
                    objectCode: this.getedInfo.objectCode,
                    clickNum: this.getedInfo.clickNum,
                    successNum: this.getedInfo.successNum,
                    isShow: type, // 展示状态
                    isUse: this.getedInfo.isUse,
                    endTime: this.endTime && this.endTime.format('yyyy-MM-dd hh:mm:ss'),
                    imageId: this.imageId,
                    axisX: (Number(this.lefts) / 180 * 100).toFixed(2) + '%',
                    axisY: (Number(this.tops) / 350 * 100).toFixed(2) + '%',
                };
                wpTask.save(data).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.$Message.info(res.data.message);
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading: false});
                    this.$router.go(-1);
                });
            });
        },
    },
};
</script>

<style lang="less">
    @import url('../../less/common.less');
    .set-display-boss {
        .set-dis-date {
            position: absolute;
            left: 127px;
            top: 0;
        }
        .input-post-container {
            position: relative;
            width: 100%;
            height: 360px;
            margin-bottom: 100px;
            >p {
                display: inline-block;
                color: #999;
                float: left;
                width: 110px;
                height: 33px;
                line-height: 33px;
                text-align: right;
            }
            .add-img-button {
                position: absolute;
                left: 137px;
                top: 10px;
                width: 180px;
                height: 350px;
                cursor: pointer;
                border-radius: 5px;
                background-color: rgba(10, 10, 10, .05);
                .add-img-icon {
                    width: 30px;
                    height: 30px;
                    border: solid 1px #999;
                    position: absolute;
                    border-radius: 5px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        width: 12px;
                        height: 3px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #999;
                    }
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        width: 3px;
                        height: 12px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #999;
                    }
                }
            }

        }
        .set-display-button-container {
            width: 410px;
            height: 36px;
            display: flex;
            margin-left: 322px;
            justify-content: space-between;
        }
    }
    .add-img-modal {
        .ivu-modal-body {
            overflow: hidden;
            .modal-img-container {
                width: 180px;
                height: 350px;
                position: relative;
                margin-right: 20px;
                float: left;
                margin-bottom: 20px;
                >img {
                    display: block;
                    width: 180px;
                    height: 350px;
                }
                >img[src=""],img:not([src]){opacity:0;}
                &:after {
                    content: '效果预览';
                    display: block;
                    color: #333;
                    position: absolute;
                    left: 50%;
                    top: 100%;
                    transform: translate(-50%);
                    font-size: 14px;
                    text-align: center;
                    margin-top: 5px;
                }
            }
            .modal-right-container {
                float: left;
                width: 440px;
                > div {
                    overflow: hidden;
                    >p {
                        color: #999;
                        width: 120px;
                        display: inline;
                        margin-right: 20px;
                        line-height: 36px;
                        float: left;
                        font-size: 14px;
                    }
                    >div {
                        float: left;
                        span {
                            color: #a0a0a0;
                            line-height: 20px;
                        }
                    }
                }
            }
            .modal-right-post {
                height: 100px;
                input {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
            .modal-right-qr {
                > div {
                    > p {
                        font-size: 14px;
                        line-height: 36px;
                    }
                }
            }
        }
    }
    #qrcode {
        position: absolute;
        cursor: move;
    }
    .red-class {
        color: red !important;
    }
</style>
