<style lang="less">
.sign-rule-panel{
    padding-left: 40px;
    .rule-item{
        font-size: 14px;
        &+.rule-item{
            margin-top: 15px;
        }
        .span{
            color: #999;
            margin-right: 5px;
        }
        .num-in{
            margin-right: 5px;
        }
    }
}
</style>
<template>
<div class="sign-rule-panel">
    <ul>
        <li class="rule-item" v-for="(item,index) in rules" :key="index">
            <span class="span">
                {{index+1}}级权限免审核优惠条款单次使用数
            </span>
            <InputNumber class="num-in" :max="item.total" :min="0"  v-model="item.count"></InputNumber> / {{item.total}}
        </li>
    </ul>
</div>
</template>
<script>
export default {
    props:{
        rules:{
            type:Array,
            required:true
        }
    },
    data() {
        return {
            
        };
    }
}
</script>


