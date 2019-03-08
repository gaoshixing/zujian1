<style lang="less">
.preview-form-container{
    position: relative;
}
</style>
    
<template>
<div class="preview-form-container">
    <xformview v-if="showXForm" ref="applySchoolTable" :fid="formId"/> 
</div>
</template>

<script>

import xformview from '../../../../spoc-plan-web/src/views/xform/xformview.vue' 

export default {
    props: {
        
    },
    data(){
        return {
            showXForm: false
        };
    },
    computed: {
        formId() {
            return this.$route.query.formId
        },
    },
    components: {
        xformview
    },
    mounted(){
        if(this.formId) this.showXForm = true;
    },
    methods: {
        
    },
}
</script>


