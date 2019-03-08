<style lang="less" scoped>
.analyseBar_GSX {
    position: relative;
    min-height: 33px;
    // line-height: 14px;
    font-size: 12px;
    margin-top: 5px;
    .title {
        position: absolute;
        left: 15px;
        top: 5px;
        display: inline-block;
        margin-bottom: 5px;
        width: 60px;
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
        padding-left: 100px; 
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
    <div class="analyseBar_GSX">
        <span class="title">{{title}}：</span>
        <div class="childAro" ref="aro">
            <span class="titleBar"
                v-if="!key2"
                v-for="(item, index) in tagList"
                :key="index"
                :class="{active:num === index}" 
                @click="addAcitveCon(item.id, index)"
                v-html="item[key1]"
                > 
            </span>
            <span class="titleBar"
                v-if="key2"
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

    // updated() {
    //     if (this.$refs.aro.offsetHeight > 33 && this.isFirst) {
    //         this.isShowToo = true
    //         this.$refs.aro.style.height = '33px'
    //     } 
    // },
    
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


