<style lang="less">
.commodity-create-container{
    padding-top: 20px;
    @left: 110px;
    @h: 33px;
    @width: 200px;
    @height: 160px;
    @red: #ed3f14;
    .tips{
        color: @red;
        &.gray{
            color: #ccc;
        }
    }
    .btnSubmit{
        padding-right: 110px;
        text-align: center;
        button{
            min-width: 120px;
            font-size: 14px;
        }
    }
    .biaodan{
        & > span{
            overflow: hidden;float: left;
            margin-right: 10px;width: 220px;height: @h;line-height: @h;
        }
        button{
            margin-right: 8px;
        }
    }
    .ivu-input-wrapper + .tips {
        position: relative;display: inline-block;
    }
    .ivu-upload-drag{
        height: @height;line-height: @height;background: #ececec;border: none;
    }
    .upload-img{
        width: @width;height: @height;float: left;
        .ivu-icon-plus-round{
            position: relative;top: 12px;
        }
        & ~ .tips{
            float: left;margin-left: 10px;margin-top: 127px;
        }
    }
    .ivu-form-item-content{
        zoom: 1;
        &::after, &::before{
            content: "";clear: both;height: 0;line-height: 0;font-size: 0;
        }
    }
    .ivu-form-item-error{
        .ivu-upload-drag{
            border: 1px dashed @red;
        }
        .w-e-toolbar{
            border-color: @red !important;border-bottom-color: #ccc !important;
        }
        .w-e-text-container{
            border-color: @red !important;border-top-color: #ccc !important;
        }
    }
    .check-box{
        .ivu-form-item-content{
            margin-left: 0 !important;
        }
    }
    .clear{
        zoom: 1;
        &::before, &::after{
            content: "";clear: both;height: 0;line-height: 0;display: block;font-size: 0;
        }
    }
}
.model-create-goods{
    .raduo-box{
        position: relative;
        display: block;width: 14px;height: 14px;
        border-radius: 14px;cursor: pointer;
        border: 1px solid #dddee1;margin: 0 auto;
        &.radio{
            border-color: #2d8cf0;
            &:after{
                position: absolute;
                width: 8px;
                height: 8px;
                left: 2px;
                top: 2px;
                border-radius: 6px;
                display: table;
                border-top: 0;
                border-left: 0;
                content: " ";
                background-color: #2d8cf0;
            }
        }
    }
    .pages{
        margin-top: 15px;
        text-align: center;
    }
}
</style>
    
