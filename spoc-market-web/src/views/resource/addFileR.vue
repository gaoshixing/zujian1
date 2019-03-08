<style lang="less">
.addFileR{
}
</style>
<template>
<div class="addFileR">
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="103">
        <FormItem label="名称:" prop="title">
            <Input v-model="formValidate.title"  :disabled="noEdit" :maxlength="20" placeholder="请输入名称" style="width:300px;"/>
        </FormItem>
        <FormItem label="上传封面:" prop="imageId" v-if="$route.query.type == 4">
            <Input v-model="formValidate.imageId" style="display:none;"/>
            <img style="max-width:300px;" v-show="formValidate.coverUrl" :src="formValidate.coverUrl"/>
            <Upload :action="uploadFileUrl"
                :data="uploadDataImg"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessImg"
                :on-format-error="handleFormatErrorImg"
                :format="['png','jepg','jpg','gif']"
                :on-exceeded-size="handleMaxSizeImg"
                :max-size="2048">
                <Button type="primary" :disabled="noEdit" style="height: 28px;line-height: 15px;">选择文件</Button>
                <span>请选择png、jepg、jpg、gif格式文件，最大支持2M</span>
            </Upload>
        </FormItem>
        <FormItem :label="$route.query.type == 4 ? '上传视频:': '上传音频:'" prop="fileName">
            <Input v-model="formValidate.fileName" style="display:none;"/>
            <div>{{formValidate.fileName}}</div>
            <Upload style="display:inline-block" :action="uploadFileUrl"
                :data="uploadData"
                name="files"
                :show-upload-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccessFile"
                :on-format-error="handleFormatError"
                :format="$route.query.type == 4 ? ['mp4'] : ['mp3']"
                :on-exceeded-size="handleMaxSize"
                :max-size="$route.query.type == 4 ? 10240 : 2048">
                <Button type="primary" :disabled="noEdit" style="height: 28px;line-height: 15px;">选择文件</Button>
            </Upload>
            <span>{{$route.query.type == 4 ? '请选择MP4格式文件，最大支持10M' : '请选择MP3格式文件，最大支持2M'}}</span>
        </FormItem>
        <div style="margin-bottom:10px;">
            <companys-checkbox  
                :warning="$route.query.type == 4?'(其他分公司可见，即其他分公司微信公众号也可查看引用本视频内容)':'(其他分公司可见，即其他分公司微信公众号也可查看引用本音频内容)'"
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
    import valid, { errors, common, sys, wpMarketCommon, wpMaterialFile} from "../../libs/request";
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
                uploadDataImg: {
                    type: 'wp_material_file_video_image',
                    dirName: 'all',
                    meunId: '1001'
                },
                uploadData: {
                    type: this.$route.query.type == 4 ? 'wp_material_file_video' : 'wp_material_file_voice',
                    dirName: 'all',
                    meunId: '1001'
                },
                formValidate:{
                    title:'',
                    coverUrl:'',
                    imageId:'',
                    fileName: '',
                },
                ruleValidate: {
					title: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					imageId: [{
						required:  this.$route.query.type == 4 ? true : false,
						type: 'string',
						message: '请上传文件',
						trigger: 'change'
					}],
					fileName: [{
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
        beforeRouteEnter (to, from, next) {
            if(to.query.type == 4 && to.query.id){
                to.meta.title = "编辑视频素材"
            } else if(to.query.type == 4){
                to.meta.title = "新建视频素材"
            }

            if(to.query.type == 3 && to.query.id){
                to.meta.title = "编辑语音素材"
            } else if(to.query.type == 3){
                to.meta.title = "新建语音素材"
            }
            next()
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
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
            loadDetail(id){
                this.updateLoadingStatus({isLoading:true});
                let data = {
                    id
                }
                wpMaterialFile.form(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this.formValidate.title = result.title
                        this.formValidate.coverUrl = result.imageUrl
                        this.formValidate.imageId = result.imageId
                        this.formValidate.fileId = result.fileId
                        this.formValidate.code = result.code
                        let index = result.coverUrl.lastIndexOf('/')
                        this.formValidate.fileName = result.coverUrl.substring(index + 1, result.coverUrl.length)
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
                        type: this.$route.query.type
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
                            officeIdList: this.officeIdList,
                            fileId: this.formValidate.fileId
                        }

                        if(this.$route.query.type == 4){
                            data.type = 'video'
                            data.imageId = this.formValidate.imageId
                        } else {
                            data.type = 'voice'
                        }

                        if(this.$route.query.id){
                            data.id = this.$route.query.id
                            data.code = this.formValidate.code
                        }

                        wpMaterialFile.save(data).then(valid.call(this)).then(res => {
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
            handleSuccessImg (res, file, fileList) {
                this.formValidate.coverUrl = res.data.filePath
                this.formValidate.imageId = res.data.id
                this.updateLoadingStatus({isLoading:false});
                this.$Message.info('上传成功');
            },
            handleSuccessFile (res, file, fileList) {
                this.formValidate.fileId = res.data.id
                this.formValidate.fileName = res.data.fileName
                this.updateLoadingStatus({isLoading:false});
                this.$Message.info('上传成功');
            },
            handleBefore () {
                this.updateLoadingStatus({isLoading:true});
                return true
            },
            handleFormatError (file, fileList) {
                this.updateLoadingStatus({isLoading:false});
                if(this.$route.query.type == 4){
                    this.$Message.error('请上传MP4格式文件');
                } else {
                    this.$Message.error('请上传MP3格式文件');
                }
            },
            handleMaxSize(){
                this.updateLoadingStatus({isLoading:false});
                if(this.$route.query.type == 4){
                    this.$Message.error('文件大小不能超过10M');
                } else {
                    this.$Message.error('文件大小不能超过2M');
                }
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