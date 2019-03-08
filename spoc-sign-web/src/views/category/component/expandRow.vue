<style lang="less">
	.res-expand-row {
		.row-item {
			overflow: hidden;
			line-height: 40px;
			.item-foldable{
				cursor: initial;
			}
			.iconfont{
				color: #d9d9d9;
				transition: all 0.3s ease;
				cursor: pointer;
			}
			.hiddenIconfont{
				display: none;
			}
		}
	}
</style>
<template>
	<div class="res-expand-row">
		<div class="row-item">
			<div class="item-foldable"></div>
			<div class="item-name">
				<span @click="toggleFold" :style="{marginLeft:left+'px'}">    
					<i class="iconfont" :class="[foldcls,{hiddenIconfont:!subTree}]"></i>
				</span>	
				{{data.name}}
			</div>
			<div class="item-contractCount">
				{{data.count}}
			</div>
			<div class="item-ctrls">
				<a href="javascript:void(0)" class="linkbtn" v-for="item in eventList" :key="item.id" @click="item.event(data)" v-html="item.eventName"></a>
			</div>
		</div>
		<!-- for futrue -->
		<slot name="subTree" v-if="state.visible"></slot>
	</div>
</template>
<script>
export default {
	name:'expandRow',
	props:{
		data:{
			type:Object,
			default:function(){
                return {};
			},
		},
		subTree:{
			type:Boolean,
			default:false,
		},
		eventList:{
			type:Array,
			default:()=>{
				return [];
			}
		},
		marginLeft:{
			type:Number,
			default:20
		}
	},
	data () {
		return {
			state:{
				visible:false
			}
		}
	},
	computed: {
		foldcls(){
            return {
                'icon-tright':!this.state.visible,
                'icon-xiala':this.state.visible,
            };
		},
		left(){
			return this.marginLeft;
		}	
	},
	methods: {
		toggleFold(){
			this.state.visible = !this.state.visible;
		},
	}
}
</script>
