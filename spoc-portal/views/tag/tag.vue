<style lang='less'>
    .tagManageGsx {
        .active {
            background-color: #daf2f1;
        }
        .content {
            overflow: hidden;
        }
        box-shadow: 0 0 15px hsla(177.5, 47.2%, 50.2%, 0.3);
        font-size: 14px;
        position: relative;
        .title {
            .itemText {
               position: relative;
               top: -2px;
            }
            .ball {
                display: inline-block;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                margin-left: 15px
            }
            .addGroup {
                color:#2d8cf0;
                font-weight: 400;
                cursor: pointer;
                float: right;
                margin-right: 20px;
            }
            p {
               border-bottom: 1px solid #e0e0e0; 
               line-height: 50px;
                a {
                    margin-left: 50px;
                }
                .right {
                    float: right;
                }
            }
        }
        .tagLeft {
            overflow: auto;
            float: left;
            width: 25%;         
            border-right: 1px solid #e0e0e0;
            .asideList {
                padding: 32px 0;
                .asideItem { 
                    padding: 0 20px;
                    height: 44px;
                    line-height: 44px;
                    overflow: hidden;
                    position: relative;
                    .itemText {
                        float: left;
                        left: 50px;
                    }
                    .more {
                        display: none;
                        padding: 0;
                        font-size: 12px;
                        position: absolute;
                        right: 0;
                        top: 2px;
                        cursor: pointer;
                    }
                    .center {
                        height: 100%;
                        line-height: 100%;
                        position: absolute;
                        right: 30%;
                        top: 17px;
                        color: #44bcbc;
                    }
                    .move {
                        position: absolute;
                        right: 20%;
                        top: 15px;
                        font-size: 22px;
                        height: 100%;
                        line-height: 100%;
                        display: none;
                    }
                }
                .asideItem:hover {
                    background-color: #daf2f1;
                    .more {
                        display: block;
                        color: #44bcbc;
                    }
                    .move {
                        color: #44bcbc;
                        display: inline-block;
                    }
                }
                .active {
                    background-color: #daf2f1;
                }
                .ball {
                    float: left;
                    border-radius: 50%;
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    margin-top: 13px;
                }
            }
        }
        .tagRight {
            width: 75%;
            float: left;
            .contentTitle {
                line-height: 50px;
                padding-left: 20px;
                .right {
                    float: right;
                }
    
            }
            .noData{
                background: url(../../assets/img/tableDataEmpty.png);
                padding-bottom: 50px;
                display: block;
                padding-top: 160px;
                color: #aaa;
                margin-top: 200px;
                text-align: center;
                background-repeat: no-repeat;
                background-position: center 40px;
                min-width: 200px;
            }
            .contentTag {
                .addTag {
                    padding: 19px 20px;
                    a {
                        margin-right: 33px;
                    }
                }
                .littleTag {
                    padding: 10px 20px;
                }
            }
        }
        .moreList {
            width: 148px;
            padding: 15px 0px;
            position: absolute;
            left: 23%;
            top: 0;
            z-index: 3;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0 0 3px gray;
            p { 
                padding: 0 20px;
                line-height: 32px;
                cursor: pointer;
            }
            p:hover {
                background-color: #ecf8f8;
                color: #44bcbc
            }
        }
    }
    .contentDialog {
        color: #b8b8b8;
        overflow: hidden;
        .addGroupLeft {
            width: 97px;
            float: left;
            line-height: 29px;
            p {
                width: 100%;
                text-align: right;
            }
            .GroupName {
                margin-bottom: 36px;
            }
            
        }
        .addGroupright {
            float: left;
            color: #000;            
            p {
                line-height: 25px;
            }
            .checkBoxC {
                display: inline-block;
                width: 132px;
                line-height: 28px;
            }
        }
        .tagCheck {
            margin-top: 8px;
            float: left;
            color: #000;                        
            .left {
                width: 97px;
                margin-top: 5px;
                float: left;
                color: #b8b8b8;
                text-align: right;
            }
            .all, .allList {
                float: left;
            }
            .all {
                width: 133px;
            }
            .allList {
                width: 440px;
            }
        }
        .checkBoxC {
            display: inline-block;
            width: 145px;
            line-height: 28px;
        }
        .tagCheck1 {
            margin-top: 20px;
            over-flow: hidden;
            .all, .allList {
                float: left;
            }
            .all {
                width: 133px;
            }
            .allList {
                width: 440px;
            }
        }
    }
    
