<style lang="less">
@green:#3cb4ae;
.sendbox-wrapper{
    border-top: 1px solid #eee;
    height: 140px;
    box-sizing: border-box;
    position: relative;
    .hidden{
        display: none;
    }
    .tool-box{
        height: 40px;
        .tool-item{
            float: left;
            width: 40px;
            height: 100%;
            line-height: 40px;
            text-align: center;
            .iconfont{
                cursor: pointer;
                color: #aaa;
                transition: color 0.2s ease;
                font-size: 18px;
                &:hover{
                    color: @green;
                }
            }
        }
    }
    .popup{
        position: absolute;
        z-index: 44;
        .atbox{
            &.angle{
            }
        }
        .upfile{
            transform: translate(50px, -115px);
        }
        .emoji{
            transform: translate(-40px,-114px);
            position: absolute;
            top: -100px;
        }
    }
    .text{
        outline: none;
        resize: none;
        display: block;
        height: 90px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: none;
    }
    .img-list{
        outline: none;
        max-height: 94px;
        overflow: auto;
        padding: 10px;
        .s-img{
            max-width: 100px;
            max-height: 80px;
            box-shadow: 1px 1px 6px #ddd;
            &:hover{
                box-shadow: 1px 1px 14px #ccc;
            }
        }
    }
}
</style>
<template>
  <div class="sendbox-wrapper">
      <up-to-pan ref="uptopan" :dir="dir" :object-id="group.id" type='portalmsg' @uploadok="onUploadOk" />
      <div class="tool-box">
          <div class="tool-item" v-for="(item,index) in toolbox" :key="index">
              <i class="iconfont" :class="item.icon" @click.stop="onToolClick(item,index)"></i>
          </div>
      </div>
      <div class="popup">
        <atbox v-if="atbox.visible" class="atbox" :class="{angle:atbox.angle}" :style="textpos" :group="group" :active="atbox.active" @hover="onHover" @choose="onUserChoose"></atbox>
        <upfile v-else-if="upfile.visible" class="upfile" @uploadLocal="onUploadLocal" @uploadPan="onUploadPan" ></upfile>
        <emoji v-else-if="emoji.visible" class="emoji" @choose="onEmojiChoose"></emoji>
      </div>
      
      <div>
          <textarea v-if="showtext" class="text" v-model="msg" placeholder="按Enter发送消息" 
          @input="onInput"
          @keydown.up.stop.prevent="onKeyUp" 
          @keydown.down.stop.prevent="onKeyDown" 
          @keypress.enter.stop.prevent="onEnter" 
          @keydown.esc="onEsc"
          @paste.stop="onPaste"
          @click.stop="onClick"></textarea>
          <div v-else class="img-list" 
          @paste.stop="onPaste"
          @keypress.enter.stop.prevent="onImgEnter"
          @input="onImgInput"
          contenteditable="true">
              <img class="s-img" :src="item.url" alt="" v-for="(item,index) in imgFile" :key="index+'c'+item.size">
          </div>
      </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex';
import atbox from './atbox.vue';
import upfile from './upfile.vue';
import emoji from './emoji.vue';
import valid,{ errors ,plFile, sys } from '../../../../libs/request.js';
import { config ,util } from '../connection/socket.js';
import getCaretCoordinates from '../connection/area.js';
import {MENUIDS} from "@public/libs/config.js";
import upToPan from '../../../../modules/planUpToPan'






