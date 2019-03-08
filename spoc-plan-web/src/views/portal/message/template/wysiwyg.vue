<style lang="less">
.wy-text{
        outline: none;
        resize: none;
        display: block;
        height: 100px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: none;
    }
</style>

<template>
    <div contenteditable="true" class="wy-text" v-text="msg"
    @keydown.up.stop.prevent="onKeyUp" 
    @keydown.down.stop.prevent="onKeyDown"  
    @keypress.enter.stop.prevent="onEnter" 
    @input="onInput"
    @click.stop="onClick">

    </div>
</template>
<script>
export default {
    props:{
        value:{
            type:String
        }
    },
    data(){
        return {
            msg:this.value
        };
    },
    methods:{
        onInput(e){
            this.msg = e.target.innerText;
            // this.$emit('input',this.msg);
        },
        onClick(){

        },
        onKeyUp(){

        },
        onKeyDown(){

        },
        onEnter(){

        }

    }
}
</script>

