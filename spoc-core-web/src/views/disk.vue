<style lang="less">
.disk-frame{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div>
        <iframe :src="frameSrc" frameborder="0" class="disk-frame" @load="onload"></iframe>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    data(){
        return {
            frameSrc:'/index.php/apps/files/'
        };
    },
    created(){
        this.updateLoadingStatus({isLoading:true});
    },
    beforeDestroy(){
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        onload(){
            this.updateLoadingStatus({isLoading:false});
        }
    }
}
</script>


