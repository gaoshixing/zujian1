<style lang="less">
.img-viewer{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(1, 1, 1, 0.5);
    display: flex;
    justify-content:center;
    align-items:center;
    z-index: 123;
    .img-one{
        max-width: 90vw;
        max-height: 90vh;
    }
}
</style>
<template>
    <div class="img-viewer" v-show="visible" @click="close">
        <img class="img-one" :src="src" alt="" @click.stop>
    </div>
</template>
<script>
export default {
    props:{
        src:{
            type:String,
            required:true
        }
    },
    data(){
        return {
            visible:false
        }
    },
    methods:{
        show(){
            this.visible=true;
        },
        close(){
            this.visible=false;
        }
    }
}
</script>


