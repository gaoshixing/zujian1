<template>
    <Form ref="essentialInformationBrief" :model="personnelModal" :rules="personnelRules" :label-width="120">
        <FormItem label="员工类型：" prop="jobStatus" style="width: 50%">
            <Select v-model="personnelModal.jobStatus" style="width:200px;">
                <Option v-for="item in jobStatusLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="职能性质：" prop="functionStatus" style="width: 50%">
            <Select v-model="personnelModal.functionStatus" style="width:200px;">
                <Option v-for="item in functionStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="员工编号：" prop="no" style="width: 50%">
            <Input v-model="personnelModal.no" disabled style="width:200px;"/>
        </FormItem>
        <FormItem label="员工状态：" prop="userStatus" style="width: 50%">
            <Select v-model="personnelModal.userStatus" style="width:200px;">
                <Option v-for="item in statesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="姓名：" prop="name" style="width: 50%">
            <Input v-model="personnelModal.name" style="width:200px;"/>
        </FormItem>
        <FormItem label="英文名：" prop="enName" style="width: 50%">
            <Input v-model="personnelModal.enName" style="width:200px;"/>
        </FormItem>
        <FormItem label="性别：" prop="sex" style="width: 50%;">
            <Select v-model="personnelModal.sex" style="width:200px;">
                <Option v-for="item in sexLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="邮箱：" prop="email" style="width: 50%">
            <Input v-model="personnelModal.email" style="width:100px;margin-right: 6px;"/>
            <span>@ivygate.cn</span>
        </FormItem>
        <FormItem label="手机号：" prop="mobile" style="width: 50%">
            <Input v-model="personnelModal.mobile" style="width:200px;"/>
        </FormItem>
        <FormItem label="登录密码：" prop="password" style="width: 50%">
            <Input v-model="personnelModal.password" style="width:200px;"/>
        </FormItem>
        <FormItem label="分公司：" prop="companyId" style="width: 50%">
            <Select v-model="personnelModal.companyId" style="width:200px;" @on-change="changeCompanyState">
                <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="部门：" prop="officeId" style="width: 50%">
            <Select v-model="personnelModal.officeId" style="width:200px;">
                <Option v-for="item in officeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="兼职机构：" style="width: 50%">
            <Select v-model="moreCompany" multiple style="width: 200px;" @on-change="changeLevelOther('moreCompany')">
                <Option v-for="item in companyList" v-if="item.id != personnelModal.companyId" :value="item.id" :key="'moreCompany' + item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="岗位：" prop="jobId" style="width: 50%;">
            <Select v-model="personnelModal.jobId" style="width:200px;">
                <Option v-for="item in schoolJobList" :value="item.id" :key="item.id">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="职级：" prop="levelId" style="width: 50%">
            <Select v-model="personnelModal.levelId" style="width:200px;" label-in-value @on-change="changeLevelDetail">
                <OptionGroup v-for="detail in levelList" :key="'levelId' + detail.id" :label="detail.title">
                    <Option v-for="item in detail.children" :value="item.id" :key="detail.title + item.id">{{ item.title }}</Option>
                </OptionGroup>
            </Select>
        </FormItem>
        <FormItem label="工作地点：" prop="workPlace" style="width: 50%;">
            <Input v-model="personnelModal.workPlace" style="width:200px;"/>
        </FormItem>
        <FormItem label="兼职职级：" style="width: 50%;">
            <Select v-model="levelOther" style="width:200px;" multiple label-in-value @on-change="changeLevelOther('levelOther')">
                <OptionGroup v-for="detail in levelList" :key="'levelOther' + detail.id" v-if="detail.id != levelMainParent" :label="detail.title">
                    <Option v-for="item in detail.children" :value="item.id" :key="detail.title + item.id">{{ item.title }}</Option>
                </OptionGroup>
            </Select>
        </FormItem>
        <FormItem label="出生日期：" prop="birthday" style="width: 50%">
            <DatePicker v-model="personnelModal.birthday" :options="options" format="yyyy年MM月dd日" type="date" style="width:200px;"></DatePicker>
        </FormItem>
        <FormItem label="婚姻状况：" prop="marryStatus" style="width: 50%">
            <Select v-model="personnelModal.marryStatus" style="width:200px;">
                <Option v-for="item in marryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="户口性质：" prop="accountCharacter" style="width: 50%">
            <Select v-model="personnelModal.accountCharacter" style="width:200px;">
                <Option v-for="item in accountCharacterList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="身份证号：" prop="idCard" style="width: 50%">
            <Input v-model="personnelModal.idCard" style="width:200px;"/>
        </FormItem>
        <FormItem label="身份证地址：" prop="idCardAddress" style="width: 50%">
            <Input v-model="personnelModal.idCardAddress" style="width:200px;"/>
        </FormItem>
        <FormItem label="现住地址：" prop="currentAddress" style="width: 50%">
            <Input v-model="personnelModal.currentAddress" style="width:200px;"/>
        </FormItem>
        <FormItem label="身份证扫描件：" style="width: 50%">
            <span class="upload-titile" v-show="personnelModal.idCardUrl">{{ personnelModal.idCardUrl ? personnelModal.idCardUrl.split('/').pop() : '' }}</span>
            <Upload :action="uploadFileUrl" class="margin-bottom"
                :data="uploadData" style="display: inline-block"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn">{{ personnelModal.idCardUrl ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
    </Form>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salUserBasicInfo, sys, salCommon } from '../../../libs/request.js';

