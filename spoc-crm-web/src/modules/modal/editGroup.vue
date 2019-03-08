<style lang="less">
.model-component{
    .group-lists-box{
        @h:32px;
        float: left;width: 306px;height: @h;line-height: @h;position: relative;
        .ivu-input-wrapper{
            position: absolute;left: 0;top: 0;z-index: 2;
        }
    }
    .groupbtn{
        line-height: 32px;
    }
    .ivu-btn{
        font-size: 14px;
    }
}
</style>
    
<template>
    <div>
        <Modal v-model="editGroup" title="编辑分组" @on-ok="cancelEdit" width='550'
            ok-text="保存"
            @on-cancel="cancelEdit" class="model-component">
            <ul>
                <li v-for="item in groupLists" :key="item.id" class="clearfix">
                    <div class="group-lists-box">
                        <span>{{ item.name }}</span>
                        <Input v-model="item.name" style="width: 300px" v-show="item.edit"/>
                    </div>
                    <a href="javascript:;" class="groupbtn" v-if="item.isSys != '1'" @click="editGroupItem(item)">[ {{ item.edit ? '保存' : '编辑' }} ]</a>
                    <a href="javascript:;" class="groupbtn" v-if="item.isSys != '1'" v-show="isEdit" @click="delGroup(item.id)">[ 删除 ]</a>
                </li>
                <li v-if="newGroupModal" class="clearfix" style="margin:4px 0;">
                    <div class="group-lists-box">
                        <Input v-model="newGroupName" style="width: 300px"/>
                    </div>
                    <a href="javascript:;" class="groupbtn" @click="addGroup()">[ 保存 ]</a>
                </li>
            </ul>
            <a href="javascript:;" @click="showAddInput()">+ 客户分组</a>
        </Modal>

        <Modal v-model="moveGroup" title="移动" @on-ok="moveGroupFun" width='550'
            :loading="loading"
            @on-cancel="moveGroupCancel" class="model-component">
            <RadioGroup v-model="moveId">
                <Radio v-for="item in groupLists" v-if="item.id != '5004'" :key="item.id" :label="item.id">{{ item.name }}</Radio>
            </RadioGroup>
        </Modal>
    </div>
</template>

<script>

import valid, {errors, crmNotification, common} from '../../libs/request.js';

export default {
    props:{
        parentId:{
            type:String,
            default:'5001'
        },
        type:{
            type:String,
            default:'crm_customer_group'
        }
    },
    data(){
        return {
            editGroup: false,
            groupLists: [],
            isEdit: true,
            newGroupModal: false,
            newGroupName: '',
            oldName: '',
            checkedLists: [],
            moveGroup: false,
            moveId: '',
            loading: true,
            //type: 'crm_customer_group'
        };
    },
    methods: {
        showEditGroup(lists) {
            // 显示编辑分组弹窗
            this.groupLists = lists;
            this.editGroup = true;
        },
        cancelEdit() {
            this.newGroupModal = false;
            this.groupLists.forEach(item => {
                if(item.edit) {
                    item.edit = false;
                }
            });
        },
        editGroupItem(item) {
            // 编辑或者保存
            // edit: 编辑状态true，保存状态false
            if(item.edit) {
                // 执行保存
                console.log(item.name.length)
                if(item.name && item.name.length > 0 && item.name.length < 13) {
                    item.edit = false;
                    if(this.oldName != item.name) {
                        let params = {
                            id: item.id,
                            parent: {
                                id: this.parentId
                            },
                            name: item.name,
                            menuIds: '501,',
                            isGroup: '0',
                            level: '2',
                            isSys: '0',
                        }
                        common.saveUserComTag(params).then(valid.call(this)).then(res => {
                            if(res.ok) {
                                this.$Message.success('修改成功');
                            }
                        }).catch(errors.call(this));
                    }
                }else{
                    this.$Message.error('分组名称不正确');
                }
            }else{
                // 显示输入框
                // console.log('编辑')
                this.oldName = item.name;
                item.edit = true;
            }
            this.$forceUpdate()
        },
        delGroup(id) {
            // 删除分组
            let params = {
                id: id,
                type: this.type
            }
            common.deleteUserComTag(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.$emit('getFzLists');
                    this.$Message.success('删除成功');
                }
            }).catch(errors.call(this));
        },
        addGroup() {
            // 添加分组
            // console.log(this.newGroupName);
            // console.log(this.groupLists);

            let _this = this;
            if(this.newGroupName && this.newGroupName.length > 0 && this.newGroupName.length < 13) {
                let data = this.groupLists.filter(function(item) {
                    return item.name === _this.newGroupName; 
                });
                // console.log(data.length)
                if(data.length > 0) {
                    // 
                    this.$Message.error('分组已经存在');
                }else{
                    let params = {
                        parent: {
                            id: this.parentId
                        },
                        name: this.newGroupName,
                        menuIds: '501,',
                        isGroup: '0',
                        level: '2',
                        isSys: '0',
                    }
                    common.saveUserComTag(params).then(valid.call(this)).then(res => {
                        if(res.ok) {
                            this.newGroupName = '';
                            this.$emit('getFzLists');
                            this.$Message.success('添加成功');
                        }
                    }).catch(errors.call(this));
                }
            }else{
                this.$Message.error('请输入正确的分组名称');
            }
        },
        showAddInput() {
            // 显示添加输入框
            this.newGroupModal = true;
        },
        showMoveGroup(lists, checkedLists) {
            this.groupLists = lists;
            this.checkedLists = checkedLists;
            this.moveGroup = true;
        },
        getFzLists() {
            // 获取分组列表
            let params = {
                parentId: this.parentId
            }
            common.getUserTagList(params).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.fzlists = res.data.data;
                    this.$refs.modal.uploadLitst(this.fzlists);
                }
            }).catch(errors.call(this));
        },
        uploadLitst(lists) {
            // 更新lists
            // console.log(lists)
            this.groupLists = lists;
        },
        moveGroupFun() {
            // 移动分组
            if(this.moveId) {
                let params = [];
                for (let i = 0; i < this.checkedLists.length; i++) {
                    if(this.checkedLists[i].cusId) {
                        let item = {
                            tagId: this.moveId,
                            itemId: this.checkedLists[i].cusId,
                            type: this.type
                        }
                        params.push(item);
                    }
                }
                // console.log(params)
                common.saveUserComTagRel(params).then(valid.call(this)).then(res => {
                    if(res.ok) {
                        this.moveId = '';
                        this.$Message.success('移动分组成功');
                        this.moveGroup = false;
                        this.$emit('onRefresh');
                    }
                }).catch(errors.call(this));
            }else{
                this.$Message.error('请选择分组');
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 0);
            }
        },
        moveGroupCancel() {
            // 取消移动分组
            this.moveId = '';
        },
    },
}
</script>


