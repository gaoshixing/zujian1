<style lang="less" scoped>
.analyseBarFilter {
    display: inline-block;
    line-height: 32px;
    font-size: 12px;
    
    .active {
       
    }
}

</style>
<template>  
    <div class="analyseBarFilter">
       
        
     </div>
</template>
<script>
import valid, { errors, common, sys } from "../libs/request";

export default {
    props: {
        selectList: {
            type: Array,
            default: () => {
                return []
            }
        },
    },

    data() {
        return {
           
        };
    },

    computed: {
        more() {
            return this.moreCheckList
        }
    },

    mounted() {
    },

    methods: {
        //为tagListAll赋值，渲染标签选择页面。ID不同，渲染的内容不同
       
    }
};
</script>
