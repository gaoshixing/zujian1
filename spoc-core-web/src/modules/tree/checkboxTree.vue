<style lang="less">
.checkbox-stree{
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
        .t{
            text-indent: 0;
        }
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
            max-width: 280px;
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
        color: #333;
    }
}
</style>
<template>
    <div class="checkbox-stree">
        <CheckboxGroup v-model="checkItem" @on-change="onChange">
            <div v-for="item in data" :key="item.id" class="tree-level-1">
                <div class="tree-item">
                    <span>
                        <i class="iconfont" :class="{'icon-xiala':item.expand,'icon-tright':!item.expand}" v-if="item.children" @click.stop="item.expand=!item.expand"></i>
                        <i v-else class="nochild"></i>
                        <span class="t"><Checkbox :label="item.id" :disabled="disableLevel.indexOf(0)>-1">{{item.title}}</Checkbox></span>
                    </span>
                </div>
                <div v-if="item.children&&item.expand" class="sub-tree tree-level-2">
                    <template v-for="item2 in item.children">
                        <div class="tree-item"  :key="item2.id" >
                            <span>
                                <i class="iconfont" :class="{'icon-xiala':item2.expand,'icon-tright':!item2.expand}" v-if="item2.children" @click.stop="item2.expand=!item2.expand"></i>
                                <i v-else class="nochild"></i>
                                <span class="t"><Checkbox :label="item2.id">{{item2.title}}</Checkbox></span>
                            </span>
                        </div>
                        <div v-if="item2.children&&item2.expand" class="sub-tree tree-level-3" :key="item2.id">
                            <template v-for="item3 in item2.children" >
                                <div class="tree-item"  :key="item3.id" >
                                    <span>
                                        <i class="iconfont" :class="{'icon-xiala':item3.expand,'icon-tright':!item3.expand}" v-if="item3.children" @click.stop="item3.expand=!item3.expand"></i>
                                        <i v-else class="nochild"></i>
                                        <span class="t"><Checkbox :label="item3.id">{{item3.title}}</Checkbox></span>
                                    </span>
                                </div>
                                <div v-if="item3.children&&item3.expand" class="sub-tree tree-level-4" :key="item3.id">
                                    <template v-for="item4 in item3.children">
                                        <div class="tree-item"  :key="item4.id" >
                                            <span>
                                                <i class="iconfont" :class="{'icon-xiala':item4.expand,'icon-tright':!item4.expand}" v-if="item4.children" @click.stop="item4.expand=!item4.expand"></i>
                                                <i v-else class="nochild"></i>
                                                <span class="t"><Checkbox :label="item4.id">{{item4.title}}</Checkbox></span>
                                            </span>
                                        </div>
                                        <div v-if="item4.children&&item4.expand" class="sub-tree tree-level-5" :key="item4.id">
                                            <template v-for="item5 in item4.children">
                                                <div class="tree-item"  :key="item5.id" >
                                                    <span>
                                                        <i class="iconfont" :class="{'icon-xiala':item5.expand,'icon-tright':!item5.expand}" v-if="item5.children" @click.stop="item5.expand=!item5.expand"></i>
                                                        <i v-else class="nochild"></i>
                                                        <span class="t"><Checkbox :label="item5.id">{{item5.title}}</Checkbox></span>
                                                    </span>
                                                </div>
                                                <div v-if="item5.children&&item5.expand" class="sub-tree tree-level-6" :key="item5.id">
                                                    <template v-for="item6 in item5.children">
                                                        <div class="tree-item"  :key="item6.id" >
                                                            <span>
                                                                <i class="iconfont" :class="{'icon-xiala':item6.expand,'icon-tright':!item6.expand}" v-if="item6.children" @click.stop="item6.expand=!item6.expand"></i>
                                                                <i v-else class="nochild"></i>
                                                                <span class="t"><Checkbox :label="item6.id">{{item6.title}}</Checkbox></span>
                                                            </span>
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
        </CheckboxGroup>
    </div>
</template>
<script>

export default {
    props:{
        data:{
            type:Array,
            required:true,
        },
        parent:{
            type:Boolean,
            default:true,
        },
        disableLevel:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data() {
        return {
            checkItem:[]
        };
    },
    methods:{
        onChange(res){
            let id = res.pop();
            this.checkItem = [id];
        },
        getCurrentSelected(){
            return this.checkItem;
        },
        reset(){
            this.checkItem = [];
        }
    }
}
</script>


