<template>
    <div class="contentBox">
        <div class="clearfix">
            <div class="fl basicInfo">
                <div class="logo">
                    <img :class="{hide:!schoolInfo.logoUrl}" :src="schoolInfo.logoUrl">
                </div>
                <!-- <div class="name" v-text="schoolInfo.schoolName"></div> -->
                <div class="index" v-text="index"></div>
            </div>
            <div class="main">
                <div class="editMode" :class="{hide:showModule}">
                    <Form ref="editSchoolForm" :model="schoolInfo" :rules="editSchoolrules">
                        <FormItem :show-message="false" prop="schoolId" style="margin-bottom:0px">
                            <div class="infoList">
                                <label>{{$t('XxChoiceSchool.schoolName')}}</label>
                                <div class="detail">
                                    <v-select placeholder="输入关键字搜索" :datafunc="schoolDropSeach" k="enname" v-model="schoolInfo.schoolEnName" @selected="changeSchool"></v-select>
                                </div>
                            </div>
                        </FormItem>

                        <FormItem :show-message="false" style="margin-bottom:0px" v-if="isG">
                            <div class="infoList">
                                <label>研究生院</label>
                                <div class="detail">
                                    <v-select placeholder="输入关键字搜索" :onfocus="showInitGradeSchool" :datafunc="gradeSchoolMajorDropSeach" k="enname" v-model="schoolInfo.gradeSchoolEnName" @selected="changeGrade"></v-select>
                                </div>
                            </div>
                        </FormItem>


                        <FormItem :show-message="false" style="margin-bottom:0px">
                            <div class="infoList">
                                <label>{{$t('XxSchool.majorName')}}</label>
                                <div class="detail">
                                    <v-select placeholder="输入关键字搜索" :onfocus="showInitMajor" :datafunc="schoolMajorDropSeach" k="enName" v-model="schoolInfo.majorEnName" @selected="changeMajor"></v-select>
                                </div>
                            </div>
                        </FormItem>

                        

                        <FormItem v-if="isG" :show-message="false" style="margin-bottom:0px">
                            <div class="infoList">
                                <label>项目链接</label>
                                <div class="detail">
                                    <Input v-model="schoolInfo.link"></Input>
                                </div>
                            </div>
                        </FormItem>

                        <FormItem :show-message="false" prop="difficulty" style="margin-bottom:0px">
                            <div class="infoList">
                                <label>{{$t('XxChoiceSchool.difficultyName')}}</label>
                                <div class="detail">
                                    <Select v-model="schoolInfo.difficulty" style="width:200px" :label-in-value="true" @on-change="changeDifficult">
                                        <Option v-for="item in difficultyList" :value="item.value" :key="item.value">{{ item.remarks }}</Option>
                                    </Select>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem :show-message="false" prop="batch" style="margin-bottom:0px">
                            <div class="infoList">
                                <label>{{$t('XxChoiceSchool.batchName')}}</label>
                                <div class="detail">
                                    <Select v-model="schoolInfo.batch" style="width:200px" :label-in-value="true" @on-change="changeBatch">
                                        <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.remarks }}</Option>
                                    </Select>
                                </div>
                            </div>
                        </FormItem>
                        <div class="clearfix" v-if="!isG" v-for="(item,index) in schoolInfo.xxChoiceSchoolDetailList" :key="'c_'+index">
                            <FormItem :show-message="false" style="margin-bottom:0px;float:left;width:252px;">
                                <div class="infoList">
                                    <label>申请学院{{index+1}}</label>
                                    <div class="detail">
                                        <Input v-model="item.college"></Input>
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem :show-message="false" style="margin-bottom:0px;float:left;width:252px;">
                                <div class="infoList sec">
                                    <label>专业/项目{{index+1}}</label>
                                    <div class="detail">
                                        <Input v-model="item.program"></Input>
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem :show-message="false" style="margin-bottom:0px;float:left;width:252px;">
                                <div class="infoList sec">
                                    <label>项目链接{{index+1}}</label>
                                    <div class="detail">
                                        <Input v-model="item.link"></Input>
                                    </div>
                                </div>
                            </FormItem>
                        </div>
                        
                        <!--FormItem style="margin-bottom:0px">
                            <div class="infoList" :class="{hide:apply=='0'}">
                                <label>{{$t('XxChoiceSchool.link')}}</label>
                                <div class="detail">
                                    <Input v-model="schoolInfo.link"></Input>
                                </div>
                            </div>
                        </FormItem-->
                        <FormItem style="margin-bottom:0px">
                            <div class="infoList operateList">
                                <div class="detail">
                                    <Button type="primary" @click="saveEditResult('editSchoolForm')">{{$t('Save')}}</Button>
                                </div>
                            </div>
                        </FormItem>
                    </Form>
                </div>
                <div class="showModel" :class="{hide:!showModule}">
                    <div class="infoList">
                        <label>{{$t('XxChoiceSchool.schoolName')}}</label>
                        <div class="detail" v-text="schoolInfo.schoolEnName"></div>
                    </div>
                    <div class="infoList" v-if="isG">
                        <label>研究生院</label>
                        <div class="detail" v-text="schoolInfo.gradschoolId=='0'?'Undecided':schoolInfo.gradeSchoolEnName"></div>
                    </div>
                    <div class="infoList">
                        <label>{{$t('XxSchool.majorName')}}</label>
                        <div class="detail" v-text="schoolInfo.majorId=='0'?'Undecided':schoolInfo.majorEnName"></div>
                    </div>
                    <div class="infoList" v-if="isG">
                        <label>项目链接</label>
                        <div class="detail" v-text="schoolInfo.link"></div>
                    </div>
                    <div class="infoList">
                        <label>{{$t('XxChoiceSchool.difficultyName')}}</label>
                        <div class="detail" v-text="schoolInfo.difficulty"></div>
                    </div>
                    <div class="infoList">
                        <label>{{$t('XxChoiceSchool.batchName')}}</label>
                        <div class="detail" v-text="schoolInfo.batch"></div>
                    </div>
                    <!--div class="infoList" :class="{hide:apply=='0'}">
                        <label>{{$t('XxChoiceSchool.link')}}</label>
                        <div class="detail" v-text="schoolInfo.link"></div>
                    </div-->
                    <div class="infoList">
                        <label>{{$t('XxChoiceSchool.updateDate')}}</label>
                        <div class="detail">
                            <span>{{schoolInfo.assignTime | dataFormat}}</span>
                            <a class="moreBtn" href="javascript:void(0)" @click="alertOperationInfo">{{$t('OperationLog')}}</a>
                            <a class="moreBtn" href="javascript:void(0)" @click="alertCommunication">{{$t('CommunicationRecord')}}</a>
                            <span class="red"> ({{schoolInfo.xxChatCount}})</span>
                        </div>
                    </div>
                    <div class="infoList">
                        <label>{{$t('XxChoiceSchool.assginer')}}</label>
                        <div class="detail">{{schoolInfo.assginer}}</div>
                    </div>
                    <div class="infoList" v-if="!isG"> <!-- 非研究生 -->
                        <div class="clearfix" v-for="(item,index) in schoolInfo.xxChoiceSchoolDetailList" :key="index">
                            <template v-if="item.college||item.program">
                                <div style="float:left;width:33.3%;overflow:hidden;height:28px;">
                                    <label>申请学院{{index+1}}</label>
                                    <div class="detail">{{item.college}}</div>
                                </div>
                                <div style="float:left;width:33.3%;overflow:hidden;height:28px;">
                                    <label>专业/项目{{index+1}}</label>
                                    <div class="detail">{{item.program}}</div>
                                </div>
                                <div style="float:left;width:33.3%;overflow:hidden;height:28px;">
                                    <label>项目链接{{index+1}}</label>
                                    <div class="detail">{{item.link}}</div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="infoList operateList">
                        <!-- 分配员、销售 -->
                        <div class="detail" :class="{hide:roleId!='4'&&roleId!='5'}">
                            <div v-if="userId==schoolInfo.assginerId && schoolInfo.phase=='0'">
                                <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                            </div>
                            <div v-else>
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                        </div>
                        <!-- 美方组长、美方组员 -->
                        <div class="detail" :class="{hide:roleId!='8' && roleId!='9'}">
                            <div v-if="userId==schoolInfo.assginerId">
                                <div v-if="inRoleArray('8')">
                                    <div v-if="schoolInfo.status=='0'">
                                        <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                                        <span :class="{hide:checkFlag!='1'}"><Button type="primary" @click="changeStatus(14,2)">{{$t('Submit')}}</Button></span>
                                        <span :class="{hide:checkFlag=='1'}"><Button type="primary" @click="changeStatus(13,1)">{{$t('Audit')}}</Button></span>
                                    </div>
                                    <div v-if="schoolInfo.status=='1'">
                                        <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                                    </div>
                                </div>
                                <div v-if="inRoleArray('9')">
                                    <div v-if="schoolInfo.status=='0'">
                                        <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                                        <span><Button type="ghost" @click="changeStatus(14,2)">{{$t('Submit')}}</Button></span>
                                    </div>
                                    <div v-if="schoolInfo.status=='1'">
                                        <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                                        <span><Button type="primary" @click="changeStatus(1,2)">{{$t('Pass')}}</Button></span>
                                        <span><Button type="error" @click="changeStatus(2,0)">{{$t('NotPass')}}</Button></span>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                        </div>
                        <!--  系统管理员、 中方组长、中方组员 -->
                        <div class="detail" v-if="(admin || inRoleArray('6') || inRoleArray('7'))">
                            <div v-if="schoolInfo.status=='0' || schoolInfo.status=='1'">
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                            <div v-if="schoolInfo.status=='2'">
                                <div v-if="userId==schoolInfo.assginerId">
                                    <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                                    <span><Button type="ghost" @click="changeStatus(4,3)">{{$t('IncludedAlternative')}}</Button></span>
                                    <span :class="{hide:checkFlag!='1'}"><Button type="primary" @click="changeStatus(14,6)">{{$t('Submit')}}</Button></span>
                                    <span :class="{hide:checkFlag=='1'}"><Button type="primary" @click="changeStatus(13,5)">{{$t('Audit')}}</Button></span>
                                    <span><Button type="error" @click="changeStatus(6,4)">{{$t('Remove')}}</Button></span>
                                </div>
                                <div v-else>
                                    <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                                </div>
                            </div>
                            <div v-if="schoolInfo.status=='3'">
                                <div v-if="userId==schoolInfo.assginerId">
                                    <div v-if="inRoleArray('6')">
                                        <span><Button type="ghost" @click="changeStatus(5,2)">{{$t('NotOnTheAlternative')}}</Button></span>
                                    </div>
                                    <div v-else>
                                        <span><Button type="ghost" @click="changeStatus(5,5)">{{$t('NotOnTheAlternative')}}</Button></span>
                                    </div>
                                    
                                </div>
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                            <div v-if="schoolInfo.status=='4'">
                                <div v-if="userId==schoolInfo.assginerId">
                                    <div v-if="inRoleArray('6')">
                                        <span><Button type="ghost" @click="changeStatus(12,2)">{{$t('Recovery')}}</Button></span>
                                    </div>
                                    <div v-else>
                                        <span><Button type="ghost" @click="changeStatus(12,5)">{{$t('Recovery')}}</Button></span>
                                    </div>
                                </div>
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                            <div v-if="schoolInfo.status=='5'">
                                <div v-if="userId==schoolInfo.assginerId">
                                    <span><Button type="ghost" @click="editFuc">{{$t('Edit')}}</Button></span>
                                    <span><Button type="ghost" @click="changeStatus(4,3)">{{$t('IncludedAlternative')}}</Button></span>
                                    <span><Button type="primary" @click="changeStatus(7,6)">{{$t('Pass')}}</Button></span>
                                    <span><Button type="error" @click="changeStatus(8,2)">{{$t('NotPass')}}</Button></span>
                                    <span><Button type="error" @click="changeStatus(6,4)">{{$t('Remove')}}</Button></span>
                                </div>
                                <div v-else>
                                    <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                                </div>
                            </div>
                            <div v-if="schoolInfo.status=='6'">
                                <div v-if="userId==schoolInfo.assginerId || admin">
                                    <span><Button type="ghost" @click="changeStatus(9,7)">{{$t('Pass')}}</Button></span>
                                    <span><Button type="error" @click="changeStatus(10,2)">{{$t('NotPass')}}</Button></span>
                                </div>
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                            </div>
                            <div v-if="schoolInfo.status=='7'">
                                <span class="statusText" :rel="schoolInfo.status" v-text="statusText"></span>
                                <span><Button type="success" @click="showAddResult">确认申请结果</Button></span>
                                <span><Button type="success" @click="showUploadApplyFile">上传申请材料</Button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="res-list" v-show="schoolInfo.status=='7' && schoolInfo.xxResultList.length">
                <div class="res-list-inner">
                    <div class="s-item" v-for="(item,index) in schoolInfo.xxResultList" :key="index">
                        <div class="type" :class="item.status">
                            <i class="iconfont icon-zhang_"></i>
                            <span class="text" v-text="item.status" @click="showResDetail(item)"></span>
                        </div>
                        <div class="type-ctrl" v-if="hasPer(item.creator)">
                            <span @click="showREdit(item)">编辑</span>
                            <span @click="showRDel(item)">删除</span>
                        </div>
                    </div>
                </div>

                <Modal :title="addResultForm.addtitle" v-model="addResultForm.visible" class-name="vertical-center-modal ch-result-modal" width="580px">
                    <Form ref="addResultForm" :label-width="120" label-position="right" :rules="addResultForm.ruleValidate" :model="addResultForm.data">
                        <FormItem label="申请结果" prop="status">
                            <Select v-model="addResultForm.data.status" style="width:200px" :label-in-value="true" @on-change="onTypeChnaged">
                                <Option v-for="item in addResultForm.dropList" :value="item.label" :key="item.id">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="结果发布时间" prop="publishDate">
                            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" :clearable="false" v-model="addResultForm.data.publishDate" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem label="上传Offer" prop="offer" v-if="addResultForm.offerShow">
                            <img :src="addResultForm.data.offer" alt="" class="img-holder">
                            <div class="ctrl-up">
                                <Upload :style="{display:'inline-block'}"
                                    name="files"
                                    :data="{type:'offer',dirName:'images'}"
                                    :show-upload-list="false"
                                    :on-success="handleOfferSuccess"
                                    :format="['png','jpg','jpeg','pdf']"
                                    :max-size="2048"
                                    :on-format-error="handlePicFormatError"
                                    :on-exceeded-size="handle2MaxSize"
                                    :on-progress="onProgress"
                                    :on-error="onUploadError"
                                    :action="uploadUrl">
                                    <Button type="success">点击上传</Button>
                                </Upload>
                                <div class="tips">*文件最大为2MB(.png,.jpg,.pdf)</div>
                            </div>
                        </FormItem>
                        <FormItem label="上传结果文件" prop="resFile" v-if="!addResultForm.isAdmitted">
                            <ul class="f-list">
                                <li v-for="(item,index) in addResultForm.data.resFile" :key="index">
                                    <span v-text="item.split('/').pop()"></span>
                                    <a class="del-btn" @click="delResPicFile(index)">删除</a>
                                </li>
                            </ul>
                            <div class="ctrl-up">
                                <Upload :style="{display:'inline-block'}"
                                    name="files"
                                    :data="{type:'result',dirName:'images'}"
                                    :show-upload-list="false"
                                    :on-success="handlePicSuccess"
                                    :format="['png','jpg','jpeg','pdf']"
                                    :max-size="2048"
                                    :on-format-error="handlePicFormatError"
                                    :on-exceeded-size="handle2MaxSize"
                                    :on-progress="onProgress"
                                    :on-error="onUploadError"
                                    :action="uploadUrl">
                                    <Button type="success">点击上传</Button>
                                </Upload>
                                <div class="tips">*文件最大为2MB(.png,.jpg,.pdf)</div>
                            </div>
                            
                        </FormItem>
                        <div v-if="addResultForm.isAdmitted">
                            <FormItem label="录取学院" prop="college">
                                <Input v-model="addResultForm.data.college" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="录取校区" prop="branch">
                                <Input v-model="addResultForm.data.branch" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="录取专业/项目" prop="program">
                                <Input v-model="addResultForm.data.program" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="入学时间（YYYY/F或S）" prop="enterYear">
                                <Input v-model="addResultForm.data.enterYear" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="学制时长（X年）" prop="duration">
                                <Input v-model="addResultForm.data.duration" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="Full/Part-Time" prop="fullPartTime">
                                <Select v-model="addResultForm.data.fullPartTime" style="width:340px">
                                    <Option value="0">Full-Time</Option>
                                    <Option value="1">Part-Time</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="奖学金" prop="scholarship">
                                <Input v-model="addResultForm.data.scholarship" style="width:340px" :disabled="addResultForm.viewonly"></Input>
                            </FormItem>
                            <FormItem label="是否入读" prop="isAccept" style="margin:0">
                                <Select v-model="addResultForm.data.isAccept" style="width:340px">
                                    <Option value="0">是</Option>
                                    <Option value="1">否</Option>
                                    <Option value="2">待定</Option>
                                </Select>
                            </FormItem>
                        </div>
                    </Form>
                    <div slot="footer">
                        <Button @click="addResultClose">取消</Button>
                        <Button type="primary" @click="addResultOk">确定</Button>
                    </div>
                </Modal>

                <Modal title="详情" v-model="addResultForm.readvisible" class-name="vertical-center-modal ch-detail" width="580px">
                    <Form :label-width="98" label-position="right">
                        <FormItem label="申请结果">
                            <span v-text="addResultForm.data.status"></span>    
                        </FormItem>
                        <FormItem label="结果发布时间">
                            <span v-text="addResultForm.data.publishDate"></span>    
                        </FormItem>
                        <FormItem label="offer" v-if="addResultForm.data.status=='Admitted'">
                            <a class="green" target="_blank" :href="addResultForm.data.offer" v-text="showOfferFileName(addResultForm.data)"></a>
                        </FormItem>
                        <FormItem label="结果文件" v-if="addResultForm.data.status!=='Admitted'"> <!-- Admitted 不显示结果文件 -->
                            <a class="green oneline" target="_blank" v-for="(item,index) in addResultForm.data.resFile" :href="item" :key="index">结果文件链接{{index+1}}</a>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                    </div>
                </Modal>

                <Modal title="上传申请材料" v-model="uploadApplyFileForm.visible" :mask-closable="false" class-name="vertical-center-modal upapply-form-modal" width="580px">
                    <Form :label-width="98" label-position="right">
                        <div class="form-item" v-for="(item,index) in schoolInfo.xxAttachmentList" :key="index">
                            <label :class="{requiredstar:index==0,placeholdpx:index!=0}">材料{{index+1}}</label>
                            <Select v-model="item.type" style="width:140px" :disabled="item.id && !hasPer(item.creator)">
                                <Option v-for="(item,index) in xx_result_file_list" :key="index" :value="item.value">{{item.label}}</Option>
                            </Select>
                            <label for="">备注</label>
                            <Input v-model="item.remarks" :disabled="item.id && !hasPer(item.creator)" style="width:140px"></Input>
                            <Upload :style="{display:'inline-block'}"
                                name="files"
                                :data="{id:item.id?item.id:'',type:item.type,dirName:'images',objectId:schoolInfo.id,remarks:item.remarks,fileName:genFName(item.type)}"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['png','jpg','jpeg','pdf']"
                                :max-size="2048"
                                :on-format-error="handlePicFormatError"
                                :on-exceeded-size="handle2MaxSize"
                                :on-progress="onProgress"
                                :on-error="onUploadError"
                                :action="attUploadUrl">
                                <Button type="success" :disabled="item.id && !hasPer(item.creator)">上传文件</Button>
                            </Upload>
                            <Tooltip class="tool-tips" v-if="item.filePath && item.fileName" :content="item | showFname" :key="index" placement="top">
                                <span class="fileicon" @click.stop="openFile(item)">
                                </span>
                            </Tooltip>
                            <a @click.stop.prevent="removeFile(item)" v-if="hasPer(item.creator)">删除</a>
                            <a @click.stop.prevent="removeFileFake(item,index)" v-else-if="!item.id" style="margin-left:6px">删除</a>
                        </div>
                        <div class="append-file-btn">
                            <Button type="primary" @click="appendUpItem" size="small">添加申请材料</Button>
                        </div>

                    </Form>
                    <div slot="footer">
                        <Button @click="CheckAndClose">确定</Button>
                    </div>
                </Modal>

            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations,mapState} from 'vuex';
    import util from '../../libs/js/util.js';
    import nozzle from "../../libs/interface.js";
    import vSelect from './vSelect';
    let xx_result_file_list = [];
    export default{
        props: [
            'studentId',
            'xxStudent',
            'roleId',
            'checkFlag',
            'userId',
            'schoolInfo',
            'difficultyList',
            'batchList',
            'index',
            'apply',
            'isG',
            'groupId'
         ],
         data(){
             return {
                xx_result_file_list:xx_result_file_list,
                uploadUrl:nozzle.xxChoiceSchool.uploadFile,
                attUploadUrl:nozzle.basicData.uploadFile,
                showModule:true,
                schoolList:[],
                gradeSchoolList:[],// 学院
                majorList:[], // 专业
                addResultForm:{
                    addtitle:'确认申请结果',
                    visible:false,
                    readvisible:false,
                    offerShow:false,
                    isAdmitted:false,
                    dropList:[],
                    ruleValidate:{
                        status:[
                            {required:true,message:"请选择申请结果"}
                        ],
                        publishDate:[
                            {required:true,message:"请选择结果发布时间"}
                        ],
                        offer:[
                            {required:true,message:"请上传Offer",trigger:'change'}
                        ],
                        resFile:[
                            {required:false,type:'array',message:"请上传结果文件",trigger:'change'}
                        ]
                    },
                    ruleValidate2:{
                        college:[
                            {required:true,message:"请填写录取学院"}
                        ],
                        branch:[
                            {required:true,message:"请填写录取校区"}
                        ],
                        program:[
                            {required:true,message:"请填写录取专业/项目"}
                        ],
                        enterYear:[
                            {required:true,message:"请填写入学时间"}
                        ],
                        duration:[
                            {required:true,message:"请填写学制时长"}
                        ],
                        fullPartTime:[
                            {required:true,message:"请填写fullPartTime"}
                        ],
                        scholarship:[
                            {required:true,message:"请填写奖学金"}
                        ],
                        isAccept:[
                            {required:true,message:"请选择是否入读"}
                        ]

                    },
                    data:{
                        resFile:[],
                        offer:'',
                        remarks:'',
                        status:'',
                        publishDate:new Date()
                    }
                },
                uploadApplyFileForm:{
                    visible:false,
                },
                editSchoolrules:{
                    schoolId:[
                        {required:true,message:"请选择学校",trigger:"change"} // 首次填写自定义内容时ID为空
                    ],
                    majorId:[
                        {required:true,message:"请选择专业",trigger:"change"} // // 首次填写自定义内容时ID为空
                    ],
                    difficulty:[
                        {required:true,message:"请选择申请难度",trigger:"change"}
                    ],
                    batch:[
                        {required:true,message:"请选择申请批次",trigger:"change"}
                    ]
                },
                loadingSchool:false,
                statusMap:{
                    '0':this.$t('UsChooseSchooling'),
                    '1':this.$t('UsConfirmationing'),
                    '2':this.$t('ChinaChooseSchooling'),
                    '3':this.$t('HaveAlternative'),
                    '4':this.$t('HasDeleted'),
                    '5':this.$t('ChinaConfirmationing'),
                    '6':this.$t('ParentAudit'),
                    '7':this.$t('HasSigned'),
                    '-1':this.$t('ToBeAllocated')
                },
                selectBox:{
                    schoolEnName:this.schoolInfo.schoolEnName,
                    majorEnName:this.schoolInfo.majorEnName,
                }
             }
         },
         filters:{
            dataFormat:function(value){
                if(value){
                    return new Date(value).format("yyyy-MM-dd hh:mm:ss");
                }
                return "";
            },
            fileName(file){
                return file.filePath.split('/').pop();
            },
            showFname(file){
                let ext = file.filePath.split('.').pop();
                return `${file.fileName}.${ext}`;
            },
            
         },
         methods: {
             ...mapMutations(['updateLoadingStatus']),
            inRoleArray(id){
                return this.roleIds.indexOf(id)>-1;
            },
             editFuc() {//编辑按钮点击
                if(this.schoolInfo.gradschoolId=='0'){
                    this.schoolInfo.gradeSchoolEnName='Undecided';
                    this.schoolInfo.gradeSchoolName='Undecided';
                }
                this.showModule=false;
             },
             genFName(type){
                let typeName='';
                for(let i in this.xx_result_file_list){
                    const item = xx_result_file_list[i];
                    if(item.value==type){
                        typeName = item.label;
                        break;
                    }
                }
                let name = `${this.xxStudent.lastName}${this.xxStudent.firstName}-${this.schoolInfo.schoolName}-${typeName}-${this.xxStudent.applyTime}`;
                return name;
             },
             showOfferFileName(data){
                let ext = data.offer.split('.').pop();
                return `${this.xxStudent.lastName}${this.xxStudent.firstName}-${this.schoolInfo.schoolName}-${this.xxStudent.applyTime}-offer.${ext}`;
             },
             searchSchool(query){
                if (query !== '') {
                    this.loadingSchool = true;
                    this.getSchoolList(query,()=>{
                        this.loadingSchool = false;
                    });
                }
             },
             schoolDropSeach(query){
                if(query!=''){
                    return new Promise((resolve,reject)=>{
                        this.getSchoolList(query,json=>{
                            resolve(json.data);
                        },err=>{
                            reject(err);
                        });
                    });
                }
                return new Promise((resolve,reject)=>{
                    resolve([]);
                });
             },
             gradeSchoolMajorDropSeach(query){
                 if(query){
                     const q = query.toString().toLowerCase();
                     return new Promise((resolve,reject)=>{
                        const arr = this.gradeSchoolList.filter(item=>{
                            return item.name.toLowerCase().indexOf(query)>-1 || item.enName.toLowerCase().indexOf(query)>-1;
                        });
                        resolve([{id:0,enname:'Undecided'}].concat(arr));
                     });
                 }
                 return this.showInitGradeSchool();
             },
             schoolMajorDropSeach(query){
                 if(query){
                     const q = query.toString().toLowerCase();
                     return new Promise((resolve,reject)=>{
                        const arr = this.majorList.filter(item=>{
                            return item.name.toLowerCase().indexOf(query)>-1 || item.enName.toLowerCase().indexOf(query)>-1;
                        });
                        resolve([{id:0,enName:'Undecided'}].concat(arr));
                     });
                 }
                 return this.showInitMajor();
             },
             showInitMajor(){
                 return new Promise((resolve,reject)=>{
                    resolve([{id:0,enName:'Undecided'}].concat(this.majorList));
                 });
             },
             showInitGradeSchool(){
                 return new Promise((resolve,reject)=>{
                    resolve([{id:0,enname:'Undecided'}].concat(this.gradeSchoolList));
                 });
             },
             changeSchool(data){//改变学校
                this.schoolInfo.schoolId=data.id;
                this.schoolInfo.schoolEnName=data.enname;
                this.selectBox.schoolEnName=data.enname;
                this.schoolInfo.logoUrl=data.logoUrl;
                // 如果是研究生
                if(this.isG){
                    this.getGradeSchoolList(this.schoolInfo.schoolId); // 学校改变显示第二级学院
                } else {
                    this.getMajorList(this.schoolInfo.schoolId);
                }
             },
             getGradeSchoolList(schoolId,cb){ // 得出学院列表
                let data = {schoolId};
                 util.ajax.get(nozzle.gradeSchool.search,{params:data}).then(res=>{
                     util.checkAjaxJson(res).thenSuccess(json=>{
                        this.gradeSchoolList=json.data;
                        cb&&cb(json.data);
                     }).autoRun("login","error");
                 }).catch(function(error) {
                     util.checkAjaxError(error);
                 });
             },
             getMajorList(schoolId,cb){ // 根据学校列出专业
                 let data = this.isG ? {gradeschoolId:schoolId}:{schoolId};
                 util.ajax.get(nozzle.schoolMajor.listSGMajor,{params:data}).then(res=>{
                     util.checkAjaxJson(res).thenSuccess(json=>{
                        this.majorList=json.data;
                        cb&&cb(json.data);
                     }).autoRun("login","error");
                 }).catch(function(error) {
                     util.checkAjaxError(error);
                 });
             },
             changeGrade(data){ // 选择了学院,需要根据学院得出专业
                this.schoolInfo.gradschoolId=data.id;
                this.schoolInfo.gradeSchoolEnName=data.enname;
                this.selectBox.gradeSchoolEnName=data.enname;
                this.getMajorList(this.schoolInfo.gradschoolId)
             },
             changeMajor(data){
                this.schoolInfo.majorId=data.id;
                this.schoolInfo.majorEnName=data.enName;
                this.selectBox.majorEnName=data.enName;
             },
             changeDifficult(data){
                this.schoolInfo.difficulty=data.value;
                this.schoolInfo.difficultyName=data.label;
             },
             changeBatch(data){
                 this.schoolInfo.batch=data.value;
                 this.schoolInfo.batchName=data.label;
             },
             saveEditResult(name){//保存修改结果
                 this.$refs[name].validate((valid) => {
                     if(valid){
                         var _this=this;
                         var submitData=JSON.parse(JSON.stringify(this.schoolInfo));
                         console.info(submitData);
                         submitData.xxChoiceSchoolDetailList.forEach((item,i)=>{
                             submitData[`xxChoiceSchoolDetailList[${i}].id`]=item.id;
                             submitData[`xxChoiceSchoolDetailList[${i}].choiceId`]=this.schoolInfo.id;
                             submitData[`xxChoiceSchoolDetailList[${i}].college`]=item.college;
                             submitData[`xxChoiceSchoolDetailList[${i}].branch`]=item.branch;
                             submitData[`xxChoiceSchoolDetailList[${i}].program`]=item.program;
                             submitData[`xxChoiceSchoolDetailList[${i}].link`]=item.link;
                         });
                         delete submitData.xxChoiceSchoolDetailList;
                         delete submitData.xxAttachmentList;
                         delete submitData.xxChoiceLogList;
                         delete submitData.xxChatList;
                         delete submitData.xxResultList;
                         debugger;
                         if(submitData.majorId==-1 || submitData.majorEnName !=this.selectBox.majorEnName){
                             submitData.otherMajorName = submitData.majorEnName;
                             submitData.majorId=-1;
                             delete submitData.majorEnName;
                             delete submitData.majorName;
                         }
                         if(submitData.schoolId==-1 || submitData.schoolEnName !=this.selectBox.schoolEnName){
                             submitData.otherSchoolName = submitData.schoolEnName;
                             delete submitData.schoolEnName;
                             delete submitData.schoolName;
                             submitData.schoolId=-1;
                         }
                         if(submitData.gradschoolId==-1 || submitData.gradeSchoolEnName !=this.selectBox.gradeSchoolEnName){
                             submitData.otherGradeSchoolName = submitData.gradeSchoolEnName;
                             delete submitData.gradeSchoolEnName;
                             delete submitData.gradeSchoolName;
                             submitData.gradschoolId=-1;
                         }
                         debugger;
                         this.updateLoadingStatus({isLoading:true});
                         
                         util.ajax.post(nozzle.xxChoiceSchool.save,submitData).then(function(res){
                             util.checkAjaxJson(res).thenSuccess(function(json){
                                _this.showModule=true;
                                _this.$emit('refresh');
                                
                             }).autoRun("login","error");
                             _this.updateLoadingStatus({isLoading:false});
                         }).catch(function(error) {
                             _this.updateLoadingStatus({isLoading:false});
                             util.checkAjaxError(error);
                         });
                     } else{
                         console.warn("form not valid")
                     }
                 });
             },
             alertOperationInfo(){
                this.$emit("alertOperationInfo");
             },
             alertCommunication(){
                this.$emit("alertCommunication");
             },
             getSchoolList(query,_callback,errcallback){ //学校模糊搜索列表
                 let url = nozzle.xxSchool.search;
                 let _data = {schoolName:query};
                 var _this=this;
                 util.ajax.get(url,{params:_data}).then(function(res){
                     util.checkAjaxJson(res).thenSuccess(function(json){
                         _this.schoolList=json.data;
                         if(typeof(_callback)=="function"){
                            _callback(json);
                         }
                     }).autoRun("login","error");
                 }).catch(function(error) {
                     util.checkAjaxError(error);
                     errcallback&&errcallback(error);
                 });
             },
             changeStatus(_opertion,_status){
                 var _this=this;
                 this.updateLoadingStatus({isLoading:true});
                 util.ajax.post(nozzle.xxChoiceSchool.changeStatus,{
                     choiceId:this.schoolInfo.id,
                     status:_status,
                     operation:_opertion,
                     reason:""
                 }).then(function(res){
                     util.checkAjaxJson(res).thenSuccess(function(json){
                        _this.$Message.info("操作成功");
                         if(_opertion == 9 && _status == 7)
                        { //通过
                            util.ajax.post(nozzle.xxChoiceSchool.choiceSchoolInit,{
                                studentId: _this.studentId,
                                schoolId: _this.schoolInfo.id    
                            },{json:true}).then(function(res){
                                
                            }).catch(function(error) {
                                _this.updateLoadingStatus({isLoading:false});
                                util.checkAjaxError(error);
                            });
                        }
                        for(var item in json.data){
                            _this.schoolInfo[item]=json.data[item];
                        }
                     }).autoRun("login","error");
                     _this.updateLoadingStatus({isLoading:false});
                 }).catch(function(error) {
                     _this.updateLoadingStatus({isLoading:false});
                     util.checkAjaxError(error);
                 });
            },
            handleSuccess(res,file){
                setTimeout(()=>{
                    if(res.status == 'success'){
                        this.$emit('refresh');
                        this.$Message.success("上传成功");
                    } else {
                        this.$Message.error(res.message);
                    }
                    this.updateLoadingStatus({isLoading:false});
                },1000);
            },
            handlePicSuccess(res,file){
                setTimeout(()=>{
                    if(res.status == 'success'){
                        this.addResultForm.data.resFile.push(res.data.filePath);
                        this.$Message.success("上传成功");
                        this.$refs.addResultForm.validateField('resFile');
                    } else {
                        this.$Message.error(res.message);
                    }
                    this.updateLoadingStatus({isLoading:false});
                },1000);
            },
            handleOfferSuccess(res,file){
                setTimeout(()=>{
                    if(res.status == 'success'){
                        this.addResultForm.data.offer=res.data.filePath;
                        this.$Message.success("上传成功");
                        this.$refs.addResultForm.validateField('offer');
                    } else {
                        this.$Message.error(res.message);
                    }
                    this.updateLoadingStatus({isLoading:false});
                },1000);
            },
            handleFormatError(){
                this.$Message.error("需使用pdf格式");
            },
            handlePicFormatError(){
                this.$Message.error("需使用png、jpg、jpeg、pdf格式");
            },
            handleMaxSize(){
                this.$Message.error("文件大小不能超过10MB");
            },
            handle2MaxSize(){
                this.$Message.error("文件大小不能超过2MB");
            },
            onProgress(){
                this.updateLoadingStatus({isLoading:true});
            },
            onUploadError(e){
                this.$Message.error(e.toString());
                this.updateLoadingStatus({isLoading:false});
            },
            delResPicFile(index){
                this.addResultForm.data.resFile.splice(index,1);
            },
            showAddResult(){
                console.log(this.$refs);
                this.$refs.addResultForm.resetFields();
                this.addResultForm.update={};
                if(!this.addResultForm.dropList.length){
                    this.getResultDrop();
                }
                this.addResultForm.visible = true;
            },
            showUploadApplyFile(){
                this.uploadApplyFileForm.visible = true;
            },
            appendUpItem(){
                if(this.schoolInfo.xxAttachmentList.length<9){
                    this.schoolInfo.xxAttachmentList.push({type:'',remarks:''});
                } else {
                    this.$Message.warning('最多添加9条');
                }
            },
            addResultClose(){
                this.addResultForm.visible = false;
            },
            onTypeChnaged(item){
                let show = false;
                let req = false;
                const oldisAdmitted = this.addResultForm.isAdmitted;
                if(['Admitted','Conditional'].indexOf(item.value)>-1){
                    show = true;
                    req = true;
                } else if(item.value=='Other'){
                    show = true;
                }
                this.addResultForm.offerShow = show;
                let old = this.addResultForm.ruleValidate.offer[0].required;
                if (old !== req && show){
                    this.addResultForm.offerShow = !show;
                    this.$nextTick(()=>{
                        this.addResultForm.offerShow = show;
                        this.addResultForm.ruleValidate.offer =[Object.assign({required:req},this.addResultForm.ruleValidate.offer[0])];
                    });
                }
                let isAdmitted =false;
                
                if(['Admitted'].indexOf(item.value)>-1){
                    isAdmitted = true;
                }
                this.addResultForm.isAdmitted = isAdmitted;
                if(isAdmitted){
                    this.addResultForm.ruleValidate=Object.assign({},this.addResultForm.ruleValidate,this.addResultForm.ruleValidate2);
                } else {
                    this.addResultForm.ruleValidate=Object.assign({college:[],program:[],enterYear:[],duration:[],fullPartTime:[],scholarship:[],isAccept:[]},this.addResultForm.ruleValidate);
                }
                if(oldisAdmitted!=isAdmitted){
                    this.addResultForm.isAdmitted = !isAdmitted;
                    this.$nextTick(()=>{
                        this.addResultForm.isAdmitted = isAdmitted;
                    });
                }
            },
            addResultOk(){
                this.$refs.addResultForm.validate(ok=>{
                    if(ok){
                        let data = Object.assign({},this.addResultForm.data);
                        data.resFile.forEach((item,index)=>{
                            data[`resultAttachmentList[${index}].type`]='result';
                            data[`resultAttachmentList[${index}].filePath`]=item;
                        });
                        data['offerAttachment.type'] = 'offer';
                        data['offerAttachment.filePath'] = data.offer;
                        delete data.resFile;
                        delete data.offer;
                        data.choiceId=this.schoolInfo.id;
                        data.publishDate = (new Date(data.publishDate)).format('yyyy-MM-dd hh:mm:ss');
                        console.info(this.addResultForm.data,data);
                        if(this.addResultForm.update.id){
                            data.id = this.addResultForm.update.id;
                        }
                        util.ajax.post(nozzle.xxChoiceSchool.saveResult,data).then(res=>{
                            util.checkAjaxJson(res).thenSuccess(json=>{
                                this.$Message.success(json.message);
                                this.addResultClose();
                                this.$emit('refresh');
                            }).autoRun("login","error");
                        }).catch(err=>{
                            util.checkAjaxError(err);
                        });
                    }
                });
            },
            getResultDrop(){
                this.getDictData('xx_result_type',data=>{
                    this.addResultForm.dropList=data;
                });
            },
            getDictData(type,cb){
                util.ajax.get(nozzle.basicData.dictListData,{params:{type}}).then(res=>{
                    util.checkAjaxJson(res).thenSuccess(json=>{
                        cb(json.data);
                    }).autoRun("login","error");
                }).catch(error=>{
                    util.checkAjaxError(error);
                });
            },
            removeFile(item){
                this.$Modal.confirm({
                    title: '删除附件',
                    content: '您确定要删除此附件吗？删除后将无法恢复',
                    onOk: () => {
                        const data = {id:item.id};
                        util.ajax.post(nozzle.xxChoiceSchool.deleteAttachment,data).then((res)=>{
                        util.checkAjaxJson(res).thenSuccess(json=>{
                            this.$emit('refresh');
                        }).autoRun("login","error");
                        this.updateLoadingStatus({isLoading:false});
                    }).catch(error => {
                        this.updateLoadingStatus({isLoading:false});
                        util.checkAjaxError(error);
                    });
                    }
                });
            },
            removeFileFake(item,index){
                this.schoolInfo.xxAttachmentList.splice(index,1);
            },
            openFile(item){
                window.open(item.filePath);
            },
            showREdit(item){
                this.$refs.addResultForm.resetFields();
                if(!this.addResultForm.dropList.length){
                    this.getResultDrop();
                }
                this.addResultForm.data={
                    resFile:item.resultAttachmentList.map(it=>it.filePath),
                    offer:item.offerAttachment.filePath,
                    remarks:item.remarks,
                    status:item.status,
                    publishDate:item.publishDate,
                    isAccept:item.isAccept,
                    college:item.college,
                    branch:item.branch,
                    program:item.program,
                    scholarship:item.scholarship,
                    fullPartTime:item.fullPartTime,
                    enterYear:item.enterYear,
                    duration:item.duration,
                };
                this.addResultForm.update = item;
                this.addResultForm.visible = true;
            },
            showResDetail(item){
                this.addResultForm.data={
                    resFile:item.resultAttachmentList.map(it=>it.filePath),
                    offer:item.offerAttachment.filePath,
                    remarks:item.remarks,
                    status:item.status,
                    publishDate:item.publishDate
                };
                this.addResultForm.readvisible = true;
            },
            showRDel(item){
                this.$Modal.confirm({
                    title: '删除附件',
                    content: '您确定要删除此附件吗？删除后将无法恢复',
                    onOk: () => {
                        const data = {id:item.id};
                        util.ajax.post(nozzle.xxChoiceSchool.deleteResult,data).then((res)=>{
                        util.checkAjaxJson(res).thenSuccess(json=>{
                                this.$emit('refresh');
                            }).autoRun("login","error");
                            this.updateLoadingStatus({isLoading:false});
                        }).catch(error => {
                            this.updateLoadingStatus({isLoading:false});
                            util.checkAjaxError(error);
                        });
                    }
                });
            },
            hasPer(uid){
                if(this.userInfo.admin){
                    return true;
                }
                if(uid==this.userInfo.id){
                    return true;
                }
                return false;
            },
            makeFull(){
                while(this.schoolInfo.xxChoiceSchoolDetailList.length<3){
                    this.schoolInfo.xxChoiceSchoolDetailList.push({college:'',program:'',id:''});
                }
            },
            atLeastOne(){
                if(this.schoolInfo.xxAttachmentList && this.schoolInfo.xxAttachmentList.length<1){
                    this.schoolInfo.xxAttachmentList.push({type:'',remarks:''});
                }
            },
            CheckAndClose(){
                let has = this.schoolInfo.xxAttachmentList.some(item=>{
                    return item.id;
                });
                if(has){
                    this.uploadApplyFileForm.visible=false;
                } else {
                    this.$Message.warning("申请材料至少需要一项");
                }
            }
            
         },
         mounted() {
            var _this=this;
            if(this.schoolInfo.id==""){
               this.showModule=false;
            }
            this.makeFull();
            this.atLeastOne();
            if(!this.xx_result_file_list.length){
                this.getDictData('xx_result_file',data=>{
                    this.xx_result_file_list = data;
                    xx_result_file_list = data;
                });
            }
        },
        components:{
            vSelect
        },
        computed:{
            ...mapState(['userInfo']),
            admin(){
                return this.userInfo.admin;
            },
            roleIds(){
                return this.userInfo.roleId.split(',');
            },
            statusText(){
                let v = this.statusMap[this.schoolInfo.status];
                if(v){
                    return v;
                }
                return this.statusMap['-1'];
            },
        },
        watch:{
            'schoolInfo.xxChoiceSchoolDetailList'(){
                this.makeFull();
            },
            'schoolInfo.xxAttachmentList'(){
                this.atLeastOne();
            }
        }
    }
