<style lang="less">
	.progress{
		/*margin: auto;*/
		width: 122px;
		padding: 12px 0;
		p{
			font-size: 12px;
			text-align: left;
			line-height: 26px;
		}
		.ivu-progress{
			.ivu-progress-inner{
				border: 1px #ebebeb solid;
    			border-radius: 4px;
    			background-color:#ffffff;
				.ivu-progress-bg{
	    			border-radius: 4px;
	    			background-color:#8ae6e1;
				}
			}
		}
	}
</style>

<template>
	<div class="progress">
		<p>{{percent}} %</p>
    	<Progress :percent="percent" hide-info :stroke-width="15"/>
	</div>
</template>

<script>
	export default{
		props:{
			percent:{
				type:[String,Number],
				default:0
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

