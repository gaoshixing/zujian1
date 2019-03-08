<style lang="less">

</style>
<template>
  <div>
       <stree :data="orgData" :curr="curr" :menu="org_edit" @item-click="itemClick" @menu-click="menuClick" :hideStaffNums="hideStaffNums"></stree>
       <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="org_edit">
            <ul>
                <li @click.stop="modify">修改</li>
                <li @click.stop="delfac">删除</li>
                <li @click.stop="addsub">添加下级机构</li>
            </ul>
        </div>
        <Modal v-if="org_edit" v-model="addFacSubItem.show" :title="addFacSubItem.add?addFacSubItem.addtitle:addFacSubItem.edittitle">
            <div>
                <i-form ref="addsubfac" :model="addFacSubItem" :rules="addFacSubItem.ruleValidate" :label-width="72">
                <form-item label="名称" prop="name">
                    <i-input v-model="addFacSubItem.name" placeholder="请输入机构名称"></i-input>
                </form-item>
                <form-item label="上级机构" prop="parent">
                    <!-- <i-input v-model="state.item.parentTitle" disabled></i-input> -->
                    <i-input v-model="state.item.title" disabled></i-input>
                </form-item>
                <form-item label="类型" prop="type">
                    <Select v-model="addFacSubItem.type">
                        <Option v-for="item in sysOfficeType" :value="item.value" :key="item.id">{{item.label}}</Option>
                    </Select>
                </form-item>
                <form-item label="描述" prop="remarks" class="last-child">
                    <i-input v-model="addFacSubItem.remarks" type="textarea" placeholder="描述内容" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addSubFacClose">取消</Button>
                <Button type="primary" @click="addSubfacOk">确定</Button>
            </div>
        </Modal>
        <Modal v-if="org_edit" v-model="addFacItem.show" :title="addFacItem.title">
            <div>
                <i-form :model="addFacItem" ref="addfacitem" :rules="addFacItem.ruleValidate" :label-width="72">
                <form-item label="名称" prop="name">
                    <i-input v-model="addFacItem.name" placeholder="请输入机构名称"></i-input>
                </form-item>
                <form-item label="上级机构" prop="parent">
                    <Select v-model="addFacItem.parent" filterable>
                        <Option v-for="item in allOffice" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </form-item>
                <form-item label="类型" prop="type">
                    <Select v-model="addFacItem.type">
                        <Option v-for="item in sysOfficeType" :value="item.id" :key="item.id">{{item.label}}</Option>
                    </Select>
                </form-item>
                <form-item label="描述" prop="remarks" class="last-child">
                    <i-input v-model="addFacItem.remarks" type="textarea" placeholder="描述内容" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addFacItemClose">取消</Button>
                <Button type="primary" @click="addFacOk">确定</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import stree from '@public/modules/tree/tree';
