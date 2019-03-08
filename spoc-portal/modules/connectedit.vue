<style lang='less'>
.connecteditGsx {
    padding-top: 20px;
    li{
        list-style: none;
    }
    .baseInfo {
        @h: 34px;
        line-height: @h;
    }
    .base-info-item{
        @h: 34px;
        position: relative;padding-left: 80px;min-height: @h;
        margin-bottom: 20px;
        &>span{
            position: absolute;left: 0;top: 0;width: 70px;
            font-size: 14px;color: #999;text-align: right;
        }
    }
    .fileContent {
        margin-left: 80px;
        .content {
            padding: 0;margin-bottom: 10px;
            position: relative;
            line-height: 32px;
            height: 32px;overflow-y: hidden;
            .upload {
                position: absolute;
                top: 0;
                left:120px;
            }
        }
        &.historyFiles{
            margin-bottom: 30px;
            a{
                margin-left: 8px;
            }
            .editBox{
                width: 460px;
            }
        }
    }
    .fileList {
        line-height: 50px;
    }
    .connectSell {
        margin-top: 50px;
        margin-bottom: 20px;
        text-align: center;
        span {
            display: inline-block;
            width: 30%;
            margin: 3px 20px;
            height: 1px;
            border-bottom: 1px solid #e9e8e8;
        }
    }
    .selectTable {
        position: absolute;right: 0;top: 0;
    }
    .connectTable{
        margin-top: 20px;
    }
    .contentTable {
        & > p{
            font-size: 14px;color: #999;margin-bottom: 20px;
        }
    }
    .footCheck {
        margin: 60px 0 30px;
        text-align: center;
        button{
            width: 90px;height: 35px;line-height: 1;margin: 0 18px;
            font-size: 14px;
        }
    }
    .checkBox{
        padding-left: 20px;display: inline-block;
        &>i{
            @w: 14px;
            float: left;margin-top: 10px;margin-left: -20px;
            position: relative;
            width: @w;height: @w;border:  1px solid #dddee1;border-radius: 2px;
            background-color: #fff;
        }
        &.active{
            &>i{
                border-color: #44bcb7;
                background-color: #44bcb7;
                &::after{
                    content: '';display: table;width: 4px;height: 8px;
                    position: absolute;top: 1px;left: 4px;
                    border: 2px solid #fff;border-top: 0;border-left: 0;
                    -webkit-transform: rotate(45deg) scale(1);
                    transform: rotate(45deg) scale(1);
                    transition: all 0.2s ease-in-out;
                }
            }
        }
    }
    .fileLists{
        button{
            @p: 5px;
            float: left;
            width: 100px;padding-top: @p;padding-bottom: @p;
        }
    }
    .fileLists.checkBox{
        display: block;
    }
    .divInputBox{
        width: 200px;
    }
    .divInput{
        float: left;
        height: 32px;padding: 0 7px;line-height: 30px;margin-right: 10px;
        background: #f1f1f1;border: 1px solid #e0e0e0;color: #999;
        border-radius: 4px;font-size: 14px;
        text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
    }
    .ivu-select-selection{
        .ivu-select-placeholder,.ivu-select-selected-value{
            font-size: 100%;color: #999;
        }
    }
    .red{
        color: #ed3f14 !important;margin-right: 8px;
    }
    .editBox{
        width: 510px;overflow: hidden;margin-bottom: 10px;
        & + div{
            margin-top: -10px;margin-bottom: 10px;
        }
    }
    .contentTable{
        position: relative;
    }
}

