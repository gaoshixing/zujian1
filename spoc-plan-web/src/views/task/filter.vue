<style lang="less">
	.plan_filter {
		.filter {
			.ivu-select-dropdown {
				width: 100px;
			}
			.btn {
				width: 32px;
				height: 32px;
				padding: 0;
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
<template>
	<div class="plan_filter">
		<Dropdown class="filter">
			<Button href="javascript:void(0)" class="btn">
						<Icon type="arrow-down-b" style="font-size: 16px;"></Icon>
					</Button>
			<DropdownMenu slot="list">
				<Dropdown placement="right-start" @on-click="serviceClick" v-if="this.$route.query.parent!='group'">
					<DropdownItem>
						服务阶段
						<Icon type="ios-arrow-right"></Icon>
					</DropdownItem>
					<DropdownMenu slot="list">
						<DropdownItem name="">全部</DropdownItem>
						<DropdownItem v-for="item in serviceList" :key="item.id" :name="item.value">{{item.label}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Dropdown placement="right-start" @on-click="genreClick">
					<DropdownItem>
						任务类型
						<Icon type="ios-arrow-right"></Icon>
					</DropdownItem>
					<DropdownMenu slot="list">
						<DropdownItem name="">全部</DropdownItem>
						<DropdownItem v-for="item in genreList" :key="item.id" :name="item.value">{{item.label}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Dropdown placement="right-start" @on-click="tallyClick">
					<DropdownItem>
						任务标签
						<Icon type="ios-arrow-right"></Icon>
					</DropdownItem>
					<DropdownMenu slot="list">
						<DropdownItem name="">全部</DropdownItem>
						<DropdownItem v-for="item in tallyList" :key="item.id" :name="item.id" :selected="tags==item.id">{{item.name}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Dropdown placement="right-start" @on-click="priorityClick">
					<DropdownItem>
						优先级
						<Icon type="ios-arrow-right"></Icon>
					</DropdownItem>
					<DropdownMenu slot="list">
						<DropdownItem name="">全部</DropdownItem>
						<DropdownItem v-for="item in priorityList" :key="item.id" :name="item.value">{{item.label}}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>

<script>
	export default {
		props:{
			serviceList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			genreList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			tallyList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			priorityList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			tags: {
				type: String,
				default: function() {
					return '';
				}
			},
		},
		data() {
			return {

			}
		},
		methods:{
			serviceClick(val){
				this.$emit('serviceClick',val);
			},
			tallyClick(val){
				this.$emit('tallyClick',val);
			},
			genreClick(val){
				this.$emit('genreClick',val);
			},
			priorityClick(val){
				this.$emit('priorityClick',val);
			},
		}
	}
</script>