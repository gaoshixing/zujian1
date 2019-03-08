<style lang="less">
.menu-list-item-wrap{
    .menu-list-item{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e5e5e5;
        overflow: hidden;
        .iconfont{
            color: #d9d9d9;
            transition: all 0.3s ease;
        }
    }
}
</style>
<template>
    <div class="menu-list-item-wrap">
        <div class="menu-list-item">
            <div class="item-foldable" @click="toggleFold">
                <i class="iconfont" :class="foldcls"></i>
            </div>
            <div class="item-name" v-text="data.name"></div>
            <div class="item-href" v-text="data.href"></div>
            <div class="item-sort" v-if="sortinfo.issort">
                <InputNumber v-model="data.sort"></InputNumber>
            </div>
            <div class="item-sort" v-text="data.sort" v-else></div>
            <div class="item-visible">{{data.isShow | showText}}</div>
            <div class="item-permission" v-text="data.permission"></div>
            <div class="item-ctrls" v-if="edit">
                <a href="javascript:void(0)" class="linkbtn" @click="updateMenu">修改</a>
                <a href="javascript:void(0)" class="linkbtn" @click="delMenu">删除</a>
                <a href="javascript:void(0)" class="linkbtn" @click="addSubMenu">添加下级菜单</a>
            </div>
        </div>
        <div class="subfold" v-if="state.visible">
            <expandrow :row="data" :edit="edit"></expandrow>
        </div>
    </div>
</template>
<script>

import expandrow from './expandRow.vue';

export default {
    props:{
        data:{
            type:Object,
            default:function(){
                return {};
            }
        },
        sortinfo:{
            type:Object,
            default:function(){
                return {};
            }
        },
        edit:{
            type:Boolean,
            default:true,
        }
    },
    data(){
        return {
            state:{
                visible:false
            }
        };
    },
    computed:{
        foldcls(){
            return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
        }
    },
    components:{
        expandrow
    },
    filters:{
        showText(isShow){
            if(isShow=='1'){
                return '显示';
            }
            return '隐藏';
        }
    },
    methods:{
        toggleFold(){
            this.state.visible = !this.state.visible;
        },
        updateMenu(){
            this.$emit('onupdate',this.data);
        },
        delMenu(){
            this.$emit('ondel',this.data);
        },
        addSubMenu(){
            this.$emit('onaddsubmenu',this.data);
        }
    },
}
</script>


