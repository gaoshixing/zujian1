<style lang="less">
.data-container{
    position: relative;
    h2{
        line-height: 45px;margin-top: 25px;
        font-size: 16px;color: #333;
    }
    .img{
        position: relative;padding-left: 100px;height: 91px;
        
        .btn{
            margin-top: 15px;width: 94px;height: 30px;font-size: 14px;padding: 0;
        }
        p{
            line-height: 40px;color: #999;
        }
    }
    .img-box{
        @w: 72px;
        position: absolute;left: 3px;top: 0;width: @w;height: @w;background: #ddd;
        img{
            display: block;width: 100%;height: 100%;
        }
    }
    .item{
        height: 33px;
        line-height: 33px;position: relative;padding-left: 84px;color: #333;font-size: 14px;
        span{
            position: absolute;left: 0;width: 84px;top: 0;
            text-align: right;color: #999;
        }
    }
}
</style>
    
<template>
<div class="data-container">
    <h2>个人头像</h2>
    <div class="img">
        <div class="img-box">
            <img :src="userInfo.photo" alt="">
        </div>
        <Upload :action="imgAction"
            :data="uploadData"
            name="avatar"
            :show-upload-list="false"
            :on-success="uploadSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="3000">
            <Button type="primary" class="btn">上传头像</Button>
        </Upload>
        <p>（支持上传JPG、PNG、JPEG、BMP格式图片，不大于3M。）</p>
    </div>
    <h2>基本资料</h2>
    <div class="detail">
        <div class="item">
            <span>姓名：</span>
            <p>{{ userInfo.name }}</p>
        </div>
        <div class="item">
            <span>公司名称：</span>
            <p>{{ userInfo.companyName }}</p>
        </div>
        <div class="item">
            <span>部门名称：</span>
            <p>{{ userInfo.officeName }}</p>
        </div>
        <div class="item">
            <span>邮箱：</span>
            <p>{{ userInfo.email }}</p>
        </div>
        <div class="item">
            <span>手机号码：</span>
            <p>{{ userInfo.mobile }}</p>
        </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex';
import valid, {errors, sys} from '../../../libs/request.js';

export default {
    data(){
        return {
            tabValue: 0,
            imgAction: '',
            uploadData: {
                objectId: '',
                type:"secretaire", 
                fileType:"all",
                dirName:'images',
            },
        };
    },
    computed: {
        ...mapState(['userInfo']),
    },
    mounted() {
        this.imgAction = sys.uploadImg();
    },
    methods: {
        uploadSuccess(response) {
            let data = {
                photo: response.data.filePath
            }
            sys.savePhoto(data).then(valid.call(this)).then(res => {
                if(res.ok) {
                    this.registerModule();
                }
            }).catch(errors.call(this))
        },
        registerModule(){
			this.$store.dispatch('portal/getUserInfo');
		},
    },
}
</script>


