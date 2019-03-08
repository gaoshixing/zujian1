<style lang="less" scoped>
.analyseBar_GSX2 {
    position: relative;
    min-height: 33px;
    font-size: 12px;
    margin-top: 5px;
    .title {
        position: absolute;
        top: 5px;
        display: inline-block;
        margin-bottom: 5px;
        text-align: right;
        color: #b8b8b8;
    }
    .titleBar {
        padding: 5px 12px;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 5px;
        display: inline-block;
        &.active {
            background-color: #44bcb6;
            color: white;
        }
    }
  
    .childAro {
        padding-right: 35px;
        overflow: hidden; 
        .isSpread {
            position: absolute;
            right: 5px;
            bottom: 10px;
        }
    }
}
</style>
<template>
    <div class="analyseBar_GSX2">
        <span class="title" :style="{width:titleWidth +'px'}">{{title}}：</span>
        <div class="childAro"  :style="{'padding-left': titleWidth + 'px'}"  ref="aro">
            <span class="titleBar"
                v-show="!key2"
                v-for="(item, index) in tagList"
                :key="index"
                :class="{active:num === index}" 
                @click="addAcitveCon(item.id, index)"
                v-html="item[key1]"
                > 
            </span>
            <span class="titleBar"
                v-show="key2"
                v-for="(item, index) in tagList"
                :key="index"
                :class="{active:num === index}" 
                @click="addAcitveCon(item.id, index)"
                v-html="item[key1] + item[key2]"
                > 
            </span>
            <a class="isSpread" v-if="isShow&&isShowToo" @click="SpreadChick" >{{isSpread?'展开':'收起'}}</a>
        </div>
     </div>
</template>
<script>
export default {
  	props: {
        isShow: {
            type: Boolean,
            default: true,
        },
		title: {
			type: String,
			default: '中方顾问'
        },
        titleWidth:{
            type: Number,
            default: 60
        },
        key1: {
            type: String,
			default: 'remarks'
        },
        key2: {
            type: String,
            default: ''
        },
		tagList: {
			type: Array,
			default: function() {
				return [];
			}
        },
        num: {
            type: [String, Number],
            default: 0
        }
  	},
  	data() {
		return {
            isSpread: true,
            isShowToo: false,
            isFirst: true,
        };
    },

    mounted() {
        if(this.tagList.length > 20) {
            this.isShowToo = true
            this.$refs.aro.style.height = '33px'
        }
    },

    watch: {
        tagList() {
            if(this.tagList.length > 20) {
                this.isShowToo = true
                this.$refs.aro.style.height = '33px'
            } else {
                this.isShowToo = false
                this.$refs.aro.style.height = 'auto'
            } 
        }
    },

	methods: {
        addAcitveCon(id, index) {
            this.$emit('addAcitveCon', id, index);
        },
        SpreadChick() {
            this.isFirst = false
            this.isSpread = !this.isSpread
            if (this.isSpread) {
                this.$refs.aro.style.height='33px'
            } else {
                this.$refs.aro.style.height='auto'
            }
        }
	}
};
</script>


