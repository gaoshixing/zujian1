<style lang='less'>
    .resource-c-w {
        width: 100%;
        
        .resourceItem{ 
            cursor: pointer;
            border: 1px solid transparent;
            font-size: 12px;
            margin: 20px 4px 20px 0;
            width:238px;
            padding-top: 10px;
            box-shadow: 0 0 15px rgba(68,188,183,.2);
            border-radius:8px;
            &:hover{
                border: 1px solid #44bcb7;
            }
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
                            max-height:90px;
                            display: block;
                            margin: 0 auto;
                            max-width: 213px;
                        }
                        .resourceFont{
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
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap
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
                            background-color: #dbdfe2;
                            >img{
                                max-width: 38px;
                                max-height: 38px;
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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                        color: #44bcb7;
                    }
                }
                .twoButton{
                    display: inline-block;
                    width: 50%;
                    text-align:center;
                    &:hover{
                        cursor: pointer;
                        color: #44bcb7;
                    }
                }
                .buttonBorderL{
                    border-left:1px solid #f0f2fa; 
                }
            }
        }
        .active {
            border: 1px solid #44bcb7;
        }
    }

</style>
<template>
    <div class="resource-c-w">
        <div v-if="tabValue == 1 && items1.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items1" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num1 && $route.name != 'market.resource'}" @click="clickItem1(item, index)">
                            <!-- <div class="resourceItem"  @click="clickItem1(item, index)"> -->
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
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.list)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.list)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.list)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
        <!-- 图片素材 -->
        <div v-if="tabValue == 2 && items2.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items2" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num2  && $route.name != 'market.resource'}" @click="clickItem2(item, index)">
                            <!-- <div class="resourceItem"  @click="clickItem2(item, index)"> -->
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
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.coverUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.coverUrl)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.coverUrl)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
        <!-- 语音素材 -->
        <div v-if="tabValue == 3  && items3.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items3" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num3  && $route.name != 'market.resource'}" @click="clickItem3(item, index)" >
                            <!-- <div class="resourceItem" @click="clickItem3(item, index)" > -->
                                <div class="marginLR10">
                                    <div>编号:{{item.code}}</div>
                                    <div class="audioResourceInfo">
                                        <span class="audioIcon"><i class="iconfont icon-yuyin1-copy"></i></span><span class="second">{{item.voiceTime | timeFilter}}</span>
                                    </div>
                                    <div class="author">标题：{{item.title}}</div>
                                    <div class="createTime">作者：{{item.companyName +'--'+item.userName}}</div>
                                    <div class="createTime">创建时间：{{item.createDate}}</div>
                                </div>
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
        <!-- 视频素材-->
        <div v-if="tabValue == 4  && items4.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items4" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num4 && $route.name != 'market.resource'}" @click="clickItem4(item, index)">
                            <!-- <div class="resourceItem" @click="clickItem4(item, index)"> -->
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
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
        <!-- 文本素材 -->
        <div v-if="tabValue == 5 && items5.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items5" :columnNum="columnNum" :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num5 && $route.name != 'market.resource'}" @click="clickItem5(item, index)">
                            <!-- <div class="resourceItem"  @click="clickItem5(item, index)"> -->
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
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.content)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.content)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.content)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
        <!-- 文档素材 -->
        <div v-if="tabValue == 6 && items6.length">
            <w-f-column :from='from' :itemW="itemWidth" ref="myColumn">
                <template slot-scope="{columnNum,columnIndex}">
                    <water-follow :list="items6" :columnNum="columnNum"  :columnIndex="columnIndex">
                        <template slot-scope="{item,index}">
                            <div class="resourceItem" :class="{'active': index == num6 && $route.name != 'market.resource'}" @click="clickItem6(item, index)">
                            <!-- <div class="resourceItem"  @click="clickItem6(item, index)"> -->
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
                                <div v-if="isShowPreview">
                                    <div class="resourceButton" v-if="item.isEdit == '2'"><span class="twoButton" @click="viewDetail(item.title)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id,true)">详情</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '1'"><span class="twoButton" @click="viewDetail(item.title)">预览</span><span  class="twoButton buttonBorderL" @click="editDetail(item.id)">编辑</span></div>
                                    <div class="resourceButton" v-if="item.isEdit == '0'"><span class="oneButton" @click="viewDetail(item.title)">预览</span></div>
                                </div>
                            </div>
                        </template>
                    </water-follow>
                </template>
            </w-f-column>
        </div>
    </div>
</template>

<script>
import WaterFollow from './WaterFollow'
import WFColumn from './WFColumn'
export default {
    props: {
        from: {
            default: '',
            type: String,
        },
        isShowPreview: {
            type: Boolean,
            default: true,
        },
        itemWidth: {
            required: true,
            type: [Number, String],
            default: 238,
        },
        tabValue: {
            type: [Number, String],
            default: 1
        },
        items1: {
            type: Array,
            default: () => {
                return []
            }
        },
        items2: {
            type: Array,
            default: () => {
                return []
            }
        },
        items3: {
            type: Array,
            default: () => {
                return []
            }
        },
        items4: {
            type: Array,
            default: () => {
                return []
            }
        },
        items5: {
            type: Array,
            default: () => {
                return []
            }
        },
        items6: {
            type: Array,
            default: () => {
                return []
            }
        },
    },

    data() {
        return {
            num1: -1,
            num2: -1,
            num3: -1,
            num4: -1,
            num5: -1,
            num6: -1,
        }
    },

    components: {
        WaterFollow,
        WFColumn
    },

    methods: {
        clickItem1(item, index) {
            this.num1 = index
            this.$emit('currentInfo', item)
        },
        clickItem2(item, index) {
            this.num2 = index
            this.$emit('currentInfo', item)
        },
        clickItem3(item, index) {
            this.num3 = index
            this.$emit('currentInfo', item)
        },
        clickItem4(item, index) {
            this.num4 = index
            this.$emit('currentInfo', item)
        },
        clickItem5(item, index) {
            this.num5 = index
            this.$emit('currentInfo', item)
        },
        clickItem6(item, index) {
            this.num6 = index
            this.$emit('currentInfo', item)
        },
        viewDetail(data){
            this.$emit('viewDetail',data)
        },
        editDetail(data,flag){
            if(flag){
                this.$emit('editDetail',data,flag)
            } else {
                this.$emit('editDetail',data)
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