</script>
<style scoped lang="less">
@acolor:#44bcb7;

.contentBox{
    border-bottom: 1px solid #e0e0e0;
    .basicInfo{
        width:150px;
        text-align: center;
        padding: 20px 0px;
        .logo{
            width: 80px;
            height: 80px;
            margin: 0px auto;
            overflow: hidden;
            background-color: #f7f7f7;
            border:1px solid #e0e1e2;
            border-radius: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .name{
            font-size: 18px;
            max-height: 50px;
            overflow: hidden;
        }
        .index{
            margin: 0px auto;
            margin-top: 10px;
            border:1px solid #e0e0e0;
            width: 30px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            border-radius: 100%;
        }
        
    }
    .main{
        padding: 20px 20px 10px;
        float: left;
        min-width: 560px;
        max-width: 800px;
        .infoList{
            min-height: 30px;
            font-size: 12px;
            line-height: 30px;
            margin-bottom: 10px;
            position: relative;
            &.sec{
                label{
                    width: 80px;
                }
                .detail{
                    padding-left: 108px;
                }
            }
            .red{
                color: #f00;
            }
            label{
                position: absolute;
                width: 100px;
                text-align: right;
                color:#aaa;
            }
            .detail{
                padding-left: 120px;
                word-wrap: break-word;
            }
            .moreBtn{
                text-decoration: underline;
                color: #44bcb7;
                font-size: 12px;
                margin-left: 10px;
            }
        }
        .operateList{
            margin-top: 20px;
            .ivu-btn{
                min-width: 100px;
                margin-right: 10px;
            }
            .editBtn{
                text-decoration: underline;
                color: #444;
                margin-left: 30px;
            }
            .detail{
                position: relative;
                .statusText{
                    position: absolute;
                    right: 0;
                    bottom: 100px;
                    display: block;
                    width: 100px;
                    height: 100px;
                    color:#dd6569;
                    text-align: center;
                    padding-top: 35px;
                    background: url("../../assets/images/detail/tuzhang.png");
                    background-size: contain;
                    white-space: nowrap;
                    overflow: hidden;
                    letter-spacing: -0.5px;
                }
            }
            
        }
    }
    .res-list{
        float: left;
        width: 142px;
        height: 322px;
        position: relative;
        left: 0px;
        &-inner{
            position: absolute;
            top: 50%;
            transform:translateY(-50%);
            .s-item{
                height: 36px;
                &:hover{
                    .type-ctrl{
                        display: inline-block;
                    }
                }
            }
            @he:42px;
            .type{
                display: inline-block;
                width: 82.9px;
                height: @he;
                position: relative;
                &.Admitted{
                    color: #8ae58a;
                }
                &.Deny{
                    color: #e58a8d;
                }
                &.Defer{
                    color: #8ab7e5;
                }
                &.Waitlist{
                    color: #ffde66;
                }
                &.Conditional{
                    color: #e5aa73;
                }
                &.Withdraw{
                    color: #c8cccc;
                }
                &.Cancel{
                    color: #646666;
                }
                &.Other{
                    color: #e58ae5;
                }
                .iconfont{
                    display: inline-block;
                    font-size: 28px;
                    font-weight: 100;
                }
                .text{
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    font-size: 12px;
                    line-height: @he;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .type-ctrl{
                display: none;
                position: relative;
                top: -6px;
                left: 4px;
                span{
                    cursor: pointer;
                    color: #3486f6;
                }
            }
        }
    }
}
.ch-result-modal{
    .img-holder{
        width: 80px;
        height: 80px;
        background-color: #f1f1f1;
        border: 1px solid #e0e0e0;
        display: inline-block;
        border-radius: 4px;
    }
    .ctrl-up{
        display: inline-block;
        position: relative;
        bottom: 5px;
        left: 5px;
        .tips{
            color: #999;
        }
    }
    .f-list{
        &>li{
            height: 20px;
            line-height: 20px;
        }
        &+.ctrl-up{
            position: initial;   
        }
        .del-btn{
            margin-left: 10px;
        }
    }
}
.ch-detail{
    .green{
        color: @acolor;
        &.oneline{
            display: block;
            margin: 0;
        }
    }
}
.upapply-form-modal{
    .form-item{
        &+.form-item{
            margin-top: 15px; 
        }
        label{
            color: #aaa;
        }
        .remarks{
            display: inline-block;
            width: 100px;
        }
    }
    .append-file-btn{
        margin: 15px 0 0 35px;
    }

    .tool-tips{
        display: inline-block;
    }
}

.fileicon{
    background: url("../../assets/images/detail/proto.svg") no-repeat center center;
    background-size: 16px;
    width: 30px;
    height: 30px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    &:hover{
        &>a{
            display: block;
        }
    }
    &>a{
        display: none;
        font-size: 12px;
        position: absolute;
        top: 31px;
        width: inherit;
        left: 1px;
        text-align: center; 
        background: none;
    }
}

.requiredstar:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
}
.placeholdpx:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    opacity: 0;
}

</style>


<style lang="less">
.contentBox{
    .editMode{
        padding-bottom: 50px;
        .ivu-select-dropdown{
            max-height: 120px;
        }
    }
}
</style>
