<style lang='less'>
    .show-fodder-gsx {
        .choose-fodder {
            width: 240px;
            background-color: #f8f8f8;
            min-height: 95px;
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
            .fooder-previe {
                position: relative;
                text-align: center;
                .aro {
                    padding: 20px;
                    .docContent {
                        width: 214px;
                        font-size: 14px;
                        margin: 10px 2px 11px;
                        overflow: hidden;
                        .pic{
                            width:42px;
                            height: 100%;
                            float: left;
                            .word{
                                font-size: 42px;
                                color: #bd4455;
                                line-height: 52px;
                            }
                            .ppt{
                                font-size: 42px;
                                line-height: 52px;
                                color: #ea6c44;
                            }
                            .excel{
                                font-size: 42px;
                                line-height: 52px;
                                color: #4372bd;
                            }
                            .pdf{
                                font-size: 42px;
                                line-height: 52px;
                                color: #45ba48;
                            }
                            .png{
                                font-size: 42px;
                                line-height: 52px;
                                color: #fbb721;
                            }
                        }
                        .docInfo{
                            width: 158px;
                            float: left;
                            margin:7px; 
                            .docName{
                                white-space:nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden; 
                            }
                            .docSize{
                                color:#a0a0a0;
                            }
                        }
                    }
                    .audioResourceInfo {
                        border-radius: 8px;
                        border: 1px solid #f0f2fa;
                        color: #a0a0a0;
                        overflow: hidden;
                        .audioIcon {
                            margin-left: 10px;
                            float: left;
                            height: 40px;
                            line-height: 40px;
                        }
                        .second {
                            float: right;
                            margin-right: 10px;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                }
                
                .fodder-title {
                    word-wrap:break-word;
                    text-align: left;
                    line-height: 1;
                    padding: 10px 0 10px 40px;
                    position: relative; 
                    .tit {
                        position: absolute;
                        left: 5px;
                        top: 10px;
                    }
                }
                .img {
                    height: 90px;
                    max-width: 240px;
                }
                .resourceFont {
                    padding-left: 7px;
                    position: absolute;
                    bottom:0;
                    left: 0;
                    height:30px;
                    line-height: 30px;
                    background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,40%) 100%);
                    width: 100%;
                    color: #fff;
                    text-align: left;
                    font-size: 16px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
            }
            .sub {
                position: relative;
                line-height: 58px;
                padding-left: 15px;
                height: 58px;
                .sub-title {
                    position: absolute;
                    width: 38px;
                    height: 38px;
                    right: 0;
                    top: 10px;
                }
                
            }
        }
        .cont-text {
            font-size: 14px;
            line-height: 80px;
            margin: 5px 10px 8px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #fff;
        }
    }
</style>
<template>
    <div class="show-fodder-gsx">
        <div v-if="!fodderObj.content" class="choose-fodder">
            <i  class="icon-icon-test1 iconfont fodder-font"></i>
            <div class="fooder-previe">
                <div ref="previewAro">
                    <img :src="fodderObj.list[0].coverUrl" alt="" class="img" v-if="!fodderObj.voiceTime&&fodderObj.list[0].coverUrl">
                    <div class="aro" v-else>
                        <div class="docContent" v-if="fodderObj.type!='voice'">
                            <div class="pic">
                                <i class="iconfont"  :class="{
                                'icon-word word': fodderObj.title.toLowerCase().endsWith('doc') || fodderObj.title.toLowerCase().endsWith('docx'),
                                'icon-x excel': fodderObj.title.toLowerCase().endsWith('xls') || fodderObj.title.toLowerCase().endsWith('xlsx'),
                                'icon-ppt ppt': fodderObj.title.toLowerCase().endsWith('ppt') || fodderObj.title.toLowerCase().endsWith('pptx'),
                                'icon-pdf pdf': fodderObj.title.toLowerCase().endsWith('pdf'),
                                }"></i>
                            </div>
                            <div class="docInfo">
                                <div class="docName">{{fodderObj.title}}</div>
                                <div class="docSize" v-if="fodderObj.fileSize">{{fodderObj.fileSize}}M</div>
                            </div>
                        </div>
                        <div class="audioResourceInfo" v-else>
                            <span class="audioIcon"><i class="iconfont icon-yuyin1-copy"></i></span><span class="second">{{fodderObj.voiceTime | timeFilter}}</span>
                        </div>
                    </div>
                </div>
                <span class="resourceFont" v-if="!fodderObj.list[0].isImg&&fodderObj.list[0].title">{{fodderObj.list[0].title}}</span>
                <p class="fodder-title" v-if="fodderObj.list[0].isImg"><span class="tit">标题：</span> {{fodderObj.list[0].title}}</p>
            </div>                       
            <p v-for="(item, index) in fodderObj.list" :key="index" class="sub" v-if="index>0">
                <span >{{item.title}}</span>
                <img :src="item.coverUrl" alt="" class="sub-title">
            </p>
        </div>
        <div v-else>
            <div class="cont-text" v-html="fodderObj.content"></div>
        </div>
        <Modal
            v-model="modal2"
            title="选择素材"
            width=800
            ref="preview"
            @on-ok="okFodder"
            @on-cancel="cancelFodder">
            <div style="position:relative;padding-top:50px">
                <v-select 
                    style="width: 294px;margin: 15px 0 32px;position:absolute;top:0;left:0"
                    placeholder="搜索素材标题"
                    :datafunc="datafunc"
                    icon="search" 
                    v-model="compact"
                    k='cnname'
                    @on-enter="textChange" 
                    @on-click="textChange" 
                    @selected="textChange">
                </v-select>
                <div class="content-mass-showFodder-gsx" style="height:500px;overflow-y:scroll">
                    <resource-c
                        :tabValue='num1'
                        :items1='items1'
                        :items2='items2'
                        :items3='items3'
                        :items4='items4'
                        :items5='items5'
                        :items6='items6'
                        itemWidth='220'
                        @currentInfo='currentInfo'
                        from='mass'
                        :isShowPreview="false"
                    ></resource-c>
                    <div style=" margin-top: 20px;text-align: center;">
                        <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChangeFodder"  :current="pageNo" :total="count" @on-change="onPageChangeFodder" v-if="count>10"></Page>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import resourceC from '../../modules/resourceC.vue'
