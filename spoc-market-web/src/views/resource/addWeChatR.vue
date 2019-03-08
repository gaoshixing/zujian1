<style lang="less">
.addWeChatR{
    .addWeChatInfo{
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        background-color: #fffbe6;
        border: 1px solid #ffe58f;
        border-radius: 5px;
        padding-left: 22px;
    }
    .addWeChatRSubmit{
        margin-top: 10px;
        margin-left: 100px;
    }
    .addWeChatContent{
        margin-top:30px;
        margin-left: 50px;
        overflow: hidden;
    }
    .addWeChatContentL{
        width:375px;
        float:left;
        border: 1px solid #cce6ff;
        .addWeChatLTitle{
            height:64px;
            background-color: #e8e8e9;
        }
        .mainR{
            margin: 26px 24px 12px;
            cursor: pointer;
            .mainImg{
                width:323px;
                height:139px;
                background-color: #dbdfe2;
                >img{
                    width:323px;
                    height:139px;
                }
            }
            .mainTitle{
                font-size: 16px;
                margin-top: 13px;
            }
            .mainDesc{
                width: 190px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden; 
            }
        }
        .childItem {
            position: relative;
            cursor: pointer;
            .childItemContent {
                border: 1px solid #e8e8e8;
                height: 80px;
                font-size: 16px;
                overflow: hidden;
                .childText{
                    width:300px;
                    line-height: 80px;
                    float:left;
                    padding-left:25px;
                }
                .childImg{
                    margin: 15px 0;
                    float:left;
                    width:50px;
                    height:50px;
                    background-color: #dbdfe2;
                    >img{
                        width:50px;
                        height:50px;
                    }
                }
            }
            .childItemDel{
                position: absolute;
                width:18px;
                height:18px;
                right: -9px;
                top: -9px;
                border-radius: 10px;
                background-color: #cccccc;
                cursor: pointer;
                &:hover{
                    background-color: #1890ff;
                }
                .myDel{
                    font-size: 10px;
                    padding-left: 4px;
                    color:#fefefe;
                }
            }
            .active{
                border: 1px dashed #1890ff;
            }
        }
        .addButton{
            cursor: pointer;
            border: 1px dashed #e8e8e8;
            background-color: #fafbfb;
            width:325px;
            font-size: 16px;
            height:58px;
            line-height: 58px;
            text-align:center;
            margin: 10px 25px 47px;
        }
    }
    .addWeChatContentR{
        @top: 30px;
        @left: -22px;
        position: relative;
        margin-left: 21px;
        margin-top: 64px;
        padding-top:30px;
        padding-left:12px;
        width:460px; 
        float:left;
        border: 1px solid #ececec;
        border-radius: 5px;
        background-color: #f8f8f8;
        &::before,&::after{
            content: '';
            position: absolute;left: @left;top: @top;
            border-top-style: solid;
            border: 10px solid rgba(0, 0, 0, 0);
            border-width: 10px 12px;
        }
        &::after{
            // 边
            z-index: 1;border-right-color: #ececec;left: @left - 2px;
        }
        &::before{
            z-index: 2;border-right-color: #f8f8f8;
            // border-width: 8px;
        }
        .hasAddImg{
            width: 300px;
            height: 100px;
        }
        .imgUpload{
            position: absolute;
            top: 0px;
            opacity: 0;
            &:hover{
                opacity: 0.8;
            }
        }
        .addImg{
            cursor: pointer;
            height: 100px;
            border: 1px solid rgb(221, 222, 225);
            background: #fff;
            border-radius: 4px;
            text-align: center;
            .p1{
                font-size: 12px;
                color: #1890ff;
                margin: 10px auto 0;
            }
            .p2{
                color: #999; 
            }
        }
    }
}
</style>
<template>
<div class="addWeChatR">
    <div class="addWeChatInfo">
        您可以使用组件自由搭建店铺内容，个性化装修店铺主页。
    </div>
    <div class="addWeChatContent">
        <div class="addWeChatContentL">
            <div class="addWeChatLTitle">
                <img src="../../assets/images/导航 _iOS_常规.png">
            </div>
            <div  :style="{'border': item.noComplete ? '1px dashed red' : ''}" v-if="index == 0" v-for="(item, index) in weChatRItem" @click="changeActiveIndex(index)" :key="index+item.title">
                <div class="mainR">
                    <div class="mainImg"><img v-if="item.coverUrl" :src="item.coverUrl"></div>
                    <div class="mainTitle">{{item.title}}</div>
                    <div class="mainDesc">{{item.intro}}</div>
                </div>
            </div>
            <div class="childItem"  v-if="index != 0" @click="changeActiveIndex(index)" v-for="(item, index) in weChatRItem" :key="index+item.title">
                <div class="childItemContent" :style="{'border': item.noComplete ? '1px dashed red' : ''}" :class="{active: index == activeIndex}">
                    <div class="childText">{{item.title}}</div>
                    <div class="childImg"><img v-if="item.coverUrl" :src="item.coverUrl"></div>
                </div>
                <div class="childItemDel" v-if="index == activeIndex && !noEdit" @click.stop="delItem">
                    <i class="iconfont icon-guanbi myDel"></i>
                </div>
            </div>
           <!--  <div class="childItem">
                <div class="childItemContent">
                    <div class="childText">标题标标题标题题</div>
                    <div class="childImg"></div>
                </div>
            </div> -->
            <div class="addButton" @click="addItem">
                添加
            </div>
        </div>
        <div class="addWeChatContentR">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="文章名称:" prop="title">
                    <Input v-model="formValidate.title" :disabled="noEdit" type="textarea" :rows="4" :maxlength="20"  @on-change="changeContent('title')" style="width:300px;" placeholder="请输入" />
                </FormItem>
                <FormItem label="显示作者:" prop="author">
                    <Input v-model="formValidate.author" :disabled="noEdit" style="width:300px;"  :maxlength="64" @on-change="changeContent('author')" placeholder="请输入" />
                </FormItem>
                <FormItem label="上传封面:" prop="coverId">
                    <Input v-model="formValidate.coverId" style="display:none;"/>
                    <img class="hasAddImg" v-show="formValidate.coverUrl" :src="formValidate.coverUrl"/>
                    <div v-if="!noEdit" :class="{'imgUpload' : formValidate.coverUrl? true : false}">
                        <Upload :action="uploadFileUrl"
                            :data="uploadData"
                            name="files"
                            :show-upload-list="false"
                            :before-upload="handleBefore"
                            :on-success="handleSuccessImg"
                            :on-format-error="handleFormatErrorImg"
                            :format="['png','jpeg','jpg','gif']"
                            :on-exceeded-size="handleMaxSizeImg"
                            :max-size="2048">
                            <div class="addImg" :style="{'width':activeIndex == 0 ?'300px':'100px'}">
                                <p class="p1">+添加图片</p>
                                <p class="p2">{{activeIndex == 0 ? '建议尺寸1080*460像素':'建议尺寸300*300像素'}}</p>
                            </div>
                        </Upload>
                    </div>
                </FormItem>
                <FormItem label="摘要:" prop="intro">
                    <Input v-model="formValidate.intro" :disabled="noEdit" type="textarea" :rows="4"  :maxlength="255" style="width:300px;"  @on-change="changeContent('intro')" placeholder="请输入" />
                </FormItem>
                <FormItem label="正文:" prop="content">
                    <editor v-model="formValidate.content"  style="width:330px;"  v-if="!noEdit"></editor>
                  <!--   <Input v-model="formValidate.content" :disabled="noEdit" type="textarea" :rows="4" style="width:300px;"  @on-change="changeContent('content')" placeholder="请输入" />--> 
                    <div style="width:330px;" v-html="formValidate.content" :disabled="noEdit" v-if="noEdit"></div>
                </FormItem>
            </Form>
        </div>
    </div>
    <div style="margin-top:20px;">
        <companys-checkbox  
            warning="(其他分公司可见，即其他分公司微信公众号也可查看引用本图文内容)"
            :nameStyle="{'padding': '0 12px 10px 0','width': '100px','text-align':'right' }" 
            ref="companysCheckbox" 
            :disabled="noEdit" 
            @checkComany="checkComany" 
            :hasChecked="officeIdList">
        </companys-checkbox>
    </div>
    <div class="addWeChatRSubmit">
        <Button type="primary" @click="handleSubmit" v-if="!noEdit" style="width:76px;height:36px;margin-right:20px;">确定</Button>
        <Button type="primary" @click="back" style="width:76px;height:36px;">返回</Button>
    </div>
