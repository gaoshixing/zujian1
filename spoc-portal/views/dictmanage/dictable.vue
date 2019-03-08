<style  lang="less">
.dictable-wrap{
    @borderColor: #73cdc9;
    @themeGreen: #44bcb7;
    padding-top: 20px;
    .menu-item-lists{
        min-height: 251px;padding-bottom: 1px;
    }
    .listMsg {
        .btnlist {
            position: relative;height: 40px;line-height: 40px;
            border: 1px solid #e0e0e0;background: #fafafa;border-radius: 2px;text-indent: 20px;
            .btnright {
                position: absolute;top: -1px;right: 20px;
            }
            button {
                height: 30px;border-color: transparent;
            }
            .lineSide {
                position: absolute;top: -1px;left: -1px;height: 40px;width: 5px;
                background: #43bbb6;border-radius: 2px 0 0 2px;
            }
            .altersort {
                border-color: #888;color: #000;
            }
            .savesort {
                border-color: @borderColor;color: @borderColor;
            }
            .bt1 {
                color: #fff;background: #44bcb7;
            }
        }
    }
    .menulist-table {
        max-height: ~"calc(100vh - 180px)";overflow: auto;position: relative;
        .linkbtn {
            color: #2d83bb;
            & + .linkbtn {
                margin-left: 8px;
            }
        }
        .nodata {
            padding: 40px 0;text-align: center;
        }
        .thead {
            color: #000;font-weight: bold;overflow: hidden;border-bottom: 1px solid #e5e5e5;margin-bottom: -1px;
            [class^="item-"] {
                line-height: 40px;
            }
        }
        [class^="item-"] {
            float: left;min-height: 40px;min-width: 1%;overflow: hidden;
            white-space: nowrap;text-overflow: ellipsis;text-align: center;
        }
        .menu-item-lists{
            .menu-item{
                &:first-child{
                    .menu-list-item{
                        border: none;
                    }
                }
            }
        }
        
        .item-foldable {
            width: 2%;text-align: right;cursor: pointer;
            &:hover {
                .iconfont {
                color: #888;
                }
            }
        }
        .item-name {width: 20%;}
        .item-val {width: 10%;}
        .item-type {width: 20%;}
        .item-brief {width: 10%;}
        .item-sort {width: 8%;}
        .item-show {width: 15%;}
        .item-ctrls {width: 17%;}
        .menu-list-item-wrap{
            .menu-list-item{
                height: 40px;line-height: 40px;border-top: 1px solid #e5e5e5;
                border-bottom: 1px solid #e5e5e5;overflow: hidden;margin-bottom: -1px;
                .iconfont{
                    color: #d9d9d9;transition: all 0.3s ease;
                }
            }
        }
    }
    .page-box{
        padding-top: 20px;padding: 18px;text-align: center;margin-bottom: 120px;
    }
}
.new-dict-wrap{
    .ivu-form-item{
        margin-bottom: 15px;
    }
    .ivu-input,.ivu-input-number-input,.ivu-select-single .ivu-select-selection{
        width: 180px;height: 35px;
    }
    .ivu-select,.inline-block{
        width: 180px;height: 35px;float: left;margin-right: 20px;
    }
    .ivu-select-input{
        width: 178px;height: 33px;
    }
    .ivu-input-number{
        width: 180px;
    }
    .ivu-form-item-error-tip{
        top: 37px;padding: 0;
    }
    .ivu-select-input[disabled]{
        color: #495060;
    }
    .clear{
        zoom: 1;
        &:after{
            content: "";display: table;clear: both;
        }
    }
    .newEnglishName{
        .ivu-select;border:1px solid #dddee1;background: #f1f1f1;border-radius: 3px;padding: 0 24px 0 8px;
    }
    .fullTextarea{
        .ivu-input{
            width: 100%;
        }
    }
    .addTypeBox{
        position: relative;
        .error{
            position: absolute;top: 37px;line-height: 1;
            color: #ed3f14;
            &:nth-of-type(1){
                left: 0;
            }
            &:nth-of-type(2){
                left: 200px;
            }
        }
        &.error{
            .newEnglishName,.ivu-select-selection{
                border-color: #ed3f14;
            }
        }
    }
    .ivu-form-item-required .ivu-form-item-label:before{
        display: none;
    }
}
</style>

