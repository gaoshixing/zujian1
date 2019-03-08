<style lang="less">
	.crm_name {
		height: 100%;
		padding: 12px 0;
		.name {
			position: relative;
			display: inline-block;
			white-space: nowrap;
			.worry {
				position: absolute;
				top: -10px;
				right: -14px;
				color: red;
				z-index: 999;
			}
			.orderType {
				display: inline-block;
				position: absolute;
				top: -10px;
				right: -24px;
				.normal {
					color: #57c1bc;
				}
				.busing {
					color: #ff2626;
				}
				.leave {
					color: #38b8ff;
				}
				.pause {
					color: #f7d06b;
				}
			}
		}
		.tag {
			position: absolute;
			z-index: 5;
			bottom: 10px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.ivu-tag-text {
				white-space: nowrap;
			}
		}
	}
</style>

<template>
	<div class="crm_name">
		<div class="name">
			<a href="javascript:void(0);" @click="jump" v-if="hint=='isResource'">{{ !oData[showKey]?'':oData[showKey].match(/[\u4e00-\u9fa5]/g)? oData[showKey] : isNaN(parseInt(oData[showKey]))?oData[showKey]:parseInt(oData[showKey])}}</a>
			<span v-else>{{ !oData[showKey]?'':oData[showKey].match(/[\u4e00-\u9fa5]/g)? oData[showKey] : isNaN(parseInt(oData[showKey]))?oData[showKey]:parseInt(oData[showKey])}}</span>
			<div class="orderType" v-if="hint=='isAdviser'">
				<span v-for="(item,index) in state" :key="index" :class="item.type" v-text="item.text" v-if="item.type==oData.status"></span>
			</div>
			<span class="worry" v-if="hint=='isResource'&&showKey=='name'" v-show="oData.isHot==1">急</span>
		</div>
		<div class="tag" v-if="isTagShow">
			<Tag v-for="(item,index) in oData.comTags" v-if="item.id" :key="index" :color="ishight(item.id)?'yellow':'default'">{{item.title}}</Tag>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			oData: {
				type: Object,
				default: () => {
					return {};
				}
			},
			showKey: {
				type: String,
				default: ''
			},
			hint: {
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			src: {
				type: String,
				default: ''
			},
			form: {
				type: String,
				default: ''
			},
			isTmk: {
				type: String,
				default: ''
			},
			isTagShow: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				state: [{
						type: 'normal',
						text: '接单'
					},
					{
						type: 'busing',
						text: '忙线'
					},
					{
						type: 'leave',
						text: '请假'
					},
					{
						type: 'pause',
						text: '休息'
					}
				]
			}
		},
		computed: {
			isSelected() {
				return this.selected.map(item => item.id);
			}
		},
		methods: {
			ishight(val) {
				if(this.selected.length) {
					console.log(this.isSelected)
					if(this.isSelected.indexOf(val) != -1) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			jump() {
				if(this.src == "entry") {
					const {
						href
					} = this.$router.resolve({
						name: 'crm.' + this.src,
						query: {
							cusid: this.oData.id,
							noEdit: false,
							source: true
						}
					})
					window.open(href, '_blank');
					window.opener();
 					window.focus();
				} else {
					const {
						href
					} = this.$router.resolve({
						name: 'crm.' + this.src,
						query: {
							id: this.oData.id,
							from: this.form,
							tmk: this.isTmk
						}
					})
					window.open(href, '_blank');
					window.opener();
 					window.focus();
				}
			}
		}
	}
</script>