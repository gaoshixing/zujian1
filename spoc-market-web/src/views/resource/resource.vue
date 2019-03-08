<style lang="less">
.marketResource{
    border-top: none !important;
    .viewContentWithPhone{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.7);
        z-index: 100;
        .phoneViewDetailP{
            z-index: 99999;
        }
        .phone{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width:270px;
            height:512px;
            background-color: #f0f2fa;
            .viewPhoneHead{
                height:46px;
                position:relative;
                .viewPhoneBack{
                    position: absolute;
                    top: 21px;
                    left: 6px;
                    width: 48px;
                    height: 20px;
                    cursor: pointer;
                }
                img{
                    width:270px;
                    height: 46px;
                }
            }
            .viewPhoneBody{
                overflow-y: scroll;
                height: 466px;
                padding:10px;
                word-break: break-all;
            }
            .closePhone{
                position: absolute;
                top: 2px;
                right: -20px;
                cursor: pointer;
                color: #fff;
                &:hover{
                    color: #fff;
                }
                >i{
                    font-size: 12px;
                }
            }
            .closePhoneLeft{
                left: 4px;
            }
            .docContent{
                height: 52px;
                width: 214px;
                font-size: 14px;
                line-height: 21px;
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
        }
    }
    .search{
        position: relative;
        .buttons{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
   /*  .my-box{
      width: 200px;
      background: #000;
      margin-bottom: 20px;
      color: #fff;
    } */
    .page{
        margin-top: 20px;
        text-align: center;
    }
    .resourceItem{
        font-size: 12px;
        margin: 20px 4px 20px 0;
        width:238px;
        padding-top: 10px;
        box-shadow: 0 0 15px rgba(68,188,183,.2);
        border-radius:8px;
        .marginLR10{
            margin-left: 10px;
            margin-right: 10px;
            .resourceInfo{
                border-radius:8px;
                border: 1px solid #f0f2fa;
                .resourceImgFont{
                    position: relative;
                    text-align: center;
                    border-top-left-radius:8px;
                    border-top-right-radius:8px;
                    border-bottom: 1px solid #f0f2fa;
                    .resourceImg{
                        margin: 0 auto;
                        height:90px;
                        max-width: 213px;
                        display: block;
                    }
                    .resourceFont{
                        overflow: hidden;
                        padding-left: 7px;
                        position: absolute;
                        bottom:0;
                        height:30px;
                        line-height: 30px;
                        background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,40%) 100%);
                        width: 100%;
                        //opacity: 0.8;
                        color: #fff;
                        text-align: left;
                        font-size: 14px;
                    }
                }
                .title{
                    margin-left: 10px; 
                    height: 58px;
                    overflow: hidden;
                    .titleFont{
                        float: left;
                        line-height: 58px;
                        height: 58px;
                        width: 146px;
                    }
                    .moreTitle{
                        border-top: 1px solid #f0f2fa;
                    }
                    .titleImg{
                        margin: 10px;
                        float: left;
                        width: 38px;
                        height: 38px;
                        background-color: aqua;
                        >img{
                            width: 38px;
                            height: 38px;
                        }
                    }
                }
            }
            .audioResourceInfo{
                border-radius:8px;
                border: 1px solid #f0f2fa;
                color: #a0a0a0;
                overflow: hidden;
                .audioIcon{
                    margin-left: 10px;
                    float: left;
                    height: 40px;
                    line-height: 40px;
                }
                .second{
                   float: right; 
                   margin-right: 10px;
                   height: 40px;
                   line-height: 40px;
                }
            }
            .textResourceInfo{
                border-top: 1px solid #f0f2fa;
                border-bottom: 1px solid #f0f2fa;
                .textContent{
                    height: 85px;
                    width: 200px;
                    font-size: 14px;
                    line-height: 21px;
                    margin: 5px 10px 8px;
                    /* white-space:nowrap;
                    text-overflow: ellipsis; */
                    overflow: hidden; 
                }
            }
            .docResourceInfo{
                border-top: 1px solid #f0f2fa;
                border-bottom: 1px solid #f0f2fa;
                .docContent{
                    height: 52px;
                    width: 214px;
                    font-size: 14px;
                    line-height: 21px;
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
            }
            .author{
                margin-top: 14px;
                height: 25px;
                line-height: 25px;
            }
            .createTime{
                color: #a0a0a0;
                height: 30px;
                line-height: 30px;
            }
        }
        .resourceButton{
            line-height: 40px;
            height: 40px;
            border-top:1px solid #f0f2fa; 
            .oneButton{
                display: inline-block;
                width: 100%;
                text-align:center;
                &:hover{
                    cursor: pointer;
                    color: aquamarine;
                }
            }
            .twoButton{
                display: inline-block;
                width: 50%;
                text-align:center;
                &:hover{
                    cursor: pointer;
                    color: aquamarine;
                }
            }
            .buttonBorderL{
                border-left:1px solid #f0f2fa; 
            }
        }
    }
}

</style>
<template>
<div class="marketResource">
    <audio style="display:none;" src="" id="myAudio">
    </audio>
    <div class="viewContentWithPhone" v-show="showPhone">
        <div class="phone">
            <div class="closePhone" @click="closePhone">
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="viewPhoneHead">
                <img src="../../assets/images/viewDetailHead.png">
                <div @click="closePhone" class="viewPhoneBack">
                </div>
            </div>
            <div v-if="tabValue == 1" class="viewPhoneBody">
                <div class="resourceItem" style="margin:0 auto;background-color:#fff;padding-bottom:7px;">
                    <div class="marginLR10">
                        <div class="resourceInfo">
                            <div class="resourceImgFont"  @click="toShowPhoneViewDetail(itemChild)" v-for="(itemChild,indexChild) in viewContent" v-if="indexChild == 0"  :key="indexChild+itemChild.title">
                                <img class="resourceImg" :src="itemChild.coverUrl">
                                <div class="resourceFont">{{itemChild.title}}</div>
                            </div>
                            <div class="titles">
                                <div class="title" @click="toShowPhoneViewDetail(itemChild)" v-for="(itemChild,indexChild) in viewContent" v-if="indexChild != 0"  :key="indexChild+itemChild.title">
                                    <div class="titleFont" :class="{moreTitle:indexChild > 1}"><p>{{itemChild.title}}</p></div>
                                    <div class="titleImg">
                                        <img :src="itemChild.coverUrl">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="tabValue == 2" class="viewPhoneBody">
                <img style="max-width: 244px;" :src="viewContent">
            </div>
            <div v-if="tabValue == 3" class="viewPhoneBody"><div :style="{
                    background: '#44bcb7',
                    height: '30px',
                    width:'60px',
                    'border-radius': '4px',
                    'margin-right': '8px',
                    display: 'inline-block',
                    float: 'left',
                    cursor:'pointer',
                    'padding-top': '4px'
                }" @click="playAudio"><i class="iconfont icon-yuyin1-copy" style="color:#fff;"></i></div><div style="float: left;padding-top: 5px;">{{viewContent | timeFilter}}</div></div>
            <div v-if="tabValue == 4" class="viewPhoneBody"><img style="max-width: 244px;cursor:pointer;" v-show="!showVideo" @click="playVideo" :src="viewContent.imageUrl"><video v-show="showVideo" height="205" width="244" id="myVideo"></video></div>
            <div v-if="tabValue == 5" class="viewPhoneBody" style="word-wrap: break-word;">{{viewContent}}</div>
            <div v-if="tabValue == 6" class="docContent viewPhoneBody">
                <div class="pic">
                    <i class="iconfont"  :class="{
                    'icon-word word': viewContent.toLowerCase().endsWith('doc') || viewContent.toLowerCase().endsWith('docx'),
                    'icon-x excel': viewContent.toLowerCase().endsWith('xls') || viewContent.toLowerCase().endsWith('xlsx'),
                    'icon-ppt ppt': viewContent.toLowerCase().endsWith('ppt') || viewContent.toLowerCase().endsWith('pptx'),
                    'icon-pdf pdf': viewContent.toLowerCase().endsWith('pdf'),
                    }"></i>
                </div>
                <div class="docInfo">
                    <div class="docName">{{viewContent}}</div>
                    <!-- <div class="docSize">22XXXM</div> -->
                </div>
            </div>
        </div>
        <!-- 预览图文详情的详情 -->
        <div class="phone phoneViewDetail" v-show="showPhoneViewDetail">
            <div class="closePhone" @click="closePhone">
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="viewPhoneHead">
                <img src="../../assets/images/viewDetailHead.png">
                <div @click="closePhoneViewDetail" class="viewPhoneBack">
                </div>
            </div>
            <div v-if="tabValue == 1" class="viewPhoneBody">
                <div style="text-align:center;font-size:14px;font-weight: bold;margin:10px 0;">{{childItemDetail.title}}</div>
                <div style="text-indent: 2em;margin-bottom:10px;">{{childItemDetail.intro}}</div>
                <div v-html="childItemDetail.content"></div>
            </div>
        </div>
    </div>
    <Tabs @on-click="toggleSatus" v-model="tabValue">
        <TabPane label="图文素材" name="1"></TabPane>
        <TabPane label="图片素材" name="2"></TabPane>
        <TabPane label="语音素材" name="3"></TabPane>
        <TabPane label="视频素材" name="4"></TabPane>
        <TabPane label="文本素材" name="5"></TabPane>
        <TabPane label="文档素材" name="6"></TabPane>
    </Tabs>
    <div class="search">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="搜索素材名称"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <div class="buttons">
            <Button type="primary" @click="download">一键下载微信素材到本地</Button>
            <Button type="primary" @click="addResource">新增</Button>
        </div>
    </div>
    <div class="resources" id="app">
        <!-- 图文素材 -->
        <!-- <div v-if="tabValue == 1 && items1.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items1" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="resourceInfo">
                                        <div class="resourceImgFont" v-for="(itemChild,indexChild) in item.list" v-if="indexChild == 0"  :key="indexChild+itemChild.title">
                                            <img class="resourceImg" :src="itemChild.coverUrl">
                                            <div class="resourceFont">{{itemChild.title}}</div>
                                        </div>
                                        <div class="titles">
                                            <div class="title" v-for="(itemChild,indexChild) in item.list" v-if="indexChild != 0"  :key="indexChild+itemChild.title">
                                                <div class="titleFont" :class="{moreTitle:indexChild > 1}"><p>{{itemChild.title}}</p></div>
                                                <div class="titleImg">
                                                    <img :src="itemChild.coverUrl">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="author">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.list)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.list)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.list)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <!-- 图片素材 -->
        <!-- <div v-if="tabValue == 2 && items2.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items2" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="resourceInfo">
                                        <div class="resourceImgFont">
                                            <img class="resourceImg" :src="item.coverUrl">
                                        </div>
                                    </div>
                                    <div class="author">标题：{{item.title}}</div>
                                    <div class="createTime">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.coverUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.coverUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.coverUrl)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <!-- 语音素材 -->
        <!-- <div v-if="tabValue == 3  && items3.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items3" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="audioResourceInfo">
                                        <span class="audioIcon"><i class="iconfont icon-yuyin1-copy"></i></span><span class="second">{{item.voiceTime | timeFilter}}</span>
                                    </div>
                                    <div class="author">标题：{{item.title}}</div>
                                    <div class="createTime">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.voiceTime)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.voiceTime)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.voiceTime)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <!-- 视频素材-->
        <!-- <div v-if="tabValue == 4  && items4.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items4" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="resourceInfo">
                                        <div class="resourceImgFont">
                                            <img class="resourceImg" :src="item.imageUrl">
                                        </div>
                                    </div>
                                    <div class="author">标题：{{item.title}}</div>
                                    <div class="createTime">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.imageUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.imageUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.imageUrl)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <!-- 文本素材 -->
        <!-- <div v-if="tabValue == 5 && items5.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items5" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="textResourceInfo">
                                        <div class="textContent">
                                            {{item.content}}
                                        </div>
                                    </div>
                                    <div class="author">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.content)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.content)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.content)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <!-- 文档素材 -->
        <!-- <div v-if="tabValue == 6 && items6.length">
            <w-f-column itemW="238" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items6" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem">
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="docResourceInfo">
                                        <div class="docContent">
                                            <div class="pic">
                                                <i class="iconfont"  :class="{
                                                'icon-word word': item.title.toLowerCase().endsWith('doc') || item.title.toLowerCase().endsWith('docx'),
                                                'icon-x excel': item.title.toLowerCase().endsWith('xls') || item.title.toLowerCase().endsWith('xlsx'),
                                                'icon-ppt ppt': item.title.toLowerCase().endsWith('ppt') || item.title.toLowerCase().endsWith('pptx'),
                                                'icon-pdf pdf': item.title.toLowerCase().endsWith('pdf'),
                                                }"></i>
                                            </div>
                                            <div class="docInfo">
                                                <div class="docName">{{item.title}}</div>
                                                <div class="docSize">{{item.fileSize}}M</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="author">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.title)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.title)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.title)">预览</span></div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div> -->
        <resource-c
            @viewDetail="viewDetail"
            @editDetail="editDetail"
            ref="myColumns"
            :tabValue='tabValue'
            :items1='items1'
            :items2='items2'
            :items3='items3'
            :items4='items4'
            :items5='items5'
            :items6='items6'
            :itemWidth='itemWidth'
        ></resource-c>
      <!--   <div class="page">
            <Page 
                show-total 
                show-elevator 
                show-sizer 
                :page-size="pageSize" 
                :current="pageNo" 
                :total="count" 
                @on-change="changePageNo" 
                @on-page-size-change="changePageSize">
            </Page>
        </div> -->
        <Modal
            v-model="showDownload"
            title="选择微信公众号"
            width="300"
            @on-ok="ok"
            @on-cancel="cancel">
            <RadioGroup v-model="weChatId" vertical>
                <Radio :label="item.id" v-for="(item,index) in weChatList" :key="index">
                    <span>{{item.publicName}}</span>
                </Radio>
            </RadioGroup>
        </Modal>
    </div>
