<style lang="less">
@themeGreen:#44bcb7;
.leftMenu{
    .popmenu{
        position: absolute;
        top: 0;
        right: -190px;
        width: 230px;
        background-color: #fff;
        box-shadow: 0 0 9px rgba(200, 200, 200, 0.5);
        padding: 1.8em 0;
        z-index: 80;
        ul{
            &>li{
                text-indent: 2em;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                list-style: none;
                &:hover{
                    background-color: #e6e6e6;
                }
            }
        }
    }
    height: 100%;
    .tabs{
        margin: 15px;
        height: 26px;
        border: 1px solid @themeGreen;
        border-radius: 4px;
        display: flex;
        .itemone{
            flex: 1;
            text-align: center; 
            line-height: 24px;
            cursor: pointer;
            &.active{
                color: @themeGreen;
            }
            &+.itemone{
                border-left: 1px solid @themeGreen;
            }
        }
    }
    .main-tree-item{
        padding: 0 15px;
        .name{
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
        }
        .iconfont{
            display: inline-block;
            cursor: pointer;
            vertical-align: middle;
            &:hover{
                color: #000;
            }
        }
    }
    .item-wrapper{
        height: ~"calc(100% - 80px)";
        overflow: auto;
    }
    .stree .tree-item{
        &.active, &:hover {
            background-color: #f2f2f2;
        }
    }
    .stree .img-caozuo{
        position: absolute;right: 0;top: 0px;z-index: 222;
        // background: #f2f2f2;
    }
}
</style>
<template>
	<div class="leftMenu">
        <div class="main-tree-item">
            <div v-if="tab==1">
                <span class="name">IVYGATE<span v-if="hideStaffNums">({{numArr[0]}})</span></span>
                <i class="iconfont icon-jigou" @click.stop="addFac" v-if="org_edit"></i>
            </div>
            <div v-else-if="tab==3">
                <span class="name">IVYGATE<span v-if="hideStaffNums">({{numArr[2]}})</span></span>
                <i class="iconfont icon-zhiji" @click.stop="addGrade" v-if="grade_edit"></i>
            </div>
        </div>
        <div class="tabs" v-if="navTab">
            <div class="itemone" @click.stop="switchTab(1)" :class="{'active':tab==1}" >组织机构</div>
            <div class="itemone" @click.stop="switchTab(3)" :class="{'active':tab==3}" >职能等级</div>
        </div>
        <div class="item-wrapper" ref="scrollWrap">
            <keep-alive>
                <org-tree :isIncumbency="isIncumbency" @onItemClick="itemClick" v-if="tab==1" ref="org" :hideStaffNums="hideStaffNums"></org-tree>
                <grade-tree :isIncumbency="isIncumbency" @onItemClick="itemClick" v-else-if="tab==3" ref="grade" :hideStaffNums="hideStaffNums"></grade-tree>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import orgTree from './orgTree';
import gradeTree from './gradeTree';
import {mapState,mapGetters} from 'vuex';

export default {
    data() {
        return {
            numArr:{
                0:'',
                1:'',
                2:''
            },
            tab: 1
        };
    },
    props:{
        navTab:{
            type:Boolean,
            default: false,
            required: false
        },
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
        orgTree,
        gradeTree
    },
    created() {
        
    },
    mounted(){
        this.$refs.scrollWrap.addEventListener('scroll',this.hideMenu);
    },
    beforeDestroy(){
        this.$refs.scrollWrap.removeEventListener('scroll',this.hideMenu);
    },
    computed:{
        ...mapState(['userInfo']),
        ...mapState('core',['menus']),
        ...mapGetters('core',['org_edit','grade_edit']),
    },
    methods:{
        update(payload){
            if(this.$refs[payload.ref]){
                this.$refs[payload.ref].update(payload);
            }
        },
        hideMenu(){
            this.$refs.org&&this.$refs.org.hideMenu();
            this.$refs.grade&&this.$refs.grade.hideMenu();
        },
        uploadData() {
            this.switchTab(this.tab);
        },
        switchTab(tab) {
            this.$emit('onClickLeftMenuTabChange', this.tab);
            if(this.isIncumbency) {
                setTimeout(() => {
                    if(tab == 1) this.$refs.org.reloadTree();
                    else if(tab == 3) this.$refs.grade.reloadTree(); 
                }, 10);
            }
            this.tab = tab;
            setTimeout(() => {
                if(tab == 1) this.$refs.org.autoInitFocus();
                else if(tab == 3) this.$refs.grade.autoInitFocus(); 
            }, 10);
        },
        addFac() {
            this.$refs.org.showAddOrg();
        },
        addGrade() {
            this.$refs.grade.showAddGrade();
        },
        setNum(num,seq){
            this.numArr[seq]=num;
        },
        itemClick(item, type) {
            this.$emit('onItemClick', item, type);
        }
    }
}
</script>