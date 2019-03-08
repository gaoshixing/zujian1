<style lang="less">
.staff-brief-container{
    .bottom{
        padding-left: 30px;zoom: 1;
        &::before, &::after{
            content: '';display: block;clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .level-box{
        position: relative;padding-right: 30px;width: 260px;
        .btn{
            position: absolute;    
            right: 0;top: 5px;
            width: 20px;height: 20px;line-height: 20px;
            text-align: center;
            border-width: 1px;
            border-style: solid;
            color: #d8dde5;
            cursor: pointer;
            border-radius: 3px;
            &:hover{
                color: #333;
            }
        }
    }
    .ivu-form-item-error{
        .ivu-form-item-content > div > .ivu-input-wrapper{
            & + .ivu-form-item-error-tip{
                display: none;
            }
        }
    }
}
</style>
    
<template>
<div class="staff-brief-container">
    <div class="brief-top">
        <Select v-model="version" @on-change="changeVersion" style="width:300px;margin-bottom:12px;">
            <Option v-for="(item, index) in versionLists" :value="index" :key="item.id">{{ item.versionName }}</Option>
        </Select>
        <span class="new-date">最后更新时间：{{ updateDate }}</span>
        <Button type="primary" style="height: 32px;" v-if="editFlag" @click="edit" class="edit">编辑</Button>
    </div>
    <div class="bottom">
        <Form ref="briefDetail" :model="userInfo" :rules="briefRules" :label-width="120">
            <FormItem label="员工类型：" prop="jobStatus" style="width: 50%">
                <Select v-model="userInfo.jobStatus" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in jobStatusLists" :value="item.value" :key="item.id">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.jobStatus ? briefModal.jobStatus.label : '' }}</div>
            </FormItem>
            <FormItem label="职能性质：" prop="functionStatus" style="width: 50%">
                <Select v-model="userInfo.functionStatus" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in functionStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.functionStatus ? briefModal.functionStatus.label : '' }}</div>
            </FormItem>
            <FormItem label="员工编号：" prop="no" style="width: 50%">
                <Input v-model="userInfo.no" disabled v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.no }}</div>
            </FormItem>
            <FormItem label="员工状态：" prop="userStatus" style="width: 50%">
                <Select v-model="userInfo.userStatus" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in statesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.userStatus ? briefModal.userStatus.label : '' }}</div>
            </FormItem>
            <FormItem label="姓名：" prop="name" style="width: 50%">
                <Input v-model="userInfo.name" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.name }}</div>
            </FormItem>
            <FormItem label="英文名：" prop="enName" style="width: 50%">
                <Input v-model="userInfo.enName" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.enName }}</div>
            </FormItem>
            <FormItem label="性别：" prop="sex" style="width: 50%">
                <Select v-model="userInfo.sex" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in sexLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.sex ? briefModal.sex.label : '' }}</div>
            </FormItem>
            <FormItem label="邮箱：" prop="email" style="width: 50%">
                <div v-if="isEdit">
                    <Input v-model="userInfo.email.split('@')[0]" disabled style="width:220px;float: left;margin-right: 6px;"/><span>@ivygate.cn</span>
                </div>
                <div v-else>{{ briefModal.email }}</div>
            </FormItem>
            <FormItem label="手机号：" prop="mobile" style="width: 50%">
                <Input v-model="userInfo.mobile" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.mobile }}</div>
            </FormItem>
            <FormItem label="登录密码：" prop="password" style="width: 50%">
                <div v-if="isEdit">
                    <Input v-model="userInfo.password" style="width:320px;"/>
                    <div class="ivu-form-item-error-tip">登录密码如不需修改，置空</div>
                </div>
                <div v-else>{{ briefModal.password }}</div>
            </FormItem>
            <FormItem label="分公司：" prop="company" style="width: 50%">
                <Select v-model="userInfo.companyId" style="width:320px;" v-if="isEdit" @on-change="changeCompanyState">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <div v-else>{{ briefModal.company ? briefModal.company.name : '' }}</div>
            </FormItem>
            <FormItem label="部门：" prop="office" style="width: 50%">
                <Select v-model="userInfo.officeId" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <div v-else>{{ briefModal.office ? briefModal.office.name : '' }}</div>
            </FormItem>
            <FormItem label="兼职机构：" style="width: 50%">
                <Select v-model="moreCompany" multiple style="width: 320px;" v-if="isEdit" @on-change="changeLevelOther('moreCompany')">
                    <Option v-for="item in companyList" v-if="item.id != briefModal.company.id" :value="item.id" :key="'moreCompany' + item.id">{{ item.name }}</Option>
                </Select>
                <div v-else>
                    <p v-for="item in moreCompanyLabel" :key="item">{{ item }}</p>
                </div>
            </FormItem>
            <FormItem label="岗位：" prop="job" style="width: 50%">
                <Select v-model="userInfo.jobId" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in schoolJobList" :value="item.id" :key="item.id">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.job ? briefModal.job.label : '' }}</div>
            </FormItem>
            <FormItem label="职级：" style="width: 50%">
                <div v-if="isEdit" class="level-box">
                   <Select v-model="userInfo.levelId" style="width:320px;" label-in-value @on-change="changeLevelDetail">
                        <OptionGroup v-for="detail in levelList" :label="detail.title" :key="'level' + detail.id">
                            <Option v-for="item in detail.children" :value="item.id" :key="detail.title + item.id">{{ item.title }}</Option>
                        </OptionGroup>
                    </Select>
                </div>
                <div v-else>{{ briefModal.level ? briefModal.level.label : '' }}</div>
            </FormItem>
            <FormItem label="工作地点：" prop="workPlace" style="width: 50%">
                <Input v-model="userInfo.workPlace" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.workPlace }}</div>
            </FormItem>
            <FormItem label="兼职职级：" style="width: 50%">
                <div v-if="isEdit" class="level-box">
                   <Select v-model="levelOther" style="width:320px;" multiple label-in-value @on-change="changeLevelOther('levelOther')">
                        <OptionGroup v-for="detail in levelList" :key="'levelOther' + detail.id" v-if="detail.id != levelMainParent" :label="detail.title">
                            <Option v-for="item in detail.children" :value="item.id" :key="detail.title + item.id">{{ item.title }}</Option>
                        </OptionGroup>
                    </Select>
                </div>
                <div v-else>{{ levelOtherLabel }}</div>
            </FormItem>
            <FormItem label="出生日期：" prop="birthday" style="width: 50%">
                <DatePicker v-model="userInfo.birthday" :options="optionsBirthday" v-if="isEdit" format="yyyy-MM-dd" type="date" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ briefModal.birthday }}</div>
            </FormItem>
            <FormItem label="婚姻状况：" prop="marryStatus" style="width: 50%">
                <Select v-model="userInfo.marryStatus" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in marryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.marryStatus ? briefModal.marryStatus.label : '' }}</div>
            </FormItem>
            <FormItem label="户口性质：" prop="accountCharacter" style="width: 50%">
                <Select v-model="userInfo.accountCharacter" style="width:320px;" v-if="isEdit">
                    <Option v-for="item in accountCharacterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ briefModal.accountCharacter ? briefModal.accountCharacter.label : '' }}</div>
            </FormItem>
            <FormItem label="身份证号：" prop="idCard" style="width: 50%">
                <Input v-model="userInfo.idCard" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.idCard }}</div>
            </FormItem>
            <FormItem label="身份证地址：" prop="idCardAddress" style="width: 50%">
                <Input v-model="userInfo.idCardAddress" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.idCardAddress }}</div>
            </FormItem>
            <FormItem label="现住地址：" prop="currentAddress" style="width: 50%">
                <Input v-model="userInfo.currentAddress" v-if="isEdit" style="width:320px;"/>
                <div v-else>{{ briefModal.currentAddress }}</div>
            </FormItem>
            <FormItem label="身份证扫描件：" style="width: 50%">
                <div v-if="isEdit">
                    <span class="upload-titile" v-show="briefModal.filePath">{{ briefModal.filePath ? briefModal.filePath.split('/').pop() : '' }}</span>
                    <Upload :action="uploadFileUrl" class="margin-bottom"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn">{{ briefModal.filePath ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>
                <a v-else>{{ briefModal.filePath ? briefModal.filePath.split('/').pop() : '' }}</a>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 50px;" v-if="isEdit">
                <div class="btn-box">
                    <Button type="primary" @click="handleSubmit(0)">信息更正</Button>
                    <Button type="primary" style="margin-left: 8px" @click="handleSubmit(1)">保存并生效</Button>
                </div>
            </FormItem>
        </Form>
        <Modal
            v-model="modal"
            class="set-data"
            title="设置生效时间"
            :loading="loading"
            @on-ok="setEffectiveDate">
            <p>提示：生效时间设置并确认后不支持修改。</p>
            <div class="data-b">
                <span class="title">生效时间：</span>
                <DatePicker :options="options" v-model="effectiveDate" format="yyyy-MM-dd" type="date" style="width:320px;display: block;"></DatePicker>
            </div>
        </Modal>
    </div>
