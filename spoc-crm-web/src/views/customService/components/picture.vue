<style lang="less">
.picture-component-container{
    @greeny-blue: #44bcb7;
    position: relative;
    .type-img{
        float: left;
        color: @greeny-blue;
        width: 90px;
        height: 30px;
        line-height: 30px;
        & > .ivu-icon {
            font-size: 20px;
            position: relative;
            top: 2px;
            cursor: pointer;
        }
    }
}
</style>
    
<template>
<div class="picture-component-container">
    <div class="type-img">
        <Icon type="image" @click.native="showImgBox"></Icon>
        <span>图片 {{ imgList.length }}</span>
        <up-img ref="img1" :setimg="imgList" 
            :cfg="cfg" :maxNum="0" 
            v-show="!addItem.show && addItem.img.visible" 
            @close="close" 
            @on-change="onImgChange" 
            @onDelImg="delImg"
            class="abs-img"/>
    </div>
</div>
</template>

<script>

import upImg from "../../detail/components/upImg";
import { MENUIDS } from '@public/libs/config.js'
import { clone } from '@public/libs/util.js'
import valid, {errors, sys} from '../../../libs/request.js';

export default {
    props: {
        setimg:{
            type:Array,
            default:()=>{
                return [];
            }
        },
    },
    data(){
        return {
            imgList: clone(this.setimg),
            addItem: {
				show: false,
				img: {
					visible: false
				},
			},
            cfg: {
                api:'/',
                k:'files',
                data:{
                    dirName:'all',
                    type:'crm_cus_img',
                    menuId:MENUIDS.CRM
                },
                maxsize:1024*1024*5,
            },
        };
    },
    components: {
        upImg
    },
    methods: {
        listsEmpty() {
            this.imgList = [];
        },
        onImgChange(v){
            this.imgList = v;
            let picIds = [];
            v.forEach(item => {
                picIds.push(item.id);
            });
            this.$emit('onChangPicture', picIds);
		},
        showImgBox() {
			this.addItem.img.visible = true;
        },
        close(){
			this.addItem.img.visible = false;
        },
        delImg(item) {
            sys.delete({id: item.id}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    
                }
            }).catch(errors.call(this));
        }
    },
}
</script>