import vSelect from '@public/modules/vSelect'
import valid, { errors, common, sys, wpMaterialText, wpMaterialImage, wpMaterialDoc, wpMaterialFile, wpMaterialNews} from "../../libs/request";

export default {
    props: {
        num1: {
            type: [String, Number],
            default: 1,
        },
        id: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            compact: '',
            modal2: false,
            tempObj: {},
            items1: [],
            items2: [],
            items3: [],
            items4: [],
            items5: [],
            items6: [],
            count: '',
            tempNum: '',
            pageSize: 10,
            pageNo: 1,
            fodderObj: {
                voiceTime: '',
                content: '',
                title: '',
                fileSize: '',
                list: [{coverUrl: '', title: ''}]
            },
        }
    },

    components: {
        resourceC,
        vSelect
    },

    mounted() {
        if (this.id!='') this.getForm()
    },

    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getForm() {
            let data = {
                id: this.id
            }
            let type 
            switch (this.num1) {
                case 1: type = wpMaterialNews; break;
                case 2: type = wpMaterialImage; break;
                case 3: type = wpMaterialFile; break;
                case 4: type = wpMaterialFile; break;
                case 5: type = wpMaterialText; break;
            }
            if (type == wpMaterialNews) {
                type.detail(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.currentInfo(res.data.data, true)
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            } else {
                type.form(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.currentInfo(res.data.data, true)
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            
        },
        doResult(result){
            result.then(valid.call(this)).then(res => {
                if(res.ok) {
                    let result = res.data.data
                    this['items' + this.num1] = result.list
                    this.currentInfo(result.list[0])
                    this.count = result.count
                    this.modal2 = true
                }
            }).catch(errors.call(this)).finally(() => {
                this.updateLoadingStatus({isLoading:false}); 
            });
        },
        
        getListPage(){
            if (this.tempNum == this.num1) {
                this.modal2 = true
                return
            }
            this.tempNum = this.num1
            this.tempF()
        },

        currentInfo(item, isAdd=false) {
            if (item.list) {
                this.tempObj = item
                this.fodderObj = item
                return
            }
            item.list = [{
                title: item.title,
                id: item.id,
                isImg: true,
            }]
            if (this.num1 == 4) {
                item.list[0].coverUrl = item.imageUrl
            } else {
                item.list[0].coverUrl = item.coverUrl
            }
            if (isAdd) {
                this.fodderObj = item
            } else {
                this.tempObj = item
            }
           
        },

        tempF() {
            this.updateLoadingStatus({isLoading:true});
            let data = {
                keyword: this.compact,
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
            if(this.num1 == 1){
                this.doResult(wpMaterialNews.listPage(data))
            }   
            if(this.num1 == 2){
                this.doResult(wpMaterialImage.listPage(data))
            }   
            if(this.num1 == 3){
                data.type = 'voice'
                this.doResult(wpMaterialFile.listPage(data))
            }   
            if(this.num1 == 4){
                data.type = 'video'
                this.doResult(wpMaterialFile.listPage(data))
            }   
            if(this.num1 == 5){
                this.doResult(wpMaterialText.listPage(data))
            }   
            if(this.num1 == 6){
                this.doResult(wpMaterialDoc.listPage(data))
            }   
        },

        onPageSizeChangeFodder(val) {
            this.pageSize = val
            this.tempF()
        },

        onPageChangeFodder(val) {
            this.pageNo = val
            this.tempF()
        },

        datafunc() {
            return new Promise((resole, reject) => {

            })
        },
        
        textChange() {
            this.tempF()
        },

        okFodder() {
            this.fodderObj = this.tempObj
            this.$emit('fodderInfo', this.tempObj)
        },

        cancelFodder() {
        },

        clearFodder() {
            // this.fodderObj = {
            //     voiceTime: '',
            //     content: '<i class="icon-icon-test1 iconfont fodder-font"></i>',
            //     title: '',
            //     fileSize: '',
            //     list: [{coverUrl: '', title: ''}]
            // };
        },
    },

    filters:{
        timeFilter(value){
            let time = parseInt(value)
            let str = ''
            if(time && time > 0){
                if(time > 59) {
                    str = parseInt(time/60) + '′' + time%60 + '″'
                } else {
                    str = time + '″'
                }
            }
            return str
        }
    }
}
</script>

