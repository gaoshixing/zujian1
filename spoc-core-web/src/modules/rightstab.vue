<style lang="less">
@green:#44bcb7;
.rights-wrapper{
    .tabs{
        &>div{
            height: 360px;
            margin-top: 10px;
            overflow: auto;
            padding: 10px 20px;
        }
        .ivu-tree ul{
            font-size: 14px;
        }
        .ivu-checkbox-indeterminate,.ivu-checkbox-checked{
            .ivu-checkbox-inner{
                background-color: @green;
                border-color: @green;
            }
        }
    }
}
</style>
<template>

<Modal v-model="rights.show" title="角色授权" width="730" height="520">
    <div class="rights-wrapper">
        <div class="tabs">
            <Tree ref="treeRefs" :data="treeData" :show-checkbox="true"></Tree>
        </div>
    </div>
    <div slot="footer">
        <Button @click="btnClose">取消</Button>
        <Button type="primary" @click="btnYes">确定</Button>
    </div>
</Modal>


</template>
<script>
import Vue from 'vue';
import tree from '@public/modules/tree/tree';
import valid,{errors,getRoleMenu,getMenuTree,applyRights} from '../libs/request';

export default {
    props:{
        appmenu:{
            type:Object,
            required:true,
        },
        role:{
            type:Object,
            required:true,
        },
        menuId: {
            type:[String, Number],
            required: true,
        }
    },
    data() {
        return {
            treeData:[],
            rights:{
                show:false
            },
        };
    },
    components:{
        tree,
    },
    created() {
        
    },
    methods:{
        show(){
            this.rights.show = true;
            this.loadMenuRights();
        },
        loadMenuRights(){
            getMenuTree(this.appmenu.id,this.role.id).then(valid.call(this)).then((res)=>{
                if(res.ok) {
                    if(res.data.data.children){
                        this.treeData = res.data.data.children;
                    }
                }
            }).catch(errors.call(this));
        },
        btnClose(){
            this.rights.show = false;
            this.$emit('fresh',this.role);
        },
        btnYes(){
            this.apply();
        },
        apply() {
            let data = this.$refs.treeRefs.getCheckedNodes();
            this.treeData.forEach((item) => {
                let itemArray = [];
                this.checkChild(item ,itemArray)
            })
            let menuList = []
            this.treeData.forEach((item) => {
                this.pushIds(item,menuList);
            })
            menuList.push(this.appmenu.id);

            console.log(menuList)
            applyRights(this.role.id, this.menuId, menuList).then(valid.call(this)).then((res)=>{
                if(res.ok) {
                    this.btnClose();
                }
            }).catch(errors.call(this));
        },
        checkChild(item, itemArray){
            if(item.children && item.children.length){
                itemArray.push(item)
                for(let i = 0; i < item.children.length; i++) {
                    if(item.children[i].checked){
                        itemArray.forEach((element) => {
                            element.isCheckedChildren = true
                        });
                    }
                    if(item.children[i].children && item.children[i].children.length){
                        this.checkChild(item.children[i].children,itemArray)
                    }
                }
            }
        },
        pushIds(item,resArray){
            if(item.checked || item.isCheckedChildren) {
                resArray.push(item.id)
                if (item.children && item.children.length) {
                    item.children.forEach((item0)=>{
                        this.pushIds(item0,resArray);
                    });
                }
            }
        },
    }
}
</script>


