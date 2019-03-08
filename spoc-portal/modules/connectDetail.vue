<style lang='less'>
.connectDetail {
    .contentInfo{
        @h: 34px;
        line-height: @h;
        li{
            position: relative;padding-left: 80px;min-height: @h;
            &>span{
                position: absolute;left: 0;top: 0;width: 70px;
                font-size: 14px;color: #999;text-align: right;
            }
        }
    }
    .tableTitle{
        margin: 20px 0;width: 70px;
        font-size: 14px;color: #999;text-align: right;
    }
    .contentTable {
        padding-bottom: 80px;
    }
    .studentMaterialList{
        padding-left: 80px;
    }
    .studentMaterialListItem{
        padding-left: 20px;
        .checkbox{
            @w: 14px;
            float: left;margin-top: 10px;margin-left: -20px;
            position: relative;
            width: @w;height: @w;border:  1px solid #dddee1;border-radius: 2px;
            background-color: #fff;
        }
        &.active{
            .checkbox{
                border-color: #44bcb7;
                background-color: #44bcb7;
                &::after{
                    content: '';
                    display: table;
                    width: 4px;
                    height: 8px;
                    position: absolute;
                    top: 1px;
                    left: 4px;
                    border: 2px solid #fff;
                    border-top: 0;
                    border-left: 0;
                    -webkit-transform: rotate(45deg) scale(1);
                    transform: rotate(45deg) scale(1);
                }
            }
        }
    }
}
</style>
<template>
<div class="connectDetail">
    <div class="contentInfo">
        <ul>
            <li><span>{{ $t("portal.userName") }} </span>{{ user.createBy }}</li>
            <li><span>{{ $t("portal.listRoleName") }}</span>{{ user.name }}</li>
            <li><span>{{ $t("portal.phase") }} </span>{{ user.phase }}</li>
            <li><span>{{ $t("portal.joinTime") }} </span>{{ user.joinTime }}</li>
            <li><span>{{ $t("portal.handoverMaterial") }} </span> <a @click="RouterGoChild">{{ $t("portal.studentFiles") }}</a></li>
            <li>
                <div class="studentMaterialListItem" :class="{active: contractObj.fileName != ''}">
                    <i class="checkbox"></i>
                    <span>{{ $t("portal.contract") }}</span>
                </div>
                <div v-if="contractObj.fileName" style="padding-left: 20px;">
                    <div class="editBox">
                        <a @click="jumpView(contractObj)">{{ contractObj.fileName }}</a>
                    </div>
                    <div v-if="contractObj.remarks">{{ $t("chooseSchoolCase.remarks") + contractObj.remarks }}</div>
                </div>
            </li>
        </ul>
        <div class="studentMaterialList">
            <div v-for="(item, index) in fileDom" :key="index">
                <div class="studentMaterialListItem" :class="{active: item.lists.length>0}">
                    <i class="checkbox"></i>
                    <span>{{ item.text }}</span>
                </div>
                <div v-if="item.lists">
                    <div v-for="(i,index) in item.lists" :key="index">
                        <div class="studentMaterialListItem">
                            <a @click="jumpView(i)">{{ i.fileName }}</a>
                        </div>
                        <div class="studentMaterialListItem" v-if="i.remark">
                            {{ $t("chooseSchoolCase.remarks") + i.remark }}
                        </div>
                        <div class="studentMaterialListItem" v-if="i.remarks">{{ $t("chooseSchoolCase.remarks") + i.remarks }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="contentTable">
        <p class="tableTitle">{{ $t("portal.xformview") }}</p>
        <xformview v-if="showFrom" ref="meetxForm" :fid="fid" :studentId='studentId' :groupId='groupId' :uid="handOverId" :preview="obj" :viewmode="viewmode" />
    </div>
</div>
</template>

<script>

import valid, { errors, common, sys } from "../libs/request";
import {mapState} from 'vuex';
import xformview from '../../spoc-plan-web/src/views/xform/xformview.vue'

export default {
    props: {
        pId: {
            type: String,
            require: true
        }
    },
    data() {
        return  {
            studentId: '',
            groupId: '',
            fid: '',
            handOverId: '',
            viewmode: true,
            obj:{},
            fileDom: [
                {
                    checked: false,
                    name: 'Questionnaire',
                    text: 'Questionnaire',
                    lists: [],
                },
                {
                    checked: false,
                    name: 'other',
                    text: this.$t('other'),
                    lists: [],
                },
                // {
                //     checked: false,
                //     name: 'contract',
                //     text: '签约合同',
                //     lists: [],
                // },
            ],
            user: {
                createBy: '',
                name: '',
                joinTime: '',
                phase: ''
            },
            tableList: [
                {name: '1212', val: '46546'},
                {name: '1212', val: '46546'},
            ],
            listPhase: '',
            showFrom: false, 
            phaseName: '',
            showContract: false,
            contractObj: {
                fileName: '',
                remarks: ''
            },
        }
    },
    computed:{
        ...mapState(['userInfo']),
        isActive() {
            return {
                
            }
        }
    },
    components:{
        xformview
    },
    created() {
        let thispID = this.pId;
        if(thispID == '101') this.phaseName = 'choiceschool';
        else if(thispID == '201') this.phaseName = 'sign';
        else if(thispID == '401') this.phaseName = 'plan';
        else if(thispID == '701') this.phaseName = 'docu';
        else if(thispID == '801') this.phaseName = 'crm';
        else if(thispID == '901') this.phaseName = 'apply';
    },
    mounted () {
        this.handOverId = this.$route.query.id;
        this.getPhase();
        this.getForm();
    },
    methods: {
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
        getPhase() {
            let params = {
                type: 'pl_service_status_phase'
            }
            sys.listData(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    // let _phase = res.data.data;
                    this.listPhase = res.data.data;
                }
            }).catch(errors.call(this));
        },
        RouterGoChild() {
            this.$router.push({
                name: this.phaseName + '.addStudent',
                query: {
                    studentId: this.studentId
                }
            });
        },
        getForm() {
            let params = {
                id: this.handOverId
            }
            common.handoverForm(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let _data = res.data.data;
                    this.getFid(_data.history, _data.phase);
                    this.user.createBy = _data.createBy;
                    this.user.name = _data.name;
                    this.user.joinTime = _data.updateTime;
                    this.studentId = _data.stuId;
                    this.groupId = _data.groupId;

                    let _phaseLists = this.listPhase;

                    for(let i = 0;i < _phaseLists.length;i++) {
                        if(_data.phase == _phaseLists[i].value) {
                            this.user.phase = _phaseLists[i].label;
                            break;
                        }
                    }

                    let lists0 = [];
                    let lists1 = [];
                    // let lists2 = [];
                    for(let i = 0;i < _data.attachmentList.length;i++) {
                        let obj = _data.attachmentList[i];
                        let filePathToName = '';
                        if(!obj.fileName){
                            filePathToName = obj.filePath.split('/').pop();
                        }else{
                            filePathToName = obj.fileName;
                        }
                        let values = {
                            fileId: obj.fileId,
                            id: obj.id,
                            remarks: obj.remarks,
                            type: obj.type,
                            fileName: filePathToName,
                            filePath: obj.filePath,
                        }
                        if(_data.attachmentList[i].type == 'Questionnaire' || _data.attachmentList[i].type == 'questionnaire'){
                            lists0.push(values);
                        // }else if(_data.attachmentList[i].type == 'contract'){
                        //     lists2.push(values);
                        }else if(_data.attachmentList[i].type == 'other'){
                            lists1.push(values);
                        }
                    }

                    this.fileDom[0].lists = lists0;
                    this.fileDom[1].lists = lists1;
                    // this.fileDom[2].lists = lists2;
                    // console.log(this.fileDom);

                    if(this.userInfo.id == _data.createId && (_data.auditStatus == 'save' || _data.auditStatus == 'reject')){
                        this.$emit('showEdit');
                    }

                    this.getContractAttachment(_data.groupId);

                }
            }).catch(errors.call(this));
        },
        getFid(history, val) {
            // 获取动态表单pid
            let his = history.filter((item) => {
                return item.id == this.handOverId
            });
            let name;
            if(his.length > 0) {
                name = his[0].type;
            }else{
                name = this.pId + '-' + val
            }
            
            let data = {
                // type: 'com_form_tpl_kind_handover',
                // value: first + '-' + last,
                value: name,
            }
            common.getHandoverForm(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data;
                    if(data.length > 0 && data[0].formId) {
                        this.fid = data[0].formId;
                        this.showFrom = true;
                    }
                }
            }).catch(errors.call(this));
        }
    }
}
</script>


