<style lang="less">

</style>
<template>
  <div>
       <stree :data="jobTree" :curr="curr" :menu="grade_edit" @item-click="itemClick" @menu-click="menuClick"></stree>
       <div class="popmenu" :style="{top:menu.top}" v-show="menu.show" v-if="grade_edit">
            <ul>
                <li @click.stop="modify">修改</li>
                <li @click.stop="del">删除</li>
                <li @click.stop="addser">添加序列级别</li>
            </ul>
        </div>
        <Modal v-if="grade_edit" v-model="addSerItem.show" :title="addSerItem.add?addSerItem.addtitle:addSerItem.edittitle">
            <div>
                <i-form ref="addser" :model="addSerItem" :rules="addSerItem.ruleValidate" :label-width="48">
                <form-item label="名称" prop="name">
                    <i-input v-model="addSerItem.name" placeholder="请输入序列名称"></i-input>
                </form-item>
                <form-item label="描述" prop="remarks" class="last-child">
                    <i-input v-model="addSerItem.remarks" type="textarea" placeholder="描述内容" :rows="2" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addSerClose">取消</Button>
                <Button type="primary" @click="addSerOk">确定</Button>
            </div>
        </Modal>
        <Modal v-if="grade_edit" v-model="addSerNoItem.show" :title="addSerNoItem.add?addSerNoItem.addtitle:addSerNoItem.edittitle">
            <div>
                <i-form ref="addserno" :model="addSerNoItem" :rules="addSerNoItem.ruleValidate" :label-width="68">
                <form-item label="名称" prop="name">
                    <i-input v-model="addSerNoItem.name" placeholder="请输入序列名称"></i-input>
                </form-item>
                <form-item label="所属序列">
                    <i-input v-model="addSerNoItem.parentName" disabled></i-input>
                </form-item>
                <form-item label="描述" prop="remarks" class="last-child">
                    <i-input v-model="addSerNoItem.remarks" type="textarea" placeholder="描述内容" :rows="4" ></i-input>
                </form-item>
                </i-form>
            </div>
            <div slot="footer">
                <Button @click="addSerNoClose">取消</Button>
                <Button type="primary" @click="addSerNoOk">确定</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import stree from '@public/modules/tree/tree';
