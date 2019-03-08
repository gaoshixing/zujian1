<style lang='less'>
    .mass-aro-com-gsx {
        li {
            list-style: none
        }
        .mass-item {
            position: relative;
            padding-left: 85px;
            margin-bottom: 20px;
            .item-title {
                color: #999;
                display: inline-block; 
                width: 80px;
                position: absolute;
                left: 0;
                top: 0px;
                i {
                    color: red;
                    font-style: normal;
                }
            }
            .choose-fodder {
                width: 242px;
                background-color: #f8f8f8;
                min-height: 95px;
                border: 1px solid #f0f2fa;
                cursor: pointer;
                position: relative;
                .fodder-font {
                    font-size: 26px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    z-index: 88888;
                    transform: translate(-50%, -50%);
                    opacity: .2;
                }
            }
        }
        .type-item {
            padding: 6px 12px;
            cursor: pointer;
            margin-right: 20px;
        }
        .action {
            background-color: #44bcbc;
            color: #fff;
        }
    }
</style>
<template>
    <ul class="mass-aro-com-gsx">
        <li class="mass-item" v-if="isChoose">
            <span class="item-title"><i>*</i> 素材类型：</span>
            <span class="type-item" v-for="(item, index) in massTypeList" :key="index" @click="massType(item, index)" :class="{'action':num1-1 == index}">{{item.name}}</span>
        </li>
        <li class="mass-item" v-else>
            <span class="item-title"><i>*</i> 素材类型：</span>
            {{massTypeList[nums-1].name}}
        </li>
        <li class="mass-item">
            <span class="item-title"><i>*</i> 素材类型：</span>
            <div class="choose-fodder" @click="massFodder">
                <show-fodder
                    :num1='nums'
                    ref="fodderModel"
                    @fodderInfo='fodderInfo'
                    :id="fodderId"
                >
                </show-fodder>
            </div>
        </li>
    </ul>
</template>

<script>
import showFodder from './showFodder.vue'

export default {
    props: {
        num1: {
            type: [Number, String],
            default: 0,
            require: true,
        },
        fodderId: {
            type: String,
            default: '',
        },
        isChoose: {
            type: Boolean,
            default: true,
        },
        massTypeList: {
            type: Array,
            default: () => {
                return [
                    {type: 'news', name: '图文素材'},
                    {type: 'image', name: '图片素材'},
                    {type: 'voice', name: '语音素材'},
                    {type: 'video', name: '视频素材'},
                    {type: 'text', name: '文本素材'},
                ];
            },
        },
    },
    data() {
        return {
            autoTypeAuto: 'news',
            nums: this.num1,
        }
    },
    watch: {
        nums(newVal) {
            this.$emit('numChanges', newVal);
        },
    },
    components: {
        showFodder,
    },

    methods: {
        clearData() {
            this.$refs.fodderModel.fodderObj={
                voiceTime: '',
                content: '',
                title: '',
                fileSize: '',
                list: [{coverUrl: '', title: ''}]
            }
        },

        massFodder() {
            this.$emit('getListPage');
            if (!this.isChoose) return
            this.$refs.fodderModel.getListPage()
        },
        getListPage() {
            this.$refs.fodderModel.getListPage();
        },
        massType(item, index) {
            if (this.nums == index+1) return
            this.$refs.fodderModel.fodderObj = {
                voiceTime: '',
                content: '',
                title: '',
                fileSize: '',
                list: [{coverUrl: '', title: ''}]
            }
            this.autoTypeAuto = item.type
            this.nums = index + 1
            this.$emit('fodderInfo', {}, this.autoTypeAuto)
        },

         /**
         *   素材id
         */
        fodderInfo(value) {
            this.$emit('fodderInfo', value, this.autoTypeAuto)
        },
    }
}
</script>
