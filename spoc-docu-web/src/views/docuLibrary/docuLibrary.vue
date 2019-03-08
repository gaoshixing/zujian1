<style lang='less'>
    .docuLibraryGsx {
        li {
            list-style: none;
        }
        position: relative; 
        .addTemp {
            position: absolute;
            right: 20px;
            top: 50px;
        }
        .res {
            color: red;
            font-size: 18px;
            font-style: normal;
        }
        .page {
            text-align: center;
            margin-top: 20px;
        }
    }
    .dialogCGSXM4 {
        li {
            list-style: none;
        }
        .tagType {
            padding-bottom: 16px;
            border-bottom: 1px solid #e9eaec;
            .clear {
                float: right;
                cursor: pointer; 
            }
        }
        .modalContent {
            height: 400px;
            padding-bottom: 30px;
            overflow: auto;
            .customerType {
                margin-top: 20px;
            }
            .customerType>span {
                padding: 4px 25px;
                display: inline-block;
                border: 1px solid #ccc;
                margin: 8px 15px 8px 0;
                border-radius: 3px;
                cursor: pointer;
            }
            .customerType .active {
                background-color: #44bcbc;
                color: #fff;
                border: 1px solid transparent;
            }
        }
    }
    .docuLibraryDialogCGSX {
        .tags {
            >span {
            padding: 5px 12px;
            display: inline-block;  
            line-height: 1;
            cursor: pointer;
            background-color: #44bcb6;
            color: white;
            margin-right: 10px;
        }
        }
        .diaUl {
            overflow: hidden;
            >li {
                list-style: none;
                line-height: 45px;
                >span {
                    display: inline-block;
                    width: 110px;
                    text-align: right;
                    i {
                        color: red;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="docuLibraryGsx">
        <Tabs @on-click="toggleSatus" v-model="tabValue">
			<TabPane label="文书范本" name="name1"></TabPane>
			<TabPane label="文书题目" name="name2"></TabPane>
		</Tabs>
        <v-select 
            style="width: 396px;margin: 15px 0;"
            :placeholder="placeholderTop"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <span class="addTemp">
            <Button @click="showAddDialog" type="primary">{{this.tabValue == 'name1' ? '添加范本' : '添加文书学校/项目'}}</Button>
        </span>
        <p>搜索结果<i class="res">{{ data.count }}</i> </p>
        <docu-module
            v-if="tabValue == 'name1'"
            :dataList = data.list
            @handleModule='handleModule'
        >
        </docu-module>
        <docu-subject
            :dataList = data.list
            @handleModule1='handleModule1'
            v-else
        >
        </docu-subject>
        <div class="page">
            <Page show-elevator show-total  show-sizer @on-page-size-change="onPageSizeChange" :current="pageNo" :total="data.count" @on-change="onPageChange" v-if="data.count>10"></Page>
        </div>
        <!-- 弹出窗 -->
        <Modal
            ref="table"
            :mask-closable="false"
            v-model="modal1"
            width=728
            title="添加文书"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="docuLibraryDialogCGSX">
                <ul class="diaUl">
                    <li>
                        <span><i>*</i>文书顾问：</span>
                        <Input v-model="docuObj.teacherName" placeholder="文书顾问" style="width:260px"></Input>
                    </li>
                    <li>
                        <span><i>*</i>学生姓名：</span>
                        <v-select 
                            style="width:260px;display:inline-block"
                            placeholder=" "
                            :datafunc="datafunc1"
                            v-model="docuObj.studentName"
                            k='name'
                            @on-enter="textChange1" 
                            @on-click="textChange1" 
                            @selected="textChange1">
                        </v-select>
                    </li>
                    <li>
                        <span><i>*</i>申请类别：</span>
                        <Select @on-change='applyTypeChange' v-model="docuObj.applyType" style="width:260px">
                            <Option v-for="item in applyTypeList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li>
                        <span><i>*</i>文书类型：</span>
                        <Select @on-change='docuTypeChange'  v-model="docuObj.type" style="width:260px">
                            <Option v-for="item in docuTypeList" :value="item.value" :key="item.id">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li style="over-float:hidden;min-height:45px">
                        <tag-module
                            :style1="style1"
                            @getTagName='getTagName'
                            :hasSelected='tagIdList'
                            modelName='文书模块'
                            pid='701'
                            title="文书标签："
                        ></tag-module>
                        <div class="tags" >
                            <span v-for='(item, index) in tagList' :key="index">{{item}}</span>
                        </div>
                        <!-- 标签选择的组件 -->
                        <!-- <div class="tags" style="float:left;margin-left:7px">
                            <span v-for="(item, index) in tagList" class="active" :key="index">{{item}}</span>
                            <Button type="primary" @click="limitTagClick">点击选择</Button> 
                        </div> -->
                    </li>
                    <li>
                        <ul class="diaUl" v-if='docuObj.type == 0'>
                            <li>
                                <span>申请学校：</span>
                                <Select
                                    v-model="docuObj.schoolId"
                                    filterable
                                    remote
                                    style="width:260px"
                                    :remote-method="remoteMethod1"
                                    @on-change='schoolSearchC'
                                    :label-in-value='true'
                                    :label="docuObj.schoolName"
                                    :loading="loading1">
                                    <Option v-for="(option, index) in data1" :value="option.id" :key="index">{{option.cnname}}</Option>
                                </Select>
                            </li>
                            <li v-if="!isShow">
                                <span>研究生院：</span>
                                <Select  @on-change='graduateChange' v-model="docuObj.gradeschoolId" style="width:260px">
                                    <Option v-for="item in graduateList" :value="item.id" :key="item.value">{{ item.cnname }}</Option>
                                </Select>
                            </li>
                            <li v-if="docuObj.applyType != '1055'">
                                <span>专业项目：</span>
                                <Select @on-change='proChange' v-model="docuObj.schoolMajorId" :label-in-value='true' :label="docuObj.name" style="width:260px">
                                    <Option v-for="item in proList" :value="item.id"   :key="item.value">{{ item.name }}</Option>
                                </Select>
                            </li>
                            <li>
                                <span>入学季：</span>
                                <Input v-model.trim="docuObj.applyTime" placeholder="输入入学季节" style="width:260px"></Input>
                            </li>
                            <li>
                                <span>申请政策：</span>
                                <Select @on-change='applyPolicyC' v-model="docuObj.applyPolicy" :label-in-value='true' :label="docuObj.label" style="width:260px">
                                    <Option v-for="item in applypolicyList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                                </Select>
                            </li>
                            <li>
                                <span>录取结果：</span>
                                <Select @on-change='applyResultC' v-model="docuObj.applyResult" :label-in-value='true' :label="docuObj.label" style="width:260px">
                                    <Option v-for="item in resList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                                </Select>
                            </li>
                        </ul>
                        <span style="float:left;margin-right:4px;"><i>*</i>文件上传：</span>
                        <div style="float:left">
                            <p v-if="localUpObj.fileName">
                                <a>{{localUpObj.fileName}}</a>
                            </p>
                            <Button type="primary" @click="onUploadLocal">本地上传</Button>
                            <Button style="margin-left:20px"  @click="showPan" type="primary">云盘上传</Button>
                            <p style="color:#999">(请上传docx、doc、pdf格式文件)</p>
                        </div>
                    </li>
                    <!-- <li style="overflow:hidden;min-height:50px">
                        
                    </li> -->
                </ul>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            width=728
            :title="dialogTitle"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div class="docuLibraryDialogCGSX">
                <p v-if="dialogTitle == '删除范本'" style="font-size:16px;line-height:50px;text-align:center">确定删除当前文书学校/项目？</p>
            </div>
        </Modal>
        <Modal
            ref="table3"
            v-model="modal3"
            width=728
            title="添加文书学校/项目"
            @on-ok="ok3"
            @on-cancel="cancel3">
            <div class="docuLibraryDialogCGSX">
                <ul class="diaUl">
                    <li>
                        <span>　<i>*</i>入学季：</span>
                        <Input v-model.trim="titleObj.applyTime" placeholder="请输入入学季节" style="width:260px"></Input>
                    </li>
                    <li>
                        <span><i>*</i>申请阶段：</span>
                        <RadioGroup v-model="applyStatus" @on-change='radioChange1' >
                            <Radio label="中学"></Radio>
                            <Radio label="本科"></Radio>
                            <Radio label="研究生"></Radio>
                        </RadioGroup>
                    </li>
                    <li>
                        <span><i>*</i>学校名称：</span>
                        <Select
                            v-model="titleObj.schoolId"
                            filterable
                            remote
                            style="width:260px"
                            :remote-method="remoteMethod1"
                            :label="titleObj.schoolName"
                            @on-change='schoolSearchCAdd'
                            :loading="loading1">
                            <Option v-for="(option, index) in data1" :value="option.id" :key="index">{{option.cnname}}</Option>
                        </Select>
                    </li>
                    <li v-if="applyStatus == '研究生'">
                        <span>研究生院：</span>
                        <Select @on-change='graduateChangeAdd' v-model="titleObj.gradeschoolId" style="width:260px">
                            <Option v-for="item in graduateList" :value="item.id" :key="item.value">{{ item.cnname }}</Option>
                        </Select>
                    </li>
                    <li v-if="applyStatus != '中学'">
                        <span>专业项目：</span>
                        <Select  v-model="titleObj.schoolMajorId" @on-change='proChangeAdd'  style="width:260px">
                            <Option v-for="item in proList" :value="item.id" :key="item.value">{{ item.name }}</Option>
                        </Select>
                    </li>
                </ul>
            </div>
        </Modal>
        <!-- <Modal
            v-model="modal4"
            title="选择标签"
            width=568
            @on-ok="ok4"
            @on-cancel="cancel4">
            <div class="dialogCGSXM4">
                <p class="tagType">
                    <RadioGroup v-model="TagKind" @on-change='radioChange'>
                        <Radio label="limitTag">
                            <span>指定标签</span>
                        </Radio>
                        <Radio label="allTag">
                            <span>全局标签</span>
                        </Radio>
                    </RadioGroup>
                    <span class="clear" @click="clearLimit">清空</span>
                </p>
                <div class="modalContent">
                    <div class="customerType" v-for="(item1, INDEX) in tagListAll" :key="INDEX">
                        <p v-if="item1.isMultiselect == 1"><Radio :disabled='true'  v-model="isRadio"></Radio>{{item1.title}}</p> 
                        <p v-else>  <Checkbox v-model="isRadio" :disabled='true'></Checkbox></Radio>{{item1.title}}</p> 
                        <span @click="selectItem(item, item1)" v-for="(item, index) in item1.children" :key="index" :class="{'active': moreCheckList[item1.id] && moreCheckList[item1.id].indexOf(item.id)!=-1}">{{item.title}}</span>
                    </div>
                </div>
            </div>
        </Modal> -->
        <up-to-pan ref="uptopan" :object-id="objectId" :dir="folderName" :format="['docx','pdf','doc']" type="pl_report_report" fileType="all" @uploadok="onUploadOk" />
        <yunpan @on-confirm="doSendFile" ref="yunpan" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
    </div>
</template>

<script>
import vSelect from '@public/modules/vSelect'
import docuModule from './components/docuModule'
import docuSubject from './components/docuSubject'
import filterTag from '../../modules/filterTag'
import yunpan from '@public/modules/yunpan'
import upToPan from '../../modules/docuUpToPan'
import tagModule from '@public/modules/tagModule'

import valid, {errors, docuLibrary, sys, common, docuLibrarySearch} from '../../libs/request';

export default {
    data() {
        return {
            tagIdList: [],
            style1: {
                display: 'inline-block',
                width: '110px',
                textAlign: 'right',
            },
            placeholderTop: '输入文书名称/申请学校/文书顾问姓名',
            isRadio: true,
            TagKind: "limitTag",
            tagListAllCache1: [], 
            tagListAllCache2: [], 
            menuId: "401",  //标签范围， 401为指定标签， 空字符串''为全部标签
            tagList: [],
            tagListAll: {}, //模态框中，渲染页面用的标签全集合，会根据menuId变化而变化
            moreCheckList: {}, //已选中ID集合 [1,2,333]
            showListObj: {},
            tagArr: {}, //已选中的标签名称集合 
            pan: {visible:false },
            objectId: '',
            folderName: '',
            TagKind: "limitTag",
            docuObj: {
                teacherName: '',
                studentName: '',
                type: '',
                applyResult: '',
                applyPolicy: '',
                applyTime: '',
                schoolId: '',
                schoolMajorId: '',
                gradeschoolId: '',
                schoolMajorName: '',
                applyType: '',  
                applyPolicyName: '',
                schoolName: '',
            },
            titleObj: {
                schoolId: '',
                gradeschoolId: '',
                schoolMajorId: '',
                applyTime: '',
                phase: 0,
            },
            localUpObj: {},
            appProjectId: '',
            addGraduateV: '',
            addProjectV: '',
            addSchoolV: '',
            docuId: '',
            type: '',
            studentV: '',
            studentList: [],
            resV: '',
            resList: [],
            applypolicyList: [],
            loading1: false,
            loading2: false,
            graduateV: '',
            proV: '',
            proList: [],
            graduateList: [],
            docuTypeList: [],
            applyTypeList: [],
            isShowDialog: false,
            applyStatus: '中学',
            value2: '',
            dialogTitle: '',
            data1: [],
            compact: '',
            tabValue: 'name1',
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            value: '', 
            applyV: '',
            tags: [],
            pageNo: 1,
            pageSize: 10,
            data: {
                count: '',
            },
            model1: '',
            isShow: false,
        }
    },

    components: {
        vSelect,
        docuModule,
        docuSubject,
        filterTag,
        upToPan,
        yunpan,
        tagModule
    },

    mounted() {
        this.getTime()
        this.getTreeList()
        this.getDocuTypeList('xx_student_apply')
        this.getDocuTypeList('doc_essay_type_undergrad')
        this.getDocuTypeList('xx_choice_school_batch')
        this.getDocuTypeList('xx_result_type')
    },

    methods: {
        getTime() {
            common.newDate({}).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.folderName = `/文书库/${res.data.data.date}`
                }
            }).catch(errors.call(this))
            .finally(() => {});
        },

        getTitleList() {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                name: this.compact,
            }
            docuLibrary.docuTitleList(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.data = res.data.data
				}   
			}).catch(errors.call(this)).finally();
        },   

        getTreeList() {
            let obj = {
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                name: this.compact,
            }
            docuLibrary.treeList(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.data = res.data.data
				}   
			}).catch(errors.call(this)).finally();
        },

        getDocuTypeList(type) {
            let obj = {
                type: type
            }
            sys.dictListData(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    if(type == 'doc_essay_type_undergrad'){
					    this.docuTypeList = res.data.data
                    }else if(type == 'xx_student_apply') {
                        this.applyTypeList = res.data.data
                    }else if(type == 'xx_choice_school_batch'){
                        this.applypolicyList = res.data.data
                    }else {
                        this.resList = res.data.data
                    }
				}
			}).catch(errors.call(this)).finally();
        },

        proChange(val) {
            this.docuObj.schoolMajorName = val.label
        },

        remoteMethodStd(value) {
            if(value == '') return
            setTimeout(() => {
                this.loading2 = true
                let obj = {
                    studentName: value
                }
                docuLibrarySearch.searchStudent(obj).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.loading2 = false
                        this.studentList = res.data.data
                    }   
                }).catch(errors.call(this)).finally()
            }, 200)
        },

        remoteMethod1(value) {
            if(value == '') return
            setTimeout(() => {
                this.loading1 = true
                this.getSchoolList(value)
            }, 200)
        },

        // 学校列表
        getSchoolList(value) {
            let obj = {
                schoolName: value
            }
            docuLibrarySearch.schoolSearch(obj).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.loading1 = false
                    this.data1 = res.data.data
                }   
            }).catch(errors.call(this)).finally();
        },

        // 学院列表
        schoolSearchC(val) {
            this.docuObj.schoolName = val.label
            if(this.isShow) {
               this.graduateChange(val.value)
               return
            }

            let obj = {
                schoolId: val.value
            }
            this.getSchoolY(obj)
        },

        getSchoolY(obj) {
            docuLibrarySearch.collegeSearch(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.graduateList = res.data.data
                    if(this.tabValue == 'name1')  this.modal1 = true
				}
			}).catch(errors.call(this)).finally();
        },

        // 专业列表
        graduateChange(val) {
            if(!val) return
            let obj
            if(!this.isShow) {
                obj = {
                    gradeschoolId: val
                }
            }else {
                 obj = {
                    gradeschoolId: 0,
                    schoolId: val
                }
            }
            this.getproList(obj)
        },

        getproList(obj) {
            docuLibrarySearch.proList(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.proList = res.data.data
                    if(this.tabValue == 'name1')  this.modal1 = true
				}  
			}).catch(errors.call(this)).finally();
        },

        // 学院列表add 
        schoolSearchCAdd(val) {
            if(this.applyStatus == '本科') {
               this.graduateChangeAdd(val)
               return
            }

            let obj = {
                schoolId: val
            }
            this.getSchoolY(obj)
        },

        // 专业列表add
        graduateChangeAdd(val) {
            let obj
            if(this.applyStatus == '研究生') {
                obj = {
                    gradeschoolId: val
                }
            }else {
                 obj = {
                    gradeschoolId: 0,
                    schoolId: val
                }
            }
            this.getproList(obj)
        },

        proChangeAdd(val) {
        },

        handleModule(val) {
            let [type, id, index] = val.split('|')
            this.docuId = id
            this.dialogTitle = type == 'edit' ?  '编辑文书学校/项目' : '删除范本'
            if(type == 'edit') {
                this.getEditInfo()
                return
            }
            this.modal2 = true
        },

        handleModule1(val) {
            let [type, id, index] = val.split('|')
            this.docuId = id
            this.dialogTitle = type == 'edit' ?  '编辑文书学校/项目' : '删除范本'
            if(type == 'edit') {
                this.getEditInfoSubject()
                return
            }
            this.modal2 = true
        },

        //本地上传
        onUploadLocal(){
            this.$refs.uptopan.doUpload()
        },

        //上传成功
        onUploadOk(data){
            if(data.status == "success") {
                this.$Message.success(data.message);
                this.localUpObj = data.data
			}else {
				this.$Message.error(data.message);
			}
        },

        // 云盘上传
        showPan() {
            this.pan.visible = true;
        },

        doSendFile(item){
            const params ={
                objectId:this.objectId,
                fileName: item.name,
                panFilePath: item.dir, 
                menuId: this.menuId,
                type: 'essay',
                filePath: this.folderName,
            };
            this.$refs.yunpan.uploadPanFileToPan(params).then(res=>{
                if(res.ok){
                    this.localUpObj = res.data.data
                    this.$Message.success(res.data.message);
                    this.close();
                }
            });
        },

        doCancel(){
            this.close();
        },
        
        close(){
            this.pan.visible = false;
        },

        getEditInfo() {
            let obj = {
                id: this.docuId
            }
            docuLibrary.editInfo(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.docuObj = res.data.data
                    this.localUpObj.fileName = res.data.data.fileName
                    this.showTag()
                    this.modal1 = true
                    this.schoolSearchC({
                        label: res.data.data.schoolName,
                        value: res.data.data.schoolId,
                    })
                    if(!this.isShow) {
                        this.graduateChange(res.data.data.schoolMajorId)
                        return
                    }
                    this.graduateChange(res.data.data.schoolId)
                    
				}   
			}).catch(errors.call(this)).finally();
        },
        
        showTag() {
            console.log(this.docuObj.comTags)
            this.tagList =  this.docuObj.comTags.map((item, key) => {
                return item.title
            })
            this.tagIdList = this.docuObj.comTags.map((item, key) => {
                return item.id
            })
        
            // this.getBuildTreeForEdit('401', hasSelected)
            // this.getBuildTreeForEdit('', hasSelected)
               
        },

        getEditInfoSubject() {
            let obj = {
                id: this.docuId
            }
            docuLibrary.editInfoSuject(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let resu = res.data.data
                    this.titleObj = resu
                    this.applyStatus = resu.phase == '0' ? '中学' :  resu.phase == '1' ? '本科' : '研究生'
                    this.schoolSearchCAdd(resu.schoolId)
                    if(this.applyStatus == '本科') {
                        this.graduateChangeAdd(resu.schoolId)
                    }else {
                        this.graduateChangeAdd(resu.gradeschoolId)
                    }
                    this.modal3 = true
				}   
			}).catch(errors.call(this)).finally();
        },

        applyTypeChange(val) {
            // this.docuObj.applyType == '中学' || this.docuObj.applyType == '本科新生' || this.docuObj.applyType == '本科转学'
            if(this.docuObj.applyType == 1055 || this.docuObj.applyType == 1056 || this.docuObj.applyType == 1057 ) {
                this.isShow = true
                return
            }
            this.isShow = false
        },

        docuTypeChange(val) {
           this.type = val
        },

        applyPolicyC(val) {
            this.docuObj.applyPolicyName = val.label
        },
        
        applyResultC(val) {
            this.docuObj.applyResultName = val.label
        },

        showAddDialog() {
            this.docuObj = {}
            this.docuObj.studentName = ''
            this.localUpObj = {}
            this.docuObj.comTags = []
            this.titleObj = {}
            this.applyStatus = '中学'
            this.docuId = ''
            sessionStorage.setItem("moreCheckListForGroup", "{}")
			sessionStorage.setItem("tagArrForGroup", "{}")
            this.tabValue == 'name1' ? this.modal1 = true : this.modal3 = true
        },
        
        toggleSatus(val) {
            this.tabValue = val
            this.compact = ''
            this.pageSize = 10,
            this.pageNo = 1
            if(val == 'name1') {
                this.placeholderTop = '输入文书名称/申请学校/文书顾问姓名'
                this.getTreeList()
            }else {
                this.placeholderTop = '输入入学季/学校/专业项目'
                this.getTitleList()
            }
        },

        onPageSizeChange(val) {
			this.pageSize = val
		    if(this.tabValue == 'name1') {
                this.getTreeList()
            }else {
                this.getTitleList()
            }
		},

		onPageChange(val) {
			this.pageNo = val
			if(this.tabValue == 'name1') {
                this.getTreeList()
            }else {
                this.getTitleList()
            }
        },

        ok() {
            if(!this.docuObj.teacherName || !this.docuObj.studentName || !this.docuObj.applyType || !this.docuObj.type || !this.localUpObj.fileName) {
                this.modal1 = true
                this.$refs.table.visible = true
                this.$Message.info('请填写必填项')
                return
            }
            
            let obj = {
                id: this.docuId,
                teacherName: this.docuObj.teacherName,
                studentName: this.docuObj.studentName,
                applyType: this.docuObj.applyType,
                type: this.docuObj.type,
                tags: this.tags.length ? this.tags : '',
                schoolId: this.docuObj.schoolId,
                schoolMajorId: this.docuObj.schoolMajorId,
                schoolMajorName: this.docuObj.schoolMajorName,
                gradeschoolId: this.docuObj.gradeschoolId,
                applyTime: this.docuObj.applyTime,
                applyPolicy: this.docuObj.applyPolicy,
                applyResult: this.docuObj.applyResult,
                applyPolicyName: this.docuObj.applyPolicyName,
                applyResultName: this.docuObj.applyResultName,
                schoolName: this.docuObj.schoolName,
                fileId: this.localUpObj.id,
            }
            docuLibrary.addDocuModule(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.tagList = []
                    this.docuObj = {}
                    this.docuObj.studentName = ''
                    this.localUpObj = {}
                    this.getTreeList()
				}   
			}).catch(errors.call(this)).finally();
        },

        radioChange1(val) {
            this.titleObj.phase = val == '中学' ? 0 : val == '本科' ? 1 : 2
        },

        cancel() {
            if(!this.localUpObj.id) return
            let obj = {
                id: this.localUpObj.id
            }   
            sys.delete(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.localUpObj = {}
                }
            }).catch(errors.call(this))
            .finally(() => {});
        },
         
        ok1() {
            if(this.dialogTitle == '删除范本') {
                this.deleteM()
            }
        },

        deleteM() {
            let type 
            let obj = {
                id: this.docuId
            }
            if(this.tabValue == 'name1') {
                docuLibrary.deleteModule(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getTreeList()
                    this.$Message.info(res.data.message)
                }}).catch(errors.call(this)).finally()
                return
            }
            docuLibrary.deleteDocuProduct(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getTreeList()
                    this.$Message.info(res.data.message)
				}   
			}).catch(errors.call(this)).finally();
        },

        cancel1() {

        },

        ok3() {
            if(!this.titleObj.schoolId || !this.titleObj.applyTime ) {
                this.modal3 = true
                this.$refs.table3.visible = true
                this.$Message.info('请填写必填项')
                return
            }
            console.log(this.docuId)
            let obj = {
                id: this.docuId,
                schoolId: this.titleObj.schoolId,
                gradeschoolId: this.titleObj.gradeschoolId,
                schoolMajorId: this.titleObj.schoolMajorId,
                applyTime: this.titleObj.applyTime,
                phase: this.titleObj.phase
            }
            docuLibrary.addDocuProduct(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.getTitleList()
                    this.$Message.info(res.data.message)
				}   
			}).catch(errors.call(this)).finally();
        },

        datafunc1(word) {
            return new Promise((resolve, reject) => {
				docuLibrarySearch.searchStudent({
                studentName: word
                }).then(valid.call(this)).then(res => {
					if(res.ok) {
						resolve(res.data.data);
					} else {
						reject(res);
					}
				}).catch(err => {
					errors.call(this);
					reject(err);
				});
			});
        },

        cancel3() {

        },

        textChange() {
            if(this.tabValue == 'name1') {
                this.getTreeList()
            }else {
                this.getTitleList()
            }
        },

        textChange1() {

        },

        datafunc() {
            return new Promise((resole, reject) => {

            })
        },

        // // 标签选择
        // getBuildTree() {
		// 	if (this.parentId == this.delateId) this.parentId = "";
		// 	let obj = {
		// 		menuId: this.menuId
		// 	};
		// 	common.buildTree(obj).then(valid.call(this)).then(res => {
        //         if (res.ok) {
        //             this.tagListAll = res.data.data.children;
        //             if(this.menuId == '401'){ //指定标签
        //                 this.tagListAllCache1 = res.data.data.children
        //             }
        //             if(this.menuId == ''){//全局标签
        //                 this.tagListAllCache2 = res.data.data.children
        //             }
        //         }
        //     })
        //     .catch(errors.call(this))
        //     .finally(() => {});
		// },

        // //用于编辑模式，先展示已选标签
        // getBuildTreeForEdit(menuId, hasSelected) {
        //     this.tagList = []
		// 	let obj = {
		// 		menuId: menuId
		// 	};
		// 	common.buildTree(obj).then(valid.call(this)).then(res => {
        //         if (res.ok) {
        //             let result = res.data.data.children;
        //             result.forEach((item1, key1) => {
        //                 item1.children.forEach((item2, key2) => {
        //                     if(hasSelected.indexOf(item2.id) > -1){ //已选标签
        //                         if(this.moreCheckList[item1.id]) {
        //                             let myArray = this.moreCheckList[item1.id]
        //                             myArray.push(item2.id)
        //                             let myArray2 = this.tagArr[item1.id]
        //                             myArray2.push(item2.title)
        //                             this.$set(this.moreCheckList, item1.id, myArray)
        //                             this.$set(this.tagArr, item1.id, myArray2)
        //                         } else {
        //                             this.$set(this.moreCheckList, item1.id,[item2.id] );
        //                             this.$set(this.tagArr, item1.id,[item2.title] );
        //                         }
        //                         this.tagList.push(item2.title)
        //                     }
        //                 });
        //             });
        //             sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
		// 	        sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
        //         }
        //     })
		// 	.catch(errors.call(this))
		// 	.finally(() => {});
        // },
        // //切换标签类别，重新渲染标签备选项
		// radioChange(val) {
		// 	this.menuId = val == "allTag" ? "" : "401";
        //     if(this.menuId == '401'){ //指定标签
        //         if(this.tagListAllCache1.length){
        //             this.tagListAll = this.tagListAllCache1
        //         } else {
        //             this.getBuildTree()
        //         }
        //     } 
        //     if(this.menuId == ''){//全局标签
        //         if(this.tagListAllCache2.length) {
        //             this.tagListAll = this.tagListAllCache2
        //         } else {
        //             this.getBuildTree();
        //         } 
        //     }
		// },
        // //打开选择标签模态框
		// limitTagClick() {
        //     if(sessionStorage.getItem("moreCheckListForGroup") && sessionStorage.getItem("tagArrForGroup")){
        //         this.moreCheckList = JSON.parse(sessionStorage.getItem("moreCheckListForGroup"));
        //         this.tagArr = JSON.parse(sessionStorage.getItem("tagArrForGroup"));
        //     }
        //     this.modal4 = true;
        //     this.getBuildTree();
		// },
        // //清空当前模态框已选标签
		// clearLimit() {
		// 	sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
		// 	sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
		// 	this.moreCheckList = {};
		// 	this.tagArr = {};
		// },
        // //点击选择或取消选择一个标签,接收两个参数，所点标签对象以及所点标签所在组对象
        // selectItem(item,itemParent) {
        //     let selected = this.moreCheckList[itemParent.id]
        //     let tagArrSelected = this.tagArr[itemParent.id]
        //     if(!selected) { //从来没有选中过该组的。则初始一下
        //         selected = []
        //     } 
        //     if(!tagArrSelected) { //从来没有选中过该组的。则初始一下
        //         tagArrSelected = []
        //     } 
        //     if(itemParent.isMultiselect != 1){ //允许多选
        //         let index = selected.indexOf(item.id);
        //         if (index == -1) {
        //             selected.push(item.id);
        //             tagArrSelected.push(item.title);
        //         } else {
        //             selected.splice(index, 1);
        //             tagArrSelected.splice(index, 1);
        //         }
        //     } else { //只能单选
        //         let index = selected.indexOf(item.id);
        //         if (index == -1) {
        //             selected = [item.id];
        //             tagArrSelected = [item.title];
        //         } else {
        //             selected = [];
        //             tagArrSelected = [];
        //         }
        //     }
        
            
        //     this.$set(this.moreCheckList,itemParent.id, selected )
        //     this.$set(this.tagArr,itemParent.id, tagArrSelected )
		// },
        // //选择标签模态框，确定按钮
		// ok4() {
		// 	this.tagList = [];
		// 	sessionStorage.setItem("moreCheckListForGroup", JSON.stringify(this.moreCheckList));
		// 	sessionStorage.setItem("tagArrForGroup", JSON.stringify(this.tagArr));
            
        //     if (JSON.stringify(this.moreCheckList) == '{}') { //如果没有选中一个标签。显示不限
        //         this.isShow = this.isActive = true;
        //         this.isActive1 = false;
        //     } else {
        //         this.isActive1 = this.isShow = false;
        //         for(let myKey in this.tagArr){
        //             this.tagArr[myKey].forEach((item, key) => {
        //                 this.tagList.push(item);
        //             });
        //         }
        //     }
        //     let tagsArray = [];
        //     for(let key in this.moreCheckList) {
        //         this.moreCheckList[key].forEach((item, index)=>{
        //             tagsArray.push(item)
        //         })
        //     }
        //     this.tags = tagsArray.join(',')
        //     this.moreCheckList = {};
        //     this.tagArr = {};
		// },
        // //选择标签模态框，取消按钮
		// cancel4() {
		// 	this.isActive = true;
        //     this.isActive1 = false;
        //     this.moreCheckList = {};
        //     this.tagArr = {};
		// },
        //    /*标签筛选相关方法end*/
        getTagName(tag, tagsId) {
            this.tagList = tag
            this.tags = tagsId
        }
    }
}
</script>

