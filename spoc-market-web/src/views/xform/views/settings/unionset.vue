<style lang="less">
.xform-model{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(240,240,240,.8);
    z-index: 800;
    &-center{
        position: fixed;
        width: 600px;
        height: 560px;
        top: 50%;
        left: 50%;
        margin-top: -280px;
        margin-left: -300px;
        background-color: #fff;
        box-shadow: 0 2px 3px 0 rgba(146,146,146,.5);
        box-sizing: border-box;
        .m-header{
            border-bottom: 1px solid #ddd;
            position: relative;
            .m-title{
                padding: 15px 0 15px 25px;
                font-size: 16px;
            }
            .close-btn{
                position: absolute;
                right: 20px;
                top: 15px;
                color: #888;
                font-size: 28px;
                cursor: pointer;
                &:hover{
                    color: #444;
                }
            }
        }
        .m-body{
            padding: 15px;
            .two-col{
                display: flex;
                .fl{
                    flex: 2;
                    padding: 10px;
                }
                .fr{
                    flex: 4;
                    padding: 10px;
                }
                .f-t{
                    font-size: 14px;
                    margin: 5px 0;
                }
            }
            &-footer{
                text-align: right;
                .xel-item{
                    display: inline;
                    padding-right: 10px;
                }
            }
        }
        
        .sbox{
            border: 1px solid #ddd;
            height: 400px;
            overflow: auto;
            &.s-left-item{
                .opitem{
                    padding: 10px 6px;
                    cursor: pointer;
                    &:hover,&.active{
                        background-color: #eee;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="xform-model" v-if="union.visible">
        <div class="xform-model-center">
            <div class="m-header">
                <div class="m-title">选项关联设置</div>
                <Icon class="close-btn" @click.native.stop="close" type="android-close"></Icon>
            </div>
            <div class="m-body" >
                <div class="two-col">
                    <div class="fl">
                        <p class="f-t">选项</p>
                        <div class="sbox s-left-item">
                            <div class="opitem" v-if="ctx.options.length" :class="{active:currActive.value==item.value}" @click="seeItem(item)" v-for="item in ctx.options" :key="item.value+item.label" v-text="item.label"></div>
                        </div>
                    </div>
                    <div class="fr">
                        <p class="f-t">关联字段</p>
                        <div class="sbox">
                            <sitem v-if="values[currActive.value]" :options="options" v-model="values[currActive.value]" />
                        </div>
                    </div>
                </div>
                <div class="m-body-footer">
                    <xel v-for="a in ctlbtns" :key="a.id" :data="a"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sitem from './sitem';
import adapter from '../../components/adapter';
import { SELECTYPE ,TYPES } from '../../components/config';
import xel from '../../components/xel'
import { uuid } from '../../libs/util'
const getoptions = adapter.options;

export default {
    props:{
        item:{
            type:Object,
            required:true,
        },
        xformlastdata:{
            type:Array,
            required:true
        }
    },
    data(){
        return {
            ctx:{
                options:[],
                item:{},
            },
            union:{
                visible:false
            },
            values:{},
            currActive:{},
            ctlbtns:[
                {
                    id:uuid(),
                    model:TYPES.BUTTON,
                    name:'取消',
                    type:'',
                    value:this.close
                },
                {
                    id:uuid(),
                    model:TYPES.BUTTON,
                    name:'保存',
                    type:'success',
                    value:this.doSave
                },
                
            ]
        }
    },
    computed:{
        options(){
            let arr=[];
            this.xformlastdata.forEach(item=>{
                arr.push({label:item.title,value:item.id});
            });
            return arr;
        },
    },
    components:{
        sitem,
        xel
    },
    created(){
        
    },
    methods:{
        getOptions(){
            const {settings,options} = this.item;
            if(settings && options){
                if(settings.datasource===SELECTYPE.DATASOURCE_REMOTE){
                    getoptions(settings.api,this.ctx,settings).finally(this.createValues);
                } else {
                    let arr=[];
                    options.forEach(item=>{
                        arr.push(Object.assign({},item,{uid:'un'+uuid()}));
                    });
                    this.ctx.options = arr;
                    this.createValues();
                }
            }
        },
        createValues(){
            if(this.ctx.options.length){
                const v = this.item.settings.union||{};
                this.ctx.options.forEach(item=>{
                    const {value,label} = item;
                    if(!v[value]){
                        v[value]=[];
                    }
                });
                this.values=v;
                this.currActive = this.ctx.options[0];
                console.info(this.values,this.currActive);
            }
        },
        show(){
            this.union.visible = true;
            this.getOptions();
        },
        close(){
            this.union.visible = false;
        },
        seeItem(item){
            this.currActive = item;
        },
        doSave(){
            this.$emit('doset',this.item.id,this.values);
            this.close();
        }
    }
}
</script>


