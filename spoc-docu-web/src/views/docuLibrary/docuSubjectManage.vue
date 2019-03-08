<style lang="less">
    .docuSubjectManageGSX {
        .content {
            border-top: 1px solid #e5e5e5;
            padding: 20px 0;
            .title {
                .titleRight {
                    float: right;
                    color: #b8b8b8;
                }
                b {
                    color: #44bcbc;
                    font-size: 18px;
                    font-weight: 400;
                }
            }
            .inform {
                .informUl {
                    li {
                        list-style: none;
                    }
                    cursor: pointer;
                    overflow: hidden;
                    >li {
                        width: 50%;
                        float: left;
                        line-height: 26px;
                        .loadMore {
                            margin-left: 30px;
                        }
                    }
                    .infoLeft {
                        color: #c3c3c3;
                        margin-right: 10px;
                        display: inline-block;
                        width: 90px;
                        text-align: right;
                    }
                    i {
                        color: #44bcbc;
                        font-style: normal;
                    }
                }
            } 
        }
        .loadMoreMess {
            text-align: center;
            margin-bottom: 40px;
            cursor: pointer;
        }
    }
    .addSubjectGSXD {
        .editC {
            position: relative;
            span {
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
</style>

<template>
    <div class="docuSubjectManageGSX">
        <div class="content">
            <div class="title">
                <b>{{data.title}}</b>
                <span class="titleRight">入学季节：
                    <Select v-model="model1" @on-change='seasonChange' style="width:200px">
                        <Option v-for="item in seasonList" :value="item.id" :key="item.value">{{ item.apply_time }}</Option>
                    </Select>
                </span>
            </div>
            <div class="inform">
                <ul class="informUl">
                    <li><span class="infoLeft">申请阶段：</span>{{data.phase == 0 ? '中学' : data.phase == 1 ? '本科': '研究生'}}</li>
                    <li><span class="infoLeft">专业项目：</span><i>{{data.majorName}}</i></li>
                    <li><span class="infoLeft">入学季：</span>{{data.applyTime}}</li>
                    <li><span class="infoLeft">题目数量：</span>{{data.num}}</li>
                    <li v-if="data.docs">
                        <span class="infoLeft">相关文书范本：</span>{{data.docs.length}}
                        <!-- <a class="loadMore" v-if="data.docs.length >= 3" @click="loadMore"> -->
                            <!-- {{isShowLoadMore ? '展开' : '收起'}} -->
                        <!-- </a> -->
                        <ul v-if="data.docs.length <= 3" style="margin-left:50px"> 
                            <li v-for="(data1, index) in data.docs" :key="index">
                                <a>{{data1.NAME}}</a>
                            </li>
                        </ul>
                        <!-- <ul v-if="data.docs&&isShowLoadMore" style="margin-left:50px"> 
                            <li v-for="(data1, index) in data.docs" :key="index">
                                <a>{{data1.NAME}}</a>
                            </li>
                        </ul> -->
                    </li>
                    <li><span class="infoLeft">更新时间：</span>{{data.updateDate}}</li>                    
                </ul>
            </div>
            <p>
                <Button style="margin-left:92px"  v-if="data.docs&&data.docs.length>=3"  @click="loadMoreMess" type="primary">查看更多</Button>
                <Button style="float:right" @click="addList" type="primary">添加文书题目</Button>
            </p>
        </div>
        <docu-subject-manage-list
            :data='data1'
            @handleModule='handleModule'>
        </docu-subject-manage-list>
        <p class="loadMoreMess" v-if="data1.length<count" @click="loadMoreMessList">点击加载更多</p>
        <!-- 弹出窗 -->
        <Modal
            v-model="modal1"
            width=728
            :title="dialogTitle"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="addSubjectGSXD">
                <div v-if="dialogTitle != '删除文书题目'">
                    <div class="editC">
                        <span>文书题目：</span>
                        <div style='margin:0 0 15px 70px'>
                            <Input v-model="name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入文书题目"></Input>
                        </div>
                    </div>
                    <div class="editC" v-for="(item, index) in answer" :key="index">
                        <span>文书解析：</span>
                        <div style='margin:0 0 15px 70px'>
                            <Input ref="textAre" type="textarea" :value='item.answer' :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入文书解析"></Input>
                        </div>
                    </div>
                    <Button style="margin-left:73px" @click="addParse" type="primary">添加解析</Button>
                </div>
                <div v-else>
                    <p style="line-height:50px;font-size:18px;text-align:center">
                        确定删除当前文书么?
                    </p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import docuSubjectManageList from './components/docuSubjectManageList'
import valid, {errors, docuLibrary, sys, common} from '../../libs/request';

export default {
    data() {
        return  {
            count: '',
            isShowLoadMore: false,
            modal1: false,
            value8: '',
            dialogTitle: '',
            essayPromptId: this.$route.query.id,
            name: '',
            answer: [],
            model1: 'New York',
            data1: [],
            titleId: '',
            seasonList: [],
            data: {},
            pageNo: 1,
        }
    },

    components: {
        docuSubjectManageList,
    },

    mounted() {
        this.getParstList()
        this.getTopInfo()
        this.getSeasonList()
    },

    methods: {
        getParstList(type = {}) {
             let obj = {
                id: this.essayPromptId,
                pageSize: 10,
                pageNo: this.pageNo,
            }
            docuLibrary.parseList(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.count = res.data.data.count
                        this.answer = []
                        this.name = ''
                        if(type == 'add') {
                            this.data1 = this.data1.concat(res.data.data.list)
                            return
                        }
                        this.data1 = res.data.data.list
                    }   
                }).catch(errors.call(this)).finally()
        },

        getTopInfo() {
            let obj = {
                id: this.essayPromptId
            }
            docuLibrary.editInfoSuject(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.data = res.data.data
                }   
            }).catch(errors.call(this)).finally()
        },

        getSeasonList() {
             let obj = {
                schoolId: this.$route.query.scId
            }
            docuLibrary.seasonList(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.seasonList = res.data.data
                }   
            }).catch(errors.call(this)).finally()
        },

        dropdownClick(val) {
            this.$emit('handleModule', val)
        },

        seasonChange(val) {
            this.essayPromptId = val
            if(val) {
                this.getParstList()
                this.getTopInfo()
            }
        },

        routerGo() {
            this.$router.push({
                name: 'docu.docuSubManage'
            })
        },

        addParse() {
            this.answer.push('')
        },

        addList() {
            this.answer = []
            this.name = ''
            this.dialogTitle = '添加文书题目'
            this.modal1 = true
        },

        loadMoreMess() {
            this.$router.push({
                name: 'docu.docuLibrary'
            })
        },

        loadMoreMessList() {
            this.pageNo++
            this.getParstList('add')
        },

        handleModule(val) {
            let [type, id] = val.split('|')
            this.titleId = id
            if(type == 'dele') {
                this.dialogTitle = '删除文书题目'
            }else {
                this.dialogTitle = '编辑文书题目'
                this.getEditInfo()
                return
            }
            this.modal1 = true
        },

        getEditInfo() {
            let obj = {
                id: this.titleId
            }
            docuLibrary.editTitle(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.answer = res.data.data.essayPromptInfoList
                    this.name = res.data.data.name
                    this.modal1 = true
                }   
            }).catch(errors.call(this)).finally()
        },

        ok() {
            if(this.dialogTitle == '删除文书题目') {
                let obj = {
                    id: this.titleId
                }
                docuLibrary.deleteParseTitle(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.$Message.info(res.data.message)
                        this.getParstList()
                    }   
                }).catch(errors.call(this)).finally()
                return
            }

            if(this.dialogTitle == '添加文书题目') this.titleId = ''
            let textList = []
            this.$refs.textAre.forEach((item, key) => {
                textList.push({
                    essayPromptId: this.essayPromptId,
                    answer: item.currentValue
                })
            })
            let obj = {          
                id: this.titleId,
                essayPromptId: this.essayPromptId,
                name: this.name,
                essayPromptInfoList: textList
            }
            docuLibrary.addDocuParse(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.getParstList()
                }   
            }).catch(errors.call(this)).finally()
        },

        cancel() {

        },

        loadMore(index) {
            this.isShowLoadMore = !this.isShowLoadMore
        }
    }
}
</script>