</style>
<template>
    <div class="tagManageGsx">
        <div class="content" >
             <div class="title">
                <p>
                    <span style="display:inline-block;width:25%;border-right:1px solid #e0e0e0">标签管理
                        <span @click="addTagList('1')" class="addGroup">创建分组</span>
                    </span>
                    <span :style="{backgroundColor:MudelName.color}" class="ball"></span>
                    <span class="itemText">
                        {{MudelName.title}}
                    </span>
                    <span class="right">
                        选择应用模块：
                        <Select v-model="selectV" style="width:178px" @on-change='selectChang'>
                            <Option value="000" key=" " >全局</Option>
                            <Option v-for="item in allList" :value="item.id" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </span>
                </p>
            </div>
            <div class="tagLeft" ref="tagLeft">
                <div class="asideList" v-if="isShowContent">
                    <p :class="{asideItem: true,active: index == isCheck }" @click="getChildrenTag(index, item)" v-for="(item, index) in tagList" :key='index' draggable="true" @dragenter="handleDragEnter($event,item)" @dragend.prevent="handleDragEnd($event,item)">
                        <span :style="{backgroundColor:item.color}" class="ball"></span>
                        <span class="itemText">{{item.title}}</span>
                        <span v-if="item.isSys == 1" class="iconfont icon-htmal5icon46 center"></span>
                        <span @click.stop="loadMore(index, item)" class="more iconfont icon-caozuo"></span>
                        <span class="icon-move iconfont move"></span>
                    </p>
                </div>
            </div>
            <div class="tagRight">
                <div class="contentTitle">
                </div>
                <span class="noData"  v-if="!isShowContent">
                    暂无数据
                </span>
                <div class="contentTag" v-if="isShowContent">
                    <p class="addTag">
                        <span style="color:#2d8cf0;margin:0 30px 0 10px;cursor: pointer" v-if="isShowDelate" @click="addTag">添加标签</span>
                        <Checkbox v-model="single" @on-change="allow">允许这组标签多选</Checkbox>
                    </p>
                    <div class="littleTag">
                        <tag-module
                        @deleteTag = 'deleteTagRight'
                        @upTagName = 'upTagNameRight'
                        :littleTag='littleTag'
                        @sortTag='sortTagChild'
                        >
                        </tag-module>
                    </div>
                </div>
            </div>
        </div>   
        <div ref="moreList" v-show="isShow" class="moreList">
            <p class="moreChild" @click="addTagList(2)">修改分组</p>
            <p class="moreChild" v-if="isShowDelate" @click="moreClick(1)">删除分组</p>
        </div>
        <!-- 对话框 -->
        <Modal
            v-model="modal1"
            width=728
            :title="groupName"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="contentDialog">
                <div class="addGroupLeft">
                    <p class="GroupName">分组名称：</p>
                    <p >　标签性质：</p>
                    <p style="margin-top:9px">　　适用于：</p>
                </div>
                <div class="addGroupright">
                    <Input v-model="addParentTag" placeholder="请输入分组名称" style="width: 300px" :maxlength="6"></Input>
                    <p>提示: 分组名称中文最多6个字</p>
                    <p style="margin-top:12px">
                        <RadioGroup v-model="tagType"  @on-change='radioChangeTag'>
                            <Radio :disabled="isDisabled" label="系统定义"></Radio>
                            <Radio :disabled="isDisabled" label="用户定义"></Radio>
                        </RadioGroup>
                    </p>
                    <p style="margin-top:12px;margin-bottom:5px">
                        <RadioGroup v-model="labelType" @on-change='radioChange'>
                            <Radio label="全局标签"></Radio>
                            <Radio label="模块标签"></Radio>
                        </RadioGroup>
                    </p>
                </div>
                <div class="tagCheck" v-if="labelType!='全局标签'">
                    <div class="left">
                        选择应用模块：
                    </div>
                    <div class="allList" >
                        <CheckboxGroup v-model="allListId" @on-change="checkBox" >
                            <span v-for="(item, index) in allList" :key="index" class="checkBoxC">
                                <Checkbox :label="item.id">&nbsp;{{item.name}}</Checkbox>
                            </span>                                
                        </CheckboxGroup>
                    </div>
                </div>
                <div class="tagCheck">
                    <div class="left">
                        选择应用范围：
                    </div>
                    <div class="allList">
                        <CheckboxGroup v-model="userDList" @on-change="defineCheckBox" >
                            <span v-for="(item, index) in allDefineList" :key="index" class="checkBoxC">
                                <Checkbox :label="item.value">&nbsp;{{item.label}}</Checkbox>
                            </span>                                
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <!-- <div class="contentDialog" v-else>
                <span style="float:left; line-height: 30px">标签名字：</span>
                <div style="margin-left: 60px">
                    <Input v-model="upTagName" style="width: 100%"></Input>
                </div>
                <div class="tagCheck1">
                    <p style="margin-top:12px">
                        适用于全局：
                        <RadioGroup v-model="labelType1" @on-change='radioChange1'>
                            <Radio label="全局标签"></Radio>
                            <Radio label="模块标签"></Radio>
                        </RadioGroup>
                    </p>
                    <div class="allList"  v-if="labelType1=='模块标签'">
                        选择应用模块：
                        <CheckboxGroup v-model="allListIdEdit" @on-change="checkBox" >
                            <span v-for="(item, index) in allList" :key="index" class="checkBoxC">
                                <Checkbox :label="item.id">&nbsp;{{item.name}}</Checkbox>
                            </span>                                
                        </CheckboxGroup>
                    </div>
                </div>
            </div> -->
        </Modal>
        <Modal
            v-model="modal2"
            width=728
            ref="refModal"
            :title="TagName"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <div v-if="TagName == '添加标签'">
                <span style="float:left; line-height: 30px">标签名字：</span>
                <div style="margin-left: 60px">
                    <Input v-model="tagAddName" style="width: 100%"></Input>
                </div>
                <p style="margin-left:62px;color:#999;line-height:40px;">提示: 最多可输入6个字</p>
            </div>
            <div v-if="TagName == '删除分组'">
                <p style="text-align: center">确定删除 <span style="color:red; font-size: 16px">{{parentTagName}} </span>吗?</p>
            </div>
        </Modal>
    </div>
