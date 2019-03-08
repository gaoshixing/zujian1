<style lang="less">
.library_page_certificate{
    width: 760px;
    margin: 20px auto;
    .title{
        border-bottom: 1px solid #ddd;
        font-size: 24px;
    }
    .d-item{
        margin: 20px 0;
        font-size: 14px;
        &-name{
            float: left;
            width: 100px;
        }
        &-text{
            float: right;
            width: 600px;
        }
    }

}
</style>
<template>
    <div class="library_page_certificate">
        <h3 class="title">执业资格详情</h3>
        <div v-if="ready">
            <div class="d-item clearfix">
                <div class="d-item-name">名称</div>
                <div class="d-item-text" v-html="data.name"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">简介</div>
                <div class="d-item-text" v-html="data.descr"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">报考资格</div>
                <div class="d-item-text" v-html="data.qualification"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">考试课程</div>
                <div class="d-item-text" v-html="data.officeCource"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">考试规则</div>
                <div class="d-item-text" v-html="data.rule"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">考试内容</div>
                <div class="d-item-text" v-html="data.content"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">获得工作经验、拿到证书</div>
                <div class="d-item-text" v-html="data.cerRequire"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">官方网站</div>
                <div class="d-item-text" v-html="data.officeUrl"></div>
            </div>
        </div>
    </div>
</template>
<script>
import valid, { errors, major } from "../../../libs/request.js";
import {mapMutations,mapGetters} from 'vuex';

export default {
    data(){
        return {
            data:{},
            ready:false,
        };
    },
    created(){
        this.updateLoadingStatus({isLoading:true});
        setTimeout(()=>{
            this.getData();
        },100);
    },
    methods:{
        ...mapMutations(['updateLoadingStatus']),
        getData(){
            this.updateLoadingStatus({isLoading:true});
            major.getByCertificateID(this.$route.query.id).then(valid.call(this)).then(res=>{
                if(res.ok){
                    this.data = res.data.data;
                    this.ready = true;
                }
            }).catch(errors.call(this)).finally(()=>{
                this.updateLoadingStatus({isLoading:false});
            });
        }
    }
}
</script>


