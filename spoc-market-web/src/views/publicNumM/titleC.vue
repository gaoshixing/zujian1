<style lang='less'>
    .title-c-gsx {
        .public-title {
            padding-top: 50px;
            width: 100%;
            margin: 0 auto;
            text-align: center;
            height: 150px;
            .bg {
                width:80%;
                height: 12px;
                background:#ccc;
                position: relative;
                margin: 0 auto;
                top: 12px;
            }
            p:nth-of-type(2) {
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
            .item {
                height: 12px;
                text-align: center;
                float: left;
                position: relative;
                .process {
                    position: absolute;
                    left: 50%;
                    background-color: #fff;
                    color: #000;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 16px;
                    display: inline-block;
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    line-height: 50px;
                    border: 8px solid #ccc;
                }
                .process-name {
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    font-size: 14px;
                    transform: translateX(-50%)
                }
            }
        }
    }
</style>
<template>
    <div class="title-c-gsx">
        <div class="public-title">
            <p class="bg"></p>
            <p class="item" v-for="(item, index) in newTitleList" :key="index" :style="{width:100/newTitleList.length+'%', background:item.isAct?'#44bcbc':'#ccc',borderTopRightRadius:index+1==process||newTitleList.length==index+1?'6px':'0',borderBottomRightRadius:index+1==process||newTitleList.length==index+1?'6px':'0',}">
                <span class="process" :style="{borderColor:item.isAct?'#44bcbc':'#ccc'}">{{item.num}}</span></br>
                <span class="process-name" :style="{color:item.isAct?'#000':'#ccc',}">{{item.name}}</span>
            </p>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        newTitleList: {
            type: Array,
            default: () => {
                return  [
                    {name: '基本信息', num: '1', isAct: true},
                    {name: '配置公共平台', num: '2', isAct: false},
                    {name: '保存接口配置', num: '3', isAct: false},
                ]
            }
        }
    },
    data() {
        return  {
            process: '1'
        }
    },

    watch: {
        newTitleList(newV, oldV) {
            this.process = 0
            newV.forEach((item, index) => {
                if (item.isAct) {
                    this.process++
                }
            })
        }
    }
}
</script>
