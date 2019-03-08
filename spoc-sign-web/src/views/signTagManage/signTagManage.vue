<style lang="less">
    .signTagManage {
        border-top: 1px solid #e0e0e0;
        p {
            font-size: 14px;
            margin-top: 25px;
            i,b {
                font-weight: normal;
                font-style: normal;
            }

            i {
                width: 75px;
                display: inline-block;
                text-align: right;
                color: #b8b8b8;
            }

            span {
                cursor: pointer;
                .inside {
                    display: inline-block;
                    min-width: 60px;
                    position: relative; 
                    padding: 0 13px;
                    text-align: center;
                }

                p {
                    width: 100%;
                    text-align: center;
                    display: inline;
                    font-size: 12px;
                    color: #44bcb7;
                    position: absolute;
                    top: -40px;
                    left: -5px;

                    b {
                        margin-left: 5px; 
                    }
                }
            }
        }
    }
    .iviewDelete {
        .ivu-modal-footer {
            overflow: hidden;
            .ivu-btn {
                float: right;
            }
        }
    } 
</style>

<template>
    <div v-if="isAdmin" class="signTagManage">
        <p v-for="(item,index) in signList" :key="index">
            <i>{{item.title}}：</i>
            <span v-for="(child, index) in item.children" :key="index">
                <span class="inside" v-if="child.title" @mouseenter="enter(child)" @mouseleave="leave(child)">{{child.title}}
                <p v-show="child.checked" @mouseenter="enter(child)" @mouseleave="leave(child)">
                    <b @click="editor(child, item)">编辑</b><b @click="deleteItem(child)">删除</b></p>
                </span>          
            </span>
            <a href="javascript:;" @click="addTag(item)">&nbsp;&nbsp;添加标签</a>
            <a href="javascript:;" @click="editorGroup(item)">&nbsp;编辑分组&nbsp;</a>
            <a v-if="item.children.length==0" @click="deleteGroup(item)" href="javascript:;">删除分组</a>
        </p>
        <Button @click="addTagList" style='background-color:#44bcb6;color:white;margin-top:27px'>添加标签分组</Button>
        <Modal
        v-model="modal1"
        :title="alertTitle"
        @on-ok="ok"
        width='728'
        @on-cancel="cancel">
            <p v-if="alertTitle!== '添加标签分组'"style="margin-bottom:15px"><span style="color:#b8b8b8;margin-right:20px">标签分组:</span> {{tagGroupTitle}}
            <p v-if="alertTitle == '添加标签分组'"><span style="color:#b8b8b8;margin-right:20px">添加分组</span><Input v-model="tagTitle" placeholder="添加分组" style="width: 198px"></Input></p>
            <p v-if="alertTitle == '编辑分组名称'"><span style="color:#b8b8b8;margin-right:20px">编辑分组:</span><Input v-model="editorText" :placeholder="placehd" style="width: 198px"></Input></p>
            <p v-if="alertTitle == '编辑标签'"><span style="color:#b8b8b8;margin-right:20px">编辑标签:</span><Input v-model="editorTagText" :placeholder="placehdTag" style="width: 198px"></Input></p>
            <p v-if="alertTitle == '添加标签'"><span style="color:#b8b8b8;margin-right:20px">添加标签:</span><Input v-model="addTagText" placeholder="输入类型名称" style="width: 198px"></Input></p>
        </Modal>
        <Modal
        class="iviewDelete"
        v-model="modal2"
        :title="deleteTittle"
        @on-ok="deleteOk"
        width='728'
        @on-cancel="cancel">
            <p style="text-align:center;font-size:16px;line-height:100px">确定删除<span style="margin:0 10px;color:#e8352c">{{deleteContent}}</span>吗?</p>
        </Modal>
    </div>
	
</template>

<script>
import valid, { errors, SIGNTAGMANAGE } from "../../libs/request";
import {mapGetters, mapState} from 'vuex';

export default {
    data (){
		return {
            placehd: '',
            placehdTag: '',
            alertTitle: '',
            addTagText: '',
            editorText: '',
            editorTagText: '',
            tagGroupTitle: '',
            tagTitle: '',
            deleteTittle: '',
            editorObj: '',
            editorObjList: '',
            tagId: '',
            deleteContent: '',
            tagTitleId: 0,
            modal1: false,
            modal2: false,
            signList: [],
		}
    },
    
    mounted() {
        this.getSignTagBuildTree()
    },

    computed: {
        ...mapGetters('sign',['isAdmin']),
    },

	methods:{
        getSignTagBuildTree() {
            SIGNTAGMANAGE.signTagBuildTree().then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.signList = res.data.data.children
                }
            })
            .catch(errors.call(this))
            .finally(() => {});
        },

        enter(obj) {
            obj.checked = true;
        },

        leave(obj) {
            obj.checked = false;
        },

        editor(obj, item) {
           this.alertTitle = "编辑标签"
           this.tagGroupTitle = item.title
           this.tagTitleId = obj.id
           this.placehdTag = obj.title
           this.modal1 = true
           this.signEditor()
        },

        addTagList() {
            this.tagGroupTitle = this.tagTitle = ''
            this.modal1 = true    
            this.alertTitle = '添加标签分组'        
        },

        addTag(obj) {
            this.tagGroupTitle = obj.title
            this.tagTitleId = obj.id
            this.modal1 = true
            this.addTagText = '',
            this.alertTitle = '添加标签'
        },

        editorGroup(obj) {
            this.placehd = this.tagGroupTitle = obj.title
            this.tagTitleId = obj.id
            this.modal1 = true    
            this.alertTitle = '编辑分组名称'
            this.signEditor()
        },

        ok() {
            this.getSaveSignGroup()
        },
        
        cancel() {
        },
        
       getSaveSignGroup() {
            let obj = {
                name: this.tagTitle,
                parentId: 0,
            }

            if(this.alertTitle == "添加标签") {
                obj= {
                    name: this.addTagText,
                    parentId: this.tagTitleId,
                }
            }

            if(this.alertTitle == '编辑分组名称') {
                this.editorObj.name = this.editorText
                obj = this.editorObj
            }

            if(this.alertTitle == '编辑标签') {
                this.editorObj.name = this.editorTagText
                obj = this.editorObj
            }

            SIGNTAGMANAGE.saveSignGroup(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.getSignTagBuildTree()
                    this.editorTagText = ''
                    this.editorText = ''
                }
            })
            .catch(errors.call(this))
            .finally(() => {})
        },

        signEditor() {
            let obj = {
                id:this.tagTitleId
            }

            SIGNTAGMANAGE.signEditor(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.editorObj = res.data.data
                    this.editorObjList = res.data.data
                    delete(this.editorObj.createDate)
                    delete(this.editorObj.updateDate)
                    this.getSignTagBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {})
        },

        deleteItem(obj) {
            this.deleteContent = obj.title
            this.deleteTittle = "删除分类"
            this.tagId = obj.id
            this.modal2 = true
        },

        deleteGroup(obj) {
            this.deleteTittle = "删除分组"
            this.deleteContent = obj.title
            this.tagId = obj.id
            this.modal2 = true
        },

         deleteOk() {
            this.deletesignTag()
        },

        deletesignTag(id) {
            let obj = {
                id:this.tagId
            }

            SIGNTAGMANAGE.deletesignTag(obj).then(valid.call(this))
            .then(res => {
                if(res.ok) {
                    this.$Message.info(res.data.message)
                    this.getSignTagBuildTree()
                }
            })
            .catch(errors.call(this))
            .finally(() => {})
        },
       
      

	}
};
</script>