</div>
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import valid, { errors, common, sys, wpMarketCommon, wpMaterialNews} from "../../libs/request";
    import companysCheckbox from '../../modules/companysCheckbox.vue';
    import editor from '../../modules/editor/editor.vue'
    export default {
        props:{
            pId: {
                required: true
            }
        },
        data () {
            return {
                delIds:[],
                weChatRItem:[
                    {
                        title:'这里是标题',
                        author: '',
                        coverId: '',
                        coverUrl: '',
                        intro: '这里是摘要',
                        content: '',
                    }
                ],
                activeIndex: 0,
                uploadFileUrl: '',
                uploadData: {
                    type: 'wp_material_news',
                    dirName: 'all',
                    meunId: '1001'
                },
                noEdit: false,
                officeIdList:[],
                formValidate:{
                    title:'',
                    author: '',
                    coverId: '',
                    coverUrl: '',
                    intro: '',
                    content: '',
                },
                ruleValidate: {
					title: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					/* author: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}], */
					coverId: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					intro: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
					content: [{
						required: true,
						type: 'string',
						message: '必填项',
						trigger: 'change'
					}],
				},
            }
        },
        computed: {
            ...mapState('market',['leftclosed']),
            /* ...mapState(['userInfo']),
            //管理员 总裁  分总 文书主管
		    ...mapGetters('docu',['isAdmin', 'isCeo', 'isBranchOfficeLeader', 'isEssayLeaser'])     */  
        },
        components: {
            companysCheckbox,
            editor
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
                to.meta.title = "编辑图文素材"
            }
            next()
        },
		methods: {
            ...mapMutations(["updateLoadingStatus"]),
            delItem(){
                this.delIds.push(this.weChatRItem[this.activeIndex].id)
                this.weChatRItem.splice(this.activeIndex,1)
                if(this.weChatRItem.length == 1){
                    this.activeIndex = 0
                    let obj  = this.weChatRItem[0]
                    for(let key in obj) {
                        this.formValidate[key] = obj[key]
                    }
                } else {
                    this.activeIndex = 1
                    let obj  = this.weChatRItem[1]
                    for(let key in obj) {
                        this.formValidate[key] = obj[key]
                    }
                }
            },
            changeActiveIndex(index) {
                this.activeIndex = index
                let obj  = this.weChatRItem[index]
                for(let key in obj) {
                    this.formValidate[key] = obj[key]
                }
                this.checkVaildate()
                this.$refs.formValidate.validate()
            },
            changeContent(key){
                this.weChatRItem[this.activeIndex][key] = this.formValidate[key]
            },
            addItem(){
                this.weChatRItem.push(
                    {
                        title:'这里是标题',
                        author: '',
                        coverId: '',
                        coverUrl: '',
                        intro: '这里是摘要',
                        content: '',
                    }
                )
                this.formValidate.coverUrl = ''
                this.$refs.formValidate.resetFields()
                this.activeIndex = this.weChatRItem.length - 1
            },
            loadDetail(id){
                this.updateLoadingStatus({isLoading:true});
                let data = {
                    id
                }
                wpMaterialNews.detail(data).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        let result = res.data.data
                        this.officeIdList = result.officeIdList
                        this.weChatRItem = result.list
                        let obj  = this.weChatRItem[0]
                        for(let key in obj) {
                            this.formValidate[key] = obj[key]
                        }
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
            checkVaildate(){
                let validArr = []
                this.weChatRItem.forEach((item, index)=>{
                    item.noComplete = false
                    let hasComplete = true
                    for(let key in item){
                       /*  author 不是必填项
                        if(item.author.trim() === ''){
                            hasComplete = false
                        } */
                        if(item.title.trim() === ''){
                            hasComplete = false
                        }
                        if(item.intro.trim() === ''){
                            hasComplete = false
                        }
                        if(item.content.trim() === ''){
                            hasComplete = false
                        }
                        if(item.coverId.trim() === ''){
                            hasComplete = false
                        }
                        item.sort = index
                    }
                    if(!hasComplete){
                        item.noComplete = true
                        validArr.push('第'+ (index+1) +'条')
                    }
                })
                this.$forceUpdate()
                return validArr;
            },
            handleSubmit () {
                this.updateLoadingStatus({isLoading:true});
                if(this.$refs.companysCheckbox.showCheckboxGroup && !this.officeIdList.length) {
                    this.updateLoadingStatus({isLoading:false});
                    this.$Message.error('您已选择分校可见，但未指定分校')
                    return false
                }
                let validArr = this.checkVaildate()
                if(validArr.length){
                    this.updateLoadingStatus({isLoading:false});
                    this.$Message.error(validArr.join(',') + '图文内容需要补全')
                    this.$refs.formValidate.validate()
                } else {
                    let data = {
                        list: this.weChatRItem,
                        officeIdList: this.officeIdList,
                    }

                    if(this.$route.query.id){
                        data.id = this.$route.query.id
                        data.del = this.delIds
                    }
                    
                    wpMaterialNews.save(data).then(valid.call(this)).then(res => {
                        if(res.ok) {
                            this.back()
                        }
                    }).catch(errors.call(this)).finally(() => {
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            },
            handleSuccessImg (res, file, fileList) {
                this.formValidate.coverUrl = res.data.filePath
                this.formValidate.coverId = res.data.id
                this.weChatRItem[this.activeIndex].coverUrl = res.data.filePath
                this.weChatRItem[this.activeIndex].coverId = res.data.id
                this.updateLoadingStatus({isLoading:false});
                this.$Message.info('上传成功');
            },
            handleBefore () {
                this.updateLoadingStatus({isLoading:true});
                return true
            },
            handleFormatError (file, fileList) {
                this.updateLoadingStatus({isLoading:false});
                this.$Message.error('文件类型有误');
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
            "formValidate.content":function(newValue, oldValue){
                this.weChatRItem[this.activeIndex].content = newValue.replace(/&nbsp;/g,"")
                this.$refs.formValidate.validate()
            }
        }
    }
</script>