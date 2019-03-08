<style lang="less">
@green:#3cb4ae;

.upitem-list{
    box-shadow: 0 0 5px rgba(1, 1, 1, 0.4);
    padding: 10px 0;
    background-color: #fff;
    border-radius: 4px;
    width: 100px;
    position: relative;
    &:after{
        content: " ";
        border: 6px solid #fff;
        border-left-color: transparent;
        border-bottom-color: transparent;
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(135deg);
        box-shadow: 2px -2px 2px rgba(1, 1, 1, 0.12);
    }
    .uptype{
        height: 26px;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        &:hover{
            background-color: @green;
            color: #fff;
        }
    }
    
}

</style>
<template>
    <div>
        <div class="upitem-list" v-show="showmenu">
            <div class="uptype" @click="onUploadLocalFile">本地文件</div>
            <div class="uptype" @click="onUploadPan">藤门云盘</div>
        </div>
        <yunpan @on-confirm="doSendFile" @on-cancel="doCancel" :visible="pan.visible"></yunpan>
    </div>
</template>
<script>
import { config,util } from '../connection/socket.js';

import yunpan from '@public/modules/yunpan';
export default {
    data(){
        return {
            showmenu:true,
            pan:{
                visible:false
            },
        }
    },
    
    components:{
        yunpan
    },
    
    methods:{
        onUploadLocalFile(){
            this.$emit('uploadLocal');
        },
        onUploadPan(){
            this.pan.visible = true;
        },
        doSendFile(item){
            const data = {
                type:config.MSG_TYPE_SHARE,
                content:item.name,
                ext1:item.id,
                ext2:item.size,
                ext3:item.dir
            };
            this.$emit('uploadPan',data);
            this.close();
        },
        doCancel(){
            this.close();
        },
        close(){
            setTimeout(()=>{
                this.$parent.upfile.visible=false;
            },300);
        }
        
    }
}
</script>