</div>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salUserBasicInfo, sys, salCommon } from '../../../libs/request.js';
import { comparison } from '../../../libs/comparison.js';
import { historyLists } from '../../../libs/historyLists.js';

export default {
    props: {
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        const mobileRules = (rule, value, callback) => {
            // console.log(value);
            value = value.replace(/(^\s*)|(\s*$)/g, '').toString();
            let chineseCheck = value.replace(/[\u4e00-\u9fa5]/g,'').toString();
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (chineseCheck != value) {
                callback(new Error('手机号格式不对'));
            } else {
                callback();
            }
        };
        const noSpaceRules = (rule, value, callback) => {
            // console.log(rule);
            // console.log(value);
            let txt = '';
            if(rule.fullField == 'name') txt = '姓名';
            value = value.replace(/(^\s*)|(\s*$)/g, '').toString();
            if (value === '') {
                callback(new Error('请输入' + txt));
            } else {
                callback();
            }
        };
        return {
            version: 0,
            versionLists: [], //版本列表
            updateDate: '',
            isEdit: false, //编辑状态，默认是false
            editFlag: true, //是否显示编辑按钮
            briefModal: {},
            briefModalReset: {},
            jobStatusLists: [], //员工类型列表
            sexLists: [], //性别列表
            functionStatusList: [], //职能性质列表
            statesList: [], //员工状态列表
            companyList: [], //分公司列表
            moreCompany: [], //兼职机构modal
            moreCompanyLabel: [],
            officeList: [], //部门列表
            schoolJobList: [], //岗位
            marryList: [], // 婚姻状况列表
            accountCharacterList: [], // 户口性质列表
            groupId: '',
            phaseName: '',
            briefRules: {
                states: { required: true, message: '请选择', trigger: 'change' },
                name: { required: true, validator: noSpaceRules, trigger: 'blur' },
                logoUrl: [
                    {required: true, message: 'logo不能为空', trigger: 'change'},
                    {type: 'string', message: 'logo必须为jpg或png', pattern: /\w+(\.jpeg|\.png|\.jpg|)/i, trigger: 'blur'}
                ],
                password: { required: false, pattern: /^.{6,32}$/, message: '密码为6-32位数字、字母或符号', trigger: 'blur' },
                mobile: { required: true, validator: mobileRules, trigger: 'blur' },
            },
            modal: false,
            effectiveDate: '',
            loading: true,
            levelList: [], //职级列表
            level: [], //当前员工的职级列表
            levelMainParent: '', //主职级所属大类id
            levelOther: [],
            levelOtherLabel: '',
            userInfo: {},
            userInfoReset: {}, //保存初始对象
            optionsBirthday: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            setLevelMainParent: false,
            firstLevel: true,
            firstCompany: true,
            uploadFileUrl: '',
            uploadData: {
                type: '1',
                dirName: 'all',
                meunId: this.pid
            },
            uploadFormat: ['png','jpeg','jpg','gif'],
            levelTitle: '',
        };
    },
    mounted(){
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getTree();
        this.getBatchListData();
        this.getCompany();
        this.getBriefModal();
        this.getVersionList();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        edit() {
            // 点击编辑按钮
            this.isEdit = true;
        },
        showModal() {
            // 保存并生效
            this.modal = true;
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_user_basic_info_user_status', //员工状态
                'sal_user_basic_info_job_status', //用户类型
                'sal_user_basic_info_sex', //性别
                'sal_user_basic_info_function_status', //职能性质
                'sal_user_basic_info_marry_status', //婚姻状况
                'sal_user_basic_info_account_character', //户口性质
                'xx_school_job', //岗位
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.statesList = data.sal_user_basic_info_user_status;
                    this.jobStatusLists = data.sal_user_basic_info_job_status;
                    this.sexLists = data.sal_user_basic_info_sex;
                    this.functionStatusList = data.sal_user_basic_info_function_status;
                    this.marryList = data.sal_user_basic_info_marry_status;
                    this.accountCharacterList = data.sal_user_basic_info_account_character;
                    this.schoolJobList = data.xx_school_job;
				}
            }).catch(errors.call(this));
        },
        changeCompanyState(item) {
            // 修改分公司
            // console.log(item)
            this.getOffice(item);
            this.briefModal.office.id = '';
            this.briefModal.office.name = '';
            this.userInfo.officeId = item;
            // 兼职机构清空
            if(this.firstCompany) this.firstCompany = false;
            else{
                this.moreCompany = [];
                this.userInfo.partTimeComponyId = '';
            }
        },
        getBriefModal() {
            // 获取页面信息
            let params = {
                userId: this.$route.query.userId
            }
            salUserBasicInfo.formInfo(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.briefModal = data;
                    this.updateDate = data.updateDate ? new Date(data.updateDate).format('yyyy-MM-dd hh:mm:ss') : '';
                    this.getOffice(data.company.id);
                    // 兼职机构, 兼职职级 --- start
                    if(data.levelList && data.levelList.length > 0) {
                        let value = [];
                        let lavel = [];
                        data.levelList.forEach(element => {
                            let obj = element.level;
                            value.push(obj.id);
                            lavel.push(obj.label);
                        });
                        this.levelOther = value;
                        this.levelOtherLabel = lavel.join(',');
                    }
                    if(data.componyList && data.componyList.length > 0) {
                        let value = [];
                        let lavel = [];
                        data.componyList.forEach(element => {
                            value.push(element.id);
                            lavel.push(element.name);
                        });
                        this.moreCompany = value;
                        this.moreCompanyLabel = lavel;
                    }
                    // 兼职机构, 兼职职级 --- end
                    setTimeout(() => {
                        // 对象为null的处理
                        if(!data.jobStatus) this.setNullObj('jobStatus');
                        if(!data.functionStatus) this.setNullObj('functionStatus');
                        if(!data.userStatus) this.setNullObj('userStatus');
                        if(!data.sex) this.setNullObj('sex');
                        if(!data.company) this.setNullObj('company');
                        if(!data.office) this.setNullObj('office');
                        if(!data.job) this.setNullObj('job');
                        if(!data.level) this.setNullObj('level');
                        if(!data.marryStatus) this.setNullObj('marryStatus');
                        if(!data.accountCharacter) this.setNullObj('accountCharacter');
                    }, 0);
                    this.setSaveInfo(data);
                    if(!this.setLevelMainParent && this.levelList.length > 0 && data.level) {
                        this.changeLevelDetail({
                            label: data.level.label,
                            value: data.level.id,
                        });
                        this.setLevelMainParent = true;
                    }
				}
            }).catch(errors.call(this));
        },
        setSaveInfo(data) {
            // 处理保存的格式
            let obj = {
                accountCharacter: data.accountCharacter ? data.accountCharacter.value : '',//户口性质
                birthday: data.birthday,//出生日期
                companyId: data.company ? data.company.id : '',//公司
                currentAddress: data.currentAddress,//现住地址
                // effectDate: , //生效时间
                email: data.email,//邮箱
                enName: data.enName,//英文名
                functionStatus: data.functionStatus ? data.functionStatus.value : '',//职能性质
                id: data.id,
                idCard: data.idCard,//身份证
                idCardAddress: data.idCardAddress,//身份证地址
                idCardAttachmentId: '', //身份证图片附件Id
                idCardUrl: data.filePath, //身份证图片
                // infoId: , //信息ID
                insureCity: data.insureCity,//参保城市
                insurePolicy: data.insurePolicy,//参保政策
                // isEffect: , //是否生效 : 0：否，1：是
                // isTimeEffect: , //是否定时生效 : 0：否，1：是
                jobId: data.job ? data.job.id : '', //工作
                jobStatus: data.jobStatus ? data.jobStatus.value : '', //职位状态
                levelId: data.level ? data.level.id : '',//职级
                // loginName: , //登录名
                marryStatus: data.marryStatus ? data.marryStatus.value : '', //婚姻状态
                mobile: data.mobile, //手机号
                name: data.name, //名称
                officeId: data.office ? data.office.id : '', //办公室
                // operator: , //操作人
                partTimeComponyId: '', //兼职公司 逗号分隔
                partTimeLevelId: '', //兼职职级 逗号分隔
                password: '', //密码
                sex: data.sex ? data.sex.value : '',//性别
                userId: data.userId,
                userStatus: data.userStatus ? data.userStatus.value : '', //用户在职状态
                // versionName: , //版本名称
                workPlace: data.workPlace, //工作地点,
                no: data.no
            }
            if(data.componyList && data.componyList.length > 0) {
                let value = [];
                data.componyList.forEach(element => {
                    value.push(element.id);
                });
                obj.partTimeComponyId = value.join(',');
            }
            if(data.levelList && data.levelList.length > 0) {
                // 兼职职级
                let value = [];
                data.levelList.forEach(element => {
                    let obj = element.level;
                    value.push(obj.id);
                });
                obj.partTimeLevelId = value.join(',');
            }
            // console.log(obj);
            this.userInfo = JSON.parse(JSON.stringify(obj));
            this.userInfoReset = JSON.parse(JSON.stringify(obj));
        },
        setNullObj(item) {
            this.briefModal[item] = {
                id: '',
                value: '',
                label: '',
            }
        },
        getCompany() {
            // 获取分公司列表
            let data = {
                grade: 2,
                types: '1,2'
            }
            this.getOfficeList(data, 'companyList');
        },
        getOffice(id) {
            // 获取部门
            let data = {
                grade: 3,
                types: '1,2',
                parentIds: id
            }
            this.getOfficeList(data, 'officeList');
        },
        getOfficeList(data, type) {
            sys.officeList(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    if(type == 'companyList') {
                        this.companyList = res.data.data.allCompany;
                    }
                    else if(type == 'officeList') this.officeList = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
        },
        handleSubmit (num) {
            this.$refs.briefDetail.validate((valid) => {
                if (valid) {
                    if(num == 0) this.save(num);
                    else this.showModal();
                }
            })
        },
        save(num) {
            // 信息更正：isEffect 1 isTimeEffect 0
            // 保存并生效（当天） isEffect 1 isTimeEffect 1
            // 保存并生效（之后） isEffect 0 isTimeEffect 1
            let params = JSON.parse(JSON.stringify(this.userInfo));
            params.name = params.name.replace(/(^\s*)|(\s*$)/g, '').toString();
            params.mobile = params.mobile.replace(/(^\s*)|(\s*$)/g, '').toString();
            let data = comparison(this.userInfoReset, params);
            params.isTimeEffect = num;
            if(num == 0) { //信息更正
                params.isEffect = 1;
            }else{ //保存并生效
                let b = new Date(this.effectiveDate).format('yyyy-MM-dd') == new Date().format('yyyy-MM-dd');
                if(!b) {
                    // 保存并生效（之后）
                    params = JSON.parse(JSON.stringify(data));
                    params.id = this.userInfo.id;
                    params.userId = this.userInfo.userId;
                    params.isEffect = 0;
                    params.isTimeEffect = num;
                }else{
                    // 保存并生效（当天）
                    params.isEffect = 1;
                }
                // console.log(params);
                params.effectDate = new Date(this.effectiveDate).format('yyyy-MM-dd');
            }
            this.saveAjax(params, data);
            // this.salHistoryLog(data);
        },
        saveAjax(params, data) {
            // 处理需要保存的对象的格式
            salUserBasicInfo.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.isEdit = false;
                    this.getBriefModal();
                    this.salHistoryLog(data);
                }
            }).catch(errors.call(this));
        },
        salHistoryLog(params) {
            // 处理需要保存的历史纪录
            let keyVal = {
                birthday: '出生日期',
                currentAddress: '现住地址',
                email: '邮箱',
                enName: '英文名',
                idCard: '身份证',
                idCardAddress: '身份证地址',
                idCardAttachmentId: '身份证图片附件Id',
                idCardUrl: '身份证图片',
                infoId: '信息ID',
                insureCity: '参保城市',
                // insurePolicy: '参保政策', // 关联字典表,
                loginName: '登录名',
                mobile: '手机号',
                name: '名称',
                operator: '操作人',
                partTimeComponyId: '兼职公司', // 逗号分隔,
                partTimeLevelId: '兼职职级', // 逗号分隔,
                password: '密码',
                userId: '用户编号',
                versionName: '版本名称',
                workPlace: '工作地点',
            }
            console.log(params);
            if(params.idCardAttachmentId) delete params.idCardAttachmentId;
            if(params.idCardUrl) params.idCardUrl = params.idCardUrl.split('/').pop();
            // 处理关联字段
            let before = '';
            if(params.accountCharacter) { //户口性质
                before += '<p>修改户口性质，由 ' + this.findValue(this.accountCharacterList, this.userInfoReset.accountCharacter) + ' 改为 ' + this.findValue(this.accountCharacterList, params.accountCharacter) + '</p>';
            }
            if(params.functionStatus) { //职能性质
                before += '<p>修改职能性质，由 ' + this.findValue(this.functionStatusList, this.userInfoReset.functionStatus) + ' 改为 ' + this.findValue(this.functionStatusList, params.functionStatus) + '</p>';
            }
            if(params.marryStatus) { //婚姻状态
                before += '<p>修改婚姻状态，由 ' + this.findValue(this.marryList, this.userInfoReset.marryStatus) + ' 改为 ' + this.findValue(this.marryList, params.marryStatus) + '</p>';
            }
            if(params.sex) { //性别
                before += '<p>修改性别，由 ' + this.findValue(this.sexLists, this.userInfoReset.sex) + ' 改为 ' + this.findValue(this.sexLists, params.sex) + '</p>';
            }
            if(params.jobStatus) { //员工类型
                before += '<p>修改员工类型，由 ' + this.findValue(this.jobStatusLists, this.userInfoReset.jobStatus) + ' 改为 ' + this.findValue(this.jobStatusLists, params.jobStatus) + '</p>';
            }
            if(params.userStatus) { //员工状态
                before += '<p>修改员工状态，由 ' + this.findValue(this.statesList, this.userInfoReset.userStatus) + ' 改为 ' + this.findValue(this.statesList, params.userStatus) + '</p>';
            }
            if(params.companyId) { //分公司
                before += '<p>修改分公司，由 ' + this.findValue(this.companyList, this.userInfoReset.companyId, 'id', 'name') + ' 改为 ' + this.findValue(this.companyList, params.companyId, 'id', 'name') + '</p>';
            }
            if(params.officeId) { //部门
                before += '<p>修改部门，由 ' + this.findValue(this.officeList, this.userInfoReset.officeId, 'id', 'name') + ' 改为 ' + this.findValue(this.officeList, params.officeId, 'id', 'name') + '</p>';
            }

            // 兼职机构

            if(params.jobId) { //岗位
                before += '<p>修改岗位，由 ' + this.findValue(this.schoolJobList, this.userInfoReset.jobId, 'id', 'label') + ' 改为 ' + this.findValue(this.schoolJobList, params.jobId, 'id', 'label') + '</p>';
            }
            if(params.levelId) { //职级
                before += '<p>修改职级，由 ' + (this.briefModal.level ? this.briefModal.level.label : '') + ' 改为 ' + this.levelTitle + '</p>';
            }

            // 兼职职级

            let history = historyLists(params, this.userInfoReset, keyVal);
            history += before;
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '1')
        },
        findValue(lists, key, val, lab) {
            // console.log(lists);
            // console.log(key);
            let value = val ? val : 'value';
            let label = lab ? lab : 'label';
            let txt = '';
            if(key) {
                let data = lists.filter(function(item){
                    return item[value] == key; 
                });
                if(data.length > 0) txt = data[0][label];
            }
            return txt;
        },
        resetNullObj(item) {
            if(!this.briefModal[item].id) {
                this.briefModal[item] = null;
            }
        },
        setEffectiveDate() {
            if(!this.effectiveDate) this.effectiveDate = new Date();
            this.loading = false;
            this.modal = false;
            this.save(1);
        },
        getTree() {
            // 获取系列
            sys.loadJobTree().then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.levelList = res.data.data.children;
                    if(!this.setLevelMainParent && this.briefModal.level) {
                        this.changeLevelDetail({
                            label: this.briefModal.level.label,
                            value: this.briefModal.level.id,
                        });
                        this.setLevelMainParent = true;
                    }
                }
            }).catch(errors.call(this));
        },
        getVersionList() {
            // 获取版本信息
            let params = {
                userId: this.$route.query.userId
            }
            salUserBasicInfo.getUserBasicInfoVersion(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.versionLists = res.data.data;
                    this.versionLists.unshift({
                        id: 'new-version-1',
                        versionName: '最新版本'
                    });
				}
            }).catch(errors.call(this));
        },
        changeLevelDetail(item) {
            // console.log(item)
            this.levelTitle = item.label;
            this.userInfo.levelId = item.value;
            let level = item.value;
            this.setLevelMainParent = true;
            for (let index = 0; index < this.levelList.length; index++) {
                let arr = this.levelList[index];
                let data = arr.children.filter(item => {
                    return item.id == level;
                })[0];
                if(data) this.levelMainParent = arr.id;
            }
            // 清空兼职职级
            if(this.firstLevel) this.firstLevel = false;
            else{
                this.levelOther = [];
                this.userInfo.partTimeLevelId = '';
            }
            // console.log(this.levelMainParent);
        },
        changeLevelOther(item) {
            if(item == 'moreCompany') {
                this.userInfo.partTimeComponyId = this.moreCompany.join(',');
            }else if(item == 'levelOther'){
                this.userInfo.partTimeLevelId = this.levelOther.join(',');
            }
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            // this.briefModal.attachmentId = res.data.id;
            // this.briefModal.attachmentInfo = res.data;
            this.briefModal.filePath = res.data.filePath;
            this.userInfo.idCardAttachmentId = res.data.id;
            this.userInfo.idCardUrl = res.data.filePath;
            this.$forceUpdate();
            this.updateLoadingStatus({isLoading:false});
            this.$Message.info('上传成功');
        },
        handleBefore () {
            this.updateLoadingStatus({isLoading:true});
            return true
        },
        handleFormatErrorImg(){
            this.updateLoadingStatus({isLoading:false});
            this.$Message.error('请上传' + this.uploadFormat.join('、') + '格式的文件');
        },
        changeVersion(item) {
            // 选择历史版本
            if(item === 0) {
                this.isEdit = true;
                this.editFlag = true;
                this.getBriefModal();
            } else {
                this.isEdit = false;
                this.editFlag = false;
                this.briefModal = this.versionLists[item];
                // this.setBriefModal(this.versionLists[item]);
            }
        },
    }
}
</script>


