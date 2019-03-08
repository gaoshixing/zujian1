<template>
	<div class="pandect-info-box-boss">
		<ul class="pandect-info-box-ul">
			<slot></slot>
		</ul>
	</div>	
</template>

<script>
export default {
	name: 'PandectInfoBox',
	data() {
		return {

		};
	},
};
</script>

<style lang="less">
	.pandect-info-box-boss {
		display: inline-block;
		text-align: center;
		border-radius: 4px;
		width: 240px;
		min-height: 200px;
		border: solid 1px #e5e5e5;
		box-shadow: 0 0 10px #ccc;
		.pandect-info-box-ul {
			padding: 30px 0 20px 0;
			>li {
				margin-bottom: 10px;
				p {
					line-height: 32px;
				}
				p:nth-of-type(1) {
					font-size: 14px;
					color: rgb(153, 153, 153);
				}
				p:nth-of-type(2) {
					font-size: 20px;
					color: #44bcb7;
					display: inline-block;
				}
			}
		}
	}
</style>
