<style lang="less">
    @borderColor: #73cdc9;
    .core-org-usergrade {
        min-height: 500px;
        .page-box{
            height: ~"calc(100vh - 60px)";
            overflow: auto;
            width: 100%;
        }
        .headbar {
            padding-left: 10px;
            height: 55px;
            line-height: 55px;
            border-bottom: 1px solid #e0e0e0;
            .ivu-icon-chevron-right {
                margin: 0 7px;
            }
            .t1 {
                display: inline-block;
            }
            .t2 {
                display: inline-block;
                color: @borderColor;
            }
            .set{
                float: right;
                margin-right: 20px;
            }
        }
        .search {
            margin: 10px 0;
        }
        .listMsg {
            .btnlist {
                border: 1px solid #e0e0e0;
                background: #fafafa;
                height: 40px;
                line-height: 40px;
                border-radius: 2px;
                position: relative;
                text-indent: 20px;
                .btnright{
                    position: absolute;
                    top: -1px;
                    right: 20px;
                }
                button {
                    height: 30px;
                    border-color: transparent;
                }
                .lineSide {
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    height: 40px;
                    width: 5px;
                    background: #43bbb6;
                    border-radius: 2px 0 0 2px;
                }
                .bt1 {
                    color: #e8352c;
                    border: 1px solid #e8352c;
                }
                .bt2 {
                    border: 1px solid #999999;
                }
                .bt3 {
                    background: #44bcb7;
                    color: #fff;
                }
                .bt4 {
                    border-color: @borderColor;
                    color: @borderColor;
                }
            }
        }
        .page {
            text-align: center;
            margin-top: 20px;
        }
    }
    .core-alter-user-grade{
        overflow: hidden;
        .title{
            font-size: 14px;
            line-height: 1;
            padding-bottom: 14px;
        }
        .grade-left {
            float: left;
            width: 330px;
            padding-left: 15px;
            .userListBox{
                border: 1px solid #e0e0e0;
                height: 345px;
                overflow: auto;
            }
        }
        .grade-right {
            float: right;
            width: 330px;
            padding-right: 15px;
            .treeListBox{
                border: 1px solid #e0e0e0;
                height: 345px;
                overflow: auto;
            }
        }
    }
