<style lang="less">

</style>
<template>
    <div> 
        <form-m v-if="isAdmin||isCeo||isHeaderOfficeLeader" />
        <form-detail v-if="!isAdmin&&!isCeo&&!isHeaderOfficeLeader" :compId="userInfo.companyId"/>
       
    </div>
</template>
<script>

import formDetail from './formDetail';

import formM from './formM';

import {mapMutations,mapState,mapGetters} from 'vuex';

export default {
    data(){
        return {}
    },
    computed:{
        ...mapState(['userInfo']),
        ...mapGetters('crm',['isAdmin', 'isCeo', 'isHeaderOfficeLeader']),
    },
    components:{
        formDetail,
        formM
    }
}
</script>