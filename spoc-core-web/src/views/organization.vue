<style lang="less">
    //边框的颜色
    @borderColor: #73cdc9;spoc-library-web
    .vertical-center-modal{
        .alterMain{
            overflow: hidden;
            .title{
                font-size: 14px;
                line-height: 1;
                padding-bottom: 14px;
            }
        }
        .setLeft {
            float: left;
            width: 330px;
            padding-left: 15px;
            .userListBox{
                border: 1px solid #e0e0e0;
                height: 345px;
                overflow: auto;
            }
        }
        .setRight {
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
    .core-organization {
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
                position: relative;
                background: #fafafa;
                height: 40px;
                line-height: 40px;
                border-radius: 2px;
                text-indent: 20px;
                .btnright{
                    position: absolute;
                    right: 20px;
                    top: -1px;
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
</style>

<template>
    <div class="core-organization">
        <div class="headbar">
            <div class="t1" v-text="$route.meta.title"></div>
            <Icon type="chevron-right" v-if='currFac.name'></Icon>
            <div class="t2" v-text="currFac.name"></div>
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
                    <div class="btnright" v-if="org_edit">
                        <Button type="ghost" class="bt3" @click="showAddUser">添加成员</Button>
                        <Button type="ghost" class="bt4" @click="showUpdateUser" v-show="tableSelectedItem.length">修改成员</Button>
                        <Button type="ghost" class="bt1" @click="showDelUser" v-show="tableSelectedItem.length">删除成员</Button>
                        <!--<Button type="ghost" class="bt2" @click="showUpdateUserFac" v-show="tableSelectedItem.length">调整部门</Button>-->
                    </div>
                </div>
                <Table :columns="usercolumn" :data="facUserList.list" @on-selection-change="onTableItemSelect"></Table>
            </div>
            <div class="page">
                <Page show-elevator show-total show-sizer :current="facUserList.pageNo" :total="facUserList.count" :page-size="pageConfig.pageSize" @on-page-size-change="onPageSizeChange" @on-change="onPageChange" v-if="facUserList.pageCount>1"></Page>
            </div>
        </div>
        <!--添加成员页面 -->
        <user-manage v-if="org_edit" ref="usermanage" :tableSelectedItem="tableSelectedItem" @update="needUpdate" @fresh="onPageChange"></user-manage>
        <!--调整序列对话框-->
        <Modal v-if="org_edit" title="调整部门" v-model="alterFac.visible" class-name="vertical-center-modal" width="730px">
            <div class="alterMain">
                <div class="setLeft">
                    <p class="title">已选择人员</p>
                    <div class="userListBox">
                        <userlistitem ref="userlist" :user-list="tableSelectedItem"></userlistitem>
                    </div>
                </div>
                <div class="setRight">
                    <p class="title">选择部门</p>
                    <div class="treeListBox">
                        <checkboxtree ref="checkboxtree" :data="facTreeData"></checkboxtree>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="updateUserFacClose">取消</Button>
                <Button type="primary" @click="updateUserFacOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import valid, {
        errors,
        updateUserRel,
        getOfficeTree,
        removeUser,
        getUserList,
        saveUser,
        getOfficeList,
        getFacInfo,
    } from '../libs/request';
    import userlistitem from "../modules/userListItems.vue";
    import checkboxtree from "../modules/tree/checkboxTree.vue";
    import userManage from '../modules/userManage';
    import {extendKey} from '../libs/util.js';
    import {mapMutations,mapGetters} from 'vuex';

    export default {
        data() {
            return {
                currFac:{},
                facUserList: [],
                usercolumn: [
                    {
                        type: 'selection',
                        width: 58,
                        align: 'center'
                    },
                    {
                        title: "姓名",
                        key: "name",
                        width:130
                    },
                    {
                        title: "公司名称",
                        key: "companyName"
                    },
                    {
                        title: "部门名称",
                        key: "officeName"
                    }, 
                    {
                        title: "用户名",
                        key: "loginName",
                        width:140
                    }, 
                    {
                        title: "手机号码",
                        key: "mobile",
                        width: 120
                    }, 
                    {
                        title: "邮箱",
                        key: "email"
                    }
                ],
                search:{
                    text:'',
                    page:0,
                },
                pageConfig:{
                    pageSize:10,
                },
                tableSelectedItem:[],
                facTreeData:[], // 调整部门的机构数据
                alterFac:{ // 调整部门
                    visible:false
                },
            }
        },
        computed:{
            ...mapGetters('core',['org_edit']),
        },
        components:{
            userlistitem,
            checkboxtree,
            userManage
        },
        created() {
            this.initPage();
        },
        mounted() {
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
            onTableItemSelect(sels){
                this.tableSelectedItem = sels;
            },
            showUpdateUserFac(){
                this.tryGetFacTree();
                this.$refs.userlist.reset();
                this.$refs.checkboxtree.reset();
                this.alterFac.visible = true;
            },
            updateUserFacOk(){
                this.updateLoadingStatus({isLoading: true});
                let userList = this.$refs.userlist.getCurrList();
                userList = userList.map(item=>{
                    return {id:item.id}
                });
                let officeList = this.$refs.checkboxtree.getCurrentSelected();
                let officeId = officeList.join('');
                let param = {
                    userList:JSON.stringify(userList),
                    officeId:officeId
                };
                updateUserRel(param).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.updateUserFacClose();
                        this.$emit('update','org',{ref:'org'});
                        this.getFacUserList(this.currFac.id);
                    }
                }).catch(errors.call(this)).finally(()=>{
                    this.updateLoadingStatus({isLoading: false});
                });
            },
            updateUserFacClose(){
                this.alterFac.visible = false;
            },
            //分页
            onPageChange(page) {
                this.search.page = page || 1;
                this.getFacUserList(this.currFac.id);
            },
            onPageSizeChange(pageSize){
                this.pageConfig.pageSize = pageSize;
                this.getFacUserList(this.currFac.id);
            },
            onSearch() {
                this.search.page = 0;
                this.getFacUserList(this.currFac.id);
            },
            tryGetFacTree(){
                if(!this.facTreeData.length){
                    this.updateLoadingStatus({isLoading: true});
                    getOfficeTree().then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            if(Array.isArray(res.data.data.children)){
                                this.facTreeData = res.data.data.children;
                            }
                        }
                    }).catch(errors.call(this)).finally(()=>{
                        this.updateLoadingStatus({isLoading:false});
                    });
                }
            },
            // 当前机构信息。显示副标题
            getCurrentFac(id){
                this.updateLoadingStatus({isLoading: true});
                getFacInfo(id).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.currFac = res.data.data;
                    }
                }).catch(errors.call(this)).finally( ()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            getFacUserList(id) {
                let param = {
                    pageSize:this.pageConfig.pageSize
                };
                if(this.search.text){
                    param.name=this.search.text;
                } else {
                    param['office.id'] = id;
                }
                if(this.search.page){
                    param.pageNo = this.search.page;
                }
                this.updateLoadingStatus({isLoading:true});
                getUserList(param).then(valid.call(this)).then(res => {
                    if (res.ok) {
                        this.facUserList = res.data.data;
                    }
                }).catch(errors.call(this)).finally( ()=>{
                    this.updateLoadingStatus({isLoading:false});
                });
            },
            initPage(){
                let id = this.$route.query.id;
                if(!id) return;
                this.currFac.id = id;
                this.getCurrentFac(id);
                this.getFacUserList(id);
            }
        },
        watch: {
            '$route.query.id'() {
                this.search.text = '';
                this.search.page = 0;
                this.tableSelectedItem=[];
                this.initPage();
            }
        }
    }
</script>