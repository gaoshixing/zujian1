<style lang="less">
.educational-container{
    padding: 20px 30px;
    .upload-titile{
        margin-right: 8px;
    }
}
</style>
    
<template>
<div class="educational-container">
    <div class="clearfix">
        <a @click="showAddCard" class="show-add-card">+ 添加教育背景</a>
        <!-- <Button type="primary" @click="showAddCard" class="show-add-card">添加教育背景</Button> -->
    </div>
    <div class="work-item" v-for="(educationalModal, index) in educationalLists" :key="educationalModal.id">
        <div class="btns">
            <a @click="edit(educationalModal)" v-if="!educationalModal.isEdit">编辑</a>
            <a v-if="!educationalModal.isEdit" @click="showDel(educationalModal.id)" style="margin-left: 16px;color:red;">删除</a>
            <a v-if="educationalModal.isEdit" @click="hide(educationalModal, index, 'briefDetail' + index)">保存</a>
        </div>
        <Form :ref="'briefDetail' + index" :model="educationalModal" :rules="educationalRules" :label-width="120">
            <FormItem label="学校名称：" prop="schoolName" style="width: 50%">
                <Input v-model="educationalModal.schoolName" v-if="educationalModal.isEdit" style="width:320px;"></Input>
                <div v-else>{{ educationalModal.schoolName }}</div>
            </FormItem>
            <FormItem label="专业名称：" prop="majorName" style="width: 50%">
                <Input v-model="educationalModal.majorName" v-if="educationalModal.isEdit" style="width:320px;"></Input>
                <div v-else>{{ educationalModal.majorName }}</div>
            </FormItem>
            <FormItem label="入学日期：" prop="entranceDate" :class="{ 'ivu-form-item-error': educationalModal.graduationDateError }" style="width: 50%">
                <DatePicker v-model="educationalModal.entranceDate" @on-change="changeGraduationDate(educationalModal)" :options="options" v-if="educationalModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择入职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ educationalModal.entranceDate }}</div>
            </FormItem>
            <FormItem label="毕业日期：" prop="graduationDate"  :class="{ 'ivu-form-item-error': educationalModal.graduationDateError }"style="width: 50%">
                <DatePicker v-model="educationalModal.graduationDate" @on-change="changeGraduationDate(educationalModal)" v-if="educationalModal.isEdit" format="yyyy年MM月dd日" type="date" placeholder="请选择离职日期" style="width:320px;display: block;"></DatePicker>
                <div v-else>{{ educationalModal.graduationDate }}</div>
            </FormItem>
            <FormItem label="学历：" prop="education" style="width: 50%">
                <Select v-model="educationalModal.education" style="width:320px;" v-if="educationalModal.isEdit">
                    <Option v-for="item in degreeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ educationalModal.educationLabel }}</div>
            </FormItem>
            <FormItem label="学位：" prop="degree" style="width: 50%">
                <Select v-model="educationalModal.degree" style="width:320px;" v-if="educationalModal.isEdit">
                    <Option v-for="item in educationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ educationalModal.degreeLabel }}</div>
            </FormItem>
            <FormItem label="教育类型：" prop="educationType" style="width: 50%">
                <Select v-model="educationalModal.educationType" style="width:320px;" v-if="educationalModal.isEdit">
                    <Option v-for="item in typeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div v-else>{{ educationalModal.educationTypeLabel }}</div>
            </FormItem>
            <FormItem label="学历证书：" style="width: 100%">
                <div v-if="educationalModal.isEdit" class="margin-bottom">
                    <span class="upload-titile" v-show="educationalModal.attachment">{{ educationalModal.attachment ? educationalModal.attachment.realName : '' }}</span>
                    <Upload :action="uploadFileUrl"
                        :data="uploadData" style="display: inline-block"
                        name="files"
                        :show-upload-list="false"
                        :before-upload="handleBefore"
                        :on-success="handleSuccessImg"
                        :on-format-error="handleFormatErrorImg"
                        :format="uploadFormat">
                        <Button type="primary" class="btn upload-btn" @click="uploadAttachment(educationalModal)">{{ educationalModal.attachment ? '修改' : '上传'}}</Button>
                    </Upload>
                </div>

                <div v-else>{{ educationalModal.attachment ? educationalModal.attachment.realName : '' }}</div>
            </FormItem>
            <FormItem label="备注：" prop="remarks" style="width: 100%">
                <Input type="textarea" v-model="educationalModal.remarks" v-if="educationalModal.isEdit" style="width:320px;"></Input>
                <div v-else>{{ educationalModal.remarks }}</div>
            </FormItem>
        </Form>
    </div>
    <div class="work-item" v-show="newListsShow">
        <Form ref="educationalNew" :model="newLists" :rules="educationalRules" :label-width="120">
            <FormItem label="学校名称：" prop="schoolName" style="width: 50%">
                <Input v-model="newLists.schoolName" style="width:320px;"></Input>
            </FormItem>
            <FormItem label="专业名称：" prop="majorName" style="width: 50%">
                <Input v-model="newLists.majorName" style="width:320px;"></Input>
            </FormItem>
            <FormItem label="入学日期：" prop="entranceDate" style="width: 50%" :class="{ 'ivu-form-item-error': newLists.graduationDateError }">
                <DatePicker v-model="newLists.entranceDate" :options="options" @on-change="changeGraduationDate(newLists)" format="yyyy年MM月dd日" type="date" placeholder="请选择入学日期" style="width:320px;display: block;"></DatePicker>
            </FormItem>
            <FormItem label="毕业日期：" prop="graduationDate" :class="{ 'ivu-form-item-error': newLists.graduationDateError }" style="width: 50%">
                <DatePicker v-model="newLists.graduationDate" @on-change="changeGraduationDate(newLists)" format="yyyy年MM月dd日" type="date" placeholder="请选择毕业日期" style="width:320px;display: block;"></DatePicker>
            </FormItem>

            <FormItem label="学历：" prop="education" style="width: 50%">
                <Select v-model="newLists.education" style="width:320px;">
                    <Option v-for="item in degreeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="学位：" prop="degree" style="width: 50%">
                <Select v-model="newLists.degree" style="width:320px;">
                    <Option v-for="item in educationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="教育类型：" prop="educationType" style="width: 50%">
                <Select v-model="newLists.educationType" style="width:320px;">
                    <Option v-for="item in typeLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="学历证书：" style="width: 100%">
                <span class="upload-titile" v-show="newLists.attachment">{{ newLists.attachment ? newLists.attachment.realName : '' }}</span>
                <Upload :action="uploadFileUrl" class="margin-bottom"
                    :data="uploadData" style="display: inline-block"
                    name="files"
                    :show-upload-list="false"
                    :before-upload="handleBefore"
                    :on-success="handleSuccessImg"
                    :on-format-error="handleFormatErrorImg"
                    :format="uploadFormat">
                    <Button type="primary" class="btn upload-btn" @click="uploadAttachment(newLists)">{{ newLists.attachment ? '修改' : '上传'}}</Button>
                </Upload>
            </FormItem>
            <FormItem label="备注：" prop="remarks" style="width: 100%">
                <Input type="textarea" v-model="newLists.remarks" style="width:320px;"></Input>
            </FormItem>
            <FormItem style="width: 100%;margin-top: 10px;">
                <Button type="primary" @click="cancle">取消</Button>
                <Button type="primary" style="margin-left: 8px" @click="saveNewLists">保存</Button>
            </FormItem>
        </Form>
    </div>
    <Modal
        v-model="modal"
        class="set-data"
        title="提示"
        @on-ok="deleteEduca">
        确定删除当前工作经历？
    </Modal>
