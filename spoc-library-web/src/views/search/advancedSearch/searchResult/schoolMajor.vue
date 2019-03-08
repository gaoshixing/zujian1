//专业库---本科专业
<style lang="less">

</style>
<template>
    <div class="tm_ad_search_school_major">
        <Form :label-width="90" label-position="left"> 
            <FormItem label="U.S.News学院排名: ">
                <v-slider :min="1" :groupArr="schoolRankingGroup" :start.sync="major_lib_school.schoolRankingStart" :end.sync="major_lib_school.schoolRankingStop"></v-slider>
            </FormItem> 
        </Form>
        <div class="btn">
            <Button @click="handleSearch">搜索</Button>
        </div>
    </div>
</template>
<script>
import  vSlider  from "../.../../../../../modules/vSlider";

let 
    schoolRankingGroup = [
        {k:'不限',v:','},
        {k:'1-10',v:'1,10'},
        {k:'11-30',v:'11,30'},
        {k:'31-50',v:'31,50'},
        {k:'51-100',v:'51,100'},
    ];
export default {
    name:'schoolMajorQuery',
    components: {
        vSlider
    },
    data () {
        return {
            schoolRankingGroup:schoolRankingGroup,
            major_lib_school:{
            country:'140',
            schoolRankingStart:'',
            schoolRankingStop:'',
            },
        }
    },
    methods: {
        handleSearch(){
            let obj  = Object.assign({},this.major_lib_school)
           this.$emit('search',obj) 
            this.$emit('input',3);
        },
    }
}
</script>