</style>
<template>
    <div class="connecteditGsx">
        <div class="baseInfo">
            <ul>
                <li class="base-info-item">
                    <span>{{ $t("portal.userName") }}</span>
                    <div class="divInputBox divInput">{{ userName }}</div>
                </li>
                <li class="base-info-item">
                    <span>{{ $t("portal.listRoleName") }}</span>
                    <!-- <template v-if="showSelect"> -->
                        <Select v-model="selectmodel1"
                            style="width:200px;margin-right:10px;"
                            @on-change="changeListRole">
                            <Option v-for="item in listRole" :value="item.id" :key="item.id">
                                {{ item.name }}
                            </Option>
                        </Select>
                        <Select v-model="selectmodel2"
                            style="width:200px"
                            @on-change="changeRoleMembers">
                            <Option v-for="item in roleMembers" :value="item.userId" :key="item.userId">
                                {{ item.userName }}
                            </Option>
                        </Select>
                    <!-- </template> -->
                    <!-- <template v-else>
                        <div class="divInputBox divInput">{{ listRoleName }}</div>
                        <div class="divInputBox divInput">{{ roleMembersName }}</div>
                    </template> -->
                </li>
                <li class="base-info-item">
                    <span>{{ $t("portal.handoverMaterial") }}</span>
                    <a @click="RouterGoChild" class="checkBox active" ><i></i>{{ $t("portal.studentFiles") }}</a>
                </li>
                <li class="base-info-item" style="margin-bottom:10px;">
                    <p class="checkBox active"><i></i>{{ $t("portal.contract") }}</p>
                    <div v-if="contractObj.fileName" style="padding-left: 20px;">
                        <div class="editBox">
                            <a @click="jumpView(contractObj)">{{ contractObj.fileName }}</a>
                        </div>
                        <div v-if="contractObj.remarks">{{ $t("chooseSchoolCase.remarks") + contractObj.remarks }}</div>
                    </div>
                </li>
            </ul>
            <div class="fileContent">
                <div v-for="(item,index) in fileDom" :key="index" class="fileLists checkBox" :class="{active: item.lists.length>0}">
                    <i></i>
                    <div class="content">
                        <span>{{ item.text }}</span>
                        <div class="upload">
                            <Button type="primary" @click="changeNum(index,item.name)">{{ $t("portal.upload") }}</Button>
                        </div>
                        <Button type="primary" @click="showPan(index)" style="position: absolute; left:250px; top: 0px">{{ $t("portal.uploadToPan") }}</Button>
                    </div>
                    <div v-if="item.lists">
                        <div v-for="(i,index) in item.lists" :key="index">
                            <div class="editBox">
                                <a @click="jumpView(i)">{{ i.fileName }}</a>
                                <div class="fr">
                                    <a class="red" href="javascript:;" @click="deleteFile(i.id,i.type)">{{ $t("DeleteSchool") }}</a>
                                    <a v-if="i.remarks" href="javascript:;" @click="addComment(i.id, i.type,1)">
                                        {{ $t("portal.editRemarks") }}
                                    </a>
                                    <a v-else href="javascript:;" @click="addComment(i.id, i.type,0)">
                                        {{ $t("portal.addRemarks") }}
                                    </a>
                                </div>
                            </div>
                            <div v-if="i.remarks">{{ $t("chooseSchoolCase.remarks") + i.remarks }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template v-if="formLists.history && formLists.history.length > 0"> 
            <p class="connectSell"><span></span>{{ $t("portal.connectSell") }}<span></span></p>
            <div class="fileContent historyFiles">
                <div class="fileLists checkBox active" v-for="(item,index) in formLists.history" :key="index">
                    <i></i>
                    <div class="content">
                        <span>{{ item.name }}</span>
                        <Button type="primary" style="margin-left:40px;float:inherit" @click="goDeteil(item.id)">{{ $t("portal.showDetail") }}</Button>
                    </div>
                </div>
            </div>
        </template>

        <div class="connectTable">
            <div class="contentTable">
                <p>{{ $t("portal.xForm") }}</p>
                <xformview v-if="showXForm" ref="meetxForm" :studentId='studentId' :groupId='formLists.groupId' :initId='initId' :fid="fid" :uid="handOverId" :preview="obj" />
            </div>
        </div>
        <p class="footCheck">
            <Button type="primary" @click="sevexForm(1)">{{ $t("Save") }}</Button>
            <Button type="primary" v-if="!isRole" @click="sevexForm(2)">{{ $t("portal.updateHandOver") }}</Button>
        </p>
        <Modal v-model="modal1" :title="$t('portal.addRemarks')"
            @on-ok="ok" :okText="$t('Common.ensure')" :cancelText="$t('Common.cancel')">
            <Input v-model="commentText" type="textarea" :rows="4" :placeholder="$t('portal.addRemarks')"/>
        </Modal>
        <Modal v-model="modal2" :title="$t('GroupTips')">
            <div slot="footer">
                <Button type="primary" @click="submitUpdateHandOver()">{{ $t("Close") }}</Button>
            </div>
            <p>{{ $t("portal.examineTips") }}</p>
        </Modal>
        <up-to-pan ref="uptopan" :object-id="formLists.groupId"
            :dir="uploadToPanDir" :type="uploadToPanType+'/'+this.phaseName"
            fileType="all" @uploadok="handleSuccess" :menuId="pId"/>
        <yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
    </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'
import valid, { errors, common, sys } from "../libs/request"
import yunpan from '@public/modules/yunpan'
import upToPan from './planUpToPan'
import xformview from '../../spoc-plan-web/src/views/xform/xformview.vue'

export default {
    props: {
        pId: {
            type: String
        }
    },
    data() {
        return {
            fileDom: [
                {
                    name: 'Questionnaire',
                    text: 'Questionnaire',
                    lists: [],
                },
                {
                    name: 'other',
                    text: this.$t('other'),//'其他',
                    lists: [],
                },
                // {
                //     name: 'contract',
                //     text: '签约合同',
                //     lists: [],
                // },
            ],
            showContract: false,
            contractObj: {
                fileName: '',
                remarks: ''
            },
            obj:{},
            fid: '',
            userName: '',
            listsNum: 1,
            name: '',
            isRole:false,
            file: null,
            commentText: '',
            fileText: '',
            handOverId: '',
            modal1: false,
            modal2: false,
            selectmodel1: '',
            selectmodel2: '',
            listPhase: [],
            updateHandOverNoId: false,
            loadingStatus: false,
            modelType: '',
            listRole: [],
            roleMembers: [],
            roleMembersId: '',
            remarksid: '',
            fileYunpanNum: 1,
            studentId: '',
            pan:{ visible:false },
            formLists: {
                handoverRoleId: '',
                handoverId: '',
                createBy: '',
                updateTime: '',
                groupId: '',
                history: '',
                jobName: ''
            },
            isGetDir: true,
            uploadToPanDir: '',
            uploadToPanType: '',
            tempFile: {},
            showXForm: false,
            initId: '',//初始化studentId
            phaseName: '',
            saveXForm: true, //是否需要保存动态表单
            // showSelect: true, //交接对象是否显示下拉框
            // listRoleName: '',
            // roleMembersName: '',
        }
    },
    computed:{
        ...mapState(['userInfo']),
	},
    components:{
        yunpan,
        upToPan,
        xformview
    },
    created() {
        if(this.$route.query.phase) {
            this.phaseName = this.$route.query.phase;
        }else{
            let thispID = this.pId;
            if(thispID == '101') this.phaseName = 'choiceschool';
            else if(thispID == '201') this.phaseName = 'sign';
            else if(thispID == '401') this.phaseName = 'plan';
            else if(thispID == '701') this.phaseName = 'docu';
            else if(thispID == '801') this.phaseName = 'crm';
            else if(thispID == '901') this.phaseName = 'apply';
        }
        this.handOverId = this.$route.query.id;
        if(this.handOverId){
            // this.showSelect = false;
            this.getForm();
        }else{
            // 新建
            this.userName = this.userInfo.name;
            this.formLists.createBy = this.userName;
            this.studentId = this.$route.query.studentId;
            this.formLists.groupId = this.$route.query.groupId;
            this.initId = this.$route.query.studentId;
            // this.showXForm = true;
            this.getListRole();
            this.getDir();
            this.getContractAttachment(this.$route.query.groupId);
        }
    },
    methods: {
        ...mapMutations(['updateLoadingStatus']),
        getContractAttachment(id) {
            // 获取合同列表
            let params = {
                groupId: id,
                menuId: this.pId
            }
            common.getContractAttachment(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    if(res.data.data) {
                        this.contractObj = res.data.data;
                        this.showContract = true;
                    }else this.showContract = false;
                }
            }).catch(errors.call(this));
        },
        jumpView(item) {
            if(item.fileId) {
            window.open(`https://portal.ivygate.cn/index.php/webutils/document/${item.fileId}`);
            }
        },
        getDir() {
            // 获取服务组filePath
            let params = {
                id: this.formLists.groupId
            }
            common.getFolderName(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.uploadToPanDir = res.data.data.folderName ? '/'+res.data.data.folderName + ('/'+this.phaseName) : '';
                }
            }).catch(errors.call(this));
        },
        goDeteil(id) {
            // 规划-文书 查看详情
            this.$router.push({
                name: this.phaseName+'.connectPreview',
                query: {
                    id: id,
                    phase:this.phaseName,
                    menuId:this.pId
                }
            });
        },
        RouterGoChild() {
            // 学生档案
            this.$router.push({
                name: this.phaseName + '.addStudent',
                query: {
                    studentId: this.studentId
                }
            });
        },
        changeNum(num,type) {
            this.listsNum = num;
            this.uploadToPanType = type;
            this.$refs.uptopan.doUpload();
        },
        showPan(num) {
            this.fileYunpanNum = num;
            this.pan.visible = true;
        },
        doSendFile(item){
            let _data = { 
                type: this.fileDom[this.fileYunpanNum].name, 
                // id: item.id, 
                id: '', 
                filePath: item.url, 
                fileName: item.name, 
                remarks: '' ,
				menuId:this.pId
            } 
            this.fileDom[this.fileYunpanNum].lists.push(_data); 
            this.close(); 
        },
        doCancel(){
            this.close();
        },
        close(){
            this.pan.visible=false;
        },
        getForm() {
            let params = {
                id: this.handOverId
            }
            common.handoverForm(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let _data = res.data.data;
                    this.getPid(_data.phase);
                    this.userName = _data.createBy;
                    let lists0 = [];
                    let lists1 = [];
                    // let lists2 = [];
                    // this.listRoleName = _data.handOverType;
                    // this.roleMembersName = _data.handOverName;
                    for(let i = 0;i < _data.attachmentList.length;i++) {
                        let obj = _data.attachmentList[i];
                        let filePathToName = '';
                        if(!obj.fileName){
                            filePathToName = obj.filePath.split('/').pop();
                        }else{
                            filePathToName = obj.fileName;
                        }
                        let values = obj;
                        values.fileName = filePathToName;
                        if(_data.attachmentList[i].type == 'Questionnaire' || _data.attachmentList[i].type == 'questionnaire'){
                            lists0.push(values);
                        // }else if(_data.attachmentList[i].type == 'contract'){
                        //     lists2.push(values);
                        }else if(_data.attachmentList[i].type == 'other'){
                            lists1.push(values);
                        }
                    }
                    this.fileDom[0].lists = lists0;
                    // this.fileDom[2].lists = lists2;
                    this.fileDom[1].lists = lists1;
                    this.formLists = {
                        id: _data.id,
                        createBy: _data.createBy,
                        handoverRoleId: _data.handoverRoleId,
                        handoverId: _data.handoverId,
                        name: _data.name,
                        updateTime: _data.updateTime,
                        groupId: _data.groupId,
                        history: _data.history,
                        jobName: _data.handOverType
                    }
                    this.studentId = _data.stuId;
                    if(this.isGetDir) {
                        this.getDir();
                        this.isGetDir = false;
                    }
                    this.getContractAttachment(_data.groupId);
                    this.getListRole(_data.handoverRoleId, _data.handoverId);
                }
            }).catch(errors.call(this));
        },
        changeListRole(val) {
            this.showXForm = false;
            this.getPid(val);
            this.formLists.handoverRoleId = val;
            this.getRoleMember(val);
            this.formLists.jobName = this.getJobName(val);
        },
        getPid(value) {
            // 获取动态表单pid
            let data = {
                value: this.pId + '-' + value
            }
            common.getHandoverForm(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    if(data.length > 0 && data[0].formId) {
                        this.fid = data[0].formId;
                        this.showXForm = true;
                    }
                    
                }
            }).catch(errors.call(this));
        },
        getRoleMember(num, handoverId) {
            let params = {
                menuId: this.pId,
                roleId: num
            }
            common.listHandOverLeader(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.roleMembers = res.data.data;
                    if(handoverId) {
                        this.selectmodel2 = handoverId;
                    }
                }
            }).catch(errors.call(this));
        },
        getJobName(val) {
            let jobLists = this.listRole;
            for(let i = 0;i < jobLists.length;i++) {
                if(jobLists[i].id == val) return jobLists[i].name
            }
        },
        changeRoleMembers(val) {
            this.formLists.handoverId = val;
            this.roleMembersId = val;
        },
        getListRole(num, handoverId) {
            let params = {
                menuId: this.pId, 
                roleType: 'handover', 
                groupId: this.formLists.groupId 
            }
            common.listRole(params).then(valid.call(this)).then(res => { 
                if(res.ok) {
                    this.listRole = res.data.data.roleVOList; 
                    let temp = this.listRole.filter((obj) => { 
                        return obj.id == this.userInfo.roleId 
                    })[0]; 
                    if(temp) {
                        this.isRole = true;
                    }
                    this.formLists.jobName = this.getJobName(this.formLists.handoverRoleId)
                    if(num) {
                        this.selectmodel1 = num;
                        console.log(this.selectmodel1)
                        this.getRoleMember(num, handoverId);
                    }
                }
            }).catch(errors.call(this));
        },
        
        handleSuccess(response) {
            // 本地上传
            if(response.status == 'success') {
                // 清除列表中重复文件
                let temp = this.fileDom[this.listsNum].lists.filter((list) => {
                    return list.fileName != response.data.fileName;
                });
                this.fileDom[this.listsNum].lists = temp;
                // 将文件追加到列表中 
                let tump = response.data;
                tump.fileName = response.data.fileName;
                tump.type = response.data.type.split("/")[0];
                this.fileDom[this.listsNum].lists.push(tump);
            }
        },
        deleteFile(id, type) {
            // 删除附件
            let params = {
                id: id
            }
            sys.delete(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let temp; 
                    if(type == 'questionnaire' || type == 'Questionnaire') { 
                        temp = this.fileDom[0].lists; 
                    // }else if(type == 'contract') { 
                    //     temp = this.fileDom[2].lists; 
                    }else if(type == 'other') { 
                        temp = this.fileDom[1].lists; 
                    } 
                    for (let i = 0;i < temp.length; i++) { 
                        if (temp[i].id === id) { 
                            temp.splice(i ,1); 
                            break; 
                        } 
                    } 
                }
            }).catch(errors.call(this));
        },
        addComment(id,type,num) {
            // num:添加0、修改备注1
            this.modelType = type;
            if(num == 0) {
                this.commentText = '';
            } else if(num == 1) {
                let temp;
                if(type == 'questionnaire' || type == 'Questionnaire') {
                    temp = this.fileDom[0].lists;
                // }else if(type == 'contract') {
				// 	temp = this.fileDom[2].lists;
                }else if(type == 'other') {
					temp = this.fileDom[1].lists;
                }
                for (let i = 0;i < temp.length; i++) {
                    if (temp[i].id === id) {
                        this.commentText = temp[i].remarks;
                    }
                }
            }
            this.remarksid = id;
            this.modal1 = true
        },
        ok() {
            // 提交备注
            this.fileText = this.commentText;
            let params = {
                id: this.remarksid,
                remarks: this.fileText
            }
            sys.updateRemarks(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                   let temp; 
                   if(this.modelType == 'Questionnaire' || this.modelType == 'questionnaire'){ 
                       temp = this.fileDom[0].lists; 
                //    }else if(this.modelType == 'contract'){ 
                //        temp = this.fileDom[2].lists; 
                   }else if(this.modelType == 'other'){ 
                       temp = this.fileDom[1].lists; 
                   } 
                   for(let i = 0;i < temp.length;i++){ 
                       if(this.remarksid == temp[i].id){ 
                           temp[i].remarks = this.fileText; 
                           break; 
                       } 
                   } 
                }
            }).catch(errors.call(this));
        },
        cancel () {
            // this.$Message.info('Clicked cancel');
        },
        edit(item) {
            // console.log(item)
        },
        sevexForm(num) {
            // 验证
            if(this.showXForm) {
                if(this.$refs.meetxForm.valid()) {
                    if(num == 2) this.updateHandOverNoId = true;
                    // 保存
                    this.save();
                }
            }else{
                if(num == 2) this.updateHandOverNoId = true;
                this.save();
            }
        },
        saveXFromFun() {
            // 保存动态表单
            this.$nextTick(()=>{
                this.$refs.meetxForm.save(true).then(res => {
                    if(res.ok) {
                        
                    }
                }).catch(errors.call(this));
            });
        },
        save() {
            this.updateLoadingStatus({isLoading: true});
            // 保存
            // let cump = this.fileDom[0].lists.concat(this.fileDom[1].lists).concat(this.fileDom[2].lists);
            let cump = this.fileDom[0].lists.concat(this.fileDom[1].lists);
            let currentLists = [];
            for(let i = 0;i < cump.length;i++) {
                let newLists = {
                    id: cump[i].id,
                    fileId: cump[i].fileId,
                    remarks: cump[i].remarks,
                    type: cump[i].type,
                    fileName: cump[i].fileName,
                    filePath: cump[i].filePath,
                    creator: cump[i].creator
                }
                currentLists.push(newLists);
            }
            let params = {
                handoverId: this.formLists.handoverId,
                groupId: this.formLists.groupId,
                attachmentList: currentLists,
                jobName: this.formLists.jobName,
                menuId: this.pId,
                tableId: this.fid
            };
            if(this.handOverId){
                params.id = this.formLists.id;
            }
            common.handoverSave(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.handOverId = res.data.data.id;
                    if(this.showXForm) { //有表单
                        this.$nextTick(()=>{
                            this.$refs.meetxForm.save(true).then(res => {
                                this.saveHandler(res);
                            }).catch(errors.call(this));
                        });
                    }else{ //没有表单
                        this.saveHandler(res);
                    }
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        saveHandler(res) {
            if(res.ok) {
                if(!this.updateHandOverNoId) {
                    if(this.isRole) {
                        this.$router.push({
                            name: this.phaseName+'.connectCheckDetail',
                            query: {
                                id: this.handOverId
                            }
                        });
                    }else{
                        this.$router.push({
                            name: this.phaseName+'.connectList',
                        });
                    }
                }else{
                    // 提交审批还未保存
                    this.updateHandOverNoId = false;
                    this.saveXForm = false;
                    this.updateHandOver();
                }
            }
        },
        updateHandOver() {
            // 提交审批
            if(this.saveXForm && this.showXForm) {
                this.saveXFromFun();
            }
            let params = {
                id: this.handOverId,
                status: 2,
                menuId:this.pId
            }
            common.updateHandOver(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.modal2 = true;
                    this.submitUpdateHandOver();
                }
            }).catch(errors.call(this));
        },
        submitUpdateHandOver() {
            this.modal2 = false;
            this.$router.push({
                name: this.phaseName+'.connectList',
            })
        }
    }
}
</script>





    