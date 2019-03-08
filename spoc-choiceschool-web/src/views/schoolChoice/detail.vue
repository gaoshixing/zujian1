<template>
<div class="contentBox">
    <menubar>
        <span slot="menu" class="slotContent">
            <a href="javascript:void(0)">{{$t("Common.detailTitle")}}</a>
        </span>
        <span slot="operate">
            <!-- <Button type="primary" icon="ios-plus-outline">{{$t('upLoadFile')}}</Button> -->
            <!-- <span v-if="(inRoleArray('6') || inRoleArray('7')) && xxStudent.phase=='2'"> -->
            <span v-if="(inRoleArray('6') || inRoleArray('7'))">
                <Button type="primary" @click="addSchool">{{$t("AddSchool")}}</Button>
            </span>
            <span v-if="(inRoleArray('8') || inRoleArray('9')) && xxStudent.assginerId==userInfo.id">
                <Button type="primary" @click="addSchool">{{$t("AddSchool")}}</Button>
            </span>
            <!-- <span :class="{hide:!(inRoleArray('7') || inRoleArray('9'))}"><Button type="primary" @click="transferFuc">{{$t("Transfer")}}</Button></span> -->
            <span v-if="(inRoleArray('4') && xxStudent.isAssgin)">
                <Button type="primary" @click="distributeClick">{{$t("Assign")}}</Button>
            </span>
            <span v-else-if="(inRoleArray('5') || inRoleArray('6') || inRoleArray('7')) && xxStudent.isAssgin">
                <Button type="primary" @click="distributeClick">{{$t("UsAssign")}}</Button>
            </span>
            <span>
                <Button type="primary" @click="showDistLog">分配日志</Button>
            </span>

            <Upload :action="attUploadUrl" :data="{objectId:xxStudent.id,dirName:'files',type:'protocal',fileName:mainFile1Name()}" name="files" :on-success="uploadSuccess" class="proto-upload" :format="['pdf','jpg','png','gif','jpeg']" :show-upload-list="false" :max-size="10000000" :on-format-error="uploadFormatError" :on-progress="onUploadProgress" :on-error="onUploadError" :on-exceeded-size="uploadMaxSize">
                <Button type="primary">上传协议</Button>
            </Upload>
            <Upload :action="attUploadUrl" :data="{objectId:xxStudent.id,dirName:'files',type:'confirm',fileName:mainFile2Name()}" name="files" :on-success="uploadSuccess" class="proto-upload" :format="['pdf','jpg','png','gif','jpeg']" :show-upload-list="false" :max-size="10000000" :on-format-error="uploadFormatError" :on-progress="onUploadProgress" :on-error="onUploadError" :on-exceeded-size="uploadMaxSize">
                <Button type="primary">上传提交确认</Button>
            </Upload>
        </span>
    </menubar>
    <div class="userInfoBox">
        <div class="basicInfo clearfix">
            <div class="infoList" :style="{width:examListWidthPlus}">
                <p>
                    {{xxStudent.lastName}}&nbsp;&nbsp;{{xxStudent.firstName}}
                    <ul class="files-list">
                        <template v-for="(file,index) in xxStudent.xxAttachmentList">
                            <Tooltip class="tool-tips" :content="file | showFname" :key="index" placement="top">
                             <li class="fileicon" @click.stop="openFile(file)">
                                <a @click.stop.prevent="removeFile(file)" v-if="hasPer(file.creator)">删除</a>
                            </li>
                            </Tooltip>
                        </template>
                    </ul>
                </p>
                <span class="bl bs">{{xxStudent.enName}}</span>
            </div>
            <div class="infoList" :style="{width:examListWidthPlus}">
                <p>{{this.currGPA.gpa?this.currGPA.gpa:'N/A'}}</p>
                <span class="bl">GPA</span>
            </div>
            <div class="infoList" :style="{width:examListWidthPlus}" v-for="item in xxEaxminfoList" v-show="item.type" :key="item.id">
                <p>{{item.totalScore}}</p>
                <span class="bl" :rel="item.type">{{filterEaxmineType(item.type)}}</span>
            </div>
        </div>
        <ul class="otherInfoBox">
            <li class="otherInfoList">
                <label>{{$t("XxStudent.apply")}}</label>
                <div class="infoDetail">{{xxStudent.applyName}}</div>
            </li>
            <li class="otherInfoList">
                <label>{{$t("XxApplyobject.intendedMajor")}}</label>
                <div class="infoDetail">{{xxApplyobject.intendedMajor}}</div>
            </li>
        </ul>
        <div class="studentInfoBox" :class="{hide:hideMoreInfo}">
            <div class="studentInfoList">
                <div class="tit">{{$t("Common.GENERALINFORMATION")}}</div>
                <div class="detailInfo clearfix">
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.firstName')}}：</label>
                        <span class="detail">{{xxStudent.firstName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.lastName')}}：</label>
                        <span class="detail">{{xxStudent.lastName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.firstNamePinYin')}}：</label>
                        <span class="detail">{{xxStudent.firstNamePinYin}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.lastNamePinYin')}}：</label>
                        <span class="detail">{{xxStudent.lastNamePinYin}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.enName')}}：</label>
                        <span class="detail">{{xxStudent.enName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.gender')}}：</label>
                        <span class="detail">{{xxStudent.gender=='m'?$t("male"):$t("female")}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.skypeId')}}：</label>
                        <span class="detail">{{xxStudent.skypeId}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">微信号：</label>
                        <span class="detail">{{xxStudent.wechat}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.email')}}：</label>
                        <span class="detail">{{xxStudent.email}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.cellNumber')}}：</label>
                        <span class="detail">{{xxStudent.cellNumber}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">手机号（备用）：</label>
                        <span class="detail">{{xxStudent.phone}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.parentContactNumber')}}：</label>
                        <span class="detail">{{xxStudent.parentContactNumber}}</span>
                    </div>
                    <div class="infoList">
                        <label   class="label">{{$t('XxStudent.address')}}：</label>
                        <span class="detail">{{xxStudent.address}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.grade')}}：</label>
                        <span class="detail">{{xxStudent.grade}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.postcode')}}：</label>
                        <span class="detail">{{xxStudent.postcode}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.apply')}}：</label>
                        <span class="detail">{{xxStudent.applyName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxStudent.amount')}}：</label>
                        <span class="detail">{{xxStudent.amount}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">计划申请季年份：</label>
                        <span class="detail">{{xxStudent.applyTime}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">国家：</label>
                        <span class="detail">{{xxStudent.countryName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">省/州：</label>
                        <span class="detail">{{xxStudent.provinceName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">城市：</label>
                        <span class="detail">{{xxStudent.cityName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">姓名（家长1）：</label>
                        <span class="detail">{{xxStudent.fatherName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">单位和职位（家长1）：</label>
                        <span class="detail">{{xxStudent.fatherJob}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">手机（家长1）：</label>
                        <span class="detail">{{xxStudent.fatherPhone}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">邮箱（家长1）：</label>
                        <span class="detail">{{xxStudent.fatherEmail}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">微信号（家长1）：</label>
                        <span class="detail">{{xxStudent.fatherWechat}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">姓名（家长2）：</label>
                        <span class="detail">{{xxStudent.motherName}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">单位和职位（家长2）：</label>
                        <span class="detail">{{xxStudent.motherJob}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">手机（家长2）：</label>
                        <span class="detail">{{xxStudent.motherPhone}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">邮箱（家长2）：</label>
                        <span class="detail">{{xxStudent.motherEmail}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">微信号（家长2）：</label>
                        <span class="detail">{{xxStudent.motherWechat}}</span>
                    </div>
                </div>
            </div>
            <div class="studentInfoList" :class="{hide:inRoleArray('8') || inRoleArray('9') || !xxInnerinfo}">
                <div class="tit">{{$t("Common.INNERINFORMATION")}}</div>
                <div class="detailInfo clearfix">
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.refundRatio')}}：</label>
                        <span class="detail">{{xxInnerinfo.refundRatio}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">约分保排名：</label>
                        <span class="detail">{{xxInnerinfo.rank}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.type')}}：</label>
                        <span class="detail">{{xxInnerinfo.type}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.saler')}}：</label>
                        <span class="detail">{{xxInnerinfo.saler}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_sale')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherSale}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_plan')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherPlan}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_flow')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherFlow}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_essay')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherEssay}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_apply')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherApply}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_language')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherLanguage}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxInnerinfo.teacher_other')}}：</label>
                        <span class="detail">{{xxInnerinfo.teacherOther}}</span>
                    </div>
                    <div class="infoList clearFloat">
                        <label class="label">{{$t('XxInnerinfo.studentCharacter')}}：</label>
                        <span class="detail">{{xxInnerinfo.studentCharacter}}</span>
                    </div>
                    <div class="infoList clearFloat">
                        <label class="label">{{$t('XxInnerinfo.parentCharacter')}}：</label>
                        <span class="detail">{{xxInnerinfo.parentCharacter}}</span>
                    </div>
                </div>
            </div>
            <div class="studentInfoList" :class="{hide:!xxStudyinfoList.length}">
                <div class="tit">{{$t("Common.ACADEMICINFORMATION")}}</div>
                <div class="detailInfo clearfix">
                    <div class="examineBox studyInfoBox clearfix" v-for="(item,index) in xxStudyinfoList" :key="index">
                        <div class="testTitle">
                            <div :class="['typeIcon',item.type]"></div>
                            <div class="typeName">{{schoolTypesMap[item.type]}}</div>
                        </div>
                        <div class="testDetail">
                            <div class="infoList">
                                <label class="label">学校全称（中文）：</label>
                                <span class="detail">{{item.highSchool}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">学校全称（英文）：</label>
                                <span class="detail">{{item.highSchoolEn}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">毕业国家：</label>
                                <span class="detail">{{item.countryName}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">毕业省/直辖市：</label>
                                <span class="detail">{{item.provinceName}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">毕业城市：</label>
                                <span class="detail">{{item.cityName}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">入学时间（年/月）：</label>
                                <span class="detail">{{item.enterYear}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">毕业时间（年/月）：</label>
                                <span class="detail">{{item.graduationYear}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">课程体系：</label>
                                <span class="detail">{{item.course}}</span>
                            </div>
                            <div v-if="item.type=='University'">
                                <div class="infoList">
                                    <label class="label">学位：</label>
                                    <span class="detail">{{item.level}}</span>
                                </div>
                                <div class="infoList">
                                    <label class="label">专业（Major）：</label>
                                    <span class="detail">{{item.major}}</span>
                                </div>
                                <div class="infoList">
                                    <label class="label">第二专业（Major）：</label>
                                    <span class="detail">{{item.secondMajor}}</span>
                                </div>
                                <div class="infoList">
                                    <label class="label">辅修专业（Minor）：</label>
                                    <span class="detail">{{item.minorMajor}}</span>
                                </div>
                            </div>
                            <div v-else-if="item.type=='Summerschool'">
                                <div class="infoList">
                                    <label class="label">项目名称：</label>
                                    <span class="detail">{{item.projectName}}</span>
                                </div>
                                <div class="infoList">
                                    <label class="label">是否有学分（是/否）：</label>
                                    <span class="detail">{{item.isScore==1?'是':'否'}}</span>
                                </div>
                            </div>
                            <div class="infoList">
                                <label class="label">总分或平均分：</label>
                                <span class="detail">{{item.total}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">换算为GPA（分数/满分）：</label>
                                <span class="detail">{{item.gpa}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">年级排名（排名/总人数）：</label>
                                <span class="detail">{{item.rank}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">其他备注：</label>
                                <span class="detail">{{item.remarks}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="studentInfoList" :class="{hide:!xxEaxminfoList.length}">
                <div class="tit">{{$t("Common.STANDARDIZEDTESTS")}}</div>
                <div class="detailInfo clearfix">
                    <div class="examineBox clearfix" v-for="(item,index) in xxEaxminfoList" :key="index">
                        <div class="testTitle">
                            <div :class="['typeIcon',filterEaxmineType(item.type)]"></div>
                            <div class="typeName">{{filterEaxmineType(item.type)}}</div>
                            <div class="expectFlag">{{item.expectFlag?$t("XxExamScore.expectFlag"):""}}</div>
                        </div>
                        <div class="testDetail">
                            <div class="infoList">
                                <label class="label">Total Score：</label>
                                <span class="detail">{{item.totalScore}}</span>
                            </div>
                            <div class="infoList">
                                <label class="label">Year/Month：</label>
                                <span class="detail">{{item.examTime}}</span>
                            </div>
                            <div class="infoList" v-for="examScore in item.xxExamScoreList" :key="examScore.label">
                                <label class="label">{{examScore.label}}：</label>
                                <span class="detail">{{examScore.score}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="studentInfoList" :class="{hide:!xxSkillinfoList.length}">
                <div class="tit">{{$t("Common.EXTRACURRICULARACTIVITIES")}}</div>
                <div class="detailInfo clearfix">
                    <div class="examineBox skillBox clearfix" v-for="(item,index) in xxSkillinfoList" :key="index">
                        <div class="testTitle">
                            <div :class="['typeIcon',filterSkillInfo(item.type)]"></div>
                            <div class="typeName">{{item.type | filterSkillInfo}}</div>
                        </div>
                        <div class="testDetail">
                            <div class="infoList">
                                <span class="detail">{{item.content}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="studentInfoList" :class="{hide:!xxApplyobject}">
                <div class="tit">{{$t("Common.SCHOOLSEARCH")}}</div>
                <div class="detailInfo applyobjectBox clearfix">
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.intendedMajor')}}：</label>
                        <span class="detail">{{xxApplyobject.intendedMajor}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.preliminarySchool')}}：</label>
                        <span class="detail">{{xxApplyobject.preliminarySchool}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.schoolPreference')}}：</label>
                        <span class="detail">{{xxApplyobject.schoolPreference}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.hardestAdvantageous')}}</label>
                        <span class="detail">{{xxApplyobject.hardestAdvantageous}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.help')}}</label>
                        <span class="detail">{{xxApplyobject.help}}</span>
                    </div>
                    <div class="infoList">
                        <label class="label">{{$t('XxApplyobject.otherQuestion')}}</label>
                        <span class="detail">{{xxApplyobject.otherQuestion}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="moreMessage">
        <a href="javascript:void(0)" class="moreBtn" @click="showMoreMessage">{{moreText}}</a>
    </div>
    <div class="headerInfo">
        <div class="iconBox"></div>
        <div class="title">
            <p>{{$t("SchoolList")}}<span class="curAssigner" v-html="currAssigner"></span></p>
            <div class="staticsInfo">
                {{$t("NeedChoice")}}<span class="checked">{{xxStudent.amount+xxStudent.freeAmount+xxStudent.moneyAmount}}</span>{{$t("School")}}，{{$t("Completed")}}<span class="passed">{{xxStudent.signCount?xxStudent.signCount:0}}</span>{{$t("School")}}，{{$t("Unfinished")}}<span class="unpassed">{{xxStudent.amount+xxStudent.freeAmount+xxStudent.moneyAmount-(xxStudent.signCount?xxStudent.signCount:0)}}</span>{{$t("School")}}
            </div>
        </div>
    </div>
    <div class="indexBox" v-if="(xxStudent.amount+xxStudent.freeAmount+xxStudent.moneyAmount)>0">
        <div class="list" @click="scrollBodyFuc(index)" v-for="(item,index) in (xxStudent.amount+xxStudent.freeAmount+xxStudent.moneyAmount)" :class="{noneStatus:!xxChoiceSchoolList[index],completeStatusList:xxChoiceSchoolList[index] && xxChoiceSchoolList[index].status=='7'}" :key="index">
            <span>{{item}}</span>
            <div class="status">
                <div v-if="xxChoiceSchoolList[index]">
                    <span class="deleteStatus" :title="$t('HasDeleted')" v-if="xxChoiceSchoolList[index].status=='4'"></span>
                    <span class="signedStatus" :title="$t('HasSigned')" v-else-if="xxChoiceSchoolList[index].status=='7'"></span>
                    <span class="checkedStatus" :title="$t('HaveAlternative')" v-else-if="xxChoiceSchoolList[index].status=='3'"></span>
                    <span class="choiceStatus" :title="$t('ChooseSchool')" v-else></span>
                </div>
                <span v-else class="noneStatus"></span>
            </div>
        </div>
    </div>
    <div class="schoolBox">
        <div class="schoolList" :ref="'schoolList'+index"  v-scrollto="item" v-for="(item,index) in xxChoiceSchoolList" :key="item.id">
            <schoolinfo 
                :studentId="studentId"
                :xxStudent="xxStudent"
                :schoolInfo="item" 
                :index="index+1" 
                :roleId="userInfo.roleId"
                :checkFlag="checkFlag"
                :groupId="groupId"
                :userId="userInfo.id"
                :batchList="batchList"
                :difficultyList="difficultyList"
                :apply="xxStudent.apply"
                :is-g="isG"
                @refresh="refreshStudent"
                @alertOperationInfo="alertOperationInfo(item.xxChoiceLogList)"
                @alertCommunication="alertCommunication(item.xxChatList,item.id)">
            </schoolinfo>
        </div>
        <div class="noneData" v-show="xxChoiceSchoolList.length=='0'">
            <span>{{$t("NoneSchoolData")}}</span>
        </div>
    </div>
    <Modal v-model="showDistLogVisible" title="分配日志" width="800">
        <div class="showModule" style="max-height:400px;overflow:auto;">
            <Table size="small" stripe :data="xxStudent.xxAssginList" :columns="distLogColumns" border :no-data-text="$t('NoOperationRecord')"></Table>
        </div>
        <div slot="footer" style="border-top:0px;"></div>
    </Modal>
    <Modal v-model="showLog" :title="$t('OperationLog')" width="800">
        <div class="showModule" style="max-height:400px;overflow:auto;">
            <Table size="small" stripe :data="choiceLogData" :columns="choiceLogColumns" border :no-data-text="$t('NoOperationRecord')"></Table>
        </div>
        <div slot="footer" style="border-top:0px;"></div>
    </Modal>
    <Modal v-model="showChat" :title="$t('CommunicationRecord')" width="800">
        <div class="showModule" :class="{hide:addCommunicate}" style="min-height:200px;max-height:400px;overflow:auto;">
            <Table size="small" stripe :data="communicationData" :columns="communicationColumns" border :no-data-text="$t('NoCommunicationRecord')"></Table>
        </div>
        <div class="addModule" :class="{hide:!addCommunicate}" style="min-height:200px">
            <Form ref="communication" :rules="communicationRules" :model="communication" :label-width="150">
                <FormItem :label="$t('XxChat.chatUser')" prop="chatUser">
                    <Input type="text" v-model="communication.chatUser" style="width:500px"></Input>
                </FormItem>
                <FormItem :label="$t('XxChat.message')" prop="message">
                    <Input type="textarea" v-model="communication.message" style="width:500px"></Input>
                </FormItem>
                <FormItem :label="$t('XxChat.chatTime')" prop="chatTime">
                     <DatePicker type="datetime" v-model="communication.chatTime" format="yyyy-MM-dd HH:mm:ss" style="width: 500px" :clearable="datepick.clearable" :options="datepick.options"></DatePicker>
                </FormItem>
                <FormItem :label="$t('XxChat.remarks')" prop="remarks">
                    <Input type="textarea" v-model="communication.remarks" style="width:500px"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="border-top:0px;">
            <span :class="{hide:addCommunicate}">
                <Button type="ghost" @click="addCommunicate=true">{{$t('Common.add')}}</Button>
                <Button type="primary" @click="showChat=false">{{$t('Common.ensure')}}</Button>
            </span>
            <span :class="{hide:!addCommunicate}">
                <Button type="ghost" @click="addCommunicate=false">{{$t('Common.cancel')}}</Button>
                <Button type="primary" @click="addCommunicateFuc('communication')">{{$t('Common.ensure')}}</Button>
            </span>
        </div>
    </Modal>
    <Modal v-model="assignBox" 
        :mask-closable="false"
        :title="$t('Assign')" 
        width="600">
        <div class="teacherBox">
            <Radio-group v-model="assignUser">
                <Radio v-for="item in assignTeacherList" :key="item.teacherId" :label="item.teacherId+','+item.teacherName">{{item.teacherName}}</Radio>
            </Radio-group>
        </div>
        <div slot="footer">
            <Button type="ghost" size="large" @click="assignBox=false">{{$t('Common.cancel')}}</Button>
            <Button type="primary" size="large" @click="ensureAssign">{{$t('Common.ensure')}}</Button>
        </div>
    </Modal>
    <Modal v-model="transferBox" 
        :mask-closable="false"
        :title="$t('Transfer')" 
        width="600">
        <div class="teacherBox">
            <Radio-group v-model="transferUser">
                <Radio v-for="item in transferList" :key="item.teacherId" :label="item.teacherId+','+item.teacherName">{{item.teacherName}}</Radio>
            </Radio-group>
        </div>
        <div slot="footer">
            <Button type="ghost" size="large" @click="transferBox=false">{{$t('Common.cancel')}}</Button>
            <Button type="primary" size="large" @click="ensureTransfer">{{$t('Common.ensure')}}</Button>
        </div>
    </Modal>
    <Modal v-model="confirmAssign" 
        :mask-closable="false"
        :title="$t('GroupTips')" 
        width="500">
        <div class="assignedTips">
            该学生已经分配，是否需要再次进行分配？
        </div>
        <div slot="footer">
            <Button type="ghost" size="large" @click="confirmAssign=false">{{$t('Common.cancel')}}</Button>
            <Button type="primary" size="large" @click="ensureReAssign">{{$t('Common.ensure')}}</Button>
        </div>
    </Modal>
    <div class="scrolltop" v-show="showScroll">
        <div class="part1" v-if="showAddSchool" @click="addSchool">
            <i class="iconfont icon-tianjia1"></i>
            <p>添加学校</p>
        </div>
        <div class="line" v-if="showAddSchool"></div>
        <div class="part2" @click="scrollTop">
            <i class="iconfont icon-huidingbu"></i>
            <p>回顶部</p>
        </div>
    </div>
</div>
</template>
<script>
import util from '../../libs/js/util.js';
import nozzle from "../../libs/interface.js";
import MenuBar from '../../modules/breadcrumb/menuBar';
import SchoolInfo from '../../modules/school/detail';
import {mapMutations,mapState} from 'vuex';
export default {
    data() {
        return {
            showScroll:false,
            checkFlag:"",
            hideMoreInfo:true,
            moreText:this.$t("MoreMessage"),
            studentId:"",
            xxStudent:{
                amount:0,
                signCount :0
            },
            xxInnerinfo:{},//内部信息
            xxStudyinfoList:[],//学习经历
            xxChoiceSchoolList: [],//选校列表
            xxEaxminfoList:[],//考试列表
            xxSkillinfoList:[],//工作经历
            xxApplyobject:{},//申请目标
            xxChatList: [], //沟通记录
            difficultyList:[],//申请难度
            batchList:[],//申请批次
            showLog: false,
            showDistLogVisible:false,
            attUploadUrl:nozzle.basicData.uploadFile,
            upload:{
                url:nozzle.xxStudent.uploadFile,
            },
            schoolTypesMap:{
                'Elementaryschool':'小学',
                'Highschool':'高中',
                'University':'大学',
                'Summerschool':'夏校'
            },
            applyStatus:{
                0:this.$t("undergraduate"),
                1:this.$t("master"),
                2:this.$t("Dr"),
                3:this.$t("other"),
            },
            choiceLogColumns: [
                {
                    title: this.$t('XxChoiceLog.id'),
                    type: '序号',
                    width: 80,
                    align: 'center',
                    render:this.logIndexRenderFuc
                },
                {
                    title: this.$t('XxChoiceLog.optUser'),
                    key: 'optUser'
                },
                {
                    title: this.$t('XxChoiceLog.type'),
                    key: 'type',
                    render :this.OperationRenderFuc
                },
                {
                    title: this.$t('XxChoiceLog.optTime'),
                    key: 'optTime'
                }
            ],
            choiceLogData: [],
            distLogColumns:[
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center',
                },
                {
                    title: '分配人',
                    key: 'createrName'
                },
                {
                    title: '被分配人',
                    key: 'assginer',
                },
                {
                    title:'操作',
                    key:'phase'
                },
                {
                    title: this.$t('XxChoiceLog.optTime'),
                    key: 'assignTime'
                }
            ],
            showChat:false,
            communicationColumns:[
                {
                    title: this.$t('XxChat.id'),
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: this.$t('XxChat.chatUser'),
                    key: 'chatUser'
                },
                {
                    title: this.$t('XxChat.message'),
                    key: 'message'
                },
                {
                    title: this.$t('XxChat.chatTime'),
                    key: 'chatTime'
                },
                {
                    title: this.$t('XxChat.remarks'),
                    key:'remarks'
                }
            ],
            communicationData:[],
            assignBox:false,//分配
            assignTeacherList:[],//分配列表
            assignUser:"",
            transferBox:false,//转让
            transferList:[],//转让列表
            transferUser:"",//转让教师信息
            examListWidth:"25%",
            examListWidthPlus:'20%',
            newSchoolInfo:{
                id: "",
                isNewRecord: false,
                remarks: "",
                studentId: "",
                schoolId: "",
                schoolName: "",
                gradschoolId:'',
                gradeSchoolEnName:'',
                majorId: "",
                majorName: "",
                difficulty: "",
                difficultyName:"",
                batch: "",
                batchName:"",
                logoUrl:"",
                link: "",
                deadline: "",
                status: "0",
                requiredFlag: "",
                assginerId: "",
                assginer: "",
                assignTime: "",
                xxChatList: [],
                xxChoiceLogList: [],
                xxChoiceSchoolDetailList:[]
            },
            communication:{//沟通信息
                choiceId:"",
                chatUser:"",
                message:"",
                remarks:"",
                chatTime:""
            },
            addCommunicate:false,
            communicationRules:{
                chatUser:[
                    { required: true, message: '沟通对象不能为空', trigger: 'blur' }
                ],
                message:[
                    { required: true, message: '沟通内容不能为空', trigger: 'blur' }
                ],
                chatTime:[
                    { required: true, type:'object', message: '沟通时间不能为空', trigger: 'change' }
                ]
            },
            confirmAssign:false,
            datepick:{
                clearable:false,
                options:{
                     disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                }
            },
            groupId:'' //服务组ID
        }
    },
    filters:{
        filterSkillInfo(value){
            switch (value){
                case "1":
                    return window.WebSiteApp.$t('XxSkillinfo.honors');
                case "2":
                    return window.WebSiteApp.$t('XxSkillinfo.extraActivities');
                case "3":
                    return window.WebSiteApp.$t('XxSkillinfo.interExperience');
                case "4":
                    return window.WebSiteApp.$t('XxSkillinfo.researchExperience');
                case "5":
                    return window.WebSiteApp.$t('XxSkillinfo.skillsHobbies');
            }
        },
        innerinfoType:function(value){//客户类型
            if(value=="1"){
                return "Vip"
            }else if(value=="2"){
                return "Elite"
            }
        },
        fileName(file){
            return file.filePath.split('/').pop();
        },
        showFname(file){
            let ext = file.filePath.split('.').pop();
            return `${file.fileName}.${ext}`;
        }
    },
    computed:{
        ...mapState(['userInfo']),
        roleIds(){
            return this.userInfo.roleId.split(',');
        },
        currAssigner(){
            if(this.xxStudent.assginer){
                return `${this.$t("Currentassignment")}：${this.xxStudent.assginer}`;
            }
        },
        currGPA(){ // 当前阶段的gpa 查找符合条件的最后一个, 中学对应小学，本科新生对应中学，其他对应大学
            const sMap={
                'Highschool':'Elementaryschool',
                'Undergradnew':'Highschool'
            };
            let a = this.xxStudent.apply;
            a = sMap[a]||'University';
            let lastItem = {};
            for(let i in this.xxStudent.xxStudyinfoList){
                const item = this.xxStudent.xxStudyinfoList[i];
                if(item.type==a){
                    lastItem = item;
                }
            }
            return lastItem;
        },
        showAddSchool(){
            const a1 = this.inRoleArray('6') || this.inRoleArray('7');
            if(a1){
                return a1;
            }
            const a2 = (this.inRoleArray('8') || this.inRoleArray('9')) && (this.xxStudent.assginerId==this.userInfo.id);
            return a2;
        },
        isG(){ // 硕士/博士/硕博混申
            const a=['Graduate','Doctor','GradandDoctor'];
            return a.indexOf(this.xxStudent.apply)>=0;
        }

    },
    components: {
        'menubar': MenuBar,
        'schoolinfo': SchoolInfo
    },
    watch:{
        xxEaxminfoList:{
            handler(newValue, oldValue) {
                var examListlength=0;
                for (let i = 0; i < newValue.length; i++) {
        　　　　　　　if(newValue[i].type){
                        examListlength++;
                    }
                }
                this.examListWidth=(100/(examListlength+1))+"%";
                this.examListWidthPlus=(100/(examListlength+2))+"%";;
            },
            deep: true
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        inRoleArray(id){
            return this.roleIds.indexOf(id)>-1;
        },
        notRole(...ids){ // 判断不是这些角色
            return ids.every(id=>{
                return !this.inRoleArray(id);
            });
        },
        mainFile1Name(){
            return `${this.xxStudent.lastName}${this.xxStudent.firstName}-选校协议`;
        },
        mainFile2Name(){
            return `${this.xxStudent.lastName}${this.xxStudent.firstName}-提交确认`;
        },
        refreshStudent(){
            this.getStudentInfo({id:this.studentId});
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
        removeFile(item){
            this.$Modal.confirm({
                title: '删除附件',
                content: '您确定要删除此附件吗？删除后将无法恢复',
                onOk: () => {
                    const data = {id:item.id};
                    util.ajax.post(nozzle.xxStudent.deleteAttachment,data).then((res)=>{
                       util.checkAjaxJson(res).thenSuccess(json=>{
                           this.getStudentInfo({id:this.studentId});
                       }).autoRun("login","error");
                       this.updateLoadingStatus({isLoading:false});
                   }).catch(error => {
                       this.updateLoadingStatus({isLoading:false});
                       util.checkAjaxError(error);
                   });
                }
            });
        },
        openFile(item){
            window.open(item.filePath);
        },
        uploadSuccess(res,file){
            setTimeout(()=>{
                if(res.status == 'success'){
                    this.getStudentInfo({id:this.studentId});
                    this.$Message.success("上传成功");
                } else {
                    this.$Message.error(res.message);
                }
                this.updateLoadingStatus({isLoading:false});
            },1000);
        },
        uploadFormatError() {
            this.$Message.error("请使用图片或pdf文件");
        },
        uploadMaxSize() {
            this.$Message.error("文件大小不能超过10MB");
        },
        onUploadProgress(){
            this.updateLoadingStatus({isLoading:true});
        },
        onUploadError(error){
            this.$Message.error(error.toString());
            this.updateLoadingStatus({isLoading:false});
        },
        onScroll () {
            let parentNode = this.$el.parentNode;
            if(!parentNode){
                return;
            }
            var scrolled = parentNode.scrollTop;
            if(scrolled >= 300) {
                this.showScroll=true;
            }else {
                this.showScroll=false;
            }
        },
        scrollTop(){//返回顶部
            var parentNode=this.$el.parentNode;
            var distance = parentNode.scrollTop;
            var step = distance / 50 ;
            (function smoothUp () {
              if (distance > 0) {
                distance -= step ;
                parentNode.scrollTop = distance;
                setTimeout(smoothUp, 10);　// 设定每一次跳动的时间间隔为10ms
              } else {
                parentNode.scrollTop = 0;// 限制滚动停止时的距离
              }
            })();
        },
        logIndexRenderFuc(h,params){
            var totalNum=this.choiceLogData.length,
                curIndex=params.index;
            var index=totalNum-curIndex;
            return h('div', [
                h('span', index)
            ]);
        },
        OperationRenderFuc(h,params) {
            var _this=this;
            var type=params.row.type;
            var typeText="";
            if(type=="0"){
                typeText=_this.$t("UsChooseSchool");
            }else if(type=="1"){
                typeText=_this.$t("UsLeaderAgrees");
            }else if(type=="2"){
                typeText=_this.$t("UsLeaderDisagreed");
            }else if(type=="3"){
                typeText=_this.$t("ChinaChooseSchool");
            }else if(type=="4"){
                typeText=_this.$t("IncludedAlternative");
            }else if(type=="5"){
                typeText=_this.$t("NotOnTheAlternative");
            }else if(type=="6"){
                typeText=_this.$t("Remove");
            }else if(type=="7"){
                typeText=_this.$t("ChineseLeaderAgrees");
            }else if(type=="8"){
                typeText=_this.$t("ChineseLeaderDisagreed");
            }else if(type=="9"){
                typeText=_this.$t("ParentsAgree");
            }else if(type=="10"){
                typeText=_this.$t("ParentsDisagreed");
            }else if(type=="11"){
                typeText=_this.$t("Signing");
            }else if(type=="12"){
                typeText=_this.$t("Recover");
            }else if(type=="13"){
                typeText=_this.$t("Audit");
            }else if(type=="14"){
                typeText=_this.$t("Submit");
            }
            return h('div', [
                h('span', typeText)
            ]);
        },
        changeTimeFormat(time){
            this.communication.chatTime=time;
        },
        scrollBodyFuc(index){
            var _this=this;
            if(!this.xxChoiceSchoolList[index]){
                return false;
            }
            var schoolIndex="schoolList"+index;
            (function(name){
                var el=_this.$refs[name][0];
                var parentBody=el.parentNode;
                while(parentBody && parentBody.className!=="webMainBody"){
                    parentBody=parentBody.parentNode;
                }
                if(parentBody.className=="webMainBody"){
                    function getTop(elm){
                        var val=elm.offsetTop;
                        if(elm.offsetParent){
                            return val+getTop(elm.offsetParent);
                        }
                        return val;
                    }
                    var top=getTop(el);
                    parentBody.scrollTop=(top);
                }
            })(schoolIndex);
        },
        addSchool(){
            this.newSchoolInfo.studentId=this.studentId;
            this.newSchoolInfo.assginerId=this.xxStudent.assginerId;
            this.newSchoolInfo.assginer=this.xxStudent.assginer;
            this.xxChoiceSchoolList.push(JSON.parse(JSON.stringify(this.newSchoolInfo)));
        },
        showMoreMessage(){//显示更多信息
            this.hideMoreInfo=!this.hideMoreInfo;
            this.hideMoreInfo?this.moreText=this.$t("MoreMessage"):this.moreText=this.$t("PickUp");
        },
        filterEaxmineType(value){
            //考试类型 101：TOEFL；102：IELTS；103：ACT；104：SAT；107：GRE；108：GMAT；:109：LSAT）
            const maps={
                '100':'Other',
                '101':'TOEFL',
                '102':'IELTS',
                '103':'ACT',
                '104':'SAT',
                '105':'SAT2',
                '106':'AP',
                '107':'GRE',
                '108':'GMAT',
                '109':'LSAT',
                '1023':'SSAT',
                '1024':'TOEFLJunior'
            };
            return maps[value];
        },
        filterSkillInfo(value){
            switch (value){
                case "1":
                    return "honour";
                case "2":
                    return "kewai";
                case "3":
                    return "shixi";
                case "4":
                    return "yanjiu";
                case "5":
                    return "jineng";
            }
        },
        showDistLog(){
            this.showDistLogVisible=true;
        },
        alertOperationInfo(_xxChoiceLogList) { //弹出操作记录
            this.choiceLogData = _xxChoiceLogList;
            this.showLog = true;
        },
        alertCommunication(_xxChatList,_choiceId){//弹出沟通记录
            this.communicationData = _xxChatList;
            this.showChat = true;
            this.addCommunicate=false;
            this.communication.choiceId=_choiceId;
            this.$refs.communication.resetFields();
        },
        addCommunicateFuc(name){//添加沟通记录
            this.$refs[name].validate((valid) => {
               if (valid) {
                   var _this=this;
                   this.updateLoadingStatus({isLoading:true});
                   util.ajax.post(nozzle.xxChoiceSchool.saveXxChat,_this.communication).then(function(res){
                       util.checkAjaxJson(res).thenSuccess(function(json){
                       	_this.communication.chatTime = new Date(_this.communication.chatTime).format('yyyy-MM-dd hh:mm:ss');
                       	console.log(_this.communication.chatTime)
                           _this.communicationData.push(JSON.parse(JSON.stringify(_this.communication)));
                           _this.addCommunicate=false;
                           for(var item in _this.communication){
                               _this.communication[item]="";
                           }
                           _this.refreshStudent();
                       }).autoRun("login","error");
                       _this.updateLoadingStatus({isLoading:false});
                   }).catch(function(error) {
                       _this.updateLoadingStatus({isLoading:false});
                       util.checkAjaxError(error);
                   });
               }
           });
        },
        distributeClick(){//分配
            if(this.xxStudent.assginerId && this.xxStudent.assginerId!=this.userInfo.id){
                this.confirmAssign=true;
            }else{
                this.assignBox=true;
            }
        },
        ensureReAssign(){
            this.confirmAssign=false;
            this.assignBox=true;
        },
        ensureAssign(){//确定分配
            var assignUser=this.assignUser.split(",");
            var phase="0";
            if(this.inRoleArray('4')){//销售分配
                phase="1";
            }else if(this.inRoleArray('5') || this.inRoleArray('6') || this.inRoleArray('7')){
                phase="2";
            }
            if(!assignUser[0]){
                this.$Message.info("请选择分配人");
                return false;
            }
            if(this.xxStudent.assginerId && this.xxStudent.assginerId!=this.userInfo.id){
                this.reAssginOrTransfer({
                assginerId:assignUser[0],
                assginer:assignUser[1],
                studentId:this.studentId,
                phase:phase
                });
            } else {
                this.assginOrTransfer({
                assginerId:assignUser[0],
                assginer:assignUser[1],
                studentId:this.studentId,
                phase:phase
            });
            }
            
        },
        transferFuc(){//转让
            this.transferBox=true;
        },
        ensureTransfer(){//确定转让
            var transferUser=this.transferUser.split(",");
            if(!transferUser[0]){
                this.$Message.info("请选择转让人");
                return false;
            }
            this.reAssginOrTransfer({
                assginerId:transferUser[0],
                assginer:transferUser[1],
                studentId:this.studentId,
                phase:this.xxStudent.phase
            });
        },
        assginOrTransfer(_data){
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxStudent.assign,_data).then((res)=>{
                util.checkAjaxJson(res).thenSuccess((json)=>{
                    if(this.inRoleArray('7') || this.inRoleArray('9')){
                        this.$router.push({name:'choiceschool.schoolApproval'});
                    }else{
                        this.$router.push({name:'choiceschool.studentList'});
                    }
                }).autoRun("login","error");
                this.updateLoadingStatus({isLoading:false});
            }).catch(error => {
                this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        reAssginOrTransfer(_data){
            this.updateLoadingStatus({isLoading:true});
            util.ajax.post(nozzle.xxStudent.reassign,_data).then((res)=>{
                util.checkAjaxJson(res).thenSuccess((json)=>{
                    if(this.inRoleArray('7') || this.inRoleArray('9')){
                        this.$router.push({name:'choiceschool.schoolApproval'});
                    }else{
                        this.$router.push({name:'choiceschool.studentList'});
                    }
                }).autoRun("login","error");
                this.updateLoadingStatus({isLoading:false});
            }).catch(error => {
                this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        getStudentInfo(_data,cb){//获取学生信息
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.formChoiceSchool,{params:_data}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.xxStudent=json.data;
                    let {xxInnerinfo,xxStudyinfoList,xxChoiceSchoolList,xxEaxminfoList,xxSkillinfoList,xxApplyobject} = json.data;
                    if(xxInnerinfo){
                        _this.xxInnerinfo = xxInnerinfo;
                    }
                    if(xxStudyinfoList){
                        _this.xxStudyinfoList = xxStudyinfoList;
                    }
                    if(xxChoiceSchoolList){
                        _this.xxChoiceSchoolList = xxChoiceSchoolList.map(item=>{
                            if(item.majorId==0){
                                item.majorEnName='Undecided';
                            }
                            return item;
                        });
                    }
                    if(xxEaxminfoList){
                        _this.xxEaxminfoList = xxEaxminfoList;
                    }
                    if(xxSkillinfoList){
                        _this.xxSkillinfoList = xxSkillinfoList;
                    }
                    if(xxApplyobject){
                        _this.xxApplyobject = xxApplyobject;
                    }
                    cb&&cb(json);
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        getAssignUserList(){//获取分配人员列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.assignTeachers).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.assignTeacherList=json.data.teachers;
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        getTransferUserList(){//获取转让人员列表
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.reAssignTeachers).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.transferList=json.data.teachers;
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        getDictList(_data,_callback){//申请难度
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.basicData.dictListData,{params:_data}).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    if(typeof(_callback)=="function"){
                        _callback(json.data);
                    }
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        },
        checkUserFlag(){
            var _this=this;
            this.updateLoadingStatus({isLoading:true});
            util.ajax.get(nozzle.xxStudent.groupUserInfoData).then(function(res){
                util.checkAjaxJson(res).thenSuccess(function(json){
                    _this.groupId = json.data.groupId
                    if(json.data.id){
                        _this.checkFlag=json.data.checkFlag;
                    }else{
                        _this.checkFlag="";
                    }
                }).autoRun("login","error");
                _this.updateLoadingStatus({isLoading:false});
            }).catch(function(error) {
                _this.updateLoadingStatus({isLoading:false});
                util.checkAjaxError(error);
            });
        }
    },
  
    mounted(){
        var _this=this;
        this.checkUserFlag();
        this.getStudentInfo({id:this.studentId},()=>{
            this.$nextTick(()=>{
                this.getDictList({type:this.isG?'xx_choice_gradschool_batch':'xx_choice_school_batch'},function(_data){
                    _this.batchList=_data;
                });
            })
        });
        if(this.userInfo.roleId && this.notRole('1','8','9')){
            this.getAssignUserList();//分配人员
        }
        if(this.userInfo.roleId && (this.inRoleArray('7') || this.inRoleArray('9'))){
            this.getTransferUserList();//转让人员
        }
        this.getDictList({type:"xx_choice_school_difficulty"},function(_data){
           _this.difficultyList=_data;
        });
        this.$nextTick(function () {
            this.$el.parentNode.addEventListener('scroll', this.onScroll)
        });
    },
    directives: {
        scrollto: {
            inserted:function(el,building){
                if(building.value.id==""){
                    var parentBody=el.parentNode;
                    while(parentBody && parentBody.className!=="webMainBody"){
                        parentBody=parentBody.parentNode;
                    }
                    if(parentBody.className=="webMainBody"){
                        function getTop(elm){
                            var val=elm.offsetTop;
                            if(elm.offsetParent){
                                return val+getTop(elm.offsetParent);
                            }
                            return val;
                        }
                        var top=getTop(el);
                        parentBody.scrollTop=(top);
                    }
                }
            }
        }
    },
    created(){
        this.studentId=this.$route.query.studentId;
    }
}
</script>

<style scoped lang="less">
.assignedTips{
    color:#44bcb7;
    font-size: 16px;
}
.schoolBox{
    padding-bottom: 50px;
}

.contentBox {
    .proto-upload{
        cursor: pointer;
        display: inline-block;
    }
    .userInfoBox {
        border: 1px solid #e0e0e0;
        border-top: 0;
        border-bottom: 0px;
        .basicInfo {
            border-bottom: 1px solid #e0e0e0;
            .infoList {
                padding: 15px 0;
                width: 25%;
                float: left;
                border-right: 1px solid #e0e0e0;
                text-align: center;
                p {
                    color: #44bcb7;
                    font-size: 25px;
                    line-height: 30px;
                    margin-bottom: 5px;
                }
                .bl{
                    display: block;
                    height: 40px;
                    overflow: hidden;
                    &.bs{
                        height: 20px;
                        overflow: hidden;
                    }
                }
            }
            .infoList:last-child {
                border-right: 0;
            }
        }
        .files-list{
            display: inline-block;
            .tool-tips{
                display: inline-block;
            }
        }
        .fileicon{
            background: url("../../assets/images/detail/proto.svg") no-repeat center;
            background-size: 16px;
            width: 30px;
            height: 50px;
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
            }
        }
        .otherInfoBox {
            border-bottom: 1px solid #e0e0e0;
            .otherInfoList {
                background: #f7f7f7;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #e0e0e0;
                padding: 0 10px;
                position: relative;
                label {
                    position: absolute;
                    left: 10px;
                    text-align: right;
                    width: 100px;
                    height: 40px;
                    overflow: hidden;
                }
                .infoDetail {
                    position: relative;
                    padding-left: 130px;
                }
            }
            .otherInfoList:last-child {
                border-bottom: 0;
            }
        }
        .studentInfoBox{
            background: #f7f7f7;
            border-bottom: 1px solid #e0e0e0;
            padding: 20px;
            .studentInfoList{
                .tit{
                    font-weight: bold;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #e0e1e2;
                }
                .detailInfo{
                    padding: 20px;
                    .infoList{
                        float: left;
                        width: 40%;
                        .label{
                            text-align: right;
                            vertical-align: middle;
                            float: left;
                            font-size: 12px;
                            line-height: 1;
                            padding: 10px 12px 10px 0;
                            box-sizing: border-box;
                            width: 150px;
                            color: #999;
                            display: inline-block;
                        }
                        .detail{
                            display: block;
                            padding-left: 150px;
                            line-height: 30px;
                        }
                    }
                    .clearFloat{
                        clear: both;
                    }
                    .studyinfoListBox{
                        float: left;
                        width: 50%;
                        .infoList{
                            clear: both;
                        }
                    }
                }
                .applyobjectBox{
                    .infoList{
                        clear: both;
                        width: 100%;
                        .label{
                            display: block;
                            clear: both;
                            width: auto;
                            float: none;
                            text-align: left;
                        }
                        .detail{
                            padding-left: 0px;
                        }
                    }
                }
                .skillInfoList{
                    position: relative;
                    .index{
                        position: absolute;
                        top: 0px;
                        left:0px;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 28px;
                        border-radius: 100%;
                        background: #f0f0f0;
                        border: 1px solid #e0e1e2;
                    }
                    .skillInfo{
                        position: relative;
                        padding-left: 30px;
                    }
                }
                .examineBox{
                    position: relative;
                    background: #fff;
                    border: 1px solid #e0e1e2;
                    margin-bottom: 20px;
                    transition: all ease 200ms;
                    .testTitle{
                        float: left;
                        text-align: center;
                        padding: 20px 0px 0px 20px;
                        width: 100px;
                        .expectFlag{
                            margin-top: 10px;
                            margin-left: 5px;
                        }
                    }
                    .testDetail{
                        float: left;
                        width: 700px;
                        min-height: 105px;
                        margin-top:20px;
                        .ivu-form-item{
                            width:auto;
                        }
                    }
                }
                .skillBox{
                    .testTitle{
                        padding-bottom: 20px;
                    }
                    .testDetail{
                        min-height: auto;
                        margin-bottom: 20px;
                        .infoList .detail{
                            padding-left: 30px;
                        }
                    }
                }
            }
        }
    }
    .typeIcon{
        width: 60px;
        height: 40px;
        margin:0px auto;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 60px;
    }
    .TOEFL{
        background-image: url("../../assets/images/addStudent/TOEFL.png");
    }
    .IELTS{
        background-image: url("../../assets/images/addStudent/IELTS.png");
    }
    .SAT{
        background-image: url("../../assets/images/addStudent/SAT.png");
    }
    .ACT{
        background-image: url("../../assets/images/addStudent/ACT.png");
    }
    .GRE{
        background-image: url("../../assets/images/addStudent/GRE.png");
    }
    .GMAT{
        background-image: url("../../assets/images/addStudent/GMAT.png");
    }
    .LSAT{
        background-image: url("../../assets/images/addStudent/LSAT.png");
    }
    .others{
        background-image: url("../../assets/images/addStudent/others.png");
        background-size: 25px;
    }
    .Elementaryschool{
        background-image: url("../../assets/images/addStudent/middle.png");
        background-size: 33px;
    }
    .Highschool{
        background-image: url("../../assets/images/addStudent/higher.png");
        background-size: 30px;
    }
    .University{
        background-image: url("../../assets/images/addStudent/college.png");
        background-size: 29px;
    }
    .Summerschool{
        background-image: url("../../assets/images/addStudent/summerSchool.png");
        background-size: 29px;
    }
    .honour{
        background-image: url("../../assets/images/addStudent/honour.png");
        background-size: 31px;
    }
    .kewai{
        background-image: url("../../assets/images/addStudent/kewai.png");
        background-size: 25px;
    }
    .shixi{
        background-image: url("../../assets/images/addStudent/shixi.png");
        background-size: 25px;
    }
    .yanjiu{
        background-image: url("../../assets/images/addStudent/yanjiu.png");
        background-size: 25px;
    }
    .jineng{
        background-image: url("../../assets/images/addStudent/jineng.png");
        background-size: 29px;
    }
    .moreMessage {
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e0e0e0;
        .moreBtn {
            color: #444;
            text-decoration: underline;
            &:hover{
                color: #44bcb7;
            }
        }
    }
    .headerInfo {
        position: relative;
        margin-top: 20px;
        .iconBox {
            position: absolute;
            left: 0;
            width: 50px;
            height: 50px;
            background-color: #7bc9c9;
            background-image: url("../../assets/images/addStudent/icon_test.png");
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 4px;
        }
        .title {
            padding-left: 60px;
            position: relative;
            p {
                color: #343535;
                font-size: 16px;
                line-height: 30px;
                .curAssigner{
                    font-size: 12px;
                    float: right;
                    position: relative;
                    top: 25px;
                }
            }
            .staticsInfo {
                height: 20px;
                font-size: 12px;
                span {
                    font-size: 12px;
                    margin: 0 3px;
                }
                .checked {
                    color: #0050be;
                }
                .passed {
                    color: #00abab;
                }
                .unpassed {
                    color: #880013;
                }
            }
        }
    }
    .indexBox {
        margin-top: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        display: table;
        width: 100%;
        .list {
            display: table-cell;
            height: 50px;
            text-align: center;
            cursor: pointer;
            border-right: 1px solid #e0e0e0;
            &:hover{
                background-color: #f1f1f1;
            }
            &.noneStatus,&.noneStatus:hover{
                background-color: #fff;
                cursor: default;
            }
            &.completeStatusList{
                background-color:#44bcb7;
                color: #fff;
            }
            &:last-child {
                border-right: 0 solid #e0e0e0;
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
            }
            &:first-child {
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
            }
            span {
                display: block;
                line-height: 25px;
                height: 25px;
            }
            .status {
                span{
                    display: block;
                    margin: 0px auto;
                    width:20px;
                    height: 20px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    font-size: 20px;
                    color: #7bc9c9;
                }
                .deleteStatus{
                    background-image:url("../../assets/images/detail/delete.png");
                }
                .signedStatus{
                    background-image:url("../../assets/images/detail/signed.png");
                }
                .checkedStatus{
                    background-image:url("../../assets/images/detail/checked1.png");
                }
                .choiceStatus{
                    background-image:url("../../assets/images/detail/choice.png");
                }
                .noneStatus{
                    background-image:url("../../assets/images/detail/none.png");
                }
            }
        }
    }
    .hideIndexBox{
        display: none;
    }
    .noneData{
        text-align: center;
        background:url("../../assets/images/public/noData.png");
        padding-bottom: 80px;
        padding-top: 180px;
        color: #aaaaaa;
        background-repeat: no-repeat;
        background-position: center 60px;
        border-bottom: 1px solid #e0e1e2;
    }
}

.scrolltop{
    position: fixed;
    cursor: pointer;
    font-size: 12px;
    bottom: 65px;
    right: 20px;
    width: 54px;
    height: auto;
    z-index: 10001;
    background: #eee;
    transition: all ease-in 200ms;
    text-align: center;
    .line{
        width: 90%;
        margin: 0 auto;
        height: 1px;
        background-color: #ddd;
    }
    .part1{
        padding: 10px 0;
        letter-spacing: -0.4px;
        .iconfont{
            font-size: 22px;
        }
        &:hover{
            cursor: pointer;
            color: #44bcb7;
            background-color: #eaeaea;
        }
    }
    .part2{
        padding: 10px 0;
        letter-spacing: -0.2px;
        .iconfont{
            font-size: 10px;
        }
        &:hover{
            cursor: pointer;
            color: #44bcb7;
            background-color: #eaeaea;
        }
    }
}
</style>