<style lang='less'>
    .docuSubjectManageListGSX {
        .content {
            padding-right: 100px;
            position: relative;
            border-top: 1px solid #ccc;
            .handle {
                position: absolute; 
                right: 0;
                top: 14px;
            }
            .contentTitle, .parseAll {
                position: relative;
                .left {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                p {
                   text-align: right;
                   color:#999;
                   line-height: 30px;
                }
            }
            .titleContent {
                margin-left: 50px;
            }
        }
    }

</style>
<template>
    <div class="docuSubjectManageListGSX">
        <div class="content" v-for="(item, index) in data" :key="index">
            <div class="contentTitle">
                <span class="left"> 题目：</span>
                <div class="titleContent">
                    {{item.name}}
                </div>
                <p>
                   ({{item.name}}|{{item.createDate}})
                </p>
            </div>
            <div class="parseAll" v-for="(item1, index) in item.essayPromptInfoVOList" :key="index">
                <span class="left" >解析：</span>
                <div class="titleContent">
                    {{item1.answer}}
                </div>
                <p>
                   ({{item.createBy}}|{{item.createDate}})
                </p>
            </div>
            <Dropdown class="handle" @on-click="dropdownClick">
                <span style="color:#44bcbc" class="iconfont icon-caozuo"></span>
                <DropdownMenu slot="list" style="text-align:center">
                    <DropdownItem :name='"edit|"+item.id'>编辑</DropdownItem>
                    <DropdownItem :name='"dele|"+item.id'>删除</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    data() {
        return {
        }
    },

    methods: {
        dropdownClick(val) {
            this.$emit('handleModule', val)
        }
    }
}
</script>


