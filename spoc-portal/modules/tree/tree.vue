<style lang="less">
.stree{
    position: relative;
    .tree-level-1{
        text-indent: 0.5em;
    }
    .tree-level-2{
        text-indent: 1em;
    }
    .tree-level-3{
        text-indent: 1.5em;
    }
    .tree-level-4{
        text-indent: 2em;
    }
    .tree-level-5{
        text-indent: 2.5em;
    }
    .tree-level-6{
        text-indent: 3em;
    }
    .tree-item{
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        position: relative;
        &:hover{
            background-color: #fff;
            .img-caozuo{
                display: block;
            }
        }
        &.active{
            background-color: #fff;
        }
        &>span{
            display: inline-block;
            max-width: 164px;
            min-width: 60px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .nochild{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }
    }
    .iconfont{
        color: #d9d9d9;
    }
    .img-caozuo{
        background: url("../../assets/svg/leftmenu/dots.svg") no-repeat left center;
        display: block;
        width: 20px;
        height: 30px;
        float: right;
        background-size: contain;
        margin-right: 10px;
        display: none;
    }
}
</style>
<template>
    <div class="stree">
        <div v-for="item in data" :key="'tree0_'+item.id" class="tree-level-1">
            <div class="tree-item" :class="{active:item.id==curr.id}" @click.stop="itemClick(item)">
                <span>
                    <i class="iconfont" :class="{'icon-xiala':item.expand,'icon-tright':!item.expand}" v-if="item.children && item.children.length" @click.stop="item.expand=!item.expand"></i>
                    <i v-else class="nochild"></i>
                    <span class="t">{{titleNum(item.title, item)}}</span>
                </span>
                <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item)"></i>
            </div>
            <div v-if="item.children&&item.expand" class="sub-tree tree-level-2">
                <template v-for="item2 in item.children">
                    <div class="tree-item" :class="{active:item2.id==curr.id}" :key="'tree1_'+item2.id" @click.stop="itemClick(item2)">
                        <span>
                            <i class="iconfont" :class="{'icon-xiala':item2.expand,'icon-tright':!item2.expand}" v-if="item2.children && item2.children.length" @click.stop="item2.expand=!item2.expand"></i>
                            <i v-else class="nochild"></i>
                            <span class="t">{{titleNum(item2.title, item2)}}</span>
                        </span>
                        <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item2)"></i>
                    </div>
                    <div v-if="item2.children&&item2.expand" class="sub-tree tree-level-3" :key="'t3_'+item2.id">
                        <template v-for="item3 in item2.children" >
                            <div class="tree-item" :class="{active:item3.id==curr.id}" :key="'t33_'+item3.id" @click.stop="itemClick(item3)">
                                <span>
                                    <i class="iconfont" :class="{'icon-xiala':item3.expand,'icon-tright':!item3.expand}" v-if="item3.children && item3.children.length" @click.stop="item3.expand=!item3.expand"></i>
                                    <i v-else class="nochild"></i>
                                    <span class="t">{{titleNum(item3.title, item3)}}</span>
                                </span>
                                <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item3)"></i>
                            </div>
                            <div v-if="item3.children&&item3.expand" class="sub-tree tree-level-4" :key="'t4_'+item3.id">
                                <template v-for="item4 in item3.children">
                                    <div class="tree-item" :class="{active:item4.id==curr.id}" :key="item4.id" @click.stop="itemClick(item4)">
                                        <span>
                                            <i class="iconfont" :class="{'icon-xiala':item4.expand,'icon-tright':!item4.expand}" v-if="item4.children && item4.children.length" @click.stop="item4.expand=!item4.expand"></i>
                                            <i v-else class="nochild"></i>
                                            <span class="t">{{titleNum(item4.title, item4)}}</span>
                                        </span>
                                        <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item4)"></i>
                                    </div>
                                    <div v-if="item4.children&&item4.expand" class="sub-tree tree-level-5" :key="'t5_'+item4.id">
                                        <template v-for="item5 in item4.children">
                                            <div class="tree-item" :class="{active:item5.id==curr.id}" :key="'t55_'+item5.id" @click.stop="itemClick(item5)">
                                                <span>
                                                    <i class="iconfont" :class="{'icon-xiala':item5.expand,'icon-tright':!item5.expand}" v-if="item5.children && item5.children.length" @click.stop="item5.expand=!item5.expand"></i>
                                                    <i v-else class="nochild"></i>
                                                    <span class="t">{{titleNum(item5.title, item5)}}</span>
                                                </span>
                                                <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item5)"></i>
                                            </div>
                                            <div v-if="item5.children&&item5.expand" class="sub-tree tree-level-6" :key="'t6_'+item5.id">
                                                <template v-for="item6 in item5.children">
                                                    <div class="tree-item" :class="{active:item6.id==curr.id}" :key="'t66_'+item6.id" @click.stop="itemClick(item6)">
                                                        <span>
                                                            <i class="iconfont" :class="{'icon-xiala':item6.expand,'icon-tright':!item6.expand}" v-if="item6.children && item6.children.length" @click.stop="item6.expand=!item6.expand"></i>
                                                            <i v-else class="nochild"></i>
                                                            <span class="t">{{titleNum(item6.title, item6)}}</span>
                                                        </span>
                                                        <i class="img-caozuo" v-if="menu" @click.stop="showPopMenu($event,item6)"></i>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div> 
                </template>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        data:{
            type:Array,
            required:true,
            default:function(){
                return [];
            }
        },
        menu:{
            type:Boolean,
            default:false
        },
        curr:{
            type:Object,
            default:function(){
                return {};
            }
        },
        hideStaffNums: {
            type: Boolean,
            default: true,
        },
    },
    
    data() {
        return {
            
        };
    },
    filters:{
        
    },
    methods:{
        itemClick(item){
            this.$emit('item-click',item);
        },
        showPopMenu(e,item){
            this.$emit('menu-click',e,item);
        },
        titleNum(title,item){
            if(typeof item.num !='undefined' && this.hideStaffNums){
                return `${title}(${item.num})`;
            }
            return title;
        },
    },
    computed:{

    }
}
</script>