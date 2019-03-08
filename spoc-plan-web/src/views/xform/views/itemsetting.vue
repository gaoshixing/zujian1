<style lang="less">
.item-settings-wrap{
    padding: 0 10px;
    .xel-item+.xel-item{
        border-top: 1px solid #ddd;
    }
    .union-btn{
        width: 100%;
        text-align: center;
        margin-top: 18px;
        .x-button-btn{
            width: 80%;
        }
    }
}
</style>
<template>
    <div class="item-settings-wrap">
		<xform ref="xform" @on-change="onChange" @on-click="onClick" :xdata="data" :xsetting="xsetting" :xformdata="xform.layout" />
    </div>
</template>
<script>

import xform from '../components/xform'
import { TYPES , SELECTOPTION } from '../components/config'

import settings from './settings/settings';
import { clone } from '../libs/util'

export default {
    name:'itemsettings',
    props:{
        item:{
            type:Object, // 当前项的信息
            required:true,
        },
        xform:{
            type:Object, // 当前表单整体信息
            required:true,
        },
        inform:{
            type:Boolean, // 子表单使用
            default:false
        }
    },
    data(){
        return {
            TYPES,
            data:[],
            xsetting:{},
        }
    },
    computed:{
        settings(){
            const item = this.item;
            const ss = this.xform.settings;
            try{
                if(item.model && settings[item.model]){
                    return settings[item.model](item,this.find,ss);
                }
                return [];
            }catch(e){
                console.error(e);
                return [];
            }
        },
    },
    components:{
        xform
    },
    
    mounted(){
       this.reload();
    },
    methods:{
        reload(){
            setTimeout(()=>{
                this.data = this.settings;
            },0);
        },
        find(name){ // find 的特例,id位置顺序查找
            if(this.inform){
                console.error('inform called',name);
            }
            if(name=='@0'){
                return this.xform.layout[0];
            }
            if(/^#[0-9a-z]{4,16}$/.test(name)){
                return this.findIndex(name);
            }
            if(/^@[0-9a-z]{4,16}$/.test(name)){
                return this.findIndexItem(name);
            }
            // 逻辑修改，在子表单设置中，每个配置项
            if(this.inform){
                // debugger;
            }
            if(!this.$refs.xform){
                console.info('need update later');
                return false;
            }
            const items = this.$refs.xform.$children;
            console.info(items);
            for(let i=0;i<items.length;i++){
                const it = items[i].$children[0];
                if(it.name==name){
                    return it;
                }
            }
            return false;
        },
        findIndex(name){
            const id = name.substr(1);
            return this.xform.layout.findIndex(item=>{
                return item.id==id;
            });
        },
        findIndexItem(name){
            const id = name.substr(1);
            return this.xform.layout.find(item=>{
                return item.id==id;
            });
        },
        onChange(el,index){
            this.$emit('on-change',el,index);
            this.$refs.xform.valid();
        },
        getData(){
            return this.$refs.xform.getData();
        },
        onClick(...args){
            this.$emit('on-click',...args);
        }
    },
    watch:{
        settings(){
            this.reload();
        },
    }
}
</script>