import valid,{ errors,getOfficeTree,delFac,getFacInfo,saveOffice,dictData,getOfficeList } from '../libs/request';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            state:{
                item:{}
            },
            sysOfficeType:[],
            allOffice:[],
            orgData:[],
            menu:{
                top:'0px',
                show:false,
            },
            addFacSubItem:{
                show:false,
                add:true,
                addtitle:'添加下级机构',
                edittitle:"修改机构",
                name:'',
                type:0,
                remarks:'',
                parent:1, // fake only for valid
                ruleValidate:{
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,40}$)|(^[\w\s\-\u4e00-\u9fa5]{1,60}$)$/,message:'最大20个汉字或40个字母，不能有特殊字符',trigger:'blur'}
                        
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    remarks: [
                        { required: false , type:'string', max:200, message:'描述最大20个字符', trigger: 'blur' }
                    ],
                    parent: [
                        { required: true }
                    ],
                }
            },
            addFacItem:{
                loading:true,
                show:false,
                title:'添加机构',
                name:'',
                remarks:'',
                type:undefined,
                parent:undefined,
                ruleValidate:{
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,40}$)|(^[\w\s\-\u4e00-\u9fa5]{1,20}$)$/,message:'最大20个汉字或40个字母，不能有特殊字符',trigger:'blur'}
                    ],
                    parent: [
                        { required: true, message: '请选择上级机构', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'change' }
                    ],
                    remarks: [
                        { required: false , type:'string', max:100, message:'描述最大100个字符', trigger: 'blur' }
                    ],
                }
            },
            org_edit: true,
            curr: {},
        };
    },
    props:{
        isIncumbency: {
            type: String,
            required: false,
        },
        hideStaffNums: {
            type: Boolean,
            default: true,
        },
    },
    components:{
        stree,
    },
    created(){
        this.loadTree(this.autoInitFocus);
    },
    deactivated(){
        this.hideMenu();
    },
    mounted(){
        document.addEventListener('click',this.hideMenu,false);
    },
    beforeDestroy(){
        document.removeEventListener('click',this.hideMenu);
    },
    computed:{
        // curr(){
        //     if(this.$route.query.id){
        //         return {id:this.$route.query.id};
        //     }
        //     return this.state.item;
        // }
    },
    methods:{
        setCurr(str) {
            if(str) {
                this.curr = {
                    id: str
                };
            }else{
                this.curr = {}
            }
        },
        update(payload){
            this.loadTree();
        },
        hideMenu(){
            this.menu.show = false;
        },
        reloadTree() {
            this.loadTree(this.autoInitFocus);
        },
        loadTree(callback) {
            let data;
            if(this.isIncumbency) {
                data = {
                    isIncumbency: this.isIncumbency
                }
            }
            getOfficeTree(data).then(valid.call(this)).then((res)=>{
                 if(res.ok){
                    this.$parent.setNum(res.data.message,0);
                    this.orgData = [];
                    if(Array.isArray(res.data.data.children)){
                        this.$nextTick(()=>{
                            this.orgData = res.data.data.children;
                            callback&&callback();
                        });
                    }
                 }
            }).catch(errors.call(this));
        },
        autoInitFocus(){
            if (this.orgData[0]){
                this.itemClick(this.orgData[0]); 
            }
        },
        addFacOk() {
            this.$refs['addfacitem'].validate((validok) => {
                if (validok) {
                    let info = {
                        name:this.addFacItem.name,
                        type:this.addFacItem.type,
                        remarks:this.addFacItem.remarks,
                        parent:this.addFacItem.parent
                    };
                    console.info(info);
                    saveOffice(info).then(valid.call(this)).then((res)=>{
                        this.addFacItemClose();
                        if(res.ok){
                            this.loadTree();
                        }
                    }).catch(errors.call(this))
                }
            });
        },
        delfacOk(id) {
            delFac(id).then(valid.call(this)).then((res)=>{
                if (res.ok){
                    this.$Message.success(res.data.message);
                    this.loadTree();
                }
            }).catch(errors.call(this))
        },
        addSubfacOk() {
            this.$refs['addsubfac'].validate((validok) => {
                if(validok) {
                    let info;
                    if(this.addFacSubItem.add){
                        info = {
                            parent:this.state.item.id,
                            type:this.addFacSubItem.type,
                            name:this.addFacSubItem.name,
                            remarks:this.addFacSubItem.remarks
                        }
                    }else{
                        info = {
                            name:this.addFacSubItem.name,
                            remarks:this.addFacSubItem.remarks,
                            type:this.addFacSubItem.type,
                            id:this.state.item.id
                        };
                    }
                    saveOffice(info).then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            this.addSubFacClose();
                            this.$Message.success(res.data.message);
                            this.loadTree();
                        }
                    }).catch(errors.call(this));
                }
            });
        },
        addSubFacClose(){
            this.addFacSubItem.show = false;
            this.$refs['addsubfac'].resetFields();
        },
        addsub() {
            this.$refs['addsubfac'].resetFields();
            this.tryGetOfficeType();
            this.menu.show = false;
            this.addFacSubItem.show = true;
            this.addFacSubItem.add = true;
        },
        delfac() {
            this.menu.show = false;
            if(this.state.item.num>0){
                return this.$Message.warning('不能删除非空机构');
            }
            this.$Modal.confirm({
                title: '删除机构',
                content: '您确定要删除所选内容吗？删除后将无法恢复',
                onOk: () => {
                    this.delfacOk(this.state.item.id)
                }
            });
        },
        modify() {
            this.menu.show = false;
        	this.tryGetOfficeType();
            getFacInfo(this.state.item.id).then(valid.call(this)).then((res)=>{
                this.addFacSubItem.add=false;
                this.addFacSubItem.show=true;
                if (res.ok){
                    this.addFacSubItem.name=res.data.data.name;
                    this.addFacSubItem.type=res.data.data.type;
                    this.addFacSubItem.remarks=res.data.data.remarks;
                }
            }).catch(errors.call(this));
        },
        itemClick(item) {
            this.hideMenu();
            this.setCurr(item.id);
            this.$emit('onItemClick', item, 'org');
        },
        menuClick(e,item) {
        	console.log(item)
            this.state.item=item;
            let top = e.pageY;
            if(document.body.offsetHeight - top < 120){
                top = top - 120;
            }
            this.menu= {
               top : `${top-90}px`,
               show:true
           };
        },
        showAddOrg() {
            this.$refs['addfacitem'].resetFields();
            this.addFacItem.show = true;
            this.tryGetOfficeType();
            getOfficeList().then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.allOffice=res.data.data.allCompany;
                }
            }).catch(errors.call(this));
        },
        addFacItemClose() {
            this.addFacItem.show = false;
            this.$refs['addfacitem'].resetFields();
        },
        tryGetOfficeType(){
            if(this.sysOfficeType.length>0){
                return;
            }
            dictData('sys_office_type').then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.sysOfficeType = res.data.data;
                }
            }).catch(errors.call(this));
        }

    }
}
</script>