<template>
    <div class="dictable-wrap">
        <div class="listMsg">
            <div class="btnlist">
                <div class="lineSide"></div>
                <span>字典列表</span>
                <div class="btnright">
                    <Button type="ghost" class="altersort" @click="showSort" v-if="!state.issort">调整排序</Button>
                    <Button type="ghost" class="savesort" @click="saveSorted" v-else>保存排序</Button>
                    <Button @click="addDect" class="bt1" style="margin-left:16px">新增字典项</Button>
                </div>
            </div>
        </div>
        <div class="menulist-table">
            <div class="thead">
                <div class="item-name">显示名称</div>
                <div class="item-val">字典值</div>
                <div class="item-type">类型</div>
                <div class="item-brief">描述</div>
                <div class="item-sort">排序</div>
                <div class="item-show">可见</div>
                <div class="item-ctrls">操作</div>
            </div>
            <div class="menu-item-lists" v-if="currSubMenu.length">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="menu-list-item-wrap" v-for="item in currSubMenu" :key="item.id" >
                    <div class="menu-list-item">
                        <div class="item-name" v-text="item.label"></div>
                        <div class="item-val" v-text="item.value"></div>
                        <div class="item-type" v-text="item.type"></div>
                        <div class="item-brief" v-text="item.description"></div>
                        <div class="item-sort" v-if="state.issort">
                            <InputNumber v-model="item.sort"></InputNumber>
                        </div>
                        <div class="item-sort" v-text="item.sort" v-else></div>
                        <div class="item-show">{{item.isHidden | showText}}</div>
                        <div class="item-ctrls">
                            <a href="javascript:void(0)" class="linkbtn" @click="editMenu(item)">编辑</a>
                            <a href="javascript:void(0)" class="linkbtn" @click="addSubMenu(item)">添加下级</a>
                            <a href="javascript:void(0)" class="linkbtn" v-if="item.isSys == 0"  @click="delMenu(item.id)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="nodata">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="page-box" v-show="pageCount > 1">
            <div style="margin: auto;display: inline-block;">
                <Page show-elevator show-total show-sizer
                    :current="pageNo"
                    :total="listCount"
                    :page-size="pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="sizeChange">
                </Page>
            </div>
        </div>
        <Modal v-model="newDictModel" class="new-dict-wrap"
            :title="modalTitle" width="730"
            @on-ok="ok" :loading="newDictModelLoading" ref='modal'
            @on-cancel="cancel">
            <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleValidate">
                <FormItem label="显示名称：" prop="label">
                    <Input v-model="formItem.label"/>
                </FormItem>
                <FormItem label="字典值：" prop="value">
                    <Input v-model="formItem.value"/>
                </FormItem>
                <FormItem label="父级：" v-if="formItem.parent">
                    <div class="newEnglishName">{{ formItem.parent }}</div>
                </FormItem>
                <FormItem label="分类：" v-if="!formItem.parent">
                    <div class="clear addTypeBox" :class="[chioceRight ? 'error' : '']">
                        <Select v-model="formItem.type" filterable @on-change="choiceName" 
                            @on-query-change="queryChanges" :disabled="isEditList">
                            <Option v-for="item in typeLists" :value="item.id" :key="item.id">{{ item.description }}</Option>
                        </Select>
                        <div class="newEnglishName">{{ englishName }}</div>
                        <span class="error" v-if="chioceRight">请选择分类</span>
                        <Button type="primary" @click="addType" v-if="!isEditList">添加</Button>
                    </div>
                    <div class="clear addTypeBox" style="margin-top:15px" v-if="addTypeShow">
                        <Input class="inline-block" v-model="newType.description" placeholder="输入分类中文名称"/>
                        <span class="error" v-if="descriptionRight">中文格式不对</span>
                        <Input class="inline-block" v-model="newType.type" placeholder="输入分类英文名称"/>
                        <span class="error" v-if="typeRight">英文格式不对</span>
                        <Button type="primary" @click="saveType">保存</Button>
                    </div>
                </FormItem>
                <FormItem label="排序：">
                    <InputNumber :min="1" v-model="formItem.sort"></InputNumber>
                </FormItem>
                <FormItem label="状态：">
                    <i-switch v-model="formItem.isHidden" size="large">
                        <span slot="open">显示</span>
                        <span slot="close">隐藏</span>
                    </i-switch>
                </FormItem>
                <FormItem label="备注：">
                    <Input v-model="formItem.remarks"
                        type="textarea" class="fullTextarea"
                        :autosize="{minRows: 2,maxRows: 5}"/>
                </FormItem>
            </Form>
        </Modal>

        <Modal
            v-model="delDictModal"
            title="提示"
            @on-ok="delDictList">
            <p>确定删除当前数据？</p>
        </Modal>
    </div>
</template>

<script>

import valid,{errors, sys} from '../../libs/request.js';

