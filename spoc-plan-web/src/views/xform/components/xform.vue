<style lang="less">
.xel-form{
    margin: 2px 0;
}
</style>
<template>
    <div class="xel-form">
        <xel ref="xel" v-for="(el,index) in xdatavis" @on-click="onClick" @willchange="willchange" @input="onChange(el,index)" :groupId="groupId" :data="el" :key="el.id" :pid="pid" :viewmode="viewmode" :paddingx="paddingx" />
    </div>
</template>
<script>
import xel from './xel';
import { formData } from '../libs/form';
export default {
    props:{
        xdata:{
            type:Array,
            required:true,
        },
		groupId:{
			type:[Number,String],
			default:'',
		},
        xsetting:{
            type:Object,
            required:true,      
        },
        viewmode:{
            type:Boolean,
            default:false,
        },
        xformdata:{
        },
        pid:{
            type:String,
            default:''
        },
        paddingx:{
			type:Number,
			default:0,
		},  
    },
    data(){
        return {}
    },
    computed:{
        xdatavis(){
            return this.xdata.filter(item=>item.visible!==false);
        }
    },
    components:{
        xel
    },
    methods:{
        onChange(el,index){
            this.$emit('on-change',el,index);
        },
        onClick(...args){
            this.$emit('on-click',...args);
        },
        willchange(v,item){
            this.$emit('willchange',v,item);
        },
        valid(){
            const v = this.$refs.xel.map(item=>{
                return item.valid();
            }).every(v=>v);
            return v;
        },
        getData(){
            try{
                const data = formData(this.xdatavis);
                return data;
            }catch(e){
                console.error(e);
                return false;
            }
        }
    }
}
</script>