export default {
    props: {
        personnelId: {
            type: String,
            required: false
        }
    },
    data(){
        const emailRules = (rule, value, callback) => {
            // console.log(value);
            value = value.replace(/(^\s*)|(\s*$)/g, '').toString();
            let chineseCheck = value.replace(/[\u4e00-\u9fa5]|@/g,'').toString();
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (chineseCheck != value) {
                callback(new Error('邮箱格式不对'));
            } else {
                callback();
            }
        };
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
        return {
            jobStatusLists: [], //员工类型列表
            sexLists: [], //性别列表
            functionStatusList: [], //职能性质列表
            statesList: [], //员工状态列表
            companyList: [], //分公司列表
            officeList: [], //部门列表
            schoolJobList: [], //岗位
            marryList: [], // 婚姻状况列表
            accountCharacterList: [], // 户口性质列表
            personnelRules: {
                jobStatus: { required: true, message: '请选择员工类型', trigger: 'change' },
                functionStatus: { required: true, message: '请选择职能性质', trigger: 'change' },
                userStatus: { required: true, message: '请选择员工状态', trigger: 'change' },
                name: { required: true, message: '请输入姓名', trigger: 'blur' },
                email: { required: true, validator: emailRules, trigger: 'blur' },
                mobile: { required: true, validator: mobileRules, trigger: 'blur' },
                companyId: { required: true, message: '请选择分公司', trigger: 'change' },
                // officeId: { required: true, message: '请选择部门', trigger: 'change' },
                jobId: { required: true, message: '请选择岗位', trigger: 'change' },
                levelId: { required: true, message: '请选择职级', trigger: 'change' },
                password: [
                    { required: false, message: '请输入登录密码', trigger: 'blur' },
                    { required: false, pattern: /^.{6,32}$/, message: '密码为6-32位数字、字母或符号', trigger: 'blur' }
                ]
            },
            personnelModal: {
                accountCharacter: '', //户口性质
                birthday: '', //出生日期
                companyId: '', //公司
                currentAddress: '', //现住地址
                email: '', //邮箱
                enName: '', //英文名
                functionStatus: '', //职能性质
                idCard: '', //身份证
                idCardAddress: '', //身份证地址
                idCardAttachmentId: '', //身份证图片附件Id---
                idCardUrl: '', //身份证图片--
                loginName: '', //登录名
                // insureCity: '', //参保城市
                // insurePolicy: '', //参保政策
                isEffect: 1, //是否生效 : 0：否，1：是
                isTimeEffect: 0, //是否定时生效 : 0：否，1：是
                jobId: '', //工作
                jobStatus: '', //职位状态
                levelId: '', //职级
                marryStatus: '', //婚姻状态
                mobile: '', //手机号
                name: '', //名称
                officeId: '', //办公室
                partTimeComponyId: '', //兼职公司 逗号分隔
                partTimeLevelId: '', //兼职职级 逗号分隔
                password: '', //密码
                sex: '', //性别
                // userId: '', //用户编号
                userStatus: '', //用户在职状态
                workPlace: '', //工作地点
                no: ''
            },
            copyPersonnelBriefModal: {},
            uploadFileUrl: '',
            uploadData: {
                type: '1',
                dirName: 'all',
                meunId: this.pid
            },
            uploadFormat: ['png','jpeg','jpg','gif'],
            moreCompany: [], //兼职机构modal
            levelList: [], //职级列表
            levelOther: [],
            levelMainParent: '', //主职级所属大类id
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
        };
    },
    mounted(){
        this.create();
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        create() {
            // console.log(this.personnelId);
            if(this.personnelId) this.getId(this.personnelId);
            this.uploadFileUrl = salCommon.getUploadFileUrl();
            this.getTree();
            this.getBatchListData();
            this.getCompany();
            this.copyPersonnelBriefModal = JSON.parse(JSON.stringify(this.personnelModal));
        },
        getId(id) {
            if(id) {
                let params = {
                    userId: id
                }
                salUserBasicInfo.formInfo(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        // let data = res.data.data;
                        // console.log(res.data.data.id);
                        this.personnelModal.id = res.data.data.id;
                    }
                }).catch(errors.call(this));
            }
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
            this.personnelModal.officeId = '';
            this.moreCompany = [];
            this.personnelModal.partTimeComponyId = '';
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
                    if(type == 'companyList') this.companyList = res.data.data.allCompany;
                    else if(type == 'officeList') this.officeList = res.data.data.allCompany;
                }
            }).catch(errors.call(this));
        },
        handleSubmit () {
            this.$refs.essentialInformationBrief.validate((valid) => {
                if (valid) {
                    // console.log(this.personnelModal)
                    this.saveBrief();
                }else{
                    this.$emit('onStopLoading');
                }
            })
        },
        handleReset () {
            this.personnelModal = JSON.parse(JSON.stringify(this.copyPersonnelBriefModal));
            this.$refs.essentialInformationBrief.resetFields();
        },
        saveBrief() {
            // 保存基本信息
            // console.log(this.personnelId);
            let params = JSON.parse(JSON.stringify(this.personnelModal));
            params.loginName = this.personnelModal.email;
            params.email = this.personnelModal.email ? this.personnelModal.email + '@ivygate.cn' : '';
            params.birthday = this.personnelModal.birthday ? this.personnelModal.birthday.format('yyyy-MM-dd') : '';
            delete params.no;
            if(this.personnelId) params.userId = this.personnelId;
            salUserBasicInfo.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('goNext', res.data.data);
                    this.$emit('onStopLoading');
                }
            }).catch(errors.call(this));
        },
        handleSuccessImg (res, file, fileList) {
            this.personnelModal.idCardAttachmentId = res.data.id;
            this.personnelModal.idCardUrl = res.data.filePath;
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
        getTree() {
            // 获取系列
            console.log('getTree')
            sys.loadJobTree().then(valid.call(this)).then(res => {
                if(res.ok) {
                    console.log(res.data.data)
                    this.levelList = res.data.data.children;
                }
            }).catch(errors.call(this));
        },
        changeLevelDetail(item) {
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
            this.levelOther = [];
            this.personnelModal.partTimeLevelId = '';
            // console.log(this.levelMainParent);
        },
        changeLevelOther(item) {
            if(item == 'moreCompany') {
                this.personnelModal.partTimeComponyId = this.moreCompany.join(',');
            }else if(item == 'levelOther'){
                this.personnelModal.partTimeLevelId = this.levelOther.join(',');
            }
        },
    },
}
</script>


