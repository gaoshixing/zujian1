<style lang="less">
.core-usermanage-form{
    .box {
        width: 570px;
        position: relative;
        .organizatin-upload {
            width: 120px !important;
            margin-left: 77px;
            margin-top: 14px;
            font-size: 14px;
            .ivu-upload {
                color: #fff;
                background-color: #44bcb7;
                border: none;
                padding: 6px 12px;
            }
        }
        &:after {
            content: "";
            display: block;
            clear: both;
        }
        .add-left {
            float: left;
        }
        .upPhoto {
            position: absolute;
            top: 40px;
            right: 55px;
            .photo {
                width: 80px;
                height: 80px;
                border: 1px solid #e0e0e0;
                margin-left: 77px;
                background-color: #f1f1f1;
                img {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
            }
            .iconPhoto {
                background: #44BCB7;
                color: #FFFFFF;
                margin-top: 15px;
            }
        }
    }
}
</style>
<template>
    <div>
        <Modal :title="addForm.update?addForm.edittitle:addForm.addtitle" v-model="addForm.visible" class-name="vertical-center-modal" width="580px">
            <Form :label-width="72" label-position="right" ref="addForm" class="core-usermanage-form" :rules="ruleValidate" :model="addForm">
                <div class="box">
                    <div class="add-left" style="width: 340px;">
                        <FormItem label="姓名" prop="name">
                            <Input v-model="addForm.name" placeholder="请输入新成员姓名"></Input>
                        </FormItem>
                        <FormItem label="英文名" prop="enName">
                            <Input v-model="addForm.enName" placeholder="请输入新成员的英文名称"></Input>
                        </FormItem>
                        <FormItem label="用户名" prop="loginName">
                            <Input v-model="addForm.loginName" placeholder="请输入新成员的用户名"></Input>
                        </FormItem>
                        <FormItem label="密码" prop="password">
                            <Input type="password" v-model="addForm.password" placeholder="不修改请留空"></Input>
                        </FormItem>
                    </div>
                    <div class="upPhoto">
                        <div class="photo" >
                            <img :src="addForm.photo" alt=""/>
                        </div>
                        <Upload :action="uploadUrl" name="avatar" :on-success="uploadSuccess" ref="upload" class="organizatin-upload" :format="['jpg','jpeg','png']" :show-upload-list="false" :max-size="100" :on-format-error="uploadFormatError" :on-exceeded-size="uploadMaxSize">
                            上传头像
                        </Upload>
                    </div>
                </div>
                <div class="bottom">
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="addForm.email" placeholder="请输入新成员的邮箱"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="mobile">
                        <Input v-model="addForm.mobile" placeholder="请输入新成员的手机号码"></Input>
                    </FormItem>
                    <FormItem label="岗位" prop="jobID">
                        <Select v-model="addForm.jobID" filterable>
                            <Option v-for="item in roleListData" :value="item.id" :key="item.id">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属机构" prop="officeId">
                        <Select v-model="addForm.officeId" filterable>
                            <Option v-for="item in facListData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="职称等级" prop="levelID">
                        <Select v-model="addForm.levelID">
                            <OptionGroup :label="item.title" v-for="item in gradeListData" :key="item.id">
                                <Option v-for="i in item.children" :value="i.id" :key="i.id">{{i.title}}</Option>
                            </OptionGroup>
                        </Select>
                    </FormItem>
                    <FormItem label="描述" prop="remarks" class="last-child">
                        <Input v-model="addForm.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述内容"></Input>
                    </FormItem>
                </div>
            </Form>
            <div slot="footer">
                <Button @click="addMemberClose">取消</Button>
                <Button type="primary" @click="addMemberOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

import valid,{ errors,listJobTree,getOfficeNameList,loadJobTree,uploadUrl,removeUser,saveUser  } from "../libs/request";
import {extendKey} from '../libs/util.js';
import {mapMutations} from 'vuex';


export default {
    props:{
        tableSelectedItem:{
            type:Array,
            required:true,
           
        }
    },
    data() {
        return {
            // 添加成员表单验证
            ruleValidate: {
                name: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],
                enName: [
                    {required: false, message: '英文姓名格式不正确，只能是英文',pattern: /^[a-zA-Z\.\s]+$/, trigger: 'blur'},
                ],
                loginName: [
                    {required: true, message: '登录名不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: false, message: '请填写密码', trigger: 'blur'},
                    {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请填写邮箱', trigger: 'blur'},
                    {type: 'string', pattern: /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请填写正确的邮箱地址', trigger: 'blur'}
                ],
                mobile: [
                    {required: true, message: '请输入常用手机号码', trigger: 'blur'},
                    {type: 'string', pattern: /(^\+1\ ?\d{10}$)|(^1[345678]\d{9}$)|(^\d{1,3}-\d{9,10}$)/, message: '手机号码格式不正确', trigger: 'blur'}
                ],
                jobID: [
                    {required: true, message: '请选择岗位', trigger: 'change'}
                ],
                officeId: [
                    {required: true, message: '请选择所属机构', trigger: 'change'}
                ],
                levelID: [
                    {required: true, message: '请选择职称等级', trigger: 'change'}
                ],
                remarks: [
                    {type: 'string', max: 100, message: '介绍不能大于100字', trigger: 'blur'}
                ]
            },
            addForm: {
                visible:false,
                update:false,
                addtitle:'添加成员',
                edittitle:"修改成员",

                name: "",
                enName: "",
                loginName: "",
                password: "",
                photo: "",
                officeId: '',
                email:'',
                mobile : '',
                jobID: '',
                levelID: "",
                remarks: "",
            },
            // 添加成员三个下拉数据
            facListData:[],
            roleListData:[],
            gradeListData:[],
            uploadUrl:uploadUrl(),
        };
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        showAdd(){
            this.addFacMember();
        },
        showUpdate(){
            this.showUpdateUser();
        },
        showDel(){
            this.showDelUser();
        },
        addFacMember() {
            this.tryGetRoleList();
            this.tryGetFacList();
            this.tryGetGradeList();
            this.$refs.addForm.resetFields();
            this.addForm.photo = '';
            this.addForm.update = false;
            this.addForm.visible = true;
        },
        addMemberOk() {
            this.$refs.addForm.validate((va) => {
                if (va) {
                    //保存数据
                    let param = {
                        'office.id':this.addForm.officeId,
                        'job.id':this.addForm.jobID,
                        name:this.addForm.name,
                        enName: this.addForm.enName,
                        loginName: this.addForm.loginName,
                        password: this.addForm.password,
                        photo: this.addForm.photo,
                        email: this.addForm.email,
                        mobile : this.addForm.mobile,
                        remarks: this.addForm.remarks,
                        level: this.addForm.levelID
                    };
                    if(this.addForm.update){
                        param.id = this.addForm.update.id;
                    }
                    this.updateLoadingStatus({isLoading: true});
                    saveUser(param).then(valid.call(this)).then(res => {
                        if (res.ok) {
                            this.addMemberClose();
                            this.$emit('update','org',{ref:'org'});
                            this.$emit('fresh');
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading: false});
                    });
                }
            });
        },
        addMemberClose() {
            this.addForm.visible = false;
        },
        uploadSuccess(res,file){
            this.addForm.photo = res.data.filePath;
        },
        uploadFormatError() {
            this.$Message.error("需使用jpg、jpeg、png格式图片");
        },
        uploadMaxSize() {
            this.$Message.error("图标大小不能超过100KB");
        },
        showUpdateUser(){
            if(this.tableSelectedItem.length!=1){
                return this.$Message.error("修改成员请选择一个成员");
            }
            this.$refs.addForm.resetFields();
            let user = this.tableSelectedItem[0];
            extendKey(['name','enName','loginName','photo','officeId','email','mobile','jobID','levelID','remarks'],user,this.addForm);
            
            Promise.all([this.tryGetRoleList(),this.tryGetFacList(),this.tryGetGradeList()]).then(()=>{
                this.addForm.update = user;
                this.addForm.visible = true;
            });
        },
        showDelUser(){
            //删除操作  包含删除一个或者多个同时删除
            if (this.tableSelectedItem.length > 0) {
                this.$Modal.confirm({
                    title: '删除成员',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
                        let userList = this.tableSelectedItem.map(item=>{
                            return {id:item.id};
                        });
                        this.updateLoadingStatus({isLoading: true});
                        removeUser(JSON.stringify(userList)).then(valid.call(this)).then((data) => {
                            if (data.ok) {
                                this.$emit('update','org',{ref:'org'});
                                this.$emit('fresh');
                            }
                        }).catch(errors.call(this)).finally( ()=>{
                            this.updateLoadingStatus({isLoading: false});
                        })
                    }
                })
            }
        },
        tryGetRoleList(){ // 添加成员 岗位的下拉数据
            if(!this.roleListData.length){
                this.updateLoadingStatus({isLoading: true});
                return listJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.roleListData = res.data.data;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
            
        },
        tryGetFacList(){ // 添加成员 机构的下拉数据
            if(!this.facListData.length){
                this.updateLoadingStatus({isLoading: true});
                return getOfficeNameList().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.facListData = res.data.data.allOffice;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
            
        },
        tryGetGradeList(){ //  添加成员 职能等级的下拉数据
            if(!this.gradeListData.length){
                return loadJobTree().then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.gradeListData = res.data.data.children;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            }
            return Promise.resolve();
        },
    }
}
</script>


