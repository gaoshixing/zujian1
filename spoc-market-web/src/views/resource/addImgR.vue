<style lang="less">
.addImgR{
}
</style>
<template>
<div class="addImgR">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="103">
        <FormItem label="名称:" prop="title">
            <Input v-model="formValidate.title" :disabled="noEdit" :maxlength="20" placeholder="请输入名称" style="width:300px;"/>
        </FormItem>
        <FormItem label="上传图片:" prop="coverId">
            <Input v-model="formValidate.coverId" style="display:none;"/>
            <img style="max-width:300px;" v-show="formValidate.coverUrl" :src="formValidate.coverUrl"/>
            <Upload :action="uploadFileUrl"
                :data="uploadData"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccess"
                :format="['png','jepg','jpg','gif']"
                :on-format-error="handleFormatErrorImg"
                :on-exceeded-size="handleMaxSizeImg"
                :max-size="2048">
                <Button type="primary" :disabled="noEdit" style="height: 28px;line-height: 15px;">选择文件</Button>
                <span>请选择png、jepg、jpg、gif格式文件，最大支持2M</span>
            </Upload>
        </FormItem>
        <div style="margin-bottom:10px;">
            <companys-checkbox  
                warning="(其他分公司可见，即其他分公司微信公众号也可查看引用本图片内容)"
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
    import valid, { errors, common, sys, wpMarketCommon, wpMaterialImage} from "../../libs/request";
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
                    type: 'wp_material_image',
                    dirName: 'all',
                    meunId: '1001'
                },
                formValidate:{
                    title:'',
                    coverUrl:'',
                    coverId:''
                },
                ruleValidate: {
					title: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					coverId: [{
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
                to.meta.title = "编辑图片素材"
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
                wpMaterialImage.form(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this.formValidate.title = result.title
                        this.formValidate.coverId = result.coverId
                        this.formValidate.coverUrl = result.coverUrl
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
                        type: '2'
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
                            title: this.formValidate.title,
                            coverId: this.formValidate.coverId,
                            officeIdList: this.officeIdList
                        }
                        if(this.$route.query.id){
                            data.id = this.$route.query.id
                            data.code = this.formValidate.code
                        }
                        wpMaterialImage.save(data).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.back()
                            }
                        }).catch(errors.call(this)).finally(() => {
                            this.updateLoadingStatus({isLoading:false});
                        });
                        //this.$refs.formValidate.resetFields();
                    } else {
                        this.updateLoadingStatus({isLoading:false});
                    }
                })
            },
            handleSuccess (res, file, fileList) {
                this.formValidate.coverUrl = res.data.filePath
                this.formValidate.coverId = res.data.id
                this.updateLoadingStatus({isLoading:false});
                this.$Message.info('上传成功');
            },
            handleBefore () {
                this.updateLoadingStatus({isLoading:true});
                return true
            },
            handleFormatErrorImg(){
                this.updateLoadingStatus({isLoading:false});
                this.$Message.error('请上传png、jepg、jpg、gif格式的文件');
            },
            handleMaxSizeImg(){
                this.updateLoadingStatus({isLoading:false});
                this.$Message.error('文件大小不能超过2M');
            }
        },
        watch:{
        }
    }
</script>