import valid,{ errors,loadJobTree,dictDataSave,dictDataDel,dictDataId } from '../libs/request';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            state:{
                item:{}
            },
            menu:{
                top:'0px',
                show:false,
            },
            addSerItem:{
                show:false,
                add:true,
                addtitle:"添加序列",
                edittitle:"修改序列",
                name:'',
                remarks:'',
                ruleValidate:{
                    name: [
                        { required: true, message: '序列名称不能为空', trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,message:'最大10个汉字或20个字母，不能有特殊字符',trigger:'blur'}
                    ],
                    remarks: [
                        { required: false, type:'string', max:100, message:'描述最大100个字符', trigger: 'blur' }
                    ],
                }
            },
            addSerNoItem:{
                show:false,
                add:true,
                addtitle:"添加序列级别",
                edittitle:"修改序列级别",
                name:'',
                remarks:'',
                parentName:'',
                parentId:0,
                ruleValidate:{
                    name: [
                        { required: true, message: '序列名称不能为空', trigger: 'blur' },
                        { required: true, pattern: /^(^[\w\-]{1,20}$)|(^[\w\-\u4e00-\u9fa5]{1,10}$)$/,message:'最大10个汉字或20个字母，不能有特殊字符',trigger:'blur'}
                    ],
                    remarks: [
                        { required: false, type:'string', max:100, message:'描述最大100个字符', trigger: 'blur' }
                    ],
                }
            },
            jobTree:[]
        };
    },
    computed:{
        ...mapGetters('core',['grade_edit']),
        curr(){
            if(this.$route.query.zid){
                return {id:this.$route.query.zid};
            }
            return this.state.item;
        },
    },
    components:{
        stree
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
    methods:{
        update(payload){
            this.loadTree();
        },
        hideMenu(){
            this.menu.show = false;
        },
        loadTree(callback) {
            loadJobTree().then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.$parent.setNum(res.data.message,2);
                    this.jobTree = res.data.data.children;
                    callback&&callback();
                }
            }).catch(errors.call(this));
        },
        autoInitFocus(){
            if (!this.$route.query.zid && this.jobTree[0]){
                this.itemClick(this.jobTree[0]); 
            }
        },
        showAddGrade() {
            this.$refs['addser'].resetFields();
            this.addSerItem.show = true;
            this.addSerItem.add = true;
        },
        itemClick(item) {
            this.hideMenu();
            this.$router.push({name:'core.grade',query:Object.assign({},this.$route.query,{zid:item.id})});
        },
        menuClick(e,item) {
            this.state.item=item;
            let top = e.pageY;
            if(document.body.offsetHeight - top < 120){
                top = top - 120;
            }
            this.menu= {
               top : `${top+15}px`,
               show:true
           };
        },
        modify() {
            this.menu.show = false;
            let parent = this.findParent(this.state.item);
            if(parent.id == this.state.item.id) {
                this.addSerItem.add = false;
                this.addSerItem.show = true;
                dictDataId(this.state.item.id).then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        this.addSerItem.name = res.data.data.label;
                        this.addSerItem.remarks = res.data.data.description;
                    }
                }).catch(errors.call(this));
            } else {
                this.addSerNoItem.show = true;
                this.addSerNoItem.add = false;
                this.addSerNoItem.parentId = parent.id;
                this.addSerNoItem.parentName = parent.title;
                dictDataId(this.state.item.id).then(valid.call(this)).then((res)=>{
                    if(res.ok){
                        this.addSerNoItem.name = res.data.data.label;
                        this.addSerNoItem.remarks = res.data.data.description;
                    }
                }).catch(errors.call(this));

            }
        },
        addser() {
            this.menu.show = false;
            this.addSerNoItem.show = true;
            this.addSerNoItem.add = true;
            let parent = this.findParent(this.state.item);
            if(parent){
                this.addSerNoItem.parentId = parent.id;
                this.addSerNoItem.parentName = parent.title;
            }
        },
        del() {
            this.menu.show = false;
            if(this.state.item.num>0){
                return this.$Message.warning('不能删除非空序列');
            }
            this.$Modal.confirm({
                title: '删除序列',
                content: '您确定要删除所选内容吗？删除后将无法恢复',
                onOk: () => {
                    this.doDel(this.state.item.id)
                }
            });
        },
        addSerOk() {
            this.$refs['addser'].validate((validok) => {
                if(validok){
                    let info = {
                        label:this.addSerItem.name,
                        description:this.addSerItem.remarks,
                        parentId:0,
                        type:'sys_user_competence_level',
                        value:0,
                    };
                    if(!this.addSerItem.add) { // update
                        info.id = this.state.item.id;
                    }
                    dictDataSave(info).then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            this.addSerClose();
                            this.loadTree();
                        }
                    }).catch(errors.call(this));
                }
            });
        },
        addSerClose(){
            this.$refs['addser'].resetFields();
            this.addSerItem.show = false;
        },
        doDel(id) {
            dictDataDel(id).then(valid.call(this)).then((res)=>{
                if(res.ok){
                    this.loadTree();
                }
            }).catch(errors.call(this))
        },
        addSerNoOk(){
            this.$refs['addserno'].validate((validok) => {
                if(validok){
                    let info = {
                        label:this.addSerNoItem.name,
                        description:this.addSerNoItem.remarks,
                        parentId:this.addSerNoItem.parentId,
                        type:'sys_user_competence_level',
                        value:0,
                    };
                    if(!this.addSerNoItem.add) { // update
                        info.id = this.state.item.id;
                    }
                    dictDataSave(info).then(valid.call(this)).then((res)=>{
                        if(res.ok){
                            this.addSerNoClose();
                            this.loadTree();
                        }
                    }).catch(errors.call(this));
                }
            });
        },
        addSerNoClose(){
            this.addSerNoItem.show = false;
            this.$refs['addserno'].resetFields();
        },
        findParent(item){
            for(let i in this.jobTree){
                let it = this.jobTree[i];
                if(item.id == it.id) {
                    return it;
                }
                for (let j in it.children){
                    if(item.id == it.children[j].id){
                        return it;
                    }
                }
            }
        }
    }
}
</script>


