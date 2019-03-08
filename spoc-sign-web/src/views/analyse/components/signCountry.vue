<style lang="less">
    .signCountry {
        margin-bottom: 10px;
        font-size: 14px;
  }
</style>
<template>
    <p class="signCountry">
        <span style="color:#b8b8b8">合同分类 ：</span>
        <Select v-model="model1" style="width:150px;margin-left:10px;">
        <Option v-for="item in countryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:150px;margin-left:20px;">
        <Option v-for="item in countryType" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:150px;margin-left:20px;">
        <Option v-for="item in countrySeason" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:150px;margin-left:20px;">
        <Option v-for="item in countryGrade" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </p>
</template>
<script>
export default {
    props: {
        countryList: {
            type: Array,
            default: [
            {value: '美国', label: '美国'},
            {value: '澳大利亚', label: '澳大利亚'},
            {value: '英国', label: '英国'},
            {value: '加拿大', label: '加拿大'},
            {value: '新西兰', label: '新西兰'},
            ]
        },
        countryType: {
            type: Array,
            default: [
            {value: '全部', label: '全部'},
            {value: 'Elite', label: 'Elite'},
            {value: '中美方', label: '中美方'},
            {value: '纯中方', label: '纯中方'},
            {value: '高中', label: '高中'},
            {value: '艺术', label: '艺术'},
            ]
        },
        countrySeason: {
            type: Array,
            default: [
            {value: '全部', label: '全部'},
            {value: '当季', label: '当季'},
            {value: '规划', label: '规划'},
            ]
        },
        countryGrade: {
            type: Array,
            default: [
            {value: '全部', label: '全部'},
            {value: '高中', label: '高中'},
            {value: '本科', label: '本科'},
            {value: '硕士', label: '硕士'},
            {value: '博士', label: '博士'},
            ]
        },
    },
    data() {
        return {
        }
    }
}
</script>

