<style lang="less">
.types-item{
    display: inline-block;
    font-size: 12px;
    background-color: #f1f1f1;
}
</style>
<template>
    <div class="types-item" v-text="label" draggable="true" @dragstart="onDragStart">
    </div>
</template>
<script>
import { uuid } from '../../libs/util';

export default {
    props:{
        label:{
            type:String,
            required:true,
        },
        model:{
            type:Object,
            required:true
        }
    },
    data(){
        return {};
    },
    methods:{
        onDragStart(e){
            const data = JSON.stringify(Object.assign({id:uuid()},this.model));
            e.dataTransfer.setData('text',data);
        }
    }
}
</script>