</div>
</template>
<script>
    const routerMap = {
        '1': 'market.addWeChatR',
        '2': 'market.addImgR',
        '3': 'market.addFileR',
        '4': 'market.addFileR',
        '5': 'market.addTextR',
        '6': 'market.addDocR',
    }

    import { mapState, mapGetters, mapMutations } from 'vuex'
    import valid, { errors, common, sys, publicNumM, wpMaterialText, wpMaterialImage, wpMaterialDoc, wpMaterialFile, wpMaterialNews} from "../../libs/request";
    import vSelect from '@public/modules/vSelect'
    // import WFColumn from './WFColumn'
    import resourceC from '../../modules/resourceC.vue'
    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                weChatList:[],
                showVideo: false,
                childItemDetail:{},
                showPhoneViewDetail: false,
                itemWidth: 238,
                weChatId: '',
                showDownload: false,
                showPhone: false,
                viewContent: '',
                tabValue: '1', 
                compact: '', 
                items1: [],
                items2: [],
                items3: [],
                items4: [],
                items5: [],
                items6: [],
                pageSize: 10,
                count:0,
                pageNo:1,
                pageNo1:1,
                pageNo2:1,
                pageNo3:1,
                pageNo4:1,
                pageNo5:1,
                pageNo6:1,
                pageCount:1,
                pageCount1:1,
                pageCount2:1,
                pageCount3:1,
                pageCount4:1,
                pageCount5:1,
                pageCount6:1,
                isBusy: false,
            }
        },
        computed: {
            ...mapState('market',['leftclosed']),
            /* ...mapState(['userInfo']),
            //管理员 总裁  分总 文书主管
		    ...mapGetters('docu',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isEssayLeaser'])     */  
        },
        components: {
            vSelect,
            // WaterFollow, 
            // WFColumn,
            resourceC
        },
        created(){
        
        },
        mounted() {
            if(this.$route.query.type){
                this.tabValue = this.$route.query.type
                //this.pageNo = 1
                this['pageNo' + this.tabValue ] = 1
            }
            this.getListPage()
            this.getWeChatList()
        },
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
            getWeChatList(){
                let obj = {
                    type:'subscribe', // 'service'
                    isShow: 1
                }
                publicNumM.getDataList(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.weChatList = res.data.data
                    }
                }).catch(errors.call(this)).finally(() => {
                });
            },
            toShowPhoneViewDetail(item){
                this.childItemDetail = item
                this.showPhoneViewDetail = true
            },
            closePhoneViewDetail(){
                this.showPhoneViewDetail = false
            },
            changePageNo(val){
                this.pageNo = val
                this.getListPage()
            },
            changePageSize(val){
                this.pageSize = val
                this.getListPage()
            },
            download(){
               this.weChatId = ''
               this.showDownload = true
            },
            ok() {
                console.log(this.weChatId)
            },
            cancel() {},
            closePhone(){
                this.showPhone = false
                this.showPhoneViewDetail = false
                if(this.tabValue == 3){
                    document.getElementById('myAudio').pause()
                }
                if(this.tabValue == 4){
                    this.showVideo = false
                    document.getElementById('myVideo').pause()
                }
            },
            playAudio(){
                document.getElementById('myAudio').play()
            },
            playVideo(){
                this.showVideo = true
                document.getElementById('myVideo').play()
            },
            viewDetail(data){
                this.viewContent = data
                if(this.tabValue == 3){
                    this.viewContent = data.voiceTime
                    document.getElementById('myAudio').src =  data.coverUrl
                }
                if(this.tabValue == 4){
                    this.showVideo = false
                    document.getElementById('myVideo').src =  data.coverUrl
                }
                this.showPhone = true
            },
            editDetail(id, noEdit){
                this.$router.push({
                    name: routerMap[this.tabValue],
                    query:{
                        id,
                        noEdit: noEdit ? true : false,
                        type: this.tabValue
                    }
                }) 
            },
            addResource(){
                this.$router.push({
                    name: routerMap[this.tabValue],
                    query:{
                        type: this.tabValue
                    }
                }) 
            },
            toggleSatus(val) {
                this.compact = ''
                this['items' + this.tabValue] = []
                this['pageNo' + this.tabValue] = 1
                //this.pageNo = 1
                this.getListPage()
            },
            doResult(result){
                result.then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this['items' + this.tabValue] = this['items' + this.tabValue].concat(result.list)
                        //this['items' + this.tabValue] = result.list
                        this['pageCount' + this.tabValue] = result.pageCount
                        this.count = result.count
                        //this.pageCount =  result.pageCount
                        this.isBusy = false
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            getListPage(){
                this.updateLoadingStatus({isLoading:true});
                let data = {
                    keyword: this.compact,
                    pageSize: this.pageSize,
                    pageNo: this['pageNo' + this.tabValue]
                    //pageNo: this.pageNo
                }
                if(this.tabValue == 1){
                    this.doResult(wpMaterialNews.listPage(data))
                }   
                if(this.tabValue == 2){
                    this.doResult(wpMaterialImage.listPage(data))
                }   
                if(this.tabValue == 3){
                    data.type = 'voice'
                    this.doResult(wpMaterialFile.listPage(data))
                }   
                if(this.tabValue == 4){
                    data.type = 'video'
                    this.doResult(wpMaterialFile.listPage(data))
                }   
                if(this.tabValue == 5){
                    this.doResult(wpMaterialText.listPage(data))
                }   
                if(this.tabValue == 6){
                    this.doResult(wpMaterialDoc.listPage(data))
                }   
            },
            textChange() {
                this['items' + this.tabValue] = []
                this['pageNo' + this.tabValue] = 1
                //this.pageNo = 1
                this.getListPage()
            },
            datafunc() {
                return new Promise((resolve, reject) => {});
            },
            addItems: function () {
                if (!this.isBusy && (this['pageNo' + this.tabValue] < this['pageCount' + this.tabValue])) {
                    this.isBusy = true
                    this['pageNo' + this.tabValue]  =  this['pageNo' + this.tabValue] + 1
                    this.getListPage()
                }
               /*  if (!this.isBusy && (this.pageNo < this.pageCount)) {
                    this.isBusy = true
                    this.pageNo  =  this.pageNo + 1
                    this.getListPage()
                } */
            },
        },
        computed:{
            leftclosed:function(newValue, oldValue){
                if(document.getElementsByClassName('content')[0]&&this.$refs.myColumns.$children.length){
                    
                    this.$refs.myColumns.$children[0].$children[this.tabValue].columnNum = Math.floor(document.getElementsByClassName('content')[0].clientWidth / itemWidth)
                }
            }
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