</template>
<script>
import tagModule from './tagModule'
import valid, { errors, common, sys } from "../../libs/request"
export default {
    data() {
        return {
            labelType: '模块标签',
            // labelType1: '模块标签',
            MudelName: {},
            isShowContent: true,
            isDisabled: true,
            isShowDelate: false,
            // upTagName: '',
            isNotice: false,
            allListId: [],
            userDList: [],
            allDefineList: [],
            // allListIdEdit: [],
            addParentTag: '',
            delateId: '',
            parentTagName: '',
            isCheck: '',
            parentId: '',
            addTagName: '',
            tagPlace: '',
            leftNum: 0,
            dmenuI: '',
            sortTagList: [],
            tagAddName: '',
            modal2: false,
            TagName: '',
            groupName: '',
            value: '',
            model1: '全部',
            selectV: '000',
            modal1: false,
            state: {
                item: {},
                dragHoverItem: {}
            },
            allList: [],
            isShow: false,
            littleTag: [],
            tagList: [],
            single: false,
            formDateEdit: '',
            tagType: '用户定义'
        }
    },
    components: {
        tagModule,
    },
    watch: {
        tagList() {
            this.isCheck =  this.tagList.findIndex((item, key) => {
                return item.checked == true
            })
            this.isCheck = this.isCheck == -1 ? 0 : this.isCheck
            this.littleTag = this.tagList[this.isCheck].children
            this.parentId = this.tagList[this.isCheck].id
            this.MudelName = this.tagList[this.isCheck]
            this.single = this.tagList[this.isCheck].isMultiselect == '0' ? false : true
            this.isShowDelate = this.tagList[this.isCheck].isSys == '1' ? false : true
        }
    },
    computed: {
        // tagType() {
        //     if(this.formDateEdit) return '用户定义'
        //     return this.formDateEdit.isSys == '0' ? '用户定义' : '系统定义'
        // }
    },
    mounted() {
        // 屏幕高度
        this.getScreenHeight()
        document.addEventListener("click", this.hiddenMore, false);
        this.getBuildTree()
        // 获取所有模块
        this.dialogTag('init')
        this.getUserDefineTag()
    },
    methods: {
        getUserDefineTag() {
            let obj = {
                type: 'com_tag_right_type'
            }
            sys.dictListData(obj).then(valid.call(this)).then(res => {
				if(res.ok) {
                    this.allDefineList = res.data.data
				}
			}).catch(errors.call(this)).finally();
        },

        getScreenHeight() {
            this.$refs.tagLeft.style.height = (document.documentElement.offsetHeight || document.body.offsetHeight) - 120 + 'px'
        },

        checkBox(val) {
            // console.log(val)
        },

        defineCheckBox(val) {

        },

        getBuildTree() {
            if(this.parentId == this.delateId) this.parentId = ''
            let obj = {
                id: this.parentId,
                menuId: this.menuId,
                flag: 0,
            }
            common.buildTree(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    if(!res.data.data.children.length) {
                        this.MudelName = {}
                        this.$Message.info('暂无数据')
                        this.isShowContent = false
                        return
                    }
                    this.isShowContent = true
                    this.tagList = res.data.data.children
                    if(this.tagList) this.parentTagName = this.tagList[0].title
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        sortTagChild(val) {
            this.sortTagList = val
            this.sortTag()
        },
        // 标签排序
        sortTag() {
            let obj = {
                tagList: this.sortTagList
            }
            common.sortTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.getBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
            
        },
        deleteTagRight(val) {
            this.delateId = val[0]
            this.deleteTag()
        },
        // 删除标签
        deleteTag(type={}) {
            let obj = {
                id: this.delateId
            }
            common.deleteTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.getBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        upTagNameRight(val) {
            this.delateId = val[0]
            this.upTagName = val[1]
            this.updateTagName()
        },
        // 修改标签名
        updateTagName() {
            let obj = {
                id: this.delateId,
                name: this.upTagName
            }
            common.updateTagName(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                   this.getBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        radioChange(val) {
            if(val == '全局标签') this.allListId = []
        },

        radioChangeTag(val) {

        },

        radioChange1(val) {
            if(val == '全局标签') this.allListId = []
        },
        // 是否多选
        isManyCheck() {
            let obj = {
                id: this.parentId,
                isMultiselect: this.single ? 1 : 0,
            }
            common.isManyCheck(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.getBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        addClick() {
            document.addEventListener("click", this.hideMenu, false);
        },
        hiddenMore() {
            this.isShow = false
        },
        allow(val) {
            this.single = val
            this.isManyCheck()
        },
        getChildrenTag(index, item) {
            this.MudelName = item
            if(item.isSys == 1 ) {
                this.isShowDelate = false 
            }else {
                this.isShowDelate = true
            }
            this.isCheck = index
            this.parentId = item.id
            this.single = item.isMultiselect == '0' ? false : true
            this.littleTag = item.children
        },
        addTagList(val) {
            this.groupName = val == 1 ? '创建分组' : '修改分组'
            if(val == 1) {
                this.delateId = ''
                this.isDisabled = false
                this.userDList = []
                this.tagType = '系统定义'
                this.allListId.push(this.menuId)
                this.modal1 = true
                return
            }
            if(val == 2) {
                this.editTag()
                return
            }
        },
        // 拿到原来模块的东西
        editTag() {
            this.isDisabled = true
            let obj = {
                id: this.delateId,
            }
            common.editTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.formDateEdit =  res.data.data
                    this.userDList = res.data.data.comTagRightList.map((item) => {
                        return item.type
                    })
                    this.tagType = (res.data.data.isSys == '0') ? '用户定义' : '系统定义'
                    let ids = res.data.data.menuIds.substr(1,res.data.data.menuIds.length)
                    if(ids) {
                        this.labelType = '模块标签'
                        this.allListId = res.data.data.menuIds.split(',')
                    }else {
                        this.labelType = '全局标签'
                        this.allListId = [] 
                    }
                    this.modal1 = true
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        dialogTag(type={}) {
            let obj = {
                parentId: 0,
            }
            sys.dialogTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.allList = res.data.data
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        saveTag(obj) {
            common.saveTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.tagAddName = ''
                    this.upTagName = ''
                    this.allListId = []
                    this.$Message.info(res.data.message)
                    this.getBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },
        
        addTag() {
            this.parentTagName = '请输入标签名字'
            this.TagName = '添加标签'
            this.modal2 = true
        },
        selectChang(val) {
            this.menuId = val == '000' ? '' : val
            this.getBuildTree()
        },
        moreClick(index) {
            this.hiddenMore()
            this.TagName = index == 0 ? '修改分组' : '删除分组'
            this.modal2 = true
        },
        loadMore(index, item) { 
            if(item.isSys == 1 ) {  
                this.isShowDelate = false 
            }else {
                this.isShowDelate = true
            }
            this.parentTagName = item.title            
            this.addParentTag = item.title
            this.delateId = item.id
            this.isShow = index +1 > 0 ? true :false
            this.$refs.moreList.style.top = `${108+ index*44}px`
        },
        handleDragEnter(e, item) {
            this.state.dragHoverItem = item;
        },
        handleDragEnd(e, item) {
            let resList = this.tagList.concat([]);
            let index = this.getItemIndex(resList, this.state.dragHoverItem);
            let rindex = this.getItemIndex(resList, item);
            resList.splice(rindex, 1);
            resList.splice(index, 0, item);
            let menuList = [];
            resList.forEach((item, i) => {
                menuList.push({ id: item.id, sort: i });
            });
            this.sortTagList = menuList
            this.sortTag()
        },
        getItemIndex(arr,item) {
            for(let i in arr){
                if(arr[i].id==item.id){
                    return i;
                }
            }
            return -1;
        },
        ok() {             
            let obj = {
                parent: {id:0},
                isGroup: 1,
                 
            }
            // if(this.groupName == '创建分组') {
                if(!this.addParentTag) {
                    this.$Message.info('请输入标签名称')
                    return
                }
                let comTagRightList = this.allDefineList.reduce((prev, item) => {
                    this.userDList.forEach((item1) => {
                        if(item.value == item1) {
                            let obj = {}
                            obj.tagId = this.delateId
                            obj.type = item.value
                            prev.push(obj)
                        }
                    })

                    return prev
                }, [])
                 
                Object.assign(obj, {
                    menuIds: this.allList.length === this.allListId.length ? ',' : `,${this.allListId.join(',')}`,
                    name: this.addParentTag,
                    id: this.delateId,
                    comTagRightList: comTagRightList,
                    isSys: this.tagType == '用户定义' ? 0 : 1
                })
            // }else {
                // if(!this.upTagName) {
                //     this.$Message.info('请输入标签名称')
                //     return
                // }
                // Object.assign(obj, {
                    // menuIds: this.allList.length === this.allListIdEdit.length ? ',' : `,${this.allListIdEdit.join(',')}`,
                    // name: this.upTagName,
                   
                // })
            // }
            
            this.saveTag(obj)
            this.addParentTag = ''
            return
        },
        cancel() {
            // this.allListIdEdit = []
            this.addParentTag = ''
        },
        ok1() {
            if(this.TagName == '删除分组') {
                if(!this.tagList[this.isCheck].children.length) {
                    this.$Message.info('当分组下标签不为空，不可删除，提示“删除标签组前，请先删除组内标签')
                }
                this.deleteTag()
                return
            }
            if(this.TagName == '添加标签') {
                let sum = 0
                for(let i = 0; i < this.tagAddName.length; i++) {
                  if(this.tagAddName.charCodeAt(i) < 128) {
                      sum += 1
                  }else {
                      sum += 2
                  }
                }
                if(sum > 12) {
                    this.$Message.info('最多能输入6个字')
                    this.modal2 = true
                    this.$refs.refModal.visible = true
                    return
                }
                let obj = {
                    parent: {id:this.parentId},
                    name: this.tagAddName,
                    isGroup: 0,
                    sort: 50,
                }
                this.saveTag(obj)
                return
            }
            if(this.TagName == '修改分组') {
                this.updateTagName()
                return
            }
           
        },
        cancel1() {
        }
    },       
}
</script>
