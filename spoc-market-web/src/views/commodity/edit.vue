<style lang="less">
.commodity-create-container{
    position: relative;
}
</style>
    
<template>
    <create-goods :goodsId="goodsId" :pId="pId"></create-goods>
</template>

<script>

import createGoods from './create.vue'

export default {
    props: {
        // pId: {
        //     type: String
        // },
    },
    data(){
        return {
            pId: 1023
        };
    },
    computed: {
        goodsId() {
            return this.$route.query.goodsId
        }
    },
    components: {
        createGoods
    },
    methods: {
        
    },
}
</script>


