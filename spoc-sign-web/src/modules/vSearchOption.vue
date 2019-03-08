<style lang="less">
	.v_search_options {
		 p{	
			 line-height: 32px;
			 font-size: 12px;
            span {
                padding: 4px 8px;
                cursor: pointer;
                margin-right: 10px;
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
		.ivu-input{
			height: 28px;
		}
 	}
</style>
<template>
	<div class="v_search_options">
		<p><span>{{title}}</span><span :class="{active:index==num}" @click="clickEvent(index)" class="item" v-for="(item, index) in controlledDataAll" :key="index">{{item.name.indexOf(' ') == -1 ? item.name : item[_key].substr(0,item.name.indexOf(' '))}}</span></p>
	</div>
</template>
<script>
	export default {
		name: 'vSearchOptions',
		props: {
			title: {
				type: String,
				default: '　分公司：'
			},
			arrids: {
				type: Array,
				default: function() {
					return [];
				}
			},
			controlledData: {
				type: Array,
				default: function() {
					return [];
				}
			},
			
			key1: {
				type: String,
				default: function() {
					return 'name';
				}
			}
		},
		data() {
			return {
				num: '',
			}
		},
		mounted(){
			
		},
		
		computed: {
			controlledDataAll() {
				this.controlledData.unshift({id:'',name:'全部'});
				return this.controlledData
			},

			arrid() {
				return this.arrids
			},

			_key() {
				return this.key1
			}
		},

		methods: {
			clickEvent(index) {
				this.num = index
				this.$emit('on-select-item', this.controlledData[index].id);
			},

			
		}	
	}
</script>