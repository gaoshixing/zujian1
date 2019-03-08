<style lang="less">
@import "../themes/index.less";
.xel-item{
    margin: 20px 0;
    &.half{
        width: 50%;
        float: left;
        &:last-of-type{
            clear: both;
        }
    }
}
</style>
<template>
    <div class="xel-item" v-if="data.visible||1" :class="xelCls">
        <xinput ref="el" v-if="model===TYPES.INPUT" v-model="data.value" :paddingx="paddingx" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :width="data.width" />
        <xtextarea ref="el" v-else-if="model===TYPES.TEXTAREA" v-model="data.value" :paddingx="paddingx" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :width="data.width" :height="data.height" />
        <xradio ref="el" v-else-if="model===TYPES.RADIO" v-model="data.value" :paddingx="paddingx" @selected="onSelected" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :options="data.options" />
        <xcheckbox ref="el" v-else-if="model===TYPES.CHECKBOX" v-model="data.value" :paddingx="paddingx" @selected="onSelected" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :options="data.options"  />
        <xselect ref="el" v-else-if="model===TYPES.SELECT" v-model="data.value" :paddingx="paddingx" @selected="onSelected" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :icon="data.icon" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :options="data.options" :width="data.width" />
        <xdatetime ref="el" v-else-if="model===TYPES.DATETIME" v-model="data.value" :paddingx="paddingx" :settings="data.settings" :id="data.id" :pid="pid" :title="data.title" :description="data.description" :name="data.name" :type="data.type" :display="data.display" :placeholder="data.placeholder" :validate="data.validate" :readonly="viewonly" :width="data.width" />
        <xbutton ref="el" v-else-if="model===TYPES.BUTTON" :id="data.id" :pid="pid" :name="data.name" v-model="data.value" :type="data.type" :color="data.color" :display="data.display" :readonly="viewonly" :payload="mypayload" :cls="data.cls" @on-click="onClick" />
        <xlabel ref="el" v-else-if="model===TYPES.LABEL" :id="data.id" :pid="pid" :title="data.title" :description="data.description" />
        <xline ref="el" v-else-if="model===TYPES.LINE" :id="data.id" :pid="pid" :name="data.name" v-model="data.value" />
        <xfile ref="el" v-else-if="model===TYPES.FILE" :id="data.id" :paddingx="paddingx" :pid="pid" :name="data.name" v-model="data.value" :title="data.title" :description="data.description" :type="data.type" :display="data.display" :validate="data.validate" :groupId="groupId" :readonly="viewonly" :settings="data.settings" :placeholder="data.placeholder" />
        <ximg ref="el" v-else-if="model===TYPES.IMG" :id="data.id" :pid="pid" :paddingx="paddingx" :name="data.name" v-model="data.value" :title="data.title" :groupId="groupId" :description="data.description" :type="data.type" :display="data.display" :validate="data.validate" :readonly="viewonly" :settings="data.settings" :placeholder="data.placeholder" />
        <xoffice ref="el" v-else-if="model===TYPES.OFFICE" :id="data.id" :pid="pid" :paddingx="paddingx" :name="data.name" v-model="data.value" :title="data.title" :description="data.description" :type="data.type" :display="data.display" :validate="data.validate" :readonly="viewonly" :settings="data.settings" :placeholder="data.placeholder" />
        <xperson ref="el" v-else-if="model===TYPES.PERSON" :id="data.id" :pid="pid" :paddingx="paddingx" :name="data.name" v-model="data.value" :title="data.title" :description="data.description" :type="data.type" :display="data.display" :validate="data.validate" :readonly="viewonly" :settings="data.settings" :placeholder="data.placeholder" />
        <selection ref="el" v-else-if="model===TYPES.SELECTION" v-model="data.value" :id="data.id" :pid="pid" :name="data.name" :title="data.title" :description="data.description" :type="data.type" :display="data.display" :validate="data.validate" :readonly="viewonly" :settings="data.settings" :placeholder="data.placeholder" />
        <xinlineform ref="el" v-else-if="model===TYPES.FORM" v-model="data.value" :id="data.id" :name="data.name" :title="data.title" :description="data.description" :display="data.display" :validate="data.validate" :readonly="viewonly" :settings="data.settings" />
        <xformset ref="el" v-else-if="model===TYPES.FORMSET" v-model="data.value" :id="data.id" :name="data.name" :title="data.title" :description="data.description" :display="data.display" :validate="data.validate" :settings="data.settings" />
        <xerrtype ref="el" v-else :id="data.id" :name="data.name" :type="model" v-model="data.value"/>
    </div>
</template>
<script>
import xinput from './xinput/xinput.vue';
import xtextarea from './xtextarea/xtextarea.vue';
import xradio from './xradio/xradio.vue';
import xcheckbox from './xcheckbox/xcheckbox.vue';
import xselect from './xselect/xselect.vue';
import xdatetime from './xdatetime/xdatetime';
import xbutton from './xbutton/xbutton';
import xlabel from './xlabel/xlabel';
import xline from './xline/xline';
import xfile from './xfile/xfile';
import ximg from './ximg/ximg';
import xperson from './xperson/xperson';
import xoffice from './xoffice/xoffice';
import xerrtype from './xerrtype/xerrtype';
import selection from './selection/selection';
import xinlineform from './xinlineform/xinlineform';
import xformset from './xformset/xformset';

import { TYPES , LAYTYPE } from './config';
export default {
    name:'xel',
    props:{
        data:{
            type:Object,
            required:true,
        },
        payload:{
            type:Object,
            default:()=>{}
        },
        viewmode:{
            type:Boolean,
            default:false,
        },
        pid:{
            type:String,
            default:''
        },
		groupId:{
			type:[Number,String],
			default:'',
		},
        paddingx:{
			type:Number,
			default:0,
		},  
    },
    data(){
        return {
            TYPES
        };
    },
    computed:{
        model(){
            return this.data.model;
        },
        viewonly(){
            return this.data.readonly || this.viewmode;
        },
        mypayload(){
            if(this.payload && (Object.keys(this.payload).length>0)){
                return this.payload;
            }
            return this.data.payload;
        },
        xelCls(){
            const c = {};
            if(this.data.lay==LAYTYPE.HALF){
                c.half=true;
            }
            return c;
        }
    },
    components:{
        xinput,
        xtextarea,
        xradio,
        xcheckbox,
        xselect,
        xdatetime,
        xbutton,
        xlabel,
        xline,
        xfile,
        ximg,
        xperson,
        xoffice,
        selection,
        xerrtype,
        xinlineform,
        xformset
    },
    methods:{
        valid(t=''){
            return this.$refs.el.valid(t);
        },
        onSelected(v,i){ // 单选，多选，下拉 会触发此事件
            this.data.settings=Object.assign({item:v},this.data.settings); // 在此项目里记录所选的项目（下拉，单选，多选）
            this.needChange(v);
        },
        needChange(v){ // 下拉 或者 单选 发生变化，检测是否需要重排
            if([TYPES.SELECT,TYPES.RADIO].includes(this.data.model)){
            	
            console.log(v,this.data)
                this.$emit('willchange',v,this.data);
            }
        },
        onClick(...args){
            this.$emit('on-click',...args);
        }
    },
    watch:{
        'data.value'(v){
            this.$emit('input',v);
        }
    }

}
</script>


