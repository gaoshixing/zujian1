<style lang="less">
.addDocR{
}
</style>
<template>
<div class="addDocR">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="103">
       <!--  <FormItem label="名称:" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入名称" style="width:300px;"></Input>
        </FormItem> -->
        <FormItem label="上传文档:" prop="fileId">
            <Input v-model="formValidate.fileId" style="display:none;"/>
            <div>{{formValidate.fileName}}</div>
            <Upload :action="uploadFileUrl"
                :data="uploadData"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccess"
                :format="['doc','docx','xls','xlsx','ppt','pptx','pdf']"
                :max-size="2048">
                <Button type="primary" :disabled="noEdit" style="height: 28px;line-height: 15px;">选择文件</Button>
            </Upload>
        </FormItem>
        <div style="margin-bottom:10px;">
            <companys-checkbox  
                warning="(其他分公司可见，即其他分公司微信公众号也可查看引用本文档内容)"
                :nameStyle="{'padding': '0 0 10px 0','width': '100px','text-align':'right' }" 
                ref="companysCheckbox" 
                :disabled="noEdit" 
                @checkComany="checkComany" 
                :hasChecked="officeIdList">
            </companys-checkbox>
        </div>
        <FormItem>
            <Button type="primary" @click="handleSubmit" v-if="!noEdit" style="width:76px;height:36px;margin-right:20px;">确定</Button>
            <Button type="primary" @click="back" style="width:76px;height:36px;">返回</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import valid, { errors, common, sys, wpMarketCommon, wpMaterialDoc} from "../../libs/request";
    import companysCheckbox from '../../modules/companysCheckbox.vue';
    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                uploadFileUrl: '',
                uploadData: {
                    type: 'wp_material_doc',
                    dirName: 'all',
                    meunId: '1001'
                },
                formValidate:{
                    name:'',
                    filePath:'',
                    fileId:'',
                    fileName:'',
                },
                ruleValidate: {
					/* name: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}], */
					fileId: [{
						required: true,
						type: 'string',
						message: '请上传文件',
						trigger: 'change'
					}]
                },
                noEdit: false,
                officeIdList:[],
            }
        },
        computed: {
            ...mapState('market',['leftclosed']),
            /* ...mapState(['userInfo']),
            //管理员 总裁  分总 文书主管
		    ...mapGetters('docu',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isEssayLeaser'])     */  
        },
        components: {
            companysCheckbox
        },
        created(){
        
        },
        mounted() {
            this.uploadFileUrl = wpMarketCommon.getUploadFileUrl()
            if(this.$route.query.id){
                this.loadDetail(this.$route.query.id)
            }
            if(this.$route.query.noEdit){
                if(typeof(this.$route.query.noEdit) == 'string'){
                    this.noEdit = (this.$route.query.noEdit == 'false' ? false : true)
                } else {
                    this.noEdit = this.$route.query.noEdit
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            if(to.query.id){
                to.meta.title = "编辑文档素材"
            }
            next()
        },
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
            loadDetail(id){
                this.updateLoadingStatus({isLoading:true});
                let data = {
                    id
                }
                wpMaterialDoc.form(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this.formValidate.fileName = result.title
                        this.formValidate.fileId = result.fileId
                        this.formValidate.code = result.code
                        this.officeIdList = result.officeIdList
                    }
                }).catch(errors.call(this)).finally(() => {
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            checkComany(data){
                this.officeIdList = data
            },
            back(){
                this.$router.push({
                    name:'market.resource',
                    query:{
                        type: '6'
                    }
                })
            },
            handleSubmit () {
                this.updateLoadingStatus({isLoading:true});
                if(this.$refs.companysCheckbox.showCheckboxGroup && !this.officeIdList.length) {
                    this.updateLoadingStatus({isLoading:false});
                    this.$Message.error('您已选择分校可见，但未指定分校')
                    return false
                }
                this.$refs.formValidate.validate((validRes) => {
                    if (validRes) {
                        let data = {
                            fileId: this.formValidate.fileId,
                            officeIdList: this.officeIdList
                        }
                        if(this.$route.query.id){
                            data.id = this.$route.query.id
                            data.code = this.formValidate.code
                        }
                        wpMaterialDoc.save(data).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.back()
                            }
                        }).catch(errors.call(this)).finally(() => {
                            this.updateLoadingStatus({isLoading:false});
                        });
                        //this.$refs.formValidate.resetFields();
                    }  else {
                        this.updateLoadingStatus({isLoading:false});
                    }
                })
            },
            handleSuccess (res, file, fileList) {
                this.formValidate.filePath = res.data.filePath
                this.formValidate.fileId = res.data.id
                this.formValidate.fileName = res.data.fileName
                this.updateLoadingStatus({isLoading:false});
                this.$Message.info('上传成功');
            },
            handleBefore () {
                this.updateLoadingStatus({isLoading:true});
                return true
            },
        },
        watch:{
        }
    }
</script>