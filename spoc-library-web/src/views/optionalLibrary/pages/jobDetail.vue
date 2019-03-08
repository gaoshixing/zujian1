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
        <h3 class="title">职业详情</h3>
        <div v-if="ready">
            <div class="d-item clearfix">
                <div class="d-item-name">职业名称</div>
                <div class="d-item-text" v-html="data.name"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">What you do</div>
                <div class="d-item-text" v-html="data.todo"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">Did you know</div>
                <div class="d-item-text" v-html="data.know"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">Are you ready to</div>
                <div class="d-item-text" v-html="data.ready"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">It helps to be</div>
                <div class="d-item-text" v-html="data.help"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">Make high school count</div>
                <div class="d-item-text" v-html="data.beneficialCourse"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">Outlook</div>
                <div class="d-item-text" v-html="data.outlook"></div>
            </div>
            <div class="d-item clearfix">
                <div class="d-item-name">Compensation</div>
                <div class="d-item-text" v-html="data.compension"></div>
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
            major.getByJobID(this.$route.query.id).then(valid.call(this)).then(res=>{
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