<template>
<div class="commodity-create-container">
    <Form ref="formCreate" :model="newGoods" :rules="createRule" :label-width="110" class="form-create">
        <FormItem label="商品名称：" prop="name">
            <Input type="text" v-model="newGoods.name" style="width: 360px;"/>
        </FormItem>
        <FormItem label="定价：" prop="price">
            <Input type="text" v-model="newGoods.price" style="width: 360px;"/>
        </FormItem>
        <FormItem label="原价：" prop="oriPrice">
            <Input type="text" v-model="newGoods.oriPrice" style="width: 360px;"/>
        </FormItem>
        <FormItem label="成本：" prop="cost">
            <Input type="text" v-model="newGoods.cost" style="width: 360px;"/>
            <p class="tips gray">如本商品其他分公司可见，请填写成本价</p>
        </FormItem>
        <FormItem label="可售卖量：" prop="remainNum">
            <Input type="text" v-model="newGoods.remainNum" style="width: 360px;"/>
            <p class="tips gray">已售卖量：
                <span style="color: #ed3f14;">{{newGoods.saleNum ? newGoods.saleNum : '--'}}</span>
                &nbsp;&nbsp;&nbsp;总库存：
                <span style="color: #ed3f14;">{{newGoods.remainNum ? parseInt(newGoods.remainNum) + parseInt(newGoods.saleNum) : '不限量'}}</span>
            </p>
        </FormItem>
        <FormItem label="上传图片：" prop="attachmentId">
            <div class="clearfix">
                <Upload ref="upload" :data="uploadData" 
                    name="files" class="upload-img"
                    :show-upload-list="false" 
                    :on-success="handleSuccess" 
                    :format="['jpg','jpeg','png','gif']" 
                    :max-size="2048" 
                    :on-format-error="handleFormatError" 
                    :on-exceeded-size="handleMaxSize" 
                    :before-upload="handleBefore" 
                    type="drag" 
                    :action="uploadFileUrl">
                    <div style="height:100%" class="upload_cont">
                        <img style="width:100%;display:block;height:100%;" :src="picture" v-if="newGoods.attachmentId" />
                        <Icon type="plus-round" :size="40" v-else></Icon>
                    </div>
                </Upload>
                <p class="tips">请上传以下格式，不大于2M的文件：PNG、JPG、GIF……</p>
            </div>
        </FormItem>
        <FormItem label="简介：" prop="introduction">
            <Input type="text" v-model="newGoods.introduction" :maxlength="35" style="width: 360px;"/>
            <p class="tips gray">不多于35个汉字</p>
        </FormItem>
        <FormItem label="商品详情：" prop="details">
            <editor @input="inputDetails" v-model="newGoods.details" style="width:600px;" ></editor>
        </FormItem>
        <FormItem label="设置表单：" prop="formIds">
            <div class="biaodan">
                <span v-if="newGoods.formIds.length > 0">{{ formName }}</span>
                <div v-if="!goodsId">
                    <Button type="primary" v-if="newGoods.formIds.length == 0" @click="openModal">选择表单</Button>
                    <div v-else>
                        <Button type="primary" @click="previewForm">预览表单</Button>
                        <Button type="primary" @click="cencalForm">取消选择</Button>
                    </div>
                </div>
                <p class="tips clear">保存商品后，将<b style="margin:0 6px;text-decoration: underline;">不能</b>修改表单！请确认表单后再保存商品</p>
            </div>
        </FormItem>
        <companys-checkbox ref="companysCheckBox" :style="{'margin-bottom':'10px'}" :nameStyle="style" warning="其他学校可见（勾选本项，则其他分校可售卖该商品）" :hasChecked="newGoods.officeIds" @checkComany="checkComany"></companys-checkbox>
            <!-- <p class="tips" style="margin-top: 10px;">其他学校可见（勾选本项，则其他分校可售卖该商品）</p> -->
        <formItem class="btnSubmit">
            <Button @click="back" style="min-width: 80px;margin-right: 16px;">返回</Button>
            <Button type="primary" @click="checkForm">{{ btnTitle }}</Button>
        </formItem>
    </Form>
    <Modal v-model="formModal" title="选择表单" @on-ok="checkedForm" width='728'
        @on-cancel="cancel" class="model-create-goods">
        <v-select 
            style="width: 396px;margin: 15px 0;"
            placeholder="搜索名称"
            :datafunc="datafunc"
            icon="search" 
            v-model="compact"
            k='cnname'
            @on-enter="textChange" 
            @on-click="textChange" 
            @selected="textChange">
        </v-select>
        <Table border highlight-row height="180" @on-current-change="radioChange" :columns="columns" :data="list"></Table>
        <div class="pages">
            <Page :current="pageNo"
                :total="count"
                show-elevator show-total show-sizer
                :page-size="pageSize"
                @on-change="pageChange"
                @on-page-size-change="sizeChange">
            </Page>
        </div>
    </Modal>
</div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'
import valid, { errors, sys, wpGoods, wpMarketCommon, common } from '../../libs/request'
import companysCheckbox from '../../modules/companysCheckbox.vue'
import vSelect from '@public/modules/vSelect'
import editor from '../../modules/editor/editor.vue'

