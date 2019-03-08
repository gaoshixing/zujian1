<style lang="less">
@green:#44bcb7;
@silver:#c4c7cc;
@black:#333;
@red: #f33;
.crm-user-tags{
    padding: 20px 15px;
    position: relative;
    .utag{
        font-size: 12px;
        display: inline-block;
        border-radius: 4px;
        padding: 2px 12px;
        border: 1px solid transparent;
        cursor: pointer;
        margin: 5px;
    }
    .save-btn{
        position: absolute;
        top: 30px;
        right: 15px;
    }
    .main-title{
        @h: 32px;
        height: @h + 6px;line-height: @h;margin-left: 5px;padding-top: 6px;
        font-size: 14px;color: #333;font-weight: inherit;
    }
    .g-title{
        color: @green;
        margin: 5px 0 5px 5px;
        font-weight: 500;
        cursor: pointer;
        .ivu-icon{
            font-size: 14px;
            color: #444;
        }
    }
    .tags-actived{
        &.notedit{
            .utag:hover {
                .ivu-icon{
                    display: none;
                }
            }
        }
        .utag{
            position: relative;
            background-color: @green;
            border-color: @green;
            color: #fff;
            &:hover {
                .ivu-icon{
                    display: block;
                }
            }
            .ivu-icon{
                @h: 14px;
                display: none;
                position: absolute;
                right: -@h/2;top: -@h/2;
                font-size: 14px;color: red;
                &:after{
                    content: "";
                    position: absolute;left: 1px;top: 1px;width: @h - 2px;height: @h - 2px;
                    border-radius: @h - 2px;background: #fff;
                }
                &::before{
                    position: relative;z-index: 2;
                }
            }
        }
    }
    .tags-groups{
        margin: 10px 0;
        &.notedit{
            .g-content{
                pointer-events: none;
            }
            .utag{
                cursor: not-allowed;background: #eee;
                &.active{
                    background-color: @green;
                }
            }
        }
        .g-content{
            &.disabled{
                pointer-events: none;
            }
        }
        .tag-group{
            margin: 10px 0;
	        &.notedit_tag{
	            .g-content{
	                pointer-events: none;
	            }
	            .utag{
	                cursor: not-allowed;background: #eee;
	                &.active{
	                    background-color: @green;
	                }
	            }
	        }
        }
        .utag{
            color: @black;
            border-color: @silver;
            &.active{
                background-color: @green;
                border-color: @green;
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div class="crm-user-tags">
        <h4 class="main-title">客户标签</h4>
        <Button class="save-btn" size="small" type="primary" v-if="showsave" @click="$emit('do-save')">保存</Button>
        <div class="tags-actived" :class="{notedit:!changeFlag}">
            <ul>
                <li class="utag" v-for="(item, index) in tagArr" :key="'a'+index">
                    <span v-text="item.title"></span>
                    <Icon type="close-circled" @click="delItem(item)" />
                </li>
            </ul>
        </div>
        <div class="tags-groups" :class="{notedit:formSel}">
            <div class="tag-group" v-for="(item,i) in treeLists" :key="'group'+i" v-if="item.id=='8007'">
                <p class="g-title" @click="toggle(item)">
                    <span v-text="item.title"></span> 
                    <Icon :type="item.expand?'ios-arrow-up':'ios-arrow-down'"></Icon>
                </p>
                <ul class="g-content" v-show="item.expand" :class="{disabled:disabledMap[item.id]===false}">
                    <li class="utag" v-for="(it,j) in item.children" 
                        v-text="it.title" :key="'gi'+i+j"
                        @click="selectItem(it, item)"
                        :class="{'active': it.checked }">
                    </li>
                </ul>
            </div>
        </div>
        <div class="tags-groups">
            <div class="tag-group" v-for="(item,i) in treeLists" :key="'group'+i" v-if="item.id!='8007'" :class="{notedit_tag:item.title=='集团渠道资源'?formSel:item.id!='8001'?!changeFlag:(!changeFlag&&infoStatus!='init')}">
                <p class="g-title" @click="toggle(item)">
                    <span v-text="item.title"></span> 
                    <Icon :type="item.expand?'ios-arrow-up':'ios-arrow-down'"></Icon>
                </p>
                <ul class="g-content" v-show="item.expand" :class="{disabled:disabledMap[item.id]===false}">
                    <li class="utag" v-for="(it,j) in item.children" 
                        v-text="it.title" :key="'gi'+i+j"
                        @click="selectItem(it, item)"
                        :class="{'active': it.checked }">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import valid, {errors, comTag, sys} from '../libs/request.js';

export default {
    props: {
        actived: {
            type: Array,
            default: () => {
                return []
            }
        },
        changeFlag: { // 是否可编辑，默认true，可编辑
            type: Boolean,
            default: true
        },
        disabledMap:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        showsave:{
            type:Boolean,
            default:false,
        },
        formSel:{
            type:Boolean,
            default:false,
        },
        infoStatus:{
            type:String,
            default:'',
        },
        
    },
    data(){
        return {
            moreCheckList: [], //已选中ID集合 [1,2,333]
            tagArr: [], //已选中的标签名称集合 
            sourTags: '', //客户来源
            treeLists: [],
        };
    },
    mounted(){
        this.getTree();
    },
    methods:{
        changeActive(list) {
            this.emitCheck(this.treeLists, list);
        },
        toggle(item){
            item.expand = !item.expand;
        },
        getTree() {
            let data = {
                menuId: 801,
                flag: 0
            }
            comTag.buildTree(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.treeLists = res.data.data.children;
                    this.emitCheck(this.treeLists);
                }
            }).catch(errors.call(this));
        },
        emitCheck(temp, list) {
            // 初始化选择
            let activeLists = [];
            if(list && list.length > 0) {
                activeLists = list;
            }else if(this.actived && this.actived.length > 0) {
                activeLists = this.actived;
            }
            temp.forEach(item => {
                item.children.forEach(child => {
                    for(let i = 0; i < activeLists.length; i++) {
                        if(activeLists[i] == child.id) {
                            child.checked = true;
                            this.moreCheckList.push(child.id);
                            this.tagArr.push(child);
                            if(item.id == '8007') {
                                // 设置客户来源标签
                                this.$emit('setSourTags', child.id);
                                this.sourTags = child.id;
                            }
                        }
                    }
                });
            });
        },
        selectItem(item, parentItem) {
            //点击选择或取消选择一个标签
            if(this.changeFlag) {
                item.checked = !item.checked;
                let index = this.moreCheckList.indexOf(item.id);
                console.log(index)
                if(index == -1) {
                    if(parentItem.isMultiselect == 0) { //单选
                        parentItem.children.forEach(e => {
                            if(e.id != item.id) {
                                e.checked = false;
                            }
                            let childIndex = this.moreCheckList.indexOf(e.id);
                            if(childIndex != -1) {
                                this.moreCheckList.splice(childIndex, 1);
                                this.tagArr.splice(childIndex, 1);
                            }
                        });
                    }
                    this.moreCheckList.push(item.id);
                    this.tagArr.push(item);
                    if(parentItem.id == '8007') {
                        // 客户来源
                        this.sourTags = item.id;
                    }
                } else {
                    this.moreCheckList.splice(index, 1);
                    this.tagArr.splice(index, 1);
                    if(parentItem.id == '8007') {
                        // 客户来源
                        this.sourTags = '';
                    }
                }
                this.$emit('ok', this.moreCheckList, this.sourTags);
            }else{
                this.$Message.error('不可修改标签');
            }
        },
        delItem(item) {
            // 单击删除
            if(item.id == this.sourTags) {
                if(this.formSel) {
                    this.$Message.error('客户来源标签不可修改');
                }else{
                    this.sourTags = '';
                    this.submitDelItem(item);
                }
                
            }else{
                this.submitDelItem(item);
            }
        },
        submitDelItem(item) {
            item.checked = !item.checked;
            let index = this.moreCheckList.indexOf(item.id);
            this.moreCheckList.splice(index, 1);
            this.tagArr.splice(index, 1);
            this.$emit('ok', this.moreCheckList, this.sourTags);
        },
        empty() {
            // 清空 重置
            this.treeLists.forEach(parentItem => {
                parentItem.children.forEach(item => {
                    item.checked = false;
                });
            });
            this.moreCheckList = [];
            this.tagArr = [];
            this.sourTags = '';
        }
    },
}
</script>


