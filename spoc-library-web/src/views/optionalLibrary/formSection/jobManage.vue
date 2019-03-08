<style lang="less">
.library_jobManage{
    @acolor:#44bcb7;
    @border:#e9eaec;
    margin: 20px 0;
    .list{
        background-color: #ffffff;
        border: solid 1px @border;
        border-bottom: none;
        .t1{
            width: 20%;
            float: left;
        }
        .t2{
            width: 60%;
            float: left;
            border-left: 1px solid @border;
            border-right: 1px solid @border;
        }
        .t3{
            width: 20%;
            float: left;
        }
        .thead{
            background-color: #f7f7f7;       
            overflow: hidden;
            .th{
                text-align: center;
                height: 40px;
                line-height: 40px;
            }
        }
        .tbody{
            border-bottom: 1px solid @border;
            .tr{
                border-top: 1px solid @border;
                overflow: hidden;
                .td{
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    &>a{
                        color: @acolor;
                    }
                }
            }
        }
        .tfooter{
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid @border;
            .ivu-btn{
                width: 90px;
                height: 30px;
                &+.ivu-btn{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="library_jobManage" :style="paddingCls">
        <template v-if="isjob">
            <div class="list">
                <div class="thead">
                    <div class="th t1">序号</div>
                    <div class="th t2">职业名称</div>
                    <div class="th t3">操作</div>
                </div>
                <div class="tbody">
                    <CheckboxGroup v-model="jobChecked">
                    <div class="tr" v-for="(item,index) in jobDataList" :key="index">
                        <div class="td t1">
                            <template v-if="readonly">{{index+1}}</template>
                            <Checkbox v-else :label="item.id">{{index+1}}</Checkbox>
                        </div>
                        <div class="td t2">
                            {{item.name}}
                        </div>
                        <div class="td t3">
                            <a @click="editJob(item)" v-if="!readonly">编辑</a>
                            <a @click="doviewJob(item)">查看</a>
                        </div>
                    </div>
                    </CheckboxGroup>
                </div>
                <div class="tfooter" v-if="!readonly">
                    <Button type="success" @click.native.stop="addJobItem">添加</Button>
                    <Button @click.native.stop="delJobItem">删除</Button>
                </div>
            </div>
        </template>
        <template v-else-if="isbranch">
            <div class="list">
                <div class="thead">
                    <div class="th t1">序号</div>
                    <div class="th t2">专业分支/分类</div>
                    <div class="th t3">操作</div>
                </div>
                <div class="tbody">
                    <CheckboxGroup v-model="branchChecked">
                    <div class="tr"  v-for="(item,index) in branchDataList" :key="index">
                        <div class="td t1">
                            <template v-if="readonly">{{index+1}}</template>
                            <Checkbox v-else :label="item.id">{{index+1}}</Checkbox>
                        </div>
                        <div class="td t2">
                           {{item.name}}
                        </div>
                        <div class="td t3">
                            <a @click="editBranch(item)" v-if="!readonly">编辑</a>
                            <a @click="doviewBranch(item)">查看</a>
                        </div>
                    </div>
                    </CheckboxGroup>
                </div>
                <div class="tfooter" v-if="!readonly">
                    <Button type="success" @click.native.stop="addBranchItem">添加</Button>
                    <Button @click.native.stop="delBranchItem">删除</Button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="list">
                <div class="thead">
                    <div class="th t1">序号</div>
                    <div class="th t2">执业职格考试名称</div>
                    <div class="th t3">操作</div>
                </div>
                <div class="tbody">
                    <CheckboxGroup v-model="examChecked">
                    <div class="tr"  v-for="(item,index) in examDataList" :key="index">
                        <div class="td t1">
                            <template v-if="readonly">{{index+1}}</template>
                            <Checkbox v-else :label="item.id">{{index+1}}</Checkbox>
                        </div>
                        <div class="td t2">
                           {{item.name}}
                        </div>
                        <div class="td t3">
                            <a @click="editExam(item)" v-if="!readonly">编辑</a>
                            <a @click="doviewExam(item)">查看</a>
                        </div>
                    </div>
                    </CheckboxGroup>
                </div>
                <div class="tfooter" v-if="!readonly">
                    <Button type="success" @click.native.stop="addExamItem">添加</Button>
                    <Button @click.native.stop="delExamItem">删除</Button>
                </div>
            </div>
        </template>
        
        <Modal v-if="isjob" :title="addJobForm.update?addJobForm.edittitle:addJobForm.addtitle" v-model="addJobForm.visible" class-name="vertical-center-modal" width="580px">
            <Form :label-width="72" label-position="right" ref="addJobForm" class="core-usermanage-form" :rules="addJobForm.ruleValidate" :model="addJobForm.data">
                <FormItem label="职业名称" prop="name">
                    <v-select v-model="addJobForm.data.name" :readonly="addJobForm.readonly || addJobForm.viewonly" :datafunc="getJobSelectData" @selected="onJobSelected"></v-select>
                </FormItem>
                <FormItem label="What you do" prop="todo">
                    <Input type="textarea" v-model="addJobForm.data.todo" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="Did you know" prop="know">
                    <Input type="textarea" v-model="addJobForm.data.know" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="Are you ready to" prop="ready">
                    <Input type="textarea" v-model="addJobForm.data.ready" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="It helps to be" prop="help">
                    <Input type="textarea" v-model="addJobForm.data.help" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="Make high school count" prop="beneficialCourse">
                    <Input type="textarea" v-model="addJobForm.data.beneficialCourse" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="Outlook" prop="outlook">
                    <Input type="textarea" v-model="addJobForm.data.outlook" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
                <FormItem label="compension" prop="compension">
                    <Input type="textarea" v-model="addJobForm.data.compension" :disabled="addJobForm.viewonly"></Input>
                </FormItem>
            </Form>
            <div slot="footer" v-if="!addJobItem.viewonly">
                <template v-if="!addJobForm.viewonly">
                <Button @click="addJobClose">取消</Button>
                <Button type="primary" @click="addJobOk">确定</Button>
                </template>
            </div>
        </Modal>
        <Modal v-if="!isjob && !isbranch" :title="addExamForm.update?addExamForm.edittitle:addExamForm.addtitle" v-model="addExamForm.visible" class-name="vertical-center-modal" width="580px">
            <Form :label-width="72" label-position="right" ref="addExamForm" class="core-usermanage-form" :rules="addExamForm.ruleValidate" :model="addExamForm.data">
                <FormItem label="名称" prop="name">
                    <v-select v-model="addExamForm.data.name" :readonly="addExamForm.readonly || addExamForm.viewonly" :datafunc="getExamSelectData" @selected="onExamSelected"></v-select>
                </FormItem>
                <FormItem label="简介" prop="descr">
                    <Input type="textarea" v-model="addExamForm.data.descr" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="报考资格" prop="qualification">
                    <Input type="textarea" v-model="addExamForm.data.qualification" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="考试课程" prop="officeCource">
                    <Input type="textarea" v-model="addExamForm.data.officeCource" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="考试规则" prop="rule">
                    <Input type="textarea" v-model="addExamForm.data.rule" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="考试内容" prop="content">
                    <Input type="textarea" v-model="addExamForm.data.content" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="获得工作经验拿到证书" prop="cerRequire">
                    <Input type="textarea" v-model="addExamForm.data.cerRequire" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
                <FormItem label="官方网站" prop="officeUrl">
                    <Input type="textarea" v-model="addExamForm.data.officeUrl" :disabled="addExamForm.viewonly"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <template v-if="!addExamForm.viewonly">
                <Button @click="addExamClose">取消</Button>
                <Button type="primary" @click="addExamOk">确定</Button>
                </template>
            </div>
        </Modal>
        <Modal v-if="isbranch" :title="addBranchForm.update?addBranchForm.edittitle:addBranchForm.addtitle" v-model="addBranchForm.visible" class-name="vertical-center-modal" width="580px">
            <Form :label-width="72" label-position="right" ref="addBranchForm" class="core-usermanage-form" :rules="addBranchForm.ruleValidate" :model="addBranchForm.data">
                <FormItem label="名称">
                    <Input v-model="addBranchForm.data.name" :disabled="addBranchForm.viewonly"></Input>
                </FormItem>
                <FormItem label="描述">
                    <Input type="textarea" v-model="addBranchForm.data.remarks" :disabled="addBranchForm.viewonly"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <template v-if="!addBranchForm.viewonly">
                    <Button @click="addBranchClose">取消</Button>
                    <Button type="primary" @click="addBranchOk">确定</Button>
                </template>
            </div>
        </Modal>
    </div>
</template>
<script>
import valid, { errors, major } from "../../../libs/request.js";
import {mapMutations,mapGetters} from 'vuex';
import {urlPath} from '../../../libs/util.js';
import vSelect from '../../../modules/vSelect.vue';

export default {
    props:{
        padd:{
            type:Number,
            default:0,
        },
        isjob:{
            type:Boolean,
            default:true,
        },
        isbranch:{
            type:Boolean,
            default:false,
        },
        readonly:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            jobDataList:[],
            examDataList:[],
            branchDataList:[],
            addJobForm:{
                update:false,
				addtitle:'添加职业名称',
				edittitle:'编辑职业名称',
                visible:false,
                readonly:false,
                viewonly:false,
				data:{
					name:'',
					todo:'',
					know:'',
					ready:'',
					help:'',
					beneficialCourse:'',
					outlook:'',
					compension:'',
				},
				ruleValidate:{}
			},
			addExamForm:{
                update:false,
				addtitle:'添加执业资格考试',
				edittitle:'修改执业资格考试',
                visible:false,
                readonly:false,
                viewonly:false,
				data:{
                    name:'',
                    descr:'',
                    qualification:'',
                    officeCource:'',
                    rule:'',
                    content:'',
                    cerRequire:'',
                    officeUrl:'',                    
                },
				ruleValidate:{},	
            },
            addBranchForm:{
                update:false,
				addtitle:'添加专业分支分类',
				edittitle:'修改专业分支分类',
                visible:false,
                viewonly:false,
				data:{
                    name:'',
                    remarks:'',
                },
				ruleValidate:{},	
            },
            examChecked:[],
            jobChecked:[],
            branchChecked:[],
        };
    },
    components:{
        vSelect,
    },
    computed:{
        paddingCls(){
            if(this.padd){
                return {
                    'padding-left':`${this.padd}px`
                }
            }
        },
        
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        setData(data){
            let d = Array.isArray(data)?data:[];
            if (this.isjob) {
                this.jobDataList = d;
            } else if(this.isbranch){
                this.branchDataList = d;
            } else {
                this.examDataList = d;
            }
        },
        getData(){
            if(this.isjob){
                return this.jobDataList.map(item=>{
                    return {jobId:item.id};
                });
            } else if (this.isbranch){
                return this.branchDataList.map(item=>{
                    return {name:item.name,remarks:item.remarks};
                });
            } else {
                return this.examDataList.map(item=>{
                    return {certificateId:item.id};
                });
            }
        },
        addJobClose(){
			this.addJobForm.visible = false;
		},
		addJobOk(){
            this.updateLoadingStatus({isLoading:true});
			major.saveJob(this.addJobForm.data).then(valid.call(this)).then(res=>{
				if(res.ok){
                    if(!this.addJobForm.data.id){
                        this.addJobForm.data.id = res.data.data;
                    }
                    this.tryPush(this.jobDataList,this.addJobForm.data);
                    this.addJobClose();
				}
			}).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
			});
        },
        addExamClose(){
			this.addExamForm.visible = false;
        },
        addExamOk(){
            this.updateLoadingStatus({isLoading:true});
            major.saveCertificate(this.addExamForm.data).then(valid.call(this)).then(res=>{
				if(res.ok){
                    if(!this.addExamForm.data.id){
                        this.addExamForm.data.id = res.data.data;
                    }
                    this.tryPush(this.examDataList,this.addExamForm.data);
                    this.addExamClose();
				}
			}).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
			});
        },
        addBranchClose(){
			this.addBranchForm.visible = false;
        },
        addBranchOk(){
            this.addBranchForm.data.id = +new Date();
            this.tryPush(this.branchDataList,this.addBranchForm.data);
            this.addBranchClose();
        },
        addJobItem(){
            this.addJobForm.data.id=null;
            this.addJobForm.visible = true;
            this.addJobForm.update = false;
            this.addJobForm.readonly = false;
            this.$refs.addJobForm.resetFields();
        },
        delJobItem(){
            if(this.jobChecked.length){
                this.$Modal.confirm({
                    title: '删除职业',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
                        this.jobDataList = this.jobDataList.filter(item=>{
                            return this.jobChecked.indexOf(item.id)<0;
                        });
					}
				});
            } else{
                this.$Message.error("请至少选中一个");
            }
        },
        addExamItem(){
            this.addExamForm.data.id=null;
            this.addExamForm.visible = true;
            this.addExamForm.update = false;
            this.addExamForm.readonly = false;
            this.$refs.addExamForm.resetFields();
        },
        delExamItem(){
            if(this.examChecked.length){
                this.$Modal.confirm({
                    title: '删除执业考试',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
                        this.examDataList = this.examDataList.filter(item=>{
                            return this.examChecked.indexOf(item.id)<0;
                        });
					}
				});
            } else{
                this.$Message.error("请至少选中一个");
            }
        },
        addBranchItem(){
            this.addBranchForm.data.id=null;
            this.addBranchForm.visible = true;
            this.addBranchForm.update = false;
            this.$refs.addBranchForm.resetFields();
        },
        delBranchItem(){
            if(this.branchChecked.length){
                this.$Modal.confirm({
                    title: '删除执业考试',
                    content: '您确定要删除所选内容吗？删除后将无法恢复',
                    onOk: () => {
                        this.branchDataList = this.branchDataList.filter(item=>{
                            return this.branchChecked.indexOf(item.id)<0;
                        });
					}
				});
            } else{
                this.$Message.error("请至少选中一个");
            }
        },
        editJob(data){
            this.addJobForm.data = data;
            this.addJobForm.update = true;
            this.addJobForm.visible = true;
            this.addJobForm.readonly = true;
            this.addJobForm.viewonly = false;
        },
        editExam(data){
            this.addExamForm.data = data;
            this.addExamForm.update = true;
            this.addExamForm.visible = true;
            this.addExamForm.readonly = true;
            this.addExamForm.viewonly = false;
        },
        editBranch(data){
            this.addBranchForm.data = data;
            this.addBranchForm.update = true;
            this.addBranchForm.visible = true;
            this.addBranchForm.viewonly = false;
        },
        doviewJob(item){
            this.addJobForm.viewonly = true;
            this.addJobForm.data = item;
            this.addJobForm.visible = true;
            this.addJobForm.readonly = true;
        },
        doviewExam(item){
            this.addExamForm.viewonly = true;
            this.addExamForm.data = item;
            this.addExamForm.visible = true;
            this.addExamForm.readonly = true;
        }, 
        doviewBranch(item){
            this.addBranchForm.data = item;
            this.addBranchForm.update = true;
            this.addBranchForm.visible = true;
            this.addBranchForm.viewonly = true;
        },
        getJobSelectData(text){
            return new Promise((resolve,reject)=>{
                major.findByJobName(text).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        resolve(res.data.data);
                    } else {
                        reject(res);
                    }
                }).catch(err=>{
                    errors.call(this);
                    reject(err);
                });
            });
        },
        onJobSelected(item){
            this.addJobForm.data = item;
            this.addJobForm.readonly = true;
        },
        getExamSelectData(text){
            return new Promise((resolve,reject)=>{
                major.findByCertificateName(text).then(valid.call(this)).then(res=>{
                    if(res.ok){
                        resolve(res.data.data);
                    } else {
                        reject(res);
                    }
                }).catch(err=>{
                    errors.call(this);
                    reject(err);
                });
            });
        },
        onExamSelected(item){
            this.addExamForm.data = item;
            this.addExamForm.readonly = true;
            
        },
        tryPush(list,item){
            const has = list.some(it=>{
                return it.id === item.id;
            });
            if (!has){
                list.push(item);
            }
        }

    },

}
</script>
