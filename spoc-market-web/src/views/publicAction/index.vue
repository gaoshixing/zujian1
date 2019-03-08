<style lang='less'>
    @import url('../../less/common.less');
    .public-action-gsx {
        .cont {
            margin-top: 30px;
            margin-left: 20px;
            overflow: hidden;
            .cont-left {
                float: left;
                width: 275px;
                height: 490px;
                border: 1px solid #cce6ff;
                position: relative;
                background-color: #f9f9f9;
                .left-top {
                    width: 100%;
                }
                .left-bottom {
                    width: 100%;
                    position: absolute;        
                    left: 0;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    .bottom-item {
                        position: relative; 
                        cursor: pointer;
                        .more {
                            font-size: 8px;
                        }
                        .menu-items {
                            min-width: 100%;
                            padding: 5px 10px;
                            background-color: #fff;
                            position: absolute;
                            bottom: 35px;
                            text-align: center;
                            .item-li {
                                height: 32px;
                                border-bottom: 1px solid #eee;
                                line-height: 32px;
                                list-style: none;
                                text-align: center;
                                white-space: nowrap;
                            }
                            .item-li:last-of-type {
                                border-bottom: none;
                            }
                        }
                    }
                    .bottom-item:first-of-type {
                        .menu-items {
                            left: 0;
                        }
                    }
                    .bottom-item:last-of-type {
                        .menu-items {
                            right: 0;
                        }
                    }
                    .bottom-menu ,.bottom-item {
                        width:15%;
                        border-right: 1px solid #eee;
                        float:left;
                        text-align: center;
                        list-style: none;
                        text-align: center;
                        height: 32px;
                        line-height: 32px;
                        background-color: #fff;
                        .fsz {
                            width: 20px;
                            height: 20px;
                            font-size: 24px;
                        }
                    }
                    .bottom-item:last-of-type {
                        border-right: none;
                    }
                }
            }
            .cont-right {
                width: 666px;
                float: right;
            }
            .handle {
                text-align: right;
                margin-bottom: 20px;
            }
        }
        .auto-answer {
            .answer-type {
                margin-top: 30px;
                margin-left: 20px;
                color: #999;
                margin-bottom: 20px;
            }
            .type-name {
                color: #b8b8b8;
            }
            .type-item {
                padding: 6px 12px;
                cursor: pointer;
                margin-left: 20px;
            }
            .action {
                background-color: #44bcbc;
                color: #fff;
            }

            .cancleBorder {
            }
            .page {
                margin-top: 20px;
                margin-bottom: 140px;
                text-align: center;
            }
        }
        .mass-text {
            padding-left: 20px;
            .mass-aro, .mass-item {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            .mass-aro {
                margin-top: 30px;
                .mass-item {
                    position: relative;
                    padding-left: 85px;
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
                    padding: 6px 12px;
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
        .watch-and-setting {
            margin-top: 30px;
            padding-left: 20px;
            .file-aro {
                .choose-color {
                    float: left;
                    margin-left: 50px;
                    p {
                        line-height: 40px;;
                    }
                }
                .btn-btn {
                    position: absolute;
                    left: 10%;
                    bottom: 5%;
                    transform: translate(-50%, -50%)
                }
                position: relative;
                padding-left: 85px;
                .upload_cont {
                    width: 300px;
                    line-height: 400px;
                    text-align: center;
                    position:relative;
                    overflow: hidden;
                    background: #f8f8f8;
                    .img {
                        width: 100%;
                    }
                }
                .upload_cont1 {
                    height: 400px;
                }
                .upload_cont2 {
                    height: 160px;
                    overflow: hidden;
                    line-height: 160px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .bor {
                    border: 1px dashed #dddee1;
                }
                .choose-file {
                    width: 300px;
                    height: 400px;
                    background-color: #f8f8f8;
                    cursor: pointer;
                    position: relative;
                    .fodder-font {
                        font-size: 26px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%)
                    }
                    .file-prev {
                        width: 100%;
                        height: 100%;
                        z-index: 555;
                    }
                }
                .url-copy {
                    margin-left: 63px;
                    font-size: 14px;
                }
            }
            .up-file {
                font-size: 14px;
                display: inline-block;
                width: 74px;
                position: absolute;
                left: 0;    
                top: 0;
                text-align: right;
                color: #b8b8b8;
                i {
                    font-style: normal;
                    color: red;
                }
            }
        }
    }
    .add-img-modal {
        .ivu-modal-body {
            overflow: hidden;
            .modal-img-container {
                width: 300px;
                height: 400px;
                position: relative;
                margin-right: 20px;
                float: left;
                margin-bottom: 20px;
                overflow: hidden;
                >img {
                    display: block;
                    width: 100%;
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
    
</style>
<template>
    <div class="public-action-gsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
            <TabPane label="目录管理" name="1"></TabPane>
            <TabPane label="自动回复设置" name="2"></TabPane>
            <TabPane label="群发消息" name="3"></TabPane>
            <TabPane label="设置关注引导页" name="4"></TabPane>
            <TabPane label="设置推广员报名页" name="5"></TabPane>
        </Tabs>
        <div class="cont" v-show="tabValue == '1'">
            <div class="cont-left">
                <img class="left-top" src="../../assets/images/导航 _iOS_常规.png" alt="">
                <ul class="left-bottom">
                    <li class="bottom-menu">
                        <i class="iconfont icon-jianpan fsz"></i>
                    </li>
                    <li class="bottom-item" v-for="(item, index) in bottomList" :style="{width:85/bottomList.length+'%'}" @click="menuClick(item, index)">
                        <i v-if="item.sub_button" class="iconfont more icon-gengduo"></i>{{item.name}}
                        <ul class="menu-items" v-if="item.sub_button&&bottomNum==index">
                            <li class="item-li"  v-for="item1 in item.sub_button">{{item1.name}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="cont-right">
                <p class="handle">
                    <Button type="primary" class="primary_btn_new1" @click="addAction"> 　添加　 </Button>
                    <Button type="primary" class="primary_btn_new1" @click="issureAction" style="margin-right:0"> 　发布　 </Button>
                </p>
                <Table :columns="columns" border :data="menuList" ></Table>
            </div>
        </div>
        <div class="auto-answer" v-show="tabValue == '2'">
            <p class="answer-type">
                <span class="type-name">消息类型：</span>
                <span class="type-item" v-for="(item, index) in typeList" :key="index" @click="answerType(item, index)" :class="{'action':num == index}">{{item.name}}</span>
            </p>
            <btnlist
                title="自动回复列表"
                :btnList='btnList'
                >
            </btnlist>
            <div class="cancleBorder">
                <Table :columns="columns1" :data="data1.list" class="common-table" :loading="loading"></Table>
            </div>
            <div class="page">
                <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange"  :current="pageNo" :total="data1.count" @on-change="onPageChange" v-if="data1.count>10"></Page>
            </div>
        </div>
        <div class="mass-text" v-show="tabValue == '3'">
            <ul class="mass-aro">
                <com
                    style="{margin-top: 37px;}"
                    @fodderInfo='fodderInfo'
                    ref="fodderModel"
                    :isChoose='isChoose'
                    :num1="num1"
                    @numChanges="numChanges"
                ></com>
                <div v-if="!isUpfile" style="margin-left: 85px;">
                    {{sendCount.appsType == 'service' ? '当月已发送': '当日已发送'}}{{sendCount.sendCount}}条，剩余可发送{{sendCount.usableCount}}条，待发送{{sendCount.sendingCount}}条
                </div>
                <li class="mass-item" v-if="isUpfile">
                    <span class="item-title"><i>*</i> 发送方式：</span>
                    <Select v-model="sendTypeLabel" style="width:178px" @on-change='selectChangeW'>
                        <Option v-if="item.value != 'openid' || (item.value == 'openid' && sendCount.appsType == 'service')" v-for="item in sendList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </li>
                <li class="mass-item" v-if="isUpfile">
                    <span class="item-title"><i>*</i> 群发对象：</span>
                    <Select
                        style="width:178px"
                        filterable
                        :multiple="sendTypeLabel == 'openid'"
                        remote
                        :value='massObj'
                        label-in-value
                        @on-change='selectChange'
                        :remote-method="remoteMethod1"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.id" :label="option.name" :key="index">{{option.name}}</Option>
                    </Select>
                    <span v-if="sendCount.appsType == 'service'" style='color:#b8b8b8;margin-left:20px'>(如果按照openId发送,群发至少选择二个人)</span>
                </li>
            </ul>
            <p class="handle-mass">
                <Button type="primary" class="primary_btn_new1" @click="massSend" v-if="!isUpfile" :disabled="sendCount.usableCount == 0"> 　上传素材,进入下一步　 </Button>
                <Button type="primary" class="primary_btn_new1" @click="chooseAgao" v-else> 　重新选择素材　 </Button>
                <Button type="primary" class="primary_btn_new1" @click="modal1 = true" style="margin-right:20px" v-if="isUpfile"> 　预览　 </Button>
                <Button type="primary" class="primary_btn_new1" @click="massSave" style="margin-right:0" v-if="isUpfile"> 　发送　 </Button>
            </p>
        </div>

        <div class="watch-and-setting" v-show="tabValue == '4'">
            <div class="file-aro">
                <span class="up-file"><i>*</i> 上传图片</span>
					<div v-show="getedInfo.filePath&&!lastImage" class="upload_cont upload_cont1" id="upload_cont" @click="chooseFile">
						<img class="img" :src="getedInfo.filePath" />
					</div>
					<div  v-if="!getedInfo.filePath||lastImage" :class="{'upload_cont':true,'upload_cont1':true, 'bor':!lastImage}"  @click="chooseFile">
						<img class="img" :src="lastImage" v-if="lastImage" />
						<Icon type="plus-circled" :size="30" v-else></Icon>
					</div>
				<!-- </Upload> -->

                <Button type="primary" class="primary_btn_new1" @click="issureFlie" style="margin:15px 0 36px 100px"> 　发布　 </Button></br>
            </div>
            <div class="file-aro">
                <!-- <span class="up-file">本页URL</span>{{wxUrl}}<a class="url-copy" @click="CopyUrl">复制</a> -->
            </div>
        </div>
        <div class="watch-and-setting" v-show="tabValue=='5'">
            <div class="file-aro">
                <span class="up-file"><i>*</i> 上传banner</span>
                <div @click="tempV = 'banner'" style="height:160px;position:relative">
                    <Upload  ref="upload" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadFileUrl" style="width:300px;float:left">
                        <div class="upload_cont upload_cont2">
                            <img style="width:100%;vertical-align:top" :src="inviteForm.uploadFile6||setSignObj.json.filePath1" v-if="inviteForm.uploadFile6||setSignObj.json.filePath1" />
                            <Icon type="plus-circled" :size="30" v-else></Icon>
                        </div>
                    </Upload>
                    <Button v-if="false" class="btn-btn" :style="{color:color1,background: color2} ">{{butName}}</Button>
                <div class="choose-color" v-if="false">
                    <p>按键名称: <Input v-model="butName" placeholder="" style="width: 172px" />
                </p> 
                    <p>按键颜色:    <ColorPicker v-model="color1" /></p>
                    <p>文字颜色:    <ColorPicker v-model="color2" /></p>
                </div>
                </div>
                <p style="color:red;margin:10px 0;text-align:left">顶部图片将固定在页面上：需上传尺寸1080*576像素</p>
            </div>
            <div class="file-aro">
                <span class="up-file"><i>*</i> 上传图片</span>
                <div @click="tempV = 'body'">
                    <Upload  ref="upload" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadFileUrl" style="width:300px;min-height:400px;">
                        <div class="upload_cont" style="min-height:400px">
                            <img style="width:100%;vertical-align:top" :src="inviteForm.uploadFile5||setSignObj.json.filePath" v-if="inviteForm.uploadFile5||setSignObj.json.filePath" />
                            <Icon type="plus-circled" :size="30" v-else></Icon>
                        </div>
                    </Upload>
                </div>
                <Button type="primary" class="primary_btn_new1" @click="issureFlie" style="margin:15px 0 36px 30px"> 　发布　 </Button>
                <Button type="primary" class="primary_btn_new1" @click="proviewForm" style="margin:15px 0 36px 30px"> 预览页面效果 </Button></br>
            </div>
            <div class="file-aro">
                <!-- <span class="up-file">本页URL</span>{{expandUrl}}<a class="url-copy" @click="CopyUrl">复制</a> -->
            </div>
        </div>
         <!-- 对话框 -->
        <Modal
            v-model="modal1"
            title="预览群发消息"
            width=728
            ok-text="发送预览"
            ref="preview"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
                <p style="color:#b8b8b8">
                    <i style="color:red;font-style:normal">*</i> 选择预览人员：  
                    <Select
                        style="width:178px"
                        filterable
                        remote
                        v-model='massObjP'
                        label-in-value
                        @on-change='selectChangePreview'
                        :remote-method="getMassTypeListOpenId"
                        :loading="loading1">
                        <Option v-for="(option, index) in options1" :value="option.id" :label="option.name" :key="index">{{option.name}}</Option>
                    </Select>
                </p>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            title="重新选择素材"
            width=728
            ok-text="确认重新选择"
            cancel-text="再想想"
            ref="preview"
            @on-ok="okChoose"
            @on-cancel="cancelChoose">
            <div>
                <p style="text-align:center">
                    是否确认重新选择素材?
                </p>
            </div>
        </Modal>
        <Modal
            v-model="modal3"
            title="扫码预览"
            width=728
            @on-ok="okSM"
            @on-cancel="cancelSM">
            <div>
                <div style="text-align:center">
                    <div id="qrcode1" ref="qrcode1" style="margin: 0 auto; text-align:center;display:inline-block"></div>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="deleteModel"
            title="删除菜单"
            width=728
            @on-ok="okDelete"
            @on-cancel="cancelDelete">
            <div>
                <div style="text-align:center;font-size:16px">
                    确定删除 <span style="color:red;line-height:100px">{{deleteObj.title}}</span> 菜单么?
                </div>
            </div>
        </Modal>
        <Modal
            v-model="addImg"
            width="830px"
            title="设置海报及二维码"
            class="add-img-modal"
            okText="保存设置"
            cancelText="取消"
            @on-ok="addImgOk"
            @on-cancel="addImgCancel">
                <div class="modal-img-container" id="imgContent" style="position: relative;">
                    <img :src="getedInfo.originFile || lastImage" alt="">
                    <div v-show="isShowER"  id="qrcode" :style=" {'left': lefts + 'px', 'top': tops + 'px', position:'absolute'}">
                        <img style="width:60px;height:60px" :src="qrcodeUrl" alt="">
                    </div>
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
        <Upload  ref="upload1" :data="uploadData" name="files" :show-upload-list="false" :on-success="handleSuccess1" :format="['jpg','jpeg','png','gif']" :max-size="4096" :on-format-error="handleFormatError" style="display:none" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" :action="uploadFileUrl">
        </Upload>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import btnlist from '@public/modules/btnlist'
import com from './com.vue'
import valid,{errors, sys, publicAction, wpMarketCommon} from '../../libs/request';
import { mapState, mapGetters, mapMutations } from 'vuex';
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
// import {mapState} from 'vuex'
export default {
    data() {
        return {
            sendCount:{
                appsType:'',//subscribe（订阅号）、service（服务号）
                sendCount: 0, //已发送数量（订阅号为当日次数，服务号为当月次数）
                usableCount: 0,//还可用次数（为零时上传按钮不可用）
                sendingCount: 0, //待发送
            },
            loading: false,
            upBanner: false,
            upBody: false,
            isShowER: false,
            butName: '立即加入',
            qrcodeUrl: '',
            color1: 'red',
            color2: 'green',
            tempV: '',
            wxUrl: '',
            expandUrl: '',
            qRfilePath: '',
            tempF: '',
            tempF1: '',
            isSM: false,
            or: false,
            qr: false,
            modal3: false,
            // chooseNewFile: false,
            // chooseNewFileOk: false,
            addImg: false,
            modFile: '',
            saveId: '',
            json: {
                filePath: '',
                tops: '',
                lefts: '',
                qrUrl: '',
            },
            isChoose: true,
            bottomNum: 990,
            lastImage: null,
            getedInfo: {
                filePath: '',
            },
            uploadImg: null,
            modal2: false,
            isUpfile: false,
            massObjIdPre: '',
            preventMan: '',
            pageNo: 1,
            pageSize: 10,
            lefts: 60,
            tops: 260,
            tempLefts: 60,
            tempTops: 260,
            massObjP: '',
            inviteForm: {
                uploadFile: '',
                uploadFile5: '',
                uploadFile6: '',
            },
            bottomList: [{
                sub_button: ''
            }],
            massObj: '',
            massObjId: '',
            uploadList: '',
            materialId: '',
            sendTypeLabel: '',
            sendList: [],
            publicInfo: '',
            uploadData: {
                type: 'wp_inviting_page_image',
                dirName: 'all',
                meunId: '1001'
            },
            autoTypeAuto: 'news',
            autoType: 'news',
            btnList: [
                {
                    text: '新增',
                    type: 'primary',
                    event: this.addNews
                },
            ],
            urlData: {
                filePath: '',
                filePath5: '',
            },
            modal1: false,
            num: 0,
            num1: 1,
            src: '',        
            originFile: '',
            qrcode: '',
            model1: '',
            items1: [],
            items2: [],
            items3: [],
            items4: [],
            items5: [],
            items6: [],
            options1: [],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
            ],
            loading1: false,
            typeList: [
                {type: 'news', name: '图文消息'},
                {type: 'image', name: '图片消息'},
                {type: 'voice', name: '语音消息'},
                {type: 'video', name: '视频消息'},
                {type: 'text', name: '文本消息'},
            ],
            tabValue: '1',
            menuList: [],
            setSignObj: {
                json: {}
            },
            deleteModel: false,
            deleteObj: {},
            data1: {
            },
            columns1: [
                {
                    title: "关键字",
                    key: "keyword",
                    align: "center",
                },
                {
                    title: "素材标题",
                    key: "content",
                    align: "center",
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    align: "center",
                },
                {
                    title: "操作",
                    key: "packName",
                    align: "left",
                    render: (h, params) => {
                        return h("div", {
                            style: {
                                textAlign: 'left'
                            }
                        }, [
                            h(
                                "span",
                                {
                                    style: {
                                        color: 'red',
                                        marginRight: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteAuto(params.row)
                                        }
                                    }
                                },
                                '删除'
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        color: 'red',
                                    },
                                     on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'publicAction.addAutoReturn',
                                                query: {
                                                    autoId: params.row.id,
                                                    appId: params.row.appId,
                                                    type: this.num
                                                }
                                            })
                                        }
                                    }
                                },
                                '编辑'
                            ),
                        ])   
                    }
                },
            ],
            columns: [
                {
                    title: "",
                    type: 'expand',
                    align: "center",
                    width: 60,
                    render: (h, params) => {
                        if (params.row.subButtons.length) {
                            return  h('div', params.row.subButtons.map(item => {
                                return h('p',{
                                    style: {
                                        lineHeight: '48px',
                                        marginLeft: '10px',
                                    }
                                },
                                [
                                    h(
                                        'span',
                                        {
                                            style: {
                                                display: 'inline-block',
                                                width: '454px',
                                                textAlign: 'center'
                                            }
                                        },
                                        item.title
                                    ),
                                   
                                h("span",
                                    {
                                        style: {
                                            color: 'red',
                                            marginRight: '20px',
                                            marginLeft: '20px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.deleteObj = params.row
                                                this.deleteModel = true
                                                // this.deleteMenu(item.id)
                                            }
                                        }
                                    },
                                    '删除'
                                ),
                                h(
                                    "a",
                                    {
                                        style: {
                                            color: 'red'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'publicAction.addAction',
                                                    query: {
                                                        pubMeId: item.id
                                                    }
                                                })
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                ]
                                )
                            }))
                        } else {
                            return  h('div',
                                {
                                    style: {
                                       textAlign: 'center', 
                                       color: '#ccc'
                                    }
                                },
                                '暂时没子集'
                            )
                        }
                    }
                },
                {
                    title: "菜单",
                    key: "title",
                    align: "center",
                    width: 454,
                },
                {
                    title: "操作",
                    align: "left",
                    render: (h, params) => {
                        return h("div", {
                            style: {
                                textAlign: 'left'
                            }
                        }, [
                            h(
                                "span",
                                {
                                    style: {
                                        color: 'red',
                                        marginRight: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteObj = params.row
                                            this.deleteModel = true
                                            // this.deleteMenu(params.row.id)
                                        }
                                    }
                                },
                                '删除'
                            ),
                            h(
                                "a",
                                {
                                    style: {
                                        color: 'red'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'publicAction.addAction',
                                                query: {
                                                    pubMeId: params.row.id
                                                }
                                            })
                                        }
                                    }
                                },
                                '编辑'
                            ),
                        ])   
                    }
                },
                
            ]
        }
    },

    components: {
        btnlist,
        vSelect,
        com,
    },

    computed: {
        // ...mapState('market', ['publicInfo'])
        uploadFileUrl() {
            return wpMarketCommon.getUploadFileUrl();
        }
    },

    created() {
        this.tabValue = this.$route.query.currentIndx?(this.$route.query.currentIndx+''):'1'
    },

    mounted() {
        this.publicInfo = JSON.parse(sessionStorage.getItem('publicInfo'))
        this.toggleSatus(this.tabValue)
    },

    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        numChanges(val) {
            this.num1 = val;
        },
        menuClick(item, index) {
            this.bottomNum = index
            this.$nextTick(this.getW)
        },
        getW() {
            let dom = document.querySelector('.menu-items')
            let num = this.bottomList.length
            if (this.bottomNum==1&&num>2&&this.bottomList[1].sub_button) {
                dom.style.left='50%'
                dom.style.minWidth='100%'
                dom.style.transform="translateX(-50%)"
            }
        },
        chooseAgao() {
            this.modal2 = true
        },
        selectChangeW() {
            this.massObj=this.massObjId = ''
        },
        /**
         *  菜单
         */
        getMenuList() {
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.getMenuList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.menuList = res.data.data
                }
            }).catch(errors.call(this));
        },
        /**
         *  菜单
         */
        getJson() {
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.getJson(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.bottomList = res.data.data ? JSON.parse(res.data.data).button : []
                }
            }).catch(errors.call(this));
        },
        /**
         *  获取当日发送次数
        */
        getSendCount() {
            this.updateLoadingStatus({
                isLoading: true
            })
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.sendCount(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.sendCount = res.data.data
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({
                    isLoading: false
                })
            });
        },
        cancelDelete() {

        },

        okDelete() {
            this.deleteMenu()
        },
        /**
         *  删除菜单
         */
        deleteMenu() {
            let obj = {
                id: this.deleteObj.id,
            }
            publicAction.deleteMenu(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.getMenuList()
                    this.getJson()
                }
            }).catch(errors.call(this));
        },
        /**
         *  自动回复列表
         */
        getdataList() {
            let obj = {
                msgType: this.autoType,
                appId: this.publicInfo.id,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }
            this.loading = true
            publicAction.getAutoList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.data1 = res.data.data
                }
            }).catch(errors.call(this)).finally(() =>{
                this.loading = false
            });;
        },

        /**
         *  删除自动回复 deleteAutoList
         */

        deleteAuto(params) {
            let obj = {
                id: params.id
            }
            publicAction.deleteAutoList(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.getdataList()
                }
            }).catch(errors.call(this));
        },

        /**
         *  群发保存
         */
        massSave() {
            if (!this.sendTypeLabel) {
                this.$Message.info('请选择发送方式')
                return
            }
            if (!this.massObjId) {
                this.$Message.info('请选择发送对象')
                return
            }
            if (!this.materialId) {
                this.$Message.info('请选择素材')
                return
            }
            let obj = {
                appId: this.publicInfo.id,
                sendType: this.sendTypeLabel,
                msgType: this.autoTypeAuto,
                materialId: this.materialId,
                isPreview: 0,
            }
            if (this.sendTypeLabel == 'tag') { // 标签
                obj = Object.assign(obj, {
                    tagId: this.massObjId
                })
            } else if (this.sendTypeLabel == 'openid') {
                if (this.massObjId.split(',').length<3) {
                    this.$Message.info('请至少选择两个群发对象')
                    return
                }
                obj = Object.assign(obj, {
                    sendOpends: this.massObjId
                })
            }
            this.mass(obj,true)  //清除数据标识
        },
        resetDate() {
            setTimeout(() => {
                const {href} = this.$router.resolve({
                    name: 'publicAction.index',
                    query: {
                        currentIndx: 3,
                    }
                })
                window.open(href, '_self');
                window.location.reload()
            }, 300)
        },
        mass(obj, clearData) {
            this.updateLoadingStatus({
                isLoading: true
            })
            publicAction.massSend(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.massObjIdPre = this.massObjP = ''
                    this.$Message.info(res.data.message)
                    this.isUpfile = true
                    if(this.tabValue == '3' && clearData){
                        this.okChoose()
                        this.getSendCount()
                        //this.resetDate()
                    }
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({
                    isLoading: false
                })
            });
        },

        /**
         *  群发列表select
         */
        getBatchList() {
            let obj = {
                types: 'wp_custom_sendall_send_type'
            }
            sys.batchListData(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.sendList = res.data.data.wp_custom_sendall_send_type
                }
            }).catch(errors.call(this));
        },
        /**
         *  群发搜素select
         */
        remoteMethod1(query) {
            if (!this.sendTypeLabel) {
                this.$Message.error('请选择发送方式')
                return
            }
            if (this.sendTypeLabel == 'tag') { // 标签  
                this.getMassTypeListTag(query)
            }
            if (this.sendTypeLabel == 'openid') {
                this.getMassTypeListOpenId(query)
            }

        },

        getMassTypeListTag(name) {
            this.loading1 = true
            let obj = {
                name: name,
                appId: this.publicInfo.id,
            }
            publicAction.searchTag(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.loading1 = false
                    this.options1 = res.data.data
                }
            }).catch(errors.call(this));
        },

        getMassTypeListOpenId(name) {
            this.loading1 = true
            let obj = {
                name: name,
                appId: this.publicInfo.id,
            }
           publicAction.openId(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.loading1 = false
                    this.options1 = res.data.data.list
                }
            }).catch(errors.call(this));
        },

        /**
         *   素材id
         */
        fodderInfo(value, type) {
            this.materialId = value.id
            this.autoTypeAuto = type

        },

        answerType(item, index) {
            this.num = index
            this.autoType = item.type
            if (index==4) {
                this.$set(this.columns1, 1, {
                    title: "文本内容",
                    key: "content",
                    align: "center",
                })
            } else {
                this.$set(this.columns1, 1, {
                    title: "素材标题",
                    key: "content",
                    align: "center",
                })
            }
            this.getdataList()
        },
        /**
         *  发布
         * 
         */
        issureAction() {
            if (this.menuList.length <= 0) {
                this.$Message.error('菜单不能为空')
                return
            }
            
            let obj = {
                appId: this.publicInfo.id,
            }
            publicAction.sendMenu(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                }
            }).catch(errors.call(this));
        },

        addAction() {
            this.$router.push({
                name: 'publicAction.addAction'
            })
        },

        previewMass() {
            
        },

        massSend() {
            if (!this.materialId) {
                this.$Message.info('请选择素材')
                return
            }
            this.updateLoadingStatus({
                isLoading: true
            });
            let formData = new FormData();
            formData.append("appId", this.publicInfo.id);
            formData.append("materialType", this.autoTypeAuto);
            formData.append("materialId", this.materialId);
            formData.append("uploadType", 1);
            publicAction.upfileFodder(formData).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.$Message.info(res.data.message)
                    this.isUpfile = true
                    this.isChoose = false
                }
            }).catch(errors.call(this)).finally( () => {
                this.updateLoadingStatus({
                    isLoading: false
                }) 
            });
        },

        onPageSizeChange(val) {
            this.pageSize = val
            this.getdataList()
        },

        toggleSatus(val) {
            if (val == 1) {
                this.getMenuList()
                this.getJson()
                return
            }
            if (val == 2) {
                this.getdataList()
                return
            }
            if (val == 3) {
                this.getSendCount()
                this.getBatchList()
                return
            }
            if (val == 4) {
                this.getQRcode()
                this.formImg()
                return
            }
            if (val == 5) {
                this.formImgA()
                return
            }
        },

        formImg() {
            if (this.qrcode) {
                // document.getElementById('qrcode').innerHTML = '' // 清除二维码
            }
            let obj = {
                appId: this.publicInfo.id,
                type: 'subscribe'
            }
            publicAction.formImg(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    res.data.data = res.data.data instanceof Object ? res.data.data : {}
                    this.handle(res.data.data)
                }
            }).catch(errors.call(this)).finally(() => {
            });
        },

        formImgA() {
            let obj = {
                appId: this.publicInfo.id,
                type: 'spread'
            }
            publicAction.formImg(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    res.data.data = res.data.data instanceof Object ? res.data.data : {}
                    let data = res.data.data
                    if (data.json) this.expandUrl = `http://ewechattest.ivygate.cn/index.html?router=expanderSignUp&appid=${this.publicInfo.id}&menuType=spread`
                    data = data instanceof Object ? data : {}
                    if (data.json) {
                        data.json = data.json?JSON.parse(data.json):{
                            filePath1: ''
                        }
                        this.setSignObj = data
                    }
                }
            }).catch(errors.call(this)).finally( () => {
            });
        },

        handle(data) {
            let json = data.json?JSON.parse(data.json):{}
            this.getedInfo = json
            this.tempLefts = this.lefts = json.lefts
            this.tempTops = this.tops = json.tops
            this.getedInfo.lefts = this.getedInfo.lefts*100/json.orW
            this.getedInfo.tops = this.getedInfo.tops*100/json.orH
            this.saveId = data.id || ''
            if (data.json) {
                // this.wxUrl = `http://ewechattest.ivygate.cn/index.html?router=introductionPage&formId=${this.publicInfo.id}&from=pc`
                this.wxUrl = ` http://ewechattest.ivygate.cn/index.html?router=introductionPage/#/introductionPage?formId=${this.publicInfo.id}&from=pc`
                this.isShowER = true
                // this.qrcodes();
                this.dragDrop();
            }
        },

        getQRcode() {
            let obj = {
                id: this.publicInfo.id
            }
            publicAction.getQRcode(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.qrcodeUrl = res.data.data.qrcodeUrl
                }
            }).catch(errors.call(this)).finally( () => {});
        },
        /**
         * 
         */
        saveSeting() {
            if ((this.or&&this.qr)||!this.modFile) {
                this.json.filePath = this.qRfilePath
                this.json.lefts = this.lefts
                this.json.originFile = this.originFile || this.getedInfo.originFile
                this.json.tops = this.tops
                let obj = new FormData()
                obj.append('json', JSON.stringify(this.json))
                obj.append('type', 'subscribe')
                obj.append('id', this.saveId)
                this.savePub1(obj)
            }
        },

        saveSign(data) {
            this.tempF = data.filePath
            if (this.upBanner&&this.upBody) {
                if (!this.tempF || !this.tempF1) {
                    return
                }
            }
            this.savePub()
        },

        saveSign1(data) {
            this.tempF1 = data.filePath
            if (this.upBanner&&this.upBody) {
                if (!this.tempF || !this.tempF1) {
                    return
                }
            }
            this.savePub()
        },

        savePub1(obj) {
            obj.append('appId', this.publicInfo.id)
            publicAction.saveSeting(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.modFile = ''
                    this.wxUrl = ` http://ewechattest.ivygate.cn/index.html?router=introductionPage/#/introductionPage?formId=${this.publicInfo.id}&from=pc`
                }
            }).catch(errors.call(this)).finally( () => { 
                this.updateLoadingStatus({
                    isLoading: false
                });
            });
        },

        savePub() {
            let obj = new FormData()
            let obj1
            if (this.isSM) {
                if (this.upBanner&&this.upBody) {
                    obj1 = {
                        filePath: this.setSignObj.json.filePath,
                        filePath1: this.setSignObj.json.filePath1,
                        filePath2: this.tempF1,
                        filePath3: this.tempF,
                    }
                }
                if (this.upBanner&&!this.upBody) {
                     obj1 = {
                        filePath: this.setSignObj.json.filePath,
                        filePath1: this.setSignObj.json.filePath1,
                        filePath2: this.setSignObj.json.filePath,
                        filePath3: this.tempF1,
                    }
                }
                if (!this.upBanner&&this.upBody) {
                    obj1 = {
                        filePath: this.setSignObj.json.filePath,
                        filePath1: this.setSignObj.json.filePath1,
                        filePath2: this.tempF,
                        filePath3: this.setSignObj.json.filePath1,
                    }
                }
            } else {
                if (this.upBanner&&this.upBody) {
                    obj1 = {
                        filePath1: this.tempF1,
                        filePath: this.tempF,
                        filePath2: '',
                        filePath3: '',
                    }
                }
                if (this.upBanner&&!this.upBody) {
                    obj1 = {
                        filePath1: this.tempF1,
                        filePath: this.setSignObj.json.filePath,
                        filePath2: '',
                        filePath3: '',
                    }
                }
                if (!this.upBanner&&this.upBody) {
                    obj1 = {
                        filePath1: this.setSignObj.json.filePath1,
                        filePath: this.tempF,
                        filePath2: '',
                        filePath3: '',
                    }
                }
            }
            obj.append('json', JSON.stringify(obj1))
            obj.append('type', 'spread')
            obj.append('id', this.setSignObj.id||'')
            obj.append('appId', this.publicInfo.id)
            publicAction.saveSeting(obj).then(valid.call(this)).then(res=>{
                if (res.ok) {
                    this.setSignObj.id = res.data.data
                    // this.upBody = this.upBanner = false
                    this.expandUrl = `http://ewechattest.ivygate.cn/index.html?router=expanderSignUp&appid=${this.publicInfo.id}&menuType=spread`
                    if (!this.isSM) {
                        this.modFile = ''
                        this.tempF = ''
                        this.tempF1 = ''
                        this.uploadList = ''
                        this.uploadList1 = ''
                        this.$Message.info(res.data.message)
                    } else {
                        this.modal3 = true
                        this.isSM = false
                    }
                    
                }
            }).catch(errors.call(this)).finally( () => { 
                this.updateLoadingStatus({
                    isLoading: false
                });
            });
        },

        onPageChange(val) {
            this.pageNo = val
            this.getdataList()
        },
        
        selectChange(val) {
            if (val instanceof Array) {
                this.massObjId = ''
                val.forEach(item => {
                    this.massObjId += item.value + ','
                })
            } else {
                this.massObjId = val.value
            } 
        },

        selectChangePreview(val) {
            this.massObjIdPre = val.value
        },

        upChoose() {
            this.$refs.inputFile.click()
        },

        ok() {
            if (!this.massObjIdPre) {
                this.$refs.preview.visible = true
                this.modal1 = true
                this.$Message.info('选择人员')
                return
            }
            if (!this.materialId) {
                this.$Message.info('请选择素材')
                return
            }
            let obj = {
                appId: this.publicInfo.id,
                sendType: 'openid',
                msgType: this.autoTypeAuto,
                materialId: this.materialId,
                sendOpends: this.massObjIdPre,
                isPreview: 1,
            }
            this.mass(obj)
        },

        addNews() {
            this.$router.push({
                name: 'publicAction.addAutoReturn',
                query: {
                    type: this.num
                }
            })
        },

        handleBeforeUpload(file) {
            if (this.tabValue == 4) {
                return true
            } else {

                // if (!allowHeight) {
                //     return false
                // }

                let arr = ['jpg','jpeg','png','gif']
                let type = file.type ? file.type.split('/')[1]:''
                if (!type) {
                    this.$Message.error("需使用'jpg','jpeg','png','gif'格式")
                    return
                }
                if (!arr.includes(type)) {
                    this.$Message.error("需使用'jpg','jpeg','png','gif'格式")
                    return
                }
                let reader = new FileReader();
               
                // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
                // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
                // 读取文件作为 URL 可访问地址
                reader.readAsDataURL(file);
                const _this = this;
                reader.onloadend = function(e) {
                    if (_this.tabValue == 4) {
                        _this.inviteForm.uploadFile = reader.result;
                    } else if (_this.tabValue == 5) {
                        var image = new Image();
                        image.style.display = 'none'
                        image.src = e.target.result;
                        image.onload = function () {
                            var height = this.height/this.width == 576/1080;
                            if (_this.tempV == 'banner') {
                                if (height) {
                                    _this.inviteForm.uploadFile6 = reader.result;
                                    _this.copyFile(file)
                                } else {
                                    _this.$Message.error('请上传1080/576尺寸图片')
                                }
                            } else {
                                _this.inviteForm.uploadFile5 = reader.result;
                                _this.copyFile(file)
                            }
                        };
                    }
                };
                // this.isUploadImg = true;
                // 返回 falsa 停止自动上传 我们需要手动上传
                return  false
            }
        },

        copyFile(file) {
            if (this.tempV == 'body') {
                    this.upBody = true
                    this.uploadList = file;
                } else {
                    this.upBanner = true
                    this.uploadList1 = file
                }
        },
        // 检查宽高
        checkedImgWidthHeight(file,whenReady){
           var reader = new FileReader;
           reader.onload = function (evt) {
               var image = new Image();
               image.onload = function () {
                   var width = this.width;
                   var height = this.height;
                  //待加载完成后，再回调；
                   if (whenReady) whenReady(width, height);
               };
            //    image.src = evt.target.result;
           };
           reader.readAsDataURL(file);
  },

        handleSuccess(data) {
            if(data.status == "success") {
                // this.getUrl(data.data.filePath)
                
                if (this.tabValue == 4) {
                    this.or = true
                    this.originFile = data.data.filePath
                    this.saveSeting()
                }
                if (this.tabValue == 5) {
                    this.saveSign(data.data)
                }
                this.$Message.info('上传成功了')
            } else {
                this.updateLoadingStatus({
                    isLoading: false
                });
                this.isSM = false;
                this.$Message.error(data.message);
            }
        },
        handleSuccess1(data) {
            if(data.status == "success") {
                if (this.tabValue == 5) {
                    this.saveSign1(data.data)
                }
                this.$Message.info('上传成功了')
            } else {
                this.isSM = false
                this.updateLoadingStatus({
                    isLoading: false
                });
                this.$Message.error(data.message);
            }
        },


        handleFormatError() {
            // this.$Message.error("需使用'jpg','jpeg','png','gif'格式");
        },

        handleMaxSize() {
            this.$Message.error("图片不得大于4M");
        },
        
        issureFlie(type1=false) {
            if (this.tabValue == 4) {
                this.qrPageUp()
                return
            }
            if (type1 == true ) {
                if (!this.upBanner&&!this.upBody&&this.setSignObj.json.filePath1&&this.setSignObj.json.filePath) { // 没传新图 并且有默认图
                    this.qrcodes1(true)
                    return
                }
            }
            this.qrcodes1()
            if (!this.uploadList1&&!this.setSignObj.json.filePath1) {
                this.$Message.error('请选择banner图')
                return
            }
            if (!this.uploadList&&!this.setSignObj.json.filePath) {
                this.$Message.error('请选择推广图片')
                return
            }
            if (!this.uploadList&&!this.uploadList1) {
                this.$Message.info('发布成功')
                return
            }
            this.updateLoadingStatus({
                    isLoading: true
                });
           
            if (this.uploadList)  this.$refs.upload.post(this.uploadList);
            if (this.uploadList1) this.$refs.upload1.post(this.uploadList1);
            
        },
        
        qrPageUp() {
            // if (this.chooseNewFileOk&&this.chooseNewFile) { // 没换图片只是换了位置
                // this.uploadKeepFile()
                // return
            // }
            if (this.modFile) {
                this.$refs.upload.post(this.modFile);
            }
            this.uploadKeepFile()
        },
        
        cancel() {

        },

        CopyUrl() {
            if (this.wxUrl||this.expandUrl) {
                if(this.tabValue == 4)  this.cop(this.wxUrl)
                if(this.tabValue == 5)  this.cop(this.expandUrl)
            } else {
                this.$Message.error('复制失败')
            }
        },

        cop(val) {
            const input = document.createElement('input')
            document.body.appendChild(input)
            input.setAttribute('value', val)
            input.select()
            if (document.execCommand('copy')) {
                document.execCommand('copy')
                this.$Message.info( '复制成功!')
            } else {
                this.$Message.error('复制失败')
            }
            document.body.removeChild(input)
        },

        cancelChoose() {

        },

        addImgCancel() {},

        addImgOk() {
            // this.chooseNewFileOk = true
            // this.chooseNewFile = true
            this.hmltToCanvas()
        },

        okChoose() {
            this.$refs.fodderModel.clearData()
            this.materialId = ''
            this.isChoose = true
            this.isUpfile = false
        },

        /**
         * 二维码
         */

        chooseFile() {
            this.addImg = true
        },
        /*
        * 默认位置
        */
        onclickToResetQrPosi() {
            this.lefts = this.tempLefts;
            this.tops = this.tempTops;
        },

        uploadImgChange(data) {
            const imgContent = document.getElementById('imgContent'); // img container
            const qrcode = document.getElementById('qrcode'); // qrcode
            const file = data.target.files[0];
            if (file) {
                // qrcode.innerHTML = '';
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
            // this.chooseNewFile = true
            this.modFile = file;
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
                    _this.isShowER = true
                    // _this.qrcodes();
                    _this.dragDrop();
                };
            };
        },
        // 绘制二维码
        qrcodes() {
            this.qrcode = new QRCode('qrcode',{
                width: 60, // 设置宽度，单位像素
                height: 60, // 设置高度，单位像素
                text: this.getedInfo.qrUrl || this.json.qrUrl   // 设置二维码内容或跳转地址
            });
        },
        // 绘制二维码
        qrcodes1(val=false) {
            let obj = {
                width: 150, // 设置宽度，单位像素
                height: 150, // 设置高度，单位像素
                text: `http://ewechattest.ivygate.cn/index.html?router=expanderSignUp/#/expanderSignUp?isPreview=true` // 设置二维码内容或跳转地址
            }
            if (val) {
                obj.text = `http://ewechattest.ivygate.cn/index.html?router=expanderSignUp/#/expanderSignUp?isSubmit=true` // 设置二维码内容或跳转地址
                this.modal3 = true
            }
            this.qrcode = new QRCode('qrcode1', obj);
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
            this.updateLoadingStatus({isLoading: true});
            const _this = this;
            const imgContent = document.getElementById('imgContent');
            html2canvas(imgContent, {
                scale: 2,
                useCORS: true,
            }).then(function(canvas) {
                _this.lastImage = canvas.toDataURL("image/jpeg")
                _this.updateLoadingStatus({isLoading: false});
            });
        },

        cancelSM() {
        },

        okSM() {
        },

        /**
         * 设置关注引导页 上传(转blob)
         * 
         */
        getBlobBydataURI(dataURI,type) { 
            let binary = atob(dataURI.split(',')[1]); 
            let array = []; 
            for(var i = 0; i < binary.length; i++) { 
                array.push(binary.charCodeAt(i)); 
            } 
            return new Blob([new Uint8Array(array)], {type:type });
        },

        uploadKeepFile(path,theFormFile) {
            if (!this.lastImage) {
                this.$Message.error('请选择文件')
                return
            }
            const _this = this
            let $Blob= this.getBlobBydataURI(this.lastImage,'image/png'); 
            var fd = new FormData();
            this.updateLoadingStatus({
                isLoading: true
            });
            fd.append("files", $Blob ,"file_"+Date.parse(new Date())+".png");
            fd.append("type", 'wp_inviting_page_image');
            fd.append("dirName", 'all');
            fd.append("meunId", '1001');
            var url = this.uploadFileUrl;//接口
            url = url ? url : '';
            var XHR = null;
            if (window.XMLHttpRequest) {
                // 非IE内核
                XHR = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // IE内核，这里早期IE版本不同，具体可以查下
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                XHR = null;
            }
            if (XHR) {
                XHR.open("POST", url);
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 && XHR.status == 200) {
                        var resultValue = XHR.responseText;
                        var data = JSON.parse(resultValue);
                        XHR = null;
                        _this.qr = true
                        _this.qRfilePath = data.data.filePath
                        _this.saveSeting()
                    } else {
                        _this.updateLoadingStatus({
                            isLoading: false
                        });
                    }
                }
                XHR.send(fd);
            }
        },

        proviewForm() {
            this.isSM = true
            document.getElementById('qrcode1').innerHTML = ''
            this.issureFlie(true)
        }
    },
}
</script>