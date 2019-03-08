<style lang="less">
	.set-score-boss {
		border-top: solid 1px #e0e0e0;
		.bill-paging {
			text-align: center;
			margin: 50px 0;
			margin-bottom: 140px;
		}
		.set-score-table {
			border: none;
			.ivu-table {
				&::after {
					content: none;
				}
			}
			.ivu-table-cell {
				color: #333;
			}
			.ivu-table th {
				background: #fff;
			}
		}
	}
	.set-score-modal {
		.ivu-modal-body {
			min-height: 380px;
			max-height: 430px;
			overflow: hidden;
			overflow-y: scroll;
		}
		.ivu-modal-body::-webkit-scrollbar {
			display: none;
		}
		.ivu-form-item-label {
			color: #a0a0a0;
		}
	}
</style>
<template>
	<div class="set-score-boss">
		<div style="line-height: 32px; font-size: 14px; color: #333;">共找到 <span style="color: #44bcb7; font-size: 16px; font-weight: bold;">{{dataScore.length ? dataScore.length : 0}}</span>  条数据</div>
		<BtnList title="资源分值设置" ></BtnList>
		<Table 
			:columns="columnsScore" 
			:data="dataScore"
			class="set-score-table">
		</Table>
		<Modal
			width=730
			v-model="modalScore"
			ref="refModalScore"
			title="修改分值"
			class="set-score-modal"
			@on-ok="okScore"
			@on-cancel="cancelScore">
			<Form :label-width="90">
					<FormItem v-for="(item, index) in formScore" :key="index" :label="item.label">
						<InputNumber v-model="item.score" placeholder="请输入分值" style="width: 180px;margin-left:10px;" @on-change="inputOnchange(index)" @on-blur="inputOnblur(item.score, index)"></InputNumber>
					</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
import BtnList from '@public/modules/btnlist';
import valid, { sysConfig, errors, } from '@public/libs/request';
export default {
	name: 'SetScore',
	components: {
		BtnList,
	},
	data() {
		return {
			modalScore: false,
			formScore: [],
			columnsScore: [
				{
					title: '标签',
					key: 'label',
					align: 'center',
				},
				{
					title: '分值(分)',
					key: 'score',
					align: 'center',
				},
				{
					title: '更新时间',
					key: 'updateTime',
					align: 'center',
				},
				{
					title: '操作',
					key: 'caozuo',
					align: 'center',
					render: (h, params) => {
						const _this = this;
						return h('span', {
							style: {
								color: '#44bcb7',
								cursor: 'pointer',
								userSelect: 'none',
							},
							on: {
								click() {
									_this.formScore = _this.dataScore;
									_this.modalScore = true;
								},
							},
						}, '修改')
					},
				},
			],
			dataScore: [],
		};
	},
	created() {
		this.getScoreList();
	},
	methods: {
		okScore() {
			for (let i = 0; i < this.formScore.length; i++) {
				if (this.formScore[i].score <= 0) {
					this.$Message.warning('请设置大于或等于零的分值');
					this.modalScore = true;
					this.$refs.refModalScore.visible = true;
					return;
				}
			}
			this.saveList(this.formScore);
		},
		cancelScore() {
			this.getScoreList();
			this.formScore = [];
			this.modalScore = false;
		},
		inputOnblur(data, index) {
			this.formScore[index].score = Number(data.toFixed(2));
		},
		inputOnchange(index) {
			this.formScore[index].updateTime = new Date().format('yyyy-MM-dd hh:mm:ss');
		},
		/*
		* 列表 获取
		*/
		getScoreList() {
			const data = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			};
			sysConfig.listScoreConfig(data).then(valid.call(this)).then(res => {
				if (res) {
					this.dataScore = res.data.data;
					this.dataScore.forEach((item, index) => {
						item.score = Number(item.score);
					});
				}
			}).catch(errors.call(this));
		},
		/*
		* 保存修改后的列表
		*/
		saveList(data) {
			sysConfig.batchEditScoreConfig(data).then(valid.call(this)).then(res => {
				if (res) {
					this.getScoreList();
				}
			}).catch(errors.call(this));
		},
	},
};
</script>