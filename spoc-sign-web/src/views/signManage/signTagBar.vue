<style lang="less">
.analyseBar {
    line-height: 32px;
        .titleBar {
        font-size: 12px;
        span {
            padding: 4px 8px;
            cursor: pointer;
            margin-right: 5px;
        }
        span:first-child {
            cursor: auto;
            color: #b8b8b8;
			padding: 0;
			margin-right: 15px;
        }
        .active {
            background-color: #44bcb6;
            color: white;
        }
   }
}
</style>
<template>
    <div class="analyseBar">
       <div class="titleBar">
         <p><span style="margin-right:15px;">{{title}}：</span><span  v-for="(item, index) in controlledList" :class="{active:num === index}" @click="addAcitve(index)">{{item}} </span></p>
       </div>
     </div>
</template>
<script>
export default {
  	props: {
		title: {
			type: String,
			default: '　分公司'
		},

		num: {
			type: Number,
			default: 0,
		},

		controlledList: {
			type: Array,
			default: function() {
				return [];
			}
		}
  	},
  	data() {
		return {};
  	},
	methods: {
		addAcitve(index) {
			this.$emit('getIndex', index)
		}
	}
};
</script>


