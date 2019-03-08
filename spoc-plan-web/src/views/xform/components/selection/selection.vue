<style lang="less">
.xform-selection{
    &-item{
        margin: 10px 0;
    }
    .x-el-input{
        width: 60%;
        height: 28px;
        line-height: 28px;
    }
    .del-btn{
        font-size: 18px;
        color: #f77;
        cursor: pointer;
        vertical-align: middle;
        margin-left: 5px;
        &:hover{
            color: #f22;
        }
    }
    .do-addone{
        color: #0DB3A6;
    }
    
}
</style>
<template>
    <div class="xform-selection">
        <div class="x-el-title x-input-title" v-text="title"></div>
        <div class="x-el-description x-input-description" v-text="description"></div>
        <div v-for="item in items" :key="item.value" class="xform-selection-item">
            <input class="x-el-input" v-model="item.label" :placeholder="item.placeholder" :readonly="item.readonly" >
            <Icon class="del-btn" type="android-remove-circle" @click.native.stop="delOne(item)"></Icon>
        </div>
        <div>
            <a @click="addOne" class="do-addone">添加选项</a>
        </div>
    </div>
</template>
<script>

import base from '../base'
import { uuid } from '../../libs/util'
import { TYPES } from '../config';

const exp = (i)=>{
    const uid = uuid();
    return {
        label:`选项${i+1}`,
        value:`${uid}@val`
    }
};

export default {
    name:'selection',
    mixins:[base],
    data(){
        return {
            items:this.value,
        }
    },
    methods:{
        addOne(){
            this.items.push(exp(this.items.length));
        },
        delOne(item){
            const i = this.items.findIndex(it=>it.value==item.value);
            this.items.splice(i,1);
        },
        
    },
}
</script>


