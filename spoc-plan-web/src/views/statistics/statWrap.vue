<style lang="less">

</style>
<template>
    <div>
        <person-statistics v-if="isPlanConsultant" :uid="userInfo.id"/>
        <statistics-index v-else :uid="userInfo.id"/>
    </div>
</template>
<script>

import personStatistics from './personStatistics';

import statisticsIndex from './statisticsIndex';

import {mapMutations,mapState,mapGetters} from 'vuex';

export default {
    data(){
        return {}
    },
    computed:{
        ...mapState(['userInfo']),
        ...mapGetters('plan',['isPlanConsultant']),

    },
    components:{
        personStatistics,
        statisticsIndex
    }
}
</script>