export default {
    props: {
        goodsId: {
            typa: String,
            required: false,
        },
        // pId: {
        //     type: String
        // },
    },
    data(){
        const remainNumRule = (rule, value, callback) => {
            if(value) {
                if(!(/^[0-9]*$/.test(value)) || value < 1) callback(new Error('请输入正整数'));
                else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            pageNo: 1,//当前页码
            pageCount: 1,//页码总数
            pageSize: 10,//每页条数
            count: 0,//数据总数
            formModal: false,
            compact: '',
            newGoods: {
                name: '', //商品名称
                formIds: [], //关联动态表单
                price: '', //商品定价
                oriPrice: null, //商品原价
                stockNum: null, //商品剩余库存数量
                details: '', //商品详情
                isGlobal: '0', //其他分公司可见，0：不可见；1：可见；
                officeIds: [], //关联可见分公司
                attachmentId: '', //商品图片
                introduction: '', //商品简介
                cost: null, //成本
                remainNum: null, //可售卖量
                saleNum: 0,
            },
            goodsError: {
                name: false,
                price: false,
                oriPrice: false,
                stockNum: false,
                details: false,
                attachmentId: false, //图片
                introduction: false, //商品简介
                cost: false, //成本
            },
            picture: '',
            formName: '',
            backups: {}, //备份
            btnTitle: '保存',
            successMessage: '保存成功！',
            uploadFileUrl: '',
            uploadData: {
                type: 'wp_material_doc',
                dirName: 'all',
                meunId: '1001'
            },
            columns: [
                {
                    title: '选择',
                    width: 70,
                    align: 'center',
                    render: (h, params) => {
                        let radio = params.row.id == this.currentId ? true : false;
                        let dom = h('span', {
                            class: {
                                'radio': radio,
                                'raduo-box': true
                            }
                        })
                        return dom
                    }
                },
                {
                    title: '表单名称',
                    key: 'name',
                    width: 460,
                },
                {
                    title: '创建人',
                    key: 'creator'
                },
            ],
            createRule: {
                name: { required: true, type: 'string', message: '名称不能为空', trigger: 'blur' },
                price: [
                    { required: true, type: 'string', message: '定价不能为空', trigger: 'blur', },
                    { type: 'string', pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message:'请输入正整数，或者两位小数', trigger: 'blur', },
                ],
                oriPrice: { required: false, type: 'string', pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message:'请输入正整数，或者两位小数', trigger: 'blur', },
                cost: { required: false, type: 'string', pattern: /^([1-9]\d*|0)(\.\d{1,2})?$/, message:'请输入正整数，或者两位小数', trigger: 'blur', },
                // stockNum:  { required: false, type: 'string', pattern: /^[0-9]*$/, message:'请输入正整数', trigger: 'blur', },
                remainNum:  { validator: remainNumRule, trigger: 'blur', },
                attachmentId: { required: true, type: 'string', message: '请上传图片', trigger: 'change', },
                introduction: { required: true, type: 'string', message: '简介不能为空', trigger: 'blur', },
                details: { required: true, type: 'string', message: '商品详情不能为空', trigger: 'change' },
                formIds: { required: true, type: 'array', message: '请选择表单', trigger: 'change' },
            },
            list: [],
            currentId: '',
            reg: /^([1-9]\d*|0)(\.\d{1,2})?$/, //整数或者最多两位的小数
            style: {
                width: '100px',
                'text-align':'right'
            }
        };
    },
    computed: {
        
    },
    components: {
        companysCheckbox, vSelect, editor
    },
    mounted(){
        this.uploadFileUrl = wpMarketCommon.getUploadFileUrl()
        this.backups = JSON.parse(JSON.stringify(this.newGoods));
        if(this.goodsId) {
            // 编辑
            this.getForm(this.goodsId);
        }else this.getFormTable();
        
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        getFormTable(str, id) {
            // 获取动态表单列表
            let params = {
                groupId: 'com_form_tpl_kind_goods',
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }
            if(str) params.name = str;
            common.listFormMean(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data
                    this.list = data.list;
                    let arr = [];
                    if(id) {
                        arr = data.list.filter(function(item){
                            return item.id == id; 
                        });
                        if(arr.length > 0) {
                            this.formName = arr[0].name;
                        }
                    }
                    this.count = data.count;
                    this.pageCount = data.pageCount;
                    this.pageNo = data.pageNo;
                    this.pageSize = data.pageSize;
                }
            }).catch(errors.call(this));
        },
        getForm(id) {
            this.updateLoadingStatus({isLoading: true});
            let params = {
                id: id
            }
            wpGoods.form(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let data = res.data.data
                    this.newGoods = data;
                    if(data.attachmentId) {
                        this.getPicture(data.attachmentId);
                    }
                    if(data.formIds.length == 1) {
                        // 有动态表单
                        this.getFormTable('', data.formIds[0]);
                    }
                    // if(this.goodsId) {
                    //     // 根据情况修改底部按钮的文字、保存成功的提示语
                    //     if(data.auditStatus == 'reject') {
                    //         // 编辑驳回审核的商品时
                    //         this.btnTitle = '保存并提交审核';
                    //     }else{
                    //         this.btnTitle = '保存';
                    //     }
                    // }
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        getPicture(id) {
            // 获取图片
            let params = {
                id: id
            }
            sys.getPath(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.picture = res.data.data.path;
                }
            }).catch(errors.call(this));
        },
        checkForm() {
            this.$refs['formCreate'].validate((valid) => {
                if(valid) {
                    this.save();
                }
            })
        },
        save() {
            // 保存
            if(this.$refs.companysCheckBox.showCheckboxGroup && !this.newGoods.officeIds.length) {
                this.$Message.error('您已选择分校可见，但未指定分校')
                return false
            }
            let params = this.newGoods;
            if(!this.goodsId) {
                // 新增
                params.auditStatus = 'unaudit';
                params.isUse = '0';
            }
            if(params.remainNum) params.stockNum = Number(params.saleNum) + Number(params.remainNum);
            else params.stockNum = null;
            this.updateLoadingStatus({isLoading: true});
            wpGoods.save(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    // this.empty();
                    // this.$Message.info(this.successMessage);
                    // this.$router.go(-1)
                    this.$router.push({
                        name: 'market.commodity'
                    })
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        },
        empty() {
            // 清空当前表单
            this.newGoods = JSON.parse(JSON.stringify(this.backups));
            this.currentId = '';
        },
        delImg() {
            // 删除图片
            this.picture = '';
            this.newGoods.attachmentId = '';
        },
        checkComany(data){
            // 选择分公司
            if(data.length > 0) {
                this.newGoods.isGlobal = '1';
            }else{
                this.newGoods.isGlobal = '0';
            }
            this.newGoods.officeIds = data
        },
        handleSuccess (res, file, fileList) {
            // 上传成功
            let data = res.data;
            this.newGoods.attachmentId = data.id;
            this.picture = data.filePath;
            this.updateLoadingStatus({isLoading:false});
            this.$Message.info('上传成功');
            this.$refs.formCreate.validateField('attachmentId');
        },
        handleFormatError() {
            this.updateLoadingStatus({isLoading:false});
            this.$Message.error("需使用'jpg','jpeg','png','gif'格式");
        },
        handleMaxSize() {
            this.updateLoadingStatus({isLoading:false});
            this.$Message.error("图片不得大于2M");
        },
        handleBefore () {
            // 上传之前
            this.updateLoadingStatus({isLoading:true});
            return true
        },
        datafunc(word) {
            return new Promise((resolve, reject) => {});
        },
        textChange() {
            // 修改搜索框
            // console.log(this.compact)
            this.getFormTable(this.compact);
        },
        checkedForm() {
            if(this.currentId) this.newGoods.formIds = [this.currentId];
            this.$refs.formCreate.validateField('formIds');
        },
        cancel() {},
        openModal() {
            // 打开选择表单弹窗
            this.formModal = true;
        },
        radioChange(currentRow, oldCurrentRow) {
            // 表单单选
            // console.log(currentRow)
            this.currentId = currentRow.id;
            this.formName = currentRow.name;
        },
        cencalForm() {
            // 取消选择表单
            this.newGoods.formIds = [];
            this.currentId = '';
        },
        back() {
            this.$router.go(-1)
        },
        previewForm() {
            // 预览表单
            // console.log(this.newGoods.formIds[0])
            // this.$router.push({
            //     name: 'market.previewForm',
            //     query: {
            //         formId: this.newGoods.formIds[0]
            //     }
            // })

            const {href} = this.$router.resolve({
                name: 'market.previewForm',
                query: {
                    formId: this.newGoods.formIds[0]
                }
            });
            window.open(href, '_blank');
        },
        pageChange(page) {
            this.pageNo = page;
            this.getFormTable();
        },
        sizeChange(size) {
            this.pageSize = size;
            this.getFormTable();
        },
        inputDetails(modal) {
            if(modal == '<p><br></p>') {
                this.newGoods.details = '';
            }
            this.$refs.formCreate.validateField('details');
        }
    },
}
</script>