</div>
</template>

<script>


import { mapMutations } from 'vuex';
import valid, { errors, salUserEducation, salCommon, sys } from '../../../libs/request.js';
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
        const noSpaceRules = (rule, value, callback) => {
            let txt = '';
            if(rule.fullField == 'schoolName') txt = '学校名称';
            value = value.replace(/(^\s*)|(\s*$)/g, '').toString();
            if (value === '') {
                callback(new Error(txt + '不能为空'));
            } else {
                callback();
            }
        };
        return {
            modal: false,
            delId: '',
            educationalLists: [],
            educationalListsReset: [],
            newLists: {
                attachmentId: '', //学历证书附件表
                degree: '', //学位
                education: '', //学历
                educationType: '', //教育类型
                entranceDate: '', //入学日期
                graduationDate: '', //毕业日期
                majorName: '', //专业名称
                schoolName: '', //学校名称
                userId: this.$route.query.userId,
                graduationDateError: false,
            },
            newListsReset: {},
            newListsShow: false,
            educationalRules: {
                schoolName: { required: true, validator: noSpaceRules, trigger: 'blur' },
                entranceDate: { required: true, type: 'date', message: '入学日期不能为空', trigger: 'change' },
            },
            educationList: [],
            degreeLists: [],
            typeLists: [],
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            uploadFileUrl: '',
            uploadData: {
                type: '0',
                dirName: 'all',
                meunId: this.pid
            },
            uploadItem: {},
            uploadFormat: ['png','jpeg','jpg','gif']
        };
    },
    mounted(){
        this.uploadFileUrl = salCommon.getUploadFileUrl();
        this.getBatchListData();
        this.getLists(this.$route.query.userId);
        this.newListsReset = JSON.parse(JSON.stringify(this.newLists));
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getLists(id) {
            let params = {
                userId: id
            }
            salUserEducation.list(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    let data = res.data.data;
                    this.educationalLists = data;
                    this.educationalLists.forEach(element => {
                        element.attachmentId = element.attachment ? element.attachment.id : '';
                        element.isEdit = false;
                        element.graduationDateError = false;
                    });
                    this.educationalListsReset = JSON.parse(JSON.stringify(this.educationalLists));
				}
            }).catch(errors.call(this));
        },
        showAddCard() {
            // 添加工作经历
            this.newListsShow = true;
        },
        edit(obj) {
            // 编辑
            obj.isEdit = true;
            this.$forceUpdate();
        },
        hide(obj, index, name) {
            // 保存
            obj.schoolName = obj.schoolName.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(obj));       
            delete params.isEdit;
            params.userId = this.$route.query.userId;
            delete params.graduationDateError;
            delete params.attachment;
            if(params.entranceDate) params.entranceDate = obj.entranceDate.format('yyyy-MM-dd');
            if(params.graduationDate) params.graduationDate = obj.graduationDate.format('yyyy-MM-dd');
            this.save(params, name, index);
        },
        saveNewLists() {
            // 新增-保存
            this.newLists.schoolName = this.newLists.schoolName.replace(/(^\s*)|(\s*$)/g, '').toString();
            let params = JSON.parse(JSON.stringify(this.newLists));   
            if(this.newLists.graduationDateError) {
                return false;
            }
            delete params.graduationDateError;
            delete params.attachment;
            if(params.entranceDate) params.entranceDate = this.newLists.entranceDate.format('yyyy-MM-dd');
            if(params.graduationDate) params.graduationDate = this.newLists.graduationDate.format('yyyy-MM-dd');
            this.save(params, 'educationalNew');
        },
        save(params, name, index) {
            // console.log(name)
            let obj;
            if(name == 'educationalNew') obj = this.$refs[name];
            else obj = this.$refs[name][0];
            obj.validate((valid) => {
                if (valid) {
                    this.saveAjax(params, name, index);
                }
            })
        },
        saveAjax(params, name, index) {
            salUserEducation.save(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.newLists = JSON.parse(JSON.stringify(this.newListsReset));
                    this.newListsShow = false;
                    this.getLists(this.$route.query.userId);
                    this.salHistoryLog(name, index);
				}
            }).catch(errors.call(this));
        },
        salHistoryLog(str, index) {
            // 处理需要保存的历史纪录
            let keyVal = {
                // attachmentId: '附件对象',
                // degree: '学位', //关联字典表,
                // education: '学历', //关联字典表,
                // educationType: '教育类型', //关联字典表,
                entranceDate: '入学日期',
                graduationDate: '毕业日期',
                majorName: '专业名称',
                remarks: '备注',
                schoolName: '学校名称',
            };
            let history = '';
            if(str == 'educationalNew') history += '<p>新增教育背景</p>';
            else if(str == 'delete') history += '<p>删除教育背景</p>';
            else {
                let before = '';
                let data = JSON.parse(JSON.stringify(this.educationalLists[index]));
                if(data.entranceDate) data.entranceDate = new Date(data.entranceDate).format('yyyy-MM-dd');
                if(data.graduationDate) data.graduationDate = new Date(data.graduationDate).format('yyyy-MM-dd');
                let params = comparison(this.educationalListsReset[index], data);
                // 学历证书
                if(params.attachment) {
                    before += '<p>修改学历证书，由 ' + (this.educationalListsReset[index].attachment ? this.educationalListsReset[index].attachment.realName : '') + ' 改为 ' + params.attachment.realName + '</p>';
                }
                if(params.education) { //学历
                    before += '<p>修改学历，由 ' + this.educationalListsReset.educationLabel + ' 改为 ' + this.findValue(this.degreeLists, params.education) + '</p>';
                }
                if(params.degree) { //学位
                    before += '<p>修改学位，由 ' + this.educationalListsReset.degreeLabel + ' 改为 ' + this.findValue(this.educationList, params.degree) + '</p>';
                }
                if(params.educationType) { //教育类型
                    before += '<p>修改教育类型，由 ' + this.educationalListsReset.educationTypeLabel + ' 改为 ' + this.findValue(this.typeLists, params.educationType) + '</p>';
                }
                before += historyLists(params, this.educationalListsReset[index], keyVal);
                history += before;
            }
            // console.log(history);
            this.$emit('postSalHistoryLog', history, '3');
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
        cancle() {
            // 新增-取消
            this.newLists = JSON.parse(JSON.stringify(this.newListsReset));
            this.newListsShow = false;
        },
        showDel(id) {
            this.delId = id;
            this.modal = true;
        },
        deleteEduca() {
            let params = {
                id: this.delId
            }
            salUserEducation.delete(params).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.$Message.success('删除成功');
                    this.salHistoryLog('delete');
                    this.getLists(this.$route.query.userId);
				}
            }).catch(errors.call(this));
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
                    this.degreeLists = data.sal_user_education_education;
                    this.educationList = data.sal_user_education_degree;
                    this.typeLists = data.sal_user_education_education_type;
				}
            }).catch(errors.call(this));
        },
        changeGraduationDate(obj) {
            // 判断毕业日期和入学日期是否合理
            if(obj.graduationDate && obj.graduationDate < obj.entranceDate) {
                obj.graduationDateError = true;
                this.$Message.error('毕业日期不能在入学日期之前');
            }else{
                obj.graduationDateError = false;
            }
            this.$forceUpdate();
        },
        uploadAttachment(item) {
            this.uploadItem = item;
        },
        handleSuccessImg (res, file, fileList) {
            // console.log(res.data)
            this.uploadItem.attachmentId = res.data.id;
            this.uploadItem.attachment = res.data;
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
    }
}
</script>



