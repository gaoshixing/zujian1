<style lang="less">
.x-inlineform{
    .x-select-able-icon{
        display: none;
    }
    .x-inlineform-section{
        position: relative;
    }
    .x-form-wrap{
        border: 1px solid #ddd;
        background: #fff;
        overflow-x: auto;
        .empty-xform{
            padding: 10px 0;
            background-color: #f5f5f5;
            font-size: 16px;
            text-indent: 10px;
        }
        .thead,.tbody{
            height: 36px;
            line-height: 36px;
            display: flex;
            border-bottom: 1px solid #ddd;
        }
        .thead{

        }
        .tbody{
            .xel-item{
                margin: 0;
                .x-error-tip{
                    display: none;
                }
                .x-select{
                    .x-select-able{
                        position: static;
                    }
                    position: static;
                    .x-select-dropdown{
                        width: 180px;
                    }
                }
            }
            .x-el-title,.x-el-description{
                display: none;
            }
        }
        .th0,.td0{
            min-width: 40px;
            float: left;
            height: 100%;
            /*border-bottom: 1px solid #ddd;*/
            text-align: center;
        }
        .th,.td{
            height: 100%;
            border-left: 1px solid #ddd;
            border-bottom: 0px solid #ddd;
            padding: 0 10px;
            min-width: 400px;
        }
        .td{
            overflow: hidden;
        }
    }   
}
</style>

<template>
    <div class="x-inlineform">
        <div :class="displayCls" :rel="display">
            <div class="x-el-title" v-text="title"></div>
            <div class="x-el-description" v-text="description"></div>
            <div class="x-inlineform-section">
                <div class="x-form-wrap">
                    <div class="empty-xform" v-if="!settings.thead.length">
                        请添加字段
                    </div>
                    <template v-else>

                        <div class="thead">
                            <div class="th0"></div>
                            <div class="th" v-for="(t,index) in titles" v-text="t" :key="index+t"></div>
                        </div>
                        <div class="tbody" v-for="(row,index) in tabledata" :key="'row'+index">
                            <div class="td0">{{index+1}}</div>
                            <div class="td" v-for="item in row" :key="item.id">
                            <xel :id="item.id" :data="item" name="xel" @input="onInput"/>
                            </div>
                        </div>
                    </template>


                </div>
                <div v-if="settings.thead.length">
                    <a @click="doAdd">添加</a>
                </div>
            </div>
        </div>
        <div class="x-error-tip">
            <p class="x-error-tip-text" v-if="error" v-text="errorMsg"></p>
        </div>
    </div>
</template>
<script>
import base from '../base';
import {TYPES} from '../config.js'
import { clone } from '@public/libs/util.js'
import { formData } from '../../libs/form.js'
export default {
    name:'inlineform',
    mixins:[base],
    props:{
        value:{
            type:Array,
            required:true,
        }
    },
    data(){
        return {
            sc:null,
            values:this.value.length?this.value:[this.getEx()],
            tabledata:[],
        }
    },
    computed:{
        titles(){
            return this.settings.thead.map(item=>{
                return item.title;
            });
        },
        data(){
            let values = [];
            if(this.values.length){
                values = this.values;
            } else {
                values = [this.getEx()]
            }
            return values.map(item=>{
                const t = clone(this.settings.thead);
                return this.parseHead(item,t);
            });
        }
    },
    components:{
        xel: () => import('../xel.vue')

    },
    created(){
        this.tabledata = this.data;
    },
    mounted(){
        this.sc = this.$el.querySelector('.x-form-wrap');
        this.sc.onscroll=this.onscroll;
    },
    methods:{
        onscroll(e){
            const x = this.sc.scrollLeft;
            this.tabledata.forEach(item=>{
                item.forEach(i=>{
                    if(i.model===TYPES.SELECT){
                        i.settings.scrollx = x;
                    }
                });
            });
        },
        doAdd(){
            this.values = this.getData();
            setTimeout(()=>{
                this.values.push(this.getEx());
            },0);
        },
        getEx(){
            const item = {};
            this.settings.thead.forEach(i=>{
                if(i.name){
                    item[i.name]=i.value;
                }
            });
            return item;
        },
        parseHead(item,tpl){
            return tpl.map(i=>{
                if(typeof item[i.name] !='undefined'){
                    i.value = item[i.name];
                }
                return i;
            });
        },
        getValue(){
            try{
                const arr = [];
                this.tabledata.forEach(item=>{
                    arr.push(formData(item));
                });
                return arr;
            }catch(e){
                this.$Message.error(e.toString());
                return false;
            }
        },
        onInput(v){
            this.$emit('input',this.getValue());
        },
        getData(){
            const arr = [];
            const names=[];
            this.tabledata.forEach(item=>{
                const ret = {};
                item.forEach(i=>{
                    if(!i.name){
                        console.error('inlineform: empty name found');
                    }
                    if(names.includes(i.name)){
                        console.error('duplicate name found');
                    }
                    names.push(i.name);
                    ret[i.name]=i.value;
                });
                arr.push(ret);
            });
            return arr;
        }
    },
    watch:{
        data(v){
            this.tabledata = v;
        },
        values(v){ // 绑定修改value
            this.$emit('input',v);
        }
    }

}
</script>