</style>
<template>
    <div class="core-org-usergrade">
        <div class="headbar">
            <div class="t1" v-text="$route.meta.title"></div>
            <Icon type="chevron-right" v-if='currGrade.label'></Icon>
            <div class="t2" v-text="currGrade.label"></div>
            <div class="set" v-if="0"><i class="iconfont icon-shezhi"></i></div>
        </div>
        <div class="page-box">
            <div class="search">
                <Input icon="search" placeholder="请输入要搜索的老师名字" style="width: 396px" @on-click="onSearch" @on-enter="onSearch" v-model="search.text">
                </Input>
            </div>
            <div class="listMsg">
                <div class="btnlist">
                    <div class="lineSide"></div>
                    <span>部门人员</span>
                    <div class="btnright" v-if="grade_edit">
                        <Button type="ghost" class="bt3" @click="showAddUser">添加成员</Button>
                        <Button type="ghost" class="bt4" @click="showUpdateUser" v-show="tableSelectedItem.length">修改成员</Button>
                        <Button type="ghost" class="bt1" @click="showDelUser" v-show="tableSelectedItem.length">删除成员</Button>
                        <Button type="ghost" class="bt2" @click="showAlterUserGrade" v-show="tableSelectedItem.length">调整序列</Button>
                    </div>
                </div>
            </div>
            <Table :columns="roleUserListCol" :data="roleUserList.list" @on-selection-change="onTableItemSelect"></Table>
            <div class="page">
                <Page show-elevator show-total show-sizer :current="roleUserList.pageNo" :total="roleUserList.count" :page-size="pageConfig.pageSize" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" v-if="roleUserList.pageCount>1" ></Page>
            </div>
        </div>
        <!--添加成员页面 -->
        <user-manage v-if="grade_edit" ref="usermanage" :tableSelectedItem="tableSelectedItem" @update="needUpdate" @fresh="onPageChange"></user-manage>
        <!--调整序列-->
        <Modal v-if="grade_edit" title="调整序列" v-model="alterGrade.visable" width="730" height='520' class-name="vertical-center-modal">
            <div class="core-alter-user-grade">
                <div class="grade-left">
                    <p class="title">已选择人员</p>
                    <div class="userListBox">
                        <userlistitem ref="userlist" :user-list="tableSelectedItem"></userlistitem>
                    </div>
                </div>
                <div class="grade-right">
                    <p class="title">选择序列</p>
                    <div class="treeListBox">
                        <checkboxtree ref="checkboxtree" :data="gradeTreeData" :disableLevel="disableLevel"></checkboxtree>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="updateUserGradeClose">取消</Button>
                <Button type="primary" @click="updateUserGradeOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import valid, {errors,getUserList,updateUserRel,loadJobTree, dictDataId} from '../libs/request';
    import {mapMutations,mapGetters} from 'vuex';
    import userlistitem from "../modules/userListItems.vue";
    import checkboxtree from "../modules/tree/checkboxTree.vue";
    import userManage from '../modules/userManage';

    export default {
        data() {
            return {
                currGrade:{
                },
                roleUserList:[],
                roleUserListCol: [
                    {
                        type: 'selection',
                        width: 58,
                        align: 'center'
                    },
                    {
                        title: "姓名",
                        key: "name",
                        width:160
                    },
                    {
                        title: "职级",
                        key: "levelName"
                    }, {
                        title: "用户名",
                        key: "loginName",
                        width:180
                    }, {
                        title: "手机号码",
                        key: "mobile",
                        width:120
                    }, {
                        title: "邮箱",
                        key: "email"
                    }
                ],
                search:{
                    text:'',
                    page:0
                },
                pageConfig:{
                    pageSize:10,
                },
                tableSelectedItem:[],
                alterGrade:{
                    visable: false
                },
                gradeTreeData:[],
                disableLevel:[0]
            };
        },
        components:{
            userlistitem,
            checkboxtree,
            userManage
        },
        computed:{
            ...mapGetters('core',['grade_edit']),
        },
        created() {
            this.initPage();
        },
        methods: {
            ...mapMutations(['updateLoadingStatus']),
            showAddUser() {
                this.$refs.usermanage.showAdd();
            },
            showUpdateUser(){
                this.$refs.usermanage.showUpdate();
            },
            showDelUser(){
                this.$refs.usermanage.showDel();
            },
            needUpdate(type,payload){
                this.$emit('update',type,payload);
            },
            onPageChange (page) {
                this.search.page = page || 1;
                this.getGradeUserList(this.currGrade.id);
            },
            onPageSizeChange(pageSize){
                this.pageConfig.pageSize = pageSize;
                this.getGradeUserList(this.currGrade.id);
            },
            onSearch() {
                this.search.page = 0;
                this.getGradeUserList(this.currGrade.id);
            },
            updateUserGradeClose(){
                this.alterGrade.visable = false;
            },
            updateUserGradeOk(){
                this.updateLoadingStatus({isLoading: true});
                let userList = this.$refs.userlist.getCurrList();
                userList = userList.map(item=>{
                    return {id:item.id}
                });
                let levelList = this.$refs.checkboxtree.getCurrentSelected();
                let level = levelList.join('');
                let param = {
                    userList:JSON.stringify(userList),
                    level:level
                };
                updateUserRel(param).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.updateUserGradeClose();
                        this.$emit('update','org',{ref:'grade'});
                        this.getGradeUserList(this.currGrade.id);
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading: false});
                });
            },
            showAlterUserGrade(){
                this.tryGetGradeList();
                this.$refs.userlist.reset();
                this.$refs.checkboxtree.reset();
                this.alterGrade.visable = true;
            },
            onTableItemSelect(sels) {
                this.tableSelectedItem = sels;
            },
            tryGetGradeList(){ //  添加成员 职能等级的下拉数据
                if(!this.gradeTreeData.length){
                    loadJobTree().then(valid.call(this)).then(res => {
                        if (res.ok) {
                            this.gradeTreeData = res.data.data.children;
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            },
            getCurrentGradeData(id){ // 当前页面选中职级信息。
                this.updateLoadingStatus({isLoading: true});
                dictDataId(id).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.currGrade = res.data.data;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading: false});
                });
            },
            getGradeUserList(id){
                let param = {
                    pageSize:this.pageConfig.pageSize
                };
                if(this.search.text){
                    param.name = this.search.text;
                } else {
                    param.level = id;
                }
                if(this.search.page){
                    param.pageNo = this.search.page;
                }
                this.tableLoading = true;
                getUserList(param).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.roleUserList = res.data.data;
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.tableLoading = false;
                });
            },
            initPage() {
                let id = this.$route.query.zid;
                if(!id){
                    return;
                }
                this.currGrade.id = id;
                this.getCurrentGradeData(id);
                this.getGradeUserList(id);
            }
        },
        watch: {
            '$route.query.zid'() {
                this.search.text = '';
                this.search.page = 0;
                this.tableSelectedItem=[];
                this.initPage();
            }
        },
        
    }
</script>


