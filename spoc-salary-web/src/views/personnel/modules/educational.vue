<template>
    <Form class="" ref="essentialInformationEdu" :model="edulModal" :rules="eduRules" :label-width="120">
        <FormItem label="学校名称：" prop="schoolName" style="width: 50%; height: 32px;">
            <Input v-model="edulModal.schoolName" style="width:200px;"/>
        </FormItem>
        <FormItem label="专业名称：" prop="majorName" style="width: 50%; height: 32px;">
            <Input v-model="edulModal.majorName" style="width:200px;"/>
        </FormItem>
        <FormItem label="入学日期：" prop="entranceDate" style="width: 50%">
            <DatePicker v-model="edulModal.entranceDate" :options="optionsEntry" @on-change="changeEntryTime" format="yyyy年MM月dd日" type="date" style="width:200px;"></DatePicker>
        </FormItem>
        <FormItem label="毕业日期：" prop="graduationDate" style="width: 50%">
            <DatePicker v-model="edulModal.graduationDate" :options="optionsDeparture" format="yyyy年MM月dd日" type="date" style="width:200px;"></DatePicker>
        </FormItem>
        <FormItem label="学历：" prop="education" style="width: 50%">
            <Select v-model="edulModal.education" style="width:200px;">
                <Option v-for="item in degreeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="学位：" prop="degree" style="width: 50%">
            <Select v-model="edulModal.degree" style="width:200px;">
                <Option v-for="item in educationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="教育类型：" prop="educationType" style="width: 50%">
            <Select v-model="edulModal.educationType" style="width:200px;">
                <Option v-for="item in typeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="学历证书：" style="width: 50%">
            <span class="upload-titile" v-show="edulModal.fileName">{{ edulModal.fileName ? edulModal.fileName : '' }}</span>
            <Upload :action="uploadFileUrl" class="margin-bottom"
                :data="uploadData" style="display: inline-block"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn">{{ edulModal.fileName ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
        <FormItem label="备注：" prop="remarks" style="width: 100%">
            <Input type="textarea" v-model="edulModal.remarks" style="width:559px;"/>
        </FormItem>
    </Form>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salUserEducation, salCommon, sys } from '../../../libs/request.js';

export default {
    props: {
        personnelId: {
            type: String,
            required: false
        },
        pid: {
            type: [Number, String],
            required: true,
        },
    },
    data(){
        return {
            edulModal: {
                attachmentId: '', //学历证书附件表
                fileName: '', //学历证书
                degree: '', //学位
                education: '', //学历
                educationType: '', //教育类型
                entranceDate: '', //入学日期
                graduationDate: '', //毕业日期
                majorName: '', //专业名称
                schoolName: '', //学校名称
                graduationDateError: false,
            },
            edulModalReset: {},
            eduRules: {
                schoolName: { required: true, message: '学校名称不能为空', trigger: 'blur' },
                entranceDate: { required: true, type: 'date', message: '入学日期不能为空', trigger: 'change' },
            },
            educationList: [],
            degreeLists: [],
            typeLists: [],
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadFormat: ['png','jpeg','jpg','gif'],
            optionsEntry: { //入学日期
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            optionsDeparture: { //毕业日期
                disabledDate (date) {
                    return date;
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
            // monted
            // console.log(this.personnelId);
            if(this.personnelId) this.getId(this.personnelId);
            this.uploadFileUrl = salCommon.getUploadFileUrl();
            this.getBatchListData();
            this.edulModalReset = JSON.parse(JSON.stringify(this.edulModal));
        },
        getId(id) {
            if(id) {
                let params = {
                    userId: id
                }
                salUserEducation.list(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let data = res.data.data;
                        if(data.length > 0) {
                            // console.log(res.data.data[0].id);
                            this.edulModal.id = res.data.data[0].id;
                        }
                    }
                }).catch(errors.call(this));
            }
        },
        getBatchListData() {
            // 获取字典字段
            let arr = [
                'sal_user_education_education', //学历
                'sal_user_education_degree', //学位
                'sal_user_education_education_type', //教育类型
            ];
            let params = {
                types: arr.join()
            }
            sys.batchListData(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.educationList = data.sal_user_education_education;
                    this.degreeLists = data.sal_user_education_degree;
                    this.typeLists = data.sal_user_education_education_type;
				}
            }).catch(errors.call(this));
        },
        // essentialInformationEdu
        handleSubmit () {
            this.$refs.essentialInformationEdu.validate((valid) => {
                if (valid) {
                    // console.log(this.edulModal)
                    this.saveEdu();
                }else{
                    this.$emit('onStopLoading');
                }
            })
        },
        saveEdu() {
            // console.log(this.personnelId);
            let params = JSON.parse(JSON.stringify(this.edulModal));
            params.userId = this.personnelId;
            delete params.fileName;
            params.entranceDate = this.edulModal.entranceDate ? this.edulModal.entranceDate.format('yyyy-MM-dd') : '';
            params.graduationDate = this.edulModal.graduationDate ? this.edulModal.graduationDate.format('yyyy-MM-dd') : '';
            salUserEducation.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('goNext');
                    this.$emit('onStopLoading');
                }
            }).catch(errors.call(this));
        },
        handleReset () {
            this.edulModal = JSON.parse(JSON.stringify(this.edulModalReset));
            this.$refs.essentialInformationEdu.resetFields();
        },

        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.edulModal.attachmentId = res.data.id;
            this.edulModal.fileName = res.data.fileName;
            this.edulModal.certificateUrl = res.data.filePath;
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
        changeEntryTime(item) {
            // 修改入学日期
            this.edulModal.graduationDate = ''; // 毕业日期置空
            if(this.edulModal.entranceDate) {
                let time = new Date(this.edulModal.entranceDate).getTime() + 86400000;
                this.optionsDeparture = {
                    disabledDate (date) {
                        return date && date.valueOf() < time;
                    }
                }
            } else {
                this.optionsDeparture = {
                    disabledDate (date) {
                        return date
                    }
                }
            }
        },
    },
}
</script>


