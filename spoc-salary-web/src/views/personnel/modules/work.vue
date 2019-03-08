<template>
    <Form class="" ref="essentialInformationWork" :model="workModal" :rules="workRules" :label-width="120">
        <FormItem label="公司名称：" prop="componyName" style="width: 50%; height: 32px;">
            <Input v-model="workModal.componyName" style="width:200px;"/>
        </FormItem>
        <FormItem label="入职日期：" prop="entryTime" style="width: 50%">
            <DatePicker v-model="workModal.entryTime" :options="optionsEntry" @on-change="changeEntryTime" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        <FormItem label="离职日期：" prop="departureTime" style="width: 50%">
            <DatePicker v-model="workModal.departureTime" :options="optionsDeparture" format="yyyy年MM月dd日" type="date" style="width:200px;display: block;"></DatePicker>
        </FormItem>
        
        <FormItem label="任职情况：" prop="position" style="width: 50%">
            <Input v-model="workModal.position" style="width:200px;"/>
        </FormItem>
        <FormItem label="工作职责：" prop="workDuty" style="width: 100%">
            <Input type="textarea" v-model="workModal.workDuty" style="width:559px;"/>
        </FormItem>
        <FormItem label="离职证明：" style="width: 50%">
            <span class="upload-titile" v-show="workModal.fileName">{{ workModal.fileName ? workModal.fileName : '' }}</span>
            <Upload :action="uploadFileUrl" style="display: inline-block"
                :data="uploadData"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="uploadFormat">
                <Button type="primary" class="btn">{{ workModal.fileName ? '修改' : '上传'}}</Button>
            </Upload>
        </FormItem>
    </Form>
</template>

<script>

import { mapMutations } from 'vuex';
import valid, { errors, salWorkHistory, salCommon } from '../../../libs/request.js';

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
            workModal: {
                componyName: '',
                entryTime: '',
                departureTime: '',
                position: '',
                workDuty: '',
                attachmentId: '', //离职证明文件
                fileName: '',
            },
            copyWorkModal: {},
            workRules: {
                componyName: { required: true, message: '公司名称不能为空', trigger: 'blur' },
                entryTime: { required: true, type: 'date', message: '入职日期不能为空', trigger: 'change' },
                departureTime: { required: true, type: 'date', message: '离职日期不能为空', trigger: 'change' },
            },
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadFormat: ['png','jpeg','jpg','gif'],
            optionsEntry: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            optionsDeparture: {
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
            this.copyWorkModal = JSON.parse(JSON.stringify(this.workModal));
            this.uploadFileUrl = salCommon.getUploadFileUrl();
            if(this.personnelId) this.getId(this.personnelId);
        },
        getId(id) {
            if(id) {
                let params = {
                    userId: id
                }
                salWorkHistory.list(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let data = res.data.data;
                        if(data.length > 0) {
                            // console.log(res.data.data[0].id);
                            this.workModal.id = res.data.data[0].id;
                        }
                    }
                }).catch(errors.call(this));
            }
        },
        handleSubmit () {
            this.$refs.essentialInformationWork.validate((valid) => {
                if (valid) {
                    // console.log(this.workModal)
                    this.saveWork();
                }else{
                    this.$emit('onStopLoading');
                }
            })
        },
        saveWork() {
            // console.log(this.personnelId);
            let params = JSON.parse(JSON.stringify(this.workModal));
            params.userId = this.personnelId;
            delete params.fileName;
            params.entryTime = this.workModal.entryTime ? this.workModal.entryTime.format('yyyy-MM-dd') : '';
            params.departureTime = this.workModal.departureTime ? this.workModal.departureTime.format('yyyy-MM-dd') : '';
            salWorkHistory.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('goNext');
                    this.$emit('onStopLoading');
                }
            }).catch(errors.call(this));
        },
        handleReset () {
            this.workModal = JSON.parse(JSON.stringify(this.copyWorkModal));
            this.$refs.essentialInformationWork.resetFields();
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.workModal.attachmentId = res.data.id;
            this.workModal.fileName = res.data.fileName;
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
            // 修改入职日期
            this.workModal.departureTime = ''; // 离职日期置空
            if(this.workModal.entryTime) {
                let time = new Date(this.workModal.entryTime).getTime() + 86400000;
                this.optionsDeparture = {
                    disabledDate (date) {
                        return date && date.valueOf() < time || date.valueOf() > Date.now() - 86400000;
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