const msg ='文件大小必须大于0';
const errTooLong ='消息不能大于800字';
const maxlen = 800;
export default {
    props:{
        group:{
            type:Object,
            required:true,
        }
    },
    data(){
        return {
            msg:'',
            pos:{},
            toolbox:[
                {icon:'icon-aite',handler:this.onShowAt},
                {icon:'icon-biaoqing',handler:this.onShowEmoji},
                {icon:'icon-wenjian',handler:this.onShowUpfile},
                {icon:'icon-youjian'},
                {icon:'icon-lishixiaoxi',handler:this.onShowHistory}
            ],
            atbox:{
                visible:false,
                enable:true,
                eq:1e9,
                index:0,
                angle:true,
                active:{
                    name:'所有人'
                }
            },
            upfile:{
                visible:false,
            },
            emoji:{
                visible:false,
            },
            imgFile:[],
            imgtext:'',
        }
    },
    computed:{
        dir(){
            return this.group.folderName?this.group.folderName:''
        },
        users(){
            return this.group.members;
        },
        textpos(){
            if(this.atbox.angle){
                return {
                    position: 'absolute',
                    left: '-60px',
                    transform: 'translateY(-100%)',
                    top: '-45px'
                };
            }
            return {
                position: 'absolute',
                left:this.pos.left+'px',
                top:this.pos.top+'px',
                transform: 'translateY(-95%)'
            }
        },
        showtext(){
            return this.imgFile.length === 0 && this.imgtext ==='';
        }
    },
    components:{
        atbox,
        upfile,
        emoji,
        upToPan
    },
    created(){

    },
    mounted(){
        this.textarea= this.$el.querySelector('.text');
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        onToolClick(item,index){
            if(item.handler){
                item.handler.call(this,item,index);
            }
        },
        onShowAt(){
            if(!this.users.length){
                return this.$Message.error('no members');
            }
            this.atbox.visible = !this.atbox.visible;
            this.atbox.angle = true;
            this.upfile.visible = false;
            this.emoji.visible = false;
        },
        onShowUpfile(){
            this.upfile.visible = !this.upfile.visible;
            this.emoji.visible = false;
            this.atbox.visible = false;
        },
        onShowEmoji(){
            this.emoji.visible = !this.emoji.visible;
            this.upfile.visible = false;
            this.atbox.visible = false;
        },
        onEmojiChoose(emId){
            this.emoji.visible=false;
            const msg = `<${emId}/>`;
            this.$emit('onsend',{content:msg,type:config.MSG_TYPE_TEXT})
        },
        onShowHistory(){
            this.$emit('on-history');
        },
        initIndex(){
            this.atbox.eq=1e9*this.users.length;
        },
        onEnter(){
            if(this.atbox.visible){
                return this.chooseAt();
            }
            if(this.msg.length>maxlen){
                return this.$Message.error(errTooLong);
            }
            this.$emit('onsend',{content:this.msg,type:config.MSG_TYPE_TEXT});
            this.clearMsg();
        },
        onImgEnter(){ // 包含图片的发送
            this.updateLoadingStatus({isLoading:true});
            let i = 0,j=this.imgFile.length;
            const onend = ()=>{
                if(this.imgtext){
                    this.$emit('onsend',{content:this.imgtext,type:config.MSG_TYPE_TEXT});
                }
                this.imgFile=[];
                this.imgtext='';
                this.updateLoadingStatus({isLoading:false});
            };
            const doupload = () => {
                if(i>=j){
                    return onend();
                }
                const item = this.imgFile[i];
                this.uploadImg(item).then(res=>{
                    if(res.ok){
                        const { fileId , fileName } = res.data.data;
                        const data = {
                            type:config.MSG_TYPE_IMG,
                            content:fileName,
                            to:this.group.id,
                            ext1:fileId,
                            ext2:item.size,
                            ext3:this.dir
                        };
                        if(!data.ext2){
                            this.$Message.error(msg);
                        } else{
                            this.$emit('onsend',data);
                        }
                    }
                }).finally(()=>{
                    i++;
                    doupload();
                });
            }
            doupload();

        },
        clearMsg(){
            this.msg='';
        },
        chooseAt(str=''){
            const active = this.atbox.active;
            const pos = util.getCursortPosition(this.textarea);
            const msg = this.msg.substr(0,pos);
            const msg2 = this.msg.substr(pos);
            this.msg = msg+str+active.name+msg2;
            this.atbox.active={};
            this.atbox.visible = false;
            this.initIndex();
        },
        onHover(user,index){
            this.atbox.active=user;
            this.atbox.eq=1e9*this.users.length+index;
        },
        onUserChoose(user,index){
            this.chooseAt(' @')
        },
        onClick(){
        },
        onInput(e){
            this.pos = getCaretCoordinates(this.textarea, this.textarea.selectionEnd);
            if(e.data=='@'){
                this.atbox.angle=false;
                this.atbox.visible=true;
            }
        },
        onKeyUp(){
            this.atbox.eq--;
            const index = this.atbox.eq % this.users.length;
            this.atbox.index=index;
            this.atbox.active=this.users[index];
        },
        onKeyDown(){
            this.atbox.eq++;
            const index = this.atbox.eq % this.users.length;
            this.atbox.index=index;
            this.atbox.active=this.users[index];
        },
        onUploadLocal(){
            this.$refs.uptopan.doUpload();
            this.upfile.visible = false;
        },
        onUploadPan(data){
            this.upfile.visible=false;
            data.to = this.group.id;
            if(!data.ext2){
                this.$Message.error(msg);
            }
            this.$emit('onsend',data);
        },
        onUploadOk(res,file){
            const { fileId , fileName } = res.data;
            const data = {
                type:config.MSG_TYPE_SHARE,
                content:fileName,
                to:this.group.id,
                ext1:fileId,
                ext2:file.size,
                ext3:this.dir
            };
            if(!data.ext2){
                this.$Message.error(msg);
            }
            this.$emit('onsend',data);
        },
        onEsc(){
            this.atbox.visible = false;
        },
        onPaste(e){
            const items = e.clipboardData.items;
            if(items.length){ // chrome firefox safari tested ok
                for(let i=0,l=items.length;i<l;i++){
                    const item = items[i];
                    if(item.kind=='file' && item.type.indexOf('image')>=0){ // is image
                        e.preventDefault();
                        if(this.imgFile.length>=5){
                            return this.$Message.error("单次最多发送5张图片");
                        }
                        const f = item.getAsFile();
                        if(!f){ // copy on local fs
                            return
                        }
                        const url = URL.createObjectURL(f)
                        f.url = url;
                        this.imgFile.push(f);
                        if(this.imgFile.length===1){
                            this.$nextTick(()=>{
                                const el = this.$el.querySelector('.img-list');
                                if(this.msg !=''){
                                    el.innerHTML=this.msg + el.innerHTML;
                                    this.msg='';
                                }
                                setTimeout(()=>{
                                    el.focus();
                                },100);
                            });
                        }
                    } else if(item.kind == 'string' && item.type=='text/plain'){
                        // ok
                    } else {
                        e.preventDefault();
                    }

                }
            }
        },
        onImgInput(e){
            const el = this.$el.querySelector('.img-list');
            const imgs = el.querySelectorAll('.s-img');
            const imgids =[];
            imgs.forEach(item=>{
                imgids.push(item.src);
            });
            this.imgFile = this.imgFile.filter(item=>{
                return imgids.includes(item.url);
            });
            this.imgtext = el.textContent.trim();
            if(this.imgtext.length>maxlen){
                return this.$Message.error(errTooLong);
            }
        },
        uploadImg(f){
            const data = new FormData();
            data.append('files', f);
            data.append('fileName',`screenshot${+new Date()}.png`);
            data.append('filePath', this.dir);
            data.append('fileType', 'images');
            data.append('objectId', this.group.id);
            data.append('type', 'portalmsg');
            data.append('isCover',1);
            data.append('menuId', MENUIDS.PLAN);
            return sys.uploadToPan(data).then(valid.call(this)).catch(errors.call(this));
        }

    },
    watch:{
        showtext(v){
            if(v){
                setTimeout(()=>{
                    const el = this.$el.querySelector('.text');
                    el.focus();
                },100);
            }
        }
    }
}
</script>


