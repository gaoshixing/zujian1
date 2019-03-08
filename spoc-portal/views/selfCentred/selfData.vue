<style lang="less">
.self-data-container{
    position: relative;
}
</style>
    
<template>
<div class="self-data-container">
    <Tabs v-model="tabValue">
        <TabPane label="个人资料" name="0"></TabPane>
        <TabPane label="修改密码" name="1"></TabPane>
<!--         <TabPane label="我的反馈" name="2"></TabPane> -->
    </Tabs>

    <data-tabs v-if="tabValue == 0"></data-tabs>
    <password-tabs v-if="tabValue == 1"></password-tabs>
    <feedback v-if="tabValue == 2"></feedback>
</div>
</template>

<script>

import dataTabs from './components/data';
import passwordTabs from './components/password';
import feedback from './feedback';

export default {
    data(){
        return {
            tabValue: 0,
        };
    },
    components: {
        dataTabs,
        passwordTabs,
        feedback
    },
    methods: {
        
    }
}
</script>


