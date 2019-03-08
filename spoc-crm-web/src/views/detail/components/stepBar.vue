<style lang="less">
	@green: #a4cb6d;
	@grey: #dce6eb;
	.crm-step-bar {
		width: 90%;
		margin: 10px auto;
		display: flex;
		padding-left: 6%;
		.s-item {
			flex: 1;
		}
		.gh {
			height: 18px;
			position: relative;
			margin-bottom: 8px;
			.bc {
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background-color: @grey;
				text-align: center;
				position: relative;
				z-index: 88;
				&.cur {
					cursor: pointer;
				}
				.sc {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					background-color: #fff;
					display: inline-block;
					z-index: 100;
					position: relative;
				}
			}
			.line {
				width: 100%;
				height: 4px;
				background-color: @grey;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			&+.s-text {
				color: #acacac;
				display: inline-block;
				width: 60px;
				text-align: center;
				transform: translateX(-21px); // 60/2 -9
			}
		}
		.s-item {
			&:last-child {
				.line {
					display: none;
				}
			}
			&.active {
				.s-text {
					color: @green;
				}
				.line,
				.bc {
					background-color: @green;
				}
			}
			&.notedit {
				pointer-events: none;
			}
		}
		.s-item.active.last {
			.line {
				background-color: @grey;
			}
		}
	}
</style>
<template>
	<div class="crm-step-bar">
		<div class="s-item" :class="{active:active>=index && (index==0 ||!froze),last:active==index,notedit:(!editable&&step.flag==0)}" v-for="(step,index) in steps" :key="index">
			<div class="gh">
				<div class="bc" :class="{cur:step.flag=='1' || !froze }" @click="onClick(step,index)">
					<div class="sc"></div>
				</div>
				<div class="line"></div>
			</div>
			<div class="s-text" v-text="step.label"></div>
		</div>
	</div>
</template>
<script>
	import valid, {
		errors,
		crmCustomer,
		crmCustomerTmk,
		crmCustomerSale
	} from "../../../libs/request.js";

	export default {
		props: {
			steps: {
				type: Array,
				required: true
			},
			active: {
				type: Number,
				required: true
			},
			uid: {
				type: String,
				required: true,
			},
			editable: {
				type: Boolean,
				required: true,
			},
			froze: {
				type: Boolean,
				default: false,
			},
			tmk: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				loading: false,
			}
		},
		methods: {
			onClick(step, index) {
				if((!this.editable && step.flag == 0) || (this.froze && step.flag != '1')) {
					return false;
				}
				if(this.active == index) {
					return;
				}
				if(step.flag !== '1') {
					return
				}
				if(this.loading) {
					return;
				}
				if(step.value == 'valid') {
					this.loading = true;
					let params = {
						cusId: this.uid,
						status: step.value
					}
					crmCustomerTmk.updateStatus(params).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.$emit('need-update');
						}
					}).catch(errors.call(this)).finally(() => {
						this.loading = false;
					});
					return false;
				}
				if(step.value == 'invite') {
					return this.$emit('tmk-click', step);
				}
				if(this.tmk) {
					return this.$emit('tmk-click', step);
				}
				if(step.flag == '1') {
					this.loading = true;
					crmCustomerSale.saveSaleStatus(this.uid, step.value).then(valid.call(this)).then(res => {
						if(res.ok) {
							this.$Message.success(res.data.message);
							this.$emit('need-update');
						}
					}).catch(errors.call(this)).finally(() => {
						this.loading = false;
					});
				}
			}
		}
	}
</script>