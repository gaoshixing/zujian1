<style lang='less'>
    .base-infor-gsx {
        ul>li {
            display: inline-block;
            width: 50%;
            line-height: 33px;
            span {
                display: inline-block;
                width: 100%;
                i {
                    font-style: normal;
                    display: inline-block;
                    text-align: right;
                    width: 120px;
                    margin-right: 20px;
                    color: #b8b8b8;
                }
            }
        }
    }
</style>
<template>
    <div class="base-infor-gsx">
        <ul>
            <li v-for="item in baseList">
                <span>
                    <i class="left-name">{{item.name}}</i>
                    {{baseInfor[item.value]=='null'?'':baseInfor[item.value]}}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        baseInfor: {
            type: Object,
            default: () => {
                return {
                }
            }
        },
        baseList: {
            type: Array,
            default: () => {
                return [
                    // {name: 'ID', value: 'code'},
                    // {name: ' ', value: ' '},
                    {name: "姓名", value: 'name'},
                    {name: '微信openID', value: 'openId'},
                    {name: "手机号", value: 'phone'},
                    {name: "学生EC号", value: 'studentId'},
                    // {name: "微信号", value: 'wxId'},
                    {name: "报名时间", value: 'registrationTime'},
                ]
            }
        }
    },
}
</script>


