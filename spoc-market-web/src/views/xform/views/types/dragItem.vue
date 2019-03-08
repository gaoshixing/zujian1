<style lang="less">
.x-drag-xel{
    &.hover{
        box-shadow: 0 0 10px #ccc;
    }
    &wrap{
        padding: 1px 20px;
        // pointer-events: none;
    }
    .xel-item{
        margin-top: 5px;
        &.half{
            width: auto;
            float: none;
        }
    }
}
</style>
<template>
    <div class="x-drag-xel" :class="{hover:el.id==draghover.id}" 
        @dragenter="handleDragEnter($event,el)" 
        @dragleave="handleDragLeave($event,el)"
        @drop.stop.prevent="handleDragEnd($event,el)"
        @dragover.stop.prevent="handleDragOver"
        @dragend.stop.prevent="handleDragEnd($event,el)"
        >

        <div class="x-drag-xelwrap">
            <xel :data="el" :key="el.id" />
        </div>
    </div>
    
</template>
<script>
const c = 'x-drag-xel';

import xel from '../../components/xel';
import { uuid } from '../../libs/util';

export default {
    props:{
        el:{
            type:Object,
            required:true,
        }
    },
    data(){
        return {
            draghover:{}
        }
    },
    components:{
        xel,
    },
    methods:{
        handleDragEnter(e,el){
            const target = e.target;
                    console.log(123)
            if(target.classList.contains(c)){
                this.draghover=el;
            }
        },
        handleDragLeave(e,el){
            const target = e.target;
                    console.log(133)
            if(target.classList.contains(c)){
                this.draghover={};
            }
        },
        handleDragEnd(e,el){
            this.draghover={};
            const data = e.dataTransfer.getData('text');
                    console.log(data)
            if(data){
                try{
                    const j = JSON.parse(data);
                    this.$emit('insert-before',j,el);
                }catch(err){
                    console.error(err)
                }
            }
        },
        handleDragOver(){
        },
    }
}
</script>