export default {
    data() {
        return  {
            spinShow: true, //loading
            isEditList: false,//编辑状态
            title: '',
            delDictModal: false,
            pageNo: 1,
            pageCount: 0,
            pageSize: 10,
            listCount: 0,
            newDictModel: false,
            englishName: '',
            chineseName: '',
            addTypeShow: false,
            canAddType: true,
            descriptionRight: false,
            typeRight: false,
            chioceRight: false,
            initializeTypeID: '',
            initializeTypeName: '',
            initializeParentId: '',
            initValue: '',
            newDictModelLoading: true,
            isRoot: '',
            modalTitle: '新增字典项',
            delMenuID: '',
            menuId: '',
            newType: {
                description: '',
                type: ''
            },
            newTypeLists: [],
            typeLists: [],
            formItem: {
                label: '',
                value: '',
                sort: 1,
                isHidden: true,
                remarks: '',
                type: '',
                parent: '',
                parentID: '',
                parentVal: '',
                parentLabel: ''
            },
            editMenuID: '',
            checkTree: false,
            ruleValidate: {
                label: [
                    { required: true, message: '显示名称不能为空', trigger: 'blur' }
                ],
                value: [
                    { required: true, message: '字典值不能为空', trigger: 'blur' }
                ]
            },
            currSubMenu:  [],
            state: {
                issort: false
            },
        }
    },

    mounted() {
        // console.log(this.$route.query.id);
        this.getCategoryList();
    },

    methods: {
        emptyLists() {
            // 清空列表
            this.currSubMenu = [];
            this.pageNo = 1;
            this.pageCount = 0;
        },
        changTitle(item) {
            // console.log(item)
            this.menuId = item.id;
            if(item.id == -1){
                this.menuId = ''
            }
            // this.menuId = 1020;
        },
        needUpload(item) {
            // console.log(item)
            this.isRoot = item.isRoot;
            this.initializeTypeID = item.id;
            this.initializeTypeName = item.type;
            this.initializeParentId = item.parentId;
            this.initValue = item.value;
            this.title = item.title;
            this.pageNo = 1;
            this.getListData();
        },
        getListData() {
            // 获取字典列表
            this.spinShow = true;
            let params = {
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
            if(this.isRoot) {
                // type: type
                // params.isRoot = this.isRoot;
                params.type = this.initializeTypeName;
            } else {
                // type: value
                params.type = this.initValue;
            }
            if(this.menuId) {
                params.menuId = this.menuId
            }
            sys.DictListDataNew(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    let _data = res.data.data;
                    this.currSubMenu = _data.list;
                    this.listCount = _data.count;
                    this.pageCount = _data.pageCount;
                    this.spinShow = false;
                }
            }).catch(errors.call(this));
        },
        addType() {
            // 弹窗-添加分类
            if(this.canAddType) {
                this.addTypeShow = true;
            }
        },
        saveType() {
            // 保存新增分类
            // 验证中文合法性
            let han = /^[\u4e00-\u9fa5]+$/;
            if(!this.newType.description || !han.test(this.newType.description)) {
                this.descriptionRight = true;
                return false;
            } else {
                this.descriptionRight = false;
            }
            // 验证英文合法性
            let eng = /^(?!_)[a-zA-Z0-9_]+$/;
            if(!this.newType.type || !eng.test(this.newType.type)) {
                this.typeRight = true;
                return false;
            } else {
                this.typeRight = false;
            }
            let _new = {
                id: new Date().getTime(),
                description: this.newType.description,
                type: this.newType.type,
            }
            this.newType.description = '';
            this.newType.type = '';
            this.typeLists.push(_new);
            this.newTypeLists.push(_new);
            this.addTypeShow = false;
        },
        choiceName(val) {
            // console.log(val)
            if(val) {
                // 一级查找
                let temp = this.typeLists.filter((list) => {
                    return list.id == val;
                })[0];
                if(!temp) {
                    // 非一级查找
                    temp = this.typeLists.filter((list) => {
                        return list.parentId == val;
                    })[0];
                }
                // console.log(temp);
                if(temp) {
                    this.formItem.type = temp.id;
                    this.englishName = temp.type;
                    this.chineseName = temp.description;
                    this.canAddType = false;// 不可添加新分类
                    this.addTypeShow = false;
                }
            }
        },
        queryChanges(item) {
            this.canAddType = true;
        },
        showSort() {
            this.state.issort = true;
            // 调整排序
        },
        saveSorted() {
            // 保存排序
            let params = [];
            for(let i = 0;i < this.currSubMenu.length;i++) {
                let arr = {
                    id: this.currSubMenu[i].id,
                    sort: this.currSubMenu[i].sort
                }
                params.push(arr);
            }
            // console.log(params)
            sys.DictDictSort(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.getListData();
                }
            }).catch(errors.call(this));
            this.state.issort = false;
        },
        getCategoryList() {
            // 字典分类下拉列表
            sys.DictCategoryList().then(valid.call(this)).then(res => {
                if(res.ok) {
                    let _data = res.data.data;
                    this.typeLists = _data;
                    // console.log(this.typeLists)
                }
            }).catch(errors.call(this));
        },
        addDect() {
            // 新增字典项
            // 重置数据
            this.formItem = {
                label: '',
                value: '',
                sort: 1,
                isHidden: true,
                remarks: '',
                type: this.initializeTypeID,
                parent: '',
                parentID: ''
            }
            // 默认分类
            this.isEditList = false;
            this.modalTitle = '新增字典项';
            // this.englishName = this.initializeTypeName;
            // this.englishName = '';
            this.editMenuID = '';
            this.chioceRight = false;
            this.checkTree = false;
            this.addTypeShow = false;
            this.newDictModel = true;
        },
        typeToId(type) {
            // console.log(type)
            // console.log(this.typeLists)
            let _lists = this.typeLists;
            let _id = _lists.filter((list) => {
                return list.type == type;
            })[0].id;
            return _id;
        },
        editMenu(item) {
            // console.log(item)
            // 编辑字典项
            this.formItem = {
                label: item.label,
                value: item.value,
                sort: item.sort,
                isHidden: true,
                remarks: item.remarks,
            }
            if(item.isHidden == 0) {
                this.formItem.isHidden = true;
            } else if(item.isHidden == 3) {
                this.formItem.isHidden = false;
            }
            this.isEditList = true;
            this.modalTitle = '编辑字典项';
            this.formItem.type = item.id;
            this.editMenuID = item.id;
            this.checkTree = false;
            this.chioceRight = false;
            this.newDictModel = true;
            this.addTypeShow = false;
        },
        addSubMenu(item) {
            // 添加下级
            // console.log(item)
            // 重置数据
            this.formItem = {
                label: '',
                value: '',
                sort: 1,
                isHidden: true,
                remarks: '',
                type: '',
                parent: '',
                parentID: ''
            }
            // parentId=所选分类Id，description=所选分类label，type=所选分类value
            this.isEditList = false;
            this.modalTitle = '新增字典项';
            this.formItem.parent = item.type;
            this.formItem.parentID = item.id;
            this.formItem.parentVal = item.value;
            this.formItem.parentLabel = item.label;
            this.englishName = item.label;
            this.editMenuID = '';
            this.newDictModel = true;
            this.checkTree = true;
        },
        delMenu(id) {
            this.delMenuID = id;
            this.delDictModal = true;
        },
        delDictList() {
            // 删除某一项列表
            let params = {
                id: this.delMenuID
            }
            sys.DictDelect(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.delDictModal = false;
                    this.getListData();
                    // 刷新左侧树
                    this.$emit('uploadTree', null, this.menuId);
                }
            }).catch(errors.call(this));
        },
        pageChange(page) {
            this.pageNo = page;
            this.getListData();
        },

        sizeChange(size) {
            this.pageSize = size;
            this.getListData();
        },
        ok() {
            let params = {
                description: this.title,
                label: this.formItem.label,
                remarks: this.formItem.remarks,
                sort: this.formItem.sort,
                value: this.formItem.value,
            }
            if(this.menuId) {
                params.menuId = this.menuId
            }
            // 所选分类为一级分类即parentId=0或自定义分类，传参parentId=0,否则parentId=所选分类Id
            if(!this.initializeParentId || this.initializeParentId == 0){
                params.parentId = 0;
            }else{
                params.parentId = this.initializeTypeID;
            }
            // 显示、隐藏
            if(this.formItem.isHidden) {
                params.isHidden = 0
            } else {
                params.isHidden = 3
            }
            // 编辑
            if(this.editMenuID) {
                params.id = this.editMenuID
            }
            
            if(this.formItem.parent) {
                // 添加下级
                // console.log('添加下级')
                params.parentId = this.formItem.parentID;
                params.description = this.formItem.parentLabel;
                params.type = this.formItem.parentVal;
                this.chioceRight = false;
            } else {
                if(!this.englishName) {
                    this.chioceRight = true;
                    return false;
                }
                params.type = this.englishName;
                params.description = this.chineseName;
            }
            
            // console.log(params);
            this.$refs['formItem'].validate((validout) => {
                if (validout) {
                    sys.DictSave(params).then(valid.call(this)).then(res => {
                        if(res.ok) {
                            this.newDictModel = false;
                            this.getListData();
                            // console.log(this.checkTree)
                            if(this.checkTree){
                                this.$emit('uploadTree', null, this.menuId);
                            }
                        }
                    }).catch(errors.call(this));
                } else {
                    this.$refs.modal.buttonLoading = false;
                }
            })
        },
        cancel() {
            this.$refs['formItem'].resetFields();
        },
    },
    filters:{
        showText(isShow){
            if(isShow == 0) {
                return '显示';
            } else if(isShow == 3) {
                return '隐藏';
            }
        }
    },
}
</script